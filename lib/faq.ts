// FAQ content — design mockup. NEEDS CLIENT INPUT for final answers.
// Each entry has a stable slug so questions get their own detail page
// (/faq/[slug]), FTMO-style. Do not regenerate slugs from text — URLs are
// referenced across the site.
export type FaqCategory =
  | "Challenges"
  | "Funded accounts"
  | "Payouts"
  | "Company";

export type Faq = { slug: string; q: string; a: string; cat: FaqCategory };

export const FAQ_CATEGORIES: FaqCategory[] = [
  "Challenges",
  "Funded accounts",
  "Payouts",
  "Company",
];

// Category card meta for the FAQ directory (icon keys resolved in the UI).
export const CATEGORY_META: Record<
  FaqCategory,
  { icon: "target" | "wallet" | "gold" | "shield"; blurb: string }
> = {
  Challenges: { icon: "target", blurb: "Phases, rules, platforms and retries." },
  "Funded accounts": {
    icon: "wallet",
    blurb: "What happens once you pass.",
  },
  Payouts: { icon: "gold", blurb: "Splits, refunds and schedules." },
  Company: { icon: "shield", blurb: "Who we are and what we are not." },
};

// Order matters: the home FaqPreview shows the first five.
export const faqs: Faq[] = [
  {
    slug: "what-is-a-trading-challenge",
    q: "What is a trading challenge?",
    a: "A challenge is a two-phase evaluation on a demo account. Hit the profit target while respecting the loss limits and you qualify for a funded account.",
    cat: "Challenges",
  },
  {
    slug: "what-does-real-funded-a-book-mean",
    q: "What does “real funded (A-Book)” mean?",
    a: "It means funded traders trade on real capital in the live market, rather than on a permanent simulation. This is our core positioning. (Details pending final confirmation.)",
    cat: "Funded accounts",
  },
  {
    slug: "how-many-phases-are-there",
    q: "How many phases are there?",
    a: "Two. Phase 1 has a higher profit target, Phase 2 a lower one. The same daily-loss and total-loss limits apply throughout.",
    cat: "Challenges",
  },
  {
    slug: "is-there-a-time-limit",
    q: "Is there a time limit?",
    a: "No. The trading period is unlimited — there is a minimum number of trading days, but no deadline to reach the target.",
    cat: "Challenges",
  },
  {
    slug: "what-is-the-profit-split",
    q: "What is the profit split?",
    a: "Funded traders keep the majority of the profit they make. Exact splits are shown on each challenge and confirmed at checkout.",
    cat: "Payouts",
  },
  {
    slug: "do-i-get-my-fee-back",
    q: "Do I get my fee back?",
    a: "The challenge fee is designed to be refunded with your first payout on a funded account. Terms to be confirmed.",
    cat: "Payouts",
  },
  {
    slug: "is-this-an-investment",
    q: "Is this an investment?",
    a: "No. A challenge evaluates trading skill; it is not an investment product and offers no guaranteed return. Trading carries real risk.",
    cat: "Company",
  },
  // NEEDS CLIENT INPUT — platform/broker arrangement is unresolved (CLAUDE.md §8 Q4).
  {
    slug: "what-platform-do-i-trade-on",
    q: "What platform do I trade on?",
    a: "The trading platform and broker arrangement are being finalised and will be confirmed before challenges go on sale.",
    cat: "Challenges",
  },
  {
    slug: "can-i-try-again-if-i-fail",
    q: "Can I try again if I fail?",
    a: "Breaching a loss limit ends that evaluation, but you can start a new challenge at any time. Retry pricing is to be confirmed.",
    cat: "Challenges",
  },
  // NEEDS CLIENT INPUT — instrument list depends on the broker arrangement.
  {
    slug: "what-can-i-trade",
    q: "What can I trade?",
    a: "The instrument list is being finalised alongside the platform. Expect major and minor FX pairs, with metals and indices to be confirmed.",
    cat: "Challenges",
  },
  {
    slug: "what-happens-after-i-pass-both-phases",
    q: "What happens after I pass both phases?",
    a: "You receive a funded account. The same loss limits carry over, and you keep a share of the profit you generate from your first payout.",
    cat: "Funded accounts",
  },
  {
    slug: "can-i-lose-money-on-a-funded-account",
    q: "Can I lose money on a funded account?",
    a: "You never owe the losses on the account — the capital at risk is the firm's. Breaching a loss limit closes the account, and trading always carries risk to any fee you have paid.",
    cat: "Funded accounts",
  },
  // NEEDS CLIENT INPUT — payout schedule and method pending confirmation.
  {
    slug: "how-do-payouts-work",
    q: "How do payouts work?",
    a: "Payouts are requested on a regular schedule and paid on real trading results. The exact schedule and payment methods are to be confirmed.",
    cat: "Payouts",
  },
  {
    slug: "who-is-behind-game-of-forex",
    q: "Who is behind Game of Forex?",
    a: "Game of Forex was founded by Waqas Ahmed, a Pakistan-based forex trader who has run a trading community for years. See the About page for the full story.",
    cat: "Company",
  },
  {
    slug: "is-game-of-forex-a-broker",
    q: "Is Game of Forex a broker?",
    a: "No. Game of Forex is not a broker and is not a regulated entity, and nothing on this site is financial advice. Challenges evaluate trading skill.",
    cat: "Company",
  },
];

export const getFaq = (slug: string) => faqs.find((f) => f.slug === slug);

// "Most popular" chips on the directory hero. NEEDS CLIENT INPUT — replace
// with real search data once available; this is an editorial pick.
export const POPULAR_SLUGS = [
  "what-is-a-trading-challenge",
  "do-i-get-my-fee-back",
  "what-is-the-profit-split",
  "what-platform-do-i-trade-on",
];
