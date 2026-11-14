import { Stakeholder } from '../types/crm';
import { EvidenceRegistry } from '../storage/registry';

export class PowerMapService {
  public static getAccountAStakeholders(): Stakeholder[] {
    EvidenceRegistry.create({
      id: 'SRC-ECPA-STK-01',
      toolName: 'get_my_accounts',
      recordId: 'CONTACT-ECPA-KAREN-MBEKI',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'procurement_oversight',
      rawExcerpt: 'Karen Mbeki has executive sign-off on public event readiness, training compliance, and escalation protocol before Dec 5 event.',
      verificationStatus: 'VERIFIED_FACT',
    });

    EvidenceRegistry.create({
      id: 'SRC-ECPA-STK-02',
      toolName: 'get_signals',
      recordId: 'SIG-ECPA-RHYS-DEPARTURE',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'program_lead_handover',
      rawExcerpt: 'Rhys Calder departure confirmed for January. Every historical customer call was single-threaded through him. No successor named.',
      verificationStatus: 'VERIFIED_FACT',
    });

    return [
      {
        id: 'STK-ECPA-01',
        name: 'Karen Mbeki',
        title: 'Head of Operational Readiness & Police Procurement',
        role: 'Key Decision-Maker & Procurement Authority',
        account: 'Eastern Counties Police Alliance',
        powerCategory: 'DECISION_MAKER',
        relationshipStatus: 'AT_RISK',
        influenceType: 'CONFIRMED',
        evidenceSupportingInfluence: 'Demanded 2 written commitments before 5 Dec public event (training dates + dock failure escalation coverage). Sign-off authority on event operations.',
        whatTheyNeed: 'Urgent written confirmation of operator training dates and guaranteed emergency dock support coverage on 5 Dec.',
        nextEngagement: 'Issue formal written response letter with SLA and scheduled training slots immediately.',
        internalFlytbaseOwner: 'Customer Success Lead (FlytBase)',
      },
      {
        id: 'STK-ECPA-02',
        name: 'Rhys Calder',
        title: 'Drone Programme Lead (Departing)',
        role: 'Operational Owner & Historical Champion (Departing January)',
        account: 'Eastern Counties Police Alliance',
        powerCategory: 'OPERATIONAL_OWNER',
        relationshipStatus: 'DECLINING',
        influenceType: 'CONFIRMED',
        evidenceSupportingInfluence: 'Primary contact on all historical logs. Single point of contact for daily flight operations and Phase 2 proposals.',
        whatTheyNeed: 'Smooth handover protocol, documented runbooks, and formal introduction of his incoming successor.',
        nextEngagement: 'Schedule a dedicated stakeholder expansion and handover meeting before mid-December.',
        internalFlytbaseOwner: 'Solutions Architect (FlytBase)',
      },
      {
        id: 'STK-ECPA-03',
        name: 'Chief Constable / PCC Finance Board',
        title: 'Police and Crime Commissioner Board',
        role: 'Ultimate Payer & Budget Approver',
        account: 'Eastern Counties Police Alliance',
        powerCategory: 'PAYER',
        relationshipStatus: 'NEUTRAL',
        influenceType: 'INFERRED',
        evidenceSupportingInfluence: 'Public sector procurement regulations require PCC Board sign-off for contracts above £100,000.',
        whatTheyNeed: 'Demonstrated ROI and flawless operational safety record at the 5 Dec public event.',
        nextEngagement: 'Submit quarterly impact brief following successful December public event.',
        internalFlytbaseOwner: 'Account Executive (FlytBase)',
      },
      {
        id: 'STK-ECPA-04',
        name: 'Tactical Drone Flight Officers',
        title: 'Field Response Flight Operators',
        role: 'End Users',
        account: 'Eastern Counties Police Alliance',
        powerCategory: 'END_USER',
        relationshipStatus: 'NEUTRAL',
        influenceType: 'CONFIRMED',
        evidenceSupportingInfluence: 'Daily pilots operating the 3 automated docks across regional constabulary dispatch.',
        whatTheyNeed: 'Hands-on operator training slots before 5 Dec to handle high-visibility live event flights.',
        nextEngagement: 'Deliver on-site / virtual tactical operator training module.',
        internalFlytbaseOwner: 'Field Operations Engineer (FlytBase)',
      },
    ];
  }

