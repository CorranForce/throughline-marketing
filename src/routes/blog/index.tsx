import { createFileRoute } from "@tanstack/react-router";

import { BlogShell } from "~/components/blog";
import { POSTS, formatPublishedAt } from "~/lib/posts";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: "Blog | Throughline Marketing" },
      {
        name: "description",
        content:
          "Throughline Marketing on startup marketing execution — throughput, content cadence, and the hiring decision. Writing that ships.",
      },
    ],
  }),
});

function BlogIndex() {
  return (
    <BlogShell
      title="Writing on throughput"
      eyebrow="Blog"
      meta="Marketing execution, straight: throughput, cadence, and the decisions around them."
    >
      <div className="divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
        {POSTS.map((post) => (
          <article key={post.slug} className="py-8">
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
              {formatPublishedAt(post.publishedAt)} · {post.readingMinutes} min read
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              <a
                href={`/blog/${post.slug}`}
                className="transition-colors hover:text-emerald-700 dark:hover:text-emerald-400"
              >
                {post.title}
              </a>
            </h2>
            <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">
              {post.excerpt}
            </p>
            <p className="mt-4 text-sm font-medium">
              <a
                href={`/blog/${post.slug}`}
                className="text-emerald-700 underline-offset-4 transition-colors hover:underline dark:text-emerald-400"
              >
                Read the post
              </a>
              <span aria-hidden className="mx-1.5 text-neutral-400 dark:text-neutral-600">
                →
              </span>
            </p>
          </article>
        ))}
      </div>
    </BlogShell>
  );
}