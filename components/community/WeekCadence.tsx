import { SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/shared/Reveal";

/**
 * A typical week in the community.
 * NEEDS CLIENT INPUT — the real cadence is unconfirmed; this rhythm is
 * illustrative and is labelled as such in the UI.
 */
const WEEK: { day: string; item: string }[] = [
  { day: "Mon", item: "Week-ahead market outlook" },
  { day: "Tue", item: "Trade journal check-ins" },
  { day: "Wed", item: "Mid-week session review" },
  { day: "Thu", item: "Q&A with the team" },
  { day: "Fri", item: "Weekly wrap and lessons" },
];

export function WeekCadence() {
  return (
    <>
      <SectionHeading
        eyebrow="The rhythm"
        title="A week in the community."
        intro="A steady routine beats bursts of motivation. The room runs on a weekly rhythm you can build your own around."
      />
      <ol className="mt-12 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {WEEK.map((w, i) => (
          <Reveal as="li" key={w.day} delay={i * 0.05}>
            <div className="relative h-full rounded-[var(--radius-lg)] glass-card p-5">
              <span className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                />
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  {w.day}
                </span>
              </span>
              <p className="mt-3 text-sm font-medium leading-snug text-[var(--text-primary)]">
                {w.item}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
      <p className="mt-5 text-xs text-[var(--text-muted)]">
        Illustrative rhythm — the live schedule is set inside the community.
      </p>
    </>
  );
}