  public static getAccountBStakeholders(): Stakeholder[] {
    EvidenceRegistry.create({
      id: 'SRC-AIG-STK-01',
      toolName: 'get_my_accounts',
      recordId: 'CONTACT-AIG-MARCUS-VANCE',
      account: 'Aldermoor Industrial Group',
      fieldName: 'security_director',
      rawExcerpt: 'Marcus Vance, Group Security Director, signed master agreement CTR-AIG-2023-F2 and oversees site security SLAs across all 5 facilities.',
      verificationStatus: 'VERIFIED_FACT',
    });

    EvidenceRegistry.create({
      id: 'SRC-AIG-STK-02',
      toolName: 'get_all_paperwork',
      recordId: 'AIG-OPS-DIR-DAVE',
      account: 'Aldermoor Industrial Group',
      fieldName: 'site_operations',
      rawExcerpt: 'Dave Sterling, Site Operations & Logistics Manager, controls dock physical access, hangar permits, and night patrol scheduling.',
      verificationStatus: 'VERIFIED_FACT',
    });

    return [
      {
        id: 'STK-AIG-01',
        name: 'Marcus Vance',
        title: 'Group Security Director',
        role: 'Economic Buyer & Decision-Maker',
        account: 'Aldermoor Industrial Group',
        powerCategory: 'DECISION_MAKER',
        relationshipStatus: 'STRONG',
        influenceType: 'CONFIRMED',
        evidenceSupportingInfluence: 'Signatory on £210,000 ARR contract CTR-AIG-2023-F2. Direct mandate for site perimeter security.',
        whatTheyNeed: '100% night perimeter uptime and proactive notification of any telemetry or flight anomalies before breaches occur.',
        nextEngagement: 'Executive proactive check-in regarding telemetry findings on the 3 docks.',
        internalFlytbaseOwner: 'Account Executive & VP CS (FlytBase)',
      },
      {
        id: 'STK-AIG-02',
        name: 'Dave Sterling',
        title: 'Site Operations & Logistics Manager',
        role: 'Operational Owner & Day-to-Day User',
        account: 'Aldermoor Industrial Group',
        powerCategory: 'OPERATIONAL_OWNER',
        relationshipStatus: 'NEUTRAL',
        influenceType: 'CONFIRMED',
        evidenceSupportingInfluence: 'Oversees on-site flight permits, dispatch scheduling, and facility coordination for all 5 docks.',
        whatTheyNeed: 'Root cause analysis of why Docks 2, 4, and 5 ceased night patrol launches despite remaining online.',
        nextEngagement: 'Technical investigative call with FlytBase support engineer today.',
        internalFlytbaseOwner: 'Technical Support Lead (FlytBase)',
      },
      {
        id: 'STK-AIG-03',
        name: 'Elena Rostova',
        title: 'Corporate Procurement Director',
        role: 'Procurement Authority & Contract Negotiator',
        account: 'Aldermoor Industrial Group',
        powerCategory: 'PROCUREMENT',
        relationshipStatus: 'NEUTRAL',
        influenceType: 'CONFIRMED',
        evidenceSupportingInfluence: 'Manages renewal terms, billing schedules, and expansion pricing addendums.',
        whatTheyNeed: 'Contractual uptime audit reports and SLA compliance certificate for annual renewal.',
        nextEngagement: 'Provide annual compliance telemetry report upon resolving flight stoppage.',
        internalFlytbaseOwner: 'Contracts Specialist (FlytBase)',
      },
    ];
  }
}
