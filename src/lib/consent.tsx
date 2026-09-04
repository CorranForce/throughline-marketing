import { useSyncExternalStore } from "react";

import { ensureGtagLoaded } from "./analytics";

/**
 * Lightweight analytics-consent store.
 *
 * The site is tracking-free until the visitor accepts. When they do, GA4 (the
 * owner-chosen analytics backend) loads — see `ensureGtagLoaded()` in
 * ~/lib/analytics.ts. Site code never calls gtag directly; it goes through
 * track() in ~/lib/track.ts, which gates on this store:
 *
 *   import { consentStore, CONSENT_STORAGE_KEY } from "~/lib/consent";
 *   import { ensureGtagLoaded } from "~/lib/analytics";
 *
 *   if (consentStore.getSnapshot() === "accepted") {
 *     ensureGtagLoaded() // loads gtag.js + configs the property; idempotent
 *   }
 *   consentStore.subscribe((state) => {
 *     if (state === "accepted") ensureGtagLoaded()
 *   })
 *
 * Both states are persisted ("accepted" or "declined") so the banner shows only
 * once per visitor (EEA/UK visitors get the banner; simplest correct behavior
 * is show-on-first-visit for everyone until a geolocation check is added — the
 * privacy policy says exactly this). Declined ≠ tracked: it just means the
 * banner won't nag again, and DECLINED VISITORS ARE NEVER TRACKED. No
 * third-party code runs from this module; nothing loads until "accepted".
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

function emit() {
  window.dispatchEvent(new Event("throughline-consent-change"));
}

/**
 * Subscribe to consent changes. The callback receives the CURRENT consent
 * state (not the raw event), so `subscribe((state) => ...)` reads naturally.
 * Notifies on both a same-tab choice (custom event) and a cross-tab change
 * (storage event scoped to this key). Returns an unsubscribe function.
 */
export function subscribeConsent(cb: (state: ConsentState) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb(readConsent());
  const onStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_STORAGE_KEY) handler();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener("throughline-consent-change", handler);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("throughline-consent-change", handler);
  };
}

/**
 * Set the visitor's choice. Persisted immediately (both "accepted" and
 * "declined" are stored — the banner must not re-ask a decliner); the GA4 load
 * hook point (subscribeConsent above) fires whenever this changes.
 */
export function setConsent(state: Exclude<ConsentState, undefined>): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, state);
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
 * Store handle for external subscribers (the documented hook point for
 * analytics init). `subscribe` fires with the current state on any change.
 */
export const consentStore = {
  getSnapshot: readConsent,
  subscribe: subscribeConsent,
};

/**
 * Client-only reactive hook. Returns undefined until the visitor decides.
 * The banner renders nothing once a choice exists (and is a no-op during SSR),
 * so no "flash of banner" needs a hydration workaround.
 */
export function useConsent(): ConsentState {
  // useSyncExternalStore's onStoreChange takes no arguments; subscribeConsent
  // calls it with the state, which is ignored — safe.
  return useSyncExternalStore(
    subscribeConsent as unknown as (cb: () => void) => () => void,
    readConsent,
    () => undefined,
  );
}