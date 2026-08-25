"use client";

import { useEffect, useRef } from "react";

const DOTS = 12;

export function LightTrail() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = host.current;
    if (!root) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.body.classList.add("has-light-trail");
    const nodes = [...root.children] as HTMLElement[];
    const points = nodes.map(() => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }));
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      mx = event.clientX;
      my = event.clientY;
    };

    const tick = () => {
      let x = mx;
      let y = my;
      const t = performance.now() / 28;
      nodes.forEach((node, index) => {
        const point = points[index]!;
        const ease = 0.38 - index * 0.022;
        point.x += (x - point.x) * ease;
        point.y += (y - point.y) * ease;
        const hue = (index * 30 + t) % 360;
        node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
        node.style.background = `hsl(${hue} 92% 62%)`;
        x = point.x;
        y = point.y;
      });
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.body.classList.remove("has-light-trail");
    };
  }, []);

  return (
    <div
      ref={host}
      className="pointer-events-none fixed inset-0 z-[60] hidden mix-blend-screen md:block"
      aria-hidden
    >
      {Array.from({ length: DOTS }, (_, index) => (
        <span
          key={index}
          className="absolute left-0 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ opacity: 1 - index * 0.07, filter: "blur(0.4px)" }}
        />
      ))}
    </div>
  );
}
