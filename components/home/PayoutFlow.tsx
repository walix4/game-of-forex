import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { RULES } from "@/lib/challenges";

/**
 * How you get paid — three connected steps. Copy stays on the mechanics of the
 * split (profits the trader generates), never an income promise (§4). No accent
 * FILL here; the closing CTA below owns the viewport's primary action.
 */
const STEPS = [
  {
    title: "Trade your funded account",
    body: "Trade real funded capital under the same rules you passed with. No new targets, no surprise conditions.",
  },
  {
    title: "Request a payout",
    body: "Ask for a payout from your dashboard once the payout window opens. Your results are reviewed against the rules.",
  },
  {
    title: "Receive your split",
    body: `Keep up to ${RULES.profitSplit}% of the profits you generate. Your first payout also refunds your challenge fee.`,
  },
];

export function PayoutFlow() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Payouts"
        title="How you get paid."
        intro="A clear path from funded trading to your share of the results — no hidden conditions between you and a payout."
      />

      <div className="relative mt-14">
        {/* gradient connector behind the step markers — desktop only */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-7 hidden h-px lg:block"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-blue-500) 20%, var(--color-blue-500) 80%, transparent)",
            opacity: 0.35,
          }}
        />
        <ol className="grid gap-10 lg:grid-cols-3 lg:gap-6">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.08} className="relative">
              <div className="glass grid size-14 place-items-center rounded-full">
                <span className="tabular font-display text-lg font-semibold text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-[var(--text-primary)]">
                {s.title}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
                {s.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>

      <p className="mt-10 text-xs text-[var(--text-muted)]">
        {/* NEEDS CLIENT INPUT — payout schedule, method and processing time. */}
        Payout schedule and method pending confirmation — final terms are shown
        before you buy.
      </p>
    </Section>
  );
}
