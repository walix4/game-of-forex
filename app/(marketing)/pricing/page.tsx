import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { CtaButton } from "@/components/shared/CtaButton";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { RiskDisclosure } from "@/components/shared/RiskDisclosure";
import { PricingTable } from "@/components/pricing/PricingTable";
import { IncludedStrip } from "@/components/pricing/IncludedStrip";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Challenge pricing from $10K to $200K. Fees, profit targets and loss limits compared side by side.",
};

// The 3 questions buyers ask before paying — pulled from the shared FAQ.
const PRICING_QS = new Set([
  "Do I get my fee back?",
  "What is the profit split?",
  "Is there a time limit?",
]);

export default function PricingPage() {
  const pricingFaqs = faqs.filter((f) => PRICING_QS.has(f.q));

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Every size, side by side."
        intro="Pay once. No subscriptions, no add-ons, no upsells at checkout. This table is the whole deal."
      />

      <Section>
        <Reveal>
          <PricingTable />
        </Reveal>
        <p className="mt-5 text-xs text-[var(--text-muted)]">
          {/* NEEDS CLIENT INPUT — confirm all pricing and targets. */}
          Illustrative pricing — pending client confirmation.
        </p>
      </Section>

      <Section className="pt-0">
        <SectionHeading
          eyebrow="Included"
          title="Included in every challenge."
          intro="Same terms at every size. What's in the table is what you get."
        />
        <div className="mt-10">
          <IncludedStrip />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Before you buy"
            title="Pricing questions."
          />
          <Reveal className="mt-8">
            <FaqAccordion items={pricingFaqs} />
          </Reveal>
          <Reveal className="mt-6">
            <ArrowLink href="/faq">All questions</ArrowLink>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-0">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
            Pick a size. Start the evaluation.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">
            The same numbers show up again at checkout, so check them here
            first.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton href="/challenges" variant="primary">
              Buy challenge
            </CtaButton>
          </div>
          <div className="mt-10 text-left">
            <RiskDisclosure />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
