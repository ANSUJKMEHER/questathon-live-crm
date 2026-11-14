import { Stakeholder } from '../types/crm';
import { EvidenceRegistry } from '../storage/registry';

export class PowerMapService {
  public static getAccountAStakeholders(): Stakeholder[] {
    EvidenceRegistry.create({
      id: 'SRC-ECPA-STK-01',
      toolName: 'get_my_accounts',
      recordId: 'STK-KAREN-MBEKI',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'inspector_westmere',
      rawExcerpt: 'Insp. Karen Mbeki, Drone unit inspector, Westmere. Operational lead for Westmere flights. Urgent demand for operator training & dock failure coverage before 5 Dec event.',
      verificationStatus: 'VERIFIED_FACT',
    });

    EvidenceRegistry.create({
      id: 'SRC-ECPA-STK-02',
      toolName: 'get_my_accounts',
      recordId: 'STK-RHYS-CALDER',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'alliance_drone_lead',
      rawExcerpt: 'Rhys Calder, Alliance drone programme lead. Champion who led all historical meetings. Leaving programme in January 2027; no successor named.',
      verificationStatus: 'VERIFIED_FACT',
    });

    EvidenceRegistry.create({
      id: 'SRC-ECPA-STK-03',
      toolName: 'get_my_accounts',
      recordId: 'STK-FATIMA-OSEI',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'dpo_tarn_valley',
      rawExcerpt: 'Fatima Osei, Data protection officer, Tarn Valley. Holds DPIA sign-off for Tarn Valley & Norwold. Blocked because FlytBase support desk never sent data flow docs requested 4 months ago.',
      verificationStatus: 'VERIFIED_FACT',
    });

    EvidenceRegistry.create({
      id: 'SRC-ECPA-STK-04',
      toolName: 'get_my_accounts',
      recordId: 'STK-HANNAH-DOYLE',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'alliance_procurement_lead',
      rawExcerpt: 'Hannah Doyle, Alliance procurement lead. Managing 300-dock framework tender. Evaluation weights cost per flight and operating model at 40% vs £1,500/hr helicopter benchmark.',
      verificationStatus: 'VERIFIED_FACT',
    });

    EvidenceRegistry.create({
      id: 'SRC-ECPA-STK-05',
      toolName: 'get_my_accounts',
      recordId: 'STK-EWAN-BROOKS',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'finance_partner_metro',
      rawExcerpt: 'Ewan Brooks, Finance business partner, Metro Central. Needs drone overtime and cost-per-flight analysis to approve call-off from Chief Finance Officer.',
      verificationStatus: 'VERIFIED_FACT',
    });

    return [
      {
        id: 'STK-ECPA-01',
        name: 'Insp. Karen Mbeki',
        title: 'Drone Unit Inspector, Westmere Constabulary',
        role: 'Key Operational Decision-Maker',
        account: 'Eastern Counties Police Alliance',
        powerCategory: 'DECISION_MAKER',
        relationshipStatus: 'AT_RISK',
        influenceType: 'CONFIRMED',
        evidenceSupportingInfluence: 'Direct operational commander for Westmere docks. Controls 5 Dec public event deployment; demanded written commitments on training and dock failure escalation.',
        whatTheyNeed: 'Immediate written confirmation of operator training dates and designated named escalation contact for 5 Dec public event.',
        nextEngagement: 'Issue formal written response letter with SLA and scheduled training slots immediately.',
        internalFlytbaseOwner: 'Customer Success Manager',
      },
      {
        id: 'STK-ECPA-02',
        name: 'Rhys Calder',
        title: 'Alliance Drone Programme Lead (Departing)',
        role: 'Historical Internal Champion (Departing January)',
        account: 'Eastern Counties Police Alliance',
        powerCategory: 'OPERATIONAL_OWNER',
        relationshipStatus: 'DECLINING',
        influenceType: 'CONFIRMED',
        evidenceSupportingInfluence: 'Single point of contact for all alliance meetings to date. Stepping down in January with no named successor.',
        whatTheyNeed: 'Orderly transition protocol, introduction of incoming replacement, and preserved programme momentum.',
        nextEngagement: 'Schedule dedicated succession planning session before mid-December.',
        internalFlytbaseOwner: 'Enterprise Account Executive',
      },
      {
        id: 'STK-ECPA-03',
        name: 'Fatima Osei',
        title: 'Data Protection Officer, Tarn Valley',
        role: 'Compliance Blocker (Holds DPIA Sign-Off)',
        account: 'Eastern Counties Police Alliance',
        powerCategory: 'BLOCKER',
        relationshipStatus: 'AT_RISK',
        influenceType: 'CONFIRMED',
        evidenceSupportingInfluence: 'Refuses to sign DPIA. Stated Tarn Valley and Norwold cannot fly live missions until data flow, retention, and video storage documents are provided.',
        whatTheyNeed: 'FlytBase data-flow documentation, retention schedules, and cloud video storage access control architecture.',
        nextEngagement: 'Deliver complete DPIA documentation pack to unblock Tarn Valley and Norwold deployments.',
        internalFlytbaseOwner: 'Solutions Architect & Legal Compliance',
      },
      {
        id: 'STK-ECPA-04',
        name: 'Hannah Doyle',
        title: 'Alliance Procurement Lead',
        role: 'Commercial & Tender Authority',
        account: 'Eastern Counties Police Alliance',
        powerCategory: 'PROCUREMENT',
        relationshipStatus: 'NEUTRAL',
        influenceType: 'CONFIRMED',
        evidenceSupportingInfluence: 'Writing the 300-dock framework specification. Weights operating model & cost at 40% vs police helicopter.',
        whatTheyNeed: 'Costed operating model proving total cost per flight is significantly below £1,500/hr helicopter benchmark.',
        nextEngagement: 'Submit written clarification and costed operating model during formal briefing window.',
        internalFlytbaseOwner: 'Head of Public Sector Sales',
      },
      {
        id: 'STK-ECPA-05',
        name: 'Ewan Brooks',
        title: 'Finance Business Partner, Metro Central',
        role: 'Budget Approver (Payer Delegate)',
        account: 'Eastern Counties Police Alliance',
        powerCategory: 'PAYER',
        relationshipStatus: 'NEUTRAL',
        influenceType: 'CONFIRMED',
        evidenceSupportingInfluence: 'Approves call-offs for Metro Central. Confirmed CFO will sign once drone flight cost is tracked and justified against overtime.',
        whatTheyNeed: 'Comparative cost model demonstrating overtime efficiency vs helicopter deployments.',
        nextEngagement: 'Provide operator overtime tracking template to calculate cost-per-flight.',
        internalFlytbaseOwner: 'CSM & Solutions Architect',
      },
    ];
  }

