/**
 * Shared placeholder content — design pass only. In production this is replaced
 * by Sanity. No invented stats or testimonials (CLAUDE.md §4).
 */

// Community links — counts are null until the client confirms verifiable numbers.
export type Community = {
  platform: "Discord" | "WhatsApp" | "YouTube" | "Instagram";
  handle: string;
  href: string;
  count: number | null; // null => show "join", never invent a number (§4)
};

export const community: Community[] = [
  { platform: "Discord", handle: "Game of Forex", href: "#", count: null },
  { platform: "WhatsApp", handle: "Community", href: "#", count: null },
  { platform: "YouTube", handle: "@gameofforex", href: "#", count: null },
  { platform: "Instagram", handle: "@gameofforex", href: "#", count: null },
];
