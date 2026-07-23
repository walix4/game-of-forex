import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";

/**
 * Founder / behind-the-scenes gallery.
 *
 * ⚠️ COMPLIANCE NOTE (CLAUDE.md §4): the requested reference framed this as a
 * "multi-millionaire lifestyle built through trading success". That is an income
 * promise and a regulatory/reputational risk for a prop firm, so this section is
 * deliberately reframed around the trader, the work, and the community — NOT
 * wealth or outcomes. Image tiles are placeholders; real photos must be supplied
 * by the client and owned by them (NEEDS CLIENT PHOTOS). No third-party images.
 */

const TILES = [
  { caption: "At the desk" },
  { caption: "Community meetups" },
  { caption: "Teaching sessions" },
  { caption: "On the road" },
];

export function BehindTheScenes() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Behind the scenes"
        title="The work behind the funding."
        intro="A look at the trader, the community, and the day-to-day discipline — not a highlight reel of things bought."
      />

      <div className="mt-12 -mx-6 overflow-x-auto px-6 [scrollbar-width:none]">
        <ul className="flex gap-4 pb-2">
          {TILES.map((t, i) => (
            <Reveal as="li" key={t.caption} delay={i * 0.06}>
              <figure className="group relative aspect-[3/4] w-56 shrink-0 overflow-hidden rounded-[var(--radius-lg)] glass-card sm:w-64">
                {/* placeholder — NEEDS CLIENT PHOTOS (client-owned) */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-70"
                  style={{
                    background:
                      "linear-gradient(160deg, var(--color-blue-900), var(--color-ink-950) 55%, var(--color-blue-950))",
                  }}
                />
                <div className="glow-hero absolute inset-0 opacity-30" aria-hidden />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {t.caption}
                  </span>
                  <span className="rounded-full border border-[var(--border-default)] bg-[var(--bg-frame)]/70 px-2 py-0.5 text-[0.65rem] text-[var(--text-muted)]">
                    Photo TBD
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
