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
  Challenges: { icon: "target", blurb: "How the evaluation works." },
  "Funded accounts": {
    icon: "wallet",
    blurb: "What happens once you pass.",
  },
  Payouts: { icon: "gold", blurb: "Splits, refunds and when you get paid." },
  Company: { icon: "shield", blurb: "Who we are, and what we're not." },
};

// Order matters: the home FaqPreview shows the first five.
export const faqs: Faq[] = [
  {
    slug: "what-is-a-trading-challenge",
    q: "What is a trading challenge?",
    a: "It's a two-phase test of your trading, run on a demo account. Hit the profit target without breaking the loss limits and you qualify for a funded account.",
    cat: "Challenges",
  },
  {
    slug: "what-does-real-funded-a-book-mean",
    q: "What does “real funded (A-Book)” mean?",
    a: "Most firms keep funded traders on simulated accounts. Our model is A-Book: funded trades go to the live market. Full details will be published before launch.",
    cat: "Funded accounts",
  },
  {
    slug: "how-many-phases-are-there",
    q: "How many phases are there?",
    a: "Two. Phase 1 has a 10% target, Phase 2 drops to 5%. The loss limits stay the same in both.",
    cat: "Challenges",
  },
  {
    slug: "is-there-a-time-limit",
    q: "Is there a time limit?",
    a: "No. There's a minimum of four trading days, but no deadline. Take a month if you need it.",
    cat: "Challenges",
  },
  {
    slug: "what-is-the-profit-split",
    q: "What is the profit split?",
    a: "You keep up to 80% of what you make on a funded account. The exact split for your account size is shown before checkout.",
    cat: "Payouts",
  },
  {
    slug: "do-i-get-my-fee-back",
    q: "Do I get my fee back?",
    a: "Yes. The plan is to refund your challenge fee with your first payout. Final terms are still being written.",
    cat: "Payouts",
  },
  {
    slug: "is-this-an-investment",
    q: "Is this an investment?",
    a: "No. The fee buys an evaluation of your trading, not an investment product. Nothing here pays a guaranteed return, and trading carries real risk.",
    cat: "Company",
  },
  // NEEDS CLIENT INPUT — platform/broker arrangement is unresolved (CLAUDE.md §8 Q4).
  {
    slug: "what-platform-do-i-trade-on",
    q: "What platform do I trade on?",
    a: "We're still finalising the platform and broker setup. It will be confirmed before challenges go on sale — we won't sell anything until it's locked in.",
    cat: "Challenges",
  },
  {
    slug: "can-i-try-again-if-i-fail",
    q: "Can I try again if I fail?",
    a: "Yes. Breaking a loss limit ends that attempt, but you can start a new challenge whenever you're ready. Retry pricing is to be confirmed.",
    cat: "Challenges",
  },
  // NEEDS CLIENT INPUT — instrument list depends on the broker arrangement.
  {
    slug: "what-can-i-trade",
    q: "What can I trade?",
    a: "Major and minor FX pairs for sure. Metals and indices depend on the final broker setup, so the full list is to be confirmed.",
    cat: "Challenges",
  },
  {
    slug: "what-happens-after-i-pass-both-phases",
    q: "What happens after I pass both phases?",
    a: "You get a funded account with the same loss limits you already know. From your first payout onwards you keep your share of the profit.",
    cat: "Funded accounts",
  },
  {
    slug: "can-i-lose-money-on-a-funded-account",
    q: "Can I lose money on a funded account?",
    a: "You never owe us for losses on the account — that capital is ours. Breach a limit and the account closes. Your own money at risk is the fee you paid, nothing beyond that.",
    cat: "Funded accounts",
  },
  // NEEDS CLIENT INPUT — payout schedule and method pending confirmation.
  {
    slug: "how-do-payouts-work",
    q: "How do payouts work?",
    a: "You request a payout and we pay your share of the profit. We haven't published the schedule or payment methods yet — both will be confirmed before launch.",
    cat: "Payouts",
  },
  {
    slug: "who-is-behind-game-of-forex",
    q: "Who is behind EZE Funded?",
    a: "Waqas Ahmed, a trader based in Pakistan who has run a trading community for years. The About page has the longer version.",
    cat: "Company",
  },
  {
    slug: "is-game-of-forex-a-broker",
    q: "Is EZE Funded a broker?",
    a: "No. We're not a broker and we're not a regulated firm, and nothing on this site is financial advice. We evaluate traders and fund the ones who pass.",
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
