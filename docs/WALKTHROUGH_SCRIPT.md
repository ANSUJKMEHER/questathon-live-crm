# Questathon Live CRM — 3-Minute Video Walkthrough Script

**Format**: Screen recording with voiceover  
**Target Duration**: Exactly 3 minutes (180 seconds)  
**Presenter**: Project Owner / Lead CSM Engineer  

---

### [0:00 - 0:30] Introduction & Executive Overview (30s)
**Action**: Start on the **Overview** dashboard (`/`). Move cursor over the KPI cards and Dual-Account Health summary.  
**Voiceover**:  
> "Welcome to our live Customer Success Management CRM, engineered for FlytBase's autonomous drone deployments for the Questathon challenge.
> This CRM serves as the single source of truth for our two key accounts: **Eastern Counties Police Alliance** and **Aldermoor Industrial Group**. 
> As you can see on the Command Cockpit, the dashboard immediately separates our £330,000 in verified committed contracts from £320,000 in uncommitted customer expansion claims. 
> Up in the header, our real-time rate limiter ensures we strictly comply with the one-call-per-minute MCP server quota with a live cooldown indicator."

---

### [0:30 - 1:15] Answering the 5 Questions: Account A & Evidence Trace (45s)
**Action**: Click into **Eastern Counties** (`/eastern-counties`). Scroll smoothly past Question 1 to 5. Click on the `£120,000` badge to trigger the **Evidence Provenance Trace** modal.  
**Voiceover**:  
> "Let's examine Account A: Eastern Counties Police Alliance. The CRM answers all five managerial questions:
> First, **What is the book worth?** Here is £120,000 in verified revenue. If I click this badge, the Evidence Modal displays the exact executed purchase order PO-2024-ECPA-09 pulled directly from the MCP server. We deliberately do not lump Rhys Calder's £180,000 Phase 2 verbal aspiration into our verified book.
> Second, **Who holds the power?** Our power map proves Karen Mbeki is the confirmed decision-maker with executive sign-off authority, while Chief Constable holds payer approval.
> Third, **What do you do first?** Priority Rank #1 is drafting our written commitment to Karen Mbeki before the 5 December public demonstration.
> Fourth, **What is about to go wrong?** We have a critical single-threaded relationship risk: Rhys Calder departs in January with no named successor.
> Fifth, **What do you still not know?** We explicitly flag the unknown identity of his replacement and the unconfirmed PCC budget."

---

### [1:15 - 1:55] Answering the 5 Questions: Account B & Live Signal Telemetry (40s)
**Action**: Navigate to **Aldermoor** (`/aldermoor`). Focus on Question 4 and the Live Signals banner.  
**Voiceover**:  
> "Now let's switch to Account B: Aldermoor Industrial Group. 
> Notice the account health is flagged as **CRITICAL**. 
> Through our live `get_signals` feed, the CRM detected that three perimeter docks that normally fly nightly have ceased flying over the last 14 days, even though all three remain online and no customer ticket was raised.
> Following our strict zero-fabrication rule, our risk and unknowns registers state unequivocally that the root cause is **currently unknown**—we do not guess. 
> Our top priority action is an immediate proactive diagnostic and a supportive check-in with Group Security Director Marcus Vance."

---

### [1:55 - 2:25] Safe Write-Back (`write_note`) & Live Ingestion (30s)
**Action**: Click the **Log Verified Note** button in the header. Show the modal with validation, type in a check-in note title, and click **Commit Note**. Show the confirmation notification.  
**Voiceover**:  
> "When our team takes action, we execute a verified write-back using the MCP `write_note` tool.
> The CRM verifies existing records to prevent duplicate submissions, validates the account schema, and commits the note directly to the server. 
> Once confirmed, the note is stamped and permanently integrated into our CRM audit trail."

---

### [2:25 - 3:00] Architecture & Secure MCP Design (35s)
**Action**: Open VS Code / GitHub briefly showing the modular project structure (`src/lib/mcp/client.ts`, `rate-limiter.ts`, `.gitignore`), highlighting the clean abstraction. Return to the dashboard.  
**Voiceover**:  
> "Under the hood, the application is built with Next.js App Router, TypeScript, and Tailwind CSS.
> In our server-side MCP client, the `AQ_TOKEN` is strictly confined to server runtime environment variables—it never touches client-side JavaScript, logs, or Git commits. 
> Our rate limiter enforces a 61-second cooldown buffer with persistent state, preventing race conditions.
> This CRM gives executives full confidence, verifiable evidence, and zero fluff. Ready for deployment. Thank you."
