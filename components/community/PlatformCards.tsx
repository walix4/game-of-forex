import { Reveal } from "@/components/shared/Reveal";
import { SocialIcon } from "@/components/shared/SocialIcon";
import { community } from "@/lib/content";

// Brand colours for the platform glyphs (brand assets — allowed outside the
// token scale, same idiom as components/home/CommunityRow.tsx).
const BRAND: Record<string, string> = {
  Discord: "#5865F2",
  WhatsApp: "#25D366",
  YouTube: "#FF0000",
  Instagram: "#E4405F",
};

// Honest, platform-specific descriptions — what actually happens there,
// never member counts we can't verify (§4).
const ABOUT: Record<string, string> = {
  Discord:
    "The main home of the community — live channels for setups, journals and questions.",
  WhatsApp: "Announcements and quick updates, on the go.",
  YouTube: "Recorded session reviews, breakdowns and walkthroughs.",
  Instagram: "Highlights, clips and community updates.",
};

export function PlatformCards() {
  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {community.map((c, i) => (
          <Reveal as="li" key={c.platform} delay={i * 0.05}>
            <a
              href={c.href}
              className="group relative flex h-full flex-col items-start gap-4 overflow-hidden rounded-[var(--radius-lg)] glass-card p-7"
            >
              {/* brand-tinted glow, revealed on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--dur-base)] group-hover:opacity-100 motion-reduce:transition-none"
                style={{
                  background: `radial-gradient(90% 60% at 50% 0%, ${BRAND[c.platform]}14, transparent 70%)`,
                }}
              />
              <span
                className="grid size-12 place-items-center rounded-[var(--radius)] transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:scale-105 motion-reduce:transition-none"
                style={{
                  backgroundColor: `${BRAND[c.platform]}1a`,
                  color: BRAND[c.platform],
                }}
              >
                <SocialIcon name={c.platform} className="size-6" />
              </span>
              <span>
                <span className="block font-display text-lg font-semibold text-[var(--text-primary)]">
                  {c.platform}
                </span>
                <span className="mt-0.5 block text-xs text-[var(--text-muted)]">
                  {c.handle}
                </span>
              </span>
              <span className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {ABOUT[c.platform]}
              </span>
              <span className="mt-auto pt-3 text-sm font-medium text-[var(--accent)] transition-colors duration-[var(--dur-fast)] group-hover:text-[var(--accent-hover)]">
                {c.count === null ? (
                  (
                  <span className="inline-flex items-center rounded-full border border-[var(--accent)]/30 px-4 py-1.5 font-medium text-[var(--accent)] transition-colors duration-[var(--dur-fast)] group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)]/10">
                    Join
                  </span>
                )
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
      <p className="mt-6 text-xs text-[var(--text-muted)]">
        {/* NEEDS CLIENT INPUT — verified member counts and live invite links. */}
        Member counts and invite links shown once confirmed.
      </p>
    </>
  );
}
