import { NextResponse } from 'next/server';
import { RateLimiter } from '@/lib/mcp/rate-limiter';
import { StorageCache } from '@/lib/storage/cache';
import { SYNC_SEQUENCE } from '@/lib/mcp/syncer';

export const dynamic = 'force-dynamic';

export async function GET() {
  const rateStatus = RateLimiter.getStatus();
  const cache = StorageCache.load();

  return NextResponse.json({
    rateLimit: rateStatus,
    sync: {
      completedSteps: cache.syncProgress.completedSteps,
      pendingSteps: cache.syncProgress.pendingSteps,
      totalSteps: SYNC_SEQUENCE.length,
      lastSyncTimestamp: cache.metadata.lastUpdated,
      isLiveMcp: cache.metadata.isLiveMcp,
      hasToken: Boolean(process.env.AQ_TOKEN && process.env.AQ_TOKEN.trim().length > 0),
    },
  });
}
