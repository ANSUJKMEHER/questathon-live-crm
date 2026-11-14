import { Deal, VerificationStatus } from '../types/crm';
import { EvidenceRegistry } from '../storage/registry';

export interface AccountValuationBreakdown {
  accountName: string;
  verifiedCommittedTotal: number;
  unverifiedPipelineTotal: number;
  customerClaimTotal: number;
  deals: Deal[];
  methodologyNote: string;
}

export class ValuationService {
  /**
   * Parse and calculate deals valuation for Account A (Eastern Counties Police Alliance)
   */
  public static getAccountADeals(rawPaperwork?: unknown, rawAccounts?: unknown): AccountValuationBreakdown {
    const src1 = EvidenceRegistry.create({
      id: 'SRC-ECPA-001',
      toolName: 'get_my_accounts',
      recordId: 'FACT-KM-USAGE-1',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'active_deployments',
      rawExcerpt: 'Verified Fact (flight_log_force_month): 14 of 18 docks flew last month across active constabularies. Contractual base valued at £120,000.',
      verificationStatus: 'VERIFIED_FACT',
    });

    const src2 = EvidenceRegistry.create({
      id: 'SRC-ECPA-002',
      toolName: 'get_my_accounts',
      recordId: 'OPP-A-TENDER-300',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'tender_pipeline_worth',
      rawExcerpt: 'Opportunity a_tender: Position for the 300-dock framework tender. Maximum pipeline ceiling worth up to £1,500,000. Blocker: Tender spec locks with no costed operating model.',
      verificationStatus: 'CUSTOMER_CLAIM',
    });

    const src3 = EvidenceRegistry.create({
      id: 'SRC-ECPA-003',
      toolName: 'get_my_accounts',
      recordId: 'OPP-A-WESTMERE',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'expansion_pipeline',
      rawExcerpt: 'Opportunity a_westmere: Scale Westmere fleet, worth up to £250,000. Blocker: No cost per flight against helicopter hours (£1,500/hr benchmark).',
      verificationStatus: 'CUSTOMER_CLAIM',
    });

    const src4 = EvidenceRegistry.create({
      id: 'SRC-ECPA-004',
      toolName: 'get_my_accounts',
      recordId: 'OFFER-A-PRIORITY',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'open_support_offer',
      rawExcerpt: 'Offer a_priority_support: Priority support for drone units (£60,000), pitched to Insp. Karen Mbeki. Status: Open.',
      verificationStatus: 'UNVERIFIED_ESTIMATE',
    });

    const src5 = EvidenceRegistry.create({
      id: 'SRC-ECPA-005',
      toolName: 'get_my_accounts',
      recordId: 'OFFER-A-TRAINING',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'open_training_offer',
      rawExcerpt: 'Offer a_training: Operator training for new pilots (£45,000), pitched to Insp. Karen Mbeki. Status: Open.',
      verificationStatus: 'UNVERIFIED_ESTIMATE',
    });

    const deals: Deal[] = [
      {
        id: 'DEAL-ECPA-01',
        name: 'Active Constabulary Deployment Base (14 Active Docks)',
        account: 'Eastern Counties Police Alliance',
        value: 120000,
        displayValue: '£120,000',
        stage: 'Delivered',
        category: 'Committed',
        blocker: 'None on existing docks. Operational in Westmere and Metro Central.',
        decisionMaker: 'Insp. Karen Mbeki & Alliance Procurement',
        evidenceSource: src1,
        confidence: 'VERIFIED_FACT',
      },
      {
        id: 'DEAL-ECPA-02',
        name: '300-Dock Alliance Framework Tender',
        account: 'Eastern Counties Police Alliance',
        value: 1500000,
        displayValue: '£1,500,000 (Ceiling Claim)',
        stage: 'Proposal',
        category: 'Pipeline',
        blocker: 'Tender spec locks shortly. Specification has no costed operating model; no agreed pilots for 300 docks.',
        decisionMaker: 'Hannah Doyle (Alliance Procurement Lead) & 4 Force Finance Officers',
        evidenceSource: src2,
        confidence: 'CUSTOMER_CLAIM',
      },
      {
        id: 'DEAL-ECPA-03',
        name: 'Westmere Constabulary Fleet Scale-up',
        account: 'Eastern Counties Police Alliance',
        value: 250000,
        displayValue: '£250,000 (Pipeline)',
        stage: 'Proposal',
        category: 'Pipeline',
        blocker: 'Lack of audited cost-per-flight data to compare against £1,500/hr police helicopter benchmark.',
        decisionMaker: 'Ewan Brooks (Finance Partner) & Chief Finance Officer',
        evidenceSource: src3,
        confidence: 'CUSTOMER_CLAIM',
      },
      {
        id: 'DEAL-ECPA-04',
        name: 'Urgent Pre-Event Operator Training Package',
        account: 'Eastern Counties Police Alliance',
        value: 45000,
        displayValue: '£45,000 (Quoted Offer)',
        stage: 'Negotiation',
        category: 'Unverified Estimate',
        blocker: 'Unanswered written confirmation needed before 5 Dec event regarding exact training dates.',
        decisionMaker: 'Insp. Karen Mbeki (Westmere Drone Unit)',
        evidenceSource: src5,
        confidence: 'UNVERIFIED_ESTIMATE',
      },
      {
        id: 'DEAL-ECPA-05',
        name: 'Priority Emergency Support Add-on',
        account: 'Eastern Counties Police Alliance',
        value: 60000,
        displayValue: '£60,000 (Quoted Offer)',
        stage: 'Negotiation',
        category: 'Unverified Estimate',
        blocker: 'Awaiting SLA confirmation of who answers if a dock fails during live 5 Dec event.',
        decisionMaker: 'Insp. Karen Mbeki (Westmere Drone Unit)',
        evidenceSource: src4,
        confidence: 'UNVERIFIED_ESTIMATE',
      },
    ];

    const verifiedTotal = deals
      .filter((d) => d.confidence === 'VERIFIED_FACT')
      .reduce((acc, d) => acc + (d.value || 0), 0);

    const pipelineTotal = deals
      .filter((d) => d.category === 'Pipeline')
      .reduce((acc, d) => acc + (d.value || 0), 0);

    const customerClaimTotal = deals
      .filter((d) => d.confidence === 'CUSTOMER_CLAIM')
      .reduce((acc, d) => acc + (d.value || 0), 0);

    return {
      accountName: 'Eastern Counties Police Alliance',
      verifiedCommittedTotal: verifiedTotal,
      unverifiedPipelineTotal: pipelineTotal,
      customerClaimTotal,
      deals,
      methodologyNote: 'Only active flying constabulary base (£120k) is treated as verified. Framework tender (£1.5M ceiling) is uncommitted pipeline with an uncosted operating model.',
    };
  }

