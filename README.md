# Problem We’re Solving

Students who want to start or grow a business lack a practical, guided way to assess **readiness, security, and compliance** and then act on clear next steps. Classes rarely mirror real-world workflows (version control, deployment, audits), and campus resources are scattered. We’ll provide a **web app** where students enter basic business info, get **LLM-generated, industry-specific questions**, receive a **score/tier** (Beginner/Growing/Established), and get **actionable recommendations** with resources—all **saved to a dashboard** so progress can be tracked over time. This bridges the classroom-to-workforce gap with hands-on tooling (GitHub, Vercel, MySQL) and security best practices.

---


<img width="3210" height="2910" alt="diagram-export-9-3-2025-4_19_00-PM" src="https://github.com/user-attachments/assets/f8a1b295-e96f-4f34-ad63-c5c45286128c" />



# 4-Week Development Plan (MVP)

## Week 1 — Foundations & Setup

**Goals:** Repo, cloud, database, auth, and dashboards scaffolded.

* Create GitHub repo with protected `main`, PR reviews, and CI placeholders.
* Provision Vercel project; set env vars (OpenAI key, DB URL).
* Initialize Next.js + TypeScript + Tailwind; set up routing & layout.
* Set up Auth (Email/Password via Auth.js) and session management.
* Define Prisma schema: `users`, `businesses`, `assessments`, `assessment_questions`, `assessment_answers`, `scores`, `recommendations`, `resources`, `audit_logs`.
* Run initial migration; connect to MySQL (PlanetScale or MySQL).
* Seed initial `resources` (general campus-agnostic links).
* Build basic **Dashboard**: create/view business, list past assessments.
* Security groundwork: env-var secrets, ESLint, Prettier, commit hooks.

**Deliverables:** Running staging site on Vercel, DB migrations, ERD diagram, user auth + dashboard shell.

---

## Week 2 — Assessment Engine (LLM + Scoring)

**Goals:** End-to-end assessment flow with stored results and tiering.

* API route to **generate questions** (server-side call to OpenAI) based on business industry/stage; return 10–15 weighted questions grouped by category (Security, Compliance, Digital Presence, Operations, Finance).
* UI to render questions, capture answers (forms, validation, progress).
* Implement **scoring**: per-question → category → total; compute **tier**.
* Persist `assessment_questions`, `assessment_answers`, `scores`.
* Generate **recommendations** via LLM using missed items + category gaps.
* Token usage logging and simple cost estimate per assessment.

**Deliverables:** Users can start assessment → answer → receive score/tier + recommendations saved to DB.

---

## Week 3 — Security, Admin Metrics & Reporting

**Goals:** Harden security; enable insights; add report export.

* Input validation (Zod), rate limiting, RBAC checks on all routes.
* Audit logging for auth and sensitive actions.
* **Admin Metrics** page: top gaps, average scores, adoption counts.
* Export results/report: HTML → downloadable PDF; store export metadata.
* Basic performance passes (indexes, query optimization).
* Security tests: dependency scan, secret scan, manual Burp walkthrough (staging). Document incident response basics.

**Deliverables:** Secure MVP with admin insights and report export; documented security checklist status.

---

## Week 4 — Polish, Testing & Pilot

**Goals:** Usability, reliability, small pilot.

* UX polish: empty states, accessibility checks, friendly error toasts.
* Tests: unit (scoring, prompt builders), integration (assessment flow), e2e (Playwright) for critical paths (new user → first assessment → export).
* Bug bash + triage; fix critical/high issues.
* Conduct **pilot** with ≥20 students (JSU first); collect feedback via short survey; capture baseline metrics (completion rate, average score, time-to-complete).
* Finalize short demo script and slide outline for presentation.

**Deliverables:** Production MVP, pilot feedback + metrics snapshot, demo-ready build.

---

## Success Criteria (MVP)

* A new user can complete an assessment and get **score/tier + recommendations** in **<10 minutes**.
* All API routes require auth; ownership checks enforced.
* Scores are reproducible for identical answers; exports download reliably.
* Admin can view top readiness gaps and adoption counts.
* No critical security issues in scans; staging passes manual checks.
