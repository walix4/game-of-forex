// FAQ content — design mockup. NEEDS CLIENT INPUT for final answers.
export type FaqCategory =
  | "Challenges"
  | "Funded accounts"
  | "Payouts"
  | "Company";

export type Faq = { q: string; a: string; cat: FaqCategory };

export const FAQ_CATEGORIES: FaqCategory[] = [
  "Challenges",
  "Funded accounts",
  "Payouts",
  "Company",
];

// Order matters: the home FaqPreview shows the first five.
export const faqs: Faq[] = [
  {
    q: "What is a trading challenge?",
    a: "A challenge is a two-phase evaluation on a demo account. Hit the profit target while respecting the loss limits and you qualify for a funded account.",
    cat: "Challenges",
  },
  {
    q: "What does “real funded (A-Book)” mean?",
    a: "It means funded traders trade on real capital in the live market, rather than on a permanent simulation. This is our core positioning. (Details pending final confirmation.)",
    cat: "Funded accounts",
  },
  {
    q: "How many phases are there?",
    a: "Two. Phase 1 has a higher profit target, Phase 2 a lower one. The same daily-loss and total-loss limits apply throughout.",
    cat: "Challenges",
  },
  {
    q: "Is there a time limit?",
    a: "No. The trading period is unlimited — there is a minimum number of trading days, but no deadline to reach the target.",
    cat: "Challenges",
  },
  {
    q: "What is the profit split?",
    a: "Funded traders keep the majority of the profit they make. Exact splits are shown on each challenge and confirmed at checkout.",
    cat: "Payouts",
  },
  {
    q: "Do I get my fee back?",
    a: "The challenge fee is designed to be refunded with your first payout on a funded account. Terms to be confirmed.",
    cat: "Payouts",
  },
  {
    q: "Is this an investment?",
    a: "No. A challenge evaluates trading skill; it is not an investment product and offers no guaranteed return. Trading carries real risk.",
    cat: "Company",
  },
  // NEEDS CLIENT INPUT — platform/broker arrangement is unresolved (CLAUDE.md §8 Q4).
  {
    q: "What platform do I trade on?",
    a: "The trading platform and broker arrangement are being finalised and will be confirmed before challenges go on sale.",
    cat: "Challenges",
  },
  {
    q: "Can I try again if I fail?",
    a: "Breaching a loss limit ends that evaluation, but you can start a new challenge at any time. Retry pricing is to be confirmed.",
    cat: "Challenges",
  },
  // NEEDS CLIENT INPUT — instrument list depends on the broker arrangement.
  {
    q: "What can I trade?",
    a: "The instrument list is being finalised alongside the platform. Expect major and minor FX pairs, with metals and indices to be confirmed.",
    cat: "Challenges",
  },
  {
    q: "What happens after I pass both phases?",
    a: "You receive a funded account. The same loss limits carry over, and you keep a share of the profit you generate from your first payout.",
    cat: "Funded accounts",
  },
  {
    q: "Can I lose money on a funded account?",
    a: "You never owe the losses on the account — the capital at risk is the firm's. Breaching a loss limit closes the account, and trading always carries risk to any fee you have paid.",
    cat: "Funded accounts",
  },
  // NEEDS CLIENT INPUT — payout schedule and method pending confirmation.
  {
    q: "How do payouts work?",
    a: "Payouts are requested on a regular schedule and paid on real trading results. The exact schedule and payment methods are to be confirmed.",
    cat: "Payouts",
  },
  {
    q: "Who is behind Game of Forex?",
    a: "Game of Forex was founded by Waqas Ahmed, a Pakistan-based forex trader who has run a trading community for years. See the About page for the full story.",
    cat: "Company",
  },
  {
    q: "Is Game of Forex a broker?",
    a: "No. Game of Forex is not a broker and is not a regulated entity, and nothing on this site is financial advice. Challenges evaluate trading skill.",
    cat: "Company",
  },
];
