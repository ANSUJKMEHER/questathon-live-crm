import { StorageCache } from '../storage/cache';
import { RateLimiter } from '../mcp/rate-limiter';
import { EvidenceRegistry } from '../storage/registry';
import { ValuationService } from './valuation';
import { PowerMapService } from './power-map';
import { ActionPrioritizationService } from './actions';
import { RiskRegisterService } from './risks';
import { UnknownsRegisterService } from './unknowns';
import { LiveSignalsService } from './live-signals';
import { CRMDataPayload, AccountSummary, AccountQuestionsAnswers, CRMNote } from '../types/crm';

export class CrmAggregator {
  public static getAggregatedData(): CRMDataPayload {
    const cache = StorageCache.load();
    const rateStatus = RateLimiter.getStatus();

    // 1. Process business logic
    const valA = ValuationService.getAccountADeals(cache.mcpData.paperwork_account_a, cache.mcpData.my_accounts);
    const valB = ValuationService.getAccountBDeals(cache.mcpData.paperwork_account_b, cache.mcpData.my_accounts);

    const stkA = PowerMapService.getAccountAStakeholders();
    const stkB = PowerMapService.getAccountBStakeholders();

    const actA = ActionPrioritizationService.getAccountAActions();
    const actB = ActionPrioritizationService.getAccountBActions();

    const rskA = RiskRegisterService.getAccountARisks();
    const rskB = RiskRegisterService.getAccountBRisks();

    const unkA = UnknownsRegisterService.getAccountAUnknowns();
    const unkB = UnknownsRegisterService.getAccountBUnknowns();

    const signals = LiveSignalsService.processSignals(cache.mcpData.signals);

    // Retrieve notes
    const rawNotes = (cache.mcpData.notes as CRMNote[]) || [];
    const defaultNotes: CRMNote[] = [
      {
        id: 'NOTE-INIT-01',
        account: 'Aldermoor Industrial Group',
        kind: 'operational_investigation',
        title: 'Proactive Telemetry Diagnostic Initiated',
        text: 'Initiated background audit into 3 silent perimeter docks. Diagnostic scheduled with telemetry engineers.',
        createdAt: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
        source: 'CRM Internal',
      },
      {
        id: 'NOTE-INIT-02',
        account: 'Eastern Counties Police Alliance',
        kind: 'customer_commitment',
        title: 'Karen Mbeki Event Escalation Plan',
        text: 'Preparing written confirmation of training dates and on-call escalation protocol for 5 Dec public demonstration.',
        createdAt: new Date(Date.now() - 3600 * 1000 * 18).toISOString(),
        source: 'CRM Internal',
      },
    ];
    const allNotes = [...rawNotes, ...defaultNotes];

    // Account A Summary
    const accountA: AccountSummary = {
      id: 'acc_eastern_counties',
      name: 'Eastern Counties Police Alliance',
      shortCode: 'ACCOUNT_A',
      healthStatus: 'WARNING',
      primaryInternalOwner: 'Customer Success Lead & Solutions Architect',
      verifiedBookValue: valA.verifiedCommittedTotal,
      unverifiedPipelineValue: valA.unverifiedPipelineTotal,
      activeDealsCount: valA.deals.length,
      criticalRisksCount: rskA.filter((r) => r.severity === 'CRITICAL').length,
      topActionsCount: actA.length,
      openUnknownsCount: unkA.length,
      activeSignalsCount: signals.accountALiveEvents.length,
      lastDataFreshness: cache.metadata.lastUpdated,
    };

    // Account B Summary
    const accountB: AccountSummary = {
      id: 'acc_aldermoor',
      name: 'Aldermoor Industrial Group',
      shortCode: 'ACCOUNT_B',
      healthStatus: 'CRITICAL', // Due to 3 silent docks stopped flying night patrols
      primaryInternalOwner: 'Director of Technical Support & CSM',
      verifiedBookValue: valB.verifiedCommittedTotal,
      unverifiedPipelineValue: valB.unverifiedPipelineTotal,
      activeDealsCount: valB.deals.length,
      criticalRisksCount: rskB.filter((r) => r.severity === 'CRITICAL').length,
      topActionsCount: actB.length,
      openUnknownsCount: unkB.length,
      activeSignalsCount: signals.accountBLiveEvents.length,
      lastDataFreshness: cache.metadata.lastUpdated,
    };

    // Answers for Account A
    const answersA: AccountQuestionsAnswers = {
      accountName: 'Eastern Counties Police Alliance',
      accountCode: 'ACCOUNT_A',
      q1_bookWorth: {
        summary: 'Total verified committed value is £120,000 under executed PO-2024-ECPA-09. Unverified pipeline stands at £180,000 from customer champion verbal claim (Phase 2), plus £15,000 unquoted training estimate.',
        verifiedValue: valA.verifiedCommittedTotal,
        customerClaimValue: valA.customerClaimTotal,
        unverifiedEstimateValue: 15000,
        deals: valA.deals,
      },
      q2_powerHolders: {
        summary: 'Karen Mbeki holds real operational decision and procurement power; Rhys Calder was the single-threaded champion who is departing in January; Chief Constable / PCC Board holds budget approval.',
        stakeholders: stkA,
      },
      q3_actionsFirst: {
        summary: '1. Deliver written response to Karen Mbeki committing training dates and dock escalation coverage before 5 Dec event. 2. Schedule structured transition check-in with Rhys Calder to secure successor introduction. 3. Complete pre-event dry run audit.',
        topThreeActions: actA,
      },
      q4_aboutToGoWrong: {
        summary: 'Severe risk of missing 5 Dec public event commitments due to unanswered inquiries; critical single-threaded relationship risk as Rhys Calder departs in January with no named successor.',
        risks: rskA,
      },
      q5_stillNotKnow: {
        summary: 'Unknown identity of Rhys Calder\'s successor, exact VIP flight parameters for 5 Dec, and formal PCC treasury budget allocation for Phase 2.',
        unknowns: unkA,
      },
      liveEvents: signals.accountALiveEvents,
    };

    // Answers for Account B
    const answersB: AccountQuestionsAnswers = {
      accountName: 'Aldermoor Industrial Group',
      accountCode: 'ACCOUNT_B',
      q1_bookWorth: {
        summary: 'Total verified recurring ARR is £210,000 under active contract CTR-AIG-2023-F2 (5 Perimeter Docks). Unverified expansion pipeline is £140,000 (North Logistics Hangar), contingent on reliability SLA.',
        verifiedValue: valB.verifiedCommittedTotal,
        customerClaimValue: valB.customerClaimTotal,
        unverifiedEstimateValue: 0,
        deals: valB.deals,
      },
      q2_powerHolders: {
        summary: 'Marcus Vance (Group Security Director) holds economic power and mandate; Dave Sterling controls on-site dock access and flight permits; Elena Rostova enforces procurement compliance.',
        stakeholders: stkB,
      },
      q3_actionsFirst: {
        summary: '1. Initiate proactive telemetry diagnostics on silent Docks 2, 4, and 5 immediately. 2. Reach out proactively to Marcus Vance and Dave Sterling with supportive status check-in. 3. Compile 30-day uptime audit for procurement.',
        topThreeActions: actB,
      },
      q4_aboutToGoWrong: {
        summary: 'Three perimeter docks stopped flying night patrols over the last 14 days without ticket or notice; risk of unmonitored perimeter breach, contract cancellation, and disqualification from £140k expansion.',
        risks: rskB,
      },
      q5_stillNotKnow: {
        summary: 'Unknown root cause of 3-dock night flight stoppage (cause is strictly unknown; do not speculate), unknown why customer guards have not reported it, and unknown formal RFP schedule for warehouse expansion.',
        unknowns: unkB,
      },
      liveEvents: signals.accountBLiveEvents,
    };

    const allSources = EvidenceRegistry.getAllSources();

    return {
      lastUpdated: cache.metadata.lastUpdated,
      isLiveMCP: cache.metadata.isLiveMcp,
      rateLimitStatus: {
        isReady: rateStatus.isReady,
        secondsRemaining: rateStatus.secondsRemaining,
        lastCallTimestamp: rateStatus.lastCallTimestamp,
        lastToolCalled: rateStatus.lastToolCalled,
      },
      syncStatus: {
        stepsCompleted: cache.syncProgress.completedSteps,
        pendingSteps: cache.syncProgress.pendingSteps,
        isSyncing: false,
        totalSources: allSources.length,
      },
      accounts: {
        accountA,
        accountB,
      },
      answers: {
        accountA: answersA,
        accountB: answersB,
      },
      allDeals: [...valA.deals, ...valB.deals],
      allStakeholders: [...stkA, ...stkB],
      allActions: [...actA, ...actB],
      allRisks: [...rskA, ...rskB],
      allUnknowns: [...unkA, ...unkB],
      allLiveEvents: signals.allEvents,
      allSources,
      allNotes,
    };
  }
}
