import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { ChallengeCard } from "@/components/shared/ChallengeCard";
import { RulesGrid } from "@/components/shared/RulesGrid";
import { RiskDisclosure } from "@/components/shared/RiskDisclosure";
import { SizeExplorer } from "@/components/challenges/SizeExplorer";
import { PhaseJourney } from "@/components/challenges/PhaseJourney";
import { challenges } from "@/lib/challenges";

export const metadata: Metadata = {
  title: "Challenges",
  description:
    "Trading challenges from $10K to $200K. Pay once, pass two phases, trade a funded account.",
};

export default function ChallengesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Challenges"
        title="Choose your challenge."
        intro="Pay once, pass two phases, trade our capital. Every number you'll be judged on is on this page before you spend anything."
      />

      {/* interactive size explorer — the page's single primary action */}
      <Section className="pt-12 sm:pt-16">
        <Reveal>
          <SizeExplorer />
        </Reveal>
        <p className="mt-5 text-xs text-[var(--text-muted)]">
          {/* NEEDS CLIENT INPUT — confirm pricing, targets, split. */}
          Prices and rules are placeholders pending client confirmation.
        </p>
      </Section>

      <Section className="pt-0">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
            Two phases, then funding
          </h2>
        </Reveal>
        <Reveal className="mt-8" delay={0.06}>
          <PhaseJourney />
        </Reveal>
      </Section>

      <Section className="pt-0">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
            Compare all sizes
          </h2>
        </Reveal>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={i * 0.05}>
              {/* emphasis={false} everywhere — the explorer holds the accent fill (§3 rule 1). */}
              <ChallengeCard challenge={c} emphasis={false} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section className="pt-0">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
            The rules, on every challenge
          </h2>
        </Reveal>
        <Reveal className="mt-8">
          <RulesGrid />
        </Reveal>
        <Reveal className="mt-10">
          <RiskDisclosure />
        </Reveal>
      </Section>
    </>
  );
}
