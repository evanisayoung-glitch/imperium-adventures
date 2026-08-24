"use client";

import Link from "next/link";
import { useState } from "react";
import { StudyPreview } from "@/components/atelier/StudyPreview";
import { WordmarkLab } from "@/components/WordmarkLab";
import { atmospheres, getAtmosphere, type Atmosphere } from "@/lib/possibility";

export function YoursWalk({ initialStudy }: { initialStudy?: string }) {
  const [selected, setSelected] = useState<Atmosphere>(
    () => getAtmosphere(initialStudy) ?? atmospheres.find((item) => item.slug === "or") ?? atmospheres[0],
  );
  const [word, setWord] = useState("IMPERIUM");

  const inquireHref = `/inquire?study=${selected.slug}&word=${encodeURIComponent(word)}&need=first-screen`;

  return (
    <div className="bg-field text-ink">
      <section className="min-h-[100svh] bg-atelier-void text-atelier-ivory lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="relative h-[52vh] lg:order-2 lg:h-auto lg:min-h-[100svh]">
          <StudyPreview
            slug={selected.slug}
            variant={selected.variant}
            className="absolute inset-0 h-full w-full"
            dpr={[1, 1.5]}
          />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-atelier-void/75 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col justify-end px-6 pb-14 pt-8 lg:px-12 lg:pb-24 lg:pt-28">
          <h1 className="display text-[clamp(3rem,8vw,6.5rem)] leading-[0.86] tracking-tight">
            {word}
          </h1>
          <p className="display mt-6 max-w-md text-[clamp(1.35rem,2.2vw,1.85rem)] italic leading-snug text-atelier-ivory/80">
            {selected.line}
          </p>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[16px]">
            {atmospheres.map((item) => {
              const active = item.slug === selected.slug;
              return (
                <li key={item.slug}>
                  <button
                    type="button"
                    onClick={() => setSelected(item)}
                    className={`italic transition-opacity ${active ? "opacity-100" : "opacity-40 hover:opacity-75"}`}
                  >
                    {item.title}
                  </button>
                </li>
              );
            })}
          </ul>
          <Link
            href={`/atelier/${selected.slug}`}
            className="link-quiet mt-6 w-fit text-[15px] text-atelier-champagne"
          >
            Open the study
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 py-28 md:px-12">
        <p className="text-[15px] text-muted">Your mark</p>
        <h2 className="display mt-4 text-[clamp(2.4rem,5vw,4.4rem)] italic leading-[0.95] tracking-tight">
          Letters a visitor has to earn.
        </h2>
        <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-muted">
          Type a short word. On desktop, scrub in one place. On a phone, tap-mash.
          This is how a house meets its name.
        </p>
        <div className="mt-14">
          <WordmarkLab compact onWordChange={setWord} />
        </div>
      </section>

      <section className="border-t border-ink/10 px-6 py-20 md:px-12">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="display max-w-xl text-[clamp(2rem,4vw,3.2rem)] italic leading-tight tracking-tight">
            This opening, on your domain.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[16px]">
            <Link href={`/engage?study=${selected.slug}`} className="link-quiet">
              See investment
            </Link>
            <Link href={inquireHref} className="link-quiet">
              Begin a commission
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
