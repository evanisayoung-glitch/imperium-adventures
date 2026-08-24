"use client";

import { useRef } from "react";

export function SilkCloth({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const fold = useRef<HTMLDivElement>(null);

  const paint = (clientX: number, clientY: number) => {
    const node = host.current;
    if (!node || !fold.current) return;
    const rect = node.getBoundingClientRect();
    const x = ((clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 36;
    const y = ((clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 24;
    fold.current.style.transform = `translate3d(${x}%, ${y}%, 0) scale(1.12)`;
  };

  return (
    <div
      ref={host}
      className={`absolute inset-0 overflow-hidden ${className ?? ""}`}
      onPointerMove={(event) => paint(event.clientX, event.clientY)}
      onPointerDown={(event) => paint(event.clientX, event.clientY)}
      role="application"
      aria-label="Move across the cloth. The light changes."
    >
      <div
        ref={fold}
        className="silk-fold absolute inset-[-20%]"
        style={{
          background: `
            conic-gradient(from 210deg at 40% 45%,
              #1b3a4a 0deg,
              #c45c7a 55deg,
              #e8c36a 110deg,
              #2f6f62 165deg,
              #4c6ef5 220deg,
              #9b4dca 275deg,
              #e07a3d 320deg,
              #1b3a4a 360deg),
            repeating-linear-gradient(118deg,
              transparent 0 14px,
              rgba(255,255,255,0.07) 14px 16px)
          `,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/35 via-transparent to-void/45" />
    </div>
  );
}
