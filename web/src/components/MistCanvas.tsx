"use client";

import { useEffect, useRef } from "react";
import { MountainBackdrop } from "./MountainBackdrop";

export function MistCanvas() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!layerRef.current) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 24;
      const y = (event.clientY / window.innerHeight - 0.5) * 12;
      layerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="relative h-[420px] overflow-hidden rounded-sm border border-forest/15 bg-forest-deep sm:h-[520px]">
      <div ref={layerRef} className="absolute inset-[-8%] transition-transform duration-300 ease-out">
        <MountainBackdrop className="opacity-100" interactive />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(15,42,31,0.45)_100%)]" />
      <p className="absolute bottom-5 left-5 right-5 text-sm text-field/80">
        Move your pointer — mist and ridgelines drift with you.
      </p>
    </div>
  );
}
