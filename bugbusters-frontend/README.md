# Business Assessment App

## Problem We're Solving

Students who want to start or grow a business lack a practical, guided way to assess **readiness, security, and compliance** and act on clear next steps. Classes rarely mirror real-world workflows, and campus resources are scattered.

Our **web app** will allow students to:
- Enter basic business info
- Receive **LLM-generated, industry-specific questions**
- Get a **score/tier** (Beginner/Growing/Established)
- Receive **actionable recommendations** with resources
- Track progress on a **dashboard**

This bridges the classroom-to-workforce gap with hands-on tooling (GitHub, Vercel, MySQL) and security best practices.

## 4-Week Development Plan (MVP)

### Week 1 — Foundations & Setup
- Create GitHub repo, set up protected `main`, PR reviews, CI placeholders
- Provision Vercel project; set environment variables (OpenAI key, DB URL)
- Initialize Next.js + TypeScript + Tailwind, routing & layout
- Set up Auth (Email/Password via Supabase/Auth.js)
- Define database schema (`users`, `businesses`, `assessments`, `questions`, `answers`, `scores`, `recommendations`, `resources`, `audit_logs`)
- Run migration & seed initial resources
- Build basic dashboard shell
- Security groundwork: env vars, ESLint, Prettier, commit hooks

**Deliverables:** Running staging site, DB migrations, ERD diagram, auth + dashboard shell

### Week 2 — Assessment Engine (LLM + Scoring)
- API route to generate questions via LLM based on industry/stage
- UI to render questions, capture answers, validation & progress
- Scoring: per-question → category → total; compute tier
- Persist questions, answers, scores
- Generate recommendations via LLM using gaps
- Token usage logging & cost estimates

**Deliverables:** End-to-end assessment: user can answer → receive score/tier + recommendations saved to DB

### Week 3 — Security, Admin Metrics & Reporting
- Input validation (Zod), rate limiting, RBAC checks
- Audit logging for sensitive actions
- Admin metrics page: top gaps, average scores, adoption counts
- Export results as HTML → PDF
- Security tests: dependency scan, secret scan, manual walkthrough

**Deliverables:** Secure MVP with admin insights & report export

### Week 4 — Polish, Testing & Pilot
- UX polish: empty states, accessibility, error toasts
- Unit, integration, and end-to-end tests (Playwright)
- Bug bash + triage
- Pilot with ≥20 students; collect survey feedback & metrics
- Finalize demo & presentation slides

**Deliverables:** Production MVP, pilot feedback, demo-ready build

## Success Criteria

- Users complete assessment & get score/tier + recommendations in <10 mins
- API routes require auth; ownership enforced
- Scores reproducible for identical answers
- Admin can view gaps & adoption counts
- No critical security issues

## Role Quick Start Instructions

### Database Lead
- Log into Supabase dashboard
- Create tables via `/database/schema.sql`
- Set up RLS policies
- No local dev needed

### Software Engineer Lead (Backend)
- Clone repo & install dependencies
- Copy `.env.example` → `.env` and fill in Supabase keys
- Run: `npm run dev`
- Start with mock data in `/lib/mocks.ts`

### Frontend/UI Lead
- Same setup as Backend Lead
- Focus on `/pages` & `/components`
- Use mock API calls initially

### Programming Lead (AI)
- Same setup as Backend Lead
- Add AI key to `.env`
- Work in `/lib/ai.ts`
- Test with sample data from `/lib/sample-data.ts`

### Cybersecurity Lead
- Review code for security issues
- Set up Supabase Auth policies
- Test with dummy accounts

## Project Structure

- `/pages/api/` – Backend API routes
- `/pages/` – Frontend pages
- `/components/` – UI components
- `/lib/` – Shared utilities, mocks, AI functions
- `/types/` – TypeScript interfaces
- `/database/` – SQL schema files

## Getting Started

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

## Deployment

- Use Vercel for easy deployment
- Check Next.js deployment docs