"use client";

import { useEffect, useRef, type RefObject } from "react";

type PointHandler = (clientX: number, clientY: number) => void;

/**
 * Mouse: tracks across the window.
 * Touch/pen: drag on `surface` with pointer capture (no scroll fight).
 */
export function usePointerAim(
  surfaceRef: RefObject<HTMLElement | null>,
  onAim: PointHandler,
) {
  const onAimRef = useRef(onAim);
  onAimRef.current = onAim;

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const aim = (clientX: number, clientY: number) => {
      onAimRef.current(clientX, clientY);
    };

    const onWindowMove = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        aim(event.clientX, event.clientY);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      event.preventDefault();
      surface.setPointerCapture(event.pointerId);
      aim(event.clientX, event.clientY);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      if (!surface.hasPointerCapture(event.pointerId)) return;
      event.preventDefault();
      aim(event.clientX, event.clientY);
    };

    const onPointerUp = (event: PointerEvent) => {
      if (surface.hasPointerCapture(event.pointerId)) {
        surface.releasePointerCapture(event.pointerId);
      }
    };

    window.addEventListener("pointermove", onWindowMove, { passive: true });
    surface.addEventListener("pointerdown", onPointerDown, { passive: false });
    surface.addEventListener("pointermove", onPointerMove, { passive: false });
    surface.addEventListener("pointerup", onPointerUp);
    surface.addEventListener("pointercancel", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onWindowMove);
      surface.removeEventListener("pointerdown", onPointerDown);
      surface.removeEventListener("pointermove", onPointerMove);
      surface.removeEventListener("pointerup", onPointerUp);
      surface.removeEventListener("pointercancel", onPointerUp);
    };
  }, [surfaceRef]);
}
