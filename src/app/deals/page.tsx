'use client';

import React, { useState, useEffect } from 'react';
import { CrmAggregator } from '@/lib/business/crm-aggregator';
import { Deal, EvidenceSource } from '@/lib/types/crm';
import { VerificationBadge } from '@/components/shared/VerificationBadge';
import { SourceModal } from '@/components/shared/SourceModal';
import { Briefcase, ShieldCheck, AlertCircle, XCircle } from 'lucide-react';

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

  const renewalBaselineSum = filteredDeals
    .filter((d) => d.category === 'Qualified Renewal Baseline')
    .reduce((acc, d) => acc + (d.value || 0), 0);

  const pipelineBaselineSum = filteredDeals
    .filter((d) => d.category === 'Qualified Pipeline')
    .reduce((acc, d) => acc + (d.value || 0), 0);

  const speculativeCeilingSum = filteredDeals
    .filter((d) => d.speculativeCeiling != null)
    .reduce((acc, d) => acc + (d.speculativeCeiling || 0), 0);

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Commercial Valuation Matrix
            </span>
            <span className="text-xs text-slate-400">Reconciled Deal Ledger</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight mt-1">
            Enterprise Deals & Reconciled Valuation Matrix
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Strict reconciliation of original task outcomes against live MCP records. Expired deadlines audited at $0.
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Qualified Renewal Baseline
            </span>
            <div className="text-2xl font-bold text-emerald-300 mt-1 font-mono">
              ${renewalBaselineSum.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-400/80 mt-0.5">
              ECPA $128k + Aldermoor $26k (Qualified). Note: Contractually confirmed revenue is unverified ($0 signed contracts).
            </p>
          </div>
          <ShieldCheck className="w-7 h-7 text-emerald-400/50 shrink-0" />
        </div>

        <div className="p-4 bg-indigo-500/10 border border-indigo-500/25 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Qualified Pipeline Baseline
            </span>
            <div className="text-2xl font-bold text-indigo-300 mt-1 font-mono">
              ${pipelineBaselineSum.toLocaleString()}
            </div>
            <p className="text-[11px] text-indigo-400/80 mt-0.5">
              Tarn $142k + Tender $536k + Idle $5.4k + Sister $208k (Total: $891,199).
            </p>
          </div>
          <AlertCircle className="w-7 h-7 text-indigo-400/50 shrink-0" />
        </div>

        <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Speculative Pipeline Ceilings
            </span>
            <div className="text-2xl font-bold text-amber-300 mt-1 font-mono">
              ${speculativeCeilingSum.toLocaleString()}
            </div>
            <p className="text-[11px] text-amber-400/80 mt-0.5">
              Tarn $200k + Tender $1.5M + Sister $1.2M ($2.9M). Idle plant excluded (null).
            </p>
          </div>
          <AlertCircle className="w-7 h-7 text-amber-400/50 shrink-0" />
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
                <th className="py-3 px-4">Supported Value</th>
                <th className="py-3 px-4">Task Outcome Baseline</th>
                <th className="py-3 px-4">Decision-Maker</th>
                <th className="py-3 px-4">Operational Blocker</th>
                <th className="py-3 px-4">Source Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredDeals.map((deal) => (
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
                  <td className="py-3.5 px-4 text-slate-300 font-medium">
                    {deal.account}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                        deal.stage === 'Expired'
                          ? 'bg-rose-500/15 text-rose-300 border-rose-500/30 font-semibold'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {deal.stage} ({deal.category})
                    </span>
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
                      onClickSource={() => setSelectedSource(deal.evidenceSource)}
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
