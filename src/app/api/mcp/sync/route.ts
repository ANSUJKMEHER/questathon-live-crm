import { NextResponse } from 'next/server';
import { McpSyncer } from '@/lib/mcp/syncer';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const result = await McpSyncer.executeNextStep();
    return NextResponse.json(result);
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Unknown sync error';
    return NextResponse.json({ status: 'ERROR', message: errMessage }, { status: 500 });
  }
}
