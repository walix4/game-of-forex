// Category glyphs for the FAQ directory + sidebar. Stroke icons on tinted
// discs — accent blue for most, gold for Payouts (rewards association).
import { cn } from "@/lib/utils";

const STROKE = {
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function CategoryIcon({
  name,
  className,
}: {
  name: "target" | "wallet" | "gold" | "shield";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-[10px] border",
        name === "gold"
          ? "border-[var(--gold-500)]/25 bg-[var(--gold-500)]/10 text-[var(--gold-400)]"
          : "border-[var(--accent)]/25 bg-[var(--accent)]/10 text-[var(--accent)]",
        className,
      )}
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" className="size-4" aria-hidden>
        {name === "target" && (
          <>
            <circle cx="8" cy="8" r="6" {...STROKE} />
            <circle cx="8" cy="8" r="2.5" {...STROKE} />
          </>
        )}
        {name === "wallet" && (
          <>
            <rect x="2" y="4" width="12" height="9" rx="2" {...STROKE} />
            <path d="M2 7h12M10.5 10.5h1" {...STROKE} />
          </>
        )}
        {name === "gold" && (
          <path d="M8 2v12M11 4.5H6.5a2 2 0 100 4h3a2 2 0 110 4H5" {...STROKE} />
        )}
        {name === "shield" && (
          <path d="M8 2l5 2v4c0 3-2.2 5-5 6-2.8-1-5-3-5-6V4l5-2z" {...STROKE} />
        )}
      </svg>
    </span>
  );
}
