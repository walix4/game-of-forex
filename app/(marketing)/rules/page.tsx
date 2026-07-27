import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { RulesGrid } from "@/components/shared/RulesGrid";
import { RiskDisclosure } from "@/components/shared/RiskDisclosure";
import { CtaButton } from "@/components/shared/CtaButton";
import { DrawdownVisual } from "@/components/rules/DrawdownVisual";
import { PassFail } from "@/components/rules/PassFail";
import { RULES } from "@/lib/challenges";

export const metadata: Metadata = {
  title: "Trading rules",
  description:
    "The rules on every EZE Funded challenge: profit targets, loss limits, trading days and the split.",
};

const EXPLAINED = [
  {
    title: "Profit targets",
    body: `Phase 1 asks for a ${RULES.phase1Target}% gain, Phase 2 a ${RULES.phase2Target}% gain. Reach the target without breaking a loss limit to pass the phase.`,
  },
  {
    title: "Maximum daily loss",
    body: `Your equity may not drop more than ${RULES.maxDailyLoss}% below the day's starting balance. This resets each trading day.`,
  },
  {
    title: "Maximum total loss",
    body: `Your account may never fall more than ${RULES.maxTotalLoss}% below its starting balance. Breaching this ends the evaluation.`,
  },
  {
    title: "Minimum trading days",
    body: `You must trade on at least ${RULES.minTradingDays} separate days. There is no maximum — the trading period is ${RULES.tradingPeriod.toLowerCase()}.`,
  },
  {
    title: "Profit split",
    body: `On a funded account you keep up to ${RULES.profitSplit}% of the profit you generate, paid out on a regular schedule.`,
  },
  {
    title: "Refund & rewards",
    body: `${RULES.refund}. ${RULES.rewards}.`,
  },
];

export default function RulesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trading rules"
        title="One rule set. No surprises."
        intro="Both phases, every account size, one rule set. Dollar amounts for your size are on each challenge page."
      />

      <Section>
        <Reveal>
          <RulesGrid />
        </Reveal>

        <Reveal className="mt-14">
          <DrawdownVisual />
        </Reveal>

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {EXPLAINED.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 0.05}>
              <div className="h-full rounded-[var(--radius-lg)] glass-card p-6">
                <span className="tabular text-xs font-medium text-[var(--text-muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-2 font-display text-lg font-semibold text-[var(--text-primary)]">
                  {e.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {e.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14">
          <PassFail />
        </Reveal>

        <Reveal className="mt-12 flex flex-col items-center gap-3 text-center">
          <p className="text-[var(--text-secondary)]">
            Know the rules? Pick your account size.
          </p>
          <CtaButton href="/challenges" variant="secondary">
            View challenges
          </CtaButton>
        </Reveal>

        <p className="mt-10 text-xs text-[var(--text-muted)]">
          {/* NEEDS CLIENT INPUT — confirm all rule values and payout terms. */}
          Rule values are placeholders pending client confirmation.
        </p>

        <Reveal className="mt-6">
          <RiskDisclosure />
        </Reveal>
      </Section>
    </>
  );
}
