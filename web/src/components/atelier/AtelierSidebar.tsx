"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { familyCounts, studies } from "@/lib/atelier";

export function AtelierSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const family = params.get("family") ?? "all";
  const counts = familyCounts();
  const browseActive = pathname === "/atelier";

  return (
    <aside className="flex h-full flex-col border-r border-atelier-line bg-atelier-panel">
      <div className="px-5 pb-6 pt-7">
        <Link href="/" onClick={onNavigate} className="mono text-[10px] tracking-[0.28em] text-atelier-muted">
          IMPERIUM
        </Link>
        <Link href="/atelier" onClick={onNavigate} className="mt-2 block">
          <p className="display text-3xl leading-none text-atelier-ivory">Atelier</p>
        </Link>
        <div className="atelier-hairline mt-5" />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-8">
        <p className="mono px-2 text-[10px] tracking-[0.22em] text-atelier-muted">THE CABINET</p>
        <SidebarLink
          href="/atelier"
          active={browseActive && family === "all"}
          onClick={onNavigate}
          count={studies.length}
        >
          Browse
        </SidebarLink>
        {counts.map((item) => (
          <SidebarLink
            key={item.family}
            href={`/atelier?family=${item.family}`}
            active={browseActive && family === item.family}
            onClick={onNavigate}
            count={item.count}
          >
            {item.label}
          </SidebarLink>
        ))}

        <p className="mono mt-8 px-2 text-[10px] tracking-[0.22em] text-atelier-muted">STUDIES</p>
        {studies.map((study) => (
          <SidebarLink
            key={study.slug}
            href={`/atelier/${study.slug}`}
            active={pathname === `/atelier/${study.slug}`}
            onClick={onNavigate}
          >
            <span className="text-atelier-muted">{study.edition}</span> {study.title}
          </SidebarLink>
        ))}

        <p className="mono mt-8 px-2 text-[10px] tracking-[0.22em] text-atelier-muted">MAISON</p>
        <SidebarLink href="/" onClick={onNavigate}>
          House
        </SidebarLink>
        <SidebarLink href="/playground" onClick={onNavigate}>
          Playground
        </SidebarLink>
        <SidebarLink href="/inquire" onClick={onNavigate}>
          Commission
        </SidebarLink>
      </nav>

      <div className="border-t border-atelier-line px-5 py-4">
        <p className="mono text-[10px] leading-relaxed tracking-[0.14em] text-atelier-muted">
          Eight private studies. Lit like jewelry. By appointment.
        </p>
      </div>
    </aside>
  );
}

function SidebarLink({
  href,
  children,
  active,
  count,
  onClick,
}: {
  href: string;
  children: ReactNode;
  active?: boolean;
  count?: number;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`mt-1 flex min-h-10 items-center justify-between rounded-sm px-2.5 text-[12px] tracking-[0.08em] transition ${
        active
          ? "bg-atelier-ivory text-atelier-void"
          : "text-atelier-ivory/75 hover:bg-atelier-raised hover:text-atelier-champagne"
      }`}
    >
      <span>{children}</span>
      {typeof count === "number" ? (
        <span className={`mono text-[10px] ${active ? "text-atelier-void/60" : "text-atelier-muted"}`}>
          {count}
        </span>
      ) : null}
    </Link>
  );
}
