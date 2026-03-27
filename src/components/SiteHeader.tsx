const nav = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/15 bg-black/25 backdrop-blur-[8px]">
      <div className="relative mx-auto flex max-w-5xl items-center justify-center px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="font-headline text-xl font-semibold tracking-[-0.025em] text-white transition-colors hover:text-sky-blue sm:text-2xl focus-visible:rounded-sm"
        >
          awake + align
        </a>
        <nav
          aria-label="Primary"
          className="absolute right-4 hidden items-center gap-6 sm:right-6 sm:flex"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-headline text-[0.75rem] font-medium uppercase tracking-[0.05em] text-white/90 transition-colors hover:text-sky-blue"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
