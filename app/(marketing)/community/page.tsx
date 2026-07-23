import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { community } from "@/lib/content";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the Game of Forex community — setups, journals, updates and support across Discord, WhatsApp, YouTube and Instagram.",
};

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="You don't trade alone."
        intro="Evaluation and funded traders share setups, review journals, and keep each other accountable. Updates, learning and support in one place."
      />

      <Section>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {community.map((c, i) => (
            <Reveal as="li" key={c.platform} delay={i * 0.05}>
              <a
                href={c.href}
                className="flex h-full flex-col items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-raised)] p-6 transition-colors duration-[var(--dur-base)] hover:border-[var(--border-accent)]"
              >
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  {c.platform}
                </span>
                <span className="text-xs text-[var(--text-muted)]">{c.handle}</span>
                <span className="mt-auto pt-3 text-sm font-medium text-[var(--accent)]">
                  {c.count === null ? (
                    "Join →"
                  ) : (
                    <>
                      <span className="tabular">{c.count.toLocaleString()}</span> members
                    </>
                  )}
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-xs text-[var(--text-muted)]">
          {/* NEEDS CLIENT INPUT — verified member counts and real invite links. */}
          Member counts and invite links shown once confirmed.
        </p>
      </Section>
    </>
  );
}
