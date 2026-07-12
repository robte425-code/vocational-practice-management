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
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <a href="#top" className="min-w-0">
          <span className="block font-display text-[1.05rem] leading-tight tracking-tight text-ink sm:text-lg">
            Vocational Practice Management
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
          className="shrink-0 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-mist transition hover:bg-ink-soft"
        >
          Request a demo
        </Link>
      </div>
    </header>
  );
}
