import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

/**
 * The story so far — deliberately undated and generic until the client
 * confirms real milestones (NEEDS CLIENT INPUT). Framed as work, not outcomes:
 * no income language, no growth stats (§4).
 */
const MILESTONES = [
  {
    step: "01",
    title: "Learning the market",
    body: "Years on the charts before anything was sold — building a method around risk first, entries second.",
  },
  {
    step: "02",
    title: "Building the community",
    body: "Traders gathered around shared setups and journals on Discord and WhatsApp, keeping each other accountable.",
  },
  {
    step: "03",
    title: "Teaching the method",
    body: "Structured sessions on process and discipline — the education roots Game of Forex grew from.",
  },
  {
    step: "04",
    title: "Launching funded challenges",
    body: "The pivot to a prop firm: a two-phase evaluation with transparent rules, built around a real-funding model.",
    current: true,
  },
];

export function StoryTimeline() {
  return (
    <Section className="pt-0">
      <SectionHeading
        eyebrow="The story"
        title="From community to prop firm."
        intro="The milestones that shaped Game of Forex. Dates and details to be confirmed with the client."
      />

      {/* NEEDS CLIENT INPUT — confirm milestones, order and dates. */}
      <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {MILESTONES.map((m, i) => (
          <Reveal as="li" key={m.step} delay={i * 0.06} className="relative">
            {/* connector — hidden on the last item and below lg */}
            {i < MILESTONES.length - 1 && (
              <span
                aria-hidden
                className="absolute -right-5 top-9 hidden h-px w-5 bg-gradient-to-r from-[var(--border-default)] to-transparent lg:block"
              />
            )}
            <div
              className={cn(
                "h-full rounded-[var(--radius-lg)] p-6",
                m.current ? "ring-accent glass" : "glass-card",
              )}
            >
              <span
                className={cn(
                  "tabular font-display text-sm font-semibold",
                  m.current ? "text-[var(--accent)]" : "text-[var(--text-muted)]",
                )}
              >
                {m.step}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-[var(--text-primary)]">
                {m.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {m.body}
              </p>
              {m.current && (
                <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-[var(--accent)]">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                  />
                  Where we are now
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
