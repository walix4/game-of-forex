import Link from "next/link";
import { CtaButton } from "@/components/shared/CtaButton";

export default function NotFound() {
  return (
    <main className="relative isolate grid min-h-[70svh] place-items-center overflow-hidden px-6 text-center">
      <div className="glow-hero pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div>
        <p className="tabular font-display text-6xl font-semibold text-[var(--text-primary)]">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-[var(--text-primary)]">
          That page isn&apos;t here.
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-[var(--text-secondary)]">
          The link may be old or mistyped. Head back to the homepage to get your
          bearings.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <CtaButton href="/" variant="primary">
            Back home
          </CtaButton>
          <Link
            href="/courses"
            className="inline-flex h-12 items-center px-4 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            Browse courses
          </Link>
        </div>
      </div>
    </main>
  );
}
