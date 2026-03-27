/**
 * Optional bottom peach radial for static pages (low opacity).
 */
export function SunRaysSection() {
  return (
    <div
      aria-hidden
      className="sun-rays-layer pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[min(42vh,420px)]"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% 100%, rgba(255, 230, 185, 0.22) 0%, rgba(255, 238, 210, 0.1) 42%, transparent 70%)",
      }}
    />
  );
}
