/**
 * Blog content — DESIGN MOCKUP DATA. Posts are illustrative placeholders
 * (NEEDS CLIENT INPUT); in production this comes from Sanity. Content is
 * educational only — no income claims, no invented success stories (§4).
 * Where an article touches unresolved product facts (platform, payouts) it
 * defers to "to be confirmed".
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

export type BlogSection = { h?: string; p: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cat: BlogCategory;
  date: string; // display date — placeholder
  image: string; // /public path
  body: BlogSection[];
  featured?: boolean; // right-rail "Featured" list
  popular?: boolean; // "Popular" strip
};

// Newest first.
export const posts: BlogPost[] = [
  {
    slug: "reading-market-structure-without-indicators",
    title: "Reading market structure without a single indicator",
    excerpt:
      "Highs, lows and the space between them tell you more than most oscillators. A primer on reading raw price.",
    cat: "Trading systems",
    date: "Jul 25, 2026",
    image: "/blog/post-1.jpg",
    featured: true,
    body: [
      {
        p: [
          "Strip every indicator off your chart and you are left with the only thing the market actually produces: price. Market structure is the practice of reading that raw record — where price made a high, where it made a low, and what it did in between.",
        ],
      },
      {
        h: "Swings are the alphabet",
        p: [
          "An uptrend is a sequence of higher highs and higher lows; a downtrend is the mirror. That definition sounds too simple to be useful, but most losing trades fight it — shorting while the chart is still printing higher lows, or buying the first green candle of a fall that has broken no structure at all.",
          "Mark the last three meaningful swing highs and swing lows on any chart. If you cannot say which side is in control from those six points, the honest answer is that no one is — and that is a tradable piece of information too: stand aside.",
        ],
      },
      {
        h: "Breaks and retests",
        p: [
          "The cleanest structural signal is a break of a prior swing followed by a retest that holds. The break tells you intent; the retest tells you whether the other side still has interest. Waiting for both filters out a large share of false moves — at the cost of a later entry, which is a trade-off, not a flaw.",
        ],
      },
      {
        h: "Why this matters in an evaluation",
        p: [
          "Structure gives you a reason to be in a trade and a place where the idea is wrong. That second part is what protects a drawdown limit: if the level that justified the entry breaks, the trade is over — no averaging, no hoping. Rules like a daily loss cap are far easier to respect when every position has a structural line in the sand.",
        ],
      },
    ],
  },
  {
    slug: "week-ahead-cpi-fomc-gold",
    title: "Week ahead: CPI, FOMC minutes and a stretched gold rally",
    excerpt:
      "The calendar stacks inflation data against central-bank minutes while gold sits at the top of its range. What to watch, illustratively.",
    cat: "Market outlook",
    date: "Jul 24, 2026",
    image: "/blog/post-8.jpg",
    popular: true,
    body: [
      {
        p: [
          "This is an illustrative example of a weekly outlook post — the format the desk would publish each Monday: the calendar that matters, the levels being watched, and the risk events that can turn a quiet session into a fast one. It is not current analysis and none of it is trade advice.",
        ],
      },
      {
        h: "The data that moves the week",
        p: [
          "Inflation prints and central-bank minutes are the archetypal volatility events for FX. The number itself matters less than its distance from expectations — a 0.1% surprise on CPI can reprice rate expectations across the curve and drag every dollar pair with it.",
          "For a trader inside an evaluation, event days are a risk decision first and a trade idea second. Spreads widen, stops slip, and a daily-loss limit does not care that the candle that breached it lasted ninety seconds.",
        ],
      },
      {
        h: "Reading a stretched rally",
        p: [
          "When a market like gold has run hard into a data week, the asymmetric risk is rarely in chasing it. Extended trends produce the sharpest counter-moves precisely when late entries are most crowded. A structural pullback that holds is a very different trade from a breakout bought at the high of the range.",
        ],
      },
      {
        h: "The takeaway",
        p: [
          "Know the calendar before the week starts, decide in advance which events you will not trade through, and size positions so that a surprise print is an inconvenience — not the end of your evaluation.",
        ],
      },
    ],
  },
  {
    slug: "why-most-traders-overtrade",
    title: "Why most traders overtrade — and how to stop",
    excerpt:
      "Overtrading is rarely a knowledge problem. It is a decision-fatigue problem with a market attached.",
    cat: "Trading psychology",
    date: "Jul 21, 2026",
    image: "/blog/post-3.jpg",
    featured: true,
    popular: true,
    body: [
      {
        p: [
          "Ask a struggling trader for their last twenty trades and you will usually find the real problem in the count, not the quality. The first three trades follow the plan. The rest are reactions — to a loss, to a missed move, to boredom.",
        ],
      },
      {
        h: "The mechanics of the spiral",
        p: [
          "Overtrading is self-reinforcing. A small unplanned loss creates a deficit; the deficit creates urgency; urgency lowers the bar for the next entry. Three trades later the day's loss has doubled and none of the positions would survive a written checklist.",
          "The market makes this worse by always offering another candle. Unlike most jobs, trading never tells you the work is finished — you have to decide that yourself.",
        ],
      },
      {
        h: "Constraints beat willpower",
        p: [
          "The traders who fix this rarely do it with discipline alone. They do it with structure: a maximum number of trades per day, a hard stop after a fixed loss, sessions with a defined end time. An evaluation's daily-loss limit is exactly this kind of constraint imposed from outside — traders who learn to treat it as an ally rather than an obstacle tend to keep respecting it long after they are funded.",
        ],
      },
      {
        h: "A practical rule",
        p: [
          "Write tomorrow's maximum trade count on paper before the session. When you reach it, the platform closes — win or lose. A plan you can state in one sentence is a plan you can actually follow at the worst moment of the day.",
        ],
      },
    ],
  },
  {
    slug: "position-sizing-maths-of-surviving",
    title: "Position sizing: the maths of surviving losing streaks",
    excerpt:
      "Losing streaks are a statistical certainty. Position sizing decides whether they are an inconvenience or an ending.",
    cat: "Risk management",
    date: "Jul 18, 2026",
    image: "/blog/post-4.jpg",
    popular: true,
    body: [
      {
        p: [
          "Every strategy with a win rate below 100% will produce losing streaks — that is arithmetic, not pessimism. A 50% win rate can be expected to hit five consecutive losses well within a few hundred trades. The question is never whether the streak comes, but what it does to the account when it does.",
        ],
      },
      {
        h: "Risk per trade compounds fast",
        p: [
          "Risking 1% per trade, five straight losses cost roughly 4.9% of the account. At 3% per trade the same streak costs over 14% — enough to end most evaluations, which commonly cap total drawdown around 10%.",
          "This is why position size, not entry quality, is the first thing to audit after a bad week. The same five trades at a third of the size would have left the evaluation alive and the lesson affordable.",
        ],
      },
      {
        h: "Sizing to a limit, not to a feeling",
        p: [
          "Work backwards from the constraint. If the daily loss cap is 5%, a sensible day risks a fraction of it — say three trades at 1% — so that a full losing day still leaves room for error. Sizing 'to feel' does the opposite: it grows after wins and after losses alike, for different bad reasons.",
        ],
      },
      {
        h: "The quiet edge",
        p: [
          "Consistent sizing does not make a bad strategy good. But inconsistent sizing reliably makes a good strategy bad, because the biggest positions cluster on the most emotional trades. Fixing that is free — and it is the closest thing to an edge that costs nothing.",
        ],
      },
    ],
  },
  {
    slug: "how-the-two-phase-evaluation-works",
    title: "How the two-phase evaluation works, step by step",
    excerpt:
      "From choosing an account size to a funded account: what each phase asks of you and what stays the same throughout.",
    cat: "Product news",
    date: "Jul 15, 2026",
    image: "/blog/post-5.jpg",
    featured: true,
    body: [
      {
        p: [
          "The evaluation is deliberately simple: two phases, one rule set, no time pressure. This post walks through the mechanics as they stand — details like platform and payout schedule are still being finalised and will be confirmed before launch.",
        ],
      },
      {
        h: "Phase 1 — prove the edge",
        p: [
          "Phase 1 asks for a 10% profit target while respecting two limits: equity may not fall more than 5% below the day's starting balance, and never more than 10% below the initial balance. There is a minimum of four trading days and no maximum — the trading period is unlimited.",
        ],
      },
      {
        h: "Phase 2 — prove it again, calmer",
        p: [
          "Phase 2 halves the target to 5% with the same loss limits. The point is consistency: a trader who passed Phase 1 on one oversized win tends to be found out here, while a steady process barely notices the difference.",
        ],
      },
      {
        h: "Funded — same rules, real stakes",
        p: [
          "Pass both phases and you receive a funded account. The loss limits carry over unchanged, you keep up to 80% of the profit you generate, and the challenge fee is designed to be refunded with the first payout. You never owe the account's losses — the capital at risk is the firm's, and the trade-off is that breaching a limit closes the account.",
        ],
      },
    ],
  },
  {
    slug: "journaling-turn-trades-into-data",
    title: "Journaling: turn your trades into data you can act on",
    excerpt:
      "A journal is not a diary. Track the few fields that actually change decisions, and review them on a schedule.",
    cat: "Trading tips",
    date: "Jul 11, 2026",
    image: "/blog/post-9.jpg",
    body: [
      {
        p: [
          "Most journals die because they are written for a future reader who never comes. The fix is to journal less and query more: capture a handful of structured fields per trade, then actually read them back on a schedule.",
        ],
      },
      {
        h: "Six fields that earn their keep",
        p: [
          "Instrument, direction, setup name, risk in R, result in R, and one sentence on state of mind. That is enough to answer the questions that change behaviour: which setup actually pays, what time of day bleeds money, and how results differ when the note says 'rushed'.",
          "Screenshots help, but only with the levels that justified the trade marked at entry — an annotated chart from before the outcome is evidence; one from after is a story.",
        ],
      },
      {
        h: "Review is the product",
        p: [
          "A weekly half-hour with a filter — best setup, worst setup, all trades after a loss — beats a daily rereading of everything. Patterns live in aggregates. One overtraded Tuesday is noise; every Tuesday overtraded is a schedule change.",
        ],
      },
      {
        h: "In an evaluation",
        p: [
          "A journal maps neatly onto evaluation rules: log distance from the daily-loss limit at each entry and you will see whether you trade differently when the cushion is thin. Most people do — and seeing it in your own data is what finally changes it.",
        ],
      },
    ],
  },
  {
    slug: "liquidity-and-sessions",
    title: "Liquidity and sessions: when the market actually moves",
    excerpt:
      "FX is open around the clock but only alive in windows. Trading the right hours is an edge that costs nothing.",
    cat: "Trading systems",
    date: "Jul 8, 2026",
    image: "/blog/post-7.jpg",
    featured: true,
    body: [
      {
        p: [
          "Foreign exchange trades twenty-four hours a day, five days a week — but it does not trade the same in any two of those hours. Volume concentrates where banking sessions overlap, and with it comes everything a short-term trader needs: movement, tighter spreads, and follow-through.",
        ],
      },
      {
        h: "The three windows",
        p: [
          "The Asian session tends to range; London brings the day's first real direction; the London–New York overlap is where the largest share of daily volume trades. The same breakout strategy can be profitable in the overlap and a slow bleed in the Asian range — with identical charts and identical rules.",
        ],
      },
      {
        h: "Spreads, slippage and the cost of quiet",
        p: [
          "Thin liquidity is not just slow — it is expensive. Spreads widen, stops fill worse, and small orders move price further than they should. A strategy back-tested on averaged costs quietly loses its edge when it is executed in the hours where costs are worst.",
        ],
      },
      {
        h: "A session audit",
        p: [
          "Tag every journal entry with its session for a month, then compare. Most traders discover their results come from a two-to-four-hour window — and that shrinking the trading day to that window removes a surprising share of losses while keeping most of the gains.",
        ],
      },
    ],
  },
  {
    slug: "drawdown-limits-daily-vs-total",
    title: "Understanding drawdown limits: daily vs total",
    excerpt:
      "The two loss limits solve different problems. Knowing which one you are close to changes how you should trade today.",
    cat: "Risk management",
    date: "Jul 4, 2026",
    image: "/blog/post-2.jpg",
    popular: true,
    body: [
      {
        p: [
          "Every challenge here runs two loss limits side by side: a daily cap of 5% against the day's starting balance, and a total cap of 10% against the initial balance. They look similar, but they protect against different failures.",
        ],
      },
      {
        h: "The daily limit is a circuit breaker",
        p: [
          "A daily cap exists to stop one bad day becoming a catastrophic one. It resets each trading day, which means it forgives — yesterday's rough session does not shrink today's room. Its real function is behavioural: it forces the stop that tilted traders will not choose for themselves.",
        ],
      },
      {
        h: "The total limit is the account's floor",
        p: [
          "The total cap never resets. It is the line under the whole evaluation, and every loss moves you toward it while every gain moves you away. Two traders can have identical days, but the one carrying an 8% drawdown is playing a different game from the one at 2% — and should be sizing like it.",
        ],
      },
      {
        h: "Trading the distance",
        p: [
          "Before each session, write down two numbers: dollars left to the daily limit and dollars left to the total limit. Size positions so that a normal losing trade consumes a small fraction of the smaller number. When the smaller number is the total limit, that is the market telling you to trade smaller, not faster.",
        ],
      },
    ],
  },
  {
    slug: "from-demo-to-funded-psychology",
    title: "From evaluation to funded: what changes psychologically",
    excerpt:
      "The chart is the same, the rules are the same — but the meaning of a loss changes. Preparing for that is a skill.",
    cat: "Trading psychology",
    date: "Jun 30, 2026",
    image: "/blog/post-6.jpg",
    body: [
      {
        p: [
          "Traders often assume the hard part ends when the evaluation does. Then the first funded loss arrives and feels different — not because the number changed, but because the stakes did. The account is real, the payout is real, and suddenly a routine stop-out carries a story about what could have been.",
        ],
      },
      {
        h: "Same rules, new weight",
        p: [
          "A sensible funded programme keeps the rule set identical to the evaluation precisely so that nothing about the process needs to change. The trader's job is to notice when their behaviour changes anyway: cutting winners earlier, skipping valid setups after a loss, checking the equity number between every candle.",
        ],
      },
      {
        h: "Anchor to process metrics",
        p: [
          "The antidote is measuring things you control. Trades that followed the plan, average risk per trade, sessions ended on schedule — these numbers stay meaningful whether a week's P&L is up or down, and they recover faster than equity does after a losing stretch.",
        ],
      },
      {
        h: "Treat the transition as a phase",
        p: [
          "It helps to treat the first funded month as Phase 3: same discipline, deliberately conservative size, no new instruments or strategies. Consistency got the account; the only psychological task is refusing to renegotiate with the process that produced it.",
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

// Rough reading time from body length (build-time only).
export const readingTime = (post: BlogPost) => {
  const words = post.body
    .flatMap((s) => s.p)
    .join(" ")
    .split(/\s+/).length;
  return Math.max(2, Math.round(words / 200));
};
