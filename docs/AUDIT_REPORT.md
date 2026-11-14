# Questathon Live CRM — Comprehensive Technical & Functional Audit Report

**Date of Audit**: 14 November 2026  
**Auditor**: Senior Software Engineer, QA Engineer, Product Architect & Technical Auditor  
**Live Site Audited**: `https://questathon-live-crm-one.vercel.app/`  
**Repository Audited**: `https://github.com/ANSUJKMEHER/questathon-live-crm`  
**Target Standard**: 100% "STRONG" rating in every Questathon judging category  

---

## 1. Executive Summary

This comprehensive audit evaluated the live deployed CRM and underlying codebase against the official Questathon Customer Success simulation requirements. 

### Current Overall Assessment:
- **Architecture & Codebase**: Clean, modular Next.js 14 App Router foundation with TypeScript and Tailwind CSS. API routes and rate limiter are functioning.
- **Judging Readiness**: **MEDIUM-HIGH** currently; with specific identified gaps in deal reconciliation (Westmere $0 expired deadline, framework tender baseline valuation), stakeholder coverage (missing Owen Fitch as unmet IT lead; missing Norwold Chief Constable; missing deal-level power mapping), unknowns lifecycle tracking (`unresolved`/`investigating`/`resolved`), serverless `/tmp` persistence on Vercel, and mobile drawer navigation.
- **Strengths**: Zero token leakage; live JSON-RPC authentication against `https://questathon.aihackerscollective.com/api/public/mcp`; working rate limiter; strict segregation of verified revenue from customer verbal claims; live event detection for Ticket FB-11206 and Rhys Calder's resignation.
- **Action Plan**: Implement the 14 identified improvements immediately to elevate the project to **STRONG** in all five judging dimensions.

---

## 2. Existing Architecture

```
User Browser (Desktop / Tablet / Mobile)
       │
       ▼
Next.js 14 App Router UI (Client Components with Responsive AppShell)
       │
       ├── / (Overview Cockpit)
       ├── /eastern-counties (Account A 5-Question Answers)
       ├── /aldermoor (Account B 5-Question Answers)
       ├── /deals (Commercial Valuation Matrix)
       ├── /stakeholders (Power & Influence Architecture)
       ├── /action-plan (Execution Cadence)
       ├── /risks (Threat & Mitigation Register)
       ├── /unknowns (Discovery Register)
       ├── /live-events (Telemetry & Event Ingestion)
       └── /evidence (Provenance Ledger)
       │
       ▼ (Serverless API Boundary)
Next.js Server-Side API Routes (Node.js Runtime)
       │
       ├── /api/crm/data ──────► CrmAggregator ──► Valuation, PowerMap, Actions, Risks, Unknowns, Signals
       ├── /api/mcp/status ────► RateLimiter & StorageCache
       ├── /api/mcp/sync ──────► McpSyncer ──► McpClient (JSON-RPC 2.0)
       └── /api/mcp/write-note ─► McpClient.write_note
                                   │
                                   ▼ (Bearer AQ_TOKEN - Server Only)
                     Questathon MCP Public Endpoint
       (https://questathon.aihackerscollective.com/api/public/mcp)
```

---

## 3. Page-by-Page Audit

