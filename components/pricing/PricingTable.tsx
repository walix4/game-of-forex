import Link from "next/link";
import { challenges, RULES, usd, amountOf, pct } from "@/lib/challenges";
import { cn } from "@/lib/utils";

/**
 * Premium pricing comparison table — every size side by side. The popular row
 * carries a subtle accent tint + chip; no accent FILL here so the page's single
 * primary CTA (§3 rule 1) stays with the closing block.
 */
const COLUMNS = [
  "Account size",
  "Fee",
  "Phase 1 target",
  "Phase 2 target",
  "Max daily loss",
  "Max total loss",
  "Split",
] as const;

export function PricingTable() {
  return (
    <div className="glass overflow-hidden rounded-[var(--radius-xl)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[840px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Challenge fees, targets and limits for every account size
          </caption>
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-frame)]/40">
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="px-5 py-4 text-xs font-medium uppercase tracking-[0.08em] text-[var(--text-muted)]"
                >
                  {col}
                </th>
              ))}
              <th scope="col" className="px-5 py-4">
                <span className="sr-only">View challenge</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {challenges.map((c) => (
              <tr
                key={c.slug}
                className={cn(
                  "border-b border-[var(--border-subtle)] transition-colors duration-[var(--dur-fast)] last:border-0 hover:bg-white/[0.03]",
                  c.popular && "bg-[var(--accent)]/[0.05]",
                )}
              >
                <th
                  scope="row"
                  className="px-5 py-4.5 text-left font-semibold text-[var(--text-primary)]"
                >
                  <span className="tabular font-display text-base">
                    {usd(c.size)}
                  </span>
                  {c.popular && (
                    <span className="ml-2 rounded-full bg-[var(--accent-subtle)] px-2 py-0.5 align-middle text-[0.65rem] font-medium text-[var(--accent)]">
                      Popular
                    </span>
                  )}
                </th>
                <td className="tabular px-5 py-4.5 font-semibold text-[var(--accent)]">
                  {usd(c.price)}
                  <span className="ml-1 text-xs font-normal text-[var(--text-muted)]">
                    one-time
                  </span>
                </td>
                <td className="tabular px-5 py-4.5 text-[var(--text-secondary)]">
                  {usd(amountOf(c.size, RULES.phase1Target))}
                </td>
                <td className="tabular px-5 py-4.5 text-[var(--text-secondary)]">
                  {usd(amountOf(c.size, RULES.phase2Target))}
                </td>
                <td className="tabular px-5 py-4.5 text-[var(--text-secondary)]">
                  {usd(amountOf(c.size, RULES.maxDailyLoss))}
                </td>
                <td className="tabular px-5 py-4.5 text-[var(--text-secondary)]">
                  {usd(amountOf(c.size, RULES.maxTotalLoss))}
                </td>
                <td className="tabular px-5 py-4.5 text-[var(--text-secondary)]">
                  Up to {pct(RULES.profitSplit)}
                </td>
                <td className="px-5 py-4.5 text-right">
                  <Link
                    href={`/challenges/${c.slug}`}
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] transition-colors duration-[var(--dur-fast)] hover:text-[var(--accent-hover)]"
                  >
                    View
                    <span
                      aria-hidden
                      className="transition-transform duration-[var(--dur-fast)] group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
