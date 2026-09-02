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
  PolicyShell,
  Ul,
} from "~/components/policy";

function RefundPolicy() {
  return (
    <PolicyShell title="Refund Policy" lastUpdated="2026-09-02">
      <P>
        <strong>Status: Ratified v1.0</strong> — 2026-09-02, prepared from the
        owner's ratified decisions and legal's recommended defaults (flagged in
        the cover memo for owner confirmation). Supersedes Working Draft 0.1.
        This policy takes effect on the date the owner publishes it. Written
        honestly: what's refundable, what's not, and how to ask. No invented
        guarantees, no &quot;100% money-back&quot; promises we don't mean.
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
            <strong>Free cancellation window:</strong> cancel within{" "}
            <strong>7 calendar days of signing</strong> and before we begin work,
            and you get a full refund of everything you paid — minus any agreed
            out-of-pocket costs already incurred on your behalf (for example,
            paid ad spend). We show you receipts for those costs.
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
            <strong>If we miss agreed deliverables in a cycle:</strong> we make
            it right first — we fix what was missed or credit it toward the next
            month's fees. If we can't make it right, you're entitled to a{" "}
            <strong>pro-rata refund for the undelivered portion</strong> of that
            cycle's fee.
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
            invoice — <strong>within 14 days of your refund being approved</strong>.
          </>,
        ]}
      />

      <DocHeading>5. Free trial (7-day)</DocHeading>
      <P>
        The 7-day free trial is exactly that — <strong>free</strong>. We take no
        card at signup, nothing is charged during the trial, and a trial signup
        that doesn't continue at day 7 is never billed. There is nothing to
        refund because nothing is ever charged.
      </P>
      <P>
        If you continue at day 7, billing starts: your first month of The
        Throughline is due and payment is set up then (Terms &amp; Conditions,
        Section 14). From that point the rest of this policy applies — and your
        first month is covered by every right in it, including the retainer
        remedy in Section 3.
      </P>

      <DocHeading>6. No hidden fine print</DocHeading>
      <Ul
        items={[
          <>
            Cancellation windows (Section 2), pro-rata rules (Section 3), and
            payment terms are set per engagement in writing. This policy states
            the general rules; the signed scope states the specifics.
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