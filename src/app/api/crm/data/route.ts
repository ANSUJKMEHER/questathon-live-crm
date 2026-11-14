import { NextResponse } from 'next/server';
import { CrmAggregator } from '@/lib/business/crm-aggregator';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = CrmAggregator.getAggregatedData();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
