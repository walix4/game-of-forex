import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { RiskDisclosure } from "@/components/shared/RiskDisclosure";
import {
  challenges,
  RULES,
  usd,
  amountOf,
  pct,
} from "@/lib/challenges";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Challenge pricing from $10K to $200K. Fees, profit targets and loss limits compared side by side.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Every size, side by side."
        intro="One-time fees, no subscriptions. Compare targets and limits across account sizes."
      />

      <Section>
        <Reveal>
          <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--border-subtle)]">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-raised)]/50 text-left">
                  <th className="px-5 py-4 font-medium text-[var(--text-muted)]">
                    Account size
                  </th>
                  <th className="px-5 py-4 font-medium text-[var(--text-muted)]">Fee</th>
                  <th className="px-5 py-4 font-medium text-[var(--text-muted)]">
                    Phase 1 target
                  </th>
                  <th className="px-5 py-4 font-medium text-[var(--text-muted)]">
                    Phase 2 target
                  </th>
                  <th className="px-5 py-4 font-medium text-[var(--text-muted)]">
                    Max total loss
                  </th>
                  <th className="px-5 py-4 font-medium text-[var(--text-muted)]">Split</th>
                  <th className="px-5 py-4" />
                </tr>
              </thead>
              <tbody>
                {challenges.map((c) => (
                  <tr
                    key={c.slug}
                    className="border-b border-[var(--border-subtle)] last:border-0"
                  >
                    <th
                      scope="row"
                      className="tabular px-5 py-4 text-left font-semibold text-[var(--text-primary)]"
                    >
                      {usd(c.size)}
                      {c.popular && (
                        <span className="ml-2 rounded-full bg-[var(--accent-subtle)] px-2 py-0.5 text-[0.65rem] font-medium text-[var(--accent)]">
                          Popular
                        </span>
                      )}
                    </th>
                    <td className="tabular px-5 py-4 font-medium text-[var(--accent)]">
                      {usd(c.price)}
                    </td>
                    <td className="tabular px-5 py-4 text-[var(--text-secondary)]">
                      {usd(amountOf(c.size, RULES.phase1Target))}
                    </td>
                    <td className="tabular px-5 py-4 text-[var(--text-secondary)]">
                      {usd(amountOf(c.size, RULES.phase2Target))}
                    </td>
                    <td className="tabular px-5 py-4 text-[var(--text-secondary)]">
                      {usd(amountOf(c.size, RULES.maxTotalLoss))}
                    </td>
                    <td className="tabular px-5 py-4 text-[var(--text-secondary)]">
                      {pct(RULES.profitSplit)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/challenges/${c.slug}`}
                        className="text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <p className="mt-5 text-xs text-[var(--text-muted)]">
          {/* NEEDS CLIENT INPUT — confirm all pricing and targets. */}
          Illustrative pricing — pending client confirmation.
        </p>

        <Reveal className="mt-10">
          <RiskDisclosure />
        </Reveal>
      </Section>
    </>
  );
}
