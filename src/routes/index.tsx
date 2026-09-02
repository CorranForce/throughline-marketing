import { createFileRoute } from "@tanstack/react-router";
import {
  BOOK_CTA,
  BookButton,
  CheckIcon,
  SectionTag,
  SiteFooter,
  SiteHeader,
} from "~/components/site";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-white dark:bg-neutral-950">
      {/* ============ 1. Header / nav ============ */}
      <SiteHeader />

      <main id="top">
        {/* ============ 2. Hero ============ */}
        <section className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                End-to-end marketing for early-stage startups
              </p>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">
                The missing piece isn't strategy. It's throughput.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-neutral-600 sm:text-xl dark:text-neutral-400">
                Throughline Marketing is end-to-end campaign execution — strategy, content, and measurement — so you can
                launch and sustain marketing without hiring a full in-house team.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <BookButton />
                <a
                  href="#how-it-works"
                  className="inline-flex items-center rounded-lg px-5 py-3 text-sm font-medium text-neutral-700 ring-1 ring-neutral-300 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:ring-neutral-700 dark:hover:bg-neutral-900 dark:hover:text-white"
                >
                  See how it works
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/hero-throughline.webp"
                alt="Abstract motif of a continuous thread weaving through three points — the throughline from strategy to content to measurement"
                width={1200}
                height={800}
                loading="eager"
                className="w-full rounded-2xl border border-neutral-200 shadow-sm dark:border-neutral-800"
              />
            </div>
          </div>
        </section>

        {/* ============ 3. The problem we solve ============ */}
        <section className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/40">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:px-8">
            <SectionTag>The problem we solve</SectionTag>
            <p className="max-w-3xl text-xl leading-relaxed text-pretty text-neutral-700 sm:text-2xl dark:text-neutral-300">
              Marketing works when it's consistent: strategy one week, content the next, campaigns that ship on
              schedule, month after month. That consistency is exactly what early-stage teams lack — the founder is
              the bottleneck, and every launch is a scramble. Throughline is the throughput: a team that plans,
              produces, and measures, so the pipeline stays full while you run the business.
            </p>
          </div>
        </section>

        {/* ============ 4. Services ============ */}
        <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:py-24 lg:px-8">
          <SectionTag>Services</SectionTag>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Two ways to work with us</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="flex flex-col rounded-xl border border-neutral-200 p-8 dark:border-neutral-800">
              <h3 className="text-xl font-semibold">The Throughline</h3>
              <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">Monthly retainer</p>
              <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                A channel mix and content cadence, planned, produced, and measured — month after month.
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {[
                  "A channel mix matched to your buyers, not a spray across every platform.",
                  "A content cadence you can count on, shipped on schedule every week.",
                  "A monthly readout: what moved, what didn't, and what we change next.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckIcon />
                    <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col rounded-xl border border-neutral-200 p-8 dark:border-neutral-800">
              <h3 className="text-xl font-semibold">The Campaign</h3>
              <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">One-off packages</p>
              <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                Fixed-scope work you can point at one launch or seasonal push.
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {[
                  "Messaging and channel plan locked in the first week.",
                  "Content, ads, and landing assets built to one brief.",
                  "A closing readout: what worked and what we'd do next time.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckIcon />
                    <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============ 5. Pricing ============ */}
        <section id="pricing" className="border-t border-neutral-200 bg-neutral-50 scroll-mt-24 dark:border-neutral-800 dark:bg-neutral-900/40">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:px-8">
            <SectionTag>Pricing</SectionTag>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Flat monthly pricing, no lock-in</h2>
            <p className="mt-4 max-w-2xl text-neutral-600 dark:text-neutral-400">
              Retainers are month to month — stop at the end of any billing cycle. Campaign packages are fixed-scope
              and fixed-price. No separate setup fee, ever.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "Essentials",
                  price: "$2,500",
                  cadence: "per month",
                  blurb: "For teams that need consistent marketing throughput, one channel at a time.",
                  features: [
                    "1–2 channels",
                    "~4–6 pieces of content shipped a month",
                    "Monthly readout: what moved, what didn't, what we change next",
                  ],
                  popular: false,
                },
                {
                  name: "Growth",
                  price: "$4,000",
                  cadence: "per month",
                  blurb: "Our flagship. A wider channel mix plus strategy support, month after month.",
                  features: [
                    "2–3 channels",
                    "~8–12 pieces of content shipped a month",
                    "Strategy support",
                    "Monthly readout: what moved, what didn't, what we change next",
                  ],
                  popular: true,
                },
                {
                  name: "Scale",
                  price: "$6,000",
                  cadence: "per month",
                  blurb: "For teams ready to run more channels with a quarterly deep-dive on what's compounding.",
                  features: [
                    "3+ channels",
                    "~12–16 pieces of content shipped a month",
                    "Quarterly deep-dive",
                  ],
                  popular: false,
                },
              ].map((tier) => (
                <div
                  key={tier.name}
                  className={`relative flex flex-col rounded-xl border p-8 ${
                    tier.popular
                      ? "border-emerald-600 shadow-lg dark:border-emerald-500"
                      : "border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950"
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-8 rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white dark:bg-emerald-500 dark:text-neutral-950">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-xl font-semibold">{tier.name}</h3>
                  <p className="mt-4 text-3xl font-bold tracking-tight">
                    {tier.price}
                    <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400"> {tier.cadence}</span>
                  </p>
                  <p className="mt-4 text-neutral-600 dark:text-neutral-400">{tier.blurb}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.features.map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckIcon />
                        <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={BOOK_CTA}
                    className={`mt-8 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium transition-colors ${
                      tier.popular
                        ? "bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                        : "text-neutral-700 ring-1 ring-neutral-300 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:ring-neutral-700 dark:hover:bg-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    Book a strategy call
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-950">
                <h3 className="text-xl font-semibold">The Campaign — one-off packages</h3>
                <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  Fixed scope, fixed price. No separate setup fee.
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex flex-col gap-1">
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      Launch <span className="text-neutral-400 dark:text-neutral-500">·</span> $2,000–3,500
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Messaging and channel plan locked in week 1; content, ads, and landing assets built to one brief;
                      a closing readout of what worked and what we'd do next time.
                    </span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      Seasonal push <span className="text-neutral-400 dark:text-neutral-500">·</span> $1,500–2,500
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Same shape, shorter scope, built for a defined moment — a release, a season, an event.
                    </span>
                  </li>
                </ul>
                <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">
                  The exact price within a range is fixed in your written scope before we start.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-950">
                <h3 className="text-xl font-semibold">7-day free trial — the strategy kickoff week</h3>
                <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                  New Throughline engagements start with a free trial week: a quick audit of where you are now, a
                  channel plan, a content plan, and a measurement baseline.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "No card during the trial — nothing is charged at signup.",
                    "At day 7 you continue (billing starts, month to month from there) or stop — free.",
                    "The trial work — audit, channel plan, content plan, measurement baseline — stays with you either way.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckIcon />
                      <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 text-center">
              <a
                href={BOOK_CTA}
                className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                Book a strategy call
              </a>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Not sure which tier fits? The strategy call is free — we'll tell you straight.
              </p>
            </div>
          </div>
        </section>

        {/* ============ 6. Who it's for ============ */}
        <section className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/40">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:px-8">
            <SectionTag>Who it's for</SectionTag>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">This is for teams that look like you</h2>
            <ul className="mt-10 space-y-5 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
              {[
                "Founders who are their own entire marketing team — and it's now the bottleneck.",
                "Founders who hired a fractional CMO for strategy but have no one to execute it.",
                "Early-stage teams with product-market fit, growing in stops and starts.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mt-1.5 h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.5 7.5a1 1 0 0 1-1.418.002L3.29 9.31a1 1 0 1 1 1.42-1.41l4.29 4.29 6.29-6.29a1 1 0 0 1 1.414-.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ 7. How it works ============ */}
        <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:py-24 lg:px-8">
          <SectionTag>How it works</SectionTag>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Four steps, no open-ended process</h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Tell us the goal and where you're stuck — one call, no pitch deck.",
              "We map the channel mix and content plan to your buyers and your bandwidth.",
              "We execute on the schedule — you review, you don't produce.",
              "You get a monthly readout with what we change next.",
            ].map((step, i) => (
              <li key={step} className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  Step {i + 1}
                  <span aria-hidden className="ml-2 text-neutral-300 dark:text-neutral-700">
                    /
                  </span>
                  <span aria-hidden className="ml-1 text-neutral-400 dark:text-neutral-600">
                    04
                  </span>
                </span>
                <p className="text-neutral-700 dark:text-neutral-300">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ============ 8. Social proof (placeholder, do not publish) ============ */}
        <section className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/40">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:px-8">
            <SectionTag>Social proof</SectionTag>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Proof over promises</h2>
            <div className="mt-10 max-w-2xl rounded-xl border border-dashed border-neutral-300 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-900">
              <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Coming soon
              </p>
              <p className="mt-3 text-neutral-600 dark:text-neutral-400">
                This section is reserved for client results — quotes and outcome metrics from real engagements.
                It stays empty until there is real work to show.
              </p>
            </div>
          </div>
        </section>

        {/* ============ 9. FAQ ============ */}
        <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-20 sm:py-24">
          <SectionTag>FAQ</SectionTag>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Questions, answered straight</h2>
          <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
            {[
              {
                q: "What's included in the monthly retainer?",
                a: "A defined channel mix and content cadence — strategy, production, publishing, and measurement. What's in scope and what isn't is agreed in writing at the start, so there are no surprises on the invoice.",
              },
              {
                q: "How fast do we start seeing results?",
                a: "That depends on your market and channels, and we'll be straight with you before you sign: paid and email can move in weeks; content compounds over months. The plan spells out what to expect from each channel per your situation. We don't promise uniform timelines.",
              },
              {
                q: "Who actually does the work?",
                a: "Our team — strategist, writers, and measurement lead. No white-label hand-offs, no juniors swapped in after the pitch. You'll know who's on your account.",
              },
              {
                q: "Can we stop anytime?",
                a: "Yes. Retainers run month to month — stop at the end of any billing cycle. We'd rather earn a renewal than lock one in.",
              },
              {
                q: "What do you need from us to start?",
                a: "The basics: access to your product, your pricing, and your analytics, plus an hour or two for the kickoff. We do the heavy lifting from there. You're in the loop for review, not production.",
              },
              {
                q: "How do we know it's working?",
                a: "Every engagement has agreed metrics from day one — pipeline, leads, conversions — tied to the channels we run. You get a monthly readout against those numbers. If a channel isn't working, we say so and change it. That's the deal.",
              },
            ].map(({ q, a }) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-medium sm:text-lg">
                  {q}
                  <span
                    aria-hidden
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-transform group-open:rotate-45 dark:border-neutral-700 dark:text-neutral-400"
                  >
                    <svg viewBox="0 0 12 12" fill="currentColor" className="h-3 w-3">
                      <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ============ 10. Final CTA ============ */}
        <section className="relative overflow-hidden border-t border-neutral-200 bg-neutral-900 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <div className="pointer-events-none absolute inset-0 opacity-55" aria-hidden>
            <img
              src="/images/cta-texture.webp"
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              You built the product. We'll build the pipeline.
            </h2>
            <div className="mt-10">
              <a
                href={BOOK_CTA}
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
              >
                Book a strategy call
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ============ 10. Footer ============ */}
      <SiteFooter />
    </div>
  );
}