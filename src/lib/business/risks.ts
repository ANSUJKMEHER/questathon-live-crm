import { RiskItem } from '../types/crm';

export class RiskRegisterService {
  public static getAccountARisks(): RiskItem[] {
    return [
      {
        id: 'RSK-ECPA-01',
        title: 'Unanswered Written Commitments Before 5 Dec Public Event',
        account: 'Eastern Counties Police Alliance',
        severity: 'CRITICAL',
        probability: 'High (Qualitative: event date is fixed and communication window is narrowing)',
        probabilityIsQualitative: true,
        impact: 'Loss of trust with Karen Mbeki (Procurement/Exec lead); potential public embarrassment or contract review if docks encounter flight issues during live public showcase.',
        trigger: 'Passing 20 November without delivering written confirmation of operator training dates and emergency escalation contact.',
        deadline: '2024-12-05 (Public Event Date)',
        owner: 'CSM Lead',
        mitigation: 'Deliver formal written commitment letter signed by VP Customer Success specifying training schedule and dedicated on-site/hotline escalation contact.',
        sourceId: 'SRC-ECPA-003 / Karen Mbeki written inquiry record',
      },
      {
        id: 'RSK-ECPA-02',
        title: 'Single-Threaded Champion Handover: Rhys Calder Departure',
        account: 'Eastern Counties Police Alliance',
        severity: 'CRITICAL',
        probability: 'Certain (Qualitative: resignation/transfer confirmed for January 2025)',
        probabilityIsQualitative: true,
        impact: 'Loss of institutional knowledge, stall of £180,000 Phase 2 Western Constabulary expansion, and operational drift.',
        trigger: 'Rhys Calder departure date reached in January with zero introductions or successor onboarding.',
        deadline: '2025-01-15 (Estimated departure window)',
        owner: 'Enterprise Account Executive',
        mitigation: 'Conduct multi-stakeholder mapping session with Karen Mbeki and request formal naming of the interim or permanent Drone Programme Manager.',
        sourceId: 'SRC-ECPA-STK-02 / Departure signal on record',
      },
      {
        id: 'RSK-ECPA-03',
        title: 'Unfunded Operator Training Add-on Delay',
        account: 'Eastern Counties Police Alliance',
        severity: 'MEDIUM',
        probability: 'Medium (Qualitative: budget is unquoted and unapproved by police treasury)',
        probabilityIsQualitative: true,
        impact: 'Insufficient certified tactical officers available for live patrol roster.',
        trigger: 'Constabulary dispatch unable to man 24/7 flight controls due to training backlog.',
        deadline: '2024-11-30',
        owner: 'Solutions Architect',
        mitigation: 'Offer complimentary condensed certification webinar ahead of 5 Dec, folding formal training into Phase 2 agreement.',
        sourceId: 'SRC-ECPA-003 / REQ-ECPA-TRAINING-ADD',
      },
    ];
  }

  public static getAccountBRisks(): RiskItem[] {
    return [
      {
        id: 'RSK-AIG-01',
        title: 'Silent Operational Stoppage: 3 Docks Stopped Flying at Night',
        account: 'Aldermoor Industrial Group',
        severity: 'CRITICAL',
        probability: 'Confirmed Occurrence (Qualitative: telemetry proves 0 night launches over 14 consecutive days)',
        probabilityIsQualitative: true,
        impact: 'Unmonitored facility perimeter breach during dark hours; major breach of contract CTR-AIG-2023-F2 SLA; immediate loss of £210,000 ARR account and cancellation of £140,000 expansion.',
        trigger: 'Customer discovers perimeter coverage lapse or security incident occurs before FlytBase notifies them.',
        deadline: 'Immediate (Active risk within current 2-week window)',
        owner: 'Director of Technical Support & CSM',
        mitigation: 'Proactively investigate telemetry diagnostics, identify cause (software scheduler, sensor lock, or weather limits), resolve issue, and notify Marcus Vance with transparent RCA.',
        sourceId: 'SIG-AIG-01 / Telemetry night flight analysis',
      },
      {
        id: 'RSK-AIG-02',
        title: 'Contagion Risk to £140,000 Hangar Expansion RFP',
        account: 'Aldermoor Industrial Group',
        severity: 'HIGH',
        probability: 'High (Qualitative: procurement will not expand a system exhibiting silent anomalies)',
        probabilityIsQualitative: true,
        impact: 'Disqualification from North Logistics Hangar RFP and delayed revenue recognition.',
        trigger: 'Release of expansion RFP before resolving perimeter flight reliability.',
        deadline: '2024-12-15 (Q4 Procurement Gate)',
        owner: 'VP Sales & CSM',
        mitigation: 'Present verified 99.8% uptime audit and closed-loop RCA report to Procurement Director Elena Rostova.',
        sourceId: 'SRC-AIG-002 / EXP-AIG-WAREHOUSE-NORTH',
      },
      {
        id: 'RSK-AIG-03',
        title: 'Customer Silence / Lack of Support Ticket Reporting',
        account: 'Aldermoor Industrial Group',
        severity: 'HIGH',
        probability: 'High (Qualitative: client has not noticed or has given up on reporting)',
        probabilityIsQualitative: true,
        impact: 'Declining adoption, perception that autonomous patrols are unreliable or unimportant.',
        trigger: 'Customer site ops turning off docks permanently or switching back to manual manned guards.',
        deadline: '2024-11-25',
        owner: 'CSM Lead',
        mitigation: 'Institute automated health heartbeat notifications that notify customer dispatch whenever missions are skipped.',
        sourceId: 'SIG-AIG-01 / Zero ticket record',
      },
    ];
  }
}
