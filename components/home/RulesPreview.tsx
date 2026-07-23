import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { RulesGrid } from "@/components/shared/RulesGrid";

export function RulesPreview() {
  return (
    <Section className="border-y border-[var(--border-subtle)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Trading rules"
          title="Clear rules, shown up front."
          intro="The same limits apply across both phases. Nothing hidden in the fine print."
        />
        <Reveal>
          <ArrowLink href="/rules">Read the full rules</ArrowLink>
        </Reveal>
      </div>
      <Reveal className="mt-12">
        <RulesGrid />
      </Reveal>
    </Section>
  );
}
