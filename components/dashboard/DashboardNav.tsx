"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Overview", href: "/dashboard" },
  { label: "My challenges", href: "/dashboard#challenges" },
  { label: "Rules", href: "/dashboard#rules" },
  { label: "Payouts", href: "/dashboard#payouts" },
  { label: "Support", href: "/contact" },
];

export function DashboardNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Dashboard" className="flex gap-1 lg:flex-col">
      {LINKS.map((l) => {
        const active = l.href === pathname;
        return (
          <Link
            key={l.label}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors duration-[var(--dur-fast)]",
              active
                ? "bg-[var(--bg-frame-alt)] text-[var(--text-primary)]"
                : "text-[var(--text-on-frame)] hover:bg-[var(--bg-frame-alt)]/40 hover:text-[var(--text-primary)]",
            )}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
