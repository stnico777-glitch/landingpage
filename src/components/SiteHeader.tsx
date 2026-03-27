export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/15 bg-black/25 backdrop-blur-[8px]">
      <div className="relative mx-auto flex max-w-5xl items-center justify-center px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="font-headline text-xl font-semibold tracking-[-0.025em] text-white transition-colors hover:text-sky-blue sm:text-2xl focus-visible:rounded-sm"
        >
          Faith + Fitness Routine
        </a>
      </div>
    </header>
  );
}
