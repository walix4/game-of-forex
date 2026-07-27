import { SocialIcon } from "@/components/shared/SocialIcon";
import { cn } from "@/lib/utils";

/**
 * Direct contact channel rows. Brand glyph colours follow the CommunityRow
 * idiom (brand assets, not palette colours). All hrefs are placeholders —
 * NEEDS CLIENT INPUT for the real email address and invite links.
 */
const BRAND: Record<string, string> = {
  Discord: "#5865F2",
  WhatsApp: "#25D366",
};

const CHANNELS: {
  name: string;
  detail: string;
  href: string;
  icon: "email" | "WhatsApp" | "Discord";
}[] = [
  {
    name: "Email",
    detail: "Address to be confirmed", // NEEDS CLIENT INPUT
    href: "#",
    icon: "email",
  },
  {
    name: "WhatsApp",
    detail: "Community group", // NEEDS CLIENT INPUT — real invite link
    href: "#",
    icon: "WhatsApp",
  },
  {
    name: "Discord",
    detail: "EZE Funded server", // NEEDS CLIENT INPUT — real invite link
    href: "#",
    icon: "Discord",
  },
];

export function ContactChannels({ className }: { className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {CHANNELS.map((c) => (
        <li key={c.name}>
          <a
            href={c.href}
            className="group flex items-center gap-4 rounded-[var(--radius-lg)] glass-card p-4 transition-colors duration-[var(--dur-base)] hover:border-[var(--border-accent)]"
          >
            <span
              className="grid size-11 shrink-0 place-items-center rounded-[var(--radius)] bg-white/[0.06]"
              style={
                c.icon !== "email" ? { color: BRAND[c.icon] } : undefined
              }
            >
              {c.icon === "email" ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className="size-5 text-[var(--accent)]"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="m4 7 8 6 8-6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <SocialIcon name={c.icon} className="size-5" />
              )}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-[var(--text-primary)]">
                {c.name}
              </span>
              <span className="block truncate text-xs text-[var(--text-muted)]">
                {c.detail}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
