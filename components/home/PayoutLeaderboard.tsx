"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

/**
 * "Traders getting paid" leaderboard — podium + a table that rotates a new
 * payout in every 4s so the section feels alive.
 *
 * ⚠️ §4: ALL DATA HERE IS ILLUSTRATIVE SAMPLE DATA and is labelled as such in
 * the UI. NEEDS CLIENT INPUT — replace with real, verifiable payout records
 * before launch or remove the section. Never ship invented payouts as real.
 */

type Payout = {
  id: number;
  name: string;
  cc: string; // flagcdn code
  country: string;
  size: string; // program / account size
  amount: number;
};

// Generic first names + countries, obviously sample. Amounts modest.
const POOL: Payout[] = [
  { id: 1, name: "Ahmed", cc: "pk", country: "Pakistan", size: "$50K", amount: 4180 },
  { id: 2, name: "Sara", cc: "ae", country: "UAE", size: "$100K", amount: 7940 },
  { id: 3, name: "Daniel", cc: "gb", country: "United Kingdom", size: "$25K", amount: 1830 },
  { id: 4, name: "Yusuf", cc: "ng", country: "Nigeria", size: "$50K", amount: 3610 },
  { id: 5, name: "Mei", cc: "sg", country: "Singapore", size: "$200K", amount: 11250 },
  { id: 6, name: "Carlos", cc: "br", country: "Brazil", size: "$10K", amount: 720 },
  { id: 7, name: "Fatima", cc: "ma", country: "Morocco", size: "$50K", amount: 2980 },
  { id: 8, name: "Jan", cc: "de", country: "Germany", size: "$100K", amount: 6420 },
  { id: 9, name: "Ali", cc: "pk", country: "Pakistan", size: "$25K", amount: 1540 },
  { id: 10, name: "Nadia", cc: "id", country: "Indonesia", size: "$50K", amount: 3350 },
  { id: 11, name: "Tom", cc: "au", country: "Australia", size: "$100K", amount: 5870 },
  { id: 12, name: "Kenji", cc: "jp", country: "Japan", size: "$200K", amount: 9660 },
];

// Podium per period — bigger periods, bigger numbers. All illustrative.
const PODIUM: Record<string, { name: string; cc: string; country: string; size: string; amount: number }[]> = {
  "Last 7 days": [
    { name: "Mei", cc: "sg", country: "Singapore", size: "$200K", amount: 11250 },
    { name: "Sara", cc: "ae", country: "UAE", size: "$100K", amount: 7940 },
    { name: "Jan", cc: "de", country: "Germany", size: "$100K", amount: 6420 },
  ],
  "Last 30 days": [
    { name: "Kenji", cc: "jp", country: "Japan", size: "$200K", amount: 23480 },
    { name: "Sara", cc: "ae", country: "UAE", size: "$100K", amount: 19120 },
    { name: "Ahmed", cc: "pk", country: "Pakistan", size: "$50K", amount: 14760 },
  ],
  Lifetime: [
    { name: "Mei", cc: "sg", country: "Singapore", size: "$200K", amount: 86300 },
    { name: "Kenji", cc: "jp", country: "Japan", size: "$200K", amount: 71040 },
    { name: "Tom", cc: "au", country: "Australia", size: "$100K", amount: 58210 },
  ],
};

const PERIODS = Object.keys(PODIUM);

const usd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

