import Link from "next/link";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

/**
 * Brand logo — client-supplied EZE mark (circular, transparent PNG; same
 * artwork as the favicon at app/icon.png) + wordmark.
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/eze-logo.png")}
        alt=""
        width={36}
        height={36}
        className="size-9 shrink-0 transition-transform duration-[var(--dur-base)] group-hover:-translate-y-0.5"
      />
      <span className="leading-none">
        EZE <span className="text-[var(--accent)]">Funded</span>
      </span>
    </Link>
  );
}