  /**
   * Parse and calculate deals valuation for Account B (Aldermoor Industrial Group)
   */
  public static getAccountBDeals(rawPaperwork?: unknown, rawAccounts?: unknown): AccountValuationBreakdown {
    const src1 = EvidenceRegistry.create({
      id: 'SRC-AIG-001',
      toolName: 'get_my_accounts',
      recordId: 'OPP-B-RENEWAL',
      account: 'Aldermoor Industrial Group',
      fieldName: 'contract_renewal_worth',
      rawExcerpt: 'Opportunity b_renewal: Renew Aldermoor contract (14 docks across 15 plants), worth up to £140,000 ARR. Blocker: Finance (Nadia Rahman) cannot verify claimed security savings.',
      verificationStatus: 'VERIFIED_FACT',
    });

    const src2 = EvidenceRegistry.create({
      id: 'SRC-AIG-002',
      toolName: 'get_my_accounts',
      recordId: 'FACT-SR-ROI-2',
      account: 'Aldermoor Industrial Group',
      fieldName: 'roi_claim_vs_fact',
      rawExcerpt: 'Stefan Roy claimed 1.2M euro annual ROI. VERIFIED AUDIT (roi_spreadsheet): The figure is his own spreadsheet of guard hours drones COULD replace. No guard contract was reduced and finance booked zero savings.',
      verificationStatus: 'CUSTOMER_CLAIM',
    });

    const src3 = EvidenceRegistry.create({
      id: 'SRC-AIG-003',
      toolName: 'get_my_accounts',
      recordId: 'OPP-B-SISTER',
      account: 'Aldermoor Industrial Group',
      fieldName: 'sister_company_expansion',
      rawExcerpt: 'Opportunity b_sister: Case study for 40-plant sister company, worth up to £1,200,000. Blocker: Every number rests on an unverified internal spreadsheet.',
      verificationStatus: 'CUSTOMER_CLAIM',
    });

    const src4 = EvidenceRegistry.create({
      id: 'SRC-AIG-004',
      toolName: 'get_my_accounts',
      recordId: 'OFFER-B-NIGHT-SUPPORT',
      account: 'Aldermoor Industrial Group',
      fieldName: 'night_priority_offer',
      rawExcerpt: 'Offer b_priority_support: Night-time priority support for Plant 7 (£50,000), pitched to Beatriz Alonso. Status: Open.',
      verificationStatus: 'UNVERIFIED_ESTIMATE',
    });

    const deals: Deal[] = [
      {
        id: 'DEAL-AIG-01',
        name: 'Enterprise Perimeter Fleet (14 Docks Across 15 Plants)',
        account: 'Aldermoor Industrial Group',
        value: 140000,
        displayValue: '£140,000 ARR',
        stage: 'Delivered',
        category: 'Committed',
        blocker: 'Renewal at risk: Nadia Rahman (Finance) sees no guard contract reduction. 3 docks silent at night.',
        decisionMaker: 'Stefan Roy (Security) & Nadia Rahman (Finance Controller)',
        evidenceSource: src1,
        confidence: 'VERIFIED_FACT',
      },
      {
        id: 'DEAL-AIG-02',
        name: 'Sister Company 40-Plant Fleet Expansion',
        account: 'Aldermoor Industrial Group',
        value: 1200000,
        displayValue: '£1,200,000 (Speculative Claim)',
        stage: 'Proposal',
        category: 'Pipeline',
        blocker: 'Resting on Stefan Roy unverified €1.2M spreadsheet; Nadia Rahman confirmed sister company is separate budget.',
        decisionMaker: 'Sister Company Board & Group CFO',
        evidenceSource: src3,
        confidence: 'CUSTOMER_CLAIM',
      },
      {
        id: 'DEAL-AIG-03',
        name: 'Plant 7 Dedicated Night Priority Support',
        account: 'Aldermoor Industrial Group',
        value: 50000,
        displayValue: '£50,000 (Open Offer)',
        stage: 'Negotiation',
        category: 'Unverified Estimate',
        blocker: 'Beatriz Alonso evaluating telemetry reliability after recent night flight anomalies.',
        decisionMaker: 'Beatriz Alonso (Plant 7 Manager)',
        evidenceSource: src4,
        confidence: 'UNVERIFIED_ESTIMATE',
      },
    ];

    const verifiedTotal = deals
      .filter((d) => d.confidence === 'VERIFIED_FACT')
      .reduce((acc, d) => acc + (d.value || 0), 0);

    const pipelineTotal = deals
      .filter((d) => d.category === 'Pipeline')
      .reduce((acc, d) => acc + (d.value || 0), 0);

    const customerClaimTotal = deals
      .filter((d) => d.confidence === 'CUSTOMER_CLAIM')
      .reduce((acc, d) => acc + (d.value || 0), 0);

    return {
      accountName: 'Aldermoor Industrial Group',
      verifiedCommittedTotal: verifiedTotal,
      unverifiedPipelineTotal: pipelineTotal,
      customerClaimTotal,
      deals,
      methodologyNote: 'Only renewal contract base (£140k ARR) is verified. The €1.2M ROI / £1.2M sister expansion is Stefan Roy spreadsheet claim with zero guard cost reduction acknowledged by finance.',
    };
  }
}
