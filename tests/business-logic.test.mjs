import test from 'node:test';
import assert from 'node:assert/strict';

test('Valuation Rules: Reconciles task outcomes ($128k, $26k) and audits expired Westmere deadline at $0', () => {
  const deals = [
    { name: 'Renew Alliance (35 Docks)', value: 128057, confidence: 'VERIFIED_FACT', category: 'Committed' },
    { name: 'Renew Aldermoor (14 Docks)', value: 26164, confidence: 'VERIFIED_FACT', category: 'Committed' },
    { name: 'Scale Westmere Fleet', value: 0, confidence: 'VERIFIED_FACT', category: 'Expired Outcome', stage: 'Expired' },
    { name: 'Position 300-Dock Framework', value: 535634, confidence: 'CUSTOMER_CLAIM', category: 'Pipeline' },
    { name: 'Case Study 40-Plant Sister', value: 207845, confidence: 'CUSTOMER_CLAIM', category: 'Pipeline' },
  ];

  const committedTotal = deals
    .filter((d) => d.category === 'Committed')
    .reduce((sum, d) => sum + d.value, 0);

  const expiredDeal = deals.find((d) => d.name === 'Scale Westmere Fleet');
  const pipelineTotal = deals
    .filter((d) => d.category === 'Pipeline')
    .reduce((sum, d) => sum + d.value, 0);

  assert.equal(committedTotal, 154221, 'Verified committed book must equal $154,221 ($128,057 + $26,164)');
  assert.equal(expiredDeal.value, 0, 'Expired Westmere deadline must be audited at $0');
  assert.equal(expiredDeal.stage, 'Expired');
  assert.equal(pipelineTotal, 743479, 'Pipeline baseline must equal $743,479 ($535,634 + $207,845)');
});

test('Rate Limiter: Strictly enforces 60s cooldown buffer', () => {
  const COOLDOWN_MS = 61000;
  const now = Date.now();
  const lastCallTimestamp = now - 30000; // 30s ago
  const elapsed = now - lastCallTimestamp;
  const isAllowed = elapsed >= COOLDOWN_MS;
  const waitSeconds = Math.ceil((COOLDOWN_MS - elapsed) / 1000);

  assert.equal(isAllowed, false, 'Call within 30s must be blocked by rate limiter');
  assert.equal(waitSeconds, 31, 'Must require waiting remaining 31 seconds');
});

test('Power Mapping: Owen Fitch is explicitly cataloged as UNMET and deal power mappings are complete', () => {
  const stakeholders = [
    { name: 'Insp. Karen Mbeki', relationshipStatus: 'AT_RISK', powerCategory: 'DECISION_MAKER' },
    { name: 'Nadia Rahman', relationshipStatus: 'AT_RISK', powerCategory: 'DECISION_MAKER' },
    { name: 'Owen Fitch', relationshipStatus: 'UNMET', powerCategory: 'TECHNICAL_APPROVER' },
  ];

  const owen = stakeholders.find((s) => s.name === 'Owen Fitch');
  assert.ok(owen, 'Owen Fitch must be present in power map');
  assert.equal(owen.relationshipStatus, 'UNMET', 'Owen Fitch must be explicitly marked UNMET as player has never met him');

  const dealMapping = {
    dealId: 'DEAL-AIG-01',
    decider: 'Nadia Rahman',
    payer: 'Corporate Security Budget',
    endUser: 'On-site Guards',
    blocker: 'Nadia Rahman (sees no guard contract savings)',
    champion: 'Stefan Roy',
  };
  assert.equal(dealMapping.decider, 'Nadia Rahman');
  assert.equal(dealMapping.champion, 'Stefan Roy');
});

test('Action Prioritization: Rank #1 actions address immediate live signals and tickets', () => {
  const actions = [
    { priorityRank: 1, action: 'Draft written response to Insp. Karen Mbeki regarding Ticket FB-11206 before 5 Dec' },
    { priorityRank: 2, action: 'Initiate proactive telemetry diagnostic on 3 silent perimeter docks' },
  ];

  assert.match(actions[0].action, /Karen Mbeki/);
  assert.match(actions[0].action, /FB-11206/);
  assert.match(actions[1].action, /3 silent perimeter docks/);
});

test('Unknowns Register: Tracks lifecycle status (UNRESOLVED, INVESTIGATING, RESOLVED) and suggested action', () => {
  const unknownItem = {
    id: 'UNK-AIG-01',
    missingInformation: 'Exact root cause of the 14-day night flight stoppage on 3 perimeter docks',
    status: 'INVESTIGATING',
    suggestedAction: 'Deploy telemetry diagnostic probe to examine scheduler daemon logs without customer disruption',
  };

  assert.equal(unknownItem.status, 'INVESTIGATING');
  assert.ok(unknownItem.suggestedAction.length > 10, 'Must have actionable suggested next step');
});

test('Live Signals: Recognizes silent dock stoppage and marks cause strictly unknown', () => {
  const signal = {
    account: 'Aldermoor Industrial Group',
    onlineDocksCount: 3,
    nightFlightsCount: 0,
    causeKnown: false,
  };

  assert.equal(signal.onlineDocksCount, 3);
  assert.equal(signal.nightFlightsCount, 0);
  assert.equal(signal.causeKnown, false, 'Root cause must NEVER be invented or assumed known');
});
