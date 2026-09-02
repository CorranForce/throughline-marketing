import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [{ title: "Privacy Policy | Throughline Marketing" }],
  }),
});

import { CONTACT_EMAIL } from "~/components/site";
import {
  DocHeading,
  P,
  Pending,
  PolicyShell,
  Ul,
} from "~/components/policy";

const SUBPROCESSORS: { provider: string; purpose: string; status: string }[] = [
  {
    provider: "Neon",
    purpose: "Hosts the enquiry/trial database",
    status: "When the form + DB ships",
  },
  {
    provider: "PostHog",
    purpose: "Analytics (events only, no PII)",
    status: "Planned — after consent controls",
  },
  {
    provider: "Stripe",
    purpose: "Payment processing (card data stays with Stripe)",
    status: "Planned — when checkout goes live",
  },
  {
    provider: "ctomail.io",
    purpose: "Email hosting for our business inbox",
    status: "Live",
  },
];

function Privacy() {
  return (
    <PolicyShell title="Privacy Policy" lastUpdated="2026-09-02">
      <P>
        <strong>Status: Ratified v1.0</strong> — 2026-09-02, prepared from the
        owner's ratified decisions. Supersedes Working Draft 0.1. This policy
        takes effect on the date the owner publishes it on our site. Drafted in
        plain English against our actual practices and the compliance baseline's
        §4 checklist (all 14 clauses, in order). Where a practice doesn't exist
        yet, the policy says &quot;planned&quot; and claims nothing more. We hold
        no certifications and make no certification claims.
      </P>
      <P>
        <strong>Who we are.</strong> Throughline Marketing — a
        marketing-execution agency for early-stage startups and SMBs: strategy,
        content, and measurement on a monthly retainer or one-off campaign
        packages.{" "}
        <Pending inline>
          Legal entity name, registered address, and country, once confirmed.
        </Pending>
      </P>

      <DocHeading>1. Contact</DocHeading>
      <P>
        Questions, requests, and complaints about privacy go to our enquiry
        inbox:
      </P>
      <P>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-semibold text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-400"
        >
          {CONTACT_EMAIL}
        </a>
      </P>
      <P>We aim to respond within <strong>30 days</strong>.</P>

      <DocHeading>2. What data we collect</DocHeading>
      <Ul
        items={[
          <>
            <strong>(a) Enquiry form</strong> (when the form ships): your name,
            business email, company, and your message. Nothing else — we collect
            the minimum.
          </>,
          <>
            <strong>(b) Email enquiries:</strong> whatever you choose to send us.
            We keep the thread in our business inbox.
          </>,
          <>
            <strong>(c) Trial signups</strong> (when the trial opens): your name,
            business email, company, and what you tell us about your goals. The
            same minimum — nothing else.
          </>,
          <>
            <strong>(d) Analytics (planned):</strong> pseudonymous events — page
            views, clicks, scroll depth, which sections you saw, device and
            browser type, referrer, and UTM parameters.{" "}
            <strong>
              No names, emails, or other personal identifiers ever appear in
              analytics events.
            </strong>{" "}
            Form and trial data live in the database only, never in analytics.
          </>,
          <>
            <strong>(e) Payments (planned):</strong> your name, billing email,
            and invoice address. Card numbers are handled by our payment
            provider, Stripe — we never see or store them (Sections 9–10).
          </>,
        ]}
      />

      <DocHeading>3. Why we collect it</DocHeading>
      <Ul
        items={[
          <>to respond to your enquiries;</>,
          <>
            to run and secure our website (including anti-spam and anti-abuse);
          </>,
          <>
            to run the 7-day free trial and communicate about it (with your
            opt-in — Section 14);
          </>,
          <>to deliver the services you've engaged us for;</>,
          <>to process payments (planned);</>,
          <>to keep the accounting and tax records the law requires.</>,
        ]}
      />

      <DocHeading>4. Our legal reasons (lawful bases)</DocHeading>
      <P>
        We only process personal data where we have a legal reason:
      </P>
      <Ul
        items={[
          <>
            <strong>Legitimate interests</strong> — answering enquiries and
            protecting the site from abuse.
          </>,
          <>
            <strong>Consent</strong> — non-essential analytics for visitors in
            the EEA/UK (we ask first, and you can withdraw at any time), and
            trial-communication email (given by signing up for the trial,
            withdrawable at any time — Section 14).
          </>,
          <>
            <strong>Contract</strong> — payments and services when you become a
            client.
          </>,
          <>
            <strong>Legal obligation</strong> — invoicing and tax records.
          </>,
        ]}
      />

      <DocHeading>5. Where your data lives (storage &amp; location)</DocHeading>
      <Ul
        items={[
          <>
            <strong>Enquiry and trial data:</strong> a hosted database provided
            by <strong>Neon</strong>, in{" "}
            <Pending inline>
              the Neon database region; stated here when the owner confirms it
              at provisioning.
            </Pending>
          </>,
          <>
            <strong>Emails:</strong> our business inbox, hosted by our email
            provider (<strong>ctomail.io</strong>).
          </>,
          <>
            <strong>Analytics events (planned):</strong> <strong>PostHog</strong>{" "}
            — events only, no personal identifiers.
          </>,
          <>
            <strong>Payments (planned):</strong> <strong>Stripe</strong> — card
            data stays with Stripe, never on our systems.
          </>,
        ]}
      />
      <P>
        All of these are reputable providers, and we'll have data-processing
        agreements in place with each of them <strong>before</strong> they
        connect. We'll link each provider's own privacy policy alongside this
        one.
      </P>

      <DocHeading>6. Cookies &amp; analytics</DocHeading>
      <Ul
        items={[
          <>
            <strong>Today: none.</strong> No trackers, no analytics cookies,
            nothing that follows you around. We keep it that way until this
            policy is published and a consent mechanism exists.
          </>,
          <>
            <strong>When analytics connects (planned):</strong> visitors in the{" "}
            <strong>EEA/UK</strong> will see a consent banner, and tracking loads
            <strong> only after you accept</strong>. You can withdraw consent the
            same way. Visitors outside the EEA/UK will have analytics run
            without a banner.
          </>,
          <>We'll link PostHog's privacy policy here when analytics goes live.</>,
        ]}
      />

      <DocHeading>7. How long we keep data (retention)</DocHeading>
      <Ul
        items={[
          <>
            <strong>Analytics events:</strong> 12 months, then deleted —
            automated.
          </>,
          <>
            <strong>Enquiries and trial signups:</strong> while the conversation
            with you is active. If we don't start a project, or you don't
            continue after the trial, we don't keep your details on file
            indefinitely — ask us to delete and we will (Section 8).
          </>,
          <>
            <strong>Invoicing and accounting records:</strong> as long as
            applicable tax law requires.{" "}
            <Pending inline>
              the exact period depends on the owner's confirmed jurisdiction;
              we'll state the real number here once known.
            </Pending>
          </>,
        ]}
      />

      <DocHeading>8. Your rights</DocHeading>
      <P>
        Email our inbox (Section 1) and we'll act within 30 days. You can:
      </P>
      <Ul
        items={[
          <>
            <strong>access</strong> a copy of the data we hold about you;
          </>,
          <>
            <strong>correct</strong> inaccurate data;
          </>,
          <>
            <strong>erase</strong> your data — for form and trial data we erase
            by your lead ID, for emails we delete the thread;
          </>,
          <>
            <strong>restrict or object</strong> to processing (e.g. stop
            analytics tracking for you);
          </>,
          <>
            <strong>port</strong> your data in a usable format;
          </>,
          <>
            <strong>withdraw consent</strong> — for analytics, any time, via the
            banner or by email.
          </>,
        ]}
      />
      <P>
        You also have the right to <strong>complain to your data-protection
        supervisory authority</strong> (in the EEA or UK) if you believe we've
        mishandled your data.
      </P>

      <DocHeading>9. Who we share data with (subprocessors)</DocHeading>
      <P>
        Only the providers needed to run the business — named honestly, as they
        connect:
      </P>
      <div className="my-5 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {["Provider", "What for", "Status"].map((cell) => (
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
            {SUBPROCESSORS.map((row) => (
              <tr key={row.provider}>
                <td className="border-b border-neutral-200 px-4 py-3 font-medium text-neutral-900 dark:border-neutral-800 dark:text-white">
                  {row.provider}
                </td>
                <td className="border-b border-neutral-200 px-4 py-3 text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                  {row.purpose}
                </td>
                <td className="border-b border-neutral-200 px-4 py-3 text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <P>
        We <strong>never sell your data</strong>. We don't share it with anyone
        else, except where the law requires us to. Data-processing agreements
        will be in place with each provider before they connect.
      </P>

      <DocHeading>10. Payments</DocHeading>
      <P>
        When checkout goes live, payments are processed through{" "}
        <strong>Stripe-hosted checkout</strong>. You enter card details on
        Stripe's pages; the card number is transmitted and stored by Stripe, and{" "}
        <strong>never seen or stored by us</strong>. Stripe's privacy policy
        governs card processing — we'll link it here when checkout is live.
      </P>
      <P>
        During the 7-day free trial we don't capture a card. If you continue at
        day 7, we set up payment for your first month through Stripe-hosted
        checkout — that's the first time card details are involved.
      </P>

      <DocHeading>11. Children</DocHeading>
      <P>
        Our site is for businesses — the people who contact us are adults acting
        for companies. We don't knowingly collect children's data and we don't
        target children. If we ever learn we hold a child's data, we delete it.
      </P>

      <DocHeading>12. Security — stated honestly</DocHeading>
      <P>What's <strong>true today</strong>:</P>
      <Ul
        items={[
          <>the site runs over <strong>HTTPS</strong>;</>,
          <>
            access to the business inbox is limited to{" "}
            <strong>named team members</strong>;
          </>,
          <>
            we hold <strong>no card data</strong> on our systems;
          </>,
          <>we state no certifications.</>,
        ]}
      />
      <P>
        What's <strong>planned when the form and database ship</strong>:
      </P>
      <Ul
        items={[
          <>
            anti-spam checks on the form (honeypot field, rate limiting,
            validation) so junk submissions never enter the database;
          </>,
          <>
            database access limited to named team members, least-privilege, with
            encryption in transit and at rest.
          </>,
        ]}
      />
      <P>
        What's <strong>explicitly not true today</strong>: we hold{" "}
        <strong>no certifications</strong> — no ISO 27001 certificate, no SOC 2
        report, no PCI DSS validation, no external auditor. We won't claim any
        until we actually have them.
      </P>

      <DocHeading>13. Changes to this policy</DocHeading>
      <P>
        This policy is versioned (Version 1.0 above). If we make material
        changes, we'll post a notice on the site before they take effect, and
        older versions stay on file so the history is visible.
      </P>

      <DocHeading>14. Marketing email — the free trial</DocHeading>
      <P>
        Signing up for the 7-day free trial is your <strong>opt-in</strong> for
        us to email you about your trial, your account, and our services. Every
        email we send in that programme carries a working{" "}
        <strong>unsubscribe link</strong> — one click and we stop, with no
        questions. We send no unsolicited commercial email. You can also
        unsubscribe or update your preferences any time by emailing the inbox in
        Section 1.
      </P>
    </PolicyShell>
  );
}