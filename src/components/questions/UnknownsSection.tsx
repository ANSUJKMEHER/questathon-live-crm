import React, { useState } from 'react';
import { UnknownItem } from '@/lib/types/crm';
import { HelpCircle, AlertCircle, ArrowRight, UserCheck, Clock, CheckCircle2 } from 'lucide-react';

interface Props {
  unknowns: UnknownItem[];
  summary: string;
}

export const UnknownsSection: React.FC<Props> = ({ unknowns, summary }) => {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredUnknowns = unknowns.filter((unk) => {
    if (statusFilter === 'ALL') return true;
    return unk.status === statusFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'UNRESOLVED':
        return (
          <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center">
            <AlertCircle className="w-3 h-3 mr-1" />
            Unresolved
          </span>
        );
      case 'INVESTIGATING':
        return (
          <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            Investigating
          </span>
        );
      case 'RESOLVED':
        return (
          <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Resolved
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Question 5
              </span>
              <h3 className="text-lg font-bold text-slate-100 tracking-tight">
                What do you still not know?
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-400 max-w-3xl leading-relaxed">
              {summary}
            </p>
          </div>

          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs shrink-0">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                statusFilter === 'ALL'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({unknowns.length})
            </button>
            <button
              onClick={() => setStatusFilter('UNRESOLVED')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                statusFilter === 'UNRESOLVED'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Unresolved ({unknowns.filter((u) => u.status === 'UNRESOLVED').length})
            </button>
            <button
              onClick={() => setStatusFilter('INVESTIGATING')}
              className={`px-2.5 py-1 rounded-md font-medium transition ${
                statusFilter === 'INVESTIGATING'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Investigating ({unknowns.filter((u) => u.status === 'INVESTIGATING').length})
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {filteredUnknowns.map((unk) => (
          <div
            key={unk.id}
            className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-amber-500/15 text-amber-400 rounded border border-amber-500/30 mt-0.5">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">
                    {unk.missingInformation}
                  </h4>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Related Deal: <strong className="text-slate-300">{unk.relatedDeal}</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                {getStatusBadge(unk.status)}
                <span className="font-mono text-[10px] text-slate-400">{unk.id}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-900/40 p-4 rounded-lg border border-slate-800/80">
              <div>
                <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                  Why This Information Gap Matters:
                </span>
                <p className="text-slate-300 mt-1 leading-relaxed">{unk.whyItMatters}</p>
              </div>

              <div>
                <span className="text-rose-400 font-semibold block text-[11px] uppercase tracking-wider">
                  Consequence If Left Unresolved:
                </span>
                <p className="text-rose-300/90 mt-1 leading-relaxed">{unk.consequenceIfUnresolved}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/60 col-span-1 md:col-span-2">
                <span className="text-emerald-400 font-semibold block text-[11px] uppercase tracking-wider">
                  Suggested Next Action:
                </span>
                <p className="text-emerald-300 mt-1 font-medium leading-relaxed">{unk.suggestedAction}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between col-span-1 md:col-span-2 gap-2 text-slate-400 text-[11px]">
                <div>
                  <span className="font-semibold text-slate-400 mr-1">Who Can Answer:</span>
                  <strong className="text-indigo-300">{unk.whoCanAnswer}</strong>
                </div>

                <div>
                  <span className="font-semibold text-slate-400 mr-1">How to Obtain:</span>
                  <span className="text-slate-300">{unk.howToObtain}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
