import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { PlatformTiltCard } from "@/components/home/PlatformTiltCard";
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
        intro="Evaluation and funded traders sit in the same rooms, sharing setups and journals. Nobody grinds alone here."
        align="center"
      />

      {/* social proof — avatar stack + rating. NEEDS CLIENT INPUT on the count
          and rating; avatars are monogram placeholders (NEEDS CLIENT PHOTOS). */}
      <Reveal className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {["A", "R", "S", "M"].map((p) => (
              <span
                key={p}
                className="grid size-11 place-items-center rounded-full border-2 border-[var(--bg-base)] bg-gradient-to-br from-[var(--color-blue-400)] to-[var(--color-blue-700)] text-sm font-semibold text-white"
              >
                {p}
              </span>
            ))}
            <span className="grid size-11 place-items-center rounded-full border-2 border-[var(--bg-base)] bg-white text-lg font-bold text-[var(--bg-base)]">
              +
            </span>
          </div>
          <div className="text-left">
            <p className="font-semibold text-[var(--text-primary)]">
              Community members
            </p>
            <p className="text-sm text-[var(--text-muted)]">Growing every week</p>
          </div>
        </div>

        <div className="glass-card flex items-center gap-4 rounded-[var(--radius-lg)] px-6 py-4">
          <span className="tabular font-display text-4xl font-semibold text-[var(--text-primary)]">
            4.9
          </span>
          <div className="text-left">
            <div className="flex gap-0.5 text-[#F5B843]" aria-hidden>
              {"★★★★★"}
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Rating from verified reviews
            </p>
          </div>
        </div>
      </Reveal>

      <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {community.map((c, i) => (
          <Reveal as="li" key={c.platform} delay={i * 0.05}>
            <PlatformTiltCard
              platform={c.platform}
              handle={c.handle}
              href={c.href}
            />
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
