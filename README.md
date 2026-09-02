# Throughline Marketing

**End-to-end marketing execution** for early-stage startups and SMBs — strategy, content, and measurement — so customers can launch campaigns without hiring a full in-house team.

Retainers (channel mix + content cadence) and one-off campaign packages for launches and seasonal pushes.

## What's in this repo

The **company website** — a TanStack Start app (React + Vite + Tailwind):

- `/` — landing page: hero, problem, services, pricing, who-it's-for, enquiry form, how-it-works, social proof (placeholder until real client results), FAQ, final CTA. Book-a-strategy-call CTAs scroll to the enquiry form (`#enquire`).
- `src/components/enquiry-form.tsx` — "Get a free 30-minute marketing strategy call" form: the site's primary conversion action. Server-side validation + anti-spam (honeypot, <3s fill time = bot, per-IP rate limit ~3/hr, email dedupe); leads stored in the DB (`leads` table, `pending` vs `spam` status — spam never counts as conversion). Graceful fallback to email if the DB isn't connected. PII is stored in the DB only — never in analytics/events.
- `src/components/consent-banner.tsx` + `src/lib/consent.tsx` — privacy-first consent banner (Accept/Decline, persisted). Site is tracking-free today; when PostHog connects, analytics loads only after consent.
- `src/lib/track.ts` — thin `track()` wrapper with the measurement-plan event taxonomy. No-op today; PostHog or in-house backend swappable in this one file.
- `/terms`, `/privacy`, `/refund-policy` — the legal policy pages (ratified v1.0 documents, effective on publication).
- `public/images/` — brand imagery (abstract throughline hero motif, OG social-share card, CTA texture). Decorative only — no fake proof.
- `src/components/` — shared site chrome (header/footer/wordmark) and the policy-page shell.

## Current state (2026-09-02)

- **Live site** with landing page + brand imagery + policy pages, **enquiry form + consent banner** (lead pipeline MVP), and ratified pricing. The enquiry form is live; leads land in the DB once `DATABASE_URL` is connected (currently falls back to email).
- **Pricing (ratified):** The Throughline tiers — Essentials $2,500/mo, Growth $4,000/mo (flagship), Scale $6,000/mo — month-to-month. The Campaign one-off packages — Launch $2,000–3,500, Seasonal push $1,500–2,500. No setup fee (kickoff folds into the first month).
- **Free trial (ratified):** 7 days = strategy kickoff week. No card during the trial; billing starts day 7 if the client continues; month-to-month after; trial work stays with the client either way.
- **Legal:** Terms & Conditions, Privacy Policy, Refund Policy — ratified v1.0 in `/home/team/shared/legal/final/`, effective on publication. Open owner items remain: governing law/forum, legal entity name, Neon region, tax-record retention period.
- **Business inbox:** `throughline-marketing-5070f341@ctomail.io`.

## Run it

Dev server serves on port 3000 (working tree lives at `/home/team/shared/site`; this repo is the source of truth):

```sh
bun install
bun run dev   # http://localhost:3000
```

Production build: `bun run build`. Publishing to live is the team lead's job (`publish_site`), never run from here manually.

## Team workflow

- Feature branches + pull requests; the team lead reviews and merges.
- Read `/home/team/shared/WORKFLOW.md` (the team's living code-workflow reference) before code work.
- Documentation source files (copy, legal, compliance, measurement, pricing) live in `/home/team/shared/`.

## Keep this README current

Owner direction: as the business and site develop, update this README to match — milestones, pricing, legal status, and repo layout. Update it whenever the site or business materially changes.

Signed: team Throughline Marketing, 2026-09-02