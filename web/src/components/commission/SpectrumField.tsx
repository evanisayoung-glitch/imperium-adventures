"use client";

import { useCallback, useRef } from "react";

const NAMES = [
  "Rose",
  "Coral",
  "Saffron",
  "Gold",
  "Lime",
  "Jade",
  "Teal",
  "Azure",
  "Indigo",
  "Violet",
  "Orchid",
  "Magenta",
] as const;

const SPECTRUM =
  "linear-gradient(90deg, #ff3b5c 0%, #ff7a3c 9%, #ffd12a 18%, #c9a227 27%, #7dce4a 36%, #1b8a5c 45%, #14b8a6 54%, #3b82f6 63%, #4f46e5 72%, #7c3aed 81%, #db2777 90%, #ff3b5c 100%)";

function nameForHue(hue: number) {
  const index = Math.round(((hue % 360) / 360) * (NAMES.length - 1));
  return NAMES[Math.min(NAMES.length - 1, Math.max(0, index))]!;
}

function hourHue() {
  return (new Date().getHours() / 24) * 360;
}

export function SpectrumField({
  word = "YOURS",
  className,
}: {
  word?: string;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const bloom = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLParagraphElement>(null);
  const mark = useRef<HTMLParagraphElement>(null);
  const startHue = hourHue();

  const paint = useCallback((clientX: number, clientY: number) => {
    const node = host.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (clientX - rect.left) / Math.max(rect.width, 1);
    const y = (clientY - rect.top) / Math.max(rect.height, 1);
    const hue = Math.min(359, Math.max(0, x * 360));
    node.style.setProperty("--hue", String(hue));
    if (bloom.current) {
      bloom.current.style.left = `${x * 100}%`;
      bloom.current.style.top = `${y * 100}%`;
    }
    if (name.current) name.current.textContent = nameForHue(hue);
    if (mark.current) {
      mark.current.style.color = `hsl(${hue} 100% 97%)`;
      mark.current.style.textShadow = `0 0 48px hsl(${hue} 90% 55% / 0.55)`;
    }
  }, []);

  return (
    <div
      ref={host}
      className={`absolute inset-0 overflow-hidden ${className ?? ""}`}
      style={{ background: SPECTRUM, ["--hue" as string]: startHue }}
      onPointerMove={(event) => paint(event.clientX, event.clientY)}
      onPointerDown={(event) => paint(event.clientX, event.clientY)}
      role="application"
      aria-label="Move across the colors. The house follows."
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,6,5,0.18), transparent 35%, rgba(5,6,5,0.28))",
        }}
      />
      <div
        ref={bloom}
        className="spectrum-bloom pointer-events-none absolute h-[42vmin] w-[42vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: "58%",
          top: "46%",
          background:
            "radial-gradient(circle, hsl(var(--hue) 95% 72%) 0%, hsl(var(--hue) 80% 50% / 0.35) 42%, transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p
          ref={name}
          className="mono text-[11px] tracking-[0.32em] uppercase text-white/80"
        >
          {nameForHue(startHue)}
        </p>
        <p
          ref={mark}
          className="display mt-4 text-[clamp(3.4rem,12vw,8.5rem)] leading-none tracking-tight"
          style={{
            color: `hsl(${startHue} 100% 97%)`,
            textShadow: `0 0 48px hsl(${startHue} 90% 55% / 0.55)`,
          }}
        >
          {word || "YOURS"}
        </p>
      </div>
    </div>
  );
}
