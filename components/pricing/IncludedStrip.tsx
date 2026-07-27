import type { ReactNode } from "react";
import { Reveal } from "@/components/shared/Reveal";
import { RULES } from "@/lib/challenges";

/**
 * What every challenge includes — same terms at every size. Values come from
 * the shared RULES so this never drifts from the table above it.
 */
const ITEMS: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "One-time fee",
    body: "Pay once for the evaluation. No subscription, no recurring charges.",
    icon: (
      <>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.83z" />
        <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    title: "Unlimited trading period",
    body: `No deadline to reach a target — a minimum of ${RULES.minTradingDays} trading days, no maximum.`,
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: "Fee refunded",
    body: RULES.refund + ".",
    icon: (
      <>
        <path d="M1 4v6h6" />
        <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
      </>
    ),
  },
  {
    title: `Up to ${RULES.profitSplit}% profit split`,
    body: "Most of what you make on the funded account is yours.",
    icon: (
      <>
        <path d="M21.21 15.89A10 10 0 118 2.83" />
        <path d="M22 12A10 10 0 0012 2v10z" />
      </>
    ),
  },
];

export function IncludedStrip() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ITEMS.map((it, i) => (
        <Reveal as="li" key={it.title} delay={i * 0.05}>
          <div className="h-full rounded-[var(--radius-lg)] glass-card p-6">
            <span
              aria-hidden
              className="grid size-11 place-items-center rounded-[var(--radius)] bg-[var(--accent-subtle)] text-[var(--accent)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                {it.icon}
              </svg>
            </span>
            <h3 className="mt-4 font-display text-base font-semibold text-[var(--text-primary)]">
              {it.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              {it.body}
            </p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
