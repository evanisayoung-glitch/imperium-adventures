"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { generateRevealMarks, paintReveal } from "@/lib/paint-reveal";
import {
  curatedPaintings,
  imageProxyUrl,
  pickPaintingForDay,
  type MetPainting,
} from "@/lib/met-paintings";

const STROKE_COUNT = 1400;
const COVER_COLOR = "#e8e0d0";
const DEFAULT_DURATION = 16_000;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PaintingReveal({
  className,
  duration = DEFAULT_DURATION,
  auto = true,
  showPlaque = true,
}: {
  className?: string;
  duration?: number;
  auto?: boolean;
  showPlaque?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const paintingRef = useRef<HTMLCanvasElement>(null);
  const coverRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const marksRef = useRef<ReturnType<typeof generateRevealMarks>>([]);
  const progressRef = useRef(0);
  const startedRef = useRef(false);

  const [painting, setPainting] = useState<MetPainting>(() => pickPaintingForDay());
  const [imageReady, setImageReady] = useState(false);
  const [complete, setComplete] = useState(false);

  const redraw = useCallback((progress: number) => {
    const paintingCanvas = paintingRef.current;
    const coverCanvas = coverRef.current;
    const image = imageRef.current;
    if (!paintingCanvas || !coverCanvas) return;

    const ctx = paintingCanvas.getContext("2d");
    const coverCtx = coverCanvas.getContext("2d");
    if (!ctx || !coverCtx) return;

    const { width, height } = paintingCanvas;
    ctx.clearRect(0, 0, width, height);
    if (image) {
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawW = image.naturalWidth * scale;
      const drawH = image.naturalHeight * scale;
      ctx.drawImage(image, (width - drawW) / 2, (height - drawH) / 2, drawW, drawH);
    } else {
      ctx.fillStyle = COVER_COLOR;
      ctx.fillRect(0, 0, width, height);
    }
    paintReveal(coverCtx, marksRef.current, progress, COVER_COLOR);
  }, []);

  const resize = useCallback(() => {
    const paintingCanvas = paintingRef.current;
    const coverCanvas = coverRef.current;
    const container = hostRef.current;
    if (!paintingCanvas || !coverCanvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));

    for (const canvas of [paintingCanvas, coverCanvas]) {
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }

    marksRef.current = generateRevealMarks(w, h, STROKE_COUNT, painting.objectId);
    redraw(progressRef.current);
  }, [painting.objectId, redraw]);

  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      if (cancelled) return;
      imageRef.current = image;
      setImageReady(true);
    };
    image.onerror = () => {
      if (cancelled) return;
      imageRef.current = null;
      setImageReady(false);
    };
    image.src = imageProxyUrl(painting.objectId);
    return () => {
      cancelled = true;
    };
  }, [painting.objectId]);

  useEffect(() => {
    resize();
    const observer = new ResizeObserver(() => resize());
    if (hostRef.current) observer.observe(hostRef.current);
    return () => observer.disconnect();
  }, [resize]);

  useEffect(() => {
    if (imageReady) redraw(progressRef.current);
  }, [imageReady, redraw]);

  useEffect(() => {
    const node = hostRef.current;
    if (!node || !auto) return;

    const play = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      if (prefersReducedMotion()) {
        progressRef.current = 1;
        redraw(1);
        setComplete(true);
        return;
      }

      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 2.4);
        progressRef.current = eased;
        redraw(eased);
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          setComplete(true);
        }
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && imageReady) play();
      },
      { threshold: 0.28 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [auto, duration, imageReady, redraw]);

  const nextPainting = () => {
    const index = curatedPaintings.findIndex((item) => item.objectId === painting.objectId);
    const next = curatedPaintings[(index + 1) % curatedPaintings.length]!;
    startedRef.current = false;
    progressRef.current = 0;
    setComplete(false);
    setImageReady(false);
    imageRef.current = null;
    setPainting(next);
  };

  return (
    <div ref={hostRef} className={`absolute inset-0 overflow-hidden bg-paper ${className ?? ""}`}>
      <canvas ref={paintingRef} className="absolute inset-0" />
      <canvas ref={coverRef} className="absolute inset-0" />
      {!imageReady ? (
        <div className="absolute inset-0 flex items-center justify-center bg-paper">
          <p className="mono text-[11px] tracking-[0.28em] uppercase text-ink/40">The painting is arriving</p>
        </div>
      ) : null}
      {showPlaque ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between gap-6 px-6 pb-6 md:px-12">
          <p className="max-w-sm text-[12px] leading-relaxed text-void/70">
            {painting.title}
            <span className="block text-void/45">
              {painting.artist}
              {painting.year ? ` · ${painting.year}` : ""}
            </span>
          </p>
          {complete ? (
            <button
              type="button"
              onClick={nextPainting}
              className="pointer-events-auto mono text-[11px] tracking-[0.22em] uppercase text-void/55 transition hover:text-void"
            >
              Another
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
