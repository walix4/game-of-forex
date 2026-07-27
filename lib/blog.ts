/**
 * Blog content — DESIGN MOCKUP DATA. Posts are illustrative placeholders
 * (NEEDS CLIENT INPUT); in production this comes from Sanity. Content is
 * educational only — no income claims, no invented stats about the firm.
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
    title: "Reading market structure without indicators",
    excerpt:
      "Take the indicators off and price still tells you who's in control. A short primer on reading raw structure.",
    cat: "Trading systems",
    date: "Jul 25, 2026",
    image: "/blog/post-1.jpg",
    featured: true,
    body: [
      {
        p: [
          "Take everything off the chart. What's left is the record of where price actually went: the highs, the lows, and the order they happened in. That's market structure, and on its own it's enough to build a bias.",
        ],
      },
      {
        h: "Mark the swings",
        p: [
          "An uptrend is higher highs and higher lows. A downtrend is the opposite. Obvious on paper, ignored constantly in practice. Traders short charts that are still printing higher lows every single day.",
          "Mark the last three swing highs and three swing lows on your chart. If those six points can't tell you who's in control, then nobody is. Flat is a position too.",
        ],
      },
      {
        h: "Breaks and retests",
        p: [
          "The cleanest signal structure gives you is a broken level that gets retested and holds. The break shows intent. The retest shows whether anyone still defends the old level. You'll enter later than the breakout crowd, and you'll skip most of the fakeouts they take. That's the trade-off, and it's usually worth it.",
        ],
      },
      {
        h: "Why this matters in a challenge",
        p: [
          "Structure gives every trade a line where the idea is wrong. If the level that justified the entry breaks, you're out. No averaging down, no waiting for it to come back. With a 5% daily cap, that habit is what stops one bad read from ending your week.",
        ],
      },
    ],
  },
  {
    slug: "week-ahead-cpi-fomc-gold",
    title: "Week ahead: CPI, FOMC minutes and a stretched gold rally",
    excerpt:
      "CPI, central bank minutes and gold running into resistance. A sample of the Monday outlook format.",
    cat: "Market outlook",
    date: "Jul 24, 2026",
    image: "/blog/post-8.jpg",
    popular: true,
    body: [
      {
        p: [
          "This is a sample of the weekly outlook we plan to publish every Monday: the calendar that matters, the levels we're watching, and where we'd rather sit out. It's illustrative, not live analysis, and none of it is trade advice.",
        ],
      },
      {
        h: "The prints that matter",
        p: [
          "CPI and central bank minutes move FX more than anything else on the calendar. The number itself matters less than the gap between the number and what the market expected. A 0.1% CPI surprise can reprice the whole dollar board in minutes.",
          "If you're in a challenge, event days are a sizing decision before they're a trade idea. Spreads widen and stops slip. The daily loss cap doesn't care that the move only took ninety seconds.",
        ],
      },
      {
        h: "Gold, stretched",
        p: [
          "When a market has already rallied hard into a data week, chasing it is the worst-odds version of the trade. Extended trends snap back hardest exactly when the late entries pile in. A pullback that holds a level is a different trade entirely.",
        ],
      },
      {
        h: "Bottom line",
        p: [
          "Know the calendar before Monday. Decide in advance which events you won't trade through. Size so that a surprise print is annoying, not terminal.",
        ],
      },
    ],
  },
  {
    slug: "why-most-traders-overtrade",
    title: "Overtrading: why it happens and what actually stops it",
    excerpt:
      "Look at the trade count, not the setups. Where overtrading starts, and the limits that end it.",
    cat: "Trading psychology",
    date: "Jul 21, 2026",
    image: "/blog/post-3.jpg",
    featured: true,
    popular: true,
    body: [
      {
        p: [
          "Pull up your last twenty trades. For most struggling traders the problem isn't in the setups, it's in the count. Trades one to three follow the plan. The rest are reactions to a loss, a missed move, or plain boredom.",
        ],
      },
      {
        h: "How the spiral works",
        p: [
          "A small unplanned loss opens a hole. The hole creates urgency. Urgency lowers the bar for the next entry. Three trades later the day's loss has doubled, and none of those entries would have survived a written checklist.",
          "The market feeds this because it never closes the way a workday does. There's always another candle. You have to end the session yourself.",
        ],
      },
      {
        h: "Rules beat willpower",
        p: [
          "The traders who fix this rarely do it through discipline alone. They do it with hard limits: a trade cap per day, a stop-loss on the day itself, a fixed time the session ends. Our daily loss limit is that same constraint, imposed from outside. Traders who learn to work inside it usually keep the habit long after they're funded.",
        ],
      },
      {
        h: "One thing to try",
        p: [
          "Write tomorrow's maximum trade count on paper before the session starts. When you hit it, close the platform, up or down. If the plan doesn't fit in one sentence, you won't follow it at 2pm on a red day.",
        ],
      },
    ],
  },
  {
    slug: "position-sizing-maths-of-surviving",
    title: "Position sizing for losing streaks",
    excerpt:
      "Five straight losses is normal. Whether it ends your evaluation is a sizing decision you make in advance.",
    cat: "Risk management",
    date: "Jul 18, 2026",
    image: "/blog/post-4.jpg",
    popular: true,
    body: [
      {
        p: [
          "Any strategy that wins less than 100% of the time will hit losing streaks. At a 50% win rate, five losses in a row shows up well inside a few hundred trades. The only question is what it costs when it arrives.",
        ],
      },
      {
        h: "The compounding problem",
        p: [
          "At 1% risk per trade, five straight losses cost about 4.9% of the account. At 3% per trade, the same five trades cost over 14%. That's past the 10% max loss on most evaluations, including ours.",
          "Same trades, same strategy. The 1% version survives to trade the next week. That's the whole argument.",
        ],
      },
      {
        h: "Size from the limit backwards",
        p: [
          "Start with the constraint. If the daily cap is 5%, three trades at 1% risk leaves room for a full losing day plus slippage. Sizing by feel does the opposite: positions grow after wins and after losses, for different bad reasons.",
        ],
      },
      {
        h: "The cheap edge",
        p: [
          "Flat, boring, consistent sizing won't fix a bad strategy. But inconsistent sizing will break a good one, because the biggest positions always land on the most emotional trades. Fixing that costs nothing.",
        ],
      },
    ],
  },
  {
    slug: "how-the-two-phase-evaluation-works",
    title: "How the two-phase evaluation works",
    excerpt:
      "Two phases, one rule set, no deadline. The full process from checkout to funded account.",
    cat: "Product news",
    date: "Jul 15, 2026",
    image: "/blog/post-5.jpg",
    featured: true,
    body: [
      {
        p: [
          "Two phases, one rule set, no deadline. Here's the whole process. A few details, like the platform and the payout schedule, are still being finalised and will be confirmed before launch.",
        ],
      },
      {
        h: "Phase 1",
        p: [
          "The target is 10%. Your equity can't drop more than 5% below the day's starting balance, or more than 10% below where the account started. Minimum four trading days, no maximum. Take a month if you need it.",
        ],
      },
      {
        h: "Phase 2",
        p: [
          "Same limits, target halved to 5%. This phase exists to filter out the one-big-win pass. A steady process barely notices the difference. A lucky one usually shows up here.",
        ],
      },
      {
        h: "Funded",
        p: [
          "Pass both and you trade our capital under the same limits you already know. You keep up to 80% of the profit you generate, and the plan is to refund your fee with the first payout. You never owe the account's losses. Breach a limit and the account closes — that's the deal.",
        ],
      },
    ],
  },
  {
    slug: "journaling-turn-trades-into-data",
    title: "A trading journal you'll actually keep",
    excerpt:
      "Track six fields, review once a week. A journal built for finding patterns, not keeping a diary.",
    cat: "Trading tips",
    date: "Jul 11, 2026",
    image: "/blog/post-9.jpg",
    body: [
      {
        p: [
          "Most journals get abandoned inside a month because they're written like diaries, for a future reader who never shows up. Track less. Review more.",
        ],
      },
      {
        h: "Six fields",
        p: [
          "Instrument, direction, setup name, risk in R, result in R, and one line on how you felt. That's enough to answer the questions that actually change behaviour: which setup pays, which hours bleed, and what happens to your trading in the hour after a loss.",
          "Screenshots only help if you mark the levels at entry. A chart annotated after the outcome is a story, not evidence.",
        ],
      },
      {
        h: "The review is the point",
        p: [
          "Thirty minutes a week with a filter beats rereading everything daily. Sort by setup. Sort by session. Look at every trade taken within an hour of a loss. Patterns live in the aggregate. One overtraded Tuesday is noise. Five is a schedule problem.",
        ],
      },
      {
        h: "During a challenge",
        p: [
          "Add one field: distance to the daily limit at entry. Most traders trade differently when the cushion is thin. Seeing that in your own numbers is usually what finally changes it.",
        ],
      },
    ],
  },
  {
    slug: "liquidity-and-sessions",
    title: "Sessions and liquidity: when the market actually moves",
    excerpt:
      "Volume clusters into a few hours a day. Trading only those hours is the cheapest edge available.",
    cat: "Trading systems",
    date: "Jul 8, 2026",
    image: "/blog/post-7.jpg",
    featured: true,
    body: [
      {
        p: [
          "FX is open 24 hours, five days a week. It is not alive for all of them. Volume clusters where banking sessions overlap, and volume is what gives you movement, tight spreads and follow-through.",
        ],
      },
      {
        h: "Three windows",
        p: [
          "Asia tends to range. London sets the day's first real direction. The London–New York overlap carries the biggest share of daily volume. The same breakout system can pay in the overlap and bleed in the Asian range with identical rules.",
        ],
      },
      {
        h: "Quiet hours are expensive",
        p: [
          "Thin markets aren't just slow. Spreads widen, stops fill badly, and small orders push price further than they should. A backtest built on average costs quietly dies when you execute it in the worst-cost hours.",
        ],
      },
      {
        h: "Run the audit",
        p: [
          "Tag every journal entry with its session for a month, then compare. Most traders find their results come from a two-to-four-hour window. Trading only that window cuts a surprising share of losses and keeps most of the wins.",
        ],
      },
    ],
  },
  {
    slug: "drawdown-limits-daily-vs-total",
    title: "Daily loss vs max loss: know which one you're near",
    excerpt:
      "The 5% daily cap and the 10% max loss do different jobs. Which one you're closer to should change today's sizing.",
    cat: "Risk management",
    date: "Jul 4, 2026",
    image: "/blog/post-2.jpg",
    popular: true,
    body: [
      {
        p: [
          "Every challenge here runs two loss limits at once: 5% daily, measured against the day's starting balance, and 10% total, measured against the initial balance. They do different jobs.",
        ],
      },
      {
        h: "The daily cap is a circuit breaker",
        p: [
          "It stops one bad day from becoming a disaster, and it resets each morning. Yesterday's rough session doesn't shrink today's room. Mostly it forces the stop that a tilted trader won't take on their own.",
        ],
      },
      {
        h: "The total cap is the floor",
        p: [
          "It never resets. Every loss moves you toward it, every gain moves you away. A trader sitting at 8% drawdown is playing a different game to one at 2%, and should be sizing like it.",
        ],
      },
      {
        h: "Trade the distance",
        p: [
          "Before each session, write down two numbers: dollars left to the daily limit, and dollars left to the total limit. Size so a normal losing trade uses a small slice of the smaller number. When the smaller number is the total limit, that's your cue to trade smaller, not faster.",
        ],
      },
    ],
  },
  {
    slug: "from-demo-to-funded-psychology",
    title: "What changes when the account goes live",
    excerpt:
      "The rules don't change after you pass. Your behaviour will try to. What to watch for in the first funded month.",
    cat: "Trading psychology",
    date: "Jun 30, 2026",
    image: "/blog/post-6.jpg",
    body: [
      {
        p: [
          "The first funded loss feels different. The chart is the same and the rules are the same, but the account is real now, and a routine stop-out suddenly carries a story about the payout it cost you.",
        ],
      },
      {
        h: "Same rules on purpose",
        p: [
          "We keep the funded rule set identical to the evaluation so that nothing about your process needs to change. Your job is noticing when it changes anyway: winners cut early, valid setups skipped after a loss, equity checked between every candle.",
        ],
      },
      {
        h: "Score the process, not the P&L",
        p: [
          "Track what you control. Trades that followed the plan. Average risk per trade. Sessions ended on time. Those numbers stay meaningful in a red week, and they recover faster than an equity curve does.",
        ],
      },
      {
        h: "Call it phase three",
        p: [
          "Treat the first funded month as one more phase: conservative size, no new markets, no new strategies. The process that earned the account is the one that keeps it.",
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
