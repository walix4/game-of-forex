import Link from "next/link";
import { cn } from "@/lib/utils";

// Mint TEXT link with an arrow. Not a button — safe to use many per viewport
// (the "one mint primary" rule is about buttons, §3 rule 1).
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] transition-colors duration-[var(--dur-fast)] hover:text-[var(--accent-hover)]",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-[var(--dur-fast)] group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  );
}
