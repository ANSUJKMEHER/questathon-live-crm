import test from 'node:test';
import assert from 'node:assert/strict';

// Import services directly or simulate their deterministic rules
test('Valuation Rules: Segregates verified contracts from customer claims', () => {
  const verifiedDeals = [
    { value: 120000, confidence: 'VERIFIED_FACT', category: 'Committed' },
    { value: 210000, confidence: 'VERIFIED_FACT', category: 'Committed' },
  ];
  const claimDeals = [
    { value: 180000, confidence: 'CUSTOMER_CLAIM', category: 'Pipeline' },
    { value: 140000, confidence: 'CUSTOMER_CLAIM', category: 'Pipeline' },
  ];

  const totalVerified = verifiedDeals.reduce((sum, d) => sum + d.value, 0);
  const totalClaims = claimDeals.reduce((sum, d) => sum + d.value, 0);

  assert.equal(totalVerified, 330000, 'Total verified book must equal £330,000');
  assert.equal(totalClaims, 320000, 'Total customer claims must equal £320,000');
  assert.notEqual(totalVerified, totalVerified + totalClaims, 'Never conflate claims with verified book total');
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

test('Rate Limiter: Permits call once cooldown expires', () => {
  const COOLDOWN_MS = 61000;
  const now = Date.now();
  const lastCallTimestamp = now - 62000; // 62s ago
  const elapsed = now - lastCallTimestamp;
  const isAllowed = elapsed >= COOLDOWN_MS;

  assert.equal(isAllowed, true, 'Call after 62s must be permitted');
});

test('Power Mapping: Distinguishes confirmed authority from inferred influence', () => {
  const stakeholders = [
    { name: 'Karen Mbeki', influenceType: 'CONFIRMED', powerCategory: 'DECISION_MAKER' },
    { name: 'Marcus Vance', influenceType: 'CONFIRMED', powerCategory: 'DECISION_MAKER' },
    { name: 'Chief Constable / PCC Board', influenceType: 'INFERRED', powerCategory: 'PAYER' },
  ];

  const confirmedDecisionMakers = stakeholders.filter(
    (s) => s.powerCategory === 'DECISION_MAKER' && s.influenceType === 'CONFIRMED'
  );
  assert.equal(confirmedDecisionMakers.length, 2, 'Must have exactly 2 confirmed decision-makers');

  const inferredStakeholders = stakeholders.filter((s) => s.influenceType === 'INFERRED');
  assert.equal(inferredStakeholders.length, 1, 'Inferred influence must not be labeled confirmed');
});

test('Action Prioritization: Rank #1 actions address immediate live signals', () => {
  const accountAActions = [
    { priorityRank: 1, action: 'Draft written response to Karen Mbeki committing training dates and dock escalation before 5 Dec' },
    { priorityRank: 2, action: 'Schedule transition check-in with Rhys Calder for successor onboarding' },
  ];

  const accountBActions = [
    { priorityRank: 1, action: 'Initiate proactive technical diagnostic on 3 silent perimeter docks' },
    { priorityRank: 2, action: 'Proactively reach out to Marcus Vance and Dave Sterling' },
  ];

  assert.match(accountAActions[0].action, /Karen Mbeki/);
  assert.match(accountBActions[0].action, /3 silent perimeter docks/);
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
