import { useSyncExternalStore } from "react";

/**
 * Lightweight analytics-consent store.
 *
 * The site is tracking-free today. When PostHog (or any analytics backend) is
 * connected, read `getConsent()` / subscribe to it BEFORE initializing:
 *
 *   import { consentStore, CONSENT_STORAGE_KEY } from "~/lib/consent";
 *   import posthog from "posthog-js";
 *
 *   if (consentStore.getSnapshot() === "accepted") { posthog.init(...) }
 *   consentStore.subscribe((c) => {
 *     if (c === "accepted") posthog.init(...)
 *     else if (c === "declined" && posthog.__loaded) posthog.reset()
 *   })
 *
 * Both states are persisted so the banner only shows once per visitor (EEA/UK
 * visitors get the banner; simplest correct behavior is show-on-first-visit for
 * everyone until a geolocation check is added — the privacy policy says exactly
 * this). Declined ≠ tracked: it just means the banner won't nag again. No
 * third-party code runs from this module; nothing is sent anywhere.
 */

export const CONSENT_STORAGE_KEY = "throughline-consent";
export type ConsentState = "accepted" | "declined" | undefined;

function readConsent(): ConsentState {
  if (typeof window === "undefined") return undefined;
  try {
    const v = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === "accepted" || v === "declined" ? v : undefined;
  } catch {
    // Storage unavailable (private mode, blocked cookies) — treat as undecided.
    return undefined;
  }
}

function notify(cb: () => void): () => void {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function emit() {
  window.dispatchEvent(new Event("throughline-consent-change"));
}

/**
 * Set the visitor's choice. Persisted immediately; the posthog hook point
 * (subscribe above) fires whenever this changes.
 */
export function setConsent(state: Exclude<ConsentState, undefined>): void {
  try {
    if (state === "accepted") window.localStorage.setItem(CONSENT_STORAGE_KEY, state);
    else window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // Storage unavailable — remember for this page view only.
  }
  emit();
}

export function clearConsent(): void {
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    /* ignore */
  }
  emit();
}

/** True when the visitor has made a choice (accepted or declined). */
export function getConsent(): ConsentState {
  return readConsent();
}

/**
 * Client-only reactive hook. Returns undefined until the visitor decides.
 * The banner renders nothing once a choice exists (and is a no-op during SSR),
 * so no "flash of banner" needs a hydration workaround.
 */
export function useConsent(): ConsentState {
  return useSyncExternalStore(notify, readConsent, () => undefined);
}