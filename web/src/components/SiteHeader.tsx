import Link from "next/link";

const links = [
  { href: "/crm", label: "CRM" },
  { href: "/#playground", label: "Playground" },
  { href: "/#craft", label: "Craft" },
  { href: "/#hire", label: "Hire" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="display rounded-sm bg-forest-deep/55 px-3 py-2 text-sm tracking-[0.22em] text-field backdrop-blur-sm transition-colors hover:text-gold-soft"
        >
          IMPERIUM
        </Link>
        <nav className="flex items-center gap-1 rounded-sm bg-forest-deep/55 px-2 py-1.5 backdrop-blur-sm sm:gap-2 sm:px-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-2 py-1 text-[11px] tracking-[0.16em] uppercase text-field/85 transition-colors hover:text-gold-soft sm:px-3 sm:text-xs"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
