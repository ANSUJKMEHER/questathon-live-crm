import { UnknownItem } from '../types/crm';

export class UnknownsRegisterService {
  public static getAccountAUnknowns(): UnknownItem[] {
    return [
      {
        id: 'UNK-ECPA-01',
        missingInformation: 'Identity and contact details of Rhys Calder\'s designated successor as Drone Programme Lead.',
        whyItMatters: 'Rhys leaves in January 2025. Without a successor, FlytBase has no primary operational point of contact to run day-to-day flights or champion the £180k expansion.',
        relatedDeal: 'Phase 2 Western Constabulary Expansion (£180k)',
        whoCanAnswer: 'Karen Mbeki or Rhys Calder',
        howToObtain: 'Direct question during urgent transition check-in call with Karen Mbeki.',
        consequenceIfUnresolved: 'Complete stalls in communications after January, risk of account neglect, and abandonment of the Phase 2 expansion.',
        account: 'Eastern Counties Police Alliance',
      },
      {
        id: 'UNK-ECPA-02',
        missingInformation: 'Specific flight parameters, crowd safety perimeter buffer, and VIP flight schedule for the 5 December public event.',
        whyItMatters: 'Emergency escalation and dock reliability cannot be guaranteed without knowing exact battery rotation cycles and flight window durations.',
        relatedDeal: 'Phase 1 Core Constabulary Deployment (£120k)',
        whoCanAnswer: 'Karen Mbeki / Tactical Event Operations Lead',
        howToObtain: 'Request tactical operations briefing document during the written commitment delivery.',
        consequenceIfUnresolved: 'Drone battery exhaustion or airspace conflict during high-profile public demonstration.',
        account: 'Eastern Counties Police Alliance',
      },
      {
        id: 'UNK-ECPA-03',
        missingInformation: 'Police and Crime Commissioner (PCC) FY25 formal budget allocation status for Phase 2 Western Expansion.',
        whyItMatters: 'The £180k deal value is currently only a customer champion verbal claim. We do not know if public funds are actually earmarked in the council budget.',
        relatedDeal: 'Phase 2 Western Constabulary Expansion (£180k)',
        whoCanAnswer: 'Constabulary Finance Officer / Karen Mbeki',
        howToObtain: 'Request copy of police capital expenditure budget review or formal tender notice.',
        consequenceIfUnresolved: 'False pipeline forecasting, misallocation of engineering deployment resources.',
        account: 'Eastern Counties Police Alliance',
      },
    ];
  }

  public static getAccountBUnknowns(): UnknownItem[] {
    return [
      {
        id: 'UNK-AIG-01',
        missingInformation: 'Exact root cause of the silent night flight stoppage on Docks 2, 4, and 5 (Hardware vs Firmware vs Geofence vs Customer Schedule override).',
        whyItMatters: 'Docks are powered and online, but stopped launching night patrol missions 14 days ago. Cause is entirely unknown.',
        relatedDeal: 'Autonomous Perimeter Patrol Contract (£210k ARR)',
        whoCanAnswer: 'FlytBase Diagnostic Engineering & Aldermoor Site Ops (Dave Sterling)',
        howToObtain: 'Pull deep telemetry log packets via MCP `get_signals` and inspect dock onboard scheduler daemon.',
        consequenceIfUnresolved: 'Perimeter remains unpatrolled at night; risk of unmonitored security intrusion and total contract cancellation.',
        account: 'Aldermoor Industrial Group',
      },
      {
        id: 'UNK-AIG-02',
        missingInformation: 'Reason why Aldermoor on-site security personnel have neither noticed nor reported the 2-week flight stoppage.',
        whyItMatters: 'Reveals whether the customer dashboard is unmonitored by guards, or whether guards intentionally disabled night missions due to noise/lighting complaints.',
        relatedDeal: 'Autonomous Perimeter Patrol Contract (£210k ARR)',
        whoCanAnswer: 'Dave Sterling (Site Operations & Logistics Manager)',
        howToObtain: 'Collaborative CSM check-in inquiry asking about recent on-site night patrol routines.',
        consequenceIfUnresolved: 'FlytBase risks fixing software settings only to find guards repeatedly disabling them, causing recurring frustration.',
        account: 'Aldermoor Industrial Group',
      },
      {
        id: 'UNK-AIG-03',
        missingInformation: 'Formal procurement timeline and tender evaluation criteria for North Logistics Hangar Expansion (£140,000).',
        whyItMatters: 'Current information is based on informal Q3 meeting notes. Formal RFP release date and RFP decision committee membership remain unconfirmed.',
        relatedDeal: 'North Logistics Hangar Expansion (3 Docks)',
        whoCanAnswer: 'Elena Rostova (Corporate Procurement Director)',
        howToObtain: 'Formal procurement briefing meeting scheduled after telemetry issue resolution.',
        consequenceIfUnresolved: 'Competitor vendor could be invited to tender without FlytBase advance positioning.',
        account: 'Aldermoor Industrial Group',
      },
    ];
  }
}
