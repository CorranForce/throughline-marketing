import { createServerFn } from "@tanstack/react-start";
import { getStartContext } from "@tanstack/start-storage-context";
import { createHash, randomUUID } from "node:crypto";
import { sql } from "~/db";

/**
 * Strategy-call enquiry form — the site's primary conversion action
 * (measurement-plan §1). Submissions are validated and stored server-side in
 * the leads table with a status; rejects land as status='spam' and NEVER count
 * as conversions.
 *
 * Anti-spam (measurement-plan §6, compliance-baseline §2.4): honeypot field +
 * server-side email format validation, submit-time check (<3s = bot), per-IP
 * rate limit (~3/hr), email dedupe. No CAPTCHA (friction).
 *
 * PII rule: form contents are written to the DB only — never logged, never
 * returned in analytics/console.
 *
 * Graceful fallback: if DATABASE_URL is missing (or the insert fails), the
 * handler returns a friendly "not ready for form submissions yet — email us"
 * state and the client shows the mailto fallback so the enquiry still reaches
 * the business inbox (the current conversion proxy, measurement-plan §1 MVP
 * note). Errors are NEVER surfaced to the visitor as a crash.
 */

// Field lengths (client + server). message is capped; company optional.
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_COMPANY = 160;
const MAX_MESSAGE = 2000;
const MIN_FILL_MS = 3_000; // faster than this = bot
const RATE_LIMIT = 3; // submissions per IP per hour
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FORM_ID = "strategy-call-v1";

export type LeadStatus = "pending" | "spam";

/** Reject reasons (spec: form_rejected / reject_reason). */
export type RejectReason =
  | "honeypot"
  | "too_fast"
  | "rate_limit"
  | "invalid_email"
  | "duplicate_email";

export type SubmitResult =
  | { ok: true; status: "pending"; lead_id: string; submit_duration_ms: number }
  | { ok: true; status: "spam"; lead_id: string; reason: RejectReason; submit_duration_ms: number }
  | { ok: false; status: "fallback"; submit_duration_ms: number }
  | { ok: false; status: "validation"; field: "name" | "email"; submit_duration_ms: number };

type Input = {
  name: string;
  email: string;
  company?: string;
  message?: string;
  website?: string; // honeypot — bots fill this; humans never see it
  ctaId?: string; // from data-cta-id of the originating CTA (non-PII)
  /** Epoch ms of first field focus (set by the client). Bot check lives here. */
  startedAt?: number;
};

// ---- server-only helpers ---------------------------------------------------

function nowMs(): number {
  return Date.now();
}

function clientIp(): string | null {
  try {
    const headers = getStartContext({ throwIfNotFound: false })?.request?.headers;
    if (!headers) return null;
    return (
      headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headers.get("cf-connecting-ip") ??
      headers.get("x-real-ip") ??
      null
    );
  } catch {
    return null;
  }
}

function qs(key: string): string | undefined {
  const ctx = getStartContext({ throwIfNotFound: false });
  const url = ctx?.request?.url;
  if (!url) return undefined;
  try {
    return new URL(url).searchParams.get(key) ?? undefined;
  } catch {
    return undefined;
  }
}

function referrerUrl(): string | undefined {
  const ctx = getStartContext({ throwIfNotFound: false });
  return ctx?.request?.headers.get("referer") ?? undefined;
}

function referrerPath(): string | undefined {
  const r = referrerUrl();
  try {
    return r ? new URL(r).pathname : undefined;
  } catch {
    return r;
  }
}

function sha256Hex(s: string): string {
  return createHash("sha256").update(s).digest("hex");
}

/** Rejected-submission bookkeeping (status='spam', never a conversion). */
async function recordReject(
  submit: { name: string; email: string; company: string; message: string; ctaId: string },
  reason: RejectReason
): Promise<void> {
  const ip = clientIp();
  try {
    await sql()`insert into leads (
        id, name, email, company, message, status, source_json, ip_hash, form_id,
        submitted_at, created_at
      ) values (
        ${randomUUID()}, ${submit.name}, ${submit.email}, ${submit.company || null},
        ${submit.message || null}, 'spam', ${JSON.stringify({
          reject_reason: reason,
          path: referrerPath(),
          referrer: referrerUrl(),
          cta_id: submit.ctaId || undefined,
        })}::jsonb, ${ip ? sha256Hex(ip) : null}, ${FORM_ID}, now(), now()
      )`;
  } catch {
    // Best-effort: spam bookkeeping must never take the site down.
  }
}

