"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { CtaButton } from "@/components/shared/CtaButton";
import { challenges, RULES, usd, amountOf } from "@/lib/challenges";
import { cn } from "@/lib/utils";

/**
 * FTMO-style challenge matrix: legend column + one aligned column per account
 * size, with a %↔$ "show amounts" toggle. USD only (client decision).
 *
 * Deliberate deviations from the FTMO reference (CLAUDE.md):
 * - No "Avg. Reward" row — an unverifiable statistic (§4).
 * - No discount badges — no fake promos (§4).
 * - Only the popular card carries the accent FILL; the rest are outline
 *   (§3 rule 1 — one primary per viewport).
 * - Fees are illustrative only (NEEDS CLIENT INPUT).
 */

// Legend rows — order mirrors the card rows exactly; heights must match.
const LEGEND: { label: string; icon: string; tall?: boolean }[] = [
  { label: "Profit target", tall: true, icon: "target" },
  { label: "Max daily loss", icon: "down" },
  { label: "Max loss", icon: "down" },
  { label: "Min trading days", icon: "clock" },
  { label: "Trading period", icon: "calendar" },
  { label: "Refund", icon: "dollar" },
  { label: "Rewards", icon: "flag" },
];

// Descending sizes, FTMO-style (biggest first).
const SIZES = [...challenges].sort((a, b) => b.size - a.size);

function LegendIcon({ name }: { name: string }) {
  const stroke = {
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      className="size-4 shrink-0"
      aria-hidden
    >
      {name === "target" && (
        <>
          <circle cx="8" cy="8" r="6" {...stroke} />
          <circle cx="8" cy="8" r="2.5" {...stroke} />
        </>
      )}
      {name === "down" && <path d="M8 3v10M4 9l4 4 4-4" {...stroke} />}
      {name === "clock" && (
        <>
          <circle cx="8" cy="8" r="6" {...stroke} />
          <path d="M8 5v3l2 2" {...stroke} />
        </>
      )}
      {name === "calendar" && (
        <>
          <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" {...stroke} />
          <path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" {...stroke} />
        </>
      )}
      {name === "dollar" && (
        <path d="M8 2v12M11 4.5H6.5a2 2 0 100 4h3a2 2 0 110 4H5" {...stroke} />
      )}
      {name === "flag" && <path d="M4 14V3l8 3-8 3" {...stroke} />}
    </svg>
  );
}

/** One value row inside a card. Mobile shows an inline label; lg aligns to the legend. */
function Row({
  label,
  tall,
  children,
}: {
  label: string;
  tall?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 border-t border-[var(--border-subtle)] px-5 transition-colors duration-[var(--dur-fast)] hover:bg-white/[0.025]",
        tall ? "min-h-14 lg:h-16" : "min-h-11 lg:h-12",
      )}
    >
      <span className="text-xs text-[var(--text-muted)] lg:hidden">{label}</span>
      {children}
    </div>
  );
}

