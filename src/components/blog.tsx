import { BookButton, SiteFooter, SiteHeader } from "~/components/site";
import type { Post, Section } from "~/lib/posts";
import { formatPublishedAt } from "~/lib/posts";
import { ConsentBanner } from "~/components/consent-banner";
import { useEffect } from "react";
import { initCtaTracking } from "~/components/site";

/**
 * Shared shell for the blog pages (index + posts): site header, page header
 * block, article body, footer. Renders its children inside <main> under the
 * same max-width rhythm as the rest of the site.
 */
export function BlogShell({
  title,
  eyebrow,
  meta,
  children,
}: {
  title: string;
  eyebrow?: string;
  meta?: string;
  children: React.ReactNode;
}) {
  useEffect(() => initCtaTracking(), []);
  return (
    <div className="flex min-h-dvh flex-col bg-white dark:bg-neutral-950">
      <SiteHeader />
      <main id="top" className="flex-1">
        <section className="mx-auto w-full max-w-3xl px-6 pt-16 pb-16 sm:pt-24 sm:pb-24">
          {eyebrow ? (
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {title}
          </h1>
          {meta ? (
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">{meta}</p>
          ) : null}
          <div className="mt-8">{children}</div>
        </section>
      </main>
      <SiteFooter />
      <ConsentBanner />
    </div>
  );
}

/** Post-byline: author + publish date + reading time, matching house style. */
export function PostByline({ post }: { post: Post }) {
  return (
    <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
      Throughline Team · {formatPublishedAt(post.publishedAt)} ·{" "}
      {post.readingMinutes} min read
    </p>
  );
}

/**
 * Related-posts line: a single "Next read" cross-link block under each post
 * pointing to the other two cornerstones (the posts cross-reference each
 * other's throughput thesis and cadence material).
 */
export function RelatedPosts({ post }: { post: Post }) {
  const related = post.related.map((r) => ({ ...r, href: `/blog/${r.slug}` }));
  if (related.length === 0) return null;
  return (
    <aside className="mt-12 rounded-xl border border-neutral-200 p-6 dark:border-neutral-800">
      <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
        Related
      </p>
      <p className="mt-3 text-neutral-700 dark:text-neutral-300">
        {related.map((r, i) => (
          <span key={r.slug}>
            {i > 0 && <span className="text-neutral-400 dark:text-neutral-600"> · </span>}
            <a
              href={r.href}
              className="font-medium text-neutral-900 underline-offset-4 transition-colors hover:text-emerald-700 dark:text-white dark:hover:text-emerald-400"
            >
              {r.title}
            </a>
          </span>
        ))}
      </p>
    </aside>
  );
}

/**
 * Render the parsed markdown sections. Headings are H2/H3; paragraphs are
 * passed through with the inline-link anchors the posts already carry (the
 * "Book a strategy call" links stay exactly as written in the .md sources).
 */
export function PostContent({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-6 text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
      {sections.map((section, i) => {
        if (section.type === "heading") {
          const Tag = section.level === 2 ? "h2" : "h3";
          return (
            <Tag
              key={i}
              className={
                section.level === 2
                  ? "mt-10 text-2xl font-bold tracking-tight text-neutral-900 first:mt-0 dark:text-white"
                  : "mt-8 text-xl font-semibold tracking-tight text-neutral-900 first:mt-0 dark:text-white"
              }
            >
              {section.text}
            </Tag>
          );
        }
        return (
          <p
            key={i}
            className="text-pretty"
            // Body HTML is generated from the repo's own markdown sources by
            // the parser in ~/lib/posts.ts (heading/text + inline links only);
            // no third-party content is ever rendered.
            dangerouslySetInnerHTML={{ __html: section.html }}
          />
        );
      })}
    </div>
  );
}

/** The one CTA used at the foot of every post. */
export function PostCta() {
  return (
    <div className="mt-12 rounded-xl border border-neutral-200 bg-neutral-50 p-6 text-center dark:border-neutral-800 dark:bg-neutral-900/40">
      <p className="text-lg font-semibold text-neutral-900 dark:text-white">
        Want marketing that ships?
      </p>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        Book a free 30-minute strategy call — straight talk, even if the answer
        isn't us.
      </p>
      <div className="mt-5 flex justify-center">
        <BookButton ctaId="post-cta" />
      </div>
    </div>
  );
}