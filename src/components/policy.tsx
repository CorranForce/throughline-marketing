import { SiteFooter, SiteHeader } from "~/components/site";
import type { ReactNode } from "react";

/**
 * Shared shell for the legal policy pages: site header, the explicit
 * WORKING DRAFT / NOT IN FORCE banner, document heading, body prose,
 * and footer with links back to the landing page.
 */
export function PolicyShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-white dark:bg-neutral-950">
      <SiteHeader />
      <main id="top" className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-24 sm:pt-20 lg:px-8">
          {/* Draft status banner — visible, not fine print */}
          <div className="mb-8 flex flex-wrap items-center gap-3 border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-200">
            <span className="font-semibold uppercase tracking-widest">
              Working draft
            </span>
            <span aria-hidden className="hidden text-amber-400 sm:inline">
              —
            </span>
            <span>
              This document is a <strong>working draft for owner review</strong> and is{" "}
              <strong>not in force</strong>. Nothing here is binding until the owner
              ratifies it.
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>

          <div className="mt-10 max-w-3xl text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
            {children}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

/** Heading inside the document body (h2). */
export function DocHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 mt-10 text-xl font-semibold tracking-tight text-neutral-900 first:mt-0 dark:text-white">
      {children}
    </h2>
  );
}

/** Paragraph inside the document body. */
export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-pretty first:mt-0">{children}</p>;
}

/** Inline content that should stand out (bold, etc.) renders as-is via children. */

/** Bulleted list inside the document body. */
export function Ul({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-emerald-700 dark:marker:text-emerald-400">
      {items.map((item, i) => (
        <li key={i} className="text-pretty">
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Numbered list inside the document body. */
export function Ol({ items }: { items: ReactNode[] }) {
  return (
    <ol className="mt-4 list-decimal space-y-3 pl-5 marker:text-emerald-700 dark:marker:text-emerald-400">
      {items.map((item, i) => (
        <li key={i} className="text-pretty">
          {item}
        </li>
      ))}
    </ol>
  );
}

/**
 * Callout for a `[PENDING OWNER DECISION ...]` marker. Distinct but calm:
 * branded, not alarming.
 */
export function Pending({
  children,
  label = "Pending owner decision",
  inline = false,
}: {
  children?: ReactNode;
  label?: string;
  inline?: boolean;
}) {
  if (inline) {
    return (
      <span className="text-amber-800 dark:text-amber-300">
        <span className="font-semibold">[{label}: </span>
        {children}
        <span className="font-semibold">]</span>
      </span>
    );
  }
  return (
    <div className="my-5 rounded-lg border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-200">
      <p className="font-semibold uppercase tracking-widest">{label}</p>
      {children ? <div className="mt-2">{children}</div> : null}
    </div>
  );
}

/**
 * Callout for an entire section whose terms are TBD (e.g. the free trial).
 * Used where the heading itself carries the pending marker.
 */
export function TbdNote({ children }: { children: ReactNode }) {
  return (
    <div className="my-5 rounded-lg border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-200">
      <p className="font-semibold uppercase tracking-widest">Terms not yet defined</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}