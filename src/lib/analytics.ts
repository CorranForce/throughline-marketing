import { getConsent } from "./consent";

/**
 * GA4 (Google Analytics 4) backend glue — the owner-chosen analytics backend,
 * strictly consent-gated. Nothing here loads or sends anything until the
 * visitor has accepted analytics (re-checked at every entry point, even though
 * ~/lib/track.ts already gates events, so a future caller can't bypass it).
 *
 * The gtag script is injected ONLY on accept: never in the HTML head, never
 * preloaded/deferred, never before the visitor chooses. Declined/undecided
 * visitors stay completely tracking-free, matching the privacy policy and the
 * site's trust positioning.
 *
 * PostHog remains an optional future backend — site code never calls gtag
 * directly, it goes through track() in ~/lib/track.ts; swapping backends means
 * editing that mapping (and this file).
 */

/**
 * Measurement ID. Read from an env var when present, else the owner-provided
 * public identifier G-8LC4053DXZ. This is a public client-side identifier (not
 * a secret), so the fallback is safe to commit.
 */
export const GA4_MEASUREMENT_ID =
  (typeof process !== "undefined" && process.env.GA4_MEASUREMENT_ID) ||
  (import.meta.env.GA4_MEASUREMENT_ID as string | undefined) ||
  "G-8LC4053DXZ";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let gtagLoaded = false;

/**
 * Inject the standard gtag snippet and configure the property. Idempotent —
 * safe to call on every accept/re-render. Returns true when the script is (or
 * was just) loaded, false when consent isn't "accepted" or there's no DOM.
 */
export function ensureGtagLoaded(): boolean {
  if (typeof window === "undefined") return false;
  if (getConsent() !== "accepted") return false; // declined/undecided never load
  if (gtagLoaded) return true;

  const w = window;
  // Standard gtag snippet, split after the script tag: `gtag` is defined
  // synchronously as a dataLayer push, so commands issued before gtag.js
  // finishes loading are queued and processed on load.
  w.dataLayer = w.dataLayer ?? [];
  w.gtag = function (...args: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    w.dataLayer!.push(args);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`;
  document.head.appendChild(script);

  gtagLoaded = true;
  w.gtag("js", new Date());
  w.gtag("config", GA4_MEASUREMENT_ID, { send_page_view: true });
  return true;
}

/**
 * Fire a GA4 page_view for the current route (client-side navigation): the
 * config call with `send_page_view: true` makes gtag.js emit page_view, which
 * is the core event GA4 collects automatically — no manual page_view event.
 */
export function sendGa4PageView(): void {
  if (typeof window === "undefined") return;
  if (getConsent() !== "accepted") return;
  if (!window.gtag) return; // not loaded — initial page_view is already queued at load
  window.gtag("config", GA4_MEASUREMENT_ID, { send_page_view: true });
}

/**
 * GA4 mapping for track(): custom event with the context block merged by
 * track(). Call sites never touch gtag — everything funnels through track().
 */
export function ga4TrackEvent(
  name: string,
  props: Record<string, string | number | boolean | null | undefined>,
): void {
  if (typeof window === "undefined") return;
  if (getConsent() !== "accepted") return;
  window.gtag?.("event", name, props);
}