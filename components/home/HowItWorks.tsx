import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { RULES } from "@/lib/challenges";

/**
 * How it works — three steps to funded. First card is the highlighted (blue)
 * step with a white number badge + CTA; steps 2–3 are dark glass. Honest
 * prop-firm A-Book flow, no income promises (§4).
 */
export function HowItWorks() {
  return (
    <Section id="how-it-works">
      {/* heading with accent bar */}
      <Reveal>
        <div className="flex items-start gap-4">
          <span className="mt-1 h-16 w-1 rounded-full bg-gradient-to-b from-[var(--color-blue-400)] to-[var(--color-blue-700)]" />
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
              How it works
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-5xl">
              Three steps to funded.
            </h2>
          </div>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {/* Step 01 — highlighted */}
        <Reveal>
          <div className="relative flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--color-blue-500)] to-[var(--color-blue-700)] p-8 text-white">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-white/15 blur-2xl"
            />
            <span className="grid size-14 place-items-center rounded-full bg-white font-display text-xl font-semibold text-[var(--bg-base)]">
              01
            </span>
            <h3 className="mt-6 font-display text-2xl font-semibold">
              Buy a challenge
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              Choose your account size and start the evaluation in minutes.
            </p>
            <Link
              href="/challenges"
              className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-3 text-sm font-medium text-[var(--bg-base)] transition-transform duration-[var(--dur-fast)] hover:-translate-y-0.5"
            >
              Buy challenge <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        {/* Step 02 */}
        <Reveal delay={0.08}>
          <StepCard
            n="02"
            title="Pass two phases"
            body="Hit the Phase 1 and Phase 2 targets within the loss limits. Unlimited time."
            pill="Prove your edge"
          />
        </Reveal>

        {/* Step 03 */}
        <Reveal delay={0.16}>
          <StepCard
            n="03"
            title="Get funded"
            body={`Trade real funded capital and keep up to ${RULES.profitSplit}% of the profit.`}
            pill="Trade & get paid"
          />
        </Reveal>
      </div>
    </Section>
  );
}

function StepCard({
  n,
  title,
  body,
  pill,
}: {
  n: string;
  title: string;
  body: string;
  pill: string;
}) {
  return (
    <div className="lush-card flex h-full flex-col p-8">
      <span className="grid size-14 place-items-center rounded-full border border-[var(--border-default)] bg-[var(--bg-base)]/60 font-display text-xl font-semibold text-[var(--accent)]">
        {n}
      </span>
      <h3 className="mt-6 font-display text-2xl font-semibold text-[var(--text-primary)]">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
        {body}
      </p>
      <div className="mt-8 rounded-full border border-[var(--border-subtle)] bg-white/[0.04] px-5 py-3 text-sm text-[var(--text-secondary)]">
        {pill}
      </div>
    </div>
  );
}
