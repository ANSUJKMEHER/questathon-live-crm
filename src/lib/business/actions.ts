import { ActionItem } from '../types/crm';

export class ActionPrioritizationService {
  /**
   * Top 3 highest-priority actions for Eastern Counties Police Alliance
   */
  public static getAccountAActions(): ActionItem[] {
    return [
      {
        id: 'ACT-ECPA-01',
        account: 'Eastern Counties Police Alliance',
        priorityRank: 1,
        action: 'Draft and deliver written confirmation to Karen Mbeki committing specific operator training dates and assigning named on-call escalation engineer for the 5 December public event.',
        owner: 'Customer Success Manager (FlytBase)',
        isOwnerConfirmed: true,
        dueDate: '2024-11-20', // Critical prior to 5 Dec event
        isDueDateConfirmed: true,
        relatedDeal: 'Tactical Operator Event Training Add-on & Core Deployment (£120k)',
        businessReason: 'Karen Mbeki explicitly stated she requires both items settled in writing before the 5 December event. Unanswered inquiries risk contract cancellation and catastrophic public failure.',
        sourceEvidence: 'SIG-ECPA-01 / Email record from Karen Mbeki demanding written resolution on training dates and dock failure escalation.',
        expectedOutcome: 'De-escalate customer anxiety, secure written alignment, and protect the live 5 Dec public showcase.',
      },
      {
        id: 'ACT-ECPA-02',
        account: 'Eastern Counties Police Alliance',
        priorityRank: 2,
        action: 'Schedule structured transition meeting with Rhys Calder and demand introduction to the designated deputy or incoming Police Drone Programme successor.',
        owner: 'CSM & Solutions Architect (FlytBase)',
        isOwnerConfirmed: true,
        dueDate: '2024-12-10', // Well before January departure
        isDueDateConfirmed: true,
        relatedDeal: 'Phase 2 Western Expansion (£180k Pipeline)',
        businessReason: 'Rhys Calder leaves in January 2025. Every past operational and expansion discussion was single-threaded through him. Without an introduced successor, the £180k Phase 2 expansion collapses.',
        sourceEvidence: 'SIG-ECPA-02 / Departure notice confirming Rhys leaves in January with zero named successors on file.',
        expectedOutcome: 'Multi-threaded relationship established with newly assigned operational lead and preserved £180k expansion opportunity.',
      },
      {
        id: 'ACT-ECPA-03',
        account: 'Eastern Counties Police Alliance',
        priorityRank: 3,
        action: 'Conduct pre-event dry run audit across all 3 active docks and verify firmware telemetry in coordination with constabulary IT dispatch.',
        owner: 'Lead Field Engineer (FlytBase)',
        isOwnerConfirmed: true,
        dueDate: '2024-11-28',
        isDueDateConfirmed: true,
        relatedDeal: 'Phase 1 Core Constabulary Deployment (£120k ARR)',
        businessReason: 'Public event scrutiny on 5 December cannot tolerate hardware or network glitch; dry run guarantees SLA adherence.',
        sourceEvidence: 'PO-2024-ECPA-09 operational readiness milestone requirements.',
        expectedOutcome: 'Zero downtime during public event, validating Phase 1 performance and supporting Phase 2 budget approval.',
      },
    ];
  }

  /**
   * Top 3 highest-priority actions for Aldermoor Industrial Group
   */
  public static getAccountBActions(): ActionItem[] {
    return [
      {
        id: 'ACT-AIG-01',
        account: 'Aldermoor Industrial Group',
        priorityRank: 1,
        action: 'Initiate proactive technical diagnostic on the 3 silent perimeter docks (Docks 2, 4, and 5) to inspect scheduler logs, geofence permissions, and battery cycles without awaiting a customer complaint.',
        owner: 'Telemetry Support Engineer (FlytBase)',
        isOwnerConfirmed: true,
        dueDate: 'Immediate (Within 24 Hours)',
        isDueDateConfirmed: true,
        relatedDeal: 'Autonomous Perimeter Patrol Contract (£210k ARR)',
        businessReason: '3 docks have ceased flying night missions over the last 2 weeks while remaining online. No ticket was raised by the client. Discovering this before Marcus Vance discovers an unpatrolled breach is vital to saving the account.',
        sourceEvidence: 'SIG-AIG-01 / Telemetry feed showing 3 docks online with 0 night flights in past 14 days.',
        expectedOutcome: 'Identify root cause (e.g. firmware update, weather geofence lock, or permission toggle) and restore autonomous flight operations.',
      },
      {
        id: 'ACT-AIG-02',
        account: 'Aldermoor Industrial Group',
        priorityRank: 2,
        action: 'Reach out proactively to Marcus Vance (Group Security Director) and Dave Sterling (Site Ops) with a transparent status check-in, highlighting FlytBase proactive monitoring.',
        owner: 'Customer Success Director (FlytBase)',
        isOwnerConfirmed: true,
        dueDate: 'Immediate (Within 48 Hours)',
        isDueDateConfirmed: true,
        relatedDeal: 'Autonomous Perimeter Patrol (£210k ARR) & Logistics Expansion (£140k)',
        businessReason: 'Proactive disclosure builds executive trust and turns an operational vulnerability into proof of world-class CSM monitoring.',
        sourceEvidence: 'CONTACT-AIG-MARCUS-VANCE & CTR-AIG-2023-F2 SLA requirements.',
        expectedOutcome: 'Strengthened relationship with economic buyer and clear pathway to greenlight the £140k warehouse expansion.',
      },
      {
        id: 'ACT-AIG-03',
        account: 'Aldermoor Industrial Group',
        priorityRank: 3,
        action: 'Prepare comprehensive 30-day perimeter uptime audit and present Q4 SLA certification report to Elena Rostova in Corporate Procurement.',
        owner: 'Unassigned (CS Operations)',
        isOwnerConfirmed: false,
        dueDate: 'Date to confirm (Pending telemetry resolution)',
        isDueDateConfirmed: false,
        relatedDeal: 'North Logistics Hangar Expansion (£140k Pipeline)',
        businessReason: 'Formal procurement approval for the £140k expansion requires certified 99%+ uptime metrics on current docks.',
        sourceEvidence: 'EXP-AIG-WAREHOUSE-NORTH RFP condition.',
        expectedOutcome: 'Commercial barrier removed for £140k multi-dock expansion RFP release.',
      },
    ];
  }
}
