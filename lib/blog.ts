/**
 * Blog content — DESIGN MOCKUP DATA. Posts are illustrative placeholders
 * (NEEDS CLIENT INPUT); in production this comes from Sanity. Titles are
 * educational only — no income claims, no invented success stories (§4).
 * NOTE: blog was dropped in the §0 pivot; re-added 2026-07-27 on client
 * request as a design mockup.
 */

export type BlogCategory =
  | "Market outlook"
  | "Trading systems"
  | "Trading psychology"
  | "Risk management"
  | "Trading tips"
  | "Product news";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Market outlook",
  "Trading systems",
  "Trading psychology",
  "Risk management",
  "Trading tips",
  "Product news",
];

export type BlogPost = {
  slug: string;
  title: string;
  cat: BlogCategory;
  date: string; // display date — placeholder
  image: string; // /public path
  featured?: boolean; // right-rail "Featured" list
  popular?: boolean; // "Popular" strip
};

// Newest first. Cards link to "#" for now — detail pages ship with the CMS.
export const posts: BlogPost[] = [
  {
    slug: "reading-market-structure-without-indicators",
    title: "Reading market structure without a single indicator",
    cat: "Trading systems",
    date: "Jul 25, 2026",
    image: "/blog/post-1.jpg",
    featured: true,
  },
  {
    slug: "week-ahead-cpi-fomc-gold",
    title: "Week ahead: CPI, FOMC minutes and a stretched gold rally",
    cat: "Market outlook",
    date: "Jul 24, 2026",
    image: "/blog/post-8.jpg",
    popular: true,
  },
  {
    slug: "why-most-traders-overtrade",
    title: "Why most traders overtrade — and how to stop",
    cat: "Trading psychology",
    date: "Jul 21, 2026",
    image: "/blog/post-3.jpg",
    featured: true,
    popular: true,
  },
  {
    slug: "position-sizing-maths-of-surviving",
    title: "Position sizing: the maths of surviving losing streaks",
    cat: "Risk management",
    date: "Jul 18, 2026",
    image: "/blog/post-4.jpg",
    popular: true,
  },
  {
    slug: "how-the-two-phase-evaluation-works",
    title: "How the two-phase evaluation works, step by step",
    cat: "Product news",
    date: "Jul 15, 2026",
    image: "/blog/post-5.jpg",
    featured: true,
  },
  {
    slug: "journaling-turn-trades-into-data",
    title: "Journaling: turn your trades into data you can act on",
    cat: "Trading tips",
    date: "Jul 11, 2026",
    image: "/blog/post-9.jpg",
  },
  {
    slug: "liquidity-and-sessions",
    title: "Liquidity and sessions: when the market actually moves",
    cat: "Trading systems",
    date: "Jul 8, 2026",
    image: "/blog/post-7.jpg",
    featured: true,
  },
  {
    slug: "drawdown-limits-daily-vs-total",
    title: "Understanding drawdown limits: daily vs total",
    cat: "Risk management",
    date: "Jul 4, 2026",
    image: "/blog/post-2.jpg",
    popular: true,
  },
  {
    slug: "from-demo-to-funded-psychology",
    title: "From evaluation to funded: what changes psychologically",
    cat: "Trading psychology",
    date: "Jun 30, 2026",
    image: "/blog/post-6.jpg",
  },
];
