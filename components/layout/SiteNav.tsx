"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Challenges", href: "/challenges" },
  { label: "Pricing", href: "/pricing" },
  { label: "Rules", href: "/rules" },
  { label: "Community", href: "/community" },
  { label: "FAQ", href: "/faq" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-base)]">
      <div className="relative mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6">
        <Logo />

        {/* centered floating glass pill — desktop */}
        <nav
          aria-label="Primary"
          className="glass absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full p-1.5 shadow-[0_8px_40px_-12px_rgb(0_0_0/0.6)] md:flex"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors duration-[var(--dur-fast)]",
                isActive(item.href)
                  ? "bg-white/10 text-[var(--text-primary)]"
                  : "text-[var(--text-on-frame)] hover:text-[var(--text-primary)]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* right cluster — desktop */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm text-[var(--text-on-frame)] transition-colors hover:text-[var(--text-primary)]"
          >
            Log in
          </Link>
          <Link
            href="/challenges"
            className="glass rounded-full px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-accent)]"
          >
            Get started
          </Link>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-full text-[var(--text-on-frame)] hover:text-[var(--text-primary)] md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span className={cn("absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform duration-[var(--dur-base)]", open && "top-1/2 -translate-y-1/2 rotate-45")} />
            <span className={cn("absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 bg-current transition-opacity", open && "opacity-0")} />
            <span className={cn("absolute bottom-0 left-0 h-0.5 w-5 bg-current transition-transform duration-[var(--dur-base)]", open && "bottom-1/2 translate-y-1/2 -rotate-45")} />
          </span>
        </button>
      </div>

      {/* mobile sheet */}
      {open && (
        <div id="mobile-menu" className="mx-4 mt-1 md:hidden">
          <div className="glass rounded-[var(--radius-lg)] p-3">
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-[var(--radius)] px-4 py-3 text-base",
                      isActive(item.href)
                        ? "bg-white/10 text-[var(--text-primary)]"
                        : "text-[var(--text-on-frame)]",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-1 flex flex-col gap-2 border-t border-[var(--border-subtle)] pt-3">
                <Link href="/login" className="rounded-[var(--radius)] px-4 py-3 text-base text-[var(--text-on-frame)]">
                  Log in
                </Link>
                <Link
                  href="/challenges"
                  className="rounded-[var(--radius)] bg-[var(--accent)] px-4 py-3 text-center text-base font-medium text-[var(--text-on-accent)]"
                >
                  Get started
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
