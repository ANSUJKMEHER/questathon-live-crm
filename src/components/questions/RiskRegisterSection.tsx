import React from 'react';
import { RiskItem } from '@/lib/types/crm';
import { AlertOctagon, AlertTriangle, ShieldAlert, Clock, CheckCircle2 } from 'lucide-react';

interface Props {
  risks: RiskItem[];
  summary: string;
}

export const RiskRegisterSection: React.FC<Props> = ({ risks, summary }) => {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'HIGH':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'MEDIUM':
        return 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  return (
    <section className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
            Question 4
          </span>
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">
            What is about to go wrong?
          </h3>
        </div>
        <p className="mt-1 text-xs text-slate-400 max-w-3xl leading-relaxed">
          {summary}
        </p>
      </div>

      <div className="p-6 space-y-4">
        {risks.map((risk) => (
          <div
            key={risk.id}
            className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <span
                  className={`text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${getSeverityBadge(
                    risk.severity
                  )}`}
                >
                  {risk.severity} SEVERITY
                </span>
                <h4 className="text-sm font-bold text-slate-100">{risk.title}</h4>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <span className="text-slate-400 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  Target: <strong className="text-slate-200 ml-1">{risk.deadline}</strong>
                </span>
                <span className="font-mono text-[10px] text-slate-400">{risk.sourceId}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-900/40 p-4 rounded-lg border border-slate-800/80">
              <div>
                <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                  Impact Assessment:
                </span>
                <p className="text-slate-300 mt-1 leading-relaxed">{risk.impact}</p>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                  Probability (Qualitative Rule):
                </span>
                <p className="text-slate-300 mt-1 leading-relaxed">{risk.probability}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/60">
                <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                  Trigger Event:
                </span>
                <p className="text-amber-300/90 mt-1 leading-relaxed">{risk.trigger}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/60">
                <span className="text-emerald-400 font-semibold block text-[11px] uppercase tracking-wider">
                  Operational Mitigation Strategy:
                </span>
                <p className="text-emerald-300 mt-1 leading-relaxed">{risk.mitigation}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Risk Owner: <strong className="text-slate-300">{risk.owner}</strong></span>
              <span className="text-[10px] text-slate-400">Strictly no artificial probability percentages</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
