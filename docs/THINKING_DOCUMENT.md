# Questathon Live CRM — Thinking Document

**Project**: FlytBase Autonomous Live Customer Success Management (CSM) System  
**Author**: Senior Engineering Team  
**Scope**: Dual-Account Enterprise Operations (Eastern Counties Police Alliance & Aldermoor Industrial Group)  
**Target Format**: Formatted for direct copy-paste into Google Docs.

---

### 1. What the CRM Does
The FlytBase Live CRM is a real-time, evidence-traceable operational command center engineered specifically for enterprise Customer Success Managers managing autonomous drone fleets. Unlike conventional sales CRMs that track generic pipeline probabilities, this system is an **operational command center** that connects directly to real-time telemetry, paperwork records, and stakeholder commitments via the Model Context Protocol (MCP). It synthesizes complex drone fleet operations into actionable executive decisions.

### 2. Who It Is For
- **Customer Success Managers & Directors**: Who must walk into Monday morning executive reviews with zero ambiguity regarding account health, contract retention, and expansion viability.
- **Solutions & Field Operations Engineers**: Who require immediate visibility into hardware/software telemetry anomalies (e.g. night patrol drop-offs) and upcoming mission readiness milestones (e.g. public demonstrations).
- **Executive Leadership**: Who require an audited, uninflated view of true contractually committed ARR versus speculative customer pipeline claims.

### 3. How It Answers the Five Manager Questions
For each of the two accounts, the system independently computes and displays:

1. **What is the book worth?**  
   Strict segregation of verified committed revenue ($128,057 for Eastern Counties under the qualified 35-dock alliance renewal; $26,164 ARR for Aldermoor under the qualified 14-dock contract) from uncommitted customer champion verbal claims (Tarn Valley/Norwold $142,302, 300-dock framework tender $535,634 qualified baseline up to $1.5M ceiling for Eastern Counties; Sister company $207,845 qualified baseline up to €1.2M spreadsheet ceiling for Aldermoor). Crucially, it audits the **Scale Westmere Fleet** expansion at **$0** because its finance bid deadline passed unfinished, and catalogs the Aldermoor insurance discount as **Unidentified ($0)**. It deliberately refrains from presenting artificial grand totals.
2. **Who holds the power?**  
   Maps organizational hierarchies into verified decision-makers, economic payers, operational owners, and procurement authorities. Answers the 7 key questions for every deal: Who decides, pays, uses, blocks, champions, relationship status, and needs. Accurately highlights **Owen Fitch** (Aldermoor IT Lead) as an **UNMET** relationship, **Insp. Karen Mbeki** as the operational commander for Westmere, **Hannah Doyle** as the procurement lead, and **Nadia Rahman** as the decisive economic gatekeeper.
3. **What do you do first?**  
   Dynamically ranks the top three actionable priorities per account based on deadline urgency, evidence-backed deal values, risk severity, and blocker criticality. For Eastern Counties, rank #1 is delivering written confirmation on training and dock failure escalation to Insp. Karen Mbeki before 5 Dec (Ticket FB-11206). For Aldermoor, rank #1 is initiating proactive telemetry diagnostics on the 3 silent perimeter docks within 24 hours.
4. **What is about to go wrong?**  
   A threat register mapping critical triggers, approaching deadlines, and operational failures. Highlights the silent 14-day night flight stoppage across Docks 2, 4, and 5 at Aldermoor, Nadia Rahman's contract renewal blocker due to unverified ROI claims, the 8 moves remaining before the 300-dock framework locks without a costed operating model, and the single-threaded champion departure of Rhys Calder in January.
5. **What do you still not know?**  
   An explicit blindspot matrix that isolates missing variables (e.g. exact root cause of dock flight stoppage, identity of Rhys Calder's replacement, Owen Fitch's network requirements, and police capital budget call-off approval) and tracks them through an active lifecycle (`UNRESOLVED`, `INVESTIGATING`, `RESOLVED`) with concrete suggested next actions.

### 4. Prioritisation and Risk Rules
- **Deadline-First Weighting**: Actions tied to fixed calendar events (e.g. 5 December public demonstration, Ticket FB-11206) supersede open-ended administrative tasks.
- **Qualitative Risk Evaluation**: The CRM rejects fabricated percentage probabilities. Instead, where empirical incident frequencies do not exist, it applies qualitative classifications (`CRITICAL`, `HIGH`, `MEDIUM`) accompanied by concrete trigger events and business rationale.
- **Unassigned & Unconfirmed Transparency**: Tasks or deadlines lacking explicit owner confirmation are visibly marked as `Unassigned` or `Date to confirm`.

### 5. Evidence Traceability
Every factual figure, date, and person is tied to an indexed record in the **Evidence & Sources Registry**. Users can click any verification badge or metric to inspect the original raw excerpt, source tool (`get_all_paperwork`, `get_signals`, `get_my_accounts`), record ID, and retrieval timestamp.

### 6. Live Signal Handling
The system continuously ingests telemetry and stakeholder events via `get_signals`:
- **Aldermoor 3-Dock Anomaly**: Flags that 3 online docks ceased night flights for 14 days without an active support ticket; prescribes proactive diagnostic investigation while explicitly noting that the root cause is **strictly unknown**.
- **Eastern Counties Commitments**: Tracks Ticket FB-11206 and marks it overdue until formal written dispatch is logged.
- **Successor Vacancy**: Tracks Rhys Calder's January departure as an active operational transition risk.

### 7. What It Does Not Do Yet (Known Limitations)
- Does not automatically dispatch direct external emails on behalf of FlytBase.
- Does not modify simulation game outcomes beyond documented MCP capabilities.
- Relies on manual triggering or timed cron polling to respect the strict 1-call-per-minute rate limit.

### 8. How AI Was Used
AI was utilized as a senior full-stack development partner across the software engineering lifecycle: designing TypeScript data contracts, structuring modular App Router architectures, enforcing strict JSON-RPC MCP protocols with time-buffered rate limiters, authoring deterministic business logic, and compiling automated unit test suites.
