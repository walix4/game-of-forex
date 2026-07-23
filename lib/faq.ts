// FAQ content — design mockup. NEEDS CLIENT INPUT for final answers.
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What is a trading challenge?",
    a: "A challenge is a two-phase evaluation on a demo account. Hit the profit target while respecting the loss limits and you qualify for a funded account.",
  },
  {
    q: "What does “real funded (A-Book)” mean?",
    a: "It means funded traders trade on real capital in the live market, rather than on a permanent simulation. This is our core positioning. (Details pending final confirmation.)",
  },
  {
    q: "How many phases are there?",
    a: "Two. Phase 1 has a higher profit target, Phase 2 a lower one. The same daily-loss and total-loss limits apply throughout.",
  },
  {
    q: "Is there a time limit?",
    a: "No. The trading period is unlimited — there is a minimum number of trading days, but no deadline to reach the target.",
  },
  {
    q: "What is the profit split?",
    a: "Funded traders keep the majority of the profit they make. Exact splits are shown on each challenge and confirmed at checkout.",
  },
  {
    q: "Do I get my fee back?",
    a: "The challenge fee is designed to be refunded with your first payout on a funded account. Terms to be confirmed.",
  },
  {
    q: "Is this an investment?",
    a: "No. A challenge evaluates trading skill; it is not an investment product and offers no guaranteed return. Trading carries real risk.",
  },
];
