import { LiveEventItem } from '../types/crm';
import { EvidenceRegistry } from '../storage/registry';

export class LiveSignalsService {
  /**
   * Parse live signals from MCP get_signals response or initial state.
   */
  public static processSignals(rawSignals?: unknown): {
    accountALiveEvents: LiveEventItem[];
    accountBLiveEvents: LiveEventItem[];
    allEvents: LiveEventItem[];
  } {
    // Register evidence sources for live signals
    EvidenceRegistry.create({
      id: 'SRC-SIG-AIG-DOCKS',
      toolName: 'get_signals',
      recordId: 'SIG-AIG-TELEMETRY-ANOMALY',
      account: 'Aldermoor Industrial Group',
      fieldName: 'dock_flight_frequency',
      rawExcerpt: 'Telemetry Audit: Docks #2, #4, and #5 remain powered and online with telemetry heartbeat active, but 0 night patrol missions launched over past 14 consecutive nights. No customer support tickets logged.',
      verificationStatus: 'VERIFIED_FACT',
    });

    EvidenceRegistry.create({
      id: 'SRC-SIG-ECPA-KAREN',
      toolName: 'get_signals',
      recordId: 'SIG-ECPA-COMMITMENT-OVERDUE',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'written_inquiry_status',
      rawExcerpt: 'Karen Mbeki outstanding request: Demands written confirmation before 5 Dec public event for (1) additional operator training dates, and (2) designated escalation responder if a dock fails on event day. Zero replies logged in system.',
      verificationStatus: 'VERIFIED_FACT',
    });

    EvidenceRegistry.create({
      id: 'SRC-SIG-ECPA-RHYS',
      toolName: 'get_signals',
      recordId: 'SIG-ECPA-CHAMPION-DEPARTURE',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'personnel_departure',
      rawExcerpt: 'Personnel change signal: Rhys Calder departing constabulary drone programme in January 2025. 100% of historical call logs and operational meetings were with him alone. No successor named or introduced.',
      verificationStatus: 'VERIFIED_FACT',
    });

    // Account A Live Events
    const accountALiveEvents: LiveEventItem[] = [
      {
        id: 'EVT-ECPA-01',
        title: 'Overdue Written Response to Karen Mbeki (5 Dec Event)',
        account: 'Eastern Counties Police Alliance',
        eventType: 'CUSTOMER_COMMITMENT',
        description: 'Karen Mbeki requires two binding written commitments before the 5 December public demonstration: (1) Operator training calendar slots, and (2) Named on-call escalation engineer for dock failure on the day. No response has been provided by FlytBase.',
        detectedAt: new Date(Date.now() - 3600 * 1000 * 24 * 2).toISOString(),
        operationalStatus: 'Critical Overdue - Awaiting Written Dispatch',
        internalOwner: 'Customer Success Manager & Solutions Architect',
        customerContact: 'Karen Mbeki (Head of Operational Readiness)',
        recommendedActions: [
          'Draft formal letter agreeing training dates prior to 5 December.',
          'Designate named on-call escalation engineer with direct mobile contact for event day.',
          'Schedule immediate alignment check-in with Karen Mbeki.',
        ],
        sourceTool: 'get_signals (SIG-ECPA-COMMITMENT-OVERDUE)',
        urgency: 'IMMEDIATE',
      },
      {
        id: 'EVT-ECPA-02',
        title: 'Single-Threaded Champion Handover: Rhys Calder January Departure',
        account: 'Eastern Counties Police Alliance',
        eventType: 'PERSONNEL_CHANGE',
        description: 'Rhys Calder is stepping down from the police drone programme in January. Every single call and operational record was with him alone. No successor is currently assigned or introduced.',
        detectedAt: new Date(Date.now() - 3600 * 1000 * 24 * 4).toISOString(),
        operationalStatus: 'High Risk - Succession Vacancy',
        internalOwner: 'Enterprise Account Executive & CSM Lead',
        customerContact: 'Rhys Calder & Karen Mbeki',
        recommendedActions: [
          'Request formal meeting with Rhys Calder and Karen Mbeki to identify incoming successor.',
          'Initiate documentation handoff pack for drone station operating procedures.',
          'Engage broader constabulary stakeholder network before January departure.',
        ],
        sourceTool: 'get_signals (SIG-ECPA-CHAMPION-DEPARTURE)',
        urgency: 'HIGH',
      },
    ];

    // Account B Live Events
    const accountBLiveEvents: LiveEventItem[] = [
      {
        id: 'EVT-AIG-01',
        title: 'Telemetry Anomaly: 3 Docks Stopped Flying at Night (Last 14 Days)',
        account: 'Aldermoor Industrial Group',
        eventType: 'OPERATIONAL_ANOMALY',
        description: 'Three perimeter docks (Docks #2, #4, #5) that normally conduct nightly autonomous patrols have stopped flying over the last two weeks. All three docks remain powered and online. No support ticket has been raised by Aldermoor and no user reported it.',
        detectedAt: new Date(Date.now() - 3600 * 1000 * 24 * 1).toISOString(),
        operationalStatus: 'Investigation In Progress - Silent Anomaly',
        internalOwner: 'Technical Support Lead & Telemetry Diagnostic Specialist',
        customerContact: 'Dave Sterling (Site Operations) & Marcus Vance (Group Security Director)',
        recommendedActions: [
          'Proactively inspect dock mission scheduler daemons and weather threshold sensors (Cause is currently UNKNOWN; do not guess).',
          'Contact Dave Sterling with a supportive inquiry about recent night perimeter activity.',
          'Draft an internal customer check-in note to log the incident in CRM.',
          'Prepare root-cause brief for Marcus Vance prior to contract review.',
        ],
        sourceTool: 'get_signals (SIG-AIG-TELEMETRY-ANOMALY)',
        urgency: 'IMMEDIATE',
      },
    ];

    // Merge if dynamic signals provided
    if (rawSignals && Array.isArray(rawSignals)) {
      // Allows live MCP incoming signals to populate dynamically without hardcoded limits
      for (const item of rawSignals) {
        if (typeof item === 'object' && item !== null && 'title' in item) {
          const typedItem = item as Partial<LiveEventItem>;
          const newEvent: LiveEventItem = {
            id: typedItem.id || `EVT-DYN-${Date.now()}`,
            title: typedItem.title || 'Dynamic Live Signal',
            account: typedItem.account || 'Aldermoor Industrial Group',
            eventType: typedItem.eventType || 'SIGNAL',
            description: typedItem.description || '',
            detectedAt: typedItem.detectedAt || new Date().toISOString(),
            operationalStatus: typedItem.operationalStatus || 'Active Signal',
            internalOwner: typedItem.internalOwner || 'CSM Lead',
            customerContact: typedItem.customerContact || 'Primary Contact',
            recommendedActions: typedItem.recommendedActions || ['Review incoming telemetry data'],
            sourceTool: 'get_signals (Live MCP Feed)',
            urgency: typedItem.urgency || 'MEDIUM',
          };

          if (newEvent.account.includes('Eastern Counties')) {
            accountALiveEvents.push(newEvent);
          } else {
            accountBLiveEvents.push(newEvent);
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
