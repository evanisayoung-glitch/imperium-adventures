"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/yours", label: "Yours" },
  { href: "/atelier", label: "Atelier" },
  { href: "/engage", label: "Engage" },
  { href: "/inquire", label: "Inquire" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const dark = pathname === "/" || pathname === "/yours" || pathname.startsWith("/crm");

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div
        className={`mx-auto flex max-w-[1400px] items-baseline justify-between gap-6 px-6 py-6 md:px-12 ${
          dark ? "text-atelier-ivory" : "text-ink"
        }`}
      >
        <Link href="/" className="display text-[1.35rem] leading-none tracking-tight">
          Imperium
        </Link>
        <nav className="hidden items-baseline gap-x-7 text-[15px] sm:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-opacity hover:opacity-100 ${
                  active ? "opacity-100" : "opacity-55"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/inquire" className="text-[15px] sm:hidden">
          Inquire
        </Link>
      </div>
    </header>
  );
}