| Page / Route | Status | Visual Integrity | Data Accuracy | Key Finding / Gap |
|---|---|---|---|---|
| **Overview (`/`)** | Pass | Excellent | Good | Needs explicit reconciliation view between original task baseline and live MCP expansion claims. |
| **Eastern Counties (`/eastern-counties`)** | Pass | Excellent | Partial | Scale Westmere deal ($0) currently displays £250k pipeline without stating the deadline expired unfinished. Norwold Chief Constable missing from power roster. |
| **Aldermoor (`/aldermoor`)** | Pass | Excellent | Partial | Missing Owen Fitch (Group IT infrastructure lead, player has never met him). Bring idle plants ($5,418) deal missing. |
| **Deals & Valuation (`/deals`)** | Pass | Good | Partial | Currency displayed as GBP (£) only; original task specifications denote USD ($). Needs dual-currency / exact task reconciliation table. |
| **Stakeholders (`/stakeholders`)** | Pass | Excellent | Partial | Displays account-level stakeholder cards, but lacks deal-by-deal power mapping (Who decides, pays, uses, blocks, champions for each deal). |
| **Action Plan (`/action-plan`)** | Pass | Excellent | Excellent | Rank 1 actions properly address Ticket FB-11206 and Aldermoor 3-dock anomaly. Needs explicit link to deal IDs. |
| **Risk Register (`/risks`)** | Pass | Excellent | Excellent | Qualitative probability implemented with zero fabricated percentages. Accurately flags dock anomaly and Rhys Calder departure. |
| **Unknowns Register (`/unknowns`)** | Pass | Good | Partial | Gaps missing dynamic status lifecycle (`UNRESOLVED`, `INVESTIGATING`, `RESOLVED`). |
| **Live Signals (`/live-events`)** | Pass | Excellent | Excellent | Authentically captures Ticket FB-11206, Rhys Calder departure email, and 3-dock anomaly. |
| **Evidence & Sources (`/evidence`)** | Pass | Good | Minor | Modal claimed "cryptographic verification" without actual cryptographic hash checks; must be reworded to "JSON-RPC audit ledger verification". |

---

## 4. Five-Question Compliance Matrix

| Question | Requirement | Current Status | Required Remediation | Target Score |
|---|---|---|---|---|
| **Q1: What is the book worth?** | Separate every deal; show evidence-backed value; customer claims separated from committed; no grand totals. | Partial | Add explicit deal-by-deal reconciliation: Westmere expired ($0), Alliance renewal ($128,057), Tarn Valley/Norwold ($142,302), Framework ($535,634); Aldermoor renewal ($26,164), Idle plants ($5,418), Sister company ($207,845). | **STRONG** |
| **Q2: Who holds the power?** | For every deal: Who decides, pays, uses, blocks, champions, relationship status, needs. | Partial | Build explicit Deal Power Matrix. Add Owen Fitch (Aldermoor IT - Unmet) and Norwold Chief Constable. | **STRONG** |
| **Q3: What do you do first?** | Top 3 actions; priority, owner, date, related deal, reason, evidence. | Pass | Enhance with explicit ranking scorecards explaining exact urgency weights. | **STRONG** |
| **Q4: What is about to go wrong?** | Deadlines, departing champions, missing approvals, usage drops, unreplied commitments. | Pass | Add visual escalation indicators for Ticket FB-11206 and 14-day night flight drops. | **STRONG** |
| **Q5: What do you still not know?** | Gaps, why it matters, who answers, next action, status (unresolved / investigating / resolved). | Partial | Add interactive status lifecycle badges (`UNRESOLVED`, `INVESTIGATING`, `RESOLVED`) and next action suggestion. | **STRONG** |

---

## 5. MCP Integration Audit

- **Endpoint**: `https://questathon.aihackerscollective.com/api/public/mcp`
- **Protocol**: JSON-RPC 2.0 via HTTP POST. Verified working with live token on `whoami`, `get_my_accounts`, `get_signals`.
- **Token Security**: Server-only environment variable (`AQ_TOKEN`). Verified zero exposure in frontend JavaScript or git commits.
- **Rate-Limiter**: Enforces 61-second cooldown.
- **Serverless Persistence Gap (Issue SEC-01)**: On Vercel, writing to `process.cwd()/data` fails on read-only file systems. Must use `os.tmpdir()` (`/tmp`) fallback so rate-limit and cache survive within serverless execution cycles.

---

## 6. Detailed Findings & Issue Log

### Issue ID: AUDIT-01
- **Severity**: **Critical**
- **Affected File**: `src/lib/business/valuation.ts`, `src/app/deals/page.tsx`
- **Explanation**: The original Questathon challenge task outcomes specify exact baseline valuations and outcomes:
  - Eastern Counties: Scale Westmere Fleet deadline passed unfinished and is worth **$0**. Listing it as £250,000 active pipeline violates Question 1 without explicitly highlighting its expired status.
  - Aldermoor: "Bring idle plants into regular patrol" ($5,418) is missing.
  - "Protect and extend insurance discount" was never discovered / "Never heard of" and must be cataloged as unknown.
