"use client";

import { useEffect, useRef, type RefObject } from "react";

type PointHandler = (clientX: number, clientY: number) => void;

/**
 * Unified pointer + touch aiming for interactive surfaces.
 * - Mouse: follows across the window (and while dragging the surface)
 * - Touch/pen: drag on the surface with capture + native touch fallbacks
 */
export function usePointerAim(
  surfaceRef: RefObject<HTMLElement | null>,
  onAim: PointHandler,
) {
  const onAimRef = useRef(onAim);

  useEffect(() => {
    onAimRef.current = onAim;
  }, [onAim]);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    let dragging = false;

    const aim = (clientX: number, clientY: number) => {
      onAimRef.current(clientX, clientY);
    };

    const onWindowPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        aim(event.clientX, event.clientY);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      surface.classList.add("is-dragging");
      try {
        surface.setPointerCapture(event.pointerId);
      } catch {
        // Older WebViews may reject capture; touch listeners still cover us.
      }
      aim(event.clientX, event.clientY);
      if (event.pointerType !== "mouse") {
        event.preventDefault();
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging && event.pointerType !== "mouse") return;
      if (event.pointerType !== "mouse" && !dragging) return;
      if (dragging || surface.hasPointerCapture?.(event.pointerId)) {
        aim(event.clientX, event.clientY);
        if (event.pointerType !== "mouse") event.preventDefault();
      }
    };

    const endDrag = (event?: PointerEvent) => {
      dragging = false;
      surface.classList.remove("is-dragging");
      if (event && surface.hasPointerCapture?.(event.pointerId)) {
        try {
          surface.releasePointerCapture(event.pointerId);
        } catch {
          /* ignore */
        }
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 0) return;
      dragging = true;
      surface.classList.add("is-dragging");
      const touch = event.touches[0];
      aim(touch.clientX, touch.clientY);
      event.preventDefault();
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!dragging || event.touches.length === 0) return;
      const touch = event.touches[0];
      aim(touch.clientX, touch.clientY);
      event.preventDefault();
    };

    const onTouchEnd = () => {
      dragging = false;
      surface.classList.remove("is-dragging");
    };

    const onLostCapture = () => {
      endDrag();
    };

    window.addEventListener("pointermove", onWindowPointerMove, { passive: true });
    surface.addEventListener("pointerdown", onPointerDown, { passive: false });
    surface.addEventListener("pointermove", onPointerMove, { passive: false });
    surface.addEventListener("pointerup", endDrag);
    surface.addEventListener("pointercancel", endDrag);
    surface.addEventListener("lostpointercapture", onLostCapture);
    surface.addEventListener("touchstart", onTouchStart, { passive: false });
    surface.addEventListener("touchmove", onTouchMove, { passive: false });
    surface.addEventListener("touchend", onTouchEnd);
    surface.addEventListener("touchcancel", onTouchEnd);

    return () => {
      window.removeEventListener("pointermove", onWindowPointerMove);
      surface.removeEventListener("pointerdown", onPointerDown);
      surface.removeEventListener("pointermove", onPointerMove);
      surface.removeEventListener("pointerup", endDrag);
      surface.removeEventListener("pointercancel", endDrag);
      surface.removeEventListener("lostpointercapture", onLostCapture);
      surface.removeEventListener("touchstart", onTouchStart);
      surface.removeEventListener("touchmove", onTouchMove);
      surface.removeEventListener("touchend", onTouchEnd);
      surface.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [surfaceRef]);
}
