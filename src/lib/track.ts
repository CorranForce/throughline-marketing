import { getConsent } from "./consent";

/**
 * Event wrapper (measurement-plan §2). Site code NEVER calls PostHog (or any
 * analytics SDK) directly — it calls `track()` here, so the backend is
 * swappable by editing this one file:
 *   - PostHog (recommended, when connected): init posthog-js client-only in
 *     `__root.tsx` against the consent store (see ../lib/consent.tsx), then map
 *     `track` -> `posthog.capture(name, props)`.
 *   - In-house fallback: `track` -> `fetch("/api/track", { method: "POST", ... })`
 *     -> Neon SQL + reporting view.
 *
 * Today the site is tracking-free and must STAY that way. The default is a
 * console-safe no-op stub that keeps the event pipeline exercised (and the
 * console annotations aid dev verification) without sending anything anywhere.
 * The PostHog consent gate is already wired: events are dropped unless the
 * visitor accepted analytics.
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
 * Fire an event. No-op today (tracking-free baseline); wired to
 * posthog-capture once connected AND consent accepted. The consent gate lives
 * here, so call sites stay simple and events never leak before a choice.
 */
export function track(name: string, props?: TrackProps): void {
  if (getConsent() !== "accepted") return;
  // Development-only console marker — no PII is ever passed (enforced by
  // convention in this file; review any new call site against the PII rule).
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug(`[track] ${name}`, { ...context(), ...props });
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