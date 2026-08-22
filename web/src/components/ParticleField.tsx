"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import {
  particleizePage,
  type ParticleWordmarkInstance,
} from "./particle/particle-wordmark";

type ParticleFieldApi = {
  setText: (text: string) => void;
};

const ParticleFieldContext = createContext<ParticleFieldApi | null>(null);

export function useParticleField() {
  return useContext(ParticleFieldContext);
}

const WORDS: Record<string, string> = {
  "/": "IMPERIUM",
  "/crm": "FINTI",
  "/playground": "LAB",
  "/playground/compass": "COMPASS",
  "/playground/mist": "MIST",
  "/playground/typeforge": "TYPE",
  "/playground/wordmark": "IMPERIUM",
  "*": "IMPERIUM",
};

/**
 * Site-wide particle field. Identity only — behavior is the engine defaults.
 * particleizePage mounts the canvas, resolves font vars, and raises text above it.
 */
export function ParticleField({ children }: { children: ReactNode }) {
  const instanceRef = useRef<ParticleWordmarkInstance | null>(null);

  useEffect(() => {
    const field = particleizePage({
      words: WORDS,
      fontFamily: "var(--font-display), Georgia, 'Times New Roman', serif",
      fontWeight: 600,
      colors: ["#C9A227", "#E0C35A", "#9A9588"],
      opacity: 0.8,
    });
    instanceRef.current = field;
    return () => {
      field.destroy();
      instanceRef.current = null;
    };
  }, []);

  const api = useMemo<ParticleFieldApi>(
    () => ({
      setText: (text) => {
        instanceRef.current?.setText(text);
      },
    }),
    [],
  );

  return (
    <ParticleFieldContext.Provider value={api}>
      {children}
    </ParticleFieldContext.Provider>
  );
}
