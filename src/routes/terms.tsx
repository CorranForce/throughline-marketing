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
  TbdNote,
  Ul,
} from "~/components/policy";

function Terms() {
  return (
    <PolicyShell title="Terms & Conditions">
      <P>
        <strong>Status: WORKING DRAFT for owner review — not in force.</strong>
      </P>
      <P>
        Version 0.1 — 2026-09-02. Drafted by legal against how we actually operate.
        Nothing here is binding until the owner ratifies it and the business
        publishes it.
      </P>
      <P>
        <strong>Plain-English note:</strong> these terms are written to be read,
        not decoded. Where a term cannot be set yet because the owner hasn't
        decided it, the section says{" "}
        <strong>[PENDING OWNER DECISION]</strong> — nothing is invented.
      </P>

      <DocHeading>1. What these terms cover</DocHeading>
      <P>
        These are the standard Terms &amp; Conditions of Throughline Marketing
        (&quot;we&quot;, &quot;us&quot;, &quot;Throughline&quot;). They apply when
        you (&quot;you&quot;, &quot;the client&quot;) engage us for either of our
        two services:
      </P>
      <Ul
        items={[
          <>
            <strong>The Throughline</strong> — our monthly retainer (channel mix +
            content cadence, planned, produced, and measured month after month).
          </>,
          <>
            <strong>The Campaign</strong> — our fixed-scope, one-off campaign
            packages (messaging and channel plan, content/ads/landing assets,
            closing readout).
          </>,
        ]}
      />
      <P>
        Each engagement also has a written scope agreed before we start (Section
        2). If anything in your written scope conflicts with these terms, the
        written scope wins for that engagement.
      </P>
      <Pending>
        <P>
          The <strong>legal entity name</strong> and its{" "}
          <strong>country/state of registration</strong> are not finalised. Once
          the owner confirms them, they go here and in the Privacy Policy footer.
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
      <Ul
        items={[
          <>
            Runs <strong>month to month</strong>. No long-term lock-in.
          </>,
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
      <Ul
        items={[
          <>
            Fixed scope, fixed price, agreed in writing before we start:
            messaging and channel plan locked in the first week, content/ads/landing
            assets built to one brief, then a closing readout of what worked and
            what we'd do next time.
          </>,
          <>
            The price covers the agreed scope. Work outside scope is quoted
            separately and agreed in writing before we do it (Section 2).
          </>,
        ]}
      />
      <Pending>
        <P>
          <strong>Package price points</strong>,{" "}
          <strong>payment schedule</strong> (e.g. deposit vs 100% upfront), and
          what happens if deliverables are delayed by either side.
        </P>
      </Pending>

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
            Payment terms for each engagement are set in the written scope: the
            rate or price, when it's due, and how you pay. We don't charge prices
            that haven't been agreed in writing.
          </>,
          <>
            When payments go live, we accept payment through{" "}
            <strong>Stripe-hosted checkout</strong>. Card numbers go to Stripe
            and never touch our systems — see our Privacy Policy for the honest
            detail.
          </>,
          <>We may also invoice for certain engagements.</>,
        ]}
      />
      <Pending>
        <P>
          The actual <strong>price points</strong> (retainer rates, package
          prices), <strong>currency</strong>, invoicing terms (net payment
          period, late payment), and <strong>deposit structure</strong>. Once the
          owner sets these, they appear in this section and in each written scope.
        </P>
      </Pending>

      <DocHeading>8. Cancellation and notice</DocHeading>
      <Ul
        items={[
          <>
            <strong>Retainers:</strong> cancel at the end of any billing cycle.
            We ask for notice before the current cycle ends.{" "}
            <Pending inline>
              The exact notice window (e.g. X days before renewal) will be stated
              in each engagement once the owner sets it.
            </Pending>
          </>,
          <>
            <strong>Packages:</strong> cancel before we start — see the Refund
            Policy for what's refundable and when.
          </>,
          <>
            If you breach these terms or don't pay, we can pause work or end the
            engagement after written notice and a short cure period (we'll state
            the cure period per engagement; <Pending inline>standard cure window</Pending>).
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
        We don't guarantee specific outcomes. No &quot;X pipeline in Y months&quot;
        promises, no fabricated numbers, no manufactured timelines. What we do
        promise:
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
      <Pending>
        <P>
          This liability cap is a reasonable market default; the owner should
          confirm it before ratification.
        </P>
      </Pending>

      <DocHeading>13. Disputes</DocHeading>
      <P>
        First, talk: contact us and give us a genuine chance to fix the issue.{" "}
        <Pending inline>Formal response window for dispute notices.</Pending> If
        we can't resolve it, any claim goes to{" "}
        <Pending inline>
          Governing law and forum, once the owner confirms the business's
          jurisdiction. Draft default: the exclusive jurisdiction of the courts
          of the owner's confirmed jurisdiction.
        </Pending>
      </P>

      <DocHeading>
        14. The 7-day free trial —{" "}
        <span className="text-amber-700 dark:text-amber-400">pending owner decision</span>
      </DocHeading>
      <TbdNote>
        <P>
          The business plan includes a 7-day free trial. Its terms — what's
          included in the trial, when billing starts after day 7, whether a card
          is required up front, what happens at the end of the trial — are{" "}
          <strong>not decided yet</strong>. This section is intentionally open
          until the owner defines the trial.
        </P>
        <P>
          <strong>The trial will not launch before these terms exist.</strong>
        </P>
      </TbdNote>

      <DocHeading>15. Versioning and ratification</DocHeading>
      <P>
        This is Working Draft 0.1, dated 2026-09-02. It is{" "}
        <strong>not in force</strong>. When the owner ratifies a version — after
        the pending decisions above are made — we'll publish it with an effective
        date and renumber it. We keep old versions on file so changes stay
        visible.
      </P>
    </PolicyShell>
  );
}