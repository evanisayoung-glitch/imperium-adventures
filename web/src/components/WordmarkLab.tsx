"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createParticleWordmark, type ParticleWordmarkInstance } from "./particle/particle-wordmark";

const SAMPLES = ["IMPERIUM", "YOURS", "BRAND", "CHARGE"] as const;
const MAX_CHARS = 8;

function normalizeWord(value: string) {
  return value.replace(/[^A-Za-z0-9]/g, "").slice(0, MAX_CHARS).toUpperCase();
}

function persistWord(word: string) {
  try {
    sessionStorage.setItem("imperium-word", word);
  } catch {
    /* ignore quota / private mode */
  }
}

export function WordmarkLab({
  compact = false,
  onWordChange,
}: {
  compact?: boolean;
  onWordChange?: (word: string) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const field = useRef<ParticleWordmarkInstance | null>(null);
  const [word, setWord] = useState("IMPERIUM");

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const instance = createParticleWordmark(node, {
      text: word || "IMPERIUM",
      fontFamily: "var(--font-display), Georgia, 'Times New Roman', serif",
      fontWeight: 500,
      colors: ["#C9A227", "#E0C35A", "#9A9588"],
      opacity: 0.75,
      pauseWhenOffscreen: true,
    });
    field.current = instance;
    return () => {
      instance.destroy();
      field.current = null;
    };
    // Mount once; text updates go through setText.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    field.current?.setText(word || "IMPERIUM");
    persistWord(word);
    onWordChange?.(word);
  }, [word, onWordChange]);

  return (
    <div className="space-y-12">
      {compact ? null : (
        <div className="grid gap-12 lg:grid-cols-2">
          <ul className="space-y-5 text-[16px] leading-relaxed text-muted">
            <li>Desktop — scrub in one small place until the word gathers. Travel never forms it.</li>
            <li>Phone — tap-mash. A hold does nothing. Scrolling never parks it.</li>
            <li>On your site — your word, type, and palette, behind a single stage.</li>
          </ul>
          <WordControls word={word} onChange={setWord} />
        </div>
      )}

      {compact ? <WordControls word={word} onChange={setWord} /> : null}

      <div
        ref={host}
        className="relative min-h-[48vh] overflow-hidden bg-atelier-void sm:min-h-[56vh]"
        aria-label="Open field. Scrub or tap here to form the word."
      >
        <p className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] px-5 py-4 text-[14px] text-atelier-ivory/45">
          Scrub or tap-mash — the word forms here.
        </p>
      </div>

      {compact ? null : (
        <div className="flex flex-wrap items-end gap-6">
          <Link href={`/inquire?word=${encodeURIComponent(word)}&need=first-screen`} className="link-quiet text-[16px]">
            I want this
          </Link>
          <p className="max-w-md text-[15px] text-muted">
            Placed on your own address, as part of your site.
          </p>
        </div>
      )}
    </div>
  );
}

function WordControls({
  word,
  onChange,
}: {
  word: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <label className="block space-y-2 text-[15px] text-muted">
        A brand word
        <input
          value={word}
          onChange={(event) => onChange(normalizeWord(event.target.value))}
          maxLength={MAX_CHARS}
          className="field-input display text-[28px] tracking-wide"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          enterKeyHint="done"
          aria-describedby="wordmark-limit"
        />
      </label>
      <p id="wordmark-limit" className="text-[13px] text-muted">
        {word.length}/{MAX_CHARS}
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
        {SAMPLES.map((sample) => (
          <button
            key={sample}
            type="button"
            onClick={() => onChange(sample)}
            className={`italic transition-opacity ${word === sample ? "opacity-100" : "opacity-40 hover:opacity-80"}`}
          >
            {sample}
          </button>
        ))}
      </div>
    </div>
  );
}