  public static getAccountBStakeholders(): Stakeholder[] {
    EvidenceRegistry.create({
      id: 'SRC-AIG-STK-01',
      toolName: 'get_my_accounts',
      recordId: 'STK-STEFAN-ROY',
      account: 'Aldermoor Industrial Group',
      fieldName: 'head_of_security',
      rawExcerpt: 'Stefan Roy, Group head of security. Internal champion claiming 1.2M euro ROI based on unverified spreadsheet. 4 plants fly regularly, 9 only test flights, Plant 15 has no dock.',
      verificationStatus: 'VERIFIED_FACT',
    });

    EvidenceRegistry.create({
      id: 'SRC-AIG-STK-02',
      toolName: 'get_my_accounts',
      recordId: 'STK-NADIA-RAHMAN',
      account: 'Aldermoor Industrial Group',
      fieldName: 'group_finance_controller',
      rawExcerpt: 'Nadia Rahman, Group finance controller. Key economic decision-maker on renewal. Drones added cost without reducing any guard contract. Demands measured ROI (guard renewals, insurance premiums).',
      verificationStatus: 'VERIFIED_FACT',
    });

    EvidenceRegistry.create({
      id: 'SRC-AIG-STK-03',
      toolName: 'get_my_accounts',
      recordId: 'STK-BEATRIZ-ALONSO',
      account: 'Aldermoor Industrial Group',
      fieldName: 'plant_7_manager',
      rawExcerpt: 'Beatriz Alonso, Plant manager, Plant 7. Operational owner for Plant 7. Target for £50,000 night-time priority support offer.',
      verificationStatus: 'VERIFIED_FACT',
    });

    EvidenceRegistry.create({
      id: 'SRC-AIG-STK-04',
      toolName: 'get_my_accounts',
      recordId: 'STK-JULIAN-TATE',
      account: 'Aldermoor Industrial Group',
      fieldName: 'insurance_risk_manager',
      rawExcerpt: 'Julian Tate, Insurance and risk manager. Requires certified flight telemetry logs to negotiate lower site insurance premiums.',
      verificationStatus: 'VERIFIED_FACT',
    });

    return [
      {
        id: 'STK-AIG-01',
        name: 'Nadia Rahman',
        title: 'Group Finance Controller',
        role: 'Key Economic Decision-Maker & Payer',
        account: 'Aldermoor Industrial Group',
        powerCategory: 'DECISION_MAKER',
        relationshipStatus: 'AT_RISK',
        influenceType: 'CONFIRMED',
        evidenceSupportingInfluence: 'Sole financial gatekeeper for £140k contract renewal. Explicitly refused to sign renewal based on Stefan Roy\'s unverified spreadsheet; demands audited guard reductions.',
        whatTheyNeed: 'Audited ROI model tied to tangible guard contract renewals (3 renew in 4 months) and insurer premium credits.',
        nextEngagement: 'Deliver financial audit report mapping drone telemetry to scheduled guard contract reductions.',
        internalFlytbaseOwner: 'Customer Success Director & Account Executive',
      },
      {
        id: 'STK-AIG-02',
        name: 'Stefan Roy',
        title: 'Group Head of Security',
        role: 'Internal Champion (Unverified ROI Author)',
        account: 'Aldermoor Industrial Group',
        powerCategory: 'OPERATIONAL_OWNER',
        relationshipStatus: 'STRONG',
        influenceType: 'CONFIRMED',
        evidenceSupportingInfluence: 'Drove initial 14-dock deployment across 15 plants. Created theoretical €1.2M ROI calculation. Champion for £1.2M sister company expansion.',
        whatTheyNeed: 'Assistance translating his theoretical savings model into audited finance-grade savings Nadia Rahman will accept.',
        nextEngagement: 'Collaborative workshop to restructure ROI presentation with finance-approved metrics.',
        internalFlytbaseOwner: 'Enterprise Account Executive',
      },
      {
        id: 'STK-AIG-03',
        name: 'Beatriz Alonso',
        title: 'Plant Manager, Plant 7',
        role: 'Operational Owner & End User',
        account: 'Aldermoor Industrial Group',
        powerCategory: 'OPERATIONAL_OWNER',
        relationshipStatus: 'NEUTRAL',
        influenceType: 'CONFIRMED',
        evidenceSupportingInfluence: 'Direct manager for Plant 7. Target stakeholder for the £50,000 night-time priority support contract.',
        whatTheyNeed: 'Guaranteed night perimeter patrol reliability and resolution of silent dock anomalies.',
        nextEngagement: 'Review Plant 7 nighttime dock health and present dedicated support agreement terms.',
        internalFlytbaseOwner: 'Lead Solutions Engineer',
      },
      {
        id: 'STK-AIG-04',
        name: 'Julian Tate',
        title: 'Insurance and Risk Manager',
        role: 'Technical & Risk Approver',
        account: 'Aldermoor Industrial Group',
        powerCategory: 'TECHNICAL_APPROVER',
        relationshipStatus: 'NEUTRAL',
        influenceType: 'CONFIRMED',
        evidenceSupportingInfluence: 'Controls facility risk underwriting. Stated flight-log reporting by plant enables insurance premium reductions.',
        whatTheyNeed: 'Automated plant-by-plant flight logs and perimeter incident reduction telemetry.',
        nextEngagement: 'Demonstrate automated insurance telemetry reporting package.',
        internalFlytbaseOwner: 'Product Specialist',
      },
    ];
  }
}
