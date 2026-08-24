"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { StudyPreview } from "@/components/atelier/StudyPreview";
import { crafts, inquireHref, type CraftId } from "@/lib/crafts";
import { atmospheres, getAtmosphere, type Atmosphere } from "@/lib/possibility";
import { ChapterFrame } from "./ChapterFrame";
import { ParticleStage } from "./ParticleStage";

const PaintingReveal = dynamic(
  () => import("./PaintingReveal").then((mod) => mod.PaintingReveal),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-paper" /> },
);

const MAX_CHARS = 8;

function normalizeWord(value: string) {
  return value.replace(/[^A-Za-z0-9]/g, "").slice(0, MAX_CHARS).toUpperCase();
}

export function YoursComposer({ initialStudy }: { initialStudy?: string }) {
  const [word, setWord] = useState("IMPERIUM");
  const [selected, setSelected] = useState<Atmosphere>(
    () => getAtmosphere(initialStudy) ?? atmospheres.find((item) => item.slug === "or") ?? atmospheres[0],
  );
  const [picked, setPicked] = useState<CraftId>("identity");

  const primary = useMemo(() => crafts.find((item) => item.id === picked) ?? crafts[0]!, [picked]);
  const href = inquireHref(primary, { word, study: selected.slug });

  return (
    <div className="bg-void text-ivory">
      <section className="relative min-h-[100svh] overflow-hidden">
        <ParticleStage word={word} className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/50 via-transparent to-void/80" />
        <ChapterFrame
          index="01"
          kicker="Yours"
          title={word || "IMPERIUM"}
          body="Type a short word. Scrub or tap-mash until it gathers. This is how a house meets its name."
          href={href}
          hrefLabel="Begin with this mark"
        >
          <label className="mt-8 block">
            <span className="mono text-[11px] tracking-[0.24em] uppercase text-ivory/40">Brand word</span>
            <input
              value={word}
              onChange={(event) => setWord(normalizeWord(event.target.value))}
              maxLength={MAX_CHARS}
              className="field-input display mt-2 text-[1.85rem] tracking-[0.08em]"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
            />
          </label>
        </ChapterFrame>
      </section>

      <section className="relative min-h-[100svh] overflow-hidden bg-paper text-void">
        <PaintingReveal className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-paper/55 via-transparent to-transparent" />
        <ChapterFrame
          index="02"
          kicker="Reveal"
          title="Patience as a first screen."
          body="We install this as a landing, a wait, a daily ritual. On a client site the painting earns itself over a workday — here it reveals so you can see the craft."
          href={inquireHref(crafts[1]!, { word })}
          hrefLabel="Commission a reveal"
          ink="void"
        />
      </section>

      <section className="relative min-h-[100svh] overflow-hidden">
        <StudyPreview
          slug={selected.slug}
          variant={selected.variant}
          className="absolute inset-0"
          dpr={[1, 1.5]}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/82 via-void/20 to-void/45" />
        <div className="pointer-events-none relative z-10 flex min-h-[100svh] flex-col justify-between px-6 pb-16 pt-28 md:px-12 md:pb-20 md:pt-32">
          <div className="max-w-lg">
            <p className="mono text-[11px] tracking-[0.32em] uppercase text-gold">03 — Threshold</p>
            <h2 className="display mt-5 text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.86] tracking-tight">
              {selected.title}
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ivory/60">{selected.line}</p>
          </div>
          <div className="pointer-events-auto">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {atmospheres.map((item) => {
                const active = item.slug === selected.slug;
                return (
                  <li key={item.slug}>
                    <button
                      type="button"
                      onClick={() => setSelected(item)}
                      className={`mono text-[12px] tracking-[0.2em] uppercase transition ${
                        active ? "text-gold" : "text-ivory/40 hover:text-ivory/80"
                      }`}
                    >
                      {item.title}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-8">
              <Link href={`/atelier/${selected.slug}`} className="link-gold">
                Open the study
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-ivory/10 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1180px]">
          <p className="mono text-[11px] tracking-[0.32em] uppercase text-gold">Commission</p>
          <h2 className="display mt-4 max-w-2xl text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.92] tracking-tight">
            Choose the engine for the opening.
          </h2>
          <ul className="mt-12 grid gap-3">
            {crafts
              .filter((item) => item.id !== "os")
              .map((craft) => {
                const active = craft.id === picked;
                return (
                  <li key={craft.id}>
                    <button
                      type="button"
                      onClick={() => setPicked(craft.id)}
                      className={`flex w-full items-baseline justify-between gap-6 border px-5 py-5 text-left transition ${
                        active
                          ? "border-gold/50 bg-ivory/[0.04]"
                          : "border-ivory/10 hover:border-ivory/25"
                      }`}
                    >
                      <span className="display text-[1.45rem] leading-none">{craft.name}</span>
                      <span className="hidden text-[14px] text-ivory/45 sm:block">{craft.line}</span>
                    </button>
                  </li>
                );
              })}
          </ul>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href={href} className="cta-ink text-[15px]">
              Begin a commission
            </Link>
            <Link href={`/engage?study=${selected.slug}`} className="link-gold text-[15px]">
              See investment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
