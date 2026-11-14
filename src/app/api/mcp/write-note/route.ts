import { NextRequest, NextResponse } from 'next/server';
import { McpClient } from '@/lib/mcp/client';
import { StorageCache } from '@/lib/storage/cache';
import { CRMNote } from '@/lib/types/crm';

export const dynamic = 'force-dynamic';

const VALID_ACCOUNTS = [
  'Eastern Counties Police Alliance',
  'Aldermoor Industrial Group',
];

const VALID_KINDS = [
  'operational_investigation',
  'customer_commitment',
  'risk_mitigation',
  'executive_update',
  'meeting_minutes',
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { account, kind, title, text } = body;

    // 1. Validation
    if (!account || !VALID_ACCOUNTS.includes(account)) {
      return NextResponse.json(
        { success: false, error: `Invalid account. Must be one of: ${VALID_ACCOUNTS.join(', ')}` },
        { status: 400 }
      );
    }

    if (!kind || !VALID_KINDS.includes(kind)) {
      return NextResponse.json(
        { success: false, error: `Invalid note kind. Allowed: ${VALID_KINDS.join(', ')}` },
        { status: 400 }
      );
    }

    if (!title || title.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: 'Note title must be at least 3 characters long.' },
        { status: 400 }
      );
    }

    if (!text || text.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: 'Note text must be at least 5 characters long.' },
        { status: 400 }
      );
    }

    // 2. Duplicate prevention check against cached notes
    const cache = StorageCache.load();
    const existingNotes = (cache.mcpData.notes as CRMNote[]) || [];
    const isDuplicate = existingNotes.some(
      (n) => n.account === account && n.title.toLowerCase() === title.trim().toLowerCase()
    );

    if (isDuplicate) {
      return NextResponse.json(
        { success: false, error: 'A note with this exact title already exists for this account.' },
        { status: 409 }
      );
    }

    // 3. If AQ_TOKEN is configured, attempt MCP tool write_note call
    if (process.env.AQ_TOKEN) {
      const mcpResult = await McpClient.callTool('write_note', {
        account,
        kind,
        title: title.trim(),
        text: text.trim(),
      });

      if (!mcpResult.success) {
        return NextResponse.json(
          {
            success: false,
            error: mcpResult.error || 'Failed to save note via MCP server.',
            isRateLimited: mcpResult.isRateLimited,
            retryAfterSeconds: mcpResult.retryAfterSeconds,
          },
          { status: mcpResult.isRateLimited ? 429 : 502 }
        );
      }

      // Persist note in local cache as confirmed
      const newNote: CRMNote = {
        id: `NOTE-MCP-${Date.now()}`,
        account,
        kind,
        title: title.trim(),
        text: text.trim(),
        createdAt: new Date().toISOString(),
        source: 'MCP write_note (Confirmed Remote)',
      };

      existingNotes.unshift(newNote);
      StorageCache.setToolData('notes', existingNotes);

      return NextResponse.json({
        success: true,
        note: newNote,
        message: 'Note successfully committed and confirmed via MCP write_note tool.',
        mcpData: mcpResult.data,
      });
    }

    // If no AQ_TOKEN yet, save to persistent local cache with explicit local label
    const newNote: CRMNote = {
      id: `NOTE-LOCAL-${Date.now()}`,
      account,
      kind,
      title: title.trim(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
      source: 'Local Cache (AQ_TOKEN pending)',
    };

    existingNotes.unshift(newNote);
    StorageCache.setToolData('notes', existingNotes);

    return NextResponse.json({
      success: true,
      note: newNote,
      message: 'Note saved locally. (Configure AQ_TOKEN to write directly to live MCP server).',
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to write note';
    return NextResponse.json({ success: false, error: errMessage }, { status: 500 });
  }
}
