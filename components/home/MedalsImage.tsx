"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Gold "G" medals decoration for the funded-capital card. Loads the
 * client-supplied image at `public/medals.png`; falls back to a 🏆 emoji if the
 * file isn't present yet.
 *
 * ACTION NEEDED: save the provided medals image to `public/medals.png`.
 */
export function MedalsImage({ className }: { className?: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <span className={cn("text-5xl", className)} aria-hidden>
        🏆
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/medals.png"
      alt=""
      onError={() => setOk(false)}
      className={cn("h-auto w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]", className)}
    />
  );
}
