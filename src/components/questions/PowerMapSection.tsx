import React, { useState } from 'react';
import { Stakeholder, DealPowerMapping } from '@/lib/types/crm';
import { Users, Shield, CheckCircle, AlertTriangle, UserCheck, UserX, Briefcase } from 'lucide-react';

interface Props {
  stakeholders: Stakeholder[];
  dealPowerMappings?: DealPowerMapping[];
  summary: string;
}

export const PowerMapSection: React.FC<Props> = ({ stakeholders, dealPowerMappings = [], summary }) => {
  const [activeTab, setActiveTab] = useState<'stakeholders' | 'dealMatrix'>('stakeholders');

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
      case 'BLOCKER':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
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
      case 'UNMET':
        return <span className="text-purple-400 font-semibold flex items-center font-mono text-[10px]"><UserX className="w-3 h-3 mr-1" /> Unmet (Never Met)</span>;
      case 'NEUTRAL':
      default:
        return <span className="text-slate-400 font-semibold">Neutral</span>;
    }
  };

  return (
    <section className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
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

          {dealPowerMappings.length > 0 && (
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs shrink-0">
              <button
                onClick={() => setActiveTab('stakeholders')}
                className={`px-3 py-1 rounded-md font-medium transition ${
                  activeTab === 'stakeholders'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Key People ({stakeholders.length})
              </button>
              <button
                onClick={() => setActiveTab('dealMatrix')}
                className={`px-3 py-1 rounded-md font-medium transition flex items-center space-x-1 ${
                  activeTab === 'dealMatrix'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Briefcase className="w-3 h-3 mr-1" />
                <span>Deal Power Matrix ({dealPowerMappings.length})</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {activeTab === 'dealMatrix' && dealPowerMappings.length > 0 ? (
        <div className="p-6 overflow-x-auto">
          <div className="text-xs text-slate-400 mb-3">
            Mapping the 5 decision roles across every single deal: Decider, Payer, End User, Blocker, and Champion.
          </div>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Deal Name</th>
                <th className="py-3 px-3">Who Decides?</th>
                <th className="py-3 px-3">Who Pays?</th>
                <th className="py-3 px-3">Who Uses?</th>
                <th className="py-3 px-3">Who Can Block?</th>
                <th className="py-3 px-3">Champion & Status</th>
                <th className="py-3 px-3">What They Need</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {dealPowerMappings.map((dpm) => (
                <tr key={dpm.dealId} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-3 font-semibold text-slate-100 max-w-[180px]">
                    {dpm.dealName}
                    <span className="block font-mono text-[10px] text-slate-400">{dpm.dealId}</span>
                  </td>
                  <td className="py-3 px-3 text-purple-300 font-medium">
                    {dpm.decider}
                  </td>
                  <td className="py-3 px-3 text-emerald-300">
                    {dpm.payer}
                  </td>
                  <td className="py-3 px-3 text-blue-300">
                    {dpm.endUser}
                  </td>
                  <td className="py-3 px-3 text-rose-300 font-medium max-w-[160px]">
                    {dpm.blocker}
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-slate-200 font-medium">{dpm.champion}</div>
                    <div className="mt-0.5">{getRelationshipBadge(dpm.relationshipStatus)}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-300 max-w-[200px] leading-relaxed">
                    {dpm.whatTheyNeed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stakeholders.map((stk) => (
            <div
              key={stk.id}
              className={`bg-slate-950/80 border rounded-xl p-5 transition space-y-4 ${
                stk.relationshipStatus === 'UNMET'
                  ? 'border-purple-500/30 bg-purple-950/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold text-slate-100">{stk.name}</h4>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{stk.title}</p>
                </div>

                <div className="text-right">
                  <span
                    className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border ${getPowerCategoryBadge(
                      stk.powerCategory
                    )}`}
                  >
                    {stk.powerCategory.replace('_', ' ')}
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
                  Owner: {stk.internalFlytbaseOwner}
                </span>
                <span className="font-mono text-[10px] text-slate-400">{stk.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
