"use client";

import { useState } from "react";

const samples = [
  "Chart the frontier.",
  "Built for the climb.",
  "Where craft meets expedition.",
];

export function Typeforge() {
  const [text, setText] = useState(samples[0]);
  const [tracking, setTracking] = useState(0.08);
  const [size, setSize] = useState(56);

  return (
    <div className="space-y-8">
      <div className="min-h-[180px] border-y border-forest/15 py-10">
        <p
          className="display text-forest leading-[1.05]"
          style={{ fontSize: `${size}px`, letterSpacing: `${tracking}em` }}
        >
          {text || "Type something bold."}
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2 text-sm text-muted">
          Headline
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="w-full border border-forest/20 bg-field px-3 py-2 text-ink outline-none transition focus:border-gold"
          />
        </label>
        <div className="flex flex-wrap gap-2 self-end">
          {samples.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => setText(sample)}
              className="border border-forest/20 px-3 py-1.5 text-xs tracking-wide text-muted transition hover:border-gold hover:text-forest"
            >
              {sample}
            </button>
          ))}
        </div>
        <label className="block space-y-2 text-sm text-muted">
          Size · {size}px
          <input
            type="range"
            min={32}
            max={88}
            value={size}
            onChange={(event) => setSize(Number(event.target.value))}
            className="w-full accent-gold"
          />
        </label>
        <label className="block space-y-2 text-sm text-muted">
          Tracking · {tracking.toFixed(2)}em
          <input
            type="range"
            min={0}
            max={0.28}
            step={0.01}
            value={tracking}
            onChange={(event) => setTracking(Number(event.target.value))}
            className="w-full accent-gold"
          />
        </label>
      </div>
    </div>
  );
}
