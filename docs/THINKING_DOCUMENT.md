# Questathon Live CRM — Final Thinking Document

**Project**: FlytBase Autonomous Live Customer Success Management (CSM) System  
**Author**: Project Owner & Senior Engineering Team  
**Scope**: Dual-Account Enterprise Operations (Eastern Counties Police Alliance & Aldermoor Industrial Group)  
**Format**: Ready for direct copy-paste into Google Docs.

---

## 1. Executive Summary & Purpose

The **FlytBase Autonomous Live CRM** is an evidence-traceable operational command center built specifically for enterprise Customer Success Managers (CSMs) overseeing autonomous drone deployments. 

Unlike traditional sales CRMs that aggregate speculative percentages, this system is an **operational command center** connected directly to live Model Context Protocol (MCP) data, telemetry audits, and challenge briefing facts. It provides executive management with a transparent, defensible, and uninflated view of account health, contract retention, operational roadblocks, and expansion headroom across two key enterprise accounts:
1. **Eastern Counties Police Alliance (Account A)** — Public Sector Constabulary Fleet.
2. **Aldermoor Industrial Group (Account B)** — Industrial Logistics & Critical Infrastructure Security.

---

## 2. Core Methodological Standards & Data Provenance

1. **Strict Separation of Baselines from Ceilings**:
   - **Contractually Confirmed Revenue**: Audited at **$0 (Unverified)** across both accounts because executed purchase orders or signed contract documents have not been established in MCP paperwork.
   - **Evidence-Backed Qualified Renewal Baseline**: Exactly **$154,221** ($128,057 for Eastern Counties + $26,164 ARR for Aldermoor), based on verified operational fleet deployments at the qualified stage.
   - **Qualified Pipeline Baseline**: Exactly **$891,199** ($142,302 Tarn Valley + $535,634 Tender for Account A; $5,418 Idle Plants + $207,845 Sister Company for Account B).
   - **Speculative Pipeline Ceilings**: Exactly **$2,900,000** ($200,000 Tarn Valley + $1,500,000 Framework Tender + $1,200,000 Sister Company). The idle-plant expansion is explicitly excluded from this total because its MCP `worth_up_to` field is `null`.
   - **Expired Deals Audited at $0**: The **Scale Westmere Fleet** expansion is audited strictly at **$0** because its autumn finance bid window closed before flight costs were cleared.

2. **Source Integrity & Provenance Classification**:
   - **API-Derived Records (`get_signals`)**: Ticket **FB-11206** (logged by Insp. Karen Mbeki in `A/requests.csv` for the 5 Dec public event) and Rhys Calder’s resignation email (17 Nov 2026, `A/emails/2026-11-17_rhys_moving.txt`) are verified via MCP.
   - **Challenge Briefing Telemetry**: The **Aldermoor 3-Dock night flight stoppage** originates from the **challenge briefing instructions**, not `get_signals`. The CRM preserves this distinction and marks the root cause as **strictly unknown**.
   - **Unmet Stakeholders**: **Owen Fitch** (Aldermoor IT Lead) is explicitly cataloged as **UNMET** because the player has never established contact with him.

---

## 3. Answering the Five Manager Questions

### Account A: Eastern Counties Police Alliance

1. **What is the book worth?**
   - **Qualified Renewal Baseline**: **$128,057** across 35 docks. Contractually confirmed revenue is unverified ($0) pending signed contract paperwork.
   - **Qualified Pipeline Baseline**: **$677,936** ($142,302 Tarn Valley & Norwold expansion + $535,634 300-Dock Framework Tender).
   - **Speculative Maximum Claims**: Tender framework ceiling of **$1,500,000** and Tarn Valley ceiling of **£200,000 / $200,000** (total $1.7M ceiling), labeled strictly as speculative claims rather than confirmed revenue.
   - **Expired Outcomes**: Scale Westmere Fleet is audited strictly at **$0** because the Metro Central finance bid window closed without a cost-per-flight benchmark against helicopters.
   - **Open Offers**: $55,000 (£45,000) operator training offer pitched to Insp. Karen Mbeki.

2. **Who holds the power?**
   - **Decision-Maker / Operational Commander**: Insp. Karen Mbeki (Westmere Drone Unit Inspector; commands active operational docks).
   - **Internal Champion (Leaving)**: Rhys Calder (Alliance Drone Programme Lead; ally, but departs in January 2027; single-threaded relationship).
   - **Procurement Gatekeeper**: Hannah Doyle (Alliance Procurement Lead; manages the 300-dock framework specification).
   - **Compliance / Veto Holder**: Fatima Osei (Tarn Valley Data Protection Officer; holds DPIA veto until data-flow documents are delivered).
   - **Economic / Finance Partner**: Ewan Brooks (Finance Partner, Metro Central; requires drone flight cost vs £1,500/hr helicopter benchmark).
   - **CFO Approval**: Each force CFO must individually approve call-offs (no pooled alliance budget).

3. **What do you do first?**
   - **Priority 1**: Deliver formal written response to Insp. Karen Mbeki committing operator training dates and assigning a named on-call escalation engineer before her 5 December public demonstration (Ticket FB-11206).
   - **Priority 2**: Dispatch the engineering data-flow pack to Fatima Osei (DPO) to clear the 4-month DPIA blocker and unblock Tarn Valley and Norwold ($142,302).
   - **Priority 3**: Submit a formal clarification request and costed operating model to Hannah Doyle before the 300-dock tender specification locks (8 moves remaining).

