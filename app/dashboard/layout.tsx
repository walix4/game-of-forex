import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/shared/Logo";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export const metadata: Metadata = {
  title: "Dashboard",
};

// Dashboard shell — its own chrome (sidebar + top bar), no marketing footer.
// Design mockup only; not gated behind real auth (CLAUDE.md §0).
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-[var(--border-frame)] bg-[var(--bg-frame)]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Logo />
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-[var(--accent-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--accent)] sm:inline">
              Design preview
            </span>
            <Link
              href="/"
              className="text-sm text-[var(--text-on-frame)] hover:text-[var(--text-primary)]"
            >
              Log out
            </Link>
            <span
              aria-hidden
              className="grid size-9 place-items-center rounded-full bg-[var(--bg-frame-alt)] text-sm font-semibold text-[var(--text-primary)]"
            >
              WA
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8 lg:flex-row">
        <aside className="lg:w-52 lg:shrink-0">
          <div className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:overflow-visible lg:px-0">
            <DashboardNav />
          </div>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