export function ChallengeMatrix() {
  const [showAmounts, setShowAmounts] = useState(false);
  // Clicking a card selects it — the highlight and the single primary CTA
  // follow the selection (§3 rule 1 still holds: one accent fill at a time).
  const [selected, setSelected] = useState(
    () => SIZES.find((s) => s.popular)?.slug ?? SIZES[0].slug,
  );
  const reduce = useReducedMotion();

  // % or absolute $ depending on the toggle (FTMO's "Show numbers").
  const val = (size: number, percent: number) =>
    showAmounts ? usd(amountOf(size, percent)) : `${percent}%`;

  return (
    <Section id="challenges">
      <SectionHeading
        eyebrow="Challenges"
        title="Choose your account size."
        intro="Two phases, one rule set. Every number is on the table before you pay."
        align="center"
      />

      {/* controls — USD note + amounts toggle (USD-only per client) */}
      <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <span
            aria-hidden
            className="grid size-6 place-items-center rounded-full border border-[var(--border-default)] bg-white/[0.04] text-[0.7rem] font-semibold text-[var(--text-secondary)]"
          >
            $
          </span>
          All accounts and fees in USD
        </p>

        <button
          type="button"
          role="switch"
          aria-checked={showAmounts}
          onClick={() => setShowAmounts((v) => !v)}
          className="group flex items-center gap-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
        >
          <span
            aria-hidden
            className={cn(
              "relative h-6 w-11 rounded-full border border-[var(--border-default)] transition-colors duration-[var(--dur-base)]",
              showAmounts ? "bg-[var(--accent)]" : "bg-white/10",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 size-[18px] rounded-full bg-white transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] motion-reduce:transition-none",
                showAmounts && "translate-x-5",
              )}
            />
          </span>
          Show amounts
        </button>
      </Reveal>

      {/* matrix — legend + one column per size; rows height-locked at lg */}
      <Reveal className="relative mt-6">
        {/* ambient glow pooling behind the columns */}
        <div
          aria-hidden
          className="glow-hero pointer-events-none absolute inset-x-0 -inset-y-10 -z-10 opacity-60 lg:-inset-x-16"
        />
        <div className="grid gap-4 lg:grid-cols-[minmax(170px,200px)_repeat(5,minmax(0,1fr))]">
          {/* legend (lg+ only; mobile uses inline row labels) */}
          <div className="hidden lg:block">
            {/* spacer matches card header height */}
            <div className="h-[104px]" />
            {LEGEND.map((l) => (
              <div
                key={l.label}
                className={cn(
                  "flex items-center gap-3 pr-3 text-sm text-[var(--text-secondary)]",
                  l.tall ? "h-16" : "h-12",
                )}
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-[10px] border border-[var(--border-subtle)] bg-white/[0.04] text-[var(--accent)]">
                  <LegendIcon name={l.icon} />
                </span>
                <span className="border-b border-dashed border-[var(--border-default)] pb-0.5">
                  {l.label}
                </span>
              </div>
            ))}
          </div>

          {SIZES.map((c, i) => {
            const isSel = selected === c.slug;
            const values = (
              <motion.div
                key={showAmounts ? "amounts" : "percent"}
                initial={reduce ? false : { opacity: 0.35 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <Row label="Profit target" tall>
                  <span className="text-right text-sm">
                    <span className="block">
                      <span className="mr-2 text-[0.65rem] uppercase tracking-[0.08em] text-[var(--text-muted)]">
                        Phase 1
                      </span>
                      <span className="tabular font-medium text-[var(--text-primary)]">
                        {val(c.size, RULES.phase1Target)}
                      </span>
                    </span>
                    <span className="block">
                      <span className="mr-2 text-[0.65rem] uppercase tracking-[0.08em] text-[var(--text-muted)]">
                        Phase 2
                      </span>
                      <span className="tabular font-medium text-[var(--text-primary)]">
                        {val(c.size, RULES.phase2Target)}
                      </span>
                    </span>
                  </span>
                </Row>
                <Row label="Max daily loss">
                  <span className="tabular text-sm font-medium text-[var(--text-primary)]">
                    {val(c.size, RULES.maxDailyLoss)}
                  </span>
                </Row>
                <Row label="Max loss">
                  <span className="tabular text-sm font-medium text-[var(--text-primary)]">
                    {val(c.size, RULES.maxTotalLoss)}
                  </span>
                </Row>
                <Row label="Min trading days">
                  <span className="tabular text-sm font-medium text-[var(--text-primary)]">
                    {RULES.minTradingDays} days
                  </span>
                </Row>
                <Row label="Trading period">
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {RULES.tradingPeriod}
                  </span>
                </Row>
                <Row label="Refund">
                  <span className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-primary)]">
                    Yes
                    <span
                      className={cn(
                        "tabular rounded-full px-2 py-0.5 text-[0.65rem] font-semibold transition-colors duration-[var(--dur-base)]",
                        isSel
                          ? "bg-[var(--gold-500)]/15 text-[var(--gold-400)]"
                          : "bg-[var(--accent-subtle)] text-[var(--accent)]",
                      )}
                    >
                      100%
                    </span>
                  </span>
                </Row>
                <Row label="Rewards">
                  <span className="tabular text-sm font-medium text-[var(--text-primary)]">
                    up to {RULES.profitSplit}%
                  </span>
                </Row>
              </motion.div>
            );

            return (
              <Reveal key={c.slug} delay={i * 0.05}>
                <div
                  onClick={() => setSelected(c.slug)}
                  className={cn(
                    "relative flex h-full cursor-pointer flex-col overflow-visible rounded-[var(--radius-lg)] transition-[transform,box-shadow,border-color] duration-[var(--dur-base)] ease-[var(--ease-out)] motion-reduce:transition-none",
                    isSel
                      ? "ring-gold glass glow-gold lg:-translate-y-1.5"
                      : "glass-card",
                  )}
                >
                  {/* selected-state inner radial tint */}
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(120%_55%_at_50%_0%,rgb(245_184_67/0.16),transparent_62%)] transition-opacity duration-[var(--dur-base)]",
                      isSel ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {c.popular && (
                    <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-b from-[var(--gold-400)] to-[var(--gold-600)] px-3.5 py-1 text-xs font-semibold text-[var(--bg-base)] shadow-[0_6px_24px_-4px_var(--gold-500)]">
                      Best value
                    </span>
                  )}

                  {/* header — keyboard-accessible select control; soft glow wash */}
                  <button
                    type="button"
                    aria-pressed={isSel}
                    onClick={() => setSelected(c.slug)}
                    className="relative flex h-[104px] w-full flex-col items-center justify-center overflow-hidden rounded-t-[var(--radius-lg)] px-5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--focus-ring)]"
                  >
                    <div
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute inset-x-0 -top-10 h-24 rounded-[50%] blur-2xl transition-colors duration-[var(--dur-base)]",
                        isSel ? "bg-[var(--gold-500)]/30" : "bg-white/[0.05]",
                      )}
                    />
                    <span className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      Account
                    </span>
                    <span
                      className={cn(
                        "tabular mt-1 font-display text-2xl font-semibold xl:text-[1.7rem]",
                        isSel ? "text-gradient-gold" : "text-[var(--text-primary)]",
                      )}
                    >
                      {usd(c.size)}
                    </span>
                  </button>

                  {values}

                  {/* fee + CTA */}
                  <div className="mt-auto border-t border-[var(--border-subtle)] p-5 text-center">
                    <p
                      className={cn(
                        "tabular font-display text-[1.75rem] font-semibold leading-none",
                        isSel ? "text-gradient-gold" : "text-[var(--text-primary)]",
                      )}
                    >
                      {usd(c.price)}
                    </p>
                    <p className="mt-1.5 text-[0.65rem] text-[var(--text-muted)]">
                      one-time refundable fee
                    </p>
                    <CtaButton
                      href={`/challenges/${c.slug}`}
                      variant={isSel ? "primary" : "secondary"}
                      className="mt-4 h-10 w-full px-3 text-sm"
                    >
                      Start now
                    </CtaButton>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Reveal>

      <p className="mt-5 text-center text-xs text-[var(--text-muted)]">
        {/* NEEDS CLIENT INPUT — fees and rules are illustrative. */}
        Illustrative pricing, to be confirmed before launch.
      </p>
    </Section>
  );
}
