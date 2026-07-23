/**
 * Challenge catalogue — DESIGN MOCKUP DATA (design-mockups-only build).
 * Prices, targets and rules are ILLUSTRATIVE placeholders and are marked
 * NEEDS CLIENT INPUT wherever they ship. Nothing here provisions an account or
 * takes payment — the "Buy" flow is a non-functional front-end (see CLAUDE.md §0).
 */

export type Challenge = {
  slug: string;
  size: number; // account size in USD
  price: number; // challenge fee in USD — NEEDS CLIENT INPUT
  popular?: boolean;
};

export type ChallengeRules = {
  phase1Target: number; // %
  phase2Target: number; // %
  maxDailyLoss: number; // %
  maxTotalLoss: number; // %
  minTradingDays: number;
  tradingPeriod: string;
  profitSplit: number; // %
  refund: string;
  rewards: string;
};

// Shared across all sizes for the mockup. NEEDS CLIENT INPUT to confirm.
export const RULES: ChallengeRules = {
  phase1Target: 10,
  phase2Target: 5,
  maxDailyLoss: 5,
  maxTotalLoss: 10,
  minTradingDays: 4,
  tradingPeriod: "Unlimited",
  profitSplit: 80,
  refund: "Fee refunded with your first payout",
  rewards: "Profit split from your first funded payout",
};

export const challenges: Challenge[] = [
  { slug: "10k", size: 10_000, price: 89 },
  { slug: "25k", size: 25_000, price: 189 },
  { slug: "50k", size: 50_000, price: 299, popular: true },
  { slug: "100k", size: 100_000, price: 499 },
  { slug: "200k", size: 200_000, price: 999 },
];

export const getChallenge = (slug: string) =>
  challenges.find((c) => c.slug === slug);

export const usd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export const pct = (n: number) => `${n}%`;

// Amount helpers derived from a size (for display only).
export const amountOf = (size: number, percent: number) => (size * percent) / 100;
