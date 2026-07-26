import { RULES } from "@/lib/challenges";

/**
 * What passes vs what ends the evaluation — one glass panel, two columns.
 * ✓ uses --market-up, ✕ uses --market-down (§3 rule 4: semantic colours only).
 * Items the client hasn't confirmed are marked NEEDS CLIENT INPUT.
 */
const PASSES: string[] = [
  `Reach the phase target across at least ${RULES.minTradingDays} trading days`,
  // NEEDS CLIENT INPUT — confirm permitted styles and any strategy restrictions.
  "Trade your own style — intraday, swing or position",
  "Take your time — the trading period is unlimited",
  // NEEDS CLIENT INPUT — confirm news/overnight policy per account terms.
  "Hold through news and overnight where the account terms allow it",
];

const FAILS: string[] = [
  `Equity drops more than ${RULES.maxDailyLoss}% below the day's starting balance`,
  `The account falls more than ${RULES.maxTotalLoss}% below its starting balance`,
  // NEEDS CLIENT INPUT — confirm copy-trading and account-sharing policy.
  "Copy-trading another account, or letting someone else trade yours",
  // NEEDS CLIENT INPUT — confirm the prohibited-practices list in the terms.
  "Prohibited practices under the terms, such as exploiting pricing errors",
];

export function PassFail() {
  return (
    <div className="glass-card overflow-hidden rounded-[var(--radius-xl)]">
      <div className="grid md:grid-cols-2">
        <div className="p-7 sm:p-9">
          <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-[var(--text-primary)]">
            <span
              aria-hidden
              className="grid size-7 place-items-center rounded-full bg-[var(--market-up)]/12 text-sm text-[var(--market-up)]"
            >
              ✓
            </span>
            What passes the evaluation
          </h3>
          <ul className="mt-5 space-y-3.5">
            {PASSES.map((t) => (
              <li
                key={t}
                className="flex gap-3 text-sm leading-relaxed text-[var(--text-secondary)]"
              >
                <span aria-hidden className="mt-0.5 shrink-0 text-[var(--market-up)]">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-[var(--border-subtle)] p-7 sm:p-9 md:border-l md:border-t-0">
          <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-[var(--text-primary)]">
            <span
              aria-hidden
              className="grid size-7 place-items-center rounded-full bg-[var(--market-down)]/12 text-sm text-[var(--market-down)]"
            >
              ✕
            </span>
            What ends the evaluation
          </h3>
          <ul className="mt-5 space-y-3.5">
            {FAILS.map((t) => (
              <li
                key={t}
                className="flex gap-3 text-sm leading-relaxed text-[var(--text-secondary)]"
              >
                <span aria-hidden className="mt-0.5 shrink-0 text-[var(--market-down)]">
                  ✕
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
