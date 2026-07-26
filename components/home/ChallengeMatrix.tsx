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
 * size, with a currency switch and a %↔$ "show amounts" toggle.
 *
 * Deliberate deviations from the FTMO reference (CLAUDE.md):
 * - No "Avg. Reward" row — an unverifiable statistic (§4).
 * - No discount badges — no fake promos (§4).
 * - Only the popular card carries the accent FILL; the rest are outline
 *   (§3 rule 1 — one primary per viewport).
 * - FX conversion is illustrative only (NEEDS CLIENT INPUT — real rates/fees).
 */

type Currency = "USD" | "GBP" | "EUR";

// Illustrative FX for the mockup — never live rates. NEEDS CLIENT INPUT.
const FX: Record<Currency, { rate: number; format: (n: number) => string }> = {
  USD: { rate: 1, format: (n) => usd(n) },
  GBP: {
    rate: 0.79,
    format: (n) =>
      new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 0,
      }).format(n),
  },
  EUR: {
    rate: 0.92,
    format: (n) =>
      new Intl.NumberFormat("en-IE", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(n),
  },
};

const CURRENCIES: { code: Currency; flag: string }[] = [
  { code: "USD", flag: "us" },
  { code: "GBP", flag: "gb" },
  { code: "EUR", flag: "eu" },
];

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
        "flex items-center justify-between gap-2 border-t border-[var(--border-subtle)] px-5",
        tall ? "min-h-14 lg:h-16" : "min-h-11 lg:h-12",
      )}
    >
      <span className="text-xs text-[var(--text-muted)] lg:hidden">{label}</span>
      {children}
    </div>
  );
}

export function ChallengeMatrix() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [showAmounts, setShowAmounts] = useState(false);
  const reduce = useReducedMotion();

  const fx = FX[currency];
  const fee = (n: number) => fx.format(Math.round(n * fx.rate));
  // % or absolute $ depending on the toggle (FTMO's "Show numbers").
  const val = (size: number, percent: number) =>
    showAmounts ? usd(amountOf(size, percent)) : `${percent}%`;

  return (
    <Section id="challenges">
      <SectionHeading
        eyebrow="Challenges"
        title="Choose your account size."
        intro="Same two phases, same rules — pick the size that fits. Every number is shown before you buy."
        align="center"
      />

      {/* controls — currency pills + amounts toggle */}
      <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Fee currency"
          className="glass flex items-center gap-1 rounded-full p-1"
        >
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              type="button"
              aria-pressed={currency === c.code}
              onClick={() => setCurrency(c.code)}
              className={cn(
                "flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm transition-colors duration-[var(--dur-fast)]",
                currency === c.code
                  ? "bg-white/10 text-[var(--text-primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
              )}
            >
              {/* flagcdn is already the flag idiom in WhyChoose */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://flagcdn.com/w40/${c.flag}.png`}
                alt=""
                width={20}
                height={15}
                className="h-[15px] w-5 rounded-[2px] object-cover"
              />
              {c.code}
            </button>
          ))}
        </div>

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
      <Reveal className="mt-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(170px,200px)_repeat(5,minmax(0,1fr))]">
          {/* legend (lg+ only; mobile uses inline row labels) */}
          <div className="hidden lg:block">
            {/* spacer matches card header height */}
            <div className="h-[104px]" />
            {LEGEND.map((l) => (
              <div
                key={l.label}
                className={cn(
                  "flex items-center gap-2.5 pr-3 text-sm text-[var(--text-secondary)]",
                  l.tall ? "h-16" : "h-12",
                )}
              >
                <span className="text-[var(--text-muted)]">
                  <LegendIcon name={l.icon} />
                </span>
                <span className="border-b border-dashed border-[var(--border-default)] pb-0.5">
                  {l.label}
                </span>
              </div>
            ))}
          </div>

          {SIZES.map((c, i) => {
            const values = (
              <motion.div
                key={`${currency}-${showAmounts}`}
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
                    <span className="tabular rounded-full bg-[var(--accent-subtle)] px-2 py-0.5 text-[0.65rem] font-semibold text-[var(--accent)]">
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
                  className={cn(
                    "relative flex h-full flex-col overflow-visible rounded-[var(--radius-lg)]",
                    c.popular ? "ring-accent glass glow-mint" : "glass-card",
                  )}
                >
                  {c.popular && (
                    <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-[var(--text-on-accent)]">
                      Best value
                    </span>
                  )}

                  {/* header — matches the legend spacer height */}
                  <div className="flex h-[104px] flex-col items-center justify-center px-5">
                    <span className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      Account
                    </span>
                    <span className="tabular mt-1 font-display text-2xl font-semibold text-[var(--text-primary)] xl:text-[1.7rem]">
                      {usd(c.size)}
                    </span>
                  </div>

                  {values}

                  {/* fee + CTA */}
                  <div className="mt-auto border-t border-[var(--border-subtle)] p-5 text-center">
                    <p className="tabular font-display text-2xl font-semibold text-[var(--text-primary)]">
                      {fee(c.price)}
                    </p>
                    <p className="mt-0.5 text-[0.65rem] text-[var(--text-muted)]">
                      one-time refundable fee
                    </p>
                    <CtaButton
                      href={`/challenges/${c.slug}`}
                      variant={c.popular ? "primary" : "secondary"}
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
        {/* NEEDS CLIENT INPUT — fees, rules and FX conversion are illustrative. */}
        Illustrative pricing and FX conversion — pending client confirmation.
      </p>
    </Section>
  );
}
