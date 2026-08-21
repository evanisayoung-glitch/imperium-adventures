"use client";

import { useEffect, useRef } from "react";
import { usePointerAim } from "@/hooks/usePointerAim";

export function LivingCompass({ size = 280 }: { size?: number }) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<SVGGElement>(null);
  const frame = useRef(0);
  const target = useRef(0);
  const current = useRef(-18);
  const running = useRef(false);

  const paint = (angle: number) => {
    if (needleRef.current) {
      // SVG attribute transform — reliable on iOS Safari (unlike CSS transform on <g>).
      needleRef.current.setAttribute("transform", `rotate(${angle} 100 100)`);
    }
  };

  useEffect(() => {
    const start = performance.now();
    const from = -18;
    const intro = (now: number) => {
      const t = Math.min(1, (now - start) / 900);
      const eased = 1 - Math.pow(1 - t, 3);
      current.current = from + (0 - from) * eased;
      paint(current.current);
      if (t < 1) frame.current = requestAnimationFrame(intro);
    };
    frame.current = requestAnimationFrame(intro);
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const ensureTick = () => {
    if (running.current) return;
    running.current = true;
    const tick = () => {
      const delta = ((target.current - current.current + 540) % 360) - 180;
      current.current += delta * 0.14;
      paint(current.current);
      if (Math.abs(delta) > 0.08) {
        frame.current = requestAnimationFrame(tick);
      } else {
        running.current = false;
      }
    };
    frame.current = requestAnimationFrame(tick);
  };

  usePointerAim(surfaceRef, (clientX, clientY) => {
    const el = surfaceRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    target.current =
      (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI + 90;
    ensureTick();
  });

  return (
    <div
      ref={surfaceRef}
      className="interactive-surface relative select-none rounded-full"
      style={{
        width: size,
        height: size,
        touchAction: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
      role="application"
      aria-label="Interactive Imperium compass. Drag with your finger or move the pointer."
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className="pointer-events-none drop-shadow-[0_18px_40px_rgba(15,42,31,0.35)]"
        aria-hidden
      >
        <circle cx="100" cy="100" r="92" fill="#f7f4ec" stroke="#1b4332" strokeWidth="6" />
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="#1b4332"
          strokeWidth="1.5"
          strokeDasharray="3 7"
        />
        <g fill="#c9a227">
          <polygon points="100,28 106,88 100,96 94,88" />
          <polygon points="100,172 106,112 100,104 94,112" />
          <polygon points="28,100 88,94 96,100 88,106" />
          <polygon points="172,100 112,94 104,100 112,106" />
        </g>
        <g ref={needleRef} transform="rotate(-18 100 100)">
          <polygon points="100,42 108,108 100,118 92,108" fill="#1b4332" />
          <polygon points="100,158 108,108 100,98 92,108" fill="#c9a227" />
          <circle cx="100" cy="100" r="7" fill="#c9a227" stroke="#1b4332" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}
