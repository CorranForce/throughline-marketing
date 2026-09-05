/**
 * Blog content registry (build-time ingestion).
 *
 * Source of truth for the blog posts: the Markdown files under
 * /home/team/shared/content/ (mirrored into ./content/ in this repo). Each
 * post is imported as raw text via Vite's `?raw` suffix and parsed by
 * `parsePost()` below, so the shared .md files keep driving the rendered
 * pages — no manual HTML/.tsx duplication of the prose.
 *
 * The registry carries the publish metadata that lives OUTSIDE the Markdown:
 * slug, publish date (brand constraint: today, never invented), hand-set
 * excerpts, reading times, and cross-post "related" links. Slugs are clean
 * and keyword-honest, matching each post's primary keyword. Front-matter
 * `status:` stays `draft` in the .md files — `publishedAt` here is what
 * makes a post live.
 */
import cornerstoneRaw from "../../content/01-cornerstone.md?raw";
import cadenceRaw from "../../content/02-cadence-playbook.md?raw";
import hireRaw from "../../content/03-hire-decision.md?raw";
import distributionRaw from "../../content/04-distribution.md?raw";
import seoRaw from "../../content/05-seo-for-startups.md?raw";
import measurementRaw from "../../content/06-marketing-measurement.md?raw";

/** Launch batch (posts 01–03), published together. */
export const PUBLISHED_AT = "2026-09-03";
/** Cycle-2 batch (posts 04–06), published together. */
export const CYCLE_2_PUBLISHED_AT = "2026-09-05";

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
 * Strip a leading YAML front-matter block (`---` fenced) from a post's raw
 * text, so the parser only ever sees the body. Without this, the front-matter
 * (including `status:` and FAQ YAML) would render as the article's first
 * paragraph.
 */
function stripFrontmatter(md: string): string {
  return md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
}

/**
 * Parse the tiny Markdown subset the posts actually use: `#`/`##`/`###`
 * headings, paragraphs, and inline `[text](url)` links. Everything else we
 * keep plain. Returns the H1 + body sections (H1 is rendered as the page's
 * own heading, not duplicated inside the article).
 */
export function parsePost(raw: string): { h1: string; sections: Section[] } {
  const md = stripFrontmatter(raw);
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
 * Reading time: average prose reading speed 240 wpm over the post body
 * (front-matter excluded), rounded up, floored at 1. 240 wpm is the value
 * the hand-set minutes for posts 01–03 were calibrated against.
 */
export function readingMinutes(md: string, wordsPerMin = 240): number {
  const words = stripFrontmatter(md)
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMin));
}

const POSTS_ALL: Post[] = [
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
        slug: "how-to-actually-distribute-your-content-as-a-startup",
        title: "How to actually distribute your content as a startup",
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
        slug: "how-to-measure-marketing-when-youre-too-small-for-a-dashboard",
        title: "How to measure marketing when you're too small for a dashboard",
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
        slug: "how-to-actually-distribute-your-content-as-a-startup",
        title: "How to actually distribute your content as a startup",
      },
    ],
    ...parsePost(hireRaw),
  },
  {
    slug: "how-to-actually-distribute-your-content-as-a-startup",
    title: fromFrontmatter(distributionRaw, "title"),
    metaTitle: fromFrontmatter(distributionRaw, "meta_title"),
    metaDescription: fromFrontmatter(distributionRaw, "meta_description"),
    excerpt:
      "Most startups publish and wait for the visitors to show up. Here's the distribution loop that actually gets a shipped piece seen: one distribution touch per shippable, channels chosen where your buyers already are, and honest expectations about how it compounds.",
    publishedAt: CYCLE_2_PUBLISHED_AT,
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
    ...parsePost(distributionRaw),
  },
  {
    slug: "seo-for-early-stage-startups-what-actually-moves-rankings",
    title: fromFrontmatter(seoRaw, "title"),
    metaTitle: fromFrontmatter(seoRaw, "meta_title"),
    metaDescription: fromFrontmatter(seoRaw, "meta_description"),
    excerpt:
      "Nobody can sell a startup a ranking. SEO for early-stage teams is a slow compound: technical basics that prevent self-inflicted damage, content aimed at real search intent, and links earned over months. Here's the honest version.",
    publishedAt: CYCLE_2_PUBLISHED_AT,
    readingMinutes: 7,
    related: [
      {
        slug: "the-90-day-marketing-cadence",
        title: "The 90-day marketing cadence for a startup with product-market fit",
      },
      {
        slug: "how-to-measure-marketing-when-youre-too-small-for-a-dashboard",
        title: "How to measure marketing when you're too small for a dashboard",
      },
    ],
    ...parsePost(seoRaw),
  },
  {
    slug: "how-to-measure-marketing-when-youre-too-small-for-a-dashboard",
    title: fromFrontmatter(measurementRaw, "title"),
    metaTitle: fromFrontmatter(measurementRaw, "meta_title"),
    metaDescription: fromFrontmatter(measurementRaw, "meta_description"),
    excerpt:
      "Dashboards hide more than they reveal when you're small. The honest version of measurement is three numbers tied to the pipeline, a publish log, and a monthly readout that names one change.",
    publishedAt: CYCLE_2_PUBLISHED_AT,
    readingMinutes: 6,
    related: [
      {
        slug: "the-90-day-marketing-cadence",
        title: "The 90-day marketing cadence for a startup with product-market fit",
      },
      {
        slug: "the-missing-piece-isnt-strategy-its-throughput",
        title: "The missing piece isn't strategy. It's throughput.",
      },
    ],
    ...parsePost(measurementRaw),
  },
];

/** Public list, newest publish date first (the blog index renders this array
 * in order). Sorting is stable, so within the same date the authored order is
 * kept — cornerstones first for the launch batch, 04→06 for cycle 2. */
export const POSTS: Post[] = [...POSTS_ALL].sort(
  (a, b) =>
    b.publishedAt.localeCompare(a.publishedAt) ||
    POSTS_ALL.indexOf(a) - POSTS_ALL.indexOf(b),
);

/** Slug lookup for routes and per-post head() tags. */
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
