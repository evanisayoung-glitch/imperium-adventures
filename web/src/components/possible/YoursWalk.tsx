"use client";

import Link from "next/link";
import { useState } from "react";
import { StudyPreview } from "@/components/atelier/StudyPreview";
import { WordmarkLab } from "@/components/WordmarkLab";
import { atmospheres, getAtmosphere, shippedSurfaces, type Atmosphere } from "@/lib/possibility";

export function YoursWalk({ initialStudy }: { initialStudy?: string }) {
  const [selected, setSelected] = useState<Atmosphere>(
    () => getAtmosphere(initialStudy) ?? atmospheres[0],
  );
  const [word, setWord] = useState("IMPERIUM");

  const inquireHref = `/inquire?study=${selected.slug}&word=${encodeURIComponent(word)}&need=first-screen`;

  return (
    <div className="space-y-24">
      <section>
        <p className="text-xs tracking-[0.24em] uppercase text-gold">Yours</p>
        <h1 className="display mt-3 text-5xl text-forest sm:text-6xl">See your first screen.</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Type a brand word. Pick an atmosphere. This is how a visitor first meets your house —
          not a template, and not our lab.
        </p>
      </section>

      <section>
        <p className="text-xs tracking-[0.24em] uppercase text-gold">01 · Your mark</p>
        <h2 className="display mt-3 text-3xl text-forest sm:text-4xl">Your letters, earned.</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          The field only crystallizes when someone works for it. Try a short word — then take it
          to a commission.
        </p>
        <div className="mt-10">
          <WordmarkLab compact onWordChange={setWord} />
        </div>
      </section>

      <section>
        <p className="text-xs tracking-[0.24em] uppercase text-gold">02 · Your opening</p>
        <h2 className="display mt-3 text-3xl text-forest sm:text-4xl">This becomes the opening of your site.</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Four atmospheres from the cabinet. Choose the one that feels like your house.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[52vw] overflow-hidden bg-atelier-void ring-1 ring-forest/10 lg:min-h-[28rem]">
            <StudyPreview
              slug={selected.slug}
              variant={selected.variant}
              className="absolute inset-0 h-full w-full"
              dpr={1.1}
            />
            <p className="display pointer-events-none absolute left-5 top-5 text-3xl tracking-[0.18em] text-atelier-ivory/90">
              {word}
            </p>
          </div>
          <div>
            <ul className="space-y-2">
              {atmospheres.map((item) => {
                const active = item.slug === selected.slug;
                return (
                  <li key={item.slug}>
                    <button
                      type="button"
                      onClick={() => setSelected(item)}
                      className={`w-full border px-4 py-4 text-left transition ${
                        active
                          ? "border-gold bg-field-warm"
                          : "border-forest/15 hover:border-gold/50"
                      }`}
                    >
                      <p className="text-[10px] tracking-[0.2em] uppercase text-gold">{item.job}</p>
                      <p className="display mt-1 text-xl text-forest">{item.title}</p>
                      <p className="mt-1 text-sm text-muted">{item.line}</p>
                    </button>
                  </li>
                );
              })}
            </ul>
            <Link
              href={`/atelier/${selected.slug}`}
              className="mt-6 inline-flex text-xs tracking-[0.16em] uppercase text-gold underline-offset-4 hover:underline"
            >
              Open the study →
            </Link>
          </div>
        </div>
      </section>

      <section>
        <p className="text-xs tracking-[0.24em] uppercase text-gold">03 · What ships</p>
        <h2 className="display mt-3 text-3xl text-forest sm:text-4xl">Craft you can commission.</h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-3">
          {shippedSurfaces.map((item) => (
            <li key={item.title} className="space-y-3 border-t border-forest/15 pt-6">
              <h3 className="display text-2xl text-forest">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{item.body}</p>
              {"href" in item && item.href ? (
                <Link href={item.href} className="text-xs tracking-[0.16em] uppercase text-gold">
                  See a build →
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-wrap gap-3 border-t border-forest/15 pt-10">
        <Link
          href={`/engage?study=${selected.slug}`}
          className="inline-flex min-h-11 items-center bg-gold px-6 py-3 text-sm font-medium tracking-[0.12em] uppercase text-forest-deep transition hover:bg-gold-soft"
        >
          See investment
        </Link>
        <Link
          href={inquireHref}
          className="inline-flex min-h-11 items-center border border-forest/20 px-6 py-3 text-sm tracking-[0.12em] uppercase text-forest transition hover:border-gold"
        >
          Begin a commission
        </Link>
      </section>
    </div>
  );
}
