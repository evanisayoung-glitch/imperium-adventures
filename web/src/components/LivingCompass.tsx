"use client";

import { useRef } from "react";
import { usePointerAim } from "@/hooks/usePointerAim";

export function LivingCompass({ size = 280 }: { size?: number }) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<SVGGElement>(null);
  const frame = useRef(0);
  const target = useRef(0);
  const current = useRef(0);
  const running = useRef(false);

  const ensureTick = () => {
    if (running.current) return;
    running.current = true;
    const tick = () => {
      const delta = ((target.current - current.current + 540) % 360) - 180;
      current.current += delta * 0.08;
      if (needleRef.current) {
        needleRef.current.setAttribute(
          "transform",
          `rotate(${current.current} 100 100)`,
        );
      }
      if (Math.abs(delta) > 0.05) {
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
      className="select-none"
      style={{ width: size, height: size, touchAction: "none" }}
      role="img"
      aria-label="Interactive Imperium compass. Drag on touchscreens; move the pointer on desktop."
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className="drop-shadow-[0_18px_40px_rgba(15,42,31,0.35)] pointer-events-none"
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
        <g ref={needleRef} className="needle-intro" style={{ transformOrigin: "100px 100px" }}>
          <polygon points="100,42 108,108 100,118 92,108" fill="#1b4332" />
          <polygon points="100,158 108,108 100,98 92,108" fill="#c9a227" />
          <circle cx="100" cy="100" r="7" fill="#c9a227" stroke="#1b4332" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}
