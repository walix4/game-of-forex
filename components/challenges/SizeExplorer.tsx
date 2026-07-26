"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CtaButton } from "@/components/shared/CtaButton";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { challenges, RULES, usd, amountOf } from "@/lib/challenges";
import { cn } from "@/lib/utils";

/**
 * Interactive account-size explorer — the page's primary action. Selecting a
 * size swaps the detail panel with a subtle rise (keyed on slug, reduced-motion
 * safe). The Buy button is the ONLY accent fill in the viewport (§3 rule 1);
 * active pills use white/10 + accent text instead.
 */
export function SizeExplorer() {
  const [slug, setSlug] = useState(
    challenges.find((c) => c.popular)?.slug ?? challenges[0].slug,
  );
  const reduce = useReducedMotion();
  const c = challenges.find((ch) => ch.slug === slug) ?? challenges[0];

  const figures: { label: string; value: string; sub?: string }[] = [
    {
      label: "Phase 1 target",
      value: usd(amountOf(c.size, RULES.phase1Target)),
      sub: `${RULES.phase1Target}%`,
    },
    {
      label: "Phase 2 target",
      value: usd(amountOf(c.size, RULES.phase2Target)),
      sub: `${RULES.phase2Target}%`,
    },
    {
      label: "Max daily loss",
      value: usd(amountOf(c.size, RULES.maxDailyLoss)),
      sub: `${RULES.maxDailyLoss}%`,
    },
    {
      label: "Max total loss",
      value: usd(amountOf(c.size, RULES.maxTotalLoss)),
      sub: `${RULES.maxTotalLoss}%`,
    },
    { label: "Profit split", value: `Up to ${RULES.profitSplit}%` },
    { label: "Trading period", value: RULES.tradingPeriod },
  ];

  return (
    <div>
      {/* size pills */}
      <div
        role="group"
        aria-label="Choose an account size"
        className="glass inline-flex max-w-full flex-wrap items-center gap-1 rounded-full p-1.5"
      >
        {challenges.map((ch) => (
          <button
            key={ch.slug}
            type="button"
            aria-pressed={ch.slug === slug}
            onClick={() => setSlug(ch.slug)}
            className={cn(
              "tabular relative rounded-full px-4 py-2 text-sm transition-colors duration-[var(--dur-fast)]",
              ch.slug === slug
                ? "bg-white/10 font-medium text-[var(--accent-hover)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
            )}
          >
            {usd(ch.size)}
            {ch.popular && (
              <span
                aria-hidden
                className="absolute -top-0.5 right-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                title="Most popular"
              />
            )}
          </button>
        ))}
      </div>

      {/* detail panel — keyed on slug so the swap animates once per selection */}
      <motion.div
        key={c.slug}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        className="ring-accent glass mt-6 grid gap-8 rounded-[var(--radius-xl)] p-7 sm:p-9 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="tabular font-display text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
              {usd(c.size)}{" "}
              <span className="text-lg font-medium text-[var(--text-muted)]">
                account
              </span>
            </h2>
            {c.popular && (
              <span className="rounded-full bg-[var(--accent-subtle)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                Most popular
              </span>
            )}
          </div>

          <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
            {figures.map((f) => (
              <div key={f.label}>
                <dt className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  {f.label}
                </dt>
                <dd className="tabular mt-1.5 font-display text-lg font-semibold text-[var(--text-primary)]">
                  {f.value}
                  {f.sub && (
                    <span className="tabular ml-1.5 text-xs font-normal text-[var(--text-muted)]">
                      {f.sub}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col justify-between gap-6 rounded-[var(--radius-lg)] bg-[var(--bg-frame)]/40 p-6 lg:border-l lg:border-[var(--border-subtle)]">
          <div>
            <p className="text-sm text-[var(--text-muted)]">One-time fee</p>
            <p className="tabular mt-1 font-display text-4xl font-semibold text-[var(--text-primary)]">
              {usd(c.price)}
            </p>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              {RULES.refund}.
            </p>
          </div>
          <div>
            <CtaButton
              href={`/challenges/${c.slug}`}
              variant="primary"
              className="w-full"
            >
              Buy {usd(c.size)} challenge
            </CtaButton>
            <ArrowLink
              href={`/challenges/${c.slug}`}
              className="mt-3 w-full justify-center"
            >
              Full rules and details
            </ArrowLink>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
