import { useRef, useState } from "react";
import { submitLead, type RejectReason, type SubmitResult } from "~/lib/leads";
import { track } from "~/lib/track";
import { CheckIcon, CONTACT_EMAIL } from "~/components/site";

/**
 * Enquiry form — "Get a free 30-minute marketing strategy call", the site's
 * primary conversion action (measurement-plan §1). Submits to the server fn in
 * ~/lib/leads.ts which validates server-side (honeypot, email format, <3s fill
 * time, per-IP rate limit, email dedupe) and stores pending/spam leads.
 *
 * Graceful fallback: if the DB isn't connected (or the insert fails), the
 * server returns the "fallback" state and we swap in the friendly inline
 * "email us" notice with a mailto link — so the enquiry still reaches the
 * business inbox (the current conversion proxy). No error is shown.
 *
 * PII rule: form contents go to the server only, stored in the DB. Event props
 * carry ids/labels/durations/reasons — never form values.
 */

const FORM_ID = "strategy-call-v1";

interface EnquiryFormProps {
  /** data-cta-id of the CTA that scrolled the visitor here. */
  ctaId?: string;
  formVersion?: string;
}

type Phase = "idle" | "submitted" | "spam_friendly" | "fallback";

function validationMessage(validation: string | undefined): string | null {
  switch (validation) {
    case "name":
      return "Please add your name so we know who we're talking to.";
    case "email":
      return "Please add a valid email address so we can reply.";
    default:
      return null;
  }
}

function reasonLine(reason: RejectReason | undefined): string {
  switch (reason) {
    case "rate_limit":
      return "You've sent a few enquiries in the last hour — we'll get back to you on the first one.";
    case "too_fast":
      return "That went through suspiciously fast, so we've set it aside.";
    default:
      return "That submission didn't look quite right, so we've set it aside.";
  }
}

