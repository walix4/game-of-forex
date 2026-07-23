import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { ChallengeCard } from "@/components/shared/ChallengeCard";
import { challenges } from "@/lib/challenges";

// Core product on the home page. Only the "popular" card carries the mint FILL
// (§3 rule 1); the rest are outline.
export function ChallengeSizes() {
  return (
    <Section id="challenges">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Challenges"
          title="Pick your account size."
          intro="One-time fee, two phases, then a funded account. Prices and targets shown up front."
        />
        <Reveal>
          <ArrowLink href="/challenges">Compare all challenges</ArrowLink>
        </Reveal>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {challenges.map((c, i) => (
          <Reveal as="li" key={c.slug} delay={i * 0.05}>
            <ChallengeCard challenge={c} emphasis={c.popular} />
          </Reveal>
        ))}
      </ul>

      <p className="mt-6 text-xs text-[var(--text-muted)]">
        {/* NEEDS CLIENT INPUT — confirm pricing, targets and profit split. */}
        Prices and rules are placeholders pending client confirmation.
      </p>
    </Section>
  );
}
