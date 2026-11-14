'use client';

import React, { useState, useEffect } from 'react';
import { CrmAggregator } from '@/lib/business/crm-aggregator';
import { EvidenceSource, VerificationStatus } from '@/lib/types/crm';
import { VerificationBadge } from '@/components/shared/VerificationBadge';
import { SourceModal } from '@/components/shared/SourceModal';
import { Database, ShieldCheck, Search, Filter, ExternalLink } from 'lucide-react';

export default function EvidencePage() {
  const [data, setData] = useState(CrmAggregator.getAggregatedData());
  const [selectedSource, setSelectedSource] = useState<EvidenceSource | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [accountFilter, setAccountFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    setData(CrmAggregator.getAggregatedData());
  }, []);

  const filteredSources = data.allSources.filter((src) => {
    const matchesAccount =
      accountFilter === 'ALL' || src.account.toLowerCase().includes(accountFilter.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || src.verificationStatus === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      src.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.recordId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.rawExcerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.toolName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesAccount && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Provenance Ledger
            </span>
            <span className="text-xs text-slate-400">Zero-Fabrication Data Registry</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight mt-1">
            Data Source & Evidence Traceability Registry
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Every figure, date, and stakeholder is cryptographically traceable to an authentic MCP tool record.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search records or excerpts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

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

      {/* Registry Table */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Evidence ID</th>
                <th className="py-3 px-4">Source Tool</th>
                <th className="py-3 px-4">Record ID</th>
                <th className="py-3 px-4">Account</th>
                <th className="py-3 px-4">Verification Level</th>
                <th className="py-3 px-4">Raw Excerpt</th>
                <th className="py-3 px-4">Audit Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredSources.map((src) => (
                <tr key={src.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-mono font-semibold text-indigo-400">
                    {src.id}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">
                    {src.toolName}
                  </td>
                  <td className="py-3 px-4 font-mono text-sky-300">
                    {src.recordId}
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-medium">
                    {src.account}
                  </td>
                  <td className="py-3 px-4">
                    <VerificationBadge
                      status={src.verificationStatus}
                      onClickSource={() => setSelectedSource(src)}
                    />
                  </td>
                  <td className="py-3 px-4 text-slate-400 max-w-sm truncate font-mono text-[11px]">
                    {src.rawExcerpt}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedSource(src)}
                      className="flex items-center space-x-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded transition text-[11px]"
                    >
                      <span>Inspect Excerpt</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-950/50 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>
            Strict zero-fabrication guarantee: Every financial value and stakeholder reference is mapped to this registry.
          </span>
          <span className="font-mono text-slate-400">
            {filteredSources.length} of {data.allSources.length} Records Shown
          </span>
        </div>
      </div>

      <SourceModal
        source={selectedSource}
        onClose={() => setSelectedSource(null)}
      />
    </div>
  );
}
