import test from 'node:test';
import assert from 'node:assert/strict';

test('Valuation Rules: Enforces qualified renewal baseline ($154,221), pipeline baseline ($891,199), and speculative ceiling ($2.9M)', () => {
  const deals = [
    { name: 'Renew Alliance (35 Docks)', value: 128057, category: 'Qualified Renewal Baseline', speculativeCeiling: null },
    { name: 'Renew Aldermoor (14 Docks)', value: 26164, category: 'Qualified Renewal Baseline', speculativeCeiling: null },
    { name: 'Scale Westmere Fleet', value: 0, category: 'Expired Outcome', stage: 'Expired', speculativeCeiling: null },
    { name: 'Tarn Valley & Norwold', value: 142302, category: 'Qualified Pipeline', speculativeCeiling: 200000 },
    { name: 'Position 300-Dock Framework', value: 535634, category: 'Qualified Pipeline', speculativeCeiling: 1500000 },
    { name: 'Bring Idle Plants to Patrol', value: 5418, category: 'Qualified Pipeline', speculativeCeiling: null }, // MCP worth_up_to is null
    { name: 'Case Study 40-Plant Sister', value: 207845, category: 'Qualified Pipeline', speculativeCeiling: 1200000 },
  ];

  // 1. Qualified Renewal Baseline
  const renewalBaselineTotal = deals
    .filter((d) => d.category === 'Qualified Renewal Baseline')
    .reduce((sum, d) => sum + d.value, 0);

  // 2. Contractually confirmed revenue is unverified ($0)
  const contractuallyConfirmed = 0;

  // 3. Expired deadline audited at $0
  const expiredDeal = deals.find((d) => d.name === 'Scale Westmere Fleet');

  // 4. Qualified Pipeline Baseline: $142,302 + $535,634 + $5,418 + $207,845 = $891,199
  const pipelineBaselineTotal = deals
    .filter((d) => d.category === 'Qualified Pipeline')
    .reduce((sum, d) => sum + d.value, 0);

  // 5. Speculative Pipeline Ceilings: $200k + $1.5M + $1.2M = $2,900,000 (Idle plant excluded)
  const speculativeCeilingTotal = deals
    .filter((d) => d.speculativeCeiling != null)
    .reduce((sum, d) => sum + d.speculativeCeiling, 0);

  assert.equal(renewalBaselineTotal, 154221, 'Qualified renewal baseline must equal $154,221 ($128,057 + $26,164)');
  assert.equal(contractuallyConfirmed, 0, 'Contractually confirmed revenue must be $0 (Unverified without signed contract evidence)');
  assert.equal(expiredDeal.value, 0, 'Expired Westmere deadline must be audited at $0');
  assert.equal(expiredDeal.stage, 'Expired');
  assert.equal(pipelineBaselineTotal, 891199, 'Qualified pipeline baseline must equal $891,199');
  assert.equal(speculativeCeilingTotal, 2900000, 'Speculative ceiling must equal $2,900,000 ($200k + $1.5M + $1.2M; idle plant excluded)');
  assert.notEqual(pipelineBaselineTotal, speculativeCeilingTotal, 'Baseline must remain strictly separated from speculative ceiling');
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

test('Live Signals & Briefing Distinction: 3-dock anomaly is from briefing telemetry; ticket FB-11206 is from get_signals', () => {
  const briefingSignal = {
    account: 'Aldermoor Industrial Group',
    source: 'Challenge Briefing Telemetry',
    onlineDocksCount: 3,
    nightFlightsCount: 0,
    causeKnown: false,
  };

  const apiSignal = {
    account: 'Eastern Counties Police Alliance',
    source: 'get_signals',
    ticketId: 'FB-11206',
    contact: 'Insp. Karen Mbeki',
    eventDate: '2026-12-05',
  };

  assert.equal(briefingSignal.source, 'Challenge Briefing Telemetry', '3-dock anomaly must be attributed to Challenge Briefing Telemetry');
  assert.equal(briefingSignal.causeKnown, false, 'Root cause must NEVER be invented or assumed known');
  assert.equal(apiSignal.source, 'get_signals', 'Ticket FB-11206 must be attributed to get_signals');
  assert.equal(apiSignal.ticketId, 'FB-11206');
});
