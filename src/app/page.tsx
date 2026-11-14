'use client';

import React, { useState, useEffect } from 'react';
import { CrmAggregator } from '@/lib/business/crm-aggregator';
import { CRMDataPayload, EvidenceSource } from '@/lib/types/crm';
import { MetricCard } from '@/components/shared/MetricCard';
import { SourceModal } from '@/components/shared/SourceModal';
import { RevenueBreakdownChart } from '@/components/charts/RevenueBreakdownChart';
import {
  ShieldCheck,
  TrendingUp,
  AlertOctagon,
  Calendar,
  Radio,
  ArrowUpRight,
  Shield,
  Building2,
  Clock,
  CheckSquare,
} from 'lucide-react';
import Link from 'next/link';

export default function OverviewPage() {
  const [data, setData] = useState<CRMDataPayload | null>(null);
  const [selectedSource, setSelectedSource] = useState<EvidenceSource | null>(null);

  useEffect(() => {
    setData(CrmAggregator.getAggregatedData());
  }, []);

  if (!data) return null;

  const chartData = [
    {
      account: 'Eastern Counties Police',
      verified: data.accounts.accountA.verifiedBookValue,
      claim: data.answers.accountA.q1_bookWorth.customerClaimValue,
      estimate: data.answers.accountA.q1_bookWorth.unverifiedEstimateValue,
    },
    {
      account: 'Aldermoor Industrial',
      verified: data.accounts.accountB.verifiedBookValue,
      claim: data.answers.accountB.q1_bookWorth.customerClaimValue,
      estimate: data.answers.accountB.q1_bookWorth.unverifiedEstimateValue,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Executive CSM Cockpit
            </span>
            <span className="text-xs text-slate-400">
              Dual-Account Command Center • Reconciled
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight mt-1">
            Autonomous Drone Programme Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time evidence-backed operational intelligence for Monday morning executive briefing.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <Link
            href="/eastern-counties"
            className="flex items-center space-x-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 transition"
          >
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>Account A</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </Link>
          <Link
            href="/aldermoor"
            className="flex items-center space-x-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 transition"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Account B</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Qualified Renewal Baseline"
          value={`$${(
            data.accounts.accountA.qualifiedRenewalBaseline +
            data.accounts.accountB.qualifiedRenewalBaseline
          ).toLocaleString()}`}
          subtitle="ECPA $128,057 + Aldermoor $26,164 (Qualified)"
          badge="Evidence-Backed"
          badgeColor="emerald"
          icon={ShieldCheck}
          onInspectSource={() =>
            setSelectedSource(data.allSources[0] || null)
          }
        />

        <MetricCard
          title="Qualified Pipeline Baseline"
          value={`$${(
            data.accounts.accountA.qualifiedPipelineBaseline +
            data.accounts.accountB.qualifiedPipelineBaseline
          ).toLocaleString()}`}
          subtitle="Tarn $142k + Tender $536k + Idle $5k + Sister $208k"
          badge="Qualified Pipeline"
          badgeColor="indigo"
          icon={TrendingUp}
        />

        <MetricCard
          title="Speculative Pipeline Ceilings"
          value={`$${(
            data.accounts.accountA.speculativeCeilingTotal +
            data.accounts.accountB.speculativeCeilingTotal
          ).toLocaleString()}`}
          subtitle="Tarn $200k + Tender $1.5M + Sister $1.2M"
          badge="Speculative Max"
          badgeColor="amber"
          icon={TrendingUp}
        />

        <MetricCard
          title="Next Critical Deadline"
          value="05 Dec 2026"
          subtitle="Westmere Public Event Showcase"
          badge="Ticket FB-11206"
          badgeColor="rose"
          icon={Calendar}
        />
      </div>

      {/* Dual Account Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account A */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-slate-700 transition">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  {data.accounts.accountA.name}
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  Account A • Constabulary Public Sector
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              WARNING
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <div>
              <span className="text-slate-400">Renewal Baseline:</span>
              <div className="text-sm font-bold text-slate-200 font-mono">
                ${data.accounts.accountA.qualifiedRenewalBaseline.toLocaleString()}
              </div>
            </div>
            <div>
              <span className="text-slate-400">Qualified Pipeline:</span>
              <div className="text-sm font-bold text-indigo-400 font-mono">
                ${data.accounts.accountA.qualifiedPipelineBaseline.toLocaleString()}
              </div>
            </div>
            <div>
              <span className="text-slate-400">Speculative Ceiling:</span>
              <div className="text-sm font-bold text-amber-400 font-mono">
                ${data.accounts.accountA.speculativeCeilingTotal.toLocaleString()}
              </div>
            </div>
            <div>
              <span className="text-slate-400">Expired Deals:</span>
              <div className="text-sm font-bold text-rose-400 font-mono">
                $0 (Westmere)
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-300 space-y-1">
            <span className="font-semibold text-slate-400 text-[11px] uppercase tracking-wider block">
              Manager Alert:
            </span>
            <p className="leading-relaxed">
              Ticket FB-11206: Karen Mbeki requires written commitment on training and event dock escalation before 5 Dec event. Rhys Calder departing in January with no named successor. Scale Westmere fleet expired at $0.
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <Link
              href="/eastern-counties"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
            >
              <span>Inspect Account A 5-Question Answers</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Account B */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-slate-700 transition">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  {data.accounts.accountB.name}
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  Account B • Industrial Logistics & Security
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
              CRITICAL
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <div>
              <span className="text-slate-400">Renewal Baseline (ARR):</span>
              <div className="text-sm font-bold text-slate-200 font-mono">
                ${data.accounts.accountB.qualifiedRenewalBaseline.toLocaleString()}
              </div>
            </div>
            <div>
              <span className="text-slate-400">Qualified Pipeline:</span>
              <div className="text-sm font-bold text-indigo-400 font-mono">
                ${data.accounts.accountB.qualifiedPipelineBaseline.toLocaleString()}
              </div>
            </div>
            <div>
              <span className="text-slate-400">Speculative Ceiling:</span>
              <div className="text-sm font-bold text-amber-400 font-mono">
                ${data.accounts.accountB.speculativeCeilingTotal.toLocaleString()}
              </div>
            </div>
            <div>
              <span className="text-slate-400">Unidentified / Null:</span>
              <div className="text-sm font-bold text-slate-400 font-mono">
                $0 (Insurance / Idle)
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-300 space-y-1">
            <span className="font-semibold text-slate-400 text-[11px] uppercase tracking-wider block">
              Manager Alert:
            </span>
            <p className="leading-relaxed">
              Silent anomaly: 3 perimeter docks stopped flying at night for 14 days while online. Nadia Rahman refuses renewal without guard cost reduction. Owen Fitch (IT Lead) has never been met.
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <Link
              href="/aldermoor"
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center space-x-1"
            >
              <span>Inspect Account B 5-Question Answers</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Revenue Valuation Chart & Immediate Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Audited Revenue Composition ($)
              </h3>
              <p className="text-xs text-slate-400">
                Strict separation of verified contracts vs uncommitted customer claims.
              </p>
            </div>
          </div>
          <RevenueBreakdownChart data={chartData} />
        </div>

        {/* Highest Priority Actions Feed */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  Top Priority Immediate Actions
                </h3>
                <p className="text-xs text-slate-400">
                  Ordered by deadline urgency and risk severity.
                </p>
              </div>
              <Link
                href="/action-plan"
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {data.allActions.slice(0, 3).map((act) => (
                <div
                  key={act.id}
                  className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg text-xs flex items-start space-x-3"
                >
                  <div className="w-5 h-5 rounded bg-sky-500/20 text-sky-400 font-bold font-mono flex items-center justify-center shrink-0 text-[10px]">
                    #{act.priorityRank}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-200">{act.action}</p>
                    <div className="mt-1 flex items-center space-x-2 text-[11px] text-slate-400">
                      <span>Owner: <strong className="text-slate-300">{act.owner}</strong></span>
                      <span>•</span>
                      <span>Due: <strong className="text-rose-400">{act.dueDate}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Every action backed by verified challenge evidence.</span>
            <span className="font-mono text-[10px]">6 Actions Active</span>
          </div>
        </div>
      </div>

      <SourceModal
        source={selectedSource}
        onClose={() => setSelectedSource(null)}
      />
    </div>
  );
}
