import React from 'react';
import { Stakeholder } from '@/lib/types/crm';
import { Users, Shield, CheckCircle, AlertTriangle, UserCheck } from 'lucide-react';

interface Props {
  stakeholders: Stakeholder[];
  summary: string;
}

export const PowerMapSection: React.FC<Props> = ({ stakeholders, summary }) => {
  const getPowerCategoryBadge = (category: string) => {
    switch (category) {
      case 'DECISION_MAKER':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'PAYER':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'OPERATIONAL_OWNER':
        return 'bg-sky-500/15 text-sky-400 border-sky-500/30';
      case 'END_USER':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'PROCUREMENT':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  const getRelationshipBadge = (status: string) => {
    switch (status) {
      case 'STRONG':
        return <span className="text-emerald-400 font-semibold flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> Strong</span>;
      case 'AT_RISK':
        return <span className="text-rose-400 font-semibold flex items-center"><AlertTriangle className="w-3 h-3 mr-1" /> At Risk</span>;
      case 'DECLINING':
        return <span className="text-amber-400 font-semibold flex items-center"><AlertTriangle className="w-3 h-3 mr-1" /> Declining</span>;
      case 'NEUTRAL':
      default:
        return <span className="text-slate-400 font-semibold">Neutral</span>;
    }
  };

  return (
    <section className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
            Question 2
          </span>
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">
            Who holds the power?
          </h3>
        </div>
        <p className="mt-1 text-xs text-slate-400 max-w-3xl leading-relaxed">
          {summary}
        </p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {stakeholders.map((stk) => (
          <div
            key={stk.id}
            className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-slate-100">{stk.name}</h4>
                  <span
                    className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border ${getPowerCategoryBadge(
                      stk.powerCategory
                    )}`}
                  >
                    {stk.powerCategory.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{stk.title}</p>
              </div>

              <div className="text-right">
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    stk.influenceType === 'CONFIRMED'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/25'
                  }`}
                >
                  {stk.influenceType} Authority
                </span>
                <div className="text-[11px] mt-1.5">{getRelationshipBadge(stk.relationshipStatus)}</div>
              </div>
            </div>

            <div className="space-y-2 text-xs bg-slate-900/50 p-3 rounded-lg border border-slate-800/80">
              <div>
                <span className="text-slate-400 font-semibold block">Evidence of Influence:</span>
                <p className="text-slate-300 mt-0.5 leading-relaxed">{stk.evidenceSupportingInfluence}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/60">
                <span className="text-slate-400 font-semibold block">What They Need:</span>
                <p className="text-indigo-300 mt-0.5 leading-relaxed">{stk.whatTheyNeed}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/60">
                <span className="text-slate-400 font-semibold block">Next Engagement Plan:</span>
                <p className="text-emerald-300 mt-0.5 leading-relaxed">{stk.nextEngagement}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center">
                <UserCheck className="w-3.5 h-3.5 mr-1 text-slate-400" />
                FlytBase Owner: {stk.internalFlytbaseOwner}
              </span>
              <span className="font-mono text-[10px] text-slate-400">{stk.id}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
