"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  curatedPaintings,
  fetchMetObject,
  pickPaintingForDay,
  type MetObjectResponse,
  type MetPainting,
} from "@/lib/met-paintings";
import { generateRevealMarks, paintReveal } from "@/lib/paint-reveal";

/** Playground demo — client deployments use 25 min focus / 5 min break. */
const FOCUS_SECONDS = 60;
const BREAK_SECONDS = 15;
const STROKE_COUNT = 1400;
const COVER_COLOR = "#e8e2d4";
const STORAGE_KEY = "imperium-pomodoro-v2";
/** Demo: one short session reveals the full painting. Production: ~25% per 25-min session. */
const REVEAL_PER_SESSION = 1;

type Phase = "idle" | "focus" | "break";

type PersistedState = {
  paintingId: number;
  revealProgress: number;
  phase: Phase;
  remaining: number;
  endsAt: number | null;
};

function loadState(): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

function saveState(state: PersistedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota or private mode */
  }
}

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function FlipDigit({ char }: { char: string }) {
  return (
    <span className="relative inline-flex h-14 w-9 items-center justify-center overflow-hidden rounded-sm border border-forest/20 bg-forest-deep text-2xl font-medium tabular-nums text-field shadow-[inset_0_-2px_0_rgba(0,0,0,0.25)] sm:h-16 sm:w-11 sm:text-3xl">
      {char}
    </span>
  );
}

function FlipClock({ time }: { time: string }) {
  return (
    <div className="flex items-center gap-1 sm:gap-1.5" aria-live="polite" aria-atomic="true">
      {time.split("").map((char, index) =>
        char === ":" ? (
          <span key={`sep-${index}`} className="display px-0.5 text-2xl text-gold sm:text-3xl">
            :
          </span>
        ) : (
          <FlipDigit key={`${index}-${char}`} char={char} />
        ),
      )}
    </div>
  );
}

