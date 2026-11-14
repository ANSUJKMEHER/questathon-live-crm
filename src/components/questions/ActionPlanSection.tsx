import React from 'react';
import { ActionItem } from '@/lib/types/crm';
import { CheckSquare, Calendar, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface Props {
  actions: ActionItem[];
  summary: string;
}

export const ActionPlanSection: React.FC<Props> = ({ actions, summary }) => {
  return (
    <section className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
            Question 3
          </span>
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">
            What do you do first?
          </h3>
        </div>
        <p className="mt-1 text-xs text-slate-400 max-w-3xl leading-relaxed">
          {summary}
        </p>
      </div>

      <div className="p-6 space-y-4">
        {actions.map((act) => (
          <div
            key={act.id}
            className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
              <div className="flex items-start space-x-3.5">
                <div className="w-7 h-7 rounded-lg bg-sky-600/20 text-sky-400 border border-sky-500/30 font-bold font-mono text-sm flex items-center justify-center shrink-0">
                  #{act.priorityRank}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100 leading-snug">
                    {act.action}
                  </h4>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                      Related: {act.relatedDeal}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">{act.id}</span>
                  </div>
                </div>
              </div>

              {/* Due Date & Owner */}
              <div className="flex md:flex-col items-end gap-1.5 shrink-0 text-xs">
                <div
                  className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md font-mono ${
                    act.isDueDateConfirmed
                      ? 'bg-rose-500/10 text-rose-300 border border-rose-500/25'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {act.isDueDateConfirmed ? act.dueDate : 'Date to confirm'}
                  </span>
                </div>

                <div
                  className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] ${
                    act.isOwnerConfirmed
                      ? 'bg-slate-800 text-slate-300'
                      : 'bg-amber-500/10 text-amber-300 border border-amber-500/25'
                  }`}
                >
                  <User className="w-3 h-3" />
                  <span>{act.owner}</span>
                </div>
              </div>
            </div>

            {/* Rationale & Outcome */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-900/40 p-3.5 rounded-lg border border-slate-800/80 text-xs">
              <div className="md:col-span-1">
                <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                  Strategic Business Reason:
                </span>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  {act.businessReason}
                </p>
              </div>

              <div className="md:col-span-1">
                <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                  Source Evidence Trace:
                </span>
                <p className="text-slate-400 mt-1 font-mono text-[11px] leading-relaxed">
                  {act.sourceEvidence}
                </p>
              </div>

              <div className="md:col-span-1">
                <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider text-emerald-400">
                  Target Expected Outcome:
                </span>
                <p className="text-emerald-300 mt-1 leading-relaxed">
                  {act.expectedOutcome}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
