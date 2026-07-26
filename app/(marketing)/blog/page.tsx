import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { BlogDirectory } from "@/components/blog/BlogDirectory";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Market outlooks, trading systems, psychology and risk management from the Game of Forex desk.",
};

// FTMO-style blog directory. Per client: no dashboard/stats banner at the end.
// Posts are placeholder content (NEEDS CLIENT INPUT) until the CMS lands.
export default function BlogPage() {
  return (
    <>
      <header className="relative isolate overflow-hidden pt-16 sm:pt-20">
        <div
          className="glow-hero pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 opacity-50"
          aria-hidden
        />
        <Container>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
            Blog
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-5xl">
            From the desk
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
            Market outlooks, systems, psychology and risk — written for traders
            in evaluation.
          </p>
        </Container>
      </header>

      <Section className="pt-10">
        <BlogDirectory />
        <p className="mt-8 text-xs text-[var(--text-muted)]">
          {/* NEEDS CLIENT INPUT — placeholder posts; real content ships via CMS. */}
          Illustrative posts — articles publish once the editorial pipeline is
          live.
        </p>
      </Section>
    </>
  );
}
