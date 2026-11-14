'use client';

import React, { useState, useEffect } from 'react';
import { CrmAggregator } from '@/lib/business/crm-aggregator';
import { ActionPlanSection } from '@/components/questions/ActionPlanSection';
import { CheckSquare } from 'lucide-react';

export default function ActionPlanPage() {
  const [data, setData] = useState(CrmAggregator.getAggregatedData());
  const [accountFilter, setAccountFilter] = useState<string>('ALL');

  useEffect(() => {
    setData(CrmAggregator.getAggregatedData());
  }, []);

  const filteredActions = data.allActions.filter((act) => {
    if (accountFilter === 'ALL') return true;
    return act.account.toLowerCase().includes(accountFilter.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
              Execution Cadence
            </span>
            <span className="text-xs text-slate-400">Question 3 Across All Accounts</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight mt-1">
            Prioritized CSM Action Plan
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Strictly ranked by deadline urgency, verified deal values, risk severity, and dependency chains.
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

      <ActionPlanSection
        actions={filteredActions}
        summary="Action items prioritized to neutralize critical risks: (1) Written commitment to Karen Mbeki before 5 Dec public event, (2) Proactive telemetry audit into 3 silent perimeter docks at Aldermoor, (3) Formal successor onboarding for Rhys Calder before January departure."
      />
    </div>
  );
}
