import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { CtaButton } from "@/components/shared/CtaButton";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about challenges, phases, funded accounts, rules and profit splits.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Questions, answered."
        intro="The essentials on how challenges, phases and funded accounts work."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <FaqAccordion items={faqs} />
          </Reveal>

          <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-[var(--text-secondary)]">Still have a question?</p>
            <CtaButton href="/contact" variant="primary">
              Contact us
            </CtaButton>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
