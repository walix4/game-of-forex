import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Brand logo — custom SVG mark (an upward "momentum" double-chevron in a blue
 * gradient badge) + wordmark. Scales crisply; sized for the header. Replace with
 * the client's official logo file when supplied (open Q1).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Game of Forex — home"
      className={cn(
        "group inline-flex items-center gap-2.5 font-display text-[1.05rem] font-semibold tracking-tight text-[var(--text-primary)]",
        className,
      )}
    >
      <span className="relative inline-grid size-8 place-items-center">
        <svg
          viewBox="0 0 32 32"
          className="size-8 shrink-0 transition-transform duration-[var(--dur-base)] group-hover:-translate-y-0.5"
          aria-hidden
        >
          <defs>
            <linearGradient id="gf-badge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-blue-400)" />
              <stop offset="100%" stopColor="var(--color-blue-600)" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="32" height="32" rx="9" fill="url(#gf-badge)" />
          {/* subtle top sheen */}
          <rect x="0" y="0" width="32" height="15" rx="9" fill="#fff" opacity="0.12" />
          {/* upward momentum — double chevron */}
          <path
            d="M8 19.5 L16 10.5 L24 19.5"
            fill="none"
            stroke="#fff"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.5 23 L16 17.5 L20.5 23"
            fill="none"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.65"
          />
        </svg>
      </span>
      <span className="leading-none">
        Game of <span className="text-[var(--accent)]">Forex</span>
      </span>
    </Link>
  );
}