export function EnquiryForm({ ctaId, formVersion }: EnquiryFormProps) {
  const startedAtRef = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [validation, setValidation] = useState<string | null>(null);
  const [rejectLine, setRejectLine] = useState<string | null>(null);

  function handleStarted() {
    if (startedAtRef.current === null) {
      startedAtRef.current = Date.now();
      track("form_started", { form_id: FORM_ID, form_version: formVersion ?? "v1", cta_id: ctaId });
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const start = startedAtRef.current;
    const submitDurationMs =
      start === null ? 0 : Math.max(0, Date.now() - start);
    void (async () => {
      const form = formRef.current;
      // Client-side presence check first (fast feedback; server re-validates).
      const rawName = String(
        (form?.elements.namedItem("name") as HTMLInputElement | null)?.value ?? ""
      ).trim();
      const rawEmail = String(
        (form?.elements.namedItem("email") as HTMLInputElement | null)?.value ?? ""
      ).trim();

      if (start === null) {
        // Automated submit with zero fill time — treat as bot (no conversion).
        track("form_rejected", {
          form_id: FORM_ID,
          reject_reason: "too_fast",
          submit_duration_ms: 0,
          cta_id: ctaId,
        });
        setRejectLine(reasonLine("too_fast"));
        setPhase("spam_friendly");
        return;
      }

      if (!rawName) {
        setValidation("name");
        track("form_submit_error", {
          form_id: FORM_ID,
          error_field: "name",
          error_type: "required",
          cta_id: ctaId,
        });
        return;
      }
      if (!rawEmail) {
        setValidation("email");
        track("form_submit_error", {
          form_id: FORM_ID,
          error_field: "email",
          error_type: "required",
          cta_id: ctaId,
        });
        return;
      }
      setValidation(null);

      const data = new FormData(form!);
      // UTMs are read from the page URL at submit time and forwarded with the
      // payload — the server-fn POST URL doesn't carry them. Non-PII tokens.
      const q = new URLSearchParams(window.location.search);
      const payload = {
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        company: String(data.get("company") ?? ""),
        message: String(data.get("message") ?? ""),
        website: String(data.get("website") ?? ""), // honeypot
        ctaId,
        utms: {
          utm_source: q.get("utm_source") ?? undefined,
          utm_medium: q.get("utm_medium") ?? undefined,
          utm_campaign: q.get("utm_campaign") ?? undefined,
          utm_content: q.get("utm_content") ?? undefined,
          utm_term: q.get("utm_term") ?? undefined,
        },
        startedAt: start,
      };

      // Track the submit attempt only after validation passes; the server
      // decides spam vs pending and the client mirrors its verdict.
      track("form_submit", {
        form_id: FORM_ID,
        cta_id: ctaId,
        submit_duration_ms: submitDurationMs,
      });

      let result: SubmitResult;
      try {
        result = await submitLead({ data: payload });
      } catch {
        // Server fn threw (unexpected) — same friendly fallback, never a crash.
        result = { ok: false, status: "fallback", submit_duration_ms: submitDurationMs };
      }

      if (result.ok) {
        if (result.status === "pending") {
          setPhase("submitted");
          // ⭐ form_submit is the conversion; server inserted with a lead_id.
          track("form_submit", {
            form_id: FORM_ID,
            lead_id: result.lead_id,
            cta_id: ctaId,
            submit_duration_ms: result.submit_duration_ms,
          });
          return;
        }
        // status === "spam": rejected — NEVER a conversion.
        if (result.reason) {
          track("form_rejected", {
            form_id: FORM_ID,
            reject_reason: result.reason,
            cta_id: ctaId,
            submit_duration_ms: result.submit_duration_ms,
          });
          setRejectLine(reasonLine(result.reason));
          setPhase("spam_friendly");
          return;
        }
        // status === "spam" without a reason shouldn't happen; treat as fallback.
      } else if (result.status === "validation") {
        // Server-side validation caught it (client let a malformed value
        // through, e.g. bad email shape).
        setValidation(result.field);
        track("form_submit_error", {
          form_id: FORM_ID,
          error_field: result.field,
          error_type: "server_validation",
          cta_id: ctaId,
        });
        return;
      }
      // Graceful fallback path (no DATABASE_URL or insert failed).
      setPhase("fallback");
    })();
  }

  // ---- states ---------------------------------------------------------------

  if (phase === "submitted") {
    return (
      <div className="rounded-xl border border-emerald-600/40 bg-emerald-50 p-8 text-left dark:border-emerald-500/40 dark:bg-emerald-950/40">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-900 dark:text-emerald-200">
          <CheckIcon /> Request received
        </h3>
        <p className="mt-2 text-emerald-800 dark:text-emerald-300">
          Thanks — we'll be in touch within one business day to schedule your
          free 30-minute strategy call. In the meantime, the{" "}
          <a href="/privacy" className="underline underline-offset-4">
            privacy policy
          </a>{" "}
          explains how we use your details.
        </p>
      </div>
    );
  }

  if (phase === "spam_friendly") {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-8 text-left dark:border-neutral-800 dark:bg-neutral-950">
        <h3 className="text-lg font-semibold">{rejectLine ?? "That didn't go through."}</h3>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          If that's a mistake, email us directly at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-emerald-700 underline underline-offset-4 dark:text-emerald-400">
            {CONTACT_EMAIL}
          </a>{" "}
          and we'll pick it up from there.
        </p>
      </div>
    );
  }

  if (phase === "fallback") {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-8 text-left dark:border-neutral-800 dark:bg-neutral-950">
        <h3 className="text-lg font-semibold">
          We're not ready to take submissions this way yet — email us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-700 underline underline-offset-4 dark:text-emerald-400">
            {CONTACT_EMAIL}
          </a>
        </h3>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Send your name, company, and what you're working on — we'll reply
          with times for your free 30-minute strategy call.
        </p>
      </div>
    );
  }

  // ---- idle form --------------------------------------------------------------

  const inputCls =
    "w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500/30";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onFocus={handleStarted}
      data-form-id={FORM_ID}
      noValidate
      className="space-y-4 text-left"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Name <span className="text-emerald-700 dark:text-emerald-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            placeholder="Full name"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Work email <span className="text-emerald-700 dark:text-emerald-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@company.com"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Company <span className="text-neutral-400 dark:text-neutral-500">(optional)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={160}
          placeholder="Your company or product"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          What are you working on? <span className="text-neutral-400 dark:text-neutral-500">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="The goal, the bottleneck, the launch — whatever helps us prep for the call."
          className={inputCls}
        />
      </div>

      {/* Honeypot — visually hidden, aria-hidden, off the tab order, autocomplete off. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          data-honeypot
          className="h-px w-px border-0 p-0"
        />
      </div>

      {validation ? (
        <p role="alert" className="text-sm font-medium text-amber-700 dark:text-amber-400">
          {validationMessage(validation)}
        </p>
      ) : null}

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 sm:w-auto dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Request my free strategy call
      </button>

      <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        Free, 30 minutes, no pitch deck. We'll reply within one business day.{" "}
        <a href="/privacy" className="font-medium text-neutral-600 underline underline-offset-4 hover:text-emerald-700 dark:text-neutral-300 dark:hover:text-emerald-400">
          Privacy policy
        </a>
        {" "}— or email us directly at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-neutral-600 underline underline-offset-4 hover:text-emerald-700 dark:text-neutral-300 dark:hover:text-emerald-400">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </form>
  );
}