import { createFileRoute } from "@tanstack/react-router";

import {
  BlogShell,
  PostByline,
  PostContent,
  PostCta,
  RelatedPosts,
} from "~/components/blog";
import { POSTS_BY_SLUG } from "~/lib/posts";

export const Route = createFileRoute("/blog/$slug")({
  component: PostPage,
  // Per-post SEO: meta_title / meta_description come straight from each post's
  // front-matter (via the registry). The head is static per slug — no async,
  // no loader — so these tags render on the initial SSR document.
  head: (ctx) => {
    const post = POSTS_BY_SLUG[ctx.params.slug];
    if (!post) {
      return {
        meta: [{ title: "Post not found | Throughline Marketing" }],
      };
    }
    return {
      meta: [
        { title: `${post.metaTitle} | Throughline Marketing` },
        { name: "description", content: post.metaDescription },
        { property: "og:title", content: post.metaTitle },
        { property: "og:description", content: post.metaDescription },
        { property: "og:type", content: "article" },
      ],
    };
  },
});

function PostPage() {
  const { slug } = Route.useParams();
  const post = POSTS_BY_SLUG[slug];

  if (!post) {
    return (
      <BlogShell title="Post not found" eyebrow="Blog">
        <p className="text-neutral-600 dark:text-neutral-400">
          This post doesn't exist. Head back to the{" "}
          <a
            href="/blog"
            className="font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
          >
            blog index
          </a>
          .
        </p>
      </BlogShell>
    );
  }

  return (
    <BlogShell title={post.title} eyebrow="Blog">
      <PostByline post={post} />
      <PostContent sections={post.sections} />
      <RelatedPosts post={post} />
      <PostCta />
    </BlogShell>
  );
}
