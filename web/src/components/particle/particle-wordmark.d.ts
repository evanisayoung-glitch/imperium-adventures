/**
 * Types for particle-wordmark.js. The engine stays plain JavaScript so
 * projects can vendor it without a build step; drop this file next to it in a
 * TypeScript project.
 */

export interface ParticleWordmarkOptions {
  /** Word to form. Short words hold their letterforms; past ~8 characters the glyphs go to noise. */
  text?: string;
  /** Same-origin SVG/PNG logo. Overrides `text`. Cross-origin taints the canvas. */
  image?: string | null;
  fontFamily?: string;
  fontWeight?: number | string;
  fontSize?: number | null;
  letterSpacing?: number;
  /** Fraction of the container's width the word spans when auto-fitting. */
  widthRatio?: number;
  /** Cap on the word's height as a fraction of the container's. */
  heightRatio?: number;
  /** Px between sampled points. The single biggest cost lever — 4 balanced, 6 sparse, 8 mobile. */
  sampleGap?: number;
  alphaThreshold?: number;
  maxParticles?: number;
  jitter?: number;
  mode?: "follow" | "proximity" | "reveal" | "repel";
  /** Px width of the cursor-anchored word, `follow` only. Keep it small — enzy.ai runs 250-350. */
  wordWidth?: number;
  /** How far above the pointer the word floats, `follow` only. */
  followOffsetY?: number;
  /** How fast the word center chases the pointer. Lower trails more. */
  followEase?: number;
  /** Ambient dots that never join the word, `follow` only. "auto" scales with viewport area. */
  dust?: number | "auto";
  dispersal?: "orbit" | "field";
  /** Px radius of cursor influence. Below the word's width the cursor only ever reveals fragments. */
  radius?: number;
  repelForce?: number;
  revealSpeed?: number;
  /** Formation ramp per 60fps frame, `follow` only, fine pointers. */
  formSpeed?: number;
  /** Formation ramp on coarse pointers: one tap pulse tugs, never fully forms. */
  tapFormSpeed?: number;
  /** Dispersal ramp, `follow` only. 1 is a magnet-off burst; 0.05 a dreamy exhale. */
  releaseSpeed?: number;
  /**
   * Ms the tap-magnet stays on after a touch lifts (coarse pointers,
   * touchFallback "none"). Taps inside each other's windows chain into a
   * sustained pull. Local addition over upstream.
   */
  tapPulse?: number;
  /**
   * Fine-pointer behavior, `follow` only. "hover": the word rides any cursor.
   * "scrub" (default): the word only forms once back-and-forth movement in a
   * small area charges it up, and drains when the scrubbing stops.
   */
  attract?: "hover" | "scrub";
  /** Px around the eased charge center where movement counts as charging. */
  scrubRadius?: number;
  /** Px of cursor travel inside the radius for a full charge. */
  scrubCharge?: number;
  /** Full charges drained per second without fresh scrubbing. */
  scrubDrain?: number;
  stiffness?: number;
  damping?: number;
  wanderRadius?: number;
  wanderSpeed?: number;
  /**
   * Palette sampled per particle. Hex only: canvas silently ignores a fillStyle
   * it cannot parse, so a browser without oklch() support would paint the dot in
   * whatever color the previous one used.
   */
  colors?: readonly string[];
  /** Global alpha ceiling. Formed letters lift toward solid on their own. */
  opacity?: number;
  /** Slow per-particle alpha breathing while drifting. */
  twinkle?: boolean;
  /** Logos keep their own pixel colors. False forces the palette. */
  useImageColors?: boolean;
  shape?: "rect" | "circle";
  particleSize?: [number, number];
  spin?: boolean;
  background?: string;
  pixelRatioCap?: number;
  respectReducedMotion?: boolean;
  pauseWhenOffscreen?: boolean;
  zIndex?: number;
  pointerEvents?: string;
  /** Touch has no hover: a virtual cursor tours the word, the word sits formed, or nothing. */
  touchFallback?: "sweep" | "formed" | "none";
  /** Milliseconds for one autopilot tour. */
  sweepPeriod?: number;
}

export interface ParticleWordmarkInstance {
  canvas: HTMLCanvasElement;
  setText(text: string): void;
  setOptions(patch: ParticleWordmarkOptions): void;
  pause(): void;
  resume(): void;
  destroy(): void;
}

/**
 * The one-call page integration: mounts its own fixed canvas, performs the
 * text-above-canvas layering itself (re-running on DOM and route changes),
 * and resolves CSS font variables. Pass identity options only.
 */
export function particleizePage(
  options?: ParticleWordmarkOptions & {
    /** Per-route words; '*' is the fallback. Route changes are polled. */
    words?: Record<string, string>;
    /** Canvas layer (default 1); content is auto-raised to zIndex + 1. */
    zIndex?: number;
  }
): ParticleWordmarkInstance;

/** Raise every visible text container above zMin. Exposed for audits. */
export function raiseContentAbove(zMin: number): number;

export function createParticleWordmark(
  container: HTMLElement,
  options?: ParticleWordmarkOptions
): ParticleWordmarkInstance;

export default createParticleWordmark;
