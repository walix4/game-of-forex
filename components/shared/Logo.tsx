import Link from "next/link";
import { cn } from "@/lib/utils";

// Wordmark placeholder. NEEDS CLIENT INPUT — real logo source file (open Q1)
// to be redrawn as SVG. Until then, a typographic mark with a mint accent tick.
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Game of Forex — home"
      className={cn(
        "group inline-flex items-center gap-2 font-display text-[0.95rem] font-semibold tracking-tight text-[var(--text-primary)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="grid size-6 place-items-center rounded-[6px] bg-[var(--accent)] text-[0.7rem] font-bold text-[var(--text-on-accent)]"
      >
        GF
      </span>
      Game of Forex
    </Link>
  );
}
