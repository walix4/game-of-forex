/**
 * Cosmic starfield for the hero — deterministic scattered dots that twinkle.
 * No Math.random (stamps must be stable); positions come from index arithmetic.
 * Purely decorative; freezes under prefers-reduced-motion via the global rule.
 */
const STARS = Array.from({ length: 70 }, (_, i) => {
  const top = (i * 37 + i * i * 7) % 100;
  const left = (i * 53 + i * i * 13) % 100;
  const size = i % 7 === 0 ? 2.5 : i % 3 === 0 ? 1.75 : 1;
  const delay = (i % 6) * 0.7;
  const dur = 3 + (i % 5);
  const op = i % 4 === 0 ? 0.9 : 0.5;
  return { top, left, size, delay, dur, op };
});

export function StarField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="anim-twinkle absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.op,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
