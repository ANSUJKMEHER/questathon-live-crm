'use client';

import React, { useState, useEffect } from 'react';
import { CrmAggregator } from '@/lib/business/crm-aggregator';
import { UnknownsSection } from '@/components/questions/UnknownsSection';
import { HelpCircle } from 'lucide-react';

export default function UnknownsPage() {
  const [data, setData] = useState(CrmAggregator.getAggregatedData());
  const [accountFilter, setAccountFilter] = useState<string>('ALL');

  useEffect(() => {
    setData(CrmAggregator.getAggregatedData());
  }, []);

  const filteredUnknowns = data.allUnknowns.filter((unk) => {
    if (accountFilter === 'ALL') return true;
    return unk.account.toLowerCase().includes(accountFilter.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Information Gap Matrix
            </span>
            <span className="text-xs text-slate-400">Question 5 Across All Accounts</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight mt-1">
            Explicit Unknowns & Discovery Register
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparently documenting missing variables without converting unverified assumptions into false facts.
          </p>
        </div>

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
        </div>
      </div>

      <UnknownsSection
        unknowns={filteredUnknowns}
        summary="Documented blindspots: Root cause of 3-dock flight stoppage at Aldermoor (strictly unknown), identity of incoming Police Drone Programme successor, and official status of Police PCC capital budget for Phase 2."
      />
    </div>
  );
}
