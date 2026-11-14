'use client';

import React from 'react';
import { EvidenceSource } from '@/lib/types/crm';
import { VerificationBadge } from './VerificationBadge';
import { X, ExternalLink, ShieldCheck, Database, Calendar, Tag } from 'lucide-react';

interface Props {
  source: EvidenceSource | null;
  onClose: () => void;
}

export const SourceModal: React.FC<Props> = ({ source, onClose }) => {
  if (!source) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-semibold text-slate-100">
              Evidence Provenance Trace
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs px-2.5 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">
              ID: {source.id}
            </span>
            <VerificationBadge status={source.verificationStatus} size="md" />
          </div>

          <div className="space-y-3 bg-slate-950/70 p-4 rounded-lg border border-slate-800/80">
            <div className="flex items-center text-xs text-slate-400">
              <Database className="w-4 h-4 mr-2 text-indigo-400" />
              <span className="text-slate-300 font-medium">Source Tool:</span>
              <span className="ml-2 font-mono text-indigo-300">{source.toolName}</span>
            </div>

            <div className="flex items-center text-xs text-slate-400">
              <Tag className="w-4 h-4 mr-2 text-sky-400" />
              <span className="text-slate-300 font-medium">Record ID:</span>
              <span className="ml-2 font-mono text-sky-300">{source.recordId}</span>
            </div>

            <div className="flex items-center text-xs text-slate-400">
              <Calendar className="w-4 h-4 mr-2 text-amber-400" />
              <span className="text-slate-300 font-medium">Account:</span>
              <span className="ml-2 text-slate-200">{source.account}</span>
            </div>

            {source.fieldName && (
              <div className="flex items-center text-xs text-slate-400">
                <ExternalLink className="w-4 h-4 mr-2 text-emerald-400" />
                <span className="text-slate-300 font-medium">Extracted Field:</span>
                <span className="ml-2 font-mono text-emerald-300">{source.fieldName}</span>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Verified Original Excerpt
            </h4>
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
              {source.rawExcerpt}
            </div>
          </div>

          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
            Retrieved via Questathon challenge MCP pipeline at {new Date(source.retrievalTimestamp).toLocaleString()}.
            Traceable against authentic MCP JSON-RPC audit ledger.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950/50 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md transition"
          >
            Close Provenance Trace
          </button>
        </div>
      </div>
    </div>
  );
};
