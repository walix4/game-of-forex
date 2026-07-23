/**
 * Ambient page background — layered colour so the glass surfaces above it have
 * something to refract. Fixed, behind everything, non-interactive. Teal/indigo
 * are light here (blurred blobs), never fills (§3 rule 2).
 */
export function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
    >
      {/* base wash */}
      <div className="absolute inset-0 bg-[var(--bg-base)]" />

      {/* colour blobs — give the glass something to blur */}
      <div
        className="absolute left-1/2 top-[-14%] h-[640px] w-[960px] -translate-x-1/2 rounded-full opacity-70 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgb(59 99 255 / 0.30), transparent)" }}
      />
      <div
        className="absolute -left-40 top-[24%] h-[520px] w-[520px] rounded-full opacity-60 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgb(27 50 144 / 0.42), transparent)" }}
      />
      <div
        className="absolute -right-40 top-[52%] h-[560px] w-[560px] rounded-full opacity-50 blur-[130px]"
        style={{ background: "radial-gradient(closest-side, rgb(59 99 255 / 0.22), transparent)" }}
      />
      <div
        className="absolute bottom-[-10%] left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-50 blur-[130px]"
        style={{ background: "radial-gradient(closest-side, rgb(35 64 184 / 0.30), transparent)" }}
      />

      {/* subtle vignette to keep edges deep */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 30%, transparent 55%, rgb(0 0 0 / 0.5) 100%)",
        }}
      />
    </div>
  );
}
