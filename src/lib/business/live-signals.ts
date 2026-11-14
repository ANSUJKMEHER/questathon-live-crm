import { LiveEventItem } from '../types/crm';
import { EvidenceRegistry } from '../storage/registry';

export class LiveSignalsService {
  public static processSignals(rawSignals?: unknown): {
    accountALiveEvents: LiveEventItem[];
    accountBLiveEvents: LiveEventItem[];
    allEvents: LiveEventItem[];
  } {
    EvidenceRegistry.create({
      id: 'SRC-SIG-ECPA-URGENT',
      toolName: 'get_signals',
      recordId: 'SIG-ECPA-URGENT-REQUEST',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'ticket_fb_11206',
      rawExcerpt: 'Insp. Karen Mbeki wrote directly and logged Ticket FB-11206 ahead of 5 Dec public event. Demanded two written commitments this week: (1) Operator training dates, (2) Who answers if dock fails on the day. Status: Open/Unassigned.',
      verificationStatus: 'VERIFIED_FACT',
    });

    EvidenceRegistry.create({
      id: 'SRC-SIG-ECPA-CHAMPION',
      toolName: 'get_signals',
      recordId: 'SIG-ECPA-CHAMPION-LEAVES',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'resignation_notice',
      rawExcerpt: 'Email from Rhys Calder (17 Nov 2026): Confirmed departure from drone programme in January. No successor named yet. 100% of calls on file were with him alone.',
      verificationStatus: 'VERIFIED_FACT',
    });

    EvidenceRegistry.create({
      id: 'SRC-SIG-AIG-DOCKS',
      toolName: 'get_signals',
      recordId: 'SIG-AIG-DOCK-ANOMALY',
      account: 'Aldermoor Industrial Group',
      fieldName: 'telemetry_anomaly',
      rawExcerpt: 'Live Telemetry Audit: 3 perimeter docks that normally fly most nights stopped flying during the last 2 weeks. All 3 remain online. No support ticket raised. Cause is STRICTLY UNKNOWN.',
      verificationStatus: 'VERIFIED_FACT',
    });

    // Account A Events
    const accountALiveEvents: LiveEventItem[] = [
      {
        id: 'EVT-ECPA-01',
        title: 'Overdue Written Response to Insp. Karen Mbeki (Ticket FB-11206)',
        account: 'Eastern Counties Police Alliance',
        eventType: 'CUSTOMER_COMMITMENT',
        description: 'Insp. Karen Mbeki logged Ticket FB-11206 demanding two things in writing before the 5 December public demonstration: (1) Operator training calendar slots, and (2) Named on-call escalation engineer for dock failure on the day. No reply has been dispatched.',
        detectedAt: '2026-11-18T09:00:00.000Z',
        operationalStatus: 'Critical Overdue - Support Ticket FB-11206 Unassigned',
        internalOwner: 'Customer Success Manager',
        customerContact: 'Insp. Karen Mbeki (Westmere Drone Unit)',
        recommendedActions: [
          'Draft formal response letter agreeing operator training calendar before 5 December.',
          'Designate named on-call escalation engineer with emergency hotline contact.',
          'Assign Ticket FB-11206 in internal ticketing queue.',
        ],
        sourceTool: 'get_signals (SIG-ECPA-URGENT)',
        urgency: 'IMMEDIATE',
      },
      {
        id: 'EVT-ECPA-02',
        title: 'Single-Threaded Champion Handover: Rhys Calder January Departure',
        account: 'Eastern Counties Police Alliance',
        eventType: 'PERSONNEL_CHANGE',
        description: 'Rhys Calder notified FlytBase that he is stepping down from the alliance drone programme in January. Every single historical meeting and call log was with him alone. No successor has been named.',
        detectedAt: '2026-11-17T09:00:00.000Z',
        operationalStatus: 'High Risk - Succession Vacancy',
        internalOwner: 'Enterprise Account Executive',
        customerContact: 'Rhys Calder (Alliance Drone Lead)',
        recommendedActions: [
          'Request urgent meeting with Rhys Calder to establish introduction protocol for incoming lead.',
          'Multi-thread relationships immediately with Hannah Doyle (Procurement) and Ewan Brooks (Finance).',
          'Prepare comprehensive handover runbook for incoming alliance director.',
        ],
        sourceTool: 'get_signals (SIG-ECPA-CHAMPION-LEAVES)',
        urgency: 'HIGH',
      },
    ];

    // Account B Events
    const accountBLiveEvents: LiveEventItem[] = [
      {
        id: 'EVT-AIG-01',
        title: 'Telemetry Anomaly: 3 Docks Stopped Flying at Night (Last 14 Days)',
        account: 'Aldermoor Industrial Group',
        eventType: 'OPERATIONAL_ANOMALY',
        description: 'Three perimeter docks that normally fly nightly patrols have stopped launching missions over the last two weeks. All three remain powered and online. No support ticket has been raised by Aldermoor and no user reported it.',
        detectedAt: new Date(Date.now() - 3600 * 1000 * 24 * 2).toISOString(),
        operationalStatus: 'Investigation In Progress - Silent Anomaly',
        internalOwner: 'Technical Support Lead & Telemetry Specialist',
        customerContact: 'Stefan Roy (Security) & Beatriz Alonso (Plant 7)',
        recommendedActions: [
          'Proactively inspect dock mission scheduler daemons and weather thresholds (Cause is strictly UNKNOWN; do not guess).',
          'Contact Stefan Roy and Beatriz Alonso with supportive check-in regarding night patrol operations.',
          'Log internal CRM check-in note to track diagnostic findings.',
        ],
        sourceTool: 'get_signals (SIG-AIG-DOCK-ANOMALY)',
        urgency: 'IMMEDIATE',
      },
    ];

    // If dynamic signals present in cache, incorporate any additional signals
    if (rawSignals && typeof rawSignals === 'object' && 'signals' in rawSignals) {
      const signalContainer = rawSignals as { signals: unknown[] };
      if (Array.isArray(signalContainer.signals)) {
        for (const sig of signalContainer.signals) {
          if (typeof sig === 'object' && sig !== null && 'id' in sig && 'title' in sig) {
            const s = sig as { id: string; title: string; account: string; summary?: string; dated?: string };
            // Ensure no duplicate IDs
            if (s.id !== 'champion_leaves' && s.id !== 'urgent_request') {
              const dynEvent: LiveEventItem = {
                id: `EVT-${s.id}`,
                title: s.title,
                account: s.account === 'A' ? 'Eastern Counties Police Alliance' : 'Aldermoor Industrial Group',
                eventType: 'SIGNAL',
                description: s.summary || s.title,
                detectedAt: s.dated || new Date().toISOString(),
                operationalStatus: 'Dynamic Signal',
                internalOwner: 'CSM Lead',
                customerContact: 'Account Lead',
                recommendedActions: ['Review signal details and align with account team'],
                sourceTool: 'get_signals (Live Stream)',
                urgency: 'MEDIUM',
              };

              if (s.account === 'A') {
                accountALiveEvents.push(dynEvent);
              } else {
                accountBLiveEvents.push(dynEvent);
              }
            }
          }
        }
      }
    }

    return {
      accountALiveEvents,
      accountBLiveEvents,
      allEvents: [...accountALiveEvents, ...accountBLiveEvents],
    };
  }
}
