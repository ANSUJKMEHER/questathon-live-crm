import React from 'react';
import { UnknownItem } from '@/lib/types/crm';
import { HelpCircle, AlertCircle, ArrowRight, UserCheck } from 'lucide-react';

interface Props {
  unknowns: UnknownItem[];
  summary: string;
}

export const UnknownsSection: React.FC<Props> = ({ unknowns, summary }) => {
  return (
    <section className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-slate-800">
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

      <div className="p-6 space-y-4">
        {unknowns.map((unk) => (
          <div
            key={unk.id}
            className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition space-y-3"
          >
            <div className="flex items-start justify-between">
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

              <span className="font-mono text-[10px] text-slate-400">{unk.id}</span>
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

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between col-span-1 md:col-span-2">
                <div className="text-slate-300">
                  <span className="text-slate-400 font-semibold mr-1">Who Can Answer:</span>
                  <strong className="text-indigo-300">{unk.whoCanAnswer}</strong>
                </div>

                <div className="text-slate-300 flex items-center">
                  <span className="text-slate-400 font-semibold mr-1">How to Obtain:</span>
                  <span className="text-emerald-300">{unk.howToObtain}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
