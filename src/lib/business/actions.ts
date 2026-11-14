import { ActionItem } from '../types/crm';

export class ActionPrioritizationService {
  public static getAccountAActions(): ActionItem[] {
    return [
      {
        id: 'ACT-ECPA-01',
        account: 'Eastern Counties Police Alliance',
        priorityRank: 1,
        action: 'Draft and deliver formal written commitment letter to Insp. Karen Mbeki specifying operator training calendar dates and assigning named on-call escalation engineer for the 5 Dec public demonstration (Ticket FB-11206).',
        owner: 'Customer Success Manager (FlytBase)',
        isOwnerConfirmed: true,
        dueDate: 'Immediate (Before 20 Nov 2026)',
        isDueDateConfirmed: true,
        relatedDeal: 'Pre-Event Training (£45k) & Westmere Fleet (£250k)',
        businessReason: 'Karen Mbeki stated in writing she requires both items settled this week before the 5 Dec event. Support ticket FB-11206 is currently unassigned; silence risks public demonstration failure.',
        sourceEvidence: 'SIG-ECPA-URGENT (A/emails/2026-11-18_karen_event.txt & Ticket FB-11206)',
        expectedOutcome: 'Written alignment secured, event operational coverage guaranteed, and Westmere relationship protected.',
      },
      {
        id: 'ACT-ECPA-02',
        account: 'Eastern Counties Police Alliance',
        priorityRank: 2,
        action: 'Dispatch complete data-flow architecture, video storage location, and retention schedules to Fatima Osei (DPO) to unblock the DPIA for Tarn Valley and Norwold.',
        owner: 'Solutions Architect & Legal Compliance',
        isOwnerConfirmed: true,
        dueDate: '2026-11-25',
        isDueDateConfirmed: true,
        relatedDeal: 'Unblock Tarn Valley & Norwold Fleet (£200k Pipeline)',
        businessReason: 'Fatima Osei requested data-flow documents 4 months ago from support and received no reply. Once delivered, she can complete DPIA in 3 weeks, unblocking 2 entire police forces.',
        sourceEvidence: 'FACT-FO-DPIA-2 & FACT-FO-NEEDS-3 (get_my_accounts)',
        expectedOutcome: 'DPIA signed, unblocking live operational flights across Tarn Valley and Norwold forces.',
      },
      {
        id: 'ACT-ECPA-03',
        account: 'Eastern Counties Police Alliance',
        priorityRank: 3,
        action: 'Submit formal clarification request and costed operating model to Hannah Doyle ahead of the 300-dock framework tender specification lock (moves left: 8).',
        owner: 'Head of Public Sector Sales',
        isOwnerConfirmed: true,
        dueDate: 'Date to confirm (Prior to tender specification lock)',
        isDueDateConfirmed: false,
        relatedDeal: '300-Dock Framework Tender (£1,500,000 Ceiling)',
        businessReason: 'Tender specification is locking soon without a costed operating model. Evaluation weights operating model & cost-per-flight at 40% vs £1,500/hr helicopter benchmark.',
        sourceEvidence: 'FACT-HD-WEIGHTS-1 & DEADLINE-TENDER-LOCK (get_my_accounts)',
        expectedOutcome: 'FlytBase operating model embedded in tender specification criteria prior to formal lock.',
      },
    ];
  }

  public static getAccountBActions(): ActionItem[] {
    return [
      {
        id: 'ACT-AIG-01',
        account: 'Aldermoor Industrial Group',
        priorityRank: 1,
        action: 'Initiate proactive telemetry diagnostic on the 3 silent perimeter docks (stopped night patrols for 14 days while online) and contact Stefan Roy and Beatriz Alonso with supportive check-in.',
        owner: 'Technical Support Lead & Telemetry Specialist',
        isOwnerConfirmed: true,
        dueDate: 'Immediate (Within 24 Hours)',
        isDueDateConfirmed: true,
        relatedDeal: 'Enterprise Perimeter Renewal (£140k ARR)',
        businessReason: 'Three docks ceased night missions over 14 consecutive nights while online with zero tickets filed. Proactive outreach demonstrates monitoring excellence before a security incident occurs.',
        sourceEvidence: 'SIG-AIG-DOCK-ANOMALY & FACT-SR-ROLL-2 (get_my_accounts)',
        expectedOutcome: 'Root cause diagnosed (Cause is strictly UNKNOWN; avoid speculation) and autonomous night perimeter patrols restored.',
      },
      {
        id: 'ACT-AIG-02',
        account: 'Aldermoor Industrial Group',
        priorityRank: 2,
        action: 'Present finance-grade ROI audit to Nadia Rahman (Group Finance Controller) mapping drone perimeter flights to the three guard contracts up for renewal within the next 4 months.',
        owner: 'Customer Success Director & Account Executive',
        isOwnerConfirmed: true,
        dueDate: '2026-12-05',
        isDueDateConfirmed: true,
        relatedDeal: 'Aldermoor Contract Renewal (£140k ARR)',
        businessReason: 'Nadia Rahman refuses to renew based on Stefan Roy theoretical €1.2M spreadsheet; she explicitly stated she will accept ROI built on upcoming guard contract renewals and insurance reductions.',
        sourceEvidence: 'FACT-NR-EVIDENCE-2 & FACT-NR-COST-2 (get_my_accounts)',
        expectedOutcome: 'Finance sign-off secured for the £140,000 annual contract renewal.',
      },
      {
        id: 'ACT-AIG-03',
        account: 'Aldermoor Industrial Group',
        priorityRank: 3,
        action: 'Deliver proposal to Beatriz Alonso for Plant 7 Night-Time Priority Support add-on (£50,000) and provide Julian Tate with automated flight-log reporting.',
        owner: 'Solutions Engineer & Account Executive',
        isOwnerConfirmed: true,
        dueDate: 'Date to confirm (Pending dock diagnostic resolution)',
        isDueDateConfirmed: false,
        relatedDeal: 'Plant 7 Priority Support Add-on (£50k Offer)',
        businessReason: 'Plant 7 is one of only 4 plants flying regularly; dedicated night support and insurance reports directly address Beatriz Alonso\'s and Julian Tate\'s operational requirements.',
        sourceEvidence: 'OFFER-B-PRIORITY-SUPPORT & STK-JULIAN-TATE (get_my_accounts)',
        expectedOutcome: 'Close £50,000 priority support offer and secure insurance premium endorsement.',
      },
    ];
  }
}
