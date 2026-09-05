import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { ConsentBanner } from "~/components/consent-banner";
import { EnquiryForm } from "~/components/enquiry-form";
import {
  CheckIcon,
  SectionTag,
  SiteFooter,
  SiteHeader,
  initCtaTracking,
} from "~/components/site";

export const Route = createFileRoute("/consult")({
  component: Consult,
  // Answer-first SEO: title/description mirror the page's opening block (the
  // same meta_title/meta_description pattern the blog posts use). Nothing
  // index-blocking — this is the destination every CTA and ad points at.
  head: () => ({
    meta: [
      { title: "Book a free strategy call | Throughline Marketing" },
      {
        name: "description",
        content:
          "Book a free 30-minute marketing strategy call: one conversation about your goal, your bottleneck, and what the next two months of marketing should be. No pitch deck.",
      },
      { property: "og:title", content: "Book a free strategy call | Throughline Marketing" },
      {
        property: "og:description",
        content:
          "Thirty minutes, no pitch deck. Where you are, where the bottleneck is, and what the next two months of marketing should be — straight talk, even if the answer is not us.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

/**
 * /consult — the single lead-capture destination (owner direction: every CTA
 * exists to capture leads and set up a free consult call). Headline + short
 * value prop → the enquiry form → real trust signals. No fake urgency, no
 * fabricated proof — the page says what is honestly true (live blog, free
 * 30-min consult, what happens next) and nothing more.
 *
 * UTMs: arriving on /consult?utm_source=… keeps them through submission two
 * ways — the track() context block reads them from window.location.search for
 * GA4 cta_click/page_view context, and EnquiryForm forwards them in the
 * submitLead payload so the lead row's source_json carries them. No PII in
 * events; form contents live in the DB only.
 */
function Consult() {
  useEffect(() => initCtaTracking(), []);

  return (
    <div className="flex min-h-dvh flex-col bg-white dark:bg-neutral-950">
      <SiteHeader />

      <main id="top">
        <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-16 sm:pt-24 sm:pb-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <SectionTag>Free strategy call</SectionTag>
              <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl">
                Book a free 30-minute strategy call
              </h1>
              {/* Answer-first opening: what the call is, who it's for, what it costs. */}
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-neutral-600 sm:text-xl dark:text-neutral-400">
                Thirty minutes, no pitch deck. We'll look at where you are,
                where the bottleneck is, and what the next two months of
                marketing should be — straight talk, even if the answer is
                "not us".
              </p>
              <ul className="mt-8 max-w-xl space-y-3">
                {[
                  "A quick pass on your current funnel and channel fit.",
                  "What we'd ship in the first month if we worked together.",
                  "A straight answer on whether you need a retainer at all.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckIcon />
                    <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>

              {/* What happens next — honest: form → reply → book the call. */}
              <div className="mt-10 max-w-xl rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/40">
                <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                  What happens next
                </p>
                <ol className="mt-4 space-y-3 text-neutral-700 dark:text-neutral-300">
                  <li className="flex gap-3">
                    <span aria-hidden className="font-semibold text-emerald-700 dark:text-emerald-400">1.</span>
                    <span>You send the form — name, email, and what you're working on.</span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden className="font-semibold text-emerald-700 dark:text-emerald-400">2.</span>
                    <span>We reply within one business day with times for your free call.</span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden className="font-semibold text-emerald-700 dark:text-emerald-400">3.</span>
                    <span>One call, no pitch deck. You keep the plan whether or not we work together.</span>
                  </li>
                </ol>
              </div>
            </div>

            <div>
              <div className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-8 dark:border-neutral-800 dark:bg-neutral-950">
                <EnquiryForm ctaId="consult-page-form" />
              </div>
              {/* Real trust signals only: the live blog, the free consult, the
                  month-to-month terms. No logos, no stats, no testimonials —
                  there are no clients yet and the page doesn't pretend. */}
              <ul className="mt-6 space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
                <li>Free, 30 minutes, no card and no commitment.</li>
                <li>
                  Retainers run month to month — the call tells you straight
                  whether you need one.{" "}
                  <a href="/#pricing" className="font-medium text-neutral-600 underline underline-offset-4 hover:text-emerald-700 dark:text-neutral-300 dark:hover:text-emerald-400">
                    See pricing
                  </a>
                  .
                </li>
                <li>
                  Want to see how we think first?{" "}
                  <a href="/blog" className="font-medium text-neutral-600 underline underline-offset-4 hover:text-emerald-700 dark:text-neutral-300 dark:hover:text-emerald-400">
                    Read the blog
                  </a>
                  .
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ConsentBanner />
    </div>
  );
}
