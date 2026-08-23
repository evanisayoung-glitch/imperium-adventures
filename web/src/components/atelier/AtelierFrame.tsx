"use client";

import { Suspense, useState, type ReactNode } from "react";
import Link from "next/link";
import { AtelierSidebar } from "./AtelierSidebar";

export function AtelierFrame({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-svh bg-atelier-void text-atelier-ivory">
      <div className="hidden w-[272px] shrink-0 lg:block">
        <div className="sticky top-0 h-svh">
          <Suspense fallback={<div className="h-full bg-atelier-panel" />}>
            <AtelierSidebar />
          </Suspense>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-atelier-line bg-atelier-void/85 px-4 py-3 backdrop-blur-md lg:hidden">
          <Link href="/atelier" className="display text-2xl text-atelier-ivory">
            Atelier
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="mono min-h-11 px-3 text-[11px] tracking-[0.18em] uppercase text-atelier-champagne"
            aria-expanded={open}
          >
            {open ? "Close" : "Cabinet"}
          </button>
        </header>

        {open ? (
          <div className="fixed inset-0 z-30 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/60"
              aria-label="Close cabinet"
              onClick={() => setOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-[min(86vw,300px)]">
              <Suspense fallback={null}>
                <AtelierSidebar onNavigate={() => setOpen(false)} />
              </Suspense>
            </div>
          </div>
        ) : null}

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
