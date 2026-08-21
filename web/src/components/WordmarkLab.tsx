"use client";

import { useEffect, useState } from "react";
import { useParticleField } from "./ParticleField";

const SAMPLES = ["IMPERIUM", "YOURS", "BRAND", "CHARGE"] as const;
const MAX_CHARS = 8;

function normalizeWord(value: string) {
  return value.replace(/[^A-Za-z0-9]/g, "").slice(0, MAX_CHARS).toUpperCase();
}

export function WordmarkLab() {
  const field = useParticleField();
  const [word, setWord] = useState("IMPERIUM");

  useEffect(() => {
    field?.setText(word || "IMPERIUM");
  }, [field, word]);

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="text-xs tracking-[0.24em] uppercase text-gold">How it works</p>
          <ul className="space-y-3 text-sm leading-relaxed text-muted">
            <li>
              <span className="text-forest">Desktop — </span>
              wiggle the cursor in one small spot. About a second of work crystallizes
              the word; stop and it exhales apart. Hovering or traveling never forms it.
            </li>
            <li>
              <span className="text-forest">Phone — </span>
              one tap tugs the dots; a tap-mash holds the word only while you keep
              tapping. A press-and-hold never forms it. Scrolling never parks it.
            </li>
            <li>
              <span className="text-forest">On a client site — </span>
              one continuous field behind every band, your word, your type, your
              palette. The real headline stays in the DOM.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <label className="block space-y-2 text-sm text-muted">
            Try a brand word
            <input
              value={word}
              onChange={(event) => setWord(normalizeWord(event.target.value))}
              maxLength={MAX_CHARS}
              className="min-h-11 w-full border border-forest/20 bg-transparent px-3 py-2.5 font-medium tracking-[0.18em] text-forest outline-none transition focus:border-gold"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              enterKeyHint="done"
              aria-describedby="wordmark-limit"
            />
          </label>
          <p id="wordmark-limit" className="text-xs text-muted">
            Short words stay crisp — {word.length}/{MAX_CHARS} letters.
          </p>
          <div className="flex flex-wrap gap-2">
            {SAMPLES.map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => setWord(sample)}
                className="min-h-11 border border-forest/20 px-3 py-2 text-xs tracking-[0.14em] text-muted transition hover:border-gold hover:text-forest active:border-gold active:bg-field-warm active:text-forest"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="relative min-h-[42vh] border border-forest/15 sm:min-h-[48vh]"
        aria-label="Open field. Scrub or tap here to form the word."
      >
        <p className="pointer-events-none absolute inset-x-0 bottom-0 px-5 py-4 text-sm text-muted">
          Scrub here on desktop, or tap-mash on a phone — the word forms in this field,
          behind the copy.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-forest/15 pt-8">
        <a
          href="mailto:Imperiumadventures99@gmail.com?subject=Particle%20wordmark%20inquiry"
          className="inline-flex min-h-11 items-center bg-gold px-6 py-3 text-sm font-medium tracking-[0.12em] uppercase text-forest-deep transition hover:bg-gold-soft active:bg-gold-soft"
        >
          Commission this effect
        </a>
        <p className="max-w-md text-sm text-muted">
          Imperium ships the field on your site — your word, type, and colors — as part
          of a brand-led build.
        </p>
      </div>
    </div>
  );
}
