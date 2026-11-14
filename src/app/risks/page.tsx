'use client';

import React, { useState, useEffect } from 'react';
import { CrmAggregator } from '@/lib/business/crm-aggregator';
import { RiskRegisterSection } from '@/components/questions/RiskRegisterSection';
import { AlertOctagon } from 'lucide-react';

export default function RisksPage() {
  const [data, setData] = useState(CrmAggregator.getAggregatedData());
  const [accountFilter, setAccountFilter] = useState<string>('ALL');

  useEffect(() => {
    setData(CrmAggregator.getAggregatedData());
  }, []);

  const filteredRisks = data.allRisks.filter((risk) => {
    if (accountFilter === 'ALL') return true;
    return risk.account.toLowerCase().includes(accountFilter.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Vulnerability Index
            </span>
            <span className="text-xs text-slate-400">Question 4 Across All Accounts</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight mt-1">
            Actionable Risk Register & Threat Mitigations
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Systematic qualitative threat analysis without fabricated numerical probabilities.
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

      <RiskRegisterSection
        risks={filteredRisks}
        summary="Comprehensive threat register identifying critical deadlines approaching (5 Dec Police Event), single-threaded champion departure (Rhys Calder), and silent operational flight anomalies (3 Aldermoor docks unpatrolled at night)."
      />
    </div>
  );
}
