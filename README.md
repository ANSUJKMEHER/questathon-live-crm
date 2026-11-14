# FlytBase Autonomous Live CRM (Questathon Challenge)

A production-grade, evidence-backed, real-time Customer Success Management (CSM) live CRM dashboard engineered for the **Questathon Autonomous Live CRM Challenge**. Built for executive review to answer the five fundamental managerial questions for **Eastern Counties Police Alliance** and **Aldermoor Industrial Group**.

---

## 🌟 Executive Summary

This CRM serves as the single source of truth for Customer Success Managers managing enterprise autonomous drone fleets. It connects directly to the Questathon Model Context Protocol (MCP) server, enforces strict rate-limiting, and guarantees zero data fabrication through an immutable Evidence & Provenance Registry.

### The Five Managerial Questions Answered for Both Accounts

| # | Question | Eastern Counties Police Alliance (Account A) | Aldermoor Industrial Group (Account B) |
|---|---|---|---|
| **Q1** | **What is the book worth?** | **£120,000 Verified Committed** (PO-2024-ECPA-09). Pipeline: £180,000 (Customer claim) + £15,000 (Unverified estimate). | **£210,000 ARR Verified Committed** (CTR-AIG-2023-F2, 5 Docks). Pipeline: £140,000 (Hangar expansion claim). |
| **Q2** | **Who holds the power?** | **Karen Mbeki** (Confirmed Decision-Maker & Procurement). Rhys Calder (Departing single-threaded champion). PCC Board (Payer). | **Marcus Vance** (Confirmed Economic Buyer & Security Dir). Dave Sterling (Ops Owner). Elena Rostova (Procurement). |
| **Q3** | **What do you do first?** | **1.** Written confirmation to Karen Mbeki on training dates & dock escalation before 5 Dec event. **2.** Transition check-in with Rhys Calder for successor. | **1.** Proactive telemetry diagnosis on 3 silent docks (Docks 2, 4, 5). **2.** Proactive check-in with Marcus Vance. |
| **Q4** | **What is about to go wrong?** | **Critical:** 5 Dec public event without confirmed dock escalation coverage. **Critical:** Single-threaded Rhys Calder leaves Jan 2025 with no successor. | **Critical:** 3 perimeter docks stopped night flights for 14 days without ticket; perimeter breach & £210k contract loss risk. |
| **Q5** | **What do you still not know?** | Identity of Rhys Calder's successor; specific VIP flight parameters for 5 Dec; formal PCC FY25 capital budget allocation status. | Root cause of 3-dock flight stoppage (strictly unknown); reason customer guards didn't report; formal tender schedule for £140k RFP. |

---

## 🛡️ Zero-Fabrication & Evidence Traceability Architecture

- **No Artificial Grand Totals**: Verified revenue is strictly segregated from customer verbal claims and unverified estimates.
- **Evidence Provenance Trace**: Every factual number, date, and person is backed by a registered source ID from MCP tools (`get_all_paperwork`, `get_my_accounts`, `get_signals`, etc.).
- **Qualitative Risk Probabilities**: Where empirical failure distributions do not exist, risk probabilities are evaluated qualitatively with explicit business reasons, never fabricated with fake percentage numbers.
- **Explicit Unknowns**: Missing information is highlighted as an active discovery gap rather than hidden with convenient assumptions.

---

## ⚡ MCP Connection & Rate-Limit Enforcement

- **Endpoint**: `https://questathon.aihackerscollective.com/api/public/mcp`
- **Protocol**: JSON-RPC 2.0 via secure server-side HTTP POST.
- **Rate-Limiter**: Strictly enforces **1 call per minute (61,000 ms safety buffer)** across all read and write tools.
- **Token Protection**: `AQ_TOKEN` is accessible **only** to server-side API routes and is never exposed to browser bundles, client logs, or Git history.
- **Write-Back (`write_note`)**: Full duplicate-prevention validation before recording notes back to the MCP server.

---

## 🚀 Quickstart & Installation

### Prerequisites

- Node.js 18+ (tested on Node v20 & v26)
- npm or pnpm

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/ANSUJKMEHER/questathon-live-crm.git
cd questathon-live-crm
npm install
```

### 2. Configure Environment Variables

Create `.env.local` in the project root:

```bash
# Add your Questathon challenge MCP Bearer Token
AQ_TOKEN=your_token_here
```

*(Note: The CRM includes a resilient offline persistent cache, enabling full UI inspection and verification even prior to token configuration).*

### 3. Run Automated Business Logic Tests

```bash
npm test
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build

```bash
npm run build
npm start
```

---

## 📁 System Architecture

```
questathon-live-crm/
├── src/
│   ├── app/                      # Next.js App Router Pages & API Routes
│   │   ├── page.tsx              # Executive Overview Cockpit
│   │   ├── eastern-counties/     # Account A: Answers All 5 Questions
│   │   ├── aldermoor/            # Account B: Answers All 5 Questions
│   │   ├── deals/                # Commercial Valuation Matrix
│   │   ├── stakeholders/         # Stakeholder Power Map
│   │   ├── action-plan/          # Prioritized Next Actions
│   │   ├── risks/                # Risk & Mitigation Register
│   │   ├── unknowns/             # Explicit Discovery Register
│   │   ├── live-events/          # Live Telemetry & Event Ingestion
│   │   ├── evidence/             # Evidence & Provenance Registry
│   │   └── api/                  # Secure Server-Side MCP Endpoints
│   │       ├── crm/data/         # Aggregated CRM Data Payload
│   │       ├── mcp/status/       # 60s Rate Limiter Cooldown Status
│   │       ├── mcp/sync/         # Step-by-Step Priority MCP Ingestion
│   │       └── mcp/write-note/   # Safe Note Write-Back with Duplicate Check
│   ├── components/               # Modular UI Components
│   │   ├── layout/               # Sidebar, Header, AppShell
│   │   ├── questions/            # Modular Sections for 5 Manager Questions
│   │   ├── shared/               # MetricCard, VerificationBadge, SourceModal, WriteNoteModal
│   │   └── charts/               # Audited Recharts Visualizations
│   └── lib/                      # Core Domain Logic
│       ├── business/             # Valuation, PowerMap, Actions, Risks, Unknowns, Signals
│       ├── mcp/                  # Client, RateLimiter, Syncer, Types
│       └── storage/              # Persistence Cache & EvidenceRegistry
└── tests/                        # Automated Business Logic Test Suite
```

---

## 🔒 Security & Compliance

1. **Token Secrecy**: `AQ_TOKEN` is never sent to the client, never stored in client state, never referenced in `NEXT_PUBLIC_*` variables, and strictly omitted from logs.
2. **Rate Limit Defense**: `RateLimiter` persists last-call timestamps to disk and memory to prevent concurrent race conditions across serverless invokes.
3. **Write-Back Verification**: The CRM verifies note existence prior to dispatch, preventing duplicate record spamming.

---

## 📄 Submission Deliverables & Documentation

- **Live Production URL**: *(Deployed on Vercel)*
- **GitHub Repository**: [https://github.com/ANSUJKMEHER/questathon-live-crm](https://github.com/ANSUJKMEHER/questathon-live-crm)
- **Thinking Document**: See `docs/THINKING_DOCUMENT.md`
- **Video Walkthrough Script**: See `docs/WALKTHROUGH_SCRIPT.md`
- **Submission Checklist**: See `docs/SUBMISSION_CHECKLIST.md`

---

## 📝 License

Proprietary — Developed for the Questathon Challenge 2024.
