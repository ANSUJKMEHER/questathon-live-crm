import { McpClient } from './client';
import { StorageCache } from '../storage/cache';
import { RateLimiter } from './rate-limiter';
import { McpToolName } from './types';

export interface SyncStepDef {
  id: string;
  tool: McpToolName;
  args?: Record<string, unknown>;
  cacheKey: 'whoami' | 'my_accounts' | 'paperwork_account_a' | 'paperwork_account_b' | 'signals' | 'flytbase_team' | 'feature_requests' | 'release_notes' | 'notes';
  label: string;
}

export const SYNC_SEQUENCE: SyncStepDef[] = [
  {
    id: 'step_whoami',
    tool: 'whoami',
    cacheKey: 'whoami',
    label: '1. Challenge Identity & Status (whoami)',
  },
  {
    id: 'step_my_accounts',
    tool: 'get_my_accounts',
    cacheKey: 'my_accounts',
    label: '2. Customer Accounts & Deals (get_my_accounts)',
  },
  {
    id: 'step_paperwork_a',
    tool: 'get_all_paperwork',
    args: { account: 'Eastern Counties Police Alliance' },
    cacheKey: 'paperwork_account_a',
    label: '3. Eastern Counties Paperwork (get_all_paperwork)',
  },
  {
    id: 'step_paperwork_b',
    tool: 'get_all_paperwork',
    args: { account: 'Aldermoor Industrial Group' },
    cacheKey: 'paperwork_account_b',
    label: '4. Aldermoor Paperwork (get_all_paperwork)',
  },
  {
    id: 'step_signals',
    tool: 'get_signals',
    cacheKey: 'signals',
    label: '5. Live Telemetry & Event Signals (get_signals)',
  },
  {
    id: 'step_flytbase_team',
    tool: 'get_flytbase_team',
    cacheKey: 'flytbase_team',
    label: '6. Internal FlytBase Team Owners (get_flytbase_team)',
  },
  {
    id: 'step_feature_requests',
    tool: 'get_feature_requests',
    cacheKey: 'feature_requests',
    label: '7. Customer Feature Requests (get_feature_requests)',
  },
  {
    id: 'step_release_notes',
    tool: 'get_release_notes',
    cacheKey: 'release_notes',
    label: '8. Product Release Notes (get_release_notes)',
  },
  {
    id: 'step_list_notes',
    tool: 'list_notes',
    cacheKey: 'notes',
    label: '9. CRM History & Notes (list_notes)',
  },
];

export class McpSyncer {
  /**
   * Executes the next pending step in the sequence, strictly respecting the 60-second rate limit.
   */
  public static async executeNextStep(): Promise<{
    status: 'COMPLETED' | 'RATE_LIMITED' | 'ALL_DONE' | 'ERROR' | 'TOKEN_MISSING';
    step?: SyncStepDef;
    message: string;
    secondsRemaining?: number;
    completedCount: number;
    totalCount: number;
  }> {
    if (!process.env.AQ_TOKEN) {
      return {
        status: 'TOKEN_MISSING',
        message: 'AQ_TOKEN is not configured on the server. Please add it to your server environment or .env.local.',
        completedCount: 0,
        totalCount: SYNC_SEQUENCE.length,
      };
    }

    const cache = StorageCache.load();
    const completedSet = new Set(cache.syncProgress.completedSteps);

    // Find first incomplete step
    const nextStep = SYNC_SEQUENCE.find((s) => !completedSet.has(s.id));
    if (!nextStep) {
      return {
        status: 'ALL_DONE',
        message: 'All 9 MCP sync steps have already been successfully ingested and cached.',
        completedCount: SYNC_SEQUENCE.length,
        totalCount: SYNC_SEQUENCE.length,
      };
    }

    // Check rate limiter
    const rateCheck = RateLimiter.canMakeCall();
    if (!rateCheck.allowed) {
      return {
        status: 'RATE_LIMITED',
        step: nextStep,
        secondsRemaining: rateCheck.waitSecondsRemaining,
        message: `Strict 60s rate limit in effect: ${rateCheck.waitSecondsRemaining}s remaining before next MCP call.`,
        completedCount: completedSet.size,
        totalCount: SYNC_SEQUENCE.length,
      };
    }

    // Execute MCP tool call
    const result = await McpClient.callTool(nextStep.tool, nextStep.args);

    if (!result.success) {
      return {
        status: result.isRateLimited ? 'RATE_LIMITED' : 'ERROR',
        step: nextStep,
        secondsRemaining: result.retryAfterSeconds,
        message: result.error || 'Failed to execute MCP tool',
        completedCount: completedSet.size,
        totalCount: SYNC_SEQUENCE.length,
      };
    }

    // Save in persistent cache
    StorageCache.setToolData(nextStep.cacheKey, result.data || result.rawText);
    StorageCache.markStepCompleted(nextStep.id);

    return {
      status: 'COMPLETED',
      step: nextStep,
      message: `Successfully executed and cached: ${nextStep.label}`,
      completedCount: completedSet.size + 1,
      totalCount: SYNC_SEQUENCE.length,
    };
  }
}
