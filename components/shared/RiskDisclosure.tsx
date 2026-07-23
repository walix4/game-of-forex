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
        Trading foreign exchange carries a high level of risk and may not be
        suitable for everyone. Game of Forex provides education, not financial
        advice, and is not a broker or regulated entity.
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
      Trading foreign exchange carries a high level of risk and can result in the
      loss of your capital. Past performance does not guarantee future results.
      Game of Forex offers education and community only — it is not a broker,
      is not regulated, and does not provide financial advice. Only trade with
      money you can afford to lose.
    </aside>
  );
}
