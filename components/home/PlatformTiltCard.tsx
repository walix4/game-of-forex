"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { SocialIcon } from "@/components/shared/SocialIcon";

/**
 * Brand-filled community card with a pointer-tracking 3D tilt (client
 * request 2026-07-27). Brand gradients are platform assets, same idiom as the
 * BRAND colour map. Tilt is skipped under prefers-reduced-motion.
 */
// Deep, dark takes on the brand colours (client: "thora dark touch").
const BG: Record<string, string> = {
  Discord: "linear-gradient(160deg, #4A54D8 0%, #333CA8 50%, #1E2470 100%)",
  WhatsApp: "linear-gradient(160deg, #1FA855 0%, #12744B 55%, #0A4A32 100%)",
  YouTube: "linear-gradient(160deg, #C4302B 0%, #91201C 55%, #641210 100%)",
  Instagram: "linear-gradient(140deg, #B35A18 0%, #96204F 50%, #4E1F70 100%)",
};

export function PlatformTiltCard({
  platform,
  handle,
  href,
}: {
  platform: string;
  handle: string;
  href: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 900,
        background: BG[platform],
      }}
      className="group relative flex h-full flex-col items-start gap-3 overflow-hidden rounded-[var(--radius-lg)] p-6 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.7)] will-change-transform"
    >
      {/* top sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 55% at 15% 0%, rgb(255 255 255 / 0.16), transparent 55%)",
        }}
      />
      <span className="relative grid size-11 place-items-center rounded-[var(--radius)] bg-white/20 text-white">
        <SocialIcon name={platform} className="size-6" />
      </span>
      <span className="relative text-sm font-semibold text-white">
        {platform}
      </span>
      <span className="relative text-xs text-white/75">{handle}</span>
      <span className="relative mt-auto inline-flex items-center rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-sm font-medium text-white transition-colors duration-[var(--dur-fast)] group-hover:bg-white/25">
        Join
      </span>
    </motion.a>
  );
}