function Flag({ cc }: { cc: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w40/${cc}.png`}
      alt=""
      width={20}
      height={15}
      loading="lazy"
      className="h-[15px] w-5 rounded-[2px] object-cover"
    />
  );
}

// Podium rank styling: #1 gold, #2 accent, #3 quiet.
const RANK_STYLE = [
  { chip: "border-[var(--gold-500)]/40 text-[var(--gold-400)]", card: "ring-gold glass glow-gold", label: "#1 · Top paid" },
  { chip: "border-[var(--accent)]/40 text-[var(--accent)]", card: "ring-accent glass", label: "#2" },
  { chip: "border-[var(--border-default)] text-[var(--text-muted)]", card: "glass-card", label: "#3" },
];

export function PayoutLeaderboard() {
  const reduce = useReducedMotion();
  const [period, setPeriod] = useState(PERIODS[0]);
  const [head, setHead] = useState(0);

  // A new payout rotates in every 4s (paused under reduced motion).
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setHead((h) => h + 1), 4000);
    return () => clearInterval(t);
  }, [reduce]);

  const rows = Array.from(
    { length: 6 },
    (_, i) => POOL[(head + i) % POOL.length],
  );

  return (
    <Section id="payouts">
      <SectionHeading
        eyebrow="Payouts"
        title="Traders getting paid with EZE Funded."
        intro="Every payout on a funded account is a trader who passed and kept trading well."
        align="center"
      />

      {/* period tabs */}
      <Reveal className="mt-10 flex justify-center">
        <div role="group" aria-label="Payout period" className="glass flex items-center gap-1 rounded-full p-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={period === p}
              onClick={() => setPeriod(p)}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors duration-[var(--dur-fast)]",
                period === p
                  ? "bg-[var(--accent)] font-medium text-[var(--text-on-accent)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </Reveal>

      {/* podium */}
      <Reveal className="mt-8">
        <motion.div
          key={period}
          initial={reduce ? false : { opacity: 0.4, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {PODIUM[period].map((t, i) => (
            <div
              key={t.name}
              className={cn("rounded-[var(--radius-lg)] p-6", RANK_STYLE[i].card)}
            >
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                  RANK_STYLE[i].chip,
                )}
              >
                {RANK_STYLE[i].label}
              </span>
              <p className="mt-4 flex items-center gap-2 font-display text-lg font-semibold text-[var(--text-primary)]">
                {t.name}
                <Flag cc={t.cc} />
                <span className="text-sm font-normal text-[var(--text-muted)]">
                  {t.country}
                </span>
              </p>
              <p
                className={cn(
                  "tabular mt-4 font-display text-4xl font-semibold",
                  i === 0 ? "text-gradient-gold" : "text-[var(--text-primary)]",
                )}
              >
                {usd(t.amount)}
              </p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                {t.size} account
              </p>
            </div>
          ))}
        </motion.div>
      </Reveal>

      {/* live table — one new payout rotates in every 4s */}
      <Reveal className="mt-6">
        <div className="glass-card overflow-hidden rounded-[var(--radius-xl)]">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-5 py-3.5">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
              Recent payouts
            </p>
            <p className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <span aria-hidden className="relative flex size-2">
                <span className="anim-ping-ring absolute inline-flex size-full rounded-full border border-[var(--market-up)]" />
                <span className="relative inline-flex size-2 rounded-full bg-[var(--market-up)]" />
              </span>
              Live
            </p>
          </div>
          <ul>
            <AnimatePresence initial={false} mode="popLayout">
              {rows.map((r, i) => (
                <motion.li
                  key={r.id}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, x: -28, backgroundColor: "rgba(22,199,132,0.10)" }}
                  animate={{ opacity: 1, x: 0, backgroundColor: "rgba(22,199,132,0)" }}
                  exit={reduce ? undefined : { opacity: 0, x: 28 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 border-t border-[var(--border-subtle)] px-5 py-3.5 first:border-t-0 sm:gap-4"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-[var(--border-default)] text-xs text-[var(--text-muted)]">
                    {i + 4}
                  </span>
                  <span className="w-20 shrink-0 text-sm font-medium text-[var(--text-primary)] sm:w-28">
                    {r.name}
                  </span>
                  <span className="hidden min-w-0 flex-1 items-center gap-2 text-sm text-[var(--text-secondary)] sm:flex">
                    <Flag cc={r.cc} />
                    <span className="truncate">{r.country}</span>
                  </span>
                  <span className="tabular hidden shrink-0 rounded-full border border-[var(--border-default)] px-2.5 py-0.5 text-xs text-[var(--text-secondary)] sm:inline">
                    {r.size}
                  </span>
                  <span className="tabular ml-auto shrink-0 text-sm font-semibold text-[var(--text-primary)]">
                    {usd(r.amount)}
                  </span>
                  <span className="shrink-0 rounded-full bg-[var(--market-up)]/12 px-2.5 py-0.5 text-xs font-semibold text-[var(--market-up)]">
                    Paid
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </Reveal>

      <p className="mt-5 text-center text-xs text-[var(--text-muted)]">
        {/* NEEDS CLIENT INPUT — must be real, verifiable payout records at launch (§4). */}
        Illustrative sample data. Real payout records will be shown here at
        launch.
      </p>
    </Section>
  );
}
