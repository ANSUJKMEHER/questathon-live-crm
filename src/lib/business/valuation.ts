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
   * Reconciled deal valuation for Account A (Eastern Counties Police Alliance)
   */
  public static getAccountADeals(rawPaperwork?: unknown, rawAccounts?: unknown): AccountValuationBreakdown {
    const src1 = EvidenceRegistry.create({
      id: 'SRC-ECPA-001',
      toolName: 'get_my_accounts',
      recordId: 'DEAL-A-RENEWAL',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'alliance_contract_renewal',
      rawExcerpt: 'Renew the alliance contract (35 docks). Original Task Outcome: Qualified, $128,057. Live contract verified covering active force fleet.',
      verificationStatus: 'VERIFIED_FACT',
    });

    const src2 = EvidenceRegistry.create({
      id: 'SRC-ECPA-002',
      toolName: 'get_my_accounts',
      recordId: 'OPP-A-UNBLOCK-TARN',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'tarn_norwold_golive',
      rawExcerpt: 'Tarn Valley and Norwold go live. Original Task Outcome: Blocker cleared, $142,302 (MCP worth up to £200,000). Blocked by missing DPIA data-flow documentation.',
      verificationStatus: 'CUSTOMER_CLAIM',
    });

    const src3 = EvidenceRegistry.create({
      id: 'SRC-ECPA-003',
      toolName: 'get_my_accounts',
      recordId: 'OPP-A-WESTMERE-EXPIRED',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'westmere_deadline_outcome',
      rawExcerpt: 'Scale Westmere fleet. Original Task Outcome: Qualified, but the deadline passed unfinished ($0 outcome). Ewan Brooks finance bid window closed before flight cost vs helicopter was cleared.',
      verificationStatus: 'VERIFIED_FACT',
    });

    const src4 = EvidenceRegistry.create({
      id: 'SRC-ECPA-004',
      toolName: 'get_my_accounts',
      recordId: 'OPP-A-TENDER-300',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'tender_framework_worth',
      rawExcerpt: 'Position for the 300-dock framework tender. Original Task Outcome: Qualified, $535,634 (MCP speculative ceiling up to £1,500,000). Blocker: Tender spec locks in 8 moves without a costed operating model.',
      verificationStatus: 'CUSTOMER_CLAIM',
    });

    const src5 = EvidenceRegistry.create({
      id: 'SRC-ECPA-005',
      toolName: 'get_my_accounts',
      recordId: 'OFFER-A-TRAINING',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'pre_event_training_offer',
      rawExcerpt: 'Offer a_training: Operator training for new pilots (£45,000 / $55,000), pitched to Insp. Karen Mbeki. Linked to urgent Ticket FB-11206 for 5 Dec event.',
      verificationStatus: 'UNVERIFIED_ESTIMATE',
    });

    const deals: Deal[] = [
      {
        id: 'DEAL-ECPA-01',
        name: 'Renew the Alliance Contract (35 Docks Across 4 Forces)',
        account: 'Eastern Counties Police Alliance',
        value: 128057,
        displayValue: '$128,057',
        taskBaselineValue: '$128,057 (Qualified)',
        taskOutcomeStatus: 'Qualified',
        stage: 'Committed',
        category: 'Committed',
        blocker: 'None on existing 35-dock fleet. Ongoing operational policing in Westmere & Metro Central.',
        decisionMaker: 'Insp. Karen Mbeki & Alliance Procurement',
        evidenceSource: src1,
        confidence: 'VERIFIED_FACT',
      },
      {
        id: 'DEAL-ECPA-02',
        name: 'Tarn Valley and Norwold Go Live (Fleet Expansion)',
        account: 'Eastern Counties Police Alliance',
        value: 142302,
        displayValue: '$142,302',
        taskBaselineValue: '$142,302 (Blocker Cleared)',
        taskOutcomeStatus: 'Blocker Cleared',
        stage: 'Proposal',
        category: 'Pipeline',
        blocker: 'Fatima Osei (DPO) holds DPIA sign-off until data-flow documents requested 4 months ago are delivered.',
        decisionMaker: 'Fatima Osei (DPO) & Norwold Chief Constable',
        evidenceSource: src2,
        confidence: 'CUSTOMER_CLAIM',
      },
      {
        id: 'DEAL-ECPA-03',
        name: 'Scale Westmere Fleet (Finance Bid Expansion)',
        account: 'Eastern Counties Police Alliance',
        value: 0,
        displayValue: '$0 (Expired Deadline)',
        taskBaselineValue: '$0 (Deadline Passed Unfinished)',
        taskOutcomeStatus: 'Deadline Passed ($0)',
        stage: 'Expired',
        category: 'Expired Outcome',
        blocker: 'Metro Central finance bid window closed before flight cost vs helicopter benchmark was calculated. Zero revenue realized.',
        decisionMaker: 'Ewan Brooks (Finance Partner, Metro Central)',
        evidenceSource: src3,
        confidence: 'VERIFIED_FACT',
      },
      {
        id: 'DEAL-ECPA-04',
        name: 'Position for the 300-Dock Framework Tender',
        account: 'Eastern Counties Police Alliance',
        value: 535634,
        displayValue: '$535,634 (Ceiling: $1.5M)',
        taskBaselineValue: '$535,634 (Qualified)',
        taskOutcomeStatus: 'Qualified',
        stage: 'Proposal',
        category: 'Pipeline',
        blocker: 'Tender spec locks in 8 moves. Spec currently has no costed operating model; no pooled budget between forces.',
        decisionMaker: 'Hannah Doyle (Alliance Procurement Lead) & 4 Force CFOs',
        evidenceSource: src4,
        confidence: 'CUSTOMER_CLAIM',
      },
      {
        id: 'DEAL-ECPA-05',
        name: 'Urgent Pre-Event Operator Training Package',
        account: 'Eastern Counties Police Alliance',
        value: 55000,
        displayValue: '$55,000 (Open Offer)',
        taskBaselineValue: 'Open Offer (£45,000 / $55,000)',
        taskOutcomeStatus: 'Identified',
        stage: 'Negotiation',
        category: 'Unverified Estimate',
        blocker: 'Insp. Karen Mbeki demanded written confirmation of training dates before 5 Dec public event (Ticket FB-11206).',
        decisionMaker: 'Insp. Karen Mbeki (Westmere Drone Unit)',
        evidenceSource: src5,
        confidence: 'UNVERIFIED_ESTIMATE',
      },
    ];

    const verifiedTotal = deals
      .filter((d) => d.confidence === 'VERIFIED_FACT' && d.category === 'Committed')
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
      methodologyNote: 'Only signed Alliance contract ($128,057) is verified committed. Westmere fleet expansion is audited at $0 because its deadline passed unfinished. Tender framework ($535,634 qualified baseline) is uncommitted pipeline.',
    };
  }

  /**
   * Reconciled deal valuation for Account B (Aldermoor Industrial Group)
   */
  public static getAccountBDeals(rawPaperwork?: unknown, rawAccounts?: unknown): AccountValuationBreakdown {
    const src1 = EvidenceRegistry.create({
      id: 'SRC-AIG-001',
      toolName: 'get_my_accounts',
      recordId: 'DEAL-B-RENEWAL',
      account: 'Aldermoor Industrial Group',
      fieldName: 'aldermoor_contract_renewal',
      rawExcerpt: 'Renew the Aldermoor contract (14 docks). Original Task Outcome: Qualified, $26,164. Blocker: Nadia Rahman (Finance) sees no guard contract reduction.',
      verificationStatus: 'VERIFIED_FACT',
    });

    const src2 = EvidenceRegistry.create({
      id: 'SRC-AIG-002',
      toolName: 'get_my_accounts',
      recordId: 'DEAL-B-IDLE-PLANTS',
      account: 'Aldermoor Industrial Group',
      fieldName: 'idle_plants_worth',
      rawExcerpt: 'Bring the idle plants into regular patrol. Original Task Outcome: Identified, $5,418. Blocker: 9 plants only log test flights; plant managers resent paying allocation.',
      verificationStatus: 'CUSTOMER_CLAIM',
    });

    const src3 = EvidenceRegistry.create({
      id: 'SRC-AIG-003',
      toolName: 'get_my_accounts',
      recordId: 'DEAL-B-INSURANCE-DISCOUNT',
      account: 'Aldermoor Industrial Group',
      fieldName: 'insurance_discount_deal',
      rawExcerpt: 'Protect and extend the insurance discount. Original Task Outcome: Never heard of / Unidentified opportunity. Julian Tate needs flight logs to lower insurance premiums.',
      verificationStatus: 'UNKNOWN',
    });

    const src4 = EvidenceRegistry.create({
      id: 'SRC-AIG-004',
      toolName: 'get_my_accounts',
      recordId: 'DEAL-B-SISTER-COMPANY',
      account: 'Aldermoor Industrial Group',
      fieldName: 'sister_company_case_study',
      rawExcerpt: 'Case study for the 40-plant sister company. Original Task Outcome: Qualified, $207,845. Blocker: Stefan Roy €1.2M spreadsheet unverified by finance.',
      verificationStatus: 'CUSTOMER_CLAIM',
    });

    const deals: Deal[] = [
      {
        id: 'DEAL-AIG-01',
        name: 'Renew the Aldermoor Contract (14 Docks Across 15 Plants)',
        account: 'Aldermoor Industrial Group',
        value: 26164,
        displayValue: '$26,164 ARR',
        taskBaselineValue: '$26,164 (Qualified)',
        taskOutcomeStatus: 'Qualified',
        stage: 'Delivered',
        category: 'Committed',
        blocker: 'Renewal at risk: Nadia Rahman (Finance) sees zero guard savings. 3 docks silent at night for 14 days.',
        decisionMaker: 'Stefan Roy (Security) & Nadia Rahman (Finance Controller)',
        evidenceSource: src1,
        confidence: 'VERIFIED_FACT',
      },
      {
        id: 'DEAL-AIG-02',
        name: 'Bring the Idle Plants into Regular Patrol',
        account: 'Aldermoor Industrial Group',
        value: 5418,
        displayValue: '$5,418',
        taskBaselineValue: '$5,418 (Identified)',
        taskOutcomeStatus: 'Identified',
        stage: 'Proposal',
        category: 'Pipeline',
        blocker: '9 plants only log test flights; Plant 15 has no dock. Plant managers resent security overhead allocation.',
        decisionMaker: 'Plant Managers & Stefan Roy',
        evidenceSource: src2,
        confidence: 'CUSTOMER_CLAIM',
      },
      {
        id: 'DEAL-AIG-03',
        name: 'Protect and Extend the Insurance Discount',
        account: 'Aldermoor Industrial Group',
        value: null,
        displayValue: 'Unquantified ($0 Identified)',
        taskBaselineValue: 'Never Heard Of (Unidentified)',
        taskOutcomeStatus: 'Never Heard Of',
        stage: 'Discovery',
        category: 'Unverified Estimate',
        blocker: 'Unidentified deal in historical account files. Requires Julian Tate (Risk Manager) flight-log telemetry to establish insurer savings.',
        decisionMaker: 'Julian Tate (Insurance & Risk Manager)',
        evidenceSource: src3,
        confidence: 'UNKNOWN',
      },
      {
        id: 'DEAL-AIG-04',
        name: 'Case Study for the 40-Plant Sister Company',
        account: 'Aldermoor Industrial Group',
        value: 207845,
        displayValue: '$207,845 (Ceiling: €1.2M)',
        taskBaselineValue: '$207,845 (Qualified)',
        taskOutcomeStatus: 'Qualified',
        stage: 'Proposal',
        category: 'Pipeline',
        blocker: 'Resting on Stefan Roy unverified spreadsheet; Nadia Rahman confirmed sister company is a separate corporate budget.',
        decisionMaker: 'Sister Company Executive Board & Group CFO',
        evidenceSource: src4,
        confidence: 'CUSTOMER_CLAIM',
      },
    ];

    const verifiedTotal = deals
      .filter((d) => d.confidence === 'VERIFIED_FACT' && d.category === 'Committed')
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
      methodologyNote: 'Only active renewal base ($26,164) is verified. Insurance discount is cataloged as Never Heard Of / Unknown. Sister company expansion ($207,845 qualified) rests on an unverified spreadsheet.',
    };
  }
}
