'use client';

import React, { useState, useEffect } from 'react';
import { CrmAggregator } from '@/lib/business/crm-aggregator';
import { CRMDataPayload, EvidenceSource } from '@/lib/types/crm';
import { BookWorthSection } from '@/components/questions/BookWorthSection';
import { PowerMapSection } from '@/components/questions/PowerMapSection';
import { ActionPlanSection } from '@/components/questions/ActionPlanSection';
import { RiskRegisterSection } from '@/components/questions/RiskRegisterSection';
import { UnknownsSection } from '@/components/questions/UnknownsSection';
import { LiveEventsSection } from '@/components/questions/LiveEventsSection';
import { SourceModal } from '@/components/shared/SourceModal';
import { WriteNoteModal } from '@/components/shared/WriteNoteModal';
import { Building2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AldermoorPage() {
  const [data, setData] = useState<CRMDataPayload | null>(null);
  const [selectedSource, setSelectedSource] = useState<EvidenceSource | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  useEffect(() => {
    setData(CrmAggregator.getAggregatedData());
  }, []);

  if (!data) return null;

  const ans = data.answers.accountB;

  return (
    <div className="space-y-8">
      {/* Account Header */}
      <div className="pb-6 border-b border-slate-800">
        <Link
          href="/"
          className="inline-flex items-center space-x-1 text-xs text-slate-400 hover:text-slate-200 transition mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Command Cockpit</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Account B
                </span>
                <span className="text-xs text-rose-400 font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 animate-pulse">
                  Health: CRITICAL (Silent Telemetry Anomaly)
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-100 tracking-tight mt-1">
                Aldermoor Industrial Group
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Automated Industrial Security & Logistics Perimeter Patrol • Commercial Enterprise
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsNoteModalOpen(true)}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold shadow transition"
            >
              Log Aldermoor Note
            </button>
          </div>
        </div>
      </div>

      {/* Live Signals & Events Section */}
      <LiveEventsSection
        events={ans.liveEvents}
        onLogNoteForEvent={() => setIsNoteModalOpen(true)}
      />

      {/* Question 1: What is the book worth? */}
      <BookWorthSection
        deals={ans.q1_bookWorth.deals}
        summary={ans.q1_bookWorth.summary}
        verifiedTotal={ans.q1_bookWorth.verifiedValue}
        customerClaimTotal={ans.q1_bookWorth.customerClaimValue}
        unverifiedEstimateTotal={ans.q1_bookWorth.unverifiedEstimateValue}
        onSelectSource={(src) => setSelectedSource(src)}
      />

      {/* Question 2: Who holds the power? */}
      <PowerMapSection
        stakeholders={ans.q2_powerHolders.stakeholders}
        dealPowerMappings={ans.q2_powerHolders.dealPowerMappings}
        summary={ans.q2_powerHolders.summary}
      />

      {/* Question 3: What do you do first? */}
      <ActionPlanSection
        actions={ans.q3_actionsFirst.topThreeActions}
        summary={ans.q3_actionsFirst.summary}
      />

      {/* Question 4: What is about to go wrong? */}
      <RiskRegisterSection
        risks={ans.q4_aboutToGoWrong.risks}
        summary={ans.q4_aboutToGoWrong.summary}
      />

      {/* Question 5: What do you still not know? */}
      <UnknownsSection
        unknowns={ans.q5_stillNotKnow.unknowns}
        summary={ans.q5_stillNotKnow.summary}
      />

      <SourceModal
        source={selectedSource}
        onClose={() => setSelectedSource(null)}
      />

      <WriteNoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onNoteAdded={() => setData(CrmAggregator.getAggregatedData())}
        defaultAccount="Aldermoor Industrial Group"
      />
    </div>
  );
}
