"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { CtaButton } from "@/components/shared/CtaButton";
import { HeroVisual } from "@/components/home/HeroVisual";
import { RULES } from "@/lib/challenges";

/**
 * Prop-firm hero (CLAUDE.md §0 + §5.1). USP-forward: real funded (A-Book)
 * accounts, founded by Waqas Hamad. One headline, one primary (mint "Buy
 * challenge") + one secondary. Teal glow behind (light, not a fill). This is the
 * only page-load sequence. The <h1> animates transform-only (LCP-safe, §3).
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.52, ease: EASE } },
};
const headline: Variants = {
  hidden: { y: 18 },
  show: { y: 0, transition: { duration: 0.6, ease: EASE } },
};
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const FEATURES = [
  `Funded up to ${"$200K"}`,
  `Up to ${RULES.profitSplit}% profit split`,
  `${RULES.tradingPeriod} trading period`,
];

export function HeroSection() {
  const reduce = useReducedMotion();
  const initial = reduce ? "show" : "hidden";

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden px-6 pb-20 pt-14 sm:pb-28 sm:pt-20"
    >
      <motion.div
        aria-hidden
        className="glow-hero pointer-events-none absolute inset-0 -z-10"
        initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <motion.div
          variants={container}
          initial={initial}
          animate="show"
          className="flex flex-col items-start text-left"
        >
          {/* USP pill — NEEDS LEGAL SIGN-OFF on the "real funded / first" claim. */}
          <motion.p
            variants={rise}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-accent)] bg-[var(--accent-subtle)] px-3.5 py-1.5 text-xs font-medium tracking-wide text-[var(--accent)]"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-[var(--accent)]" />
            Real funded accounts · A-Book
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={headline}
            className="font-display text-4xl font-semibold leading-[1.03] tracking-[-0.02em] text-[var(--text-primary)] sm:text-6xl lg:text-[4.1rem]"
          >
            Get funded to trade{" "}
            <span className="text-gradient">real capital.</span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-lg text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
          >
            Game of Forex is a prop firm built on real funded accounts — not demo
            simulations. Pass a two-phase evaluation and trade our capital, keeping
            up to {RULES.profitSplit}% of the profit. Founded by Waqas Hamad.
          </motion.p>

          <motion.ul variants={rise} className="mt-6 flex flex-wrap gap-2.5">
            {FEATURES.map((f) => (
              <li
                key={f}
                className="tabular rounded-full border border-[var(--border-subtle)] bg-[var(--bg-raised)]/60 px-3 py-1.5 text-xs text-[var(--text-secondary)]"
              >
                {f}
              </li>
            ))}
          </motion.ul>

          <motion.div
            variants={rise}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <CtaButton href="/challenges" variant="primary">
              Buy challenge
            </CtaButton>
            <CtaButton href="/#how-it-works" variant="secondary">
              How it works
            </CtaButton>
          </motion.div>

          <motion.p variants={rise} className="mt-8 text-xs text-[var(--text-muted)]">
            Trading carries risk. Challenges evaluate skill — they are not an
            investment. Not financial advice.
          </motion.p>
        </motion.div>

        <div className="relative">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
