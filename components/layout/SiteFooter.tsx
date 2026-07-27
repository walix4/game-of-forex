import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { RiskDisclosure } from "@/components/shared/RiskDisclosure";
import { community } from "@/lib/content";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Challenges", href: "/challenges" },
      { label: "Pricing", href: "/pricing" },
      { label: "Trading rules", href: "/rules" },
      { label: "How it works", href: "/#how-it-works" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Community", href: "/community" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Log in", href: "/login" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Buy a challenge", href: "/challenges" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-[var(--border-frame)] bg-[var(--bg-frame)] text-[var(--text-on-frame)]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--text-on-frame)]">
              We fund traders who can prove their edge. Pass a two-phase
              challenge, trade our capital, and keep most of what you make.
              Founded by Waqas Ahmed.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[var(--text-on-frame)] transition-colors duration-[var(--dur-fast)] hover:text-[var(--text-primary)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          {community.map((c) => (
            <a
              key={c.platform}
              href={c.href}
              className="rounded-full border border-[var(--border-frame)] px-4 py-2 text-sm text-[var(--text-on-frame)] transition-colors duration-[var(--dur-fast)] hover:border-[var(--border-accent)] hover:text-[var(--text-primary)]"
            >
              {c.platform}
            </a>
          ))}
        </div>

        <div className="mt-10">
          <RiskDisclosure variant="inline" />
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-[var(--border-frame)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 EZE Funded. All rights reserved.</p>
          <p>Not a broker. Not regulated. Not financial advice.</p>
        </div>
      </div>
    </footer>
  );
}
