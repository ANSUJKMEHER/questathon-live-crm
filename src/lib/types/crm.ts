export type VerificationStatus =
  | 'VERIFIED_FACT'
  | 'CUSTOMER_CLAIM'
  | 'UNVERIFIED_ESTIMATE'
  | 'INFERENCE'
  | 'UNKNOWN';

export interface EvidenceSource {
  id: string;
  toolName: string;
  recordId: string;
  account: string;
  retrievalTimestamp: string;
  fieldName?: string;
  rawExcerpt: string;
  verificationStatus: VerificationStatus;
}

export interface Deal {
  id: string;
  name: string;
  account: string;
  value: number | null;
  displayValue: string;
  taskBaselineValue?: string;
  taskOutcomeStatus?: 'Qualified' | 'Blocker Cleared' | 'Deadline Passed ($0)' | 'Identified' | 'Never Heard Of';
  stage: 'Discovery' | 'Proposal' | 'Negotiation' | 'Committed' | 'Delivered' | 'On Hold' | 'Blocked' | 'Expired';
  category: 'Committed' | 'Pipeline' | 'Agreed' | 'Delivered' | 'Unverified Estimate' | 'Expired Outcome';
  blocker: string;
  decisionMaker: string;
  evidenceSource: EvidenceSource;
  confidence: VerificationStatus;
}

export type PowerCategory =
  | 'DECISION_MAKER'
  | 'PAYER'
  | 'END_USER'
  | 'OPERATIONAL_OWNER'
  | 'PROCUREMENT'
  | 'TECHNICAL_APPROVER'
  | 'BLOCKER'
  | 'INTERNAL_OWNER';

export interface Stakeholder {
  id: string;
  name: string;
  title: string;
  role: string;
  account: string;
  powerCategory: PowerCategory;
  relationshipStatus: 'STRONG' | 'NEUTRAL' | 'DECLINING' | 'AT_RISK' | 'UNMET';
  influenceType: 'CONFIRMED' | 'INFERRED';
  evidenceSupportingInfluence: string;
  whatTheyNeed: string;
  nextEngagement: string;
  internalFlytbaseOwner: string;
}

export interface DealPowerMapping {
  dealId: string;
  dealName: string;
  account: string;
  decider: string;
  payer: string;
  endUser: string;
  blocker: string;
  champion: string;
  relationshipStatus: 'STRONG' | 'NEUTRAL' | 'DECLINING' | 'AT_RISK' | 'UNMET';
  whatTheyNeed: string;
}

export interface ActionItem {
  id: string;
  account: string;
  priorityRank: number;
  action: string;
  owner: string;
  isOwnerConfirmed: boolean;
  dueDate: string;
  isDueDateConfirmed: boolean;
  relatedDeal: string;
  businessReason: string;
  sourceEvidence: string;
  expectedOutcome: string;
  urgencyWeight?: number;
}

export type RiskSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface RiskItem {
  id: string;
  title: string;
  account: string;
  severity: RiskSeverity;
  probability: string; // Qualitative assessment with explanation
  probabilityIsQualitative: boolean;
  impact: string;
  trigger: string;
  deadline: string;
  owner: string;
  mitigation: string;
  sourceId: string;
}

export interface UnknownItem {
  id: string;
  missingInformation: string;
  whyItMatters: string;
  relatedDeal: string;
  whoCanAnswer: string;
  howToObtain: string;
  suggestedAction: string;
  consequenceIfUnresolved: string;
  status: 'UNRESOLVED' | 'INVESTIGATING' | 'RESOLVED';
  account: string;
}

export interface LiveEventItem {
  id: string;
  title: string;
  account: string;
  eventType: 'OPERATIONAL_ANOMALY' | 'CUSTOMER_COMMITMENT' | 'PERSONNEL_CHANGE' | 'SIGNAL';
  description: string;
  detectedAt: string;
  operationalStatus: string;
  internalOwner: string;
  customerContact: string;
  recommendedActions: string[];
  sourceTool: string;
  urgency: 'IMMEDIATE' | 'HIGH' | 'MEDIUM';
}

export interface CRMNote {
  id: string;
  account: string;
  kind: string;
  title: string;
  text: string;
  createdAt: string;
  source: string;
}

export interface AccountSummary {
  id: string;
  name: string;
  shortCode: 'ACCOUNT_A' | 'ACCOUNT_B';
  healthStatus: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  primaryInternalOwner: string;
  verifiedBookValue: number;
  unverifiedPipelineValue: number;
  activeDealsCount: number;
  criticalRisksCount: number;
  topActionsCount: number;
  openUnknownsCount: number;
  activeSignalsCount: number;
  lastDataFreshness: string;
}

export interface AccountQuestionsAnswers {
  accountName: string;
  accountCode: 'ACCOUNT_A' | 'ACCOUNT_B';
  q1_bookWorth: {
    summary: string;
    verifiedValue: number;
    customerClaimValue: number;
    unverifiedEstimateValue: number;
    deals: Deal[];
  };
  q2_powerHolders: {
    summary: string;
    stakeholders: Stakeholder[];
    dealPowerMappings: DealPowerMapping[];
  };
  q3_actionsFirst: {
    summary: string;
    topThreeActions: ActionItem[];
  };
  q4_aboutToGoWrong: {
    summary: string;
    risks: RiskItem[];
  };
  q5_stillNotKnow: {
    summary: string;
    unknowns: UnknownItem[];
  };
  liveEvents: LiveEventItem[];
}

export interface CRMDataPayload {
  lastUpdated: string;
  isLiveMCP: boolean;
  rateLimitStatus: {
    isReady: boolean;
    secondsRemaining: number;
    lastCallTimestamp: number | null;
    lastToolCalled: string | null;
  };
  syncStatus: {
    stepsCompleted: string[];
    pendingSteps: string[];
    isSyncing: boolean;
    totalSources: number;
  };
  accounts: {
    accountA: AccountSummary;
    accountB: AccountSummary;
  };
  answers: {
    accountA: AccountQuestionsAnswers;
    accountB: AccountQuestionsAnswers;
  };
  allDeals: Deal[];
  allStakeholders: Stakeholder[];
  allDealPowerMappings: DealPowerMapping[];
  allActions: ActionItem[];
  allRisks: RiskItem[];
  allUnknowns: UnknownItem[];
  allLiveEvents: LiveEventItem[];
  allSources: EvidenceSource[];
  allNotes: CRMNote[];
}
