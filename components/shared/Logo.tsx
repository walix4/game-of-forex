import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Brand logo — blue-circle "G" mark (matches the favicon at app/icon.svg) +
 * wordmark. Sized for the header. Replace with the client's official logo file
 * when supplied (open Q1).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="EZE Funded — home"
      className={cn(
        "group inline-flex items-center gap-2.5 font-display text-[1.05rem] font-semibold tracking-tight text-[var(--text-primary)]",
        className,
      )}
    >
      <svg
        viewBox="0 0 100 100"
        className="size-8 shrink-0 transition-transform duration-[var(--dur-base)] group-hover:-translate-y-0.5"
        aria-hidden
      >
        <defs>
          <linearGradient id="gf-logo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3D74FF" />
            <stop offset="1" stopColor="#1B45D8" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="50" fill="url(#gf-logo)" />
        <text
          x="50"
          y="51"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="900"
          fontSize="62"
          fill="#fff"
        >
          E
        </text>
      </svg>
      <span className="leading-none">
        EZE <span className="text-[var(--accent)]">Funded</span>
      </span>
    </Link>
  );
}
