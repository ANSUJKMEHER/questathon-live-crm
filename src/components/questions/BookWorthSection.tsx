import React from 'react';
import { Deal, EvidenceSource } from '@/lib/types/crm';
import { VerificationBadge } from '../shared/VerificationBadge';
import { ShieldCheck, AlertCircle, FileSpreadsheet, XCircle } from 'lucide-react';

interface Props {
  deals: Deal[];
  summary: string;
  verifiedTotal: number;
  customerClaimTotal: number;
  unverifiedEstimateTotal: number;
  onSelectSource: (source: EvidenceSource) => void;
}

export const BookWorthSection: React.FC<Props> = ({
  deals,
  summary,
  verifiedTotal,
  customerClaimTotal,
  unverifiedEstimateTotal,
  onSelectSource,
}) => {
  return (
    <section className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                Question 1
              </span>
              <h3 className="text-lg font-bold text-slate-100 tracking-tight">
                What is the book worth?
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-400 max-w-3xl leading-relaxed">
              {summary}
            </p>
          </div>
        </div>

        {/* Revenue Categorization Cards */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
                Verified Committed Book
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-300 mt-2 font-mono">
              ${verifiedTotal.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-400/80 mt-1">
              Supported by executed contracts and audited force/plant fleet records.
            </p>
          </div>

          <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                Customer Champion Pipeline
              </span>
              <AlertCircle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-300 mt-2 font-mono">
              ${customerClaimTotal.toLocaleString()}
            </div>
            <p className="text-[11px] text-amber-400/80 mt-1">
              Verbal aspirations & tender ceilings; excluded from confirmed book revenue.
            </p>
          </div>

          <div className="p-4 bg-indigo-500/10 border border-indigo-500/25 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400">
                Unverified Estimates / Offers
              </span>
              <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-indigo-300 mt-2 font-mono">
              ${unverifiedEstimateTotal.toLocaleString()}
            </div>
            <p className="text-[11px] text-indigo-400/80 mt-1">
              Open offers & scoping estimates pending customer budget approval.
            </p>
          </div>
        </div>
      </div>

      {/* Deals Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Deal Name</th>
              <th className="py-3 px-4">Stage & Category</th>
              <th className="py-3 px-4">Supported Value</th>
              <th className="py-3 px-4">Original Task Outcome</th>
              <th className="py-3 px-4">Decision-Maker</th>
              <th className="py-3 px-4">Operational Blocker</th>
              <th className="py-3 px-4">Evidence & Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {deals.map((deal) => (
              <tr
                key={deal.id}
                className={`transition ${
                  deal.stage === 'Expired'
                    ? 'bg-rose-950/15 hover:bg-rose-950/25'
                    : 'hover:bg-slate-800/40'
                }`}
              >
                <td className="py-3.5 px-4 font-medium text-slate-200">
                  <div className="flex items-center space-x-1.5">
                    {deal.stage === 'Expired' && (
                      <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    )}
                    <span>{deal.name}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">{deal.id}</span>
                </td>
                <td className="py-3.5 px-4">
                  <div
                    className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium border ${
                      deal.stage === 'Expired'
                        ? 'bg-rose-500/15 text-rose-300 border-rose-500/30 font-semibold'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {deal.stage} ({deal.category})
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div
                    className={`font-bold font-mono text-sm ${
                      deal.stage === 'Expired' ? 'text-rose-400' : 'text-slate-100'
                    }`}
                  >
                    {deal.displayValue}
                  </div>
                  <VerificationBadge
                    status={deal.confidence}
                    onClickSource={() => onSelectSource(deal.evidenceSource)}
                  />
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`font-mono text-[11px] px-2 py-0.5 rounded border ${
                      deal.taskOutcomeStatus === 'Deadline Passed ($0)'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                        : deal.taskOutcomeStatus === 'Never Heard Of'
                        ? 'bg-slate-800 text-slate-400 border-slate-700'
                        : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
                    }`}
                  >
                    {deal.taskBaselineValue || 'Audited Baseline'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-300">
                  {deal.decisionMaker}
                </td>
                <td className="py-3.5 px-4 text-slate-400 max-w-xs leading-relaxed">
                  {deal.blocker}
                </td>
                <td className="py-3.5 px-4">
                  <button
                    onClick={() => onSelectSource(deal.evidenceSource)}
                    className="flex items-center space-x-1.5 text-indigo-400 hover:text-indigo-300 font-mono text-xs underline underline-offset-2 transition"
                  >
                    <span>{deal.evidenceSource.recordId}</span>
                  </button>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {deal.evidenceSource.toolName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-slate-950/50 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>
          Reconciled against original task outcomes and live MCP records. Expired deals audited at $0.
        </span>
        <span className="font-mono text-slate-400">Strict Rule #CSM-Q1</span>
      </div>
    </section>
  );
};