export function PomodoroTimer() {
  const paintingRef = useRef<HTMLCanvasElement>(null);
  const coverRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const marksRef = useRef<ReturnType<typeof generateRevealMarks>>([]);
  const sessionStartProgress = useRef(0);
  const sessionStartTime = useRef<number | null>(null);

  const [painting, setPainting] = useState<MetPainting>(() => pickPaintingForDay());
  const [metData, setMetData] = useState<MetObjectResponse | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [remaining, setRemaining] = useState(FOCUS_SECONDS);
  const [revealProgress, setRevealProgress] = useState(0);
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const displayTime = formatTime(remaining);
  const phaseLabel =
    phase === "focus" ? "Focus" : phase === "break" ? "Break" : "Ready";
  const isRunning = phase !== "idle" && endsAt !== null;

  const imageUrl = `/api/met-image?objectId=${painting.objectId}`;

  const redraw = useCallback(
    (progress: number) => {
      const paintingCanvas = paintingRef.current;
      const coverCanvas = coverRef.current;
      const image = imageRef.current;
      if (!paintingCanvas || !coverCanvas) return;

      const ctx = paintingCanvas.getContext("2d");
      const coverCtx = coverCanvas.getContext("2d");
      if (!ctx || !coverCtx) return;

      const { width, height } = paintingCanvas;

      ctx.clearRect(0, 0, width, height);
      if (image && imageReady) {
        const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
        const drawW = image.naturalWidth * scale;
        const drawH = image.naturalHeight * scale;
        const offsetX = (width - drawW) / 2;
        const offsetY = (height - drawH) / 2;
        ctx.drawImage(image, offsetX, offsetY, drawW, drawH);
      } else {
        ctx.fillStyle = "#d4cfc3";
        ctx.fillRect(0, 0, width, height);
      }

      paintReveal(coverCtx, marksRef.current, progress, COVER_COLOR);
    },
    [imageReady],
  );

  const resizeCanvases = useCallback(() => {
    const paintingCanvas = paintingRef.current;
    const coverCanvas = coverRef.current;
    const container = paintingCanvas?.parentElement;
    if (!paintingCanvas || !coverCanvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.floor(rect.width * dpr);
    const h = Math.floor(rect.height * dpr);

    for (const canvas of [paintingCanvas, coverCanvas]) {
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }

    marksRef.current = generateRevealMarks(w, h, STROKE_COUNT, painting.objectId);
    redraw(revealProgress);
  }, [painting.objectId, redraw, revealProgress]);

  // Hydrate from localStorage.
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      const fallback =
        curatedPaintings.find((item) => item.objectId === saved.paintingId) ??
        pickPaintingForDay();
      setPainting(fallback);
      setRevealProgress(Math.min(1, saved.revealProgress));

      if (saved.endsAt && saved.phase !== "idle") {
        const now = Date.now();
        const left = Math.max(0, Math.ceil((saved.endsAt - now) / 1000));
        if (left > 0) {
          setPhase(saved.phase);
          setRemaining(left);
          setEndsAt(saved.endsAt);
          if (saved.phase === "focus") {
            const elapsed = FOCUS_SECONDS - left;
            sessionStartProgress.current = Math.max(
              0,
              saved.revealProgress - (elapsed / FOCUS_SECONDS) * REVEAL_PER_SESSION,
            );
            sessionStartTime.current = now - elapsed * 1000;
          }
        } else {
          setPhase("idle");
          setRemaining(saved.phase === "focus" ? BREAK_SECONDS : FOCUS_SECONDS);
        }
      } else {
        setRemaining(saved.phase === "break" ? BREAK_SECONDS : FOCUS_SECONDS);
      }
    }
    setHydrated(true);
  }, []);

  // Fetch Met metadata.
  useEffect(() => {
    let cancelled = false;
    fetchMetObject(painting.objectId).then((data) => {
      if (!cancelled && data) setMetData(data);
    });
    return () => {
      cancelled = true;
    };
  }, [painting.objectId]);

  // Load painting image.
  useEffect(() => {
    if (!imageUrl) return;
    setImageReady(false);
    const image = new Image();
    image.decoding = "async";
    image.src = imageUrl;
    image.onload = () => {
      imageRef.current = image;
      setImageReady(true);
    };
    image.onerror = () => {
      imageRef.current = null;
      setImageReady(false);
    };
    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [imageUrl]);

  // Canvas sizing.
  useEffect(() => {
    resizeCanvases();
    const observer = new ResizeObserver(() => resizeCanvases());
    const container = paintingRef.current?.parentElement;
    if (container) observer.observe(container);
    return () => observer.disconnect();
  }, [resizeCanvases]);

  useEffect(() => {
    redraw(revealProgress);
  }, [revealProgress, redraw, imageReady]);

  const liveReveal = useCallback(() => {
    if (phase !== "focus" || !sessionStartTime.current) return revealProgress;
    const elapsed = (Date.now() - sessionStartTime.current) / 1000;
    const fraction = Math.min(1, elapsed / FOCUS_SECONDS);
    return Math.min(1, sessionStartProgress.current + fraction * REVEAL_PER_SESSION);
  }, [phase, revealProgress]);

  // Timer tick.
  useEffect(() => {
    if (!isRunning || !endsAt) return;

    const tick = () => {
      const left = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setRemaining(left);

      if (phase === "focus") {
        const progress = liveReveal();
        redraw(progress);
      }

      if (left <= 0) {
        if (phase === "focus") {
          const completed = 1;
          setRevealProgress(completed);
          redraw(completed);
          sessionStartTime.current = null;

          if (typeof Notification !== "undefined" && Notification.permission === "granted") {
            new Notification("Break time", {
              body: "Your focus session is complete. Step away for five minutes.",
            });
          }
          setPhase("break");
          setRemaining(BREAK_SECONDS);
          setEndsAt(Date.now() + BREAK_SECONDS * 1000);
        } else {
          if (typeof Notification !== "undefined" && Notification.permission === "granted") {
            new Notification("Back to work", {
              body: "Break is over. Ready for another focus round?",
            });
          }
          setPhase("idle");
          setRemaining(FOCUS_SECONDS);
          setEndsAt(null);
        }
      }
    };

    tick();
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [isRunning, endsAt, phase, liveReveal, redraw]);

  // Persist state.
  useEffect(() => {
    if (!hydrated) return;
    saveState({
      paintingId: painting.objectId,
      revealProgress,
      phase,
      remaining,
      endsAt,
    });
  }, [hydrated, painting.objectId, revealProgress, phase, remaining, endsAt]);

  const startFocus = () => {
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      Notification.requestPermission();
    }
    sessionStartProgress.current = revealProgress;
    sessionStartTime.current = Date.now();
    setPhase("focus");
    setRemaining(FOCUS_SECONDS);
    setEndsAt(Date.now() + FOCUS_SECONDS * 1000);
  };

  const startBreak = () => {
    setPhase("break");
    setRemaining(BREAK_SECONDS);
    setEndsAt(Date.now() + BREAK_SECONDS * 1000);
  };

  const pause = () => {
    if (phase === "focus" && sessionStartTime.current) {
      const pausedProgress = liveReveal();
      setRevealProgress(pausedProgress);
      redraw(pausedProgress);
      sessionStartTime.current = null;
    }
    setPhase("idle");
    setEndsAt(null);
    setRemaining(phase === "break" ? BREAK_SECONDS : FOCUS_SECONDS);
  };

  const resetSession = () => {
    setPhase("idle");
    setEndsAt(null);
    setRemaining(FOCUS_SECONDS);
  };

  const nextPainting = () => {
    const index = curatedPaintings.findIndex((item) => item.objectId === painting.objectId);
    const next = curatedPaintings[(index + 1) % curatedPaintings.length]!;
    setMetData(null);
    setPainting(next);
    setRevealProgress(0);
    setPhase("idle");
    setEndsAt(null);
    setRemaining(FOCUS_SECONDS);
  };

  const displayProgress = phase === "focus" && isRunning ? liveReveal() : revealProgress;
  const progressPercent = Math.round(displayProgress * 100);

  const plaque = useMemo(
    () => ({
      title: metData?.title ?? painting.title,
      artist: metData?.artistDisplayName ?? painting.artist,
      year: metData?.objectDate ?? painting.year,
    }),
    [metData, painting],
  );

  return (
    <div className="mx-auto max-w-3xl">
      <p className="mb-4 border border-gold/30 bg-gold/10 px-4 py-3 text-center text-xs leading-relaxed text-muted">
        <span className="tracking-[0.14em] uppercase text-forest">Playground demo</span>
        {" — "}
        This version runs on 1-minute focus sessions so you can see the reveal quickly. On a client
        site, we&apos;d use 25-minute sessions and a much slower reveal — the full painting emerges
        over a full workday, not a single minute.
      </p>
      <div className="border border-forest/15 bg-field-warm/50 p-5 sm:p-8">
        {/* Gallery frame */}
        <div
          className="relative mx-auto aspect-[4/3] max-h-[min(52vh,420px)] w-full p-3 sm:p-4"
          style={{
            background:
              "linear-gradient(145deg, #3d2817 0%, #2a1a0e 40%, #1f1409 100%)",
            boxShadow: "inset 0 0 0 1px rgba(201,162,39,0.15), 0 12px 40px rgba(15,42,31,0.2)",
          }}
        >
          <div
            className="relative h-full w-full overflow-hidden"
            style={{
              background: "#f5f0e6",
              boxShadow: "inset 0 0 0 8px #faf7f0, inset 0 0 0 10px #d9d0c0",
            }}
          >
            <canvas ref={paintingRef} className="absolute inset-0 h-full w-full" />
            <canvas ref={coverRef} className="absolute inset-0 h-full w-full" />
            {!imageReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-field-warm/80">
                <p className="text-xs tracking-[0.2em] uppercase text-muted">Loading from The Met…</p>
              </div>
            )}
          </div>
        </div>

        {/* Museum plaque */}
        <div className="mx-auto mt-5 max-w-md border border-forest/10 bg-field px-4 py-3 text-center shadow-sm">
          <p className="display text-sm text-forest sm:text-base">{plaque.title}</p>
          <p className="mt-1 text-xs text-muted">
            {plaque.artist}
            {plaque.year ? ` · ${plaque.year}` : ""}
          </p>
          <p className="mt-2 text-[10px] tracking-[0.22em] uppercase text-muted">
            The Metropolitan Museum of Art · Open Access
          </p>
          <div className="mt-3 h-px w-full bg-forest/10" />
          <div className="mt-2 flex items-center justify-between text-[10px] tracking-[0.16em] uppercase text-muted">
            <span>Revealed</span>
            <span className="text-gold">{progressPercent}%</span>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-forest/10">
            <div
              className="bar-fill h-full rounded-full bg-gold"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Timer controls */}
        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="text-center">
            <p className="text-[10px] tracking-[0.28em] uppercase text-gold">{phaseLabel}</p>
            <div className="mt-3">
              <FlipClock time={displayTime} />
            </div>
            <p className="mt-3 text-xs text-muted">
              {phase === "focus"
                ? "Cotton dabs and brush sweeps reveal the painting as you focus."
                : phase === "break"
                  ? "Rest your eyes. The canvas waits."
                  : "1 min demo focus · 15 sec break"}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {phase === "idle" ? (
              <button
                type="button"
                onClick={startFocus}
                className="display border border-forest bg-forest px-6 py-2.5 text-sm tracking-[0.12em] uppercase text-field transition hover:bg-forest-mid"
              >
                Start focus
              </button>
            ) : (
              <button
                type="button"
                onClick={pause}
                className="display border border-forest/30 px-6 py-2.5 text-sm tracking-[0.12em] uppercase text-forest transition hover:border-gold hover:text-gold"
              >
                Pause
              </button>
            )}
            {phase === "idle" && revealProgress > 0 && (
              <button
                type="button"
                onClick={startBreak}
                className="display border border-forest/30 px-5 py-2.5 text-sm tracking-[0.12em] uppercase text-muted transition hover:border-gold hover:text-gold"
              >
                Take break
              </button>
            )}
            <button
              type="button"
              onClick={resetSession}
              className="text-xs tracking-[0.14em] uppercase text-muted underline decoration-forest/20 underline-offset-4 transition hover:text-gold hover:decoration-gold"
            >
              Reset timer
            </button>
          </div>

          {revealProgress >= 1 && (
            <button
              type="button"
              onClick={nextPainting}
              className="display text-xs tracking-[0.18em] uppercase text-gold transition hover:text-gold-soft"
            >
              New painting →
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-muted">
        One brushstroke at a time — public-domain masterpieces from{" "}
        <a
          href="https://www.metmuseum.org/openaccess"
          target="_blank"
          rel="noopener noreferrer"
          className="text-forest underline decoration-gold/50 underline-offset-2 hover:decoration-gold"
        >
          The Met Open Access
        </a>{" "}
        collection. Progress is saved in your browser.
      </p>
    </div>
  );
}
