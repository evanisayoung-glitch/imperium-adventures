"use client";

import { useEffect, useRef } from "react";

export function LivingCompass({ size = 280 }: { size?: number }) {
  const needleRef = useRef<SVGGElement>(null);
  const frame = useRef(0);
  const target = useRef(0);
  const current = useRef(0);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const el = needleRef.current?.ownerSVGElement;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      target.current =
        (Math.atan2(event.clientY - cy, event.clientX - cx) * 180) / Math.PI + 90;
    };

    const tick = () => {
      const delta = ((target.current - current.current + 540) % 360) - 180;
      current.current += delta * 0.08;
      if (needleRef.current) {
        needleRef.current.setAttribute(
          "transform",
          `rotate(${current.current} 100 100)`,
        );
      }
      frame.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    frame.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="Interactive Imperium compass"
      className="drop-shadow-[0_18px_40px_rgba(15,42,31,0.35)]"
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
  );
}
