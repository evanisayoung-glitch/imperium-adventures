import Link from "next/link";

const links = [
  { href: "/#playground", label: "Playground" },
  { href: "/#craft", label: "Craft" },
  { href: "/#hire", label: "Hire" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-8 sm:py-4">
        <Link
          href="/"
          className="display inline-flex min-h-11 items-center rounded-sm bg-forest-deep/55 px-3 py-2 text-sm tracking-[0.22em] text-field backdrop-blur-sm transition-colors hover:text-gold-soft active:text-gold-soft"
        >
          IMPERIUM
        </Link>
        <nav className="flex items-center rounded-sm bg-forest-deep/55 px-1 py-1 backdrop-blur-sm sm:px-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center px-2.5 text-[11px] tracking-[0.14em] uppercase text-field/85 transition-colors hover:text-gold-soft active:text-gold-soft sm:px-3 sm:text-xs sm:tracking-[0.16em]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
