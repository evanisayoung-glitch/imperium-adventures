"use client";

import { useCallback, useEffect, useRef } from "react";

type Offset = { x: number; y: number };

export function MistCanvas({
  className,
  hideCaption = false,
}: {
  className?: string;
  hideCaption?: boolean;
}) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const mistRef = useRef<HTMLDivElement>(null);
  const offset = useRef<Offset>({ x: 0, y: 0 });
  const drag = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    pointerId: number | null;
  }>({
    active: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    pointerId: null,
  });

  const paint = useCallback((x: number, y: number) => {
    const clampedX = Math.max(-1, Math.min(1, x));
    const clampedY = Math.max(-1, Math.min(1, y));
    offset.current = { x: clampedX, y: clampedY };

    if (mistRef.current) {
      mistRef.current.style.transform = `translate3d(${clampedX * 120}px, ${clampedY * 48}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const begin = (clientX: number, clientY: number, pointerId: number | null) => {
      drag.current = {
        active: true,
        startX: clientX,
        startY: clientY,
        originX: offset.current.x,
        originY: offset.current.y,
        pointerId,
      };
      surface.classList.add("is-dragging");
    };

    const move = (clientX: number, clientY: number) => {
      if (!drag.current.active) return;
      const rect = surface.getBoundingClientRect();
      const dx = (clientX - drag.current.startX) / Math.max(rect.width, 1);
      const dy = (clientY - drag.current.startY) / Math.max(rect.height, 1);
      paint(drag.current.originX + dx * 2.4, drag.current.originY + dy * 2.4);
    };

    const end = () => {
      drag.current.active = false;
      drag.current.pointerId = null;
      surface.classList.remove("is-dragging");
    };

    const onPointerDown = (event: PointerEvent) => {
      begin(event.clientX, event.clientY, event.pointerId);
      try {
        surface.setPointerCapture(event.pointerId);
      } catch {
        /* ignore */
      }
      event.preventDefault();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!drag.current.active) return;
      if (
        drag.current.pointerId !== null &&
        event.pointerId !== drag.current.pointerId
      ) {
        return;
      }
      move(event.clientX, event.clientY);
      event.preventDefault();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (
        drag.current.pointerId !== null &&
        event.pointerId !== drag.current.pointerId
      ) {
        return;
      }
      if (drag.current.pointerId !== null) {
        try {
          surface.releasePointerCapture(drag.current.pointerId);
        } catch {
          /* ignore */
        }
      }
      end();
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 0) return;
      const touch = event.touches[0];
      begin(touch.clientX, touch.clientY, null);
      event.preventDefault();
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!drag.current.active || event.touches.length === 0) return;
      const touch = event.touches[0];
      move(touch.clientX, touch.clientY);
      event.preventDefault();
    };

    const onTouchEnd = () => end();

    surface.addEventListener("pointerdown", onPointerDown, { passive: false });
    surface.addEventListener("pointermove", onPointerMove, { passive: false });
    surface.addEventListener("pointerup", onPointerUp);
    surface.addEventListener("pointercancel", onPointerUp);
    surface.addEventListener("touchstart", onTouchStart, { passive: false });
    surface.addEventListener("touchmove", onTouchMove, { passive: false });
    surface.addEventListener("touchend", onTouchEnd);
    surface.addEventListener("touchcancel", onTouchEnd);

    return () => {
      surface.removeEventListener("pointerdown", onPointerDown);
      surface.removeEventListener("pointermove", onPointerMove);
      surface.removeEventListener("pointerup", onPointerUp);
      surface.removeEventListener("pointercancel", onPointerUp);
      surface.removeEventListener("touchstart", onTouchStart);
      surface.removeEventListener("touchmove", onTouchMove);
      surface.removeEventListener("touchend", onTouchEnd);
      surface.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [paint]);

  return (
    <div
      ref={surfaceRef}
      className={`interactive-surface relative overflow-hidden bg-[#0f2a1f] ${
        className ?? "h-[420px] rounded-sm border border-forest/15 sm:h-[520px]"
      }`}
      style={{
        touchAction: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
      role="application"
      aria-label="Interactive mountain mist. Press and drag to move the mist; mountains stay fixed."
    >
      {/* Mountains stay put */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 720"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="mistFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3d7a5f" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#1b4332" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="mistNear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2d6a4f" />
              <stop offset="100%" stopColor="#0f2a1f" />
            </linearGradient>
          </defs>
          <rect width="1440" height="720" fill="#0f2a1f" />
          <path
            d="M0 480 L160 340 L300 410 L460 260 L620 390 L780 230 L940 370 L1100 280 L1280 400 L1440 320 L1440 720 L0 720 Z"
            fill="url(#mistFar)"
          />
          <path
            d="M0 560 L200 400 L340 480 L500 320 L660 450 L820 290 L980 440 L1140 350 L1320 470 L1440 410 L1440 720 L0 720 Z"
            fill="url(#mistNear)"
          />
          <path
            d="M820 290 L844 332 L820 324 L796 338 Z"
            fill="#f7f4ec"
            opacity="0.9"
          />
          <g fill="#0a1f17" opacity="0.95">
            <path d="M160 560 L195 470 L230 560 Z" />
            <path d="M220 560 L260 450 L300 560 Z" />
            <path d="M1120 540 L1160 440 L1200 540 Z" />
            <path d="M1185 540 L1220 470 L1255 540 Z" />
          </g>
        </svg>
      </div>

      {/* Only mist drifts */}
      <div
        ref={mistRef}
        className="pointer-events-none absolute inset-[-24%] will-change-transform"
        aria-hidden
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 720"
          preserveAspectRatio="xMidYMid slice"
        >
          <g fill="#f7f4ec">
            <ellipse cx="260" cy="250" rx="260" ry="70" opacity="0.22" />
            <ellipse cx="720" cy="200" rx="300" ry="80" opacity="0.18" />
            <ellipse cx="1180" cy="280" rx="280" ry="75" opacity="0.2" />
            <ellipse cx="480" cy="360" rx="220" ry="55" opacity="0.14" />
            <ellipse cx="980" cy="390" rx="240" ry="60" opacity="0.16" />
          </g>
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(15,42,31,0.55)_100%)]" />

      {hideCaption ? null : (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f2a1f] via-[#0f2a1f]/70 to-transparent px-5 pb-5 pt-16">
          <p className="text-sm text-field/85">
            Press and drag — mountains stay put; only the mist drifts.
          </p>
        </div>
      )}
    </div>
  );
}
