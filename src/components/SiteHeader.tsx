import Link from "next/link";

const links = [
  { href: "#platform", label: "Platform" },
  { href: "#features", label: "Features" },
  { href: "#audience", label: "Who it’s for" },
  { href: "#demo", label: "Request a demo" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-8 sm:py-5">
        <a href="#top" className="min-w-0 flex-1">
          <span className="block truncate font-display text-[0.95rem] leading-tight tracking-tight text-ink sm:text-lg">
            <span className="sm:hidden">Voc Practice Management</span>
            <span className="hidden sm:inline">Vocational Practice Management</span>
          </span>
        </a>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft transition hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Link
          href="#demo"
          className="shrink-0 rounded-full bg-ink px-3.5 py-2 text-sm font-semibold text-mist transition hover:bg-ink-soft sm:px-4"
        >
          <span className="sm:hidden">Demo</span>
          <span className="hidden sm:inline">Request a demo</span>
        </Link>
      </div>
    </header>
  );
}
