import { Stakeholder, DealPowerMapping } from '../types/crm';
import { EvidenceRegistry } from '../storage/registry';

export class PowerMapService {
  public static getAccountAStakeholders(): Stakeholder[] {
    EvidenceRegistry.create({
      id: 'SRC-ECPA-STK-01',
      toolName: 'get_my_accounts',
      recordId: 'STK-KAREN-MBEKI',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'inspector_westmere',
      rawExcerpt: 'Insp. Karen Mbeki, Drone unit inspector, Westmere. Operational commander for Westmere docks. Demanded written commitments on training & dock failure coverage before 5 Dec event.',
      verificationStatus: 'VERIFIED_FACT',
    });

    EvidenceRegistry.create({
      id: 'SRC-ECPA-STK-02',
      toolName: 'get_my_accounts',
      recordId: 'STK-RHYS-CALDER',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'alliance_drone_lead',
      rawExcerpt: 'Rhys Calder, Alliance drone programme lead. Historical single point of contact. Confirmed departure from programme in January; no successor named.',
      verificationStatus: 'VERIFIED_FACT',
    });

    EvidenceRegistry.create({
      id: 'SRC-ECPA-STK-03',
      toolName: 'get_my_accounts',
      recordId: 'STK-FATIMA-OSEI',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'dpo_tarn_valley',
      rawExcerpt: 'Fatima Osei, Data protection officer, Tarn Valley. Holds DPIA compliance sign-off. Blocked because FlytBase never replied to data flow docs requested 4 months ago.',
      verificationStatus: 'VERIFIED_FACT',
    });

    EvidenceRegistry.create({
      id: 'SRC-ECPA-STK-04',
      toolName: 'get_my_accounts',
      recordId: 'STK-HANNAH-DOYLE',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'alliance_procurement_lead',
      rawExcerpt: 'Hannah Doyle, Alliance procurement lead. Managing 300-dock framework specification. Weights cost per flight & operating model at 40% vs £1,500/hr helicopter.',
      verificationStatus: 'VERIFIED_FACT',
    });

    EvidenceRegistry.create({
      id: 'SRC-ECPA-STK-05',
      toolName: 'get_my_accounts',
      recordId: 'STK-EWAN-BROOKS',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'finance_partner_metro',
      rawExcerpt: 'Ewan Brooks, Finance business partner, Metro Central. Finance bid window closed. Needs operator overtime to justify drone costs to CFO.',
      verificationStatus: 'VERIFIED_FACT',
    });

    EvidenceRegistry.create({
      id: 'SRC-ECPA-STK-06',
      toolName: 'get_my_accounts',
      recordId: 'STK-NORWOLD-CHIEF',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'norwold_chief_constable',
      rawExcerpt: 'Norwold Chief Constable. Cautious after a local public privacy dispute; Norwold only conducts training flights until DPIA and privacy controls are proven.',
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
        evidenceSupportingInfluence: 'Direct operational commander for Westmere docks. Controls 5 Dec public event deployment; logged Ticket FB-11206 demanding written commitments.',
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
      {
        id: 'STK-ECPA-06',
        name: 'Chief Constable of Norwold',
        title: 'Chief Constable, Norwold Police',
        role: 'Executive Authority & Force Blocker',
        account: 'Eastern Counties Police Alliance',
        powerCategory: 'DECISION_MAKER',
        relationshipStatus: 'AT_RISK',
        influenceType: 'CONFIRMED',
        evidenceSupportingInfluence: 'Cautious following local public privacy backlash; restricted Norwold to training flights only until Tarn Valley DPIA is approved.',
        whatTheyNeed: 'Executed DPIA and transparent community privacy compliance safeguards.',
        nextEngagement: 'Brief chief officers following Fatima Osei DPIA sign-off.',
        internalFlytbaseOwner: 'Head of Public Sector Sales',
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
      rawExcerpt: 'Beatriz Alonso, Plant manager, Plant 7. Operational owner for Plant 7. Target for night-time priority support offer ($50k / £50k).',
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

    EvidenceRegistry.create({
      id: 'SRC-AIG-STK-05',
      toolName: 'get_my_accounts',
      recordId: 'STK-OWEN-FITCH',
      account: 'Aldermoor Industrial Group',
      fieldName: 'group_it_infrastructure_lead',
      rawExcerpt: 'Owen Fitch, Group IT infrastructure lead. Challenge Note: Player has NEVER MET him. Controls corporate network approval, cybersecurity sign-off, and cloud docking interfaces.',
      verificationStatus: 'UNKNOWN',
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
        evidenceSupportingInfluence: 'Sole financial gatekeeper for $26,164 contract renewal. Refuses to sign renewal based on Stefan Roy\'s unverified spreadsheet; demands audited guard contract reductions.',
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
        evidenceSupportingInfluence: 'Drove initial 14-dock deployment across 15 plants. Created theoretical €1.2M ROI calculation. Champion for $207k sister company expansion.',
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
        evidenceSupportingInfluence: 'Direct manager for Plant 7. Target stakeholder for the night-time priority support contract.',
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
      {
        id: 'STK-AIG-05',
        name: 'Owen Fitch',
        title: 'Group IT Infrastructure Lead',
        role: 'IT Infrastructure & Cybersecurity Gatekeeper',
        account: 'Aldermoor Industrial Group',
        powerCategory: 'TECHNICAL_APPROVER',
        relationshipStatus: 'UNMET', // Explicitly never met by player per original task
        influenceType: 'INFERRED',
        evidenceSupportingInfluence: 'Original game data confirms: Player has NEVER MET him. Controls corporate network architecture, port forwarding, and dock VPN gateways.',
        whatTheyNeed: 'Initial introductory IT infrastructure architecture review and SOC2/ISO27001 security compliance brief.',
        nextEngagement: 'Request warm introduction via Stefan Roy for introductory technical alignment call.',
        internalFlytbaseOwner: 'Chief Information Security Officer & Solutions Architect',
      },
    ];
  }

  /**
   * Deal-by-Deal Power Mapping answering all 7 Question 2 sub-questions per deal
   */
  public static getAccountADealPowerMappings(): DealPowerMapping[] {
    return [
      {
        dealId: 'DEAL-ECPA-01',
        dealName: 'Renew Alliance Contract (35 Docks)',
        account: 'Eastern Counties Police Alliance',
        decider: 'Insp. Karen Mbeki (Westmere) & Metro Central Lead',
        payer: 'Alliance Steering Committee & Participating Police Forces',
        endUser: 'Constabulary Tactical Drone Pilots & Flight Operators',
        blocker: 'Operational dissatisfaction or unresolved event commitments',
        champion: 'Rhys Calder (Departing January 2027)',
        relationshipStatus: 'AT_RISK',
        whatTheyNeed: 'Reliable dock uptime and prompt response to operational escalation tickets.',
      },
      {
        dealId: 'DEAL-ECPA-02',
        dealName: 'Tarn Valley and Norwold Go Live ($142,302)',
        account: 'Eastern Counties Police Alliance',
        decider: 'Fatima Osei (DPO) & Norwold Chief Constable',
        payer: 'Tarn Valley & Norwold Police Budgets',
        endUser: 'Tarn Valley & Norwold Patrol Units',
        blocker: 'Fatima Osei (refuses to sign DPIA without data flow docs)',
        champion: 'Rhys Calder',
        relationshipStatus: 'DECLINING',
        whatTheyNeed: 'Delivery of complete data flow documents, retention policies, and storage access controls.',
      },
      {
        dealId: 'DEAL-ECPA-03',
        dealName: 'Scale Westmere Fleet ($0 Expired Outcome)',
        account: 'Eastern Counties Police Alliance',
        decider: 'Ewan Brooks (Finance Partner) & Force CFO',
        payer: 'Metro Central Constabulary Budget',
        endUser: 'Westmere Shift Officers',
        blocker: 'Finance bid window closed before flight cost vs helicopter was completed ($0 outcome)',
        champion: 'Insp. Karen Mbeki',
        relationshipStatus: 'NEUTRAL',
        whatTheyNeed: 'Re-opening in next fiscal bid window with audited operator overtime numbers.',
      },
      {
        dealId: 'DEAL-ECPA-04',
        dealName: '300-Dock Framework Tender ($535,634 Baseline)',
        account: 'Eastern Counties Police Alliance',
        decider: 'Hannah Doyle (Procurement Lead) & 4 Force Finance Officers',
        payer: 'National Police Procurement / Pooled Regional Accounts',
        endUser: 'All 4 Regional Police Constabularies',
        blocker: 'Hannah Doyle (Tender locks in 8 moves without costed operating model)',
        champion: 'Rhys Calder (Leaving soon; need new multi-force champion)',
        relationshipStatus: 'NEUTRAL',
        whatTheyNeed: 'Costed operating model proving cost per flight is below £1,500/hr helicopter benchmark.',
      },
    ];
  }

  public static getAccountBDealPowerMappings(): DealPowerMapping[] {
    return [
      {
        dealId: 'DEAL-AIG-01',
        dealName: 'Renew Aldermoor Contract ($26,164 ARR)',
        account: 'Aldermoor Industrial Group',
        decider: 'Nadia Rahman (Group Finance Controller)',
        payer: 'Aldermoor Corporate Security Budget',
        endUser: 'On-site Security Guards & Facility Managers',
        blocker: 'Nadia Rahman (refuses renewal due to unverified ROI & zero guard savings)',
        champion: 'Stefan Roy (Group Head of Security)',
        relationshipStatus: 'AT_RISK',
        whatTheyNeed: 'Tangible proof that drone patrols replace guard contract costs upon upcoming renewals.',
      },
      {
        dealId: 'DEAL-AIG-02',
        dealName: 'Bring Idle Plants into Regular Patrol ($5,418)',
        account: 'Aldermoor Industrial Group',
        decider: 'Individual Plant Managers (9 Idle Plants)',
        payer: 'Plant Operations Overhead Allocation',
        endUser: 'Local Plant Shift Supervisors',
        blocker: 'Plant managers resenting budget allocations for equipment they did not choose',
        champion: 'Stefan Roy',
        relationshipStatus: 'DECLINING',
        whatTheyNeed: 'Dedicated flight activation assistance and localized site security benefits.',
      },
      {
        dealId: 'DEAL-AIG-03',
        dealName: 'Protect and Extend Insurance Discount (Unknown Deal)',
        account: 'Aldermoor Industrial Group',
        decider: 'Julian Tate (Insurance & Risk Manager)',
        payer: 'Corporate Risk & Treasury Underwriting',
        endUser: 'Corporate Insurance Underwriters',
        blocker: 'Lack of automated plant-by-plant flight log reporting for insurers',
        champion: 'Julian Tate',
        relationshipStatus: 'NEUTRAL',
        whatTheyNeed: 'Certified plant flight logs proving continuous night perimeter patrol adherence.',
      },
      {
        dealId: 'DEAL-AIG-04',
        dealName: 'Case Study for 40-Plant Sister Company ($207,845)',
        account: 'Aldermoor Industrial Group',
        decider: 'Sister Company Executive Board & Group CFO',
        payer: 'Sister Company Operating Budget',
        endUser: '40 Sister Company Industrial Facilities',
        blocker: 'Nadia Rahman confirmed sister company is separate budget; Stefan Roy €1.2M spreadsheet unverified',
        champion: 'Stefan Roy',
        relationshipStatus: 'NEUTRAL',
        whatTheyNeed: 'Finance-audited case study with verified cost-benefit documentation from Aldermoor.',
      },
    ];
  }
}
