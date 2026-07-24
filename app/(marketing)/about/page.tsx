import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { CtaButton } from "@/components/shared/CtaButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "Game of Forex is a prop firm built on real funded accounts, founded by Waqas Ahmed.",
};

const PRINCIPLES = [
  {
    title: "Real funding",
    body: "Our long-term model is real funded (A-Book) accounts — funded traders trade real capital, not a permanent simulation.",
  },
  {
    title: "Transparent rules",
    body: "Every target, limit and split is shown before you buy. No fine print, no moving goalposts.",
  },
  {
    title: "Trust first",
    body: "We say what we are — a challenge provider — and what we're not. Not a broker, not regulated, not financial advice.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Built on real funding."
        intro="Game of Forex is a prop trading firm founded by Waqas Ahmed, built around a model of real funded accounts and transparent rules."
      />

      <Section>
        <div className="grid gap-12 md:grid-cols-[1fr_0.7fr]">
          <Reveal className="space-y-5 text-[var(--text-secondary)]">
            {/* NEEDS CLIENT INPUT — verified founder bio. No net-worth / income
                claims (§4). Placeholder copy below. */}
            <p>
              This page will carry a verified account of Waqas Ahmed and why he
              built Game of Forex — the gap he saw between prop firms that
              &ldquo;fund&rdquo; on demo infrastructure and a model built on real
              capital. The text here is placeholder and will be replaced with
              facts the client can stand behind.
            </p>
            <p>
              What won&apos;t change is the standard: transparent rules, a real
              funding model, and a community that trades together. Game of Forex
              is a challenge provider — not a broker, not regulated, and not a
              source of financial advice.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] glass-card">
              <div className="glow-hero absolute inset-0 opacity-40" aria-hidden />
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-6xl font-semibold text-[var(--text-disabled)]">
                  WA
                </span>
              </div>
              <p className="absolute bottom-3 left-0 right-0 text-center text-[0.7rem] text-[var(--text-muted)]">
                {/* NEEDS CLIENT PHOTOS — client-owned portrait of Waqas Ahmed */}
                Photo to be supplied
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-0">
        <ul className="grid gap-5 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.06}>
              <div className="h-full rounded-[var(--radius-lg)] glass-card p-6">
                <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14 flex flex-wrap items-center gap-4">
          <CtaButton href="/challenges" variant="primary">
            Buy a challenge
          </CtaButton>
          <CtaButton href="/contact" variant="secondary">
            Get in touch
          </CtaButton>
        </Reveal>
      </Section>
    </>
  );
}
