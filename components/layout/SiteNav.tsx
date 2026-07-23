"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/Logo";
import { CtaButton } from "@/components/shared/CtaButton";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Challenges", href: "/challenges" },
  { label: "Pricing", href: "/pricing" },
  { label: "Rules", href: "/rules" },
  { label: "Community", href: "/community" },
  { label: "FAQ", href: "/faq" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-[var(--dur-base)]",
        scrolled
          ? "border-[var(--border-frame)] bg-[var(--bg-frame)]/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6"
      >
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors duration-[var(--dur-fast)]",
                  isActive(item.href)
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-on-frame)] hover:text-[var(--text-primary)]",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-[var(--radius-sm)] px-3 py-2 text-sm text-[var(--text-on-frame)] transition-colors duration-[var(--dur-fast)] hover:text-[var(--text-primary)]"
          >
            Log in
          </Link>
          {/* Outline in nav — hero owns the single mint FILL per §3 rule 1. */}
          <CtaButton
            href="/challenges"
            variant="secondary"
            className="h-10 border-[var(--border-accent)] px-5 text-sm text-[var(--accent)] hover:text-[var(--accent-hover)]"
          >
            Buy challenge
          </CtaButton>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-[var(--radius-sm)] text-[var(--text-on-frame)] hover:text-[var(--text-primary)] md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span className={cn("absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform duration-[var(--dur-base)]", open && "top-1/2 -translate-y-1/2 rotate-45")} />
            <span className={cn("absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 bg-current transition-opacity", open && "opacity-0")} />
            <span className={cn("absolute bottom-0 left-0 h-0.5 w-5 bg-current transition-transform duration-[var(--dur-base)]", open && "bottom-1/2 translate-y-1/2 -rotate-45")} />
          </span>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-[var(--border-frame)] bg-[var(--bg-frame)] md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-[var(--radius-sm)] px-3 py-3 text-base",
                    isActive(item.href)
                      ? "bg-[var(--bg-frame-alt)] text-[var(--text-primary)]"
                      : "text-[var(--text-on-frame)]",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex flex-col gap-2">
              <CtaButton href="/login" variant="secondary" className="w-full">
                Log in
              </CtaButton>
              <CtaButton href="/challenges" variant="primary" className="w-full">
                Buy challenge
              </CtaButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
