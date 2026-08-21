"use client";

import { useRef } from "react";
import { MountainBackdrop } from "./MountainBackdrop";
import { usePointerAim } from "@/hooks/usePointerAim";

export function MistCanvas() {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  usePointerAim(surfaceRef, (clientX, clientY) => {
    if (!layerRef.current || !surfaceRef.current) return;
    const rect = surfaceRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * 28;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 16;
    layerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });

  return (
    <div
      ref={surfaceRef}
      className="relative h-[420px] cursor-grab overflow-hidden rounded-sm border border-forest/15 bg-forest-deep active:cursor-grabbing sm:h-[520px]"
      style={{ touchAction: "none" }}
      role="img"
      aria-label="Interactive mountain mist. Drag to shift the ridgelines."
    >
      <div
        ref={layerRef}
        className="absolute inset-[-8%] transition-transform duration-200 ease-out will-change-transform"
      >
        <MountainBackdrop className="opacity-100" interactive />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(15,42,31,0.45)_100%)]" />
      <p className="pointer-events-none absolute bottom-5 left-5 right-5 text-sm text-field/80">
        Drag across the range — mist and ridgelines drift with you.
      </p>
    </div>
  );
}
