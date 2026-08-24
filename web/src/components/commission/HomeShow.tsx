"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { StudyPreview } from "@/components/atelier/StudyPreview";
import { LivingCompass } from "@/components/LivingCompass";
import { MistCanvas } from "@/components/MistCanvas";
import { crafts, inquireHref } from "@/lib/crafts";
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

export function HomeShow() {
  const [word, setWord] = useState("IMPERIUM");

  return (
    <div className="bg-void text-ivory">
      <section className="relative min-h-[100svh] overflow-hidden">
        <ParticleStage word={word} className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/55 via-transparent to-void/75" />
        <ChapterFrame
          index="01"
          kicker="Identity"
          title="Your name is earned."
          body="Gold dust. Visitors scrub until the word gathers. This is the first screen we install — not a logo file dropped on a template."
          href={inquireHref(crafts[0]!, { word })}
          hrefLabel="Commission this"
        >
          <p className="mono mt-6 text-[11px] tracking-[0.18em] uppercase text-ivory/35">
            Scrub or tap — the word gathers
          </p>
          <label className="mt-8 block">
            <span className="mono text-[11px] tracking-[0.24em] uppercase text-ivory/40">
              Try a word
            </span>
            <input
              value={word}
              onChange={(event) => setWord(normalizeWord(event.target.value))}
              maxLength={MAX_CHARS}
              className="field-input display mt-2 text-[1.65rem] tracking-[0.08em]"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              aria-label="Brand word"
            />
          </label>
        </ChapterFrame>
      </section>

      <section className="relative min-h-[100svh] overflow-hidden bg-paper text-void">
        <PaintingReveal className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-paper/88 via-paper/20 to-transparent md:via-paper/10" />
        <ChapterFrame
          index="02"
          kicker="Patience"
          title="A masterpiece, on their time."
          body="Cotton dabs lift a painting from The Met as someone waits, focuses, or returns. The Pomodoro engine — built as a landing, a ritual, a first screen. Not a timer toy."
          href={inquireHref(crafts[1]!)}
          hrefLabel="Commission this"
          ink="void"
        />
      </section>

      <section className="relative min-h-[100svh] overflow-hidden">
        <StudyPreview slug="or" variant="knot" className="absolute inset-0 h-full w-full" dpr={[1, 1.5]} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-void/15 to-void/50" />
        <ChapterFrame
          index="03"
          kicker="Threshold"
          title="A door. Not a demo."
          body="Live Three.js — gilt, grove, cloth, weather. The opening of an estate site. Photography you do not need."
          href={inquireHref(crafts[2]!, { study: "or" })}
          hrefLabel="Commission this"
          align="end"
        />
      </section>

      <section className="bg-void">
        <div className="px-6 pb-10 pt-28 md:px-12">
          <p className="mono text-[11px] tracking-[0.32em] uppercase text-gold">04 — Atmosphere</p>
          <h2 className="display mt-5 max-w-2xl text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.9] tracking-tight">
            The site answers the hand.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ivory/55">
            Compass, mist, and motion with weight. Installed as weather on a client site — not
            widgets in a lab.
          </p>
          <p className="mt-6">
            <Link href={inquireHref(crafts[3]!)} className="link-gold">
              Commission this
            </Link>
          </p>
        </div>
        <div className="grid min-h-[70svh] lg:grid-cols-2">
          <div className="relative flex min-h-[70svh] flex-col items-center justify-center bg-void px-6 py-24">
            <LivingCompass size={320} />
            <p className="mono mt-10 text-[11px] tracking-[0.28em] uppercase text-gold">Compass</p>
            <p className="mt-3 max-w-xs text-center text-[14px] leading-relaxed text-ivory/50">
              The needle follows the hand with magnetic ease.
            </p>
          </div>
          <div className="relative min-h-[70svh]">
            <MistCanvas className="absolute inset-0 h-full w-full border-0" hideCaption />
            <div className="absolute inset-x-0 bottom-0 z-[2] px-6 pb-8 md:px-10">
              <p className="mono text-[11px] tracking-[0.28em] uppercase text-gold">Mist</p>
              <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-ivory/70">
                Drag. Mountains stay. Only the weather moves.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function HomeLedger() {
  return (
    <section className="bg-void px-6 py-28 text-ivory md:px-12 md:py-36">
      <div className="mx-auto max-w-[1180px]">
        <p className="mono text-[11px] tracking-[0.32em] uppercase text-gold">05 — What we install</p>
        <h2 className="display mt-5 max-w-3xl text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.9] tracking-tight">
          Effects you can commission. Not experiments you browse.
        </h2>
        <ul className="mt-16 divide-y divide-ivory/10 border-y border-ivory/10">
          {crafts.map((craft) => (
            <li key={craft.id} className="grid gap-4 py-8 md:grid-cols-[4rem_minmax(0,1fr)_auto] md:items-end">
              <p className="mono text-[12px] text-gold">{craft.index}</p>
              <div>
                <p className="display text-[1.85rem] leading-none tracking-tight">{craft.name}</p>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ivory/55">{craft.line}</p>
              </div>
              <Link href={inquireHref(craft)} className="link-gold text-[15px]">
                Use this
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
