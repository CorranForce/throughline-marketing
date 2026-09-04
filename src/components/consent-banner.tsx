import { useConsent, setConsent } from "~/lib/consent";

/**
 * Lightweight, non-blocking analytics-consent banner (measurement-plan §6,
 * compliance-baseline gap P0). Shown once per visitor until they choose;
 * Accept/Decline persisted in localStorage ("throughline-consent") — Declining
 * stores "declined" so the banner never re-asks on later visits.
 *
 * Declined ≠ tracked: analytics (GA4 — owner-chosen) loads ONLY after Accept —
 * the hook point lives in ~/lib/consent.tsx and is enforced in ~/lib/track.ts
 * (events drop unless consent === "accepted") and in ~/lib/analytics.ts (the
 * gtag script itself only loads on accept).
 *
 * Non-blocking: fixed to the viewport's bottom edge, never an overlay on top
 * of content; page content is fully readable behind it.
 */
export function ConsentBanner() {
  const consent = useConsent();
  if (consent !== undefined) return null;
  return (
    <div
      role="region"
      aria-label="Cookie and analytics consent"
      data-consent-banner
      className="fixed inset-x-0 bottom-0 z-50"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 border-t border-neutral-200 bg-white/95 px-6 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:gap-8 lg:px-8 dark:border-neutral-800 dark:bg-neutral-950/95">
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          We use privacy-respecting analytics to understand what's useful on
          this site — and nothing tracks you until you say it's OK. Read the{" "}
          <a
            href="/privacy"
            className="font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
          >
            privacy policy
          </a>{" "}
          for the details.
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="inline-flex items-center rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => setConsent("declined")}
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 ring-1 ring-neutral-300 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:ring-neutral-700 dark:hover:bg-neutral-900 dark:hover:text-white"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}