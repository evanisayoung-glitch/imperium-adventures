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

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-void/72 text-ivory backdrop-blur-md">
      <div className="spectrum-bar" />
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-4 md:px-12">
        <Link href="/" className="display text-[1.35rem] leading-none tracking-tight">
          Imperium
        </Link>
        <nav className="hidden items-center gap-x-8 text-[13px] tracking-[0.04em] sm:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  active ? "text-gold" : "text-ivory/55 hover:text-ivory"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/inquire" className="text-[13px] tracking-[0.04em] text-gold sm:hidden">
          Inquire
        </Link>
      </div>
    </header>
  );
}
