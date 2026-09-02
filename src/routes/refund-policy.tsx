import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/refund-policy")({
  component: RefundPolicy,
  head: () => ({
    meta: [{ title: "Refund Policy | Throughline Marketing" }],
  }),
});

import { CONTACT_EMAIL } from "~/components/site";
import {
  DocHeading,
  Ol,
  P,
  Pending,
  PolicyShell,
  TbdNote,
  Ul,
} from "~/components/policy";

function RefundPolicy() {
  return (
    <PolicyShell title="Refund Policy">
      <P>
        <strong>Status: WORKING DRAFT for owner review — not in force.</strong>
      </P>
      <P>
        Version 0.1 — 2026-09-02. Written honestly: what's refundable, what's
        not, and how to ask. No invented guarantees, no &quot;100% money-back&quot;
        promises we don't mean.
      </P>

      <DocHeading>1. What this policy covers</DocHeading>
      <P>It covers the services we sell:</P>
      <Ul
        items={[
          <>
            <strong>The Throughline</strong> — monthly retainer;
          </>,
          <>
            <strong>The Campaign</strong> — one-off campaign packages.
          </>,
        ]}
      />
      <P>
        Refunds are returned in the currency you paid. More specific terms in a
        signed engagement override this policy for that engagement; this policy
        is the floor.
      </P>

      <DocHeading>2. Campaign packages (one-off)</DocHeading>
      <Ul
        items={[
          <>
            <strong>Before we start:</strong> if you cancel before we begin the
            work, you get a refund of what you paid — minus any agreed
            out-of-pocket costs already incurred on your behalf (for example,
            paid ad spend). We show you receipts for those costs.
          </>,
          <>
            <Pending inline>
              A free-cancellation window (e.g. X days after signing) or none at
              all. Not yet set.
            </Pending>
          </>,
          <>
            <strong>Defects, not cancellations:</strong> if we deliver something
            that doesn't match the agreed written scope, tell us and we'll fix it
            at no extra charge. That's the remedy for missing scope — not a
            refund for work already delivered.
          </>,
          <>
            <strong>Once delivered:</strong> non-refundable. The work was done.
          </>,
          <>
            <strong>If we can't complete:</strong> if we stop before finishing
            the package, you get a refund for the undelivered portion, valued
            fairly against the package price.
          </>,
        ]}
      />

      <DocHeading>3. Retainers (The Throughline)</DocHeading>
      <Ul
        items={[
          <>
            Retainers are <strong>month to month</strong> — no lock-in. Cancel
            with notice at the end of any billing cycle (see our Terms &amp;
            Conditions, Section 8). With timely notice you're not charged for the
            next cycle.
          </>,
          <>
            <strong>The current cycle's fee is non-refundable once the cycle
            runs</strong> — that month's work was scheduled and delivered. That's
            the honest default: you pay for the month you got.
          </>,
          <>
            If <strong>we</strong> end the engagement for your breach or
            non-payment, there's no refund for the current cycle.
          </>,
          <>
            If we miss agreed deliverables in a cycle and don't make it right,{" "}
            <Pending inline>
              Remedy the owner must set: pro-rata refund for the undelivered
              portion, or a credit toward the next month. Our draft default is:
              we make it right first (fix or credit); if we can't, you're
              entitled to a pro-rata refund for what wasn't delivered.
            </Pending>
          </>,
        ]}
      />

      <DocHeading>4. How to request a refund</DocHeading>
      <Ol
        items={[
          <>
            Email <strong>{CONTACT_EMAIL}</strong> with your name, the
            engagement or invoice reference, and why you're asking.
          </>,
          <>
            We respond within <strong>30 days</strong> (matching our
            privacy-policy response target).
          </>,
          <>
            If approved, we refund via the <strong>original payment method</strong>{" "}
            — a Stripe refund if you paid by card, a bank transfer if you paid by
            invoice.{" "}
            <Pending inline>
              Refund processing window (e.g. X business days) once the owner
              sets it.
            </Pending>
          </>,
        ]}
      />

      <DocHeading>
        5. Free trial (7-day) —{" "}
        <span className="text-amber-700 dark:text-amber-400">terms TBD</span>
      </DocHeading>
      <TbdNote>
        <P>
          The business plan includes a 7-day free trial, and its refund terms{" "}
          <strong>cannot be written yet</strong>. The owner has not decided:
        </P>
        <Ul
          items={[
            <>what the trial includes;</>,
            <>when billing starts after day 7;</>,
            <>whether a card is captured at signup;</>,
            <>what happens at the end of the trial.</>,
          ]}
        />
        <P>
          This section stays open until those decisions are made.{" "}
          <strong>
            The trial will not launch and no trial-related charges will occur
            before this section is written and ratified.
          </strong>{" "}
          When it is, this policy will say exactly what's refundable for trial
          conversions — and it will be honest about it.
        </P>
      </TbdNote>

      <DocHeading>6. No hidden fine print</DocHeading>
      <Ul
        items={[
          <>
            Deposit percentages, cancellation windows, and pro-rata rules are set
            per engagement in writing. This policy states the general rules; the
            signed scope states the specifics.
          </>,
          <>
            If these terms ever change, the version in force is the one dated and
            published — we keep old versions on file.
          </>,
        ]}
      />
    </PolicyShell>
  );
}