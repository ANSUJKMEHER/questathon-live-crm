'use client';

import React, { useState, useEffect } from 'react';
import { CrmAggregator } from '@/lib/business/crm-aggregator';
import { Deal, EvidenceSource, VerificationStatus } from '@/lib/types/crm';
import { VerificationBadge } from '@/components/shared/VerificationBadge';
import { SourceModal } from '@/components/shared/SourceModal';
import { Briefcase, Filter, ShieldCheck, AlertCircle, FileCheck } from 'lucide-react';

export default function DealsPage() {
  const [data, setData] = useState(CrmAggregator.getAggregatedData());
  const [selectedSource, setSelectedSource] = useState<EvidenceSource | null>(null);
  const [accountFilter, setAccountFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  useEffect(() => {
    setData(CrmAggregator.getAggregatedData());
  }, []);

  const filteredDeals = data.allDeals.filter((d) => {
    const matchesAccount =
      accountFilter === 'ALL' || d.account.toLowerCase().includes(accountFilter.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || d.confidence === statusFilter;
    return matchesAccount && matchesStatus;
  });

  const verifiedSum = filteredDeals
    .filter((d) => d.confidence === 'VERIFIED_FACT')
    .reduce((acc, d) => acc + (d.value || 0), 0);

  const claimSum = filteredDeals
    .filter((d) => d.confidence === 'CUSTOMER_CLAIM')
    .reduce((acc, d) => acc + (d.value || 0), 0);

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Commercial Valuation Matrix
            </span>
            <span className="text-xs text-slate-400">Question 1 Across All Accounts</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight mt-1">
            Enterprise Deals & Contract Pipeline
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Strict segregation of contractually committed revenue from unverified customer expansions.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-3 text-xs">
          <select
            value={accountFilter}
            onChange={(e) => setAccountFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200"
          >
            <option value="ALL">All Accounts</option>
            <option value="Eastern">Eastern Counties Police</option>
            <option value="Aldermoor">Aldermoor Industrial</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200"
          >
            <option value="ALL">All Verification Levels</option>
            <option value="VERIFIED_FACT">Verified Facts Only</option>
            <option value="CUSTOMER_CLAIM">Customer Claims Only</option>
            <option value="UNVERIFIED_ESTIMATE">Unverified Estimates</option>
          </select>
        </div>
      </div>

      {/* Revenue Verification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Filtered Verified Committed Value
            </span>
            <div className="text-2xl font-bold text-emerald-300 mt-1">
              £{verifiedSum.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-400/80 mt-0.5">
              Audited against POs and signed contracts.
            </p>
          </div>
          <ShieldCheck className="w-8 h-8 text-emerald-400/50" />
        </div>

        <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Filtered Customer Champion Claims
            </span>
            <div className="text-2xl font-bold text-amber-300 mt-1">
              £{claimSum.toLocaleString()}
            </div>
            <p className="text-[11px] text-amber-400/80 mt-0.5">
              Verbal customer aspirations, excluded from verified book total.
            </p>
          </div>
          <AlertCircle className="w-8 h-8 text-amber-400/50" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Deal & ID</th>
                <th className="py-3 px-4">Account</th>
                <th className="py-3 px-4">Stage / Category</th>
                <th className="py-3 px-4">Value</th>
                <th className="py-3 px-4">Decision-Maker</th>
                <th className="py-3 px-4">Key Blocker</th>
                <th className="py-3 px-4">Source Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredDeals.map((deal) => (
                <tr key={deal.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-medium text-slate-200">
                    <div>{deal.name}</div>
                    <span className="font-mono text-[10px] text-slate-400">{deal.id}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-medium">
                    {deal.account}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                      {deal.stage} ({deal.category})
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-100 font-mono text-sm">
                      {deal.displayValue}
                    </div>
                    <VerificationBadge
                      status={deal.confidence}
                      onClickSource={() => setSelectedSource(deal.evidenceSource)}
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
                      onClick={() => setSelectedSource(deal.evidenceSource)}
                      className="text-indigo-400 hover:text-indigo-300 font-mono text-xs underline underline-offset-2 transition block"
                    >
                      {deal.evidenceSource.recordId}
                    </button>
                    <span className="text-[10px] text-slate-400">
                      {deal.evidenceSource.toolName}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SourceModal
        source={selectedSource}
        onClose={() => setSelectedSource(null)}
      />
    </div>
  );
}
