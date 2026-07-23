import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { community } from "@/lib/content";

/**
 * Community (CLAUDE.md §5.6): Discord, WhatsApp, YouTube, Instagram with REAL
 * counts. Counts are null until verified — we show "Join", never an invented
 * number (§4).
 */
export function CommunityRow() {
  return (
    <Section id="community">
      <SectionHeading
        eyebrow="Community"
        title="Trade alongside people."
        intro="Funded and evaluation traders share setups, journals, and progress in the community — you don't grind alone."
        align="center"
      />

      <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {community.map((c, i) => (
          <Reveal as="li" key={c.platform} delay={i * 0.05}>
            <a
              href={c.href}
              className="flex h-full flex-col items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-raised)] p-6 transition-colors duration-[var(--dur-base)] hover:border-[var(--border-accent)]"
            >
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {c.platform}
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                {c.handle}
              </span>
              <span className="mt-auto pt-3 text-sm font-medium text-[var(--accent)]">
                {c.count === null ? (
                  "Join →"
                ) : (
                  <>
                    <span className="tabular">{c.count.toLocaleString()}</span>{" "}
                    members
                  </>
                )}
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
      <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
        {/* NEEDS CLIENT INPUT — verified member counts and live invite links. */}
        Member counts shown once verified.
      </p>
    </Section>
  );
}
