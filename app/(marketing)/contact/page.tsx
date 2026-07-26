import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { RiskDisclosure } from "@/components/shared/RiskDisclosure";
import { EnquiryFormWithTopic } from "@/components/contact/EnquiryFormWithTopic";
import { ContactChannels } from "@/components/contact/ContactChannels";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquire about challenges, funded accounts, or the community. Education only — not financial advice.",
};

// Topic preselection moved client-side (EnquiryFormWithTopic) so the page
// stays statically exportable for GitHub Pages.
export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to us before you buy."
        intro="Questions about challenges, funded accounts, or the rules — send a note and we'll point you the right way."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.1fr] lg:gap-14">
          {/* channels — DOM-second so the form is first for keyboard users,
              visually left on desktop */}
          <Reveal delay={0.06} className="order-2 lg:order-1">
            <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
              Reach us directly
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              Most questions get answered fastest in the community channels —
              rules, payouts and platform questions included. For anything
              account-specific, use the form.
            </p>

            <ContactChannels className="mt-6" />

            <p className="mt-6 text-xs text-[var(--text-muted)]">
              {/* NEEDS CLIENT INPUT — confirm the real response window. */}
              We aim to reply within a few working days.
            </p>
          </Reveal>

          {/* form — the page's single accent-fill action lives inside (§3 rule 1) */}
          <Reveal className="order-1 lg:order-2">
            <div className="ring-accent glass rounded-[var(--radius-xl)] p-6 sm:p-9">
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                Send an enquiry
              </h2>
              <p className="mt-1.5 text-sm text-[var(--text-muted)]">
                No sales pressure — we answer the question you ask.
              </p>
              <div className="mt-7">
                <EnquiryFormWithTopic />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <RiskDisclosure variant="inline" className="max-w-2xl" />
        </Reveal>
      </Section>
    </>
  );
}
