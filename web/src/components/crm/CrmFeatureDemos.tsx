"use client";

import { useEffect, useState } from "react";
import type { PillarKey } from "@/lib/crm-features";

function useCountUp(target: number, active: boolean, durationMs = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      frame = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(frame);
    }

    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, durationMs, target]);

  return value;
}

function useDemoActive() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setActive(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return active;
}

export function FindScoreDemo() {
  const active = useDemoActive();
  const score = useCountUp(86, active);
  const factors = [
    { label: "Volume fit", value: 92 },
    { label: "Payment mix", value: 81 },
    { label: "Timing", value: 74 },
    { label: "Territory", value: 88 },
  ];

  return (
    <div className="overflow-hidden border border-forest/15 bg-field-warm/60">
      <div className="flex items-center justify-between border-b border-forest/10 px-4 py-3">
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted">
          Finti Score · explainable
        </span>
        <span className="text-[10px] tracking-[0.16em] uppercase text-gold">Live calc</span>
      </div>
      <div className="grid gap-6 p-5 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="relative mx-auto grid h-36 w-36 place-items-center">
          <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="currentColor"
              className="text-forest/10"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="currentColor"
              className="text-gold score-ring"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 314} 314`}
            />
          </svg>
          <div className="relative text-center">
            <p className="display text-4xl leading-none text-forest">{score}</p>
            <p className="mt-1 text-[9px] tracking-[0.16em] uppercase text-muted">Score</p>
          </div>
        </div>
        <ul className="space-y-3">
          {factors.map((factor, index) => (
            <li key={factor.label}>
              <div className="mb-1 flex justify-between text-[11px]">
                <span className="text-ink">{factor.label}</span>
                <span className="text-gold">{factor.value}</span>
              </div>
              <div className="h-1.5 overflow-hidden bg-forest/10">
                <div
                  className="h-full bg-forest-mid bar-fill"
                  style={{
                    width: active ? `${factor.value}%` : "0%",
                    transitionDelay: `${120 + index * 90}ms`,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ClosePipelineDemo() {
  const stages = [
    { name: "Prospect", cards: ["Northwind Café", "Harbor Goods"] },
    { name: "Research", cards: ["Maple Retail"] },
    { name: "Demo", cards: ["Cedar Supply", "Oak & Iron"] },
    { name: "Signed", cards: ["Summit Mart"] },
  ];

  return (
    <div className="overflow-hidden border border-forest/15 bg-forest-deep text-field">
      <div className="flex items-center justify-between border-b border-field/10 px-4 py-3">
        <span className="text-[10px] tracking-[0.2em] uppercase text-field/65">
          Pipeline · Close
        </span>
        <span className="gold-pulse inline-block h-2 w-2 rounded-full bg-gold" />
      </div>
      <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4">
        {stages.map((stage, stageIndex) => (
          <div key={stage.name} className="min-w-0">
            <div className="mb-2 flex items-center justify-between gap-1">
              <span className="truncate text-[9px] tracking-[0.1em] uppercase text-field/60">
                {stage.name}
              </span>
              <span className="text-[9px] text-gold-soft">{stage.cards.length}</span>
            </div>
            <div className="space-y-1.5 rounded-sm bg-field/10 p-1.5">
              {stage.cards.map((card, cardIndex) => (
                <div
                  key={card}
                  className="pipeline-card rounded-sm bg-field/95 px-2 py-2 text-[10px] leading-tight text-forest"
                  style={{
                    animationDelay: `${stageIndex * 0.2 + cardIndex * 0.35}s`,
                  }}
                >
                  {card}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GrowHealthDemo() {
  const active = useDemoActive();
  const health = useCountUp(72, active);
  const drivers = [
    { label: "Utilization", delta: "+6" },
    { label: "Payment consistency", delta: "+4" },
    { label: "Support load", delta: "−2" },
    { label: "Expansion signal", delta: "+8" },
  ];

  return (
    <div className="overflow-hidden border border-forest/15 bg-field-warm/60">
      <div className="flex items-center justify-between border-b border-forest/10 px-4 py-3">
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted">
          Merchant Health
        </span>
        <span className="text-[10px] tracking-[0.16em] uppercase text-gold">Explainable</span>
      </div>
      <div className="p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="display text-5xl leading-none text-forest">{health}</p>
            <p className="mt-2 text-xs text-muted">Health index · this month</p>
          </div>
          <div className="health-wave relative h-16 w-40 overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-forest-mid/35 to-transparent" />
            <svg viewBox="0 0 160 64" className="absolute inset-0 h-full w-full text-forest-mid">
              <path
                d="M0 48 C20 40 30 20 50 28 C70 36 80 12 100 22 C120 32 130 18 160 24 L160 64 L0 64 Z"
                fill="currentColor"
                opacity="0.35"
                className="health-fill"
              />
            </svg>
          </div>
        </div>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {drivers.map((driver, index) => (
            <li
              key={driver.label}
              className="flex items-center justify-between border border-forest/10 bg-field/70 px-3 py-2 text-xs"
              style={{
                animation: active
                  ? `rise-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${0.1 + index * 0.08}s both`
                  : undefined,
              }}
            >
              <span className="text-ink">{driver.label}</span>
              <span className="display text-sm text-gold">{driver.delta}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function WinForecastDemo() {
  const layers = [
    { label: "Actual", value: "$28.4k", width: "42%", tone: "bg-forest" },
    { label: "Projected", value: "$19.1k", width: "28%", tone: "bg-forest-mid" },
    { label: "Pipeline", value: "$31.6k", width: "46%", tone: "bg-gold" },
  ];
  const active = useDemoActive();

  return (
    <div className="overflow-hidden border border-forest/15 bg-forest text-field">
      <div className="flex items-center justify-between border-b border-field/10 px-4 py-3">
        <span className="text-[10px] tracking-[0.2em] uppercase text-field/65">
          Commission · Win
        </span>
        <span className="text-[10px] tracking-[0.14em] uppercase text-gold-soft">
          Provenance on
        </span>
      </div>
      <div className="space-y-4 p-5">
        {layers.map((layer, index) => (
          <div key={layer.label}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="tracking-[0.12em] uppercase text-field/70">{layer.label}</span>
              <span className="display text-base text-field">{layer.value}</span>
            </div>
            <div className="h-2.5 overflow-hidden bg-field/10">
              <div
                className={`h-full ${layer.tone} bar-fill`}
                style={{
                  width: active ? layer.width : "0%",
                  transitionDelay: `${150 + index * 120}ms`,
                }}
              />
            </div>
            <p className="mt-1 text-[9px] tracking-[0.14em] uppercase text-gold-soft/80">
              {layer.label === "Actual"
                ? "Verified"
                : layer.label === "Projected"
                  ? "Estimated"
                  : "Signed · Pipeline"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PillarDemo({ pillar }: { pillar: PillarKey }) {
  switch (pillar) {
    case "find":
      return <FindScoreDemo />;
    case "close":
      return <ClosePipelineDemo />;
    case "grow":
      return <GrowHealthDemo />;
    case "win":
      return <WinForecastDemo />;
  }
}
