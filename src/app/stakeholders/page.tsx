'use client';

import React, { useState, useEffect } from 'react';
import { CrmAggregator } from '@/lib/business/crm-aggregator';
import { PowerMapSection } from '@/components/questions/PowerMapSection';
import { Users } from 'lucide-react';

export default function StakeholdersPage() {
  const [data, setData] = useState(CrmAggregator.getAggregatedData());
  const [accountFilter, setAccountFilter] = useState<string>('ALL');

  useEffect(() => {
    setData(CrmAggregator.getAggregatedData());
  }, []);

  const filteredStakeholders = data.allStakeholders.filter((stk) => {
    if (accountFilter === 'ALL') return true;
    return stk.account.toLowerCase().includes(accountFilter.toLowerCase());
  });

  const filteredMappings = data.allDealPowerMappings.filter((dpm) => {
    if (accountFilter === 'ALL') return true;
    return dpm.account.toLowerCase().includes(accountFilter.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Influence Architecture
            </span>
            <span className="text-xs text-slate-400">Question 2 Across All Accounts</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight mt-1">
            Stakeholder Power Map & Deal Decision Matrix
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Who decides, who pays, who uses, who blocks, who champions, and what each person needs before moving forward.
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

      <PowerMapSection
        stakeholders={filteredStakeholders}
        dealPowerMappings={filteredMappings}
        summary="Complete organizational relationship roster and deal power matrix. Highlights Karen Mbeki (Westmere decider), Nadia Rahman (Finance decider), and explicitly notes that Owen Fitch (Aldermoor IT Lead) has never been met by the player."
      />
    </div>
  );
}
