'use client';

import React, { useState, useEffect } from 'react';
import { CrmAggregator } from '@/lib/business/crm-aggregator';
import { LiveEventsSection } from '@/components/questions/LiveEventsSection';
import { WriteNoteModal } from '@/components/shared/WriteNoteModal';
import { Radio, RefreshCw, Send } from 'lucide-react';

export default function LiveEventsPage() {
  const [data, setData] = useState(CrmAggregator.getAggregatedData());
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string>('Eastern Counties Police Alliance');

  useEffect(() => {
    setData(CrmAggregator.getAggregatedData());
  }, []);

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Ingestion Feed
            </span>
            <span className="text-xs text-slate-400">MCP get_signals Stream</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight mt-1">
            Real-Time Signals & Operational Events
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Dynamic telemetry alerts and stakeholder commitment events without permanent hardcoded assumptions.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              setSelectedAccount('Aldermoor Industrial Group');
              setIsNoteModalOpen(true);
            }}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold shadow transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Log Check-in Note</span>
          </button>
        </div>
      </div>

      <LiveEventsSection
        events={data.allLiveEvents}
        onLogNoteForEvent={(evt) => {
          setSelectedAccount(evt.account);
          setIsNoteModalOpen(true);
        }}
      />

      {/* CRM Notes Stream */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Recorded CRM Notes & Audit Trail
            </h3>
            <p className="text-xs text-slate-400">
              Logged via MCP write_note with duplicate-prevention validation.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {data.allNotes.length} Notes Stored
          </span>
        </div>

        <div className="space-y-3">
          {data.allNotes.map((note) => (
            <div
              key={note.id}
              className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-lg text-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-100">{note.title}</span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    {note.kind}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">
                  {new Date(note.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">{note.text}</p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/50">
                <span>Account: <strong className="text-indigo-400">{note.account}</strong></span>
                <span className="font-mono text-[10px] text-emerald-400">{note.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <WriteNoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onNoteAdded={() => setData(CrmAggregator.getAggregatedData())}
        defaultAccount={selectedAccount}
      />
    </div>
  );
}
