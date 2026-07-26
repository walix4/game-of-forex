import Image from "next/image";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";

/**
 * Founder / behind-the-scenes gallery.
 *
 * ⚠️ COMPLIANCE NOTE (CLAUDE.md §4): the requested reference framed this as a
 * "multi-millionaire lifestyle built through trading success". That is an income
 * promise and a regulatory/reputational risk for a prop firm, so this section is
 * deliberately reframed around the trader, the work, and the community — NOT
 * wealth or outcomes.
 *
 * ⚠️ NEEDS CLIENT PHOTOS — the images below are licence-free STOCK PLACEHOLDERS
 * used to dress the mockup only. They depict stock people/desks, not Waqas or the
 * real community, so they MUST be swapped for client-owned photos before launch.
 */

const TILES = [
  { caption: "At the desk", src: "/bts-desk.jpg" },
  { caption: "Community meetups", src: "/bts-community.jpg" },
  { caption: "Teaching sessions", src: "/bts-teaching.jpg" },
  { caption: "On the road", src: "/bts-road.jpg" },
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
                {/* NEEDS CLIENT PHOTOS — stock placeholder, replace with client-owned image */}
                <Image
                  src={t.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 224px, 256px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/25 to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4">
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {t.caption}
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
