import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [{ title: "Terms & Conditions | Throughline Marketing" }],
  }),
});

import {
  DocHeading,
  P,
  Pending,
  PolicyShell,
  Ul,
} from "~/components/policy";

const RETAINER_TIERS: { tier: string; price: string; scope: string }[] = [
  {
    tier: "Essentials",
    price: "$2,500",
    scope: "1–2 channels; roughly 4–6 pieces of content shipped a month; monthly readout",
  },
  {
    tier: "Growth (flagship)",
    price: "$4,000",
    scope: "2–3 channels; roughly 8–12 pieces a month; strategy support; monthly readout",
  },
  {
    tier: "Scale",
    price: "$6,000",
    scope: "3+ channels; roughly 12–16 pieces a month; quarterly deep-dive",
  },
];

function Terms() {
  return (
    <PolicyShell title="Terms & Conditions" lastUpdated="2026-09-02">
      <P>
        <strong>Status: Ratified v1.0</strong> — 2026-09-02, prepared from the
        owner's ratified decisions (retainer pricing, package pricing, and
        free-trial terms). Supersedes Working Draft 0.1. These terms take effect
        on the date the owner publishes them; that date is the Effective Date.
      </P>
      <P>
        <strong>Plain-English note:</strong> these terms are written to be read,
        not decoded. Two items genuinely can't be set until the owner decides
        them — the legal entity name (Section 1) and governing law/jurisdiction
        (Section 13). Both are marked [PENDING OWNER DECISION], and nothing is
        invented around them.
      </P>

      <DocHeading>1. What these terms cover</DocHeading>
      <P>
        These are the standard Terms &amp; Conditions of Throughline Marketing
        (&quot;Throughline&quot;, &quot;we&quot;, &quot;us&quot;). They apply
        when you (&quot;you&quot;, &quot;the client&quot;) engage us for either
        of our two services:
      </P>
      <Ul
        items={[
          <>
            <strong>The Throughline</strong> — our monthly retainer (channel mix
            + content cadence, planned, produced, and measured month after
            month).
          </>,
          <>
            <strong>The Campaign</strong> — our fixed-scope, one-off campaign
            packages (messaging and channel plan, content/ads/landing assets,
            closing readout).
          </>,
        ]}
      />
      <P>
        All prices in this document are in <strong>US dollars (USD)</strong>{" "}
        unless a written scope says otherwise.
      </P>
      <P>
        Each engagement also has a written scope agreed before we start (Section
        2). If anything in your written scope conflicts with these terms, the
        written scope wins for that engagement.
      </P>
      <Pending>
        <P>
          The <strong>legal entity name</strong> and its{" "}
          <strong>country/state of registration</strong> are not finalised. Once
          the owner confirms them, they go here and in the Privacy Policy header.
        </P>
      </Pending>

      <DocHeading>2. Scope is agreed in writing before we start</DocHeading>
      <P>
        We don't start work on a handshake. Before any engagement we agree in
        writing:
      </P>
      <Ul
        items={[
          <>what's in and what's out of scope;</>,
          <>
            the channels, the content cadence (retainers), and the deliverables
            and timeline (packages);
          </>,
          <>the metrics we'll report against;</>,
          <>the rate or price, and payment terms.</>,
        ]}
      />
      <P>
        You approve that written scope before we begin. If you want to change
        scope mid-engagement, we confirm the change in writing — including any
        effect on price or timing — before we do the extra work.
      </P>

      <DocHeading>3. The Throughline — monthly retainer</DocHeading>
      <P>
        Three tiers, all <strong>month to month</strong> — no long-term lock-in.
        Stop at the end of any billing cycle (Section 8).
      </P>
      <div className="my-5 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {["Tier", "Monthly price (USD)", "Standard scope"].map((cell) => (
                <th
                  key={cell}
                  className="border-b border-neutral-300 bg-neutral-50 px-4 py-3 text-left font-semibold text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RETAINER_TIERS.map((row) => (
              <tr key={row.tier}>
                <td className="border-b border-neutral-200 px-4 py-3 font-medium text-neutral-900 dark:border-neutral-800 dark:text-white">
                  {row.tier}
                </td>
                <td className="border-b border-neutral-200 px-4 py-3 text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                  {row.price}
                </td>
                <td className="border-b border-neutral-200 px-4 py-3 text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                  {row.scope}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <P>
        Your written scope states the exact channel mix, content cadence, and
        metrics for your tier. The table is the standard shape of each tier —
        the written scope is what we're actually accountable to.
      </P>
      <Ul
        items={[
          <>
            Each month we deliver the agreed channel mix and content cadence,
            plus a monthly readout: what moved, what didn't, and what we change
            next.
          </>,
          <>
            Metrics are agreed at the start of the engagement — pipeline, leads,
            conversions — tied to the channels we run. We report against them
            honestly every month.
          </>,
          <>
            We don't guarantee specific results (Section 11). Paid and email can
            move in weeks; content compounds over months. We say what to expect
            per channel, per your situation, before you sign.
          </>,
        ]}
      />

      <DocHeading>4. The Campaign — one-off packages</DocHeading>
      <P>
        Two fixed-scope packages, fixed price, agreed in writing before we start:
      </P>
      <Ul
        items={[
          <>
            <strong>Launch package: $2,000–3,500.</strong> Messaging and channel
            plan locked in week 1; content, ads, and landing assets built to one
            brief; then a closing readout of what worked and what we'd do next
            time.
          </>,
          <>
            <strong>Seasonal push: $1,500–2,500.</strong> Same shape, shorter
            scope, built for a defined moment — a release, a season, an event.
          </>,
        ]}
      />
      <P>
        The exact price within a package's range is set by the scope and fixed in
        your written scope before we start. There's{" "}
        <strong>no separate setup fee</strong> — the kickoff is included in the
        package price.
      </P>
      <P>
        The price covers the agreed scope. Work outside scope is quoted
        separately and agreed in writing before we do it (Section 2).
      </P>
      <P>
        If we're running late, we tell you in writing and make it right (Sections
        11–12). If you're late with what we need from you (Section 6), the
        schedule shifts — we say so in writing.
      </P>

      <DocHeading>5. Who does the work</DocHeading>
      <P>
        Our own team: strategist, writers, and measurement lead. No white-label
        hand-offs, no juniors swapped in after the pitch. You'll know who's on
        your account. If a team member changes, we tell you.
      </P>

      <DocHeading>6. What we need from you</DocHeading>
      <P>
        The basics: access to your product, your pricing, and your analytics,
        plus an hour or two for kickoff. You review, you don't produce — the
        review points are in the written scope. Delays on your side (late
        feedback, missing access) may push back the schedule; we'll say so in
        writing when they do.
      </P>

      <DocHeading>7. Payment</DocHeading>
      <Ul
        items={[
          <>
            Prices are set in this document (Sections 3–4) or in your written
            scope. We never charge a price that hasn't been agreed in writing.
          </>,
          <>
            Payment terms for each engagement are set in the written scope: when
            the fee is due and how you pay.
          </>,
          <>
            We accept payment through <strong>Stripe-hosted checkout</strong>.
            Card numbers go to Stripe and never touch our systems — see our
            Privacy Policy for the honest detail. We may also invoice for certain
            engagements.
          </>,
          <>
            <strong>Free trial:</strong> we don't take a card during the 7-day
            trial and nothing is charged at signup. If you continue at day 7,
            your first monthly fee is due and we set up payment then (Section
            14).
          </>,
        ]}
      />

      <DocHeading>8. Cancellation and notice</DocHeading>
      <Ul
        items={[
          <>
            <strong>Retainers:</strong> month to month. Cancel at the end of any
            billing cycle — send notice before the cycle ends and you won't be
            charged for the next one; if notice arrives after the cycle has
            rolled, your cancellation takes effect at the end of that (already
            paid) cycle. No lock-in, no exit fee.
          </>,
          <>
            <strong>Packages:</strong> cancel within 7 calendar days of signing
            for a refund of everything you paid, minus agreed out-of-pocket costs
            already spent on your behalf (we show receipts) — see the Refund
            Policy for the detail.
          </>,
          <>
            If you breach these terms or don't pay, we can pause work or end the
            engagement after written notice and a 7-day window to fix the
            problem.
          </>,
          <>
            We end an engagement only the way this section or the Refund Policy
            describes — never without telling you in writing.
          </>,
        ]}
      />

      <DocHeading>9. Who owns what (IP)</DocHeading>
      <Ul
        items={[
          <>
            <strong>You own your materials:</strong> your product, your content,
            your data, your brand assets — everything you give us stays yours.
          </>,
          <>
            <strong>We own our pre-existing materials:</strong> our processes,
            templates, frameworks, tooling, and anything we built before your
            engagement.
          </>,
          <>
            <strong>Deliverables:</strong> the content, ads, and landing assets
            we produce for you under the engagement are for your use in your
            business. Concretely, you receive an irrevocable, royalty-free
            license to use the deliverables for your own business for as long as
            you like. We keep ownership of the underlying work product, and we
            keep the right to reuse our general know-how, templates, and internal
            tools — but we never reuse your confidential information, and we
            never reuse finished deliverables that carry your brand identity for
            any other client.
          </>,
          <>
            If a client needs different IP terms (e.g. full transfer), we can
            agree that in writing per engagement — we'll say plainly what that
            changes.
          </>,
        ]}
      />

      <DocHeading>10. Confidentiality (mutual)</DocHeading>
      <P>
        Both sides see confidential information in an engagement: your product,
        pricing, analytics, and messaging; our processes, rates, and methods.
        Mutually, we agree:
      </P>
      <Ul
        items={[
          <>to keep each other's confidential information confidential;</>,
          <>to use it only for the engagement;</>,
          <>
            not to share it outside the people and providers needed to do the
            work (per our Privacy Policy).
          </>,
        ]}
      />
      <P>
        This obligation survives the end of the engagement. If a client requires
        a signed NDA, we'll review and negotiate it before signing — we prefer a
        mutual NDA, with obligations we can genuinely meet (no inventing security
        postures, per our compliance baseline).
      </P>

      <DocHeading>11. Honest promises about results</DocHeading>
      <P>
        We don't guarantee specific outcomes. No &quot;X pipeline in Y
        months&quot; promises, no fabricated numbers, no manufactured timelines.
        What we do promise:
      </P>
      <Ul
        items={[
          <>we'll do the agreed work on schedule;</>,
          <>we'll report honestly against the agreed metrics;</>,
          <>if a channel isn't working, we'll say so and change it.</>,
        ]}
      />

      <DocHeading>12. Liability — honest limits</DocHeading>
      <Ul
        items={[
          <>We're accountable for doing the work we agreed to do.</>,
          <>
            Our total liability for any claim under an engagement is capped at
            the fees you paid us for that engagement in the 12 months before the
            claim.
          </>,
          <>
            We're not liable for indirect or consequential losses (lost revenue,
            lost profits, lost opportunity) — but nothing here excludes
            liability we can't legally exclude, such as fraud or liability that
            can't be limited by law.
          </>,
          <>
            You're responsible for how you use the deliverables and for the
            business decisions you make from the metrics we report.
          </>,
        ]}
      />

      <DocHeading>13. Disputes</DocHeading>
      <P>
        First, talk: contact us and give us <strong>30 days</strong> to fix the
        issue (the same window our Privacy Policy uses for responses). If we
        can't resolve it, any claim goes to{" "}
        <Pending inline>
          governing law and forum. The owner hasn't confirmed the business's
          jurisdiction yet; this is the one open item left in these terms. Once
          set, this clause is complete.
        </Pending>
      </P>

      <DocHeading>14. The 7-day free trial</DocHeading>
      <P>
        New The Throughline engagements can start with a 7-day free trial. The
        trial is the strategy kickoff week, done properly:
      </P>
      <Ul
        items={[
          <>a quick audit of where you are now;</>,
          <>
            a channel plan — which channels, why, and in what order;
          </>,
          <>
            a content plan — the shape of your first month's content cadence;
          </>,
          <>
            a measurement baseline — the metrics we'll report against if you
            continue.
          </>,
        ]}
      />
      <P>
        <strong>The trial is free.</strong> We don't take a card during the 7
        days and nothing is charged at signup. Signing up does one thing besides
        the work: it's your opt-in for us to email you about the trial, your
        account, and our services — every such email has a working unsubscribe
        link, and we send no unsolicited email (Privacy Policy, Section 14).
      </P>
      <P>At day 7 you decide:</P>
      <Ul
        items={[
          <>
            <strong>Continue</strong> — billing starts: your first month of The
            Throughline is due, we set up payment for it, and the engagement
            becomes month-to-month from there (Section 3). The trial's channel
            plan, content plan, and measurement baseline carry straight into your
            first month.
          </>,
          <>
            <strong>Stop</strong> — no charge, and nothing to refund. The trial
            work — your audit, channel plan, content plan, and measurement
            baseline — stays with you either way.
          </>,
        ]}
      />
      <P>
        Trial signups that don't continue are never billed (Refund Policy,
        Section 5).
      </P>

      <DocHeading>15. Versioning and ratification</DocHeading>
      <P>
        Ratified version 1.0, dated 2026-09-02. The owner's decisions on pricing,
        packages, and the free trial are folded in. These terms take effect on
        the date the owner publishes them (the Effective Date). Working Draft 0.1
        stays on file, and old versions of any document stay on file too, so
        changes stay visible.
      </P>
    </PolicyShell>
  );
}