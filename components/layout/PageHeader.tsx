import { Container } from "./Container";
import { cn } from "@/lib/utils";

// Consistent interior-page header. Subtle teal glow, never a page-load sequence
// (that belongs to the home hero only, §5.1).
export function PageHeader({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <header className={cn("relative isolate overflow-hidden pt-16 sm:pt-24", className)}>
      <div
        className="glow-hero pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 opacity-60"
        aria-hidden
      />
      <Container>
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]">
              {intro}
            </p>
          )}
        </div>
      </Container>
    </header>
  );
}
