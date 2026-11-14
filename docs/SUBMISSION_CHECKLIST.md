# Questathon Live CRM — Final Submission Checklist

This document tracks the final four required deliverables for the Questathon Challenge submission.

---

## 📋 The Four Required Deliverables

| Deliverable | Description | Status / Target URL | Verified By |
|---|---|---|---|
| **1. Live CRM URL** | Production-deployed Vercel URL accessible in incognito window | `https://questathon-live-crm.vercel.app` *(Pending Vercel Project Connection)* | Senior Engineer |
| **2. Public GitHub URL** | Public Git repository with full source, tests, and documentation | `https://github.com/ANSUJKMEHER/questathon-live-crm` | Lead Architect |
| **3. One-Page Google Docs URL** | Thinking document explaining CRM rationale, 5 answers, rules, and AI usage | *[Google Docs Shared Link]* *(Content in `docs/THINKING_DOCUMENT.md`)* | Project Owner |
| **4. 3-Minute Video URL** | Recorded walkthrough on Google Drive demonstrating both accounts and source trace | *[Google Drive Video Link]* *(Script in `docs/WALKTHROUGH_SCRIPT.md`)* | Project Owner |

---

## ✅ Technical & Compliance Pre-Flight Checklist

### 1. Data Integrity & Zero Fabrication
- [x] Verified book values strictly segregated from customer verbal claims (£120k / £210k vs £180k / £140k).
- [x] Every factual figure has a traceable source in `EvidenceRegistry` (`src/lib/storage/registry.ts`).
- [x] Risk probabilities are evaluated qualitatively without invented percentages (`src/lib/business/risks.ts`).
- [x] Blindspots and unknowns explicitly documented without turning assumptions into facts (`src/lib/business/unknowns.ts`).
- [x] Root cause for the Aldermoor 3-dock flight stoppage explicitly marked as **unknown**.

### 2. Security & MCP Protocol Compliance
- [x] `AQ_TOKEN` is strictly confined to server-side code (`src/lib/mcp/client.ts`).
- [x] `.env.local` is included in `.gitignore` and has NEVER been committed to Git.
- [x] No `NEXT_PUBLIC_` variables contain secrets.
- [x] Strict 60-second (+1s safety buffer) rate limiter active across all MCP tool calls (`src/lib/mcp/rate-limiter.ts`).
- [x] `write_note` endpoint enforces duplicate prevention and account validation (`src/app/api/mcp/write-note/route.ts`).

### 3. Build & Test Quality Assurance
- [x] Automated unit test suite passes: `npm test` (6/6 tests passing).
- [x] Production build passes cleanly: `npm run build` (13/13 static & dynamic routes generated with zero errors).
- [x] Responsive layout verified across desktop and mobile screens.
- [x] Clickable evidence modal functioning across all 10 views.

---

## 🚀 Final Steps for Project Owner

1. **GitHub Push**:
   - Verify `git status` to ensure no `.env` or sensitive files are staged.
   - Push commit to GitHub repository: `questathon-live-crm`.
2. **Vercel Deployment**:
   - Import the GitHub repository into Vercel.
   - Configure `AQ_TOKEN` in Vercel **Environment Variables** (Server runtime only).
   - Verify deployment in a private/incognito browser window.
3. **Google Docs**:
   - Copy text from `docs/THINKING_DOCUMENT.md` into a new Google Doc and set access to *"Anyone with the link can view"*.
4. **Walkthrough Video**:
   - Record 3-minute video following `docs/WALKTHROUGH_SCRIPT.md`.
   - Upload to Google Drive and set access to *"Anyone with the link can view"*.
