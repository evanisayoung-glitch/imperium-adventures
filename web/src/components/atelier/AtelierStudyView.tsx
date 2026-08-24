"use client";

import Link from "next/link";
import { useState } from "react";
import type { AtelierStudy } from "@/lib/atelier";
import { StudyPreview } from "./StudyPreview";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function AtelierStudyView({ study }: { study: AtelierStudy }) {
  const reduced = usePrefersReducedMotion();
  const [variant, setVariant] = useState(study.variants[0]?.id ?? "default");
  const [paused, setPaused] = useState(reduced);

  return (
    <div className="grid min-h-[calc(100svh-57px)] lg:min-h-svh lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="relative min-h-[58svh] bg-atelier-void lg:min-h-svh">
        <StudyPreview
          slug={study.slug}
          variant={variant}
          paused={paused}
          className="absolute inset-0 h-full w-full"
          dpr={[1, 1.6]}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-atelier-void/70 to-transparent" />
        <p className="absolute left-5 top-5 mono text-[10px] tracking-[0.24em] text-atelier-champagne lg:left-7 lg:top-7">
          EDITION {study.edition}
        </p>
      </div>

      <aside className="flex flex-col border-t border-atelier-line bg-atelier-panel lg:border-l lg:border-t-0">
        <div className="flex-1 px-6 py-8 sm:px-8">
          <Link
            href="/atelier"
            className="mono text-[10px] tracking-[0.2em] text-atelier-muted transition hover:text-atelier-champagne"
          >
            ← Cabinet
          </Link>
          <p className="mono mt-6 text-[10px] tracking-[0.22em] text-atelier-champagne">{study.family}</p>
          <h1 className="display mt-2 text-5xl leading-none text-atelier-ivory">{study.title}</h1>
          <p className="mt-2 text-lg text-atelier-ivory/70">{study.subtitle}</p>
          <div className="atelier-hairline my-6" />
          <p className="text-sm leading-relaxed text-atelier-ivory/72">{study.statement}</p>
          <p className="mt-5 text-sm leading-relaxed text-atelier-champagne/80">
            On a client site — this finish as the opening screen, or behind a booking form.
            The study is proof. The commission is the page.
          </p>

          <div className="mt-8">
            <p className="mono text-[10px] tracking-[0.2em] text-atelier-muted">FINISH</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {study.variants.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setVariant(item.id)}
                  className={`mono min-h-10 px-3 text-[10px] tracking-[0.16em] uppercase transition ${
                    variant === item.id
                      ? "bg-atelier-ivory text-atelier-void"
                      : "border border-atelier-line text-atelier-ivory/70 hover:border-atelier-champagne"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className="mono mt-5 text-[10px] tracking-[0.18em] uppercase text-atelier-muted underline-offset-4 hover:text-atelier-champagne hover:underline"
          >
            {paused ? "Resume motion" : "Still the room"}
          </button>
        </div>

        <div className="border-t border-atelier-line px-6 py-6 sm:px-8">
          <Link
            href={`/inquire?study=${study.slug}&need=first-screen`}
            className="cta-ivory w-full justify-center text-[15px]"
          >
            Use this in a build
          </Link>
          <p className="mono mt-3 text-center text-[10px] tracking-[0.14em] text-atelier-muted">
            Private builds · Vercel · by appointment
          </p>
        </div>
      </aside>
    </div>
  );
}