4. **What is about to go wrong?**
   - **Immediate Operational Threat**: Insp. Karen Mbeki's unanswered urgent request (Ticket FB-11206) ahead of the 5 December showcase event.
   - **Succession Risk**: Single-threaded champion Rhys Calder departs in January with no named successor.
   - **Tender Lockout**: Tender spec locks in 8 moves without a costed operating model, risking total disqualification.
   - **Compliance Impasse**: Tarn Valley support ticket asking for data-flow documents sits unassigned for 4 months.

5. **What do you still not know?**
   - Identity and timeline for Rhys Calder’s incoming successor.
   - Exact VIP flight profile and dock redundancy parameters for the 5 Dec public demonstration.
   - True operator overtime costs needed to compare drone flights against the £1,500/hr helicopter benchmark.
   - Whether individual constabularies will independently fund call-offs under the framework.

---

### Account B: Aldermoor Industrial Group

1. **What is the book worth?**
   - **Qualified Renewal Baseline**: **$26,164 ARR** across 14 docks. Contractually confirmed revenue is unverified ($0) pending signed contract paperwork.
   - **Qualified Pipeline Baseline**: **$213,263** ($5,418 Idle Plants regular patrol + $207,845 Sister Company case study).
   - **Speculative Maximum Claims**: Sister Company **€1,200,000 / $1,200,000** spreadsheet claim, labeled strictly as an unverified customer estimate.
   - **Null Ceiling Opportunity**: Idle Plants expansion has an MCP `worth_up_to` value of `null` and is explicitly excluded from speculative ceiling totals.
   - **Unidentified Deals**: Insurance discount deal is cataloged as **Never Heard Of / Unidentified ($0)** pending flight-log data for Julian Tate.

2. **Who holds the power?**
   - **Economic Decision-Maker / Gatekeeper**: Nadia Rahman (Group Finance Controller; holds contract renewal sign-off and requires measured ROI).
   - **Internal Champion**: Stefan Roy (Group Head of Security; enthusiastic champion, but his €1.2M savings spreadsheet is unverified by finance).
   - **Operational Site Lead**: Beatriz Alonso (Plant Manager, Plant 7; guarded relationship; prioritizes night-time perimeter security).
   - **Risk / Insurance Stakeholder**: Julian Tate (Insurance and Risk Manager; needs flight logs to negotiate premium reductions).
   - **Technical Infrastructure Approver**: **Owen Fitch** (IT Lead) — **UNMET** (cataloged as UNMET because the CSM has never engaged him).

3. **What do you do first?**
   - **Priority 1**: Initiate proactive telemetry diagnostics on the 3 silent perimeter docks and notify Stefan Roy and Beatriz Alonso.
   - **Priority 2**: Present a finance-grade ROI model to Nadia Rahman mapped directly to three upcoming guard contract renewals (renewing within 4 months).
   - **Priority 3**: Deliver a customized night-time priority proposal for Plant 7 to secure Beatriz Alonso’s operational endorsement.

4. **What is about to go wrong?**
   - **Silent Hardware / Software Failure**: Three perimeter docks stopped flying night patrols over the past 14 days without an active support ticket.
   - **Renewal Rejection**: Nadia Rahman is blocking renewal because drones added cost without reducing guard contracts.
   - **Severe Adoption Disconnect**: Customer claims 13 of 15 plants are flying, but flight logs prove only 4 plants fly regularly, 9 only log test flights, and Plant 15 has no dock.
   - **Plant Manager Resentment**: Plant managers resent paying corporate security budget allocations for idle equipment.

5. **What do you still not know?**
   - **Root Cause of 3-Dock Stoppage**: **Strictly unknown** (system prohibits speculation until telemetry diagnostics complete).
   - Why on-site security guards failed to report the 14-day night patrol stoppage.
   - Exact expiration dates and baseline spend for the three upcoming guard contracts.
   - Owen Fitch’s network, firewall, and IT infrastructure security requirements.

---

## 4. Prioritisation, Risk, and Provenance Architecture

- **Deterministic Prioritisation**: Priority ranks are calculated using hard deadlines (5 Dec event, tender spec lock), deal values, risk severity, and operational dependencies.
- **Qualitative Risk Evaluation**: Arbitrary percentage probabilities are rejected. The CRM uses qualitative tiers (`CRITICAL`, `HIGH`, `MEDIUM`) tied to verifiable operational triggers.
- **Evidence Registry**: Every data point links to an evidence card showing the tool name, record ID, and verbatim source excerpt.
- **Serverless MCP Architecture**: API calls strictly respect the 1-call-per-minute rate limit via file-locked cooldown buffers in `/tmp`, and `AQ_TOKEN` is strictly restricted to server runtimes.

---

## 5. Remaining Unverified Claims & Information Gaps

The following items are cataloged in the CRM as **UNVERIFIED** until explicit documentation is retrieved:
1. **Executed Contract POs**: True signed contract PDF/PO documents for the $128,057 and $26,164 renewal baselines.
2. **Root Cause of Aldermoor 3-Dock Stoppage**: Physical power, weather daemon, or firmware scheduler logs explaining the 14-day night flight halt.
3. **Stefan Roy's €1.2M ROI Claim**: Finance-approved ledger proving guard contracts were reduced.
4. **Owen Fitch IT Specifications**: Network bandwidth, video streaming encryption, and port forwarding rules.
5. **Rhys Calder Successor**: The identity and reporting structure of the incoming alliance drone lead.
6. **Individual Constabulary Call-Off Budgets**: Formal commitments from the 4 force CFOs to draw down from the 300-dock framework.
