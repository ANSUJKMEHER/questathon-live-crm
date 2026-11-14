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
  stage: 'Discovery' | 'Proposal' | 'Negotiation' | 'Committed' | 'Delivered' | 'On Hold' | 'Blocked';
  category: 'Committed' | 'Pipeline' | 'Agreed' | 'Delivered' | 'Unverified Estimate';
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
  relationshipStatus: 'STRONG' | 'NEUTRAL' | 'DECLINING' | 'AT_RISK';
  influenceType: 'CONFIRMED' | 'INFERRED';
  evidenceSupportingInfluence: string;
  whatTheyNeed: string;
  nextEngagement: string;
  internalFlytbaseOwner: string;
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
}

export type RiskSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface RiskItem {
  id: string;
  title: string;
  account: string;
  severity: RiskSeverity;
  probability: string; // Qualitative assessment or supported probability
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
  consequenceIfUnresolved: string;
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
  allActions: ActionItem[];
  allRisks: RiskItem[];
  allUnknowns: UnknownItem[];
  allLiveEvents: LiveEventItem[];
  allSources: EvidenceSource[];
  allNotes: CRMNote[];
}
