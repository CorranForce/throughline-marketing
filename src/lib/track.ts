import { getConsent } from "./consent";
import { ga4TrackEvent } from "./analytics";

/**
 * Event wrapper (measurement-plan §2). Site code NEVER calls gtag/GA4 (or any
 * analytics SDK) directly — it calls `track()` here, so the backend stays
 * swappable by editing this one file:
 *   - GA4 (owner-chosen, consent-gated): gtag snippet loads ONLY after the
 *     visitor accepts (see ~/lib/analytics.ts), and `track` maps to
 *     `gtag('event', name, props)` with the context block below.
 *   - PostHog remains an optional future backend: map `track` ->
 *     `posthog.capture(name, props)` and init posthog-js against the consent
 *     store — the consent gate stays identical (events drop unless consent ===
 *     "accepted").
 *
 * The consent gate lives here (and in analytics.ts), so call sites stay simple
 * and events never leak before a choice. Declined/undecided visitors: console-
 * safe no-op, nothing sent anywhere.
 *
 * PII rule (measurement-plan §2, compliance-baseline §2.3): form contents
 * (name/email/company/message) are stored in the DB only. NEVER pass them as
 * event props. Events carry ids/labels/durations/outcomes — nothing personal.
 */

export type TrackProps = Record<string, string | number | boolean | null | undefined>;

/**
 * Context block on EVERY event (measurement-plan §2): path, title, UTMs,
 * device, session_id, page_version. `page_version` is bumped manually in
 * site.json per copy change.
 */
function context(): TrackProps {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const pick = (k: string) => params.get(k) ?? undefined;
  const ua = window.navigator.userAgent;
  return {
    path: window.location.pathname,
    title: window.document.title,
    utm_source: pick("utm_source"),
    utm_medium: pick("utm_medium"),
    utm_campaign: pick("utm_campaign"),
    utm_content: pick("utm_content"),
    utm_term: pick("utm_term"),
    device: /Mobile|Android|iPhone|iPad/i.test(ua) ? "mobile" : "desktop",
    session_id: window.localStorage.getItem("throughline-session") ?? "anonymous",
    page_version: "2026-09-02.1",
  };
}

/**
 * Fire an event. Consent-gated: when the visitor accepted, maps to a GA4
 * custom event with the context block merged in; otherwise (declined or
 * undecided) it stays a console-safe no-op and sends nothing.
 */
export function track(name: string, props?: TrackProps): void {
  const ctx = context();
  if (getConsent() !== "accepted") {
    // Development-only console marker — no PII is ever passed (enforced by
    // convention in this file; review any new call site against the PII rule).
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug(`[track] ${name} (consent-gated, no-op)`, { ...ctx, ...props });
    }
    return;
  }
  ga4TrackEvent(name, { ...ctx, ...props });
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug(`[track] ${name} → GA4`, { ...ctx, ...props });
  }
}

/**
 * Convenience for CTAs: reads `data-cta-id` (plus label/type/location) off the
 * element and fires cta_click. Used only on tracked CTAs.
 */
export function trackCtaClick(el: HTMLElement | null): void {
  if (!el) return;
  const ctaId = el.getAttribute("data-cta-id");
  if (!ctaId) return;
  track("cta_click", {
    cta_id: ctaId,
    cta_label: el.getAttribute("data-cta-label") ?? undefined,
    cta_type: el.getAttribute("data-cta-type") ?? undefined,
    cta_location: el.getAttribute("data-cta-location") ?? undefined,
    destination: el.getAttribute("data-cta-destination") ?? undefined,
  });
}