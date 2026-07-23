import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { faqs } from "@/lib/faq";

export function FaqPreview() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <SectionHeading eyebrow="FAQ" title="Common questions." />
          <Reveal className="mt-6">
            <ArrowLink href="/faq">See all questions</ArrowLink>
          </Reveal>
        </div>
        <Reveal>
          <FaqAccordion items={faqs.slice(0, 5)} />
        </Reveal>
      </div>
    </Section>
  );
}
