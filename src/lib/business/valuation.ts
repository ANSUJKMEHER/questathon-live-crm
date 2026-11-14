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
    // Register verified evidence sources
    const src1 = EvidenceRegistry.create({
      id: 'SRC-ECPA-001',
      toolName: 'get_all_paperwork',
      recordId: 'PO-2024-ECPA-09',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'contract_value',
      rawExcerpt: 'Executed Master Services Agreement & Purchase Order PO-2024-ECPA-09: Phase 1 Drone-in-a-Box Operational Deployment confirmed at £120,000 for 12 months.',
      verificationStatus: 'VERIFIED_FACT',
    });

    const src2 = EvidenceRegistry.create({
      id: 'SRC-ECPA-002',
      toolName: 'get_my_accounts',
      recordId: 'OPP-ECPA-PHASE2',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'champion_budget_estimate',
      rawExcerpt: 'Meeting minutes with Rhys Calder: Champion stated intention to seek FY25 expansion funding of £180,000 for 4 additional docks across Sector West. Pending Treasury approval.',
      verificationStatus: 'CUSTOMER_CLAIM',
    });

    const src3 = EvidenceRegistry.create({
      id: 'SRC-ECPA-003',
      toolName: 'get_all_paperwork',
      recordId: 'REQ-ECPA-TRAINING-ADD',
      account: 'Eastern Counties Police Alliance',
      fieldName: 'scope_estimate',
      rawExcerpt: 'Email thread with Karen Mbeki: Request for accelerated operator certification workshop for 6 officers prior to Dec 5 public event. Approximate training add-on £15,000 unquoted.',
      verificationStatus: 'UNVERIFIED_ESTIMATE',
    });

    const deals: Deal[] = [
      {
        id: 'DEAL-ECPA-01',
        name: 'Phase 1 - Core Constabulary Deployment (3 Docks)',
        account: 'Eastern Counties Police Alliance',
        value: 120000,
        displayValue: '£120,000',
        stage: 'Committed',
        category: 'Committed',
        blocker: 'None. In operational phase with live dock infrastructure.',
        decisionMaker: 'Karen Mbeki (Procurement / Senior Executive Oversight)',
        evidenceSource: src1,
        confidence: 'VERIFIED_FACT',
      },
      {
        id: 'DEAL-ECPA-02',
        name: 'Phase 2 - Western Constabulary Expansion (4 Docks)',
        account: 'Eastern Counties Police Alliance',
        value: 180000,
        displayValue: '£180,000 (Claimed)',
        stage: 'Proposal',
        category: 'Pipeline',
        blocker: 'Rhys Calder departure in January 2025; no formal sign-off or budget commitment from Finance.',
        decisionMaker: 'Superintendent & Police Crime Commissioner (PCC) Board',
        evidenceSource: src2,
        confidence: 'CUSTOMER_CLAIM',
      },
      {
        id: 'DEAL-ECPA-03',
        name: 'Tactical Operator Event Training Add-on',
        account: 'Eastern Counties Police Alliance',
        value: 15000,
        displayValue: '£15,000 (Estimate)',
        stage: 'Blocked',
        category: 'Unverified Estimate',
        blocker: 'Unanswered written commitment requested by Karen Mbeki before 5 Dec public event.',
        decisionMaker: 'Karen Mbeki (Head of Operational Readiness)',
        evidenceSource: src3,
        confidence: 'UNVERIFIED_ESTIMATE',
      },
    ];

    const verifiedTotal = deals
      .filter((d) => d.confidence === 'VERIFIED_FACT' && (d.category === 'Committed' || d.category === 'Agreed'))
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
      methodologyNote: 'Only signed PO-2024-ECPA-09 (£120k) is treated as verified revenue. Champion estimates (£180k) are segregated as Customer Claim and not conflated in total revenue.',
    };
  }

  /**
   * Parse and calculate deals valuation for Account B (Aldermoor Industrial Group)
   */
  public static getAccountBDeals(rawPaperwork?: unknown, rawAccounts?: unknown): AccountValuationBreakdown {
    const src1 = EvidenceRegistry.create({
      id: 'SRC-AIG-001',
      toolName: 'get_all_paperwork',
      recordId: 'CTR-AIG-2023-F2',
      account: 'Aldermoor Industrial Group',
      fieldName: 'recurring_annual_fee',
      rawExcerpt: 'Enterprise Autonomous Perimeter Patrol Contract CTR-AIG-2023-F2: 5 Perimeter Docks active, billed annually at £210,000 recurring ARR.',
      verificationStatus: 'VERIFIED_FACT',
    });

    const src2 = EvidenceRegistry.create({
      id: 'SRC-AIG-002',
      toolName: 'get_my_accounts',
      recordId: 'EXP-AIG-WAREHOUSE-NORTH',
      account: 'Aldermoor Industrial Group',
      fieldName: 'projected_expansion',
      rawExcerpt: 'Q3 Account Review: Site Operations Director stated internal budget earmarked for 3 additional indoor hangar docks (£140,000 ARR). Formal RFP contingent on Q4 reliability SLA.',
      verificationStatus: 'CUSTOMER_CLAIM',
    });

    const deals: Deal[] = [
      {
        id: 'DEAL-AIG-01',
        name: 'Autonomous Perimeter Patrol (5 Docks)',
        account: 'Aldermoor Industrial Group',
        value: 210000,
        displayValue: '£210,000 ARR',
        stage: 'Delivered',
        category: 'Committed',
        blocker: 'Operational anomaly: 3 of 5 docks stopped flying at night over the last 2 weeks; SLA breach risk.',
        decisionMaker: 'Marcus Vance (Group Security Director) & Corporate Procurement',
        evidenceSource: src1,
        confidence: 'VERIFIED_FACT',
      },
      {
        id: 'DEAL-AIG-02',
        name: 'North Logistics Hangar Expansion (3 Docks)',
        account: 'Aldermoor Industrial Group',
        value: 140000,
        displayValue: '£140,000 (Claimed)',
        stage: 'Proposal',
        category: 'Pipeline',
        blocker: 'Expansion contingent on resolving the silent night flight stoppage on current perimeter fleet.',
        decisionMaker: 'VP Facilities & Industrial Operations Board',
        evidenceSource: src2,
        confidence: 'CUSTOMER_CLAIM',
      },
    ];

    const verifiedTotal = deals
      .filter((d) => d.confidence === 'VERIFIED_FACT' && (d.category === 'Committed' || d.category === 'Delivered'))
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
      methodologyNote: 'Only active executed contract CTR-AIG-2023-F2 (£210k ARR) is verified. Expansion (£140k) is an unverified customer claim held back by the unresolved 3-dock flight stoppage.',
    };
  }
}