function sourceJson(ctaId: string): string {
  return JSON.stringify({
    path: referrerPath(),
    referrer: referrerUrl(),
    utm_source: qs("utm_source"),
    utm_medium: qs("utm_medium"),
    utm_campaign: qs("utm_campaign"),
    utm_content: qs("utm_content"),
    utm_term: qs("utm_term"),
    cta_id: ctaId || undefined,
  });
}

// ---- the server function ---------------------------------------------------

export const submitLead = createServerFn({ method: "POST" }).validator(
  (input: unknown) => input as Input
).handler(async ({ data }) => {
  const now = nowMs();
  const startedAt =
    typeof data.startedAt === "number" && Number.isFinite(data.startedAt)
      ? data.startedAt
      : NaN;
  const lastSubmit = now - (Number.isFinite(startedAt) ? startedAt : now);
  const submitDurationMs = Number.isFinite(startedAt) ? Math.max(0, lastSubmit) : now;

  const clean = (s: string | undefined, max: number) =>
    (s ?? "").trim().slice(0, max);
  const name = clean(data.name, MAX_NAME);
  const email = clean(data.email, MAX_EMAIL).toLowerCase();
  const company = clean(data.company, MAX_COMPANY);
  const message = clean(data.message, MAX_MESSAGE);
  const honeypot = clean(data.website, 400);
  const ctaId = clean(data.ctaId, 80);
  const submit = { name, email, company, message, ctaId };

  // 1) Honeypot — bots fill the hidden field; humans never see it.
  if (honeypot !== "") {
    await recordReject(submit, "honeypot");
    return {
      ok: true,
      status: "spam",
      lead_id: randomUUID(),
      reason: "honeypot",
      submit_duration_ms: submitDurationMs,
    } as SubmitResult;
  }

  // 2) Presence + email format.
  if (!name) return { ok: false, status: "validation", field: "name", submit_duration_ms: submitDurationMs };
  if (!email || !EMAIL_RE.test(email))
    return { ok: false, status: "validation", field: "email", submit_duration_ms: submitDurationMs };

  // 3) Submit time — a real human takes >3s between first focus and submit.
  //    Missing/invalid startedAt reads as no fill time at all → bot.
  if (!Number.isFinite(startedAt) || lastSubmit < MIN_FILL_MS) {
    await recordReject(submit, "too_fast");
    return {
      ok: true,
      status: "spam",
      lead_id: randomUUID(),
      reason: "too_fast",
      submit_duration_ms: submitDurationMs,
    } as SubmitResult;
  }

  const ip = clientIp();

  // 4) Per-IP rate limit (~3/hr): any submission (pending + spam rows) in the window.
  if (ip) {
    try {
      const rows = await sql()`select count(*)::int as n from leads
        where ip_hash = ${sha256Hex(ip)} and created_at > now() - interval '1 hour'`;
      if ((rows[0]?.n ?? 0) >= RATE_LIMIT) {
        await recordReject(submit, "rate_limit");
        return {
          ok: true,
          status: "spam",
          lead_id: randomUUID(),
          reason: "rate_limit",
          submit_duration_ms: submitDurationMs,
        } as SubmitResult;
      }
    } catch {
      // DB unavailable — the fallback below handles it.
    }
  }

  // 5) Email dedupe — same address may not submit twice.
  try {
    const rows = await sql()`select id from leads where lower(email) = ${email} limit 1`;
    if (rows.length > 0) {
      await recordReject(submit, "duplicate_email");
      return {
        ok: true,
        status: "spam",
        lead_id: randomUUID(),
        reason: "duplicate_email",
        submit_duration_ms: submitDurationMs,
      } as SubmitResult;
    }
  } catch {
    // DB unavailable — fall back, never crash.
  }

  // 6) Persist. DATABASE_URL missing → db.ts throws before a query runs; this
  //    catch is the graceful-fallback path (no error shown, mailto offered).
  try {
    const leadId = randomUUID();
    await sql()`insert into leads (
        id, name, email, company, message, status, source_json, ip_hash, form_id,
        submitted_at, created_at
      ) values (
        ${leadId}, ${name}, ${email}, ${company || null}, ${message || null},
        'pending', ${sourceJson(ctaId)}::jsonb, ${ip ? sha256Hex(ip) : null}, ${FORM_ID},
        now(), now()
      )`;
    return { ok: true, status: "pending", lead_id: leadId, submit_duration_ms: submitDurationMs };
  } catch {
    return { ok: false, status: "fallback", submit_duration_ms: submitDurationMs };
  }
});