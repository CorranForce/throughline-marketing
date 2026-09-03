/**
 * Blog content registry (build-time ingestion).
 *
 * Source of truth for the three launch posts: the Markdown files under
 * /home/team/shared/content/ (mirrored into ./content/ in this repo). Each
 * post is imported as raw text via Vite's `?raw` suffix and parsed by
 * `parsePost()` below, so the shared .md files keep driving the rendered
 * pages — no manual HTML/.tsx duplication of the prose.
 *
 * The registry carries the publish metadata that lives OUTSIDE the Markdown:
 * slug, publish date (brand constraint: today, never invented), hand-set
 * excerpts, reading times, and cross-post "related" links. Slugs are clean
 * and keyword-honest, matching each post's primary keyword.
 */
import cornerstoneRaw from "../../content/01-cornerstone.md?raw";
import cadenceRaw from "../../content/02-cadence-playbook.md?raw";
import hireRaw from "../../content/03-hire-decision.md?raw";

export const PUBLISHED_AT = "2026-09-03";

export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** First ~2 sentences of the post, used as the index excerpt. */
  excerpt: string;
  publishedAt: string;
  /** Typical reading time; a "minutes" integer. */
  readingMinutes: number;
  /** 1–2 related posts, shown as one line under each post (cross-links). */
  related: { slug: string; title: string }[];
  /** Parsed body sections. */
  sections: Section[];
};

export type Section =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; html: string };

/** Escape the text inside a markdown link — placeholder rule (none in use). */
function inlineMd(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Escape text that will be interpolated into an HTML attribute. */
function attr(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Parse the tiny Markdown subset the posts actually use: `#`/`##`/`###`
 * headings, paragraphs, and inline `[text](url)` links. Everything else we
 * keep plain. Returns the H1 + body sections (H1 is rendered as the page's
 * own heading, not duplicated inside the article).
 */
export function parsePost(md: string): { h1: string; sections: Section[] } {
  const lines = md.split("\n");
  let h1 = "";
  const sections: Section[] = [];
  let para: string[] = [];

  const flush = () => {
    if (para.length === 0) return;
    const linesInPara = para;
    sections.push({ type: "paragraph", html: renderInline(linesInPara.join(" ")) });
    para = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") {
      flush();
      continue;
    }
    if (trimmed.startsWith("### ")) {
      flush();
      sections.push({ type: "heading", level: 3, text: trimmed.slice(4) });
      continue;
    }
    if (trimmed.startsWith("## ")) {
      flush();
      sections.push({ type: "heading", level: 2, text: trimmed.slice(3) });
      continue;
    }
    if (trimmed.startsWith("# ")) {
      h1 = trimmed.slice(2);
      continue;
    }
    para.push(trimmed);
  }
  flush();
  return { h1, sections };
}

/** Render one paragraph: inline links `[text](url)` and entity-aware escaping. */
function renderInline(text: string): string {
  const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let out = "";
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = LINK.exec(text)) !== null) {
    out += inlineMd(text.slice(last, m.index));
    out += `<a href="${attr(m[2])}" target="_blank" rel="noopener` + `">${inlineMd(m[1])}</a>`;
    last = m.index + m[0].length;
  }
  out += inlineMd(text.slice(last));
  return out;
}

function fromFrontmatter(raw: string, key: string): string {
  const re = new RegExp(`^${key}:\\s*(.+)$`, "m");
  const m = raw.match(re);
  if (!m) throw new Error(`missing front-matter field: ${key}`);
  return m[1].trim().replace(/^"|"$/g, "");
}

/**
 * Reading time: average prose reading speed 240 wpm, rounded up, floored at 1.
 */
export function readingMinutes(body: Section[], wordsPerMin = 240): number {
  const words = body.reduce((n, s) => {
    if (s.type === "paragraph") {
      return n + s.html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    }
    return n;
  }, 0);
  return Math.max(1, Math.ceil(words / wordsPerMin));
}

export const POSTS: Post[] = [
  {
    slug: "the-missing-piece-isnt-strategy-its-throughput",
    title: fromFrontmatter(cornerstoneRaw, "title"),
    metaTitle: fromFrontmatter(cornerstoneRaw, "meta_title"),
    metaDescription: fromFrontmatter(cornerstoneRaw, "meta_description"),
    excerpt:
      "Your last launch probably went like this. You spent two weeks on positioning, refined the message, and wrote a content plan for the quarter. Then the quarter started. The plan sat in a doc.",
    publishedAt: PUBLISHED_AT,
    readingMinutes: 8,
    related: [
      {
        slug: "the-90-day-marketing-cadence",
        title: "The 90-day marketing cadence for a startup with product-market fit",
      },
      {
        slug: "inhouse-agency-or-execution-partner-how-to-decide",
        title: "In-house team, agency, or an execution partner: how to decide",
      },
    ],
    ...parsePost(cornerstoneRaw),
  },
  {
    slug: "the-90-day-marketing-cadence",
    title: fromFrontmatter(cadenceRaw, "title"),
    metaTitle: fromFrontmatter(cadenceRaw, "meta_title"),
    metaDescription: fromFrontmatter(cadenceRaw, "meta_description"),
    excerpt:
      "A content cadence is what your marketing actually looks like: not the strategy doc, but the rhythm of work that produces the pipeline. Most startups don't have one. They have a plan for launch week and hope for the rest.",
    publishedAt: PUBLISHED_AT,
    readingMinutes: 6,
    related: [
      {
        slug: "the-missing-piece-isnt-strategy-its-throughput",
        title: "The missing piece isn't strategy. It's throughput.",
      },
      {
        slug: "inhouse-agency-or-execution-partner-how-to-decide",
        title: "In-house team, agency, or an execution partner: how to decide",
      },
    ],
    ...parsePost(cadenceRaw),
  },
  {
    slug: "inhouse-agency-or-execution-partner-how-to-decide",
    title: fromFrontmatter(hireRaw, "title"),
    metaTitle: fromFrontmatter(hireRaw, "meta_title"),
    metaDescription: fromFrontmatter(hireRaw, "meta_description"),
    excerpt:
      "At some point, every startup founder who has shipped a product looks up and admits the marketing isn't happening. Then the debate starts: hire in-house, hire an agency, hire a fractional CMO, or do it all yourself.",
    publishedAt: PUBLISHED_AT,
    readingMinutes: 6,
    related: [
      {
        slug: "the-missing-piece-isnt-strategy-its-throughput",
        title: "The missing piece isn't strategy. It's throughput.",
      },
      {
        slug: "the-90-day-marketing-cadence",
        title: "The 90-day marketing cadence for a startup with product-market fit",
      },
    ],
    ...parsePost(hireRaw),
  },
];

/** Sorted newest-first (all three post today; ordering is stable by intent). */
export const POSTS_BY_SLUG: Record<string, Post> = Object.fromEntries(
  POSTS.map((p) => [p.slug, p]),
);

export function formatPublishedAt(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}