- **Recommended Fix**: Add a dedicated Deal Reconciliation Matrix displaying original task baseline, live MCP limits, deal stages, and explicit notes on expired deals.

### Issue ID: AUDIT-02
- **Severity**: **High**
- **Affected File**: `src/lib/business/power-map.ts`, `src/app/stakeholders/page.tsx`
- **Explanation**: 
  1. Owen Fitch (Group IT Infrastructure Lead) is missing. The challenge specification explicitly states the player has **never met him**.
  2. Norwold Chief Constable is missing from the Eastern Counties power roster.
  3. Question 2 requires deal-level power mapping (Who decides, pays, uses, blocks, champions for EACH deal).
- **Recommended Fix**: Add Owen Fitch marked as `RELATIONSHIP: UNMET` and `AUTHORITY: INFERRED`. Add Norwold Chief Constable. Build a Deal-by-Deal Power Matrix table.

### Issue ID: AUDIT-03
- **Severity**: **High**
- **Affected File**: `src/lib/business/unknowns.ts`, `src/app/unknowns/page.tsx`, `src/components/questions/UnknownsSection.tsx`
- **Explanation**: Question 5 requires tracking whether each unknown is `unresolved`, `investigating`, or `resolved`, and proposing a concrete next action. Currently, the interface displays static text without status lifecycle controls.
- **Recommended Fix**: Add `status: 'UNRESOLVED' | 'INVESTIGATING' | 'RESOLVED'` and `suggestedAction` to `UnknownItem`, with interactive filtering and status badges.

### Issue ID: AUDIT-04
- **Severity**: **High**
- **Affected File**: `src/lib/mcp/rate-limiter.ts`, `src/lib/storage/cache.ts`
- **Explanation**: In Vercel's serverless AWS Lambda environment, the root directory is read-only. Attempting to write to `process.cwd()/data/` fails, preventing file-based persistence across serverless invocations.
- **Recommended Fix**: Detect `process.env.VERCEL` and use `path.join(os.tmpdir(), 'questathon-crm')` for serverless storage fallback.

### Issue ID: AUDIT-05
- **Severity**: **Medium**
- **Affected File**: `src/components/shared/SourceModal.tsx`
- **Explanation**: UI states "Audit trail cryptographically linked to session". The prompt notes: "A source reference is not automatically cryptographic verification. Do not claim cryptographic verification unless the application implements actual cryptographic integrity checks."
- **Recommended Fix**: Rephrase to "Traceable against authenticated MCP JSON-RPC audit ledger."

### Issue ID: AUDIT-06
- **Severity**: **Medium**
- **Affected File**: `src/components/layout/Sidebar.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/AppShell.tsx`
- **Explanation**: The sidebar is fixed at 256px (`w-64`). On tablet and mobile viewports (< 768px), there is no hamburger toggle, creating layout overflow.
- **Recommended Fix**: Add a mobile responsive drawer with slide-out navigation and hamburger toggle in the header.

---

## 7. Implementation Plan for STRONG Rating

1. **Reconciled Financial Engine**: Implement full deal matrix incorporating both original task outcomes ($128k, $142k, $0 expired, $535k for ECPA; $26k, $5.4k, $207k for Aldermoor) alongside live MCP expansion claims.
2. **Deal-Level Power Matrix**: Add comprehensive deal stakeholder mapping to answer all 7 sub-questions per deal.
3. **Add Missing Stakeholders**: Owen Fitch (`UNMET`), Norwold Chief Constable (`CAUTIOUS`).
4. **Lifecycle Unknowns Register**: Add `status` tracking and `suggestedAction` to Question 5.
5. **Vercel Serverless `/tmp` Persistence**: Enable persistent caching and rate-limiting on serverless deployments.
6. **Mobile Responsive Navigation**: Add hamburger drawer menu.
7. **Refine Terminology**: Remove inaccurate cryptographic claims.
8. **Automated Verification**: Update and execute unit test suite; run production build; push to GitHub.
