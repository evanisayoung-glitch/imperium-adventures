"use client";

import { useEffect } from "react";
import { particleizePage } from "./particle/particle-wordmark";

/**
 * Site-wide particle field. Identity only — behavior is the engine defaults.
 * particleizePage mounts the canvas, resolves font vars, and raises text above it.
 */
export function ParticleField() {
  useEffect(() => {
    const field = particleizePage({
      words: {
        "/": "IMPERIUM",
        "/crm": "FINTI",
        "/playground": "LAB",
        "/playground/compass": "COMPASS",
        "/playground/mist": "MIST",
        "/playground/typeforge": "TYPE",
        "*": "IMPERIUM",
      },
      fontFamily: "var(--font-display), Georgia, 'Times New Roman', serif",
      fontWeight: 600,
      colors: ["#C9A227", "#E0C35A", "#9A9588"],
      opacity: 0.8,
    });
    return () => field.destroy();
  }, []);

  return null;
}
