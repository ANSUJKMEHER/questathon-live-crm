# Questathon Live CRM — Thinking Document

**Project**: FlytBase Autonomous Live Customer Success Management (CSM) System  
**Author**: Senior Engineering Team  
**Scope**: Dual-Account Enterprise Operations (Eastern Counties Police Alliance & Aldermoor Industrial Group)  
**Target Format**: Formatted for direct copy-paste into Google Docs.

---

### 1. What the CRM Does
The FlytBase Live CRM is a real-time, evidence-traceable operational dashboard engineered specifically for enterprise Customer Success Managers managing autonomous drone deployments. Unlike conventional sales CRMs that track generic pipeline probabilities, this system is an **operational command center** that connects directly to real-time telemetry, paperwork records, and stakeholder commitments via the Model Context Protocol (MCP). It synthesizes complex drone fleet operations into actionable executive decisions.

### 2. Who It Is For
- **Customer Success Managers & Directors**: Who must walk into Monday morning executive reviews with zero ambiguity regarding account health, contract retention, and expansion viability.
- **Solutions & Field Operations Engineers**: Who require immediate visibility into hardware/software telemetry anomalies (e.g. night patrol drop-offs) and upcoming mission readiness milestones (e.g. public demonstrations).
- **Executive Leadership**: Who require an audited, uninflated view of true contractually committed ARR versus speculative customer pipeline claims.

### 3. How It Answers the Five Manager Questions
For each of the two accounts, the system independently computes and displays:
1. **What is the book worth?**  
   Strict segregation of verified committed revenue (£120k for Eastern Counties under PO-2024-ECPA-09; £210k ARR for Aldermoor under CTR-AIG-2023-F2) from uncommitted customer champion verbal claims (£180k Phase 2 expansion for Eastern Counties; £140k Hangar expansion for Aldermoor) and unquoted scoping estimates (£15k operator training). It deliberately refrains from presenting artificial grand totals that mislead management.
2. **Who holds the power?**  
   Maps organizational hierarchies into verified decision-makers, economic payers, operational owners, and procurement authorities. Crucially, it distinguishes **confirmed authority** (e.g. Karen Mbeki's event sign-off power; Marcus Vance's budgetary authority) from **inferred influence** (e.g. PCC Finance Board oversight), preventing reliance on job titles alone.
3. **What do you do first?**  
   Dynamically ranks the top three actionable priorities per account based on deadline urgency, evidence-backed deal values, risk severity, and blocker criticality. For Eastern Counties, rank #1 is delivering written confirmation on training and dock failure escalation to Karen Mbeki before 5 Dec. For Aldermoor, rank #1 is initiating proactive telemetry diagnostics on the 3 silent perimeter docks within 24 hours.
4. **What is about to go wrong?**  
   A threat register mapping critical triggers, approaching deadlines, and operational failures. Highlights the silent 14-day night flight stoppage across Docks 2, 4, and 5 at Aldermoor, and the critical single-threaded relationship risk at Eastern Counties where champion Rhys Calder leaves in January with no named successor.
5. **What do you still not know?**  
   An explicit blindspot matrix that isolates missing variables (e.g. exact root cause of dock flight stoppage, identity of Rhys Calder's replacement, formal police capital budget approval status) and assigns discovery mechanisms.

### 4. Prioritisation and Risk Rules
- **Deadline-First Weighting**: Actions tied to fixed calendar events (e.g. 5 December public demonstration) supersede open-ended administrative tasks.
- **Qualitative Risk Evaluation**: The CRM rejects fabricated percentage probabilities (e.g. "73% chance of churn"). Instead, where empirical incident frequencies do not exist, it applies qualitative classifications (`CRITICAL`, `HIGH`, `MEDIUM`) accompanied by concrete trigger events and business rationale.
- **Unassigned & Unconfirmed Transparency**: Tasks or deadlines lacking explicit owner confirmation are visibly marked as `Unassigned` or `Date to confirm`.

### 5. Evidence Traceability
Every factual figure, date, and person is tied to a cryptographically indexed record in the **Evidence & Sources Registry**. Users can click any verification badge or metric to inspect the original raw excerpt, source tool (`get_all_paperwork`, `get_signals`, `get_my_accounts`), record ID, and retrieval timestamp.

### 6. Live Signal Handling
The system continuously ingests telemetry and stakeholder events via `get_signals`:
- **Aldermoor 3-Dock Anomaly**: Flags that 3 online docks ceased night flights for 14 days without an active support ticket; prescribes proactive diagnostic investigation while explicitly noting that the root cause is **strictly unknown**.
- **Eastern Counties Commitments**: Tracks Karen Mbeki's 2 required written deliverables and marks them overdue until formal written dispatch is logged.
- **Successor Vacancy**: Tracks Rhys Calder's January departure as an active operational transition risk.

### 7. What It Does Not Do Yet (Known Limitations)
- Does not automatically dispatch direct emails or make live contractual amendments on behalf of FlytBase.
- Does not modify simulation game outcomes beyond documented MCP capabilities.
- Relies on manual triggering or timed cron polling to respect the strict 1-call-per-minute rate limit.

### 8. How AI Was Used
AI was utilized as a senior full-stack development partner across the software engineering lifecycle: designing TypeScript data contracts, structuring modular App Router architectures, enforcing strict JSON-RPC MCP protocols with time-buffered rate limiters, authoring deterministic business logic, and compiling automated unit test suites.
