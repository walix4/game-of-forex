import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { RiskDisclosure } from "@/components/shared/RiskDisclosure";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { community } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquire about courses, the funded challenge, or the community. Education only — not financial advice.",
};

type Topic = "challenge" | "funded-account" | "general";

function resolveTopic(sp: Record<string, string | string[] | undefined>): Topic {
  if (sp.topic === "funded-account") return "funded-account";
  if (sp.buy || sp.topic === "challenge") return "challenge";
  return "general";
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const topic = resolveTopic(sp);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to us before you buy."
        intro="Questions about challenges, funded accounts, or the rules — send a note and we'll point you the right way."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr]">
          <Reveal>
            <EnquiryForm defaultTopic={topic} />
          </Reveal>

          <Reveal delay={0.06} className="space-y-8">
            <div className="rounded-[var(--radius-lg)] glass-card p-6">
              <h2 className="font-display text-base font-semibold text-[var(--text-primary)]">
                Prefer the community?
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Most questions get answered fastest in the community channels.
              </p>
              <ul className="mt-4 space-y-2">
                {community.map((c) => (
                  <li key={c.platform}>
                    <a
                      href={c.href}
                      className="text-sm text-[var(--accent)] hover:text-[var(--accent-hover)]"
                    >
                      {c.platform} →
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-[var(--text-muted)]">
                {/* NEEDS CLIENT INPUT — real contact email and invite links. */}
                Direct email address to be confirmed.
              </p>
            </div>

            <RiskDisclosure />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
