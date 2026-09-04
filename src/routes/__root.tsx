import { HeadContent, Outlet, Scripts, createRootRoute, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import type { ReactNode } from "react";

import appCss from "~/styles/app.css?url";
import { ensureGtagLoaded, sendGa4PageView } from "~/lib/analytics";
import { consentStore } from "~/lib/consent";

// Absolute origin for social-card metadata (og:image etc.). Scrapers require an
// absolute URL; the live site origin is the only public origin the cards will
// be fetched from once published.
const SITE_ORIGIN = "https://56837846f7a044416ea4911e5b3a5c3f.ctonew.app";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Throughline Marketing | Marketing Execution for Startups" },
      {
        name: "description",
        content:
          "End-to-end marketing execution for early-stage startups and SMBs: strategy, content, and measurement on a monthly retainer — no in-house team required.",
      },
      { property: "og:title", content: "Throughline Marketing | Marketing Execution for Startups" },
      {
        property: "og:description",
        content:
          "End-to-end marketing execution for early-stage startups and SMBs: strategy, content, and measurement on a monthly retainer — no in-house team required.",
      },
      { property: "og:image", content: `${SITE_ORIGIN}/images/og-1200x630.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Throughline Marketing | Marketing Execution for Startups" },
      {
        name: "twitter:description",
        content:
          "End-to-end marketing execution for early-stage startups and SMBs: strategy, content, and measurement on a monthly retainer — no in-house team required.",
      },
      { name: "twitter:image", content: `${SITE_ORIGIN}/images/og-1200x630.jpg` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  notFoundComponent: () => <div>Page not found</div>,
  component: RootComponent,
});

function RootComponent() {
  // GA4 (owner-chosen backend, consent-gated): if the visitor accepted on a
  // previous visit, load gtag on first client render (nothing loads before a
  // choice); accept during this visit also triggers the load via the consent
  // subscription below. Decline/undecided: gtag never loads.
  useEffect(() => {
    ensureGtagLoaded();
    return consentStore.subscribe((c) => {
      if (c === "accepted") ensureGtagLoaded();
    });
  }, []);

  // page_view tracking on client-side route changes. The initial page view is
  // emitted by gtag's config (send_page_view: true) when the snippet loads;
  // this effect re-configs on every subsequent route change (matchedPathname
  // changes, the effect fires once, gtag emits a page_view for the new path).
  const location = useRouterState({ select: (s) => s.location });
  const matchedPathname = location.match.pathname;
  useEffect(() => {
    if (typeof window === "undefined") return;
    sendGa4PageView();
  }, [matchedPathname]);

  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}