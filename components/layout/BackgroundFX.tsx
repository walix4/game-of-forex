/**
 * Ambient page background — a faint grid and a single teal glow orb. Fixed,
 * behind everything, non-interactive. Adds depth without breaking the depth
 * model: teal is light (a radial glow), never a fill (§3 rule 2).
 */
export function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
    >
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 55% at 50% 0%, #000 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 55% at 50% 0%, #000 30%, transparent 80%)",
        }}
      />
      {/* teal glow orb, top */}
      <div
        className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(44 72 76 / 0.55), transparent)",
        }}
      />
    </div>
  );
}
