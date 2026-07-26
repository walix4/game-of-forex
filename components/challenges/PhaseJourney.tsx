import { RULES, pct } from "@/lib/challenges";
import { cn } from "@/lib/utils";

/**
 * The path from purchase to funding: Phase 1 → Phase 2 → Funded, joined by a
 * gradient connector. The funded step is the destination, so it alone carries
 * the accent ring — no buttons here, the explorer above holds the primary CTA.
 */
const STEPS = [
  {
    step: "Phase 1",
    figure: pct(RULES.phase1Target),
    figureLabel: "profit target",
    body: "Reach the target while staying inside the daily and total loss limits.",
  },
  {
    step: "Phase 2",
    figure: pct(RULES.phase2Target),
    figureLabel: "profit target",
    body: "A lower target, same limits — consistency over lucky streaks.",
  },
  {
    step: "Funded",
    figure: `Up to ${pct(RULES.profitSplit)}`,
    figureLabel: "profit split",
    body: "Trade a funded account with payouts on the profit you make.",
    highlight: true,
  },
];

export function PhaseJourney() {
  return (
    <ol className="relative grid gap-4 lg:grid-cols-3">
      {/* connector — desktop only, sits behind the cards */}
      <div
        aria-hidden
        className="absolute left-[8%] right-[8%] top-9 hidden h-px lg:block"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-blue-500) 20%, var(--color-blue-500) 80%, transparent)",
          opacity: 0.4,
        }}
      />
      {STEPS.map((s, i) => (
        <li
          key={s.step}
          className={cn(
            "relative rounded-[var(--radius-lg)] p-6",
            s.highlight ? "ring-accent glass" : "glass-card",
          )}
        >
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "tabular grid size-8 shrink-0 place-items-center rounded-full text-sm font-semibold",
                s.highlight
                  ? "bg-[var(--accent)] text-[var(--text-on-accent)]"
                  : "border border-[var(--border-default)] text-[var(--text-secondary)]",
              )}
            >
              {i + 1}
            </span>
            <h3 className="font-display text-base font-semibold text-[var(--text-primary)]">
              {s.step}
            </h3>
          </div>
          <p className="tabular mt-4 font-display text-2xl font-semibold text-[var(--text-primary)]">
            {s.figure}{" "}
            <span className="text-xs font-normal uppercase tracking-[0.1em] text-[var(--text-muted)]">
              {s.figureLabel}
            </span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {s.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
