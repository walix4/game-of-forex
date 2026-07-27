import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { CtaButton } from "@/components/shared/CtaButton";
import { FaqDirectory } from "@/components/faq/FaqDirectory";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about challenges, phases, funded accounts, rules and profit splits.",
};

// FTMO-style FAQ directory: centred hero + search, category cards linking to
// per-question detail pages, and a support closer.
export default function FaqPage() {
  return (
    <>
      <header className="relative isolate overflow-hidden pt-16 text-center sm:pt-24">
        <div
          className="glow-hero pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 opacity-70"
          aria-hidden
        />
        <Container>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
            FAQ
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
            Straight answers on challenges, funded accounts, payouts and the firm.
          </p>
        </Container>
      </header>

      <Section className="pt-10">
        <FaqDirectory />

        {/* support closer — single primary CTA (§3 rule 1) */}
        <Reveal className="mx-auto mt-20 max-w-2xl text-center">
          <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl">
            Still have questions?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[var(--text-secondary)]">
            Ask us directly. No sales pitch, just an answer.
          </p>
          <div className="mt-7 flex justify-center">
            <CtaButton href="/contact" variant="primary">
              Contact us
            </CtaButton>
          </div>
          <p className="mt-4 text-xs text-[var(--text-muted)]">
            {/* NEEDS CLIENT INPUT — confirm the real response window. */}
            We aim to reply within a few working days.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
