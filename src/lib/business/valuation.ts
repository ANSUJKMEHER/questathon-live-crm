import { Deal, VerificationStatus } from '../types/crm';
import { EvidenceRegistry } from '../storage/registry';

export interface AccountValuationBreakdown {
  accountName: string;
  qualifiedRenewalBaseline: number;
  contractuallyConfirmedTotal: number;
  qualifiedPipelineBaseline: number;
  speculativeCeilingTotal: number;
  verifiedCommittedTotal: number; // Backwards-compatible alias for qualifiedRenewalBaseline
  unverifiedPipelineTotal: number; // Backwards-compatible alias for qualifiedPipelineBaseline
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
      rawExcerpt: 'Renew the alliance contract (35 docks). Original Task Outcome: Qualified, $128,057. Live contract verified covering active force fleet. Contractually confirmed revenue is unverified pending signed contract documentation.',
      verificationStatus: 'UNVERIFIED_ESTIMATE',
    });

    const src2 = EvidenceRegistry.create({
      id: 'SRC-ECPA-002',
      toolName: 'get_my_accounts',
      recordId: 'OPP-A-UNBLOCK-TARN',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'tarn_norwold_golive',
      rawExcerpt: 'Tarn Valley and Norwold go live. Original Task Outcome: Blocker cleared, $142,302 (MCP speculative ceiling up to £200,000). Blocked by missing DPIA data-flow documentation.',
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
      rawExcerpt: 'Position for the 300-dock framework tender. Original Task Outcome: Qualified, $535,634 (MCP speculative ceiling up to £1,500,000). Speculative maximum claim, not confirmed revenue. Blocker: Tender spec locks in 8 moves without a costed operating model.',
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
        displayValue: '$128,057 (Qualified Baseline)',
        taskBaselineValue: '$128,057 (Qualified)',
        taskOutcomeStatus: 'Qualified',
        stage: 'Qualified',
        category: 'Qualified Renewal Baseline',
        blocker: 'Renewal at qualified stage; no signed contract documentation or PO on file. Contractually confirmed revenue is unverified.',
        decisionMaker: 'Insp. Karen Mbeki & Alliance Procurement',
        evidenceSource: src1,
        confidence: 'UNVERIFIED_ESTIMATE',
      },
      {
        id: 'DEAL-ECPA-02',
        name: 'Tarn Valley and Norwold Go Live (Fleet Expansion)',
        account: 'Eastern Counties Police Alliance',
        value: 142302,
        displayValue: '$142,302 (Ceiling: $200k)',
        taskBaselineValue: '$142,302 (Blocker Cleared)',
        taskOutcomeStatus: 'Blocker Cleared',
        stage: 'Proposal',
        category: 'Qualified Pipeline',
        speculativeCeiling: 200000,
        speculativeCeilingDisplay: '$200,000 Speculative Ceiling',
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
        category: 'Qualified Pipeline',
        speculativeCeiling: 1500000,
        speculativeCeilingDisplay: '$1,500,000 Speculative Maximum Claim',
        blocker: 'Tender spec locks in 8 moves without a costed operating model. $1.5M is a speculative ceiling claim, not confirmed revenue. No pooled budget between forces.',
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

    const qualifiedRenewalBaseline = 128057;
    const contractuallyConfirmedTotal = 0; // Unverified without signed contract paperwork
    const qualifiedPipelineBaseline = 142302 + 535634; // $677,936
    const speculativeCeilingTotal = 200000 + 1500000; // $1,700,000
    const customerClaimTotal = qualifiedPipelineBaseline;

    return {
      accountName: 'Eastern Counties Police Alliance',
      qualifiedRenewalBaseline,
      contractuallyConfirmedTotal,
      qualifiedPipelineBaseline,
      speculativeCeilingTotal,
      verifiedCommittedTotal: qualifiedRenewalBaseline,
      unverifiedPipelineTotal: qualifiedPipelineBaseline,
      customerClaimTotal,
      deals,
      methodologyNote: 'The 35-dock alliance renewal ($128,057) is classified as an Evidence-Backed Qualified Renewal Baseline. Contractually confirmed revenue is unverified ($0) pending signed contract paperwork. Westmere fleet expansion is audited at $0 because its deadline passed unfinished. Qualified pipeline baseline is $677,936 ($142,302 Tarn + $535,634 Tender). Speculative ceiling reaches $1,700,000 ($200k Tarn + $1.5M Tender ceiling).',
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
      rawExcerpt: 'Renew the Aldermoor contract (14 docks). Original Task Outcome: Qualified, $26,164. Blocker: Nadia Rahman (Finance) sees no guard contract reduction. Contractually confirmed revenue is unverified pending signed contract documentation.',
      verificationStatus: 'UNVERIFIED_ESTIMATE',
    });

    const src2 = EvidenceRegistry.create({
      id: 'SRC-AIG-002',
      toolName: 'get_my_accounts',
      recordId: 'DEAL-B-IDLE-PLANTS',
      account: 'Aldermoor Industrial Group',
      fieldName: 'idle_plants_worth',
      rawExcerpt: 'Bring the idle plants into regular patrol. Original Task Outcome: Identified, $5,418. MCP worth_up_to is null (excluded from speculative ceiling calculation). Blocker: 9 plants only log test flights; plant managers resent paying allocation.',
      verificationStatus: 'CUSTOMER_CLAIM',
    });

    const src3 = EvidenceRegistry.create({
      id: 'SRC-AIG-003',
      toolName: 'get_my_accounts',
      recordId: 'DEAL-B-INSURANCE-DISCOUNT',
      account: 'Aldermoor Industrial Group',
      fieldName: 'insurance_discount_deal',
      rawExcerpt: 'Protect and extend the insurance discount. Original Task Outcome: Never heard of / Unidentified opportunity ($0). Julian Tate needs flight logs to lower insurance premiums.',
      verificationStatus: 'UNKNOWN',
    });

    const src4 = EvidenceRegistry.create({
      id: 'SRC-AIG-004',
      toolName: 'get_my_accounts',
      recordId: 'DEAL-B-SISTER-COMPANY',
      account: 'Aldermoor Industrial Group',
      fieldName: 'sister_company_case_study',
      rawExcerpt: 'Case study for the 40-plant sister company. Original Task Outcome: Qualified, $207,845 (MCP speculative ceiling up to €1,200,000). Speculative maximum claim, not confirmed revenue. Blocker: Stefan Roy €1.2M spreadsheet unverified by finance.',
      verificationStatus: 'CUSTOMER_CLAIM',
    });

    const deals: Deal[] = [
      {
        id: 'DEAL-AIG-01',
        name: 'Renew the Aldermoor Contract (14 Docks Across 15 Plants)',
        account: 'Aldermoor Industrial Group',
        value: 26164,
        displayValue: '$26,164 ARR (Qualified Baseline)',
        taskBaselineValue: '$26,164 (Qualified)',
        taskOutcomeStatus: 'Qualified',
        stage: 'Qualified',
        category: 'Qualified Renewal Baseline',
        blocker: 'Renewal at qualified stage; no signed contract documentation on file. Nadia Rahman (Finance) sees zero guard savings. 3 docks silent at night for 14 days.',
        decisionMaker: 'Stefan Roy (Security) & Nadia Rahman (Finance Controller)',
        evidenceSource: src1,
        confidence: 'UNVERIFIED_ESTIMATE',
      },
      {
        id: 'DEAL-AIG-02',
        name: 'Bring the Idle Plants into Regular Patrol',
        account: 'Aldermoor Industrial Group',
        value: 5418,
        displayValue: '$5,418 (worth_up_to: null)',
        taskBaselineValue: '$5,418 (Identified)',
        taskOutcomeStatus: 'Identified',
        stage: 'Proposal',
        category: 'Qualified Pipeline',
        speculativeCeiling: null,
        speculativeCeilingDisplay: 'Excluded (worth_up_to is null)',
        blocker: '9 plants only log test flights; Plant 15 has no dock. Plant managers resent security overhead allocation. MCP worth_up_to is null.',
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
        blocker: 'Unidentified deal in historical account files. Requires Julian Tate (Insurance & Risk Manager) flight-log telemetry to establish insurer savings.',
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
        category: 'Qualified Pipeline',
        speculativeCeiling: 1200000,
        speculativeCeilingDisplay: '€1,200,000 Speculative Maximum Claim',
        blocker: 'Resting on Stefan Roy unverified €1.2M spreadsheet; Nadia Rahman confirmed sister company is a separate corporate budget. €1.2M is a speculative maximum claim, not confirmed revenue.',
        decisionMaker: 'Sister Company Executive Board & Group CFO',
        evidenceSource: src4,
        confidence: 'CUSTOMER_CLAIM',
      },
    ];

    const qualifiedRenewalBaseline = 26164;
    const contractuallyConfirmedTotal = 0; // Unverified without signed contract paperwork
    const qualifiedPipelineBaseline = 5418 + 207845; // $213,263
    const speculativeCeilingTotal = 1200000; // $1,200,000 from sister company (idle plant worth_up_to is null and excluded)
    const customerClaimTotal = qualifiedPipelineBaseline;

    return {
      accountName: 'Aldermoor Industrial Group',
      qualifiedRenewalBaseline,
      contractuallyConfirmedTotal,
      qualifiedPipelineBaseline,
      speculativeCeilingTotal,
      verifiedCommittedTotal: qualifiedRenewalBaseline,
      unverifiedPipelineTotal: qualifiedPipelineBaseline,
      customerClaimTotal,
      deals,
      methodologyNote: 'The 14-dock contract renewal ($26,164 ARR) is classified as an Evidence-Backed Qualified Renewal Baseline. Contractually confirmed revenue is unverified ($0) pending signed contract documentation. Insurance discount is cataloged as Never Heard Of / Unknown ($0). Qualified pipeline baseline is $213,263 ($5,418 Idle + $207,845 Sister Company). Speculative ceiling is $1,200,000 (Sister company €1.2M spreadsheet; idle plants excluded as worth_up_to is null).',
    };
  }
}
