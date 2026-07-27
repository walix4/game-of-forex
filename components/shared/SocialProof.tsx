import { cn } from "@/lib/utils";

/**
 * Social proof — avatar stack + rating card. Shared by the hero and community.
 *
 * ⚠️ COMPLIANCE (§4): the portraits are STOCK PLACEHOLDERS (randomuser.me), not
 * real members — NEEDS CLIENT PHOTOS (client-owned / consented) before launch.
 * The "10K+" count and "4.9" rating are NEEDS CLIENT INPUT (verified only).
 */
const AVATARS = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/54.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
];

export function SocialProof({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10",
        className,
      )}
    >
      {/* avatar stack — shrink-0 so the text column can never ride over it */}
      <div className="flex items-center gap-4">
        <div className="flex shrink-0">
          {AVATARS.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt=""
              width={44}
              height={44}
              loading="lazy"
              className={cn(
                "size-11 rounded-full border-2 border-[var(--bg-base)] object-cover",
                i > 0 && "-ml-3",
              )}
            />
          ))}
          <span className="-ml-3 grid size-11 shrink-0 place-items-center rounded-full border-2 border-[var(--bg-base)] bg-white text-[var(--bg-base)]">
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
              <path
                d="M8 3.5v9M3.5 8h9"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
        <div className="min-w-0 text-left">
          <p className="font-semibold text-[var(--text-primary)]">
            <span className="tabular">10K+</span> community members
          </p>
          <p className="text-sm text-[var(--text-muted)]">Growing every week</p>
        </div>
      </div>

      {/* rating card */}
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
    </div>
  );
}
