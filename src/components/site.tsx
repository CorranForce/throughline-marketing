import type { ReactNode } from "react";

import { trackCtaClick } from "~/lib/track";

export const CONTACT_EMAIL = "throughline-marketing-5070f341@ctomail.io";
export const BOOK_CTA =
  "mailto:throughline-marketing-5070f341@ctomail.io?subject=Strategy%20call%20request";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-semibold tracking-tight text-neutral-900 dark:text-white ${className}`}>
      Throughline<span className="text-emerald-700 dark:text-emerald-400"> Marketing</span>
    </span>
  );
}

export function BookButton({
  variant = "primary",
  className = "",
  ctaId,
}: {
  variant?: "primary" | "ghost";
  className?: string;
  /** data-cta-id — fires cta_click via the root click delegate. */
  ctaId?: string;
}) {
  const base =
    variant === "primary"
      ? "bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      : "text-neutral-700 ring-1 ring-neutral-300 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:ring-neutral-700 dark:hover:bg-neutral-900 dark:hover:text-white";
  return (
    <a
      href="#enquire"
      data-cta-id={ctaId}
      data-cta-label="Book a strategy call"
      data-cta-type="form"
      data-cta-destination="#enquire"
      className={`inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium transition-colors ${base} ${className}`}
    >
      Book a strategy call
    </a>
  );
}

export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
      {children}
    </p>
  );
}

export function CheckIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mt-1 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400"
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.5 7.5a1 1 0 0 1-1.418.002L3.29 9.31a1 1 0 1 1 1.42-1.41l4.29 4.29 6.29-6.29a1 1 0 0 1 1.414-.005Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6 lg:px-8">
        <a href="/" className="shrink-0">
          <Wordmark />
        </a>
        <div className="hidden items-center gap-8 text-sm text-neutral-600 md:flex dark:text-neutral-400">
          <a href="/#services" className="transition-colors hover:text-neutral-900 dark:hover:text-white">
            Services
          </a>
          <a href="/#pricing" className="transition-colors hover:text-neutral-900 dark:hover:text-white">
            Pricing
          </a>
          <a href="/#how-it-works" className="transition-colors hover:text-neutral-900 dark:hover:text-white">
            How it works
          </a>
          <a href="/#faq" className="transition-colors hover:text-neutral-900 dark:hover:text-white">
            FAQ
          </a>
        </div>
        <a
          href="#enquire"
          data-cta-id="header-cta"
          data-cta-label="Book a strategy call"
          data-cta-type="form"
          data-cta-destination="#enquire"
          className="inline-flex items-center rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          Book a strategy call
        </a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center lg:px-8">
        <Wordmark />
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Marketing that ships. Content that compounds.
        </p>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            {CONTACT_EMAIL}
          </a>
          <nav
            aria-label="Legal"
            className="text-sm text-neutral-500 dark:text-neutral-400"
          >
            <a href="/terms" className="transition-colors hover:text-neutral-900 dark:hover:text-white">
              Terms
            </a>
            <span aria-hidden className="mx-2 text-neutral-300 dark:text-neutral-700">
              ·
            </span>
            <a href="/privacy" className="transition-colors hover:text-neutral-900 dark:hover:text-white">
              Privacy
            </a>
            <span aria-hidden className="mx-2 text-neutral-300 dark:text-neutral-700">
              ·
            </span>
            <a href="/refund-policy" className="transition-colors hover:text-neutral-900 dark:hover:text-white">
              Refund policy
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

/** Footer mailto link kept as the always-available email channel. */
export function FooterEmailLink() {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
    >
      {CONTACT_EMAIL}
    </a>
  );
}

/** Root-level click delegate: route tracked CTA clicks through the track() wrapper. */
export function initCtaTracking() {
  if (typeof window === "undefined") return () => {};
  const onClick = (e: MouseEvent) => {
    const t = e.target as Element | null;
    const el = t?.closest<HTMLElement>("[data-cta-id]") ?? null;
    trackCtaClick(el);
  };
  window.document.addEventListener("click", onClick);
  return () => window.document.removeEventListener("click", onClick);
}