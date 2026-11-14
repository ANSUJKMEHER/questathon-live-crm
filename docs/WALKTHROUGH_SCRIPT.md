# FlytBase Autonomous Live CRM — 3-Minute Video Walkthrough Script

**Format**: Screen recording with voiceover  
**Target Duration**: Exactly 3 minutes (180 seconds)  
**Presenter**: Project Owner / Lead CSM Engineer  

---

### [0:00–0:25] Introduction & Cockpit Overview (25s)

"Hi, this is my FlytBase Autonomous Live CRM, built for the Questathon challenge.

The application brings together account information, opportunities, stakeholders, risks, action plans, unknowns, and live signals for two customers: Eastern Counties Police Alliance and Aldermoor Industrial Group.

Across the entire book, the CRM establishes an **evidence-backed qualified renewal baseline of $154,221** and a **qualified pipeline baseline of $891,199**, while keeping a **$2.9 million speculative ceiling** strictly separated. Contractually confirmed revenue is currently unverified because signed contracts have not been established.

The main goal is turning scattered customer information into evidence-backed decisions, rather than simply displaying CRM data."

---

### [0:25–1:20] Eastern Counties Police Alliance (55s)

"Let's start with Eastern Counties.

**First, what is the book worth?**
Eastern Counties has an evidence-backed qualified renewal baseline of **$128,057** across 35 docks. 
Its qualified pipeline baseline is **$677,936**, comprising the Tarn Valley expansion at $142,302 and the 300-dock framework tender at $535,634. 
Crucially, the **Scale Westmere Fleet** deal is audited strictly at **$0** because its autumn finance bid deadline passed unfinished. 
The tender has a speculative ceiling of $1.5 million and Tarn Valley has a £200,000 ceiling, but I keep potential ceilings strictly separate from qualified baselines.

**Second, who holds power?**
Rhys Calder is the alliance programme lead and our sole historic relationship, but he departs in January 2027. Insp. Karen Mbeki commands the Westmere drone unit and has raised an urgent operational request. Hannah Doyle leads alliance procurement, Fatima Osei is the Tarn Valley DPO holding compliance sign-off, and Ewan Brooks controls Metro Central finance. These roles are kept separate because a user, champion, procurement lead, and payer are not the same person.

**Third, what do we do first?**
Priority one is delivering a written response to Karen Mbeki committing operator training dates and an emergency escalation engineer before her December 5 public event. Priority two is dispatching data-flow documents to Fatima Osei to unblock Tarn Valley's DPIA. Priority three is submitting a costed operating model to Hannah Doyle before the tender specification locks.

**Fourth, what is about to go wrong?**
Immediate risks are Karen's unanswered request for December 5, the single-threaded departure of Rhys Calder without a named successor, and the tender locking in eight moves without an operating model.

**Fifth, what do we still not know?**
We do not know Rhys's successor, whether individual forces will fund call-offs under the framework, or true operator overtime costs."

---

### [1:20–2:05] Aldermoor Industrial Group (45s)

"Now let's examine Aldermoor Industrial Group.

**First, what is the book worth?**
Aldermoor's qualified renewal baseline is **$26,164 ARR** across 14 docks. 
Its qualified pipeline baseline is **$213,263**, comprising the $5,418 idle-plants opportunity and the $207,845 sister-company case study. 
The insurance discount deal is cataloged as **Unidentified ($0)** because insurer savings are not yet quantified. 
The claimed €1.2 million return from the sister company is an unverified spreadsheet claim, so I label it as a speculative maximum claim. Furthermore, the idle-plant opportunity has a null ceiling in MCP and is excluded from ceiling totals.

**Second, who holds power?**
Stefan Roy is group head of security and our internal champion. Beatriz Alonso manages Plant 7, Nadia Rahman is the finance controller and renewal gatekeeper, and Julian Tate handles insurance. Crucially, **Owen Fitch** is identified as our IT infrastructure contact, but is cataloged as **UNMET** because the CSM has never engaged him.

**Third, what do we do first?**
First, initiate proactive telemetry diagnostics on the three silent perimeter docks. Second, present a finance-grade ROI model to Nadia Rahman mapped to three upcoming guard contract renewals. Third, deliver a night-time priority proposal for Plant 7.

**Fourth, what is about to go wrong?**
The customer reports 14 installed docks and 13 flying, but flight-log evidence reveals only four plants fly regularly while nine only log test flights. Even more critically, three perimeter docks stopped flying night patrols over the past 14 days without any customer ticket.

**Fifth, what do we still not know?**
The root cause of the three-dock stoppage is **strictly unknown**—we do not guess. We also lack finance-verified savings and Owen Fitch's network requirements."

---

### [2:05–2:35] Evidence Provenance & Live Signal Distinction (30s)

"An essential capability of this CRM is provenance and source auditability.

Every figure, date, and person is tied to an indexed record in the Evidence Registry. 

For example, Karen's urgent request is verified from the live API feed via ticket **FB-11206** in `get_signals`, and Rhys's departure risk is verified from his November 17 email.

However, the **three-dock telemetry anomaly is different**: it originates from the **challenge briefing telemetry**, not from the `get_signals` API tool. I explicitly preserve that distinction rather than falsely presenting every data point as API-derived."

---

### [2:35–2:50] Actions & Safe Write-Back (15s)

"The action plan translates risks and unknowns into accountable tasks with priority ranks, owners, target dates, and linked opportunities. Where an owner or due date is inferred, it is visibly marked as a recommendation rather than an established fact.

[Demonstrate write-back: Click 'Log Note', enter an operational check-in note, submit, and display confirmed MCP integration.]"

---

### [2:50–3:00] Closing (10s)

"In summary, this CRM answers the five executive questions with rigorous evidence: what the book is worth, who holds power, what to do first, what could go wrong, and what remains unknown.

It turns raw customer signals into defensible, audit-proof Customer Success strategy. Thank you."
