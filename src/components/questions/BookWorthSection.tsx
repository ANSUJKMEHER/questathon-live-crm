import React from 'react';
import { Deal, EvidenceSource } from '@/lib/types/crm';
import { VerificationBadge } from '../shared/VerificationBadge';
import { ShieldCheck, AlertCircle, FileSpreadsheet } from 'lucide-react';

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
                Verified Committed Value
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-300 mt-2">
              £{verifiedTotal.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-400/80 mt-1">
              Supported by executed contracts and signed purchase orders.
            </p>
          </div>

          <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                Customer Champion Claim
              </span>
              <AlertCircle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-300 mt-2">
              £{customerClaimTotal.toLocaleString()}
            </div>
            <p className="text-[11px] text-amber-400/80 mt-1">
              Verbal intent or expansion request; uncommitted by budget holder.
            </p>
          </div>

          <div className="p-4 bg-indigo-500/10 border border-indigo-500/25 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400">
                Unverified Estimates
              </span>
              <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-indigo-300 mt-2">
              £{unverifiedEstimateTotal.toLocaleString()}
            </div>
            <p className="text-[11px] text-indigo-400/80 mt-1">
              Scoping estimates pending formal pricing quotation.
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
              <th className="py-3 px-4">Value</th>
              <th className="py-3 px-4">Decision-Maker</th>
              <th className="py-3 px-4">Operational Blocker</th>
              <th className="py-3 px-4">Evidence & Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {deals.map((deal) => (
              <tr key={deal.id} className="hover:bg-slate-800/40 transition">
                <td className="py-3.5 px-4 font-medium text-slate-200">
                  <div>{deal.name}</div>
                  <span className="font-mono text-[10px] text-slate-400">{deal.id}</span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    {deal.stage} ({deal.category})
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-100 font-mono text-sm">
                    {deal.displayValue}
                  </div>
                  <VerificationBadge
                    status={deal.confidence}
                    onClickSource={() => onSelectSource(deal.evidenceSource)}
                  />
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
          Compliance: Customer claims are segregated from verified book value. No artificial totals.
        </span>
        <span className="font-mono text-slate-400">Audit Rule #CSM-Q1</span>
      </div>
    </section>
  );
};
