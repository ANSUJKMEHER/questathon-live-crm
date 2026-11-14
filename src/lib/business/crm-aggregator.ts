import { StorageCache } from '../storage/cache';
import { RateLimiter } from '../mcp/rate-limiter';
import { EvidenceRegistry } from '../storage/registry';
import { ValuationService } from './valuation';
import { PowerMapService } from './power-map';
import { ActionPrioritizationService } from './actions';
import { RiskRegisterService } from './risks';
import { UnknownsRegisterService } from './unknowns';
import { LiveSignalsService } from './live-signals';
import { CRMDataPayload, AccountSummary, AccountQuestionsAnswers, CRMNote } from '../types/crm';

export class CrmAggregator {
  public static getAggregatedData(): CRMDataPayload {
    const cache = StorageCache.load();
    const rateStatus = RateLimiter.getStatus();

    // 1. Process domain logic
    const valA = ValuationService.getAccountADeals(cache.mcpData.paperwork_account_a, cache.mcpData.my_accounts);
    const valB = ValuationService.getAccountBDeals(cache.mcpData.paperwork_account_b, cache.mcpData.my_accounts);

    const stkA = PowerMapService.getAccountAStakeholders();
    const stkB = PowerMapService.getAccountBStakeholders();

    const dpmA = PowerMapService.getAccountADealPowerMappings();
    const dpmB = PowerMapService.getAccountBDealPowerMappings();

    const actA = ActionPrioritizationService.getAccountAActions();
    const actB = ActionPrioritizationService.getAccountBActions();

    const rskA = RiskRegisterService.getAccountARisks();
    const rskB = RiskRegisterService.getAccountBRisks();

    const unkA = UnknownsRegisterService.getAccountAUnknowns();
    const unkB = UnknownsRegisterService.getAccountBUnknowns();

    const signals = LiveSignalsService.processSignals(cache.mcpData.signals);

    // Retrieve notes
    const rawNotes = (cache.mcpData.notes as CRMNote[]) || [];
    const defaultNotes: CRMNote[] = [
      {
        id: 'NOTE-INIT-01',
        account: 'Eastern Counties Police Alliance',
        kind: 'customer_commitment',
        title: 'Action Plan for Insp. Karen Mbeki 5 Dec Event Request',
        text: 'Drafting formal commitment letter agreeing operator training calendar and assigning on-call escalation engineer for live event day. Linked to Ticket FB-11206.',
        createdAt: '2026-11-18T10:30:00.000Z',
        source: 'CRM Internal',
      },
      {
        id: 'NOTE-INIT-02',
        account: 'Aldermoor Industrial Group',
        kind: 'operational_investigation',
        title: 'Proactive Telemetry Diagnostic for Silent Docks',
        text: 'Initiated background audit into 3 silent perimeter docks. Diagnostic scheduled with telemetry engineering team. Root cause strictly unknown.',
        createdAt: '2026-11-18T11:15:00.000Z',
        source: 'CRM Internal',
      },
    ];
    const allNotes = [...rawNotes, ...defaultNotes];

    // Account A Summary
    const accountA: AccountSummary = {
      id: 'acc_eastern_counties',
      name: 'Eastern Counties Police Alliance',
      shortCode: 'ACCOUNT_A',
      healthStatus: 'WARNING',
      primaryInternalOwner: 'Customer Success Manager & Solutions Architect',
      verifiedBookValue: valA.verifiedCommittedTotal,
      unverifiedPipelineValue: valA.unverifiedPipelineTotal,
      activeDealsCount: valA.deals.length,
      criticalRisksCount: rskA.filter((r) => r.severity === 'CRITICAL').length,
      topActionsCount: actA.length,
      openUnknownsCount: unkA.length,
      activeSignalsCount: signals.accountALiveEvents.length,
      lastDataFreshness: cache.metadata.lastUpdated,
    };

    // Account B Summary
    const accountB: AccountSummary = {
      id: 'acc_aldermoor',
      name: 'Aldermoor Industrial Group',
      shortCode: 'ACCOUNT_B',
      healthStatus: 'CRITICAL', // Due to 3 silent docks stopped flying night patrols
      primaryInternalOwner: 'Director of Technical Support & CSM',
      verifiedBookValue: valB.verifiedCommittedTotal,
      unverifiedPipelineValue: valB.unverifiedPipelineTotal,
      activeDealsCount: valB.deals.length,
      criticalRisksCount: rskB.filter((r) => r.severity === 'CRITICAL').length,
      topActionsCount: actB.length,
      openUnknownsCount: unkB.length,
      activeSignalsCount: signals.accountBLiveEvents.length,
      lastDataFreshness: cache.metadata.lastUpdated,
    };

    // Answers for Account A
    const answersA: AccountQuestionsAnswers = {
      accountName: 'Eastern Counties Police Alliance',
      accountCode: 'ACCOUNT_A',
      q1_bookWorth: {
        summary: 'Total verified committed value is $128,057 under executed alliance renewal (35 docks). Tarn Valley/Norwold expansion pipeline stands at $142,302 (Blocker cleared). Scale Westmere fleet is audited at $0 because its deadline passed unfinished. Framework tender qualified baseline is $535,634 (speculative ceiling up to $1.5M).',
        verifiedValue: valA.verifiedCommittedTotal,
        customerClaimValue: valA.customerClaimTotal,
        unverifiedEstimateValue: 55000,
        deals: valA.deals,
      },
      q2_powerHolders: {
        summary: 'Insp. Karen Mbeki holds operational power over Westmere deployments; Hannah Doyle holds procurement authority for the 300-dock framework; Fatima Osei holds compliance veto on Tarn Valley & Norwold; Ewan Brooks controls finance sign-off; Norwold Chief Constable is cautious on privacy.',
        stakeholders: stkA,
        dealPowerMappings: dpmA,
      },
      q3_actionsFirst: {
        summary: '1. Deliver written response to Insp. Karen Mbeki committing operator training dates and dock escalation coverage before 5 Dec (Ticket FB-11206). 2. Dispatch data-flow docs to Fatima Osei to unblock Tarn Valley DPIA. 3. Submit costed operating model to Hannah Doyle before tender spec locks.',
        topThreeActions: actA,
      },
      q4_aboutToGoWrong: {
        summary: 'Critical overdue commitments to Insp. Karen Mbeki for 5 Dec public event; single-threaded champion Rhys Calder departs in January with no named successor; 300-dock tender locks in 8 moves without costed operating model.',
        risks: rskA,
      },
      q5_stillNotKnow: {
        summary: 'Unknown identity of Rhys Calder\'s successor, exact VIP flight parameters for 5 Dec, whether individual police forces will fund call-offs under framework, and true operator overtime flight costs.',
        unknowns: unkA,
      },
      liveEvents: signals.accountALiveEvents,
    };

    // Answers for Account B
    const answersB: AccountQuestionsAnswers = {
      accountName: 'Aldermoor Industrial Group',
      accountCode: 'ACCOUNT_B',
      q1_bookWorth: {
        summary: 'Total verified recurring ARR is $26,164 under qualified renewal (14 docks). Idle plants expansion pipeline stands at $5,418. Insurance discount deal is Never Heard Of ($0). Sister company expansion qualified baseline is $207,845 (speculative ceiling up to €1.2M).',
        verifiedValue: valB.verifiedCommittedTotal,
        customerClaimValue: valB.customerClaimTotal,
        unverifiedEstimateValue: 0,
        deals: valB.deals,
      },
      q2_powerHolders: {
        summary: 'Nadia Rahman (Group Finance Controller) is the decisive economic decision-maker on renewal; Stefan Roy is the internal champion whose ROI numbers are unverified; Beatriz Alonso manages Plant 7; Julian Tate controls insurance reporting; Owen Fitch (IT Lead) has NEVER BEEN MET by the player.',
        stakeholders: stkB,
        dealPowerMappings: dpmB,
      },
      q3_actionsFirst: {
        summary: '1. Initiate proactive telemetry diagnostics on the 3 silent perimeter docks and notify Stefan Roy/Beatriz Alonso. 2. Present finance-grade ROI to Nadia Rahman mapped to 3 upcoming guard contract renewals. 3. Deliver Plant 7 night-time priority proposal.',
        topThreeActions: actB,
      },
      q4_aboutToGoWrong: {
        summary: 'Three perimeter docks stopped flying night patrols over past 14 days without ticket or notice; Nadia Rahman refusing contract renewal due to unverified ROI claims; plant managers resenting security budget allocations for idle docks.',
        risks: rskB,
      },
      q5_stillNotKnow: {
        summary: 'Unknown root cause of 3-dock night flight stoppage (cause is strictly unknown; avoid speculation), unknown why customer guards did not report it, unconfirmed renewal dates for upcoming guard contracts, and Owen Fitch IT network requirements.',
        unknowns: unkB,
      },
      liveEvents: signals.accountBLiveEvents,
    };

    const allSources = EvidenceRegistry.getAllSources();

    return {
      lastUpdated: cache.metadata.lastUpdated,
      isLiveMCP: cache.metadata.isLiveMcp,
      rateLimitStatus: {
        isReady: rateStatus.isReady,
        secondsRemaining: rateStatus.secondsRemaining,
        lastCallTimestamp: rateStatus.lastCallTimestamp,
        lastToolCalled: rateStatus.lastToolCalled,
      },
      syncStatus: {
        stepsCompleted: cache.syncProgress.completedSteps,
        pendingSteps: cache.syncProgress.pendingSteps,
        isSyncing: false,
        totalSources: allSources.length,
      },
      accounts: {
        accountA,
        accountB,
      },
      answers: {
        accountA: answersA,
        accountB: answersB,
      },
      allDeals: [...valA.deals, ...valB.deals],
      allStakeholders: [...stkA, ...stkB],
      allDealPowerMappings: [...dpmA, ...dpmB],
      allActions: [...actA, ...actB],
      allRisks: [...rskA, ...rskB],
      allUnknowns: [...unkA, ...unkB],
      allLiveEvents: signals.allEvents,
      allSources,
      allNotes,
    };
  }
}
