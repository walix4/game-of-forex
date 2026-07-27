import Link from "next/link";
import { cn } from "@/lib/utils";

// Accent text link, pill-styled on hover. No arrow glyphs anywhere on the
// site (client decision 2026-07-27). Not a button — safe to use many per
// viewport (the "one primary" rule is about filled buttons, §3 rule 1).
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
        "inline-flex items-center rounded-full border border-[var(--accent)]/30 px-4 py-1.5 text-sm font-medium text-[var(--accent)] transition-colors duration-[var(--dur-fast)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent-hover)]",
        className,
      )}
    >
      {children}
    </Link>
  );
}
