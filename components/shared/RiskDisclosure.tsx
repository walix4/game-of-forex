import { cn } from "@/lib/utils";

/**
 * First-class risk disclosure (CLAUDE.md §4) — visible, not footer small print.
 * `variant="banner"` for pages with an enrolment/purchase path; `inline` for a
 * quieter adjacent note. Copy is plain and honest; no income framing.
 */
export function RiskDisclosure({
  variant = "banner",
  className,
}: {
  variant?: "banner" | "inline";
  className?: string;
}) {
  if (variant === "inline") {
    return (
      <p className={cn("text-xs leading-relaxed text-[var(--text-muted)]", className)}>
        Trading foreign exchange carries a high level of risk and isn&apos;t
        for everyone. EZE Funded sells trading challenges. It is not a broker,
        is not regulated, and nothing on this site is financial advice.
      </p>
    );
  }

  return (
    <aside
      role="note"
      aria-label="Risk disclosure"
      className={cn(
        "rounded-[var(--radius)] border border-[var(--border-default)] bg-[var(--warning-bg)] p-4 text-sm leading-relaxed text-[var(--text-secondary)]",
        className,
      )}
    >
      <span className="font-medium text-[var(--text-primary)]">
        Risk warning.
      </span>{" "}
      Trading foreign exchange carries a high level of risk. A challenge tests
      trading skill: you can fail it and lose the fee you paid, and passing
      never guarantees future results or payouts. EZE Funded is not a broker,
      is not regulated, and does not give financial advice. Only spend what you
      can afford to lose.
    </aside>
  );
}
