import { RULES } from "@/lib/challenges";

// Reusable rules summary — used on the home preview and the /rules page.
// Percentages are size-agnostic; absolute amounts are shown per challenge.
const ITEMS: { label: string; value: string; note?: string }[] = [
  { label: "Phase 1 profit target", value: `${RULES.phase1Target}%` },
  { label: "Phase 2 profit target", value: `${RULES.phase2Target}%` },
  { label: "Max daily loss", value: `${RULES.maxDailyLoss}%` },
  { label: "Max total loss", value: `${RULES.maxTotalLoss}%` },
  { label: "Min trading days", value: `${RULES.minTradingDays}` },
  { label: "Trading period", value: RULES.tradingPeriod },
  { label: "Profit split", value: `Up to ${RULES.profitSplit}%` },
  { label: "Refund", value: RULES.refund },
];

export function RulesGrid() {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ITEMS.map((it) => (
        <div
          key={it.label}
          className="rounded-[var(--radius-lg)] glass-card p-5"
        >
          <dt className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
            {it.label}
          </dt>
          <dd className="tabular mt-2 font-display text-xl font-semibold text-[var(--text-primary)]">
            {it.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
