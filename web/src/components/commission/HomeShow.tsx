"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { StudyPreview } from "@/components/atelier/StudyPreview";
import { LivingCompass } from "@/components/LivingCompass";
import { MistCanvas } from "@/components/MistCanvas";
import { crafts, getCraft, inquireHref } from "@/lib/crafts";
import { ChapterFrame } from "./ChapterFrame";
import { ParticleStage } from "./ParticleStage";
import { SilkCloth } from "./SilkCloth";
import { SpectrumField } from "./SpectrumField";

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
  const identity = getCraft("identity")!;
  const reveal = getCraft("reveal")!;
  const spectrum = getCraft("spectrum")!;
  const silk = getCraft("silk")!;
  const threshold = getCraft("threshold")!;
  const atmosphere = getCraft("atmosphere")!;

  return (
    <div className="bg-void text-ivory">
      <section className="relative min-h-[100svh] overflow-hidden">
        <ParticleStage word={word} className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/55 via-transparent to-void/75" />
        <ChapterFrame
          index="01"
          kicker="Name"
          title="Your name is earned."
          body="Gold dust. Guests move a little before your word appears. This is the first thing we put on a house — not a logo file on a ready-made page."
          href={inquireHref(identity, { word })}
          hrefLabel="I want this"
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
              aria-label="Your word"
            />
          </label>
        </ChapterFrame>
      </section>

      <section className="relative min-h-[100svh] overflow-hidden bg-paper text-void">
        <PaintingReveal className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-paper/55 via-transparent to-transparent" />
        <ChapterFrame
          index="02"
          kicker="Patience"
          title="A masterpiece, on their time."
          body="Soft dabs lift a painting from The Met while someone waits, sits, or returns. A landing that rewards staying — not a clock."
          href={inquireHref(reveal)}
          hrefLabel="I want this"
          ink="void"
        />
      </section>

      <section className="relative min-h-[100svh] overflow-hidden">
        <SpectrumField word={word} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void/35 via-transparent to-transparent" />
        <ChapterFrame
          index="03"
          kicker="Color"
          title="Every color you own."
          body="Move across the field. Rose, saffron, jade, indigo — the house finds a color and keeps it. This is how a brand feels, not how a palette is listed."
          href={inquireHref(spectrum, { word })}
          hrefLabel="I want this"
        />
      </section>

      <section className="relative min-h-[100svh] overflow-hidden">
        <SilkCloth />
        <ChapterFrame
          index="04"
          kicker="Cloth"
          title="Light, folded."
          body="Shot silk. Evening rose, morning gold, deep teal. The cloth answers as they pass — a dress for the opening, not a flat wash of paint."
          href={inquireHref(silk)}
          hrefLabel="I want this"
        />
      </section>

      <section className="relative min-h-[100svh] overflow-hidden">
        <StudyPreview slug="or" variant="knot" className="absolute inset-0" dpr={[1, 1.5]} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-void/15 to-void/50" />
        <ChapterFrame
          index="05"
          kicker="Doorway"
          title="A door. Not a picture."
          body="One object in the room, lit like jewelry. Grove, gilt, cloth, weather. Photography you do not need."
          href={inquireHref(threshold, { study: "or" })}
          hrefLabel="I want this"
          align="end"
        />
      </section>

      <section className="relative bg-void">
        <div className="grid min-h-[100svh] lg:grid-cols-2">
          <div className="relative flex min-h-[70svh] flex-col justify-end bg-void px-6 pb-16 pt-36 md:px-12">
            <p className="mono text-[11px] tracking-[0.32em] uppercase text-gold">06 — Weather</p>
            <h2 className="display mt-5 max-w-md text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.9] tracking-tight">
              The page feels the hand.
            </h2>
            <div className="mt-10 flex flex-1 items-center justify-center">
              <LivingCompass size={300} />
            </div>
            <p className="mono text-[11px] tracking-[0.28em] uppercase text-gold">Compass</p>
            <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-ivory/50">
              The needle follows. Weather, not a gadget.
            </p>
            <p className="mt-5">
              <Link href={inquireHref(atmosphere)} className="link-gold">
                I want this
              </Link>
            </p>
          </div>
          <div className="relative min-h-[70svh]">
            <MistCanvas className="absolute inset-0 border-0" hideCaption />
            <div className="absolute inset-x-0 bottom-0 z-[2] px-6 pb-16 md:px-12">
              <p className="mono text-[11px] tracking-[0.28em] uppercase text-gold">Mist</p>
              <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-ivory/75">
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
    <section className="relative overflow-hidden bg-void px-6 py-28 text-ivory md:px-12 md:py-36">
      <div className="spectrum-bar absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-[1180px]">
        <p className="mono text-[11px] tracking-[0.32em] uppercase text-gold">07 — On your site</p>
        <h2 className="display mt-5 max-w-3xl text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.9] tracking-tight">
          What we can put on your house.
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
                I want this
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
