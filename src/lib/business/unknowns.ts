import { UnknownItem } from '../types/crm';

export class UnknownsRegisterService {
  public static getAccountAUnknowns(): UnknownItem[] {
    return [
      {
        id: 'UNK-ECPA-01',
        missingInformation: 'Identity and contact details of Rhys Calder\'s designated successor as Alliance Drone Programme Lead.',
        whyItMatters: 'Rhys departs in January 2027. Without a designated successor, FlytBase has no central champion to coordinate inter-force deployments or the 300-dock tender.',
        relatedDeal: '300-Dock Framework Tender (£1.5M Ceiling)',
        whoCanAnswer: 'Rhys Calder or Alliance Steering Committee',
        howToObtain: 'Direct inquiry during succession planning meeting before mid-December.',
        consequenceIfUnresolved: 'Programme drift, communications breakdown, and potential tender disqualification after January.',
        account: 'Eastern Counties Police Alliance',
      },
      {
        id: 'UNK-ECPA-02',
        missingInformation: 'Detailed VIP flight schedule, crowd exclusion zone, and battery rotation plan for the 5 Dec public event.',
        whyItMatters: 'Cannot guarantee dock failure escalation coverage or operator readiness without knowing flight frequencies and live demonstration parameters.',
        relatedDeal: 'Pre-Event Training (£45k) & Westmere Fleet (£250k)',
        whoCanAnswer: 'Insp. Karen Mbeki (Westmere Drone Unit)',
        howToObtain: 'Request event flight operations schedule during the written commitment delivery.',
        consequenceIfUnresolved: 'Battery exhaustion or ground interruption during live public demonstration.',
        account: 'Eastern Counties Police Alliance',
      },
      {
        id: 'UNK-ECPA-03',
        missingInformation: 'Drone operator overtime expenditures across constabularies to compute true cost-per-flight against £1,500/hr helicopter benchmark.',
        whyItMatters: 'Hannah Doyle and Ewan Brooks confirmed CFO approval requires proving drone economics against police helicopter air support.',
        relatedDeal: 'Westmere Scale-up (£250k) & Framework Tender (£1.5M)',
        whoCanAnswer: 'Ewan Brooks (Finance Partner, Metro Central)',
        howToObtain: 'Provide overtime tracking template for Ewan Brooks to populate operator shift data.',
        consequenceIfUnresolved: 'Finance partners decline call-offs due to unproven ROI against helicopter hours.',
        account: 'Eastern Counties Police Alliance',
      },
    ];
  }

  public static getAccountBUnknowns(): UnknownItem[] {
    return [
      {
        id: 'UNK-AIG-01',
        missingInformation: 'Exact root cause of the 14-day night flight stoppage on 3 perimeter docks (Software scheduler, geofence lockout, weather sensor error, or manual switch-off).',
        whyItMatters: 'All 3 docks remain online and powered, but have ceased launching night patrols. The root cause is STRICTLY UNKNOWN; any assumption risks erroneous customer guidance.',
        relatedDeal: 'Enterprise Perimeter Renewal (£140,000 ARR)',
        whoCanAnswer: 'FlytBase Diagnostic Engineering & Aldermoor Site Ops',
        howToObtain: 'Execute remote onboard diagnostic extraction and scheduler log packet review.',
        consequenceIfUnresolved: 'Perimeter remains unmonitored during dark hours; security breach or contract termination.',
        account: 'Aldermoor Industrial Group',
      },
      {
        id: 'UNK-AIG-02',
        missingInformation: 'Reason why Aldermoor on-site security guards have neither noticed nor logged a ticket regarding the 14-day flight stoppage.',
        whyItMatters: 'Reveals whether the guard dispatch dashboard is ignored, or whether guards intentionally disabled night missions due to local site considerations.',
        relatedDeal: 'Enterprise Perimeter Renewal (£140,000 ARR)',
        whoCanAnswer: 'Beatriz Alonso (Plant 7) & Stefan Roy (Head of Security)',
        howToObtain: 'Supportive, non-accusatory check-in inquiry into recent night patrol operations.',
        consequenceIfUnresolved: 'FlytBase restarts missions only for guards to manually disable them again.',
        account: 'Aldermoor Industrial Group',
      },
      {
        id: 'UNK-AIG-03',
        missingInformation: 'Accurate renewal dates and termination windows for the three guard contracts up for renewal within the next 4 months.',
        whyItMatters: 'Nadia Rahman (Finance Controller) explicitly stated she will only approve renewal if guard contract costs are measurably reduced.',
        relatedDeal: 'Enterprise Perimeter Renewal (£140,000 ARR)',
        whoCanAnswer: 'Nadia Rahman (Group Finance Controller)',
        howToObtain: 'Request procurement schedule for upcoming site security guard contracts.',
        consequenceIfUnresolved: 'Guard contracts automatically roll over without reduction, destroying the financial business case for the drone fleet.',
        account: 'Aldermoor Industrial Group',
      },
    ];
  }
}
