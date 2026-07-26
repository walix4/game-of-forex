import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { CtaButton } from "@/components/shared/CtaButton";
import { RiskDisclosure } from "@/components/shared/RiskDisclosure";
import { FounderHero } from "@/components/about/FounderHero";
import { StoryTimeline } from "@/components/about/StoryTimeline";
import { ValuesGrid } from "@/components/about/ValuesGrid";

export const metadata: Metadata = {
  title: "About",
  description:
    "Game of Forex is a prop firm built on real funded accounts, founded by Waqas Ahmed.",
};

export default function AboutPage() {
  return (
    <>
      <FounderHero />
      <div className="pt-20 sm:pt-28">
        <StoryTimeline />
      </div>
      <ValuesGrid />

      {/* single closing action — the page's only accent fill (§3 rule 1) */}
      <Section className="pt-0">
        <Reveal className="flex flex-wrap items-center gap-4">
          <CtaButton href="/challenges" variant="primary">
            Buy a challenge
          </CtaButton>
          <CtaButton href="/contact" variant="secondary">
            Get in touch
          </CtaButton>
        </Reveal>
        <Reveal className="mt-8 max-w-2xl">
          <RiskDisclosure variant="inline" />
        </Reveal>
      </Section>
    </>
  );
}
