import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { CtaButton } from "@/components/shared/CtaButton";
import { FaqExplorer } from "@/components/faq/FaqExplorer";

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
        intro="Search or browse the essentials on how challenges, phases and funded accounts work."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <FaqExplorer />
          </Reveal>

          <Reveal className="mt-16">
            <div className="glass-card flex flex-col items-center gap-4 rounded-[var(--radius-xl)] p-10 text-center">
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                Still have a question?
              </h2>
              <p className="max-w-md text-sm text-[var(--text-secondary)]">
                Ask in the community or send us a message — we reply to every
                enquiry.
              </p>
              <CtaButton href="/contact" variant="primary" className="mt-2">
                Contact us
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
