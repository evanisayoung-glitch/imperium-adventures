"use client";

import { useEffect, useRef } from "react";
import { createParticleWordmark, type ParticleWordmarkInstance } from "@/components/particle/particle-wordmark";

export function ParticleStage({
  word,
  className,
}: {
  word: string;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const field = useRef<ParticleWordmarkInstance | null>(null);

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const instance = createParticleWordmark(node, {
      text: word || "IMPERIUM",
      fontFamily: "var(--font-display), 'Times New Roman', serif",
      fontWeight: 500,
      colors: ["#C9A227", "#E0C35A", "#8A8373"],
      opacity: 0.84,
      pauseWhenOffscreen: true,
      background: "#050605",
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
  }, [word]);

  return (
    <div
      ref={host}
      className={`absolute inset-0 overflow-hidden bg-void ${className ?? ""}`}
      aria-label="Open field. Scrub or tap here to form the word."
    />
  );
}
