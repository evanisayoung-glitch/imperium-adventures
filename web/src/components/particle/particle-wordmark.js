/**
 * particle-wordmark.js
 * Zero-dependency canvas particle field that samples a word (or logo image)
 * into target points and assembles it under the cursor.
 *
 * Usage:
 *   import { createParticleWordmark } from './particle-wordmark.js';
 *   const wm = createParticleWordmark(document.querySelector('#hero'), { text: 'enzy' });
 *   wm.destroy();
 *
 * Also attaches window.createParticleWordmark when loaded as a classic script.
 */

const DEFAULTS = {
  // --- what to form ---
  text: 'hello',
  image: null,            // URL of an SVG/PNG logo. Overrides `text` when set.
  fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
  fontWeight: 800,
  fontSize: null,         // px. null = auto-fit using widthRatio / heightRatio
  letterSpacing: 0,       // px, applied per character when > 0
  widthRatio: 0.62,       // fraction of container width the word should span
  heightRatio: 0.45,      // hard cap as a fraction of container height

  // --- point cloud ---
  sampleGap: 3,           // px between sampled points. Lower = denser = heavier. 3 keeps a
                          // ~10px tittle legible as a circle; the biggest cost lever.
  alphaThreshold: 128,
  maxParticles: 6000,     // gap auto-increases until the count fits under this
  jitter: 0.25,           // 0..1 randomness added to each home position

  // --- behavior ---
  mode: 'follow',         // 'follow' | 'proximity' | 'reveal' | 'repel'
  wordWidth: 280,         // px width of the word in follow mode (small, cursor-scale)
  followOffsetY: -60,     // px the word floats above the pointer in follow mode
  followEase: 0.1,        // how fast the word center chases the pointer
  dust: 'auto',           // ambient background particles; 'auto' scales with viewport area
  dispersal: 'orbit',     // 'orbit' (drift near own letter) | 'field' (scatter canvas-wide)
  radius: 190,            // px influence radius of the cursor
  repelForce: 60,         // px of push, mode 'repel' only
  revealSpeed: 0.035,     // formation lerp rate, mode 'reveal' only
  // The formation ramp is asymmetric on purpose: gathering is gradual,
  // release has its own rate so it can be a burst (1) or an exhale (0.05).
  formSpeed: 0.08,        // formation ramp per 60fps frame, mode 'follow', fine pointers
  tapFormSpeed: 0.06,     // formation ramp toward the tap charge on touch — quick enough
                          // that each tap's pull reads inside its own 600ms window
  tapBoost: 0.4,          // charge added per tap. One tap is a ~third-of-the-way tug; only a
                          // mash (several taps chained) reaches a full charge. Holding a
                          // finger still sustains what taps pumped but adds nothing — the
                          // word NEVER forms from a hold alone.
  releaseSpeed: 0.05,     // dispersal ramp. 1 cuts the pull in a single frame (magnet-off
                          // burst); 0.05 is a dreamy exhale with a soft lingering tail
  tapPulse: 600,          // ms the tap-magnet stays on after a touch lifts (coarse + 'none');
                          // taps inside the window chain into a sustained pull
  attract: 'scrub',       // fine pointers, 'follow' mode: 'scrub' (the word only forms once
                          // scrubbing a small area charges it) | 'hover' (rides any cursor)
  scrubRadius: 110,       // px around the eased charge center where movement counts as charging
  scrubCharge: 600,       // px of cursor travel inside the radius for a full charge
  scrubDrain: 1.0,        // full charges drained per second without fresh scrubbing

  // --- motion ---
  stiffness: 0.055,
  damping: 0.82,
  wanderRadius: 70,       // px of idle drift
  wanderSpeed: 0.00035,   // radians per ms. Dormant dots amble at ~25px/s; the field should
                          // read as dreamy until the input is purposeful. 0.0009 reads busy.

  // --- look ---
  colors: ['#F5F5F5'],    // hex only: canvas silently ignores a fillStyle it cannot parse,
                          // so an oklch() token inherits the previous dot's color on old engines
  opacity: 0.85,          // global alpha ceiling; keeps dots ambient, not loud
  twinkle: true,          // slow per-particle alpha breathing while drifting
  useImageColors: true,   // logos keep their own pixel colors instead of the palette
  shape: 'circle',        // 'circle' | 'rect'. Round dots keep round glyph features round: a
                          // ~10px tittle drawn by a dozen grid-snapped rects tiles into a square
  particleSize: [2.4, 3.4], // [min, max] px. Circles cover ~21% less area than same-size rects
  spin: false,            // rect-only confetti tumble; off for the calm dot look
  background: 'transparent',

  // --- system ---
  pixelRatioCap: 2,
  respectReducedMotion: true,
  pauseWhenOffscreen: true,
  zIndex: 0,
  pointerEvents: 'none',
  touchFallback: 'none',  // 'none' (tap-magnet: taps pump the word together) | 'formed' |
                          // 'sweep'. Never ship 'sweep' on a page with real content: the
                          // autopilot keeps the word permanently formed mid-viewport, moving
                          // faster than the spring settles — on a real phone it reads as a
                          // smeared glitch parked behind the headline.
  sweepPeriod: 6000,      // ms for one full tour, 'sweep' only
};

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

/**
 * Canvas cannot parse CSS custom properties in a font string — it silently
 * keeps its default face, so `var(--font-brand)` (the shape next/font and
 * design systems produce) would sample the WRONG letterforms. Resolve the
 * variables off :root here so every caller gets this for free.
 */
function resolveFontStack(stack) {
  if (!stack || stack.indexOf('var(') === -1 || typeof getComputedStyle !== 'function') return stack;
  const root = getComputedStyle(document.documentElement);
  return stack
    .split(',')
    .map((part) => {
      const m = part.trim().match(/^var\(\s*(--[\w-]+)\s*\)$/);
      return m ? root.getPropertyValue(m[1]).trim() : part.trim();
    })
    .filter(Boolean)
    .join(', ');
}
const smoothstep = (t) => t * t * (3 - 2 * t);
const rand = (a, b) => a + Math.random() * (b - a);

function buildFont(o, size) {
  return `${o.fontWeight} ${size}px ${o.fontFamily}`;
}

function drawTextTo(ctx, o, w, h) {
  let size = o.fontSize;
  if (!size) {
    ctx.font = buildFont(o, 100);
    const measured = measureWidth(ctx, o.text, 100, o.letterSpacing);
    size = (100 * (w * o.widthRatio)) / Math.max(measured, 1);
    size = Math.min(size, h * o.heightRatio);
  }
  ctx.font = buildFont(o, size);
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';

  const total = measureWidth(ctx, o.text, size, o.letterSpacing);
  if (o.letterSpacing > 0) {
    let x = (w - total) / 2;
    ctx.textAlign = 'left';
    for (const ch of o.text) {
      ctx.fillText(ch, x, h / 2);
      x += ctx.measureText(ch).width + o.letterSpacing;
    }
  } else {
    ctx.textAlign = 'center';
    ctx.fillText(o.text, w / 2, h / 2);
  }
}

function measureWidth(ctx, text, size, spacing) {
  if (spacing > 0) {
    let total = 0;
    for (const ch of text) total += ctx.measureText(ch).width + spacing;
    return total - spacing;
  }
  return ctx.measureText(text).width;
}

function drawImageTo(ctx, o, w, h, img) {
  const scale = Math.min((w * o.widthRatio) / img.width, (h * o.heightRatio) / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
}

/**
 * Renders the target once to an offscreen canvas and walks the alpha channel
 * on a grid. Widening the grid until the count fits keeps the cost bounded on
 * huge hero sections instead of spawning 40k particles on a 4K monitor.
 */
function samplePoints(o, w, h, img) {
  if (w < 8 || h < 8) return { points: [], colors: [] };
  const off = document.createElement('canvas');
  off.width = w;
  off.height = h;
  const ctx = off.getContext('2d', { willReadFrequently: true });

  if (img) drawImageTo(ctx, o, w, h, img);
  else drawTextTo(ctx, o, w, h);

  const data = ctx.getImageData(0, 0, w, h).data;
  const wantColors = img && o.useImageColors;
  let gap = Math.max(1, o.sampleGap);
  let points = [];
  let colors = [];

  for (let attempt = 0; attempt < 8; attempt++) {
    points = [];
    colors = [];
    for (let y = 0; y < h; y += gap) {
      for (let x = 0; x < w; x += gap) {
        const i = (y * w + x) * 4;
        if (data[i + 3] > o.alphaThreshold) {
          points.push(x, y);
          if (wantColors) colors.push(`rgb(${data[i]},${data[i + 1]},${data[i + 2]})`);
        }
      }
    }
    if (points.length / 2 <= o.maxParticles) break;
    gap = Math.ceil(gap * 1.25);
  }
  return { points, colors };
}

export function createParticleWordmark(container, userOptions = {}) {
  if (!container) throw new Error('createParticleWordmark: container element required');
  let o = { ...DEFAULTS, ...userOptions };
  o.fontFamily = resolveFontStack(o.fontFamily);

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    display: 'block',
    zIndex: String(o.zIndex),
    pointerEvents: o.pointerEvents,
  });
  if (getComputedStyle(container).position === 'static') container.style.position = 'relative';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let W = 0;
  let H = 0;
  let dpr = 1;
  let particles = [];
  let logo = null;
  let raf = 0;
  let running = false;
  let visible = true;
  let destroyed = false;
  let reveal = 0;
  let formAmount = 0;
  let cx = -9999;
  let cy = -9999;
  // Tap-magnet state (coarse pointers, touchFallback 'none'). Explicit rather
  // than inferred from pointer.inside, because iOS Safari does not reliably
  // fire pointerleave after a tap — stale inside state parks the word forever.
  let touchHeld = false;
  let tapUntil = 0;
  let tapCharge = 0;
  // Scrub-charge state (fine pointers, attract 'scrub'). Movement only counts
  // while the cursor stays near the eased charge center, so wiggling a small
  // area charges it up while ordinary travel across the page charges nothing.
  let charge = 0;
  let chargeCX = -9999;
  let chargeCY = -9999;
  let lastEX = -1;
  let lastEY = -1;
  const pointer = { x: -9999, y: -9999, inside: false, real: false };
  const coarse =
    typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;

  const reduced =
    o.respectReducedMotion &&
    typeof matchMedia === 'function' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches;

  function build() {
    const rect = container.getBoundingClientRect();
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, o.pixelRatioCap);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const follow = o.mode === 'follow';
    // Soft-capped to 62% of the container: 280px is cursor-scale on a desktop
    // but a second headline on a 390px phone, and this rule covers both
    // without a per-device override.
    const sw = follow ? Math.min(o.wordWidth, Math.max(120, Math.round(W * 0.62))) : W;
    const sh = follow ? Math.max(40, Math.round(sw * 0.5)) : H;
    const sampleOpts = follow ? { ...o, widthRatio: 0.94, heightRatio: 0.9 } : o;
    const { points: flat, colors: sampled } = samplePoints(sampleOpts, sw, sh, logo);
    const [minS, maxS] = o.particleSize;
    const next = [];
    for (let i = 0; i < flat.length; i += 2) {
      let hx = flat[i] + rand(-o.jitter, o.jitter) * o.sampleGap;
      let hy = flat[i + 1] + rand(-o.jitter, o.jitter) * o.sampleGap;
      if (follow) {
        hx -= sw / 2;
        hy -= sh / 2;
      }
      const anchorX = follow || o.dispersal === 'field' ? rand(0, W) : hx;
      const anchorY = follow || o.dispersal === 'field' ? rand(0, H) : hy;
      next.push({
        hx,
        hy,
        ax: anchorX,
        ay: anchorY,
        x: anchorX + rand(-40, 40),
        y: anchorY + rand(-40, 40),
        vx: 0,
        vy: 0,
        phase: rand(0, Math.PI * 2),
        wr: o.wanderRadius * rand(0.4, 1.3),
        ws: o.wanderSpeed * rand(0.6, 1.6),
        size: rand(minS, maxS),
        color: sampled.length
          ? sampled[i >> 1]
          : o.colors[(Math.random() * o.colors.length) | 0],
        rot: rand(0, Math.PI * 2),
        rs: rand(-0.05, 0.05),
        alpha: rand(0.45, 1),
        tw: rand(0.0004, 0.0011),
        dust: false,
      });
    }
    if (follow) {
      const dustCount =
        o.dust === 'auto'
          ? clamp(Math.round((W * H) / 9000), 60, 280)
          : Math.max(0, o.dust | 0);
      for (let i = 0; i < dustCount; i++) {
        const ax = rand(0, W);
        const ay = rand(0, H);
        next.push({
          hx: 0, hy: 0, ax, ay,
          x: ax, y: ay, vx: 0, vy: 0,
          phase: rand(0, Math.PI * 2),
          wr: o.wanderRadius * rand(0.4, 1.3),
          ws: o.wanderSpeed * rand(0.6, 1.6),
          size: rand(minS, maxS) * 0.8,
          color: o.colors[(Math.random() * o.colors.length) | 0],
          rot: rand(0, Math.PI * 2),
          rs: rand(-0.05, 0.05),
          alpha: rand(0.35, 0.85),
          tw: rand(0.0004, 0.0011),
          dust: true,
        });
      }
    }
    particles = next;
  }

  function paint(t, dt = 1) {
    ctx.clearRect(0, 0, W, H);
    if (o.background !== 'transparent') {
      ctx.fillStyle = o.background;
      ctx.fillRect(0, 0, W, H);
    }

    if (coarse && !pointer.real) {
      if (o.touchFallback === 'sweep') {
        // Figure-eight tour across the word band so every letter forms in turn.
        const ph = (t % o.sweepPeriod) / o.sweepPeriod * Math.PI * 2;
        pointer.x = W / 2 + Math.sin(ph) * W * 0.32;
        pointer.y = H / 2 + Math.sin(ph * 2) * H * 0.12;
        pointer.inside = true;
      } else if (o.touchFallback === 'formed') {
        pointer.x = W / 2;
        pointer.y = H / 2;
        pointer.inside = true;
      } else {
        // The tap-magnet: attraction while a finger is down and for tapPulse
        // after each tap. One tap tugs the dots and lets go; taps that land
        // inside each other's windows chain into a sustained pull that
        // ratchets the word together; stop feeding it and releaseSpeed cuts
        // the clump loose.
        pointer.inside = touchHeld || t < tapUntil;
      }
    }

    const r = coarse && !pointer.real && o.touchFallback === 'formed'
      ? Math.max(W, H)
      : o.radius;
    const rr = r * r;

    if (o.mode === 'reveal') {
      const target = pointer.inside ? 1 : 0;
      reveal += (target - reveal) * o.revealSpeed * 16 * dt;
      reveal = clamp(reveal, 0, 1);
    }

    let half = 0;
    if (o.mode === 'follow') {
      // Gate scrub by the ACTIVE POINTER, not the device class: a mouse or
      // trackpad on a touch device (iPad) keeps pointer.real alive and must
      // charge by scrubbing like any mouse — never form on mere hover.
      const scrub = o.attract === 'scrub' && (!coarse || pointer.real);
      const tapMode = o.attract === 'scrub' && !scrub;
      let target;
      if (scrub) {
        // Charge drains constantly; only fresh scrubbing (accumulated in the
        // pointermove handler) outruns it. The formation target IS the charge,
        // so the word tightens in proportion to the energy put in.
        charge = Math.max(0, charge - (o.scrubDrain / 60) * dt);
        if (pointer.inside) {
          // The center firms up as the charge builds and locks solid at full:
          // otherwise the word chases the shaking cursor and can never settle
          // into clean letterforms no matter how hard the visitor scrubs.
          const loose = Math.max(0, 1 - charge);
          chargeCX += (pointer.x - chargeCX) * o.followEase * 0.6 * loose * dt;
          chargeCY += (pointer.y - chargeCY) * o.followEase * 0.6 * loose * dt;
        }
        target = pointer.inside ? Math.min(1, charge) : 0;
      } else if (tapMode) {
        // Touch: the formation target is the TAP charge — pumped only by
        // pointerdown events, held (not grown) while a finger stays down,
        // drained otherwise. A press-and-hold can therefore sustain a tug but
        // can never form the word; only a mash accumulates a full charge.
        if (!touchHeld) tapCharge = Math.max(0, tapCharge - (o.scrubDrain / 60) * dt);
        target = pointer.inside ? Math.min(1, tapCharge) : 0;
      } else {
        target = pointer.inside ? 1 : 0; // legacy attract 'hover', opt-in only
      }
      // Asymmetric on purpose: gather at formSpeed (tapFormSpeed in tap mode,
      // paced to its own window), let go at releaseSpeed — 1 is a magnet-off
      // burst, 0.05 a dreamy exhale.
      const gather = tapMode ? o.tapFormSpeed : o.formSpeed;
      const rate = target > formAmount ? gather : o.releaseSpeed;
      formAmount += (target - formAmount) * rate * dt;
      formAmount = clamp(formAmount, 0, 1);
      if (pointer.inside) {
        // Scrub mode forms the word over the charged area, not the live
        // cursor — the scrubbing IS the pointer's commitment to that spot.
        const ax = scrub ? chargeCX : pointer.x;
        const ay = scrub ? chargeCY : pointer.y;
        if (cx < -999) { cx = ax; cy = ay; }
        cx += (ax - cx) * o.followEase * dt;
        cy += (ay + o.followOffsetY - cy) * o.followEase * dt;
        half = Math.min(o.wordWidth, W) / 2;
        cx = clamp(cx, half + 8, W - half - 8);
        cy = clamp(cy, 40, H - 40);
      }
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      let tx;
      let ty;
      let formed;

      if (o.mode === 'follow') {
        formed = p.dust ? 0 : formAmount;
        const wx = p.ax + Math.cos(p.phase + t * p.ws) * p.wr;
        const wy = p.ay + Math.sin(p.phase * 1.7 + t * p.ws * 0.85) * p.wr;
        if (p.dust || formAmount < 0.01) {
          tx = wx;
          ty = wy;
        } else {
          tx = wx + (cx + p.hx - wx) * formAmount;
          ty = wy + (cy + p.hy - wy) * formAmount;
        }
      } else if (o.mode === 'repel') {
        formed = 1;
        tx = p.hx;
        ty = p.hy;
        const dx = p.hx - pointer.x;
        const dy = p.hy - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < rr) {
          const d = Math.sqrt(d2) || 0.001;
          const push = smoothstep(1 - d / r) * o.repelForce;
          tx += (dx / d) * push;
          ty += (dy / d) * push;
          formed = 1 - smoothstep(1 - d / r) * 0.6;
        }
      } else {
        let influence;
        if (o.mode === 'reveal') {
          influence = reveal;
        } else {
          const dx = p.hx - pointer.x;
          const dy = p.hy - pointer.y;
          const d2 = dx * dx + dy * dy;
          influence = d2 >= rr ? 0 : smoothstep(1 - Math.sqrt(d2) / r);
        }
        formed = influence;
        const wx = p.ax + Math.cos(p.phase + t * p.ws) * p.wr;
        const wy = p.ay + Math.sin(p.phase * 1.7 + t * p.ws * 0.85) * p.wr;
        tx = wx + (p.hx - wx) * influence;
        ty = wy + (p.hy - wy) * influence;
      }

      const damp = Math.pow(o.damping, dt);
      p.vx = (p.vx + (tx - p.x) * o.stiffness * dt) * damp;
      p.vy = (p.vy + (ty - p.y) * o.stiffness * dt) * damp;
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      let a = p.alpha;
      if (o.twinkle) a *= 0.8 + 0.2 * Math.sin(p.phase * 3 + t * p.tw);
      // formed letters read crisper: lift alpha toward 1 with formation
      a = a + (1 - a) * formed * 0.6;
      ctx.globalAlpha = clamp(a * o.opacity, 0, 1);
      ctx.fillStyle = p.color;
      if (o.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (o.spin) {
        p.rot += p.rs * (1 - formed) * dt;
        const s = p.size;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot * (1 - formed));
        ctx.fillRect(-s / 2, -s / 2, s, s * (0.55 + 0.45 * formed));
        ctx.restore();
      } else {
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }
    }
    ctx.globalAlpha = 1;
  }

  function paintStatic() {
    // Reduced motion: no loop — and no formed word either. Formation is an
    // input-driven animation, and the rule is that the word appears ONLY when
    // energy is put in; with motion off there is no input, so paint the
    // dormant field once (each particle at its anchor) and stop. The page
    // keeps its texture; the word simply never assembles here.
    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = clamp(o.opacity, 0, 1) * 0.9;
    for (const p of particles) {
      ctx.fillStyle = p.color;
      if (o.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(p.ax, p.ay, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(p.ax - p.size / 2, p.ay - p.size / 2, p.size, p.size);
      }
    }
    ctx.globalAlpha = 1;
  }

  let lastT = 0;
  function loop(t) {
    if (!running) return;
    // Normalize to 60fps steps so 120Hz displays don't double the spring rate.
    const dt = lastT ? clamp((t - lastT) / 16.667, 0.25, 3) : 1;
    lastT = t;
    paint(t, dt);
    raf = requestAnimationFrame(loop);
  }

  function start() {
    if (running || destroyed || reduced) return;
    running = true;
    raf = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    lastT = 0;
    cancelAnimationFrame(raf);
  }

  let realTimer = 0;
  function onPointerMove(e) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    if (e.pointerType === 'touch') {
      // Touch feeds the tap-magnet, not the hover path: iOS leaves hover state
      // stale after a tap, so formation must key off the tap window instead.
      if (e.type === 'pointerdown') {
        touchHeld = true;
        // Each tap pumps the charge; overfill to 1.25 so a mash holds the
        // target pinned at full through the gaps between taps.
        tapCharge = Math.min(1.25, tapCharge + o.tapBoost);
      }
      tapUntil = performance.now() + o.tapPulse;
      return;
    }
    pointer.real = true;
    clearTimeout(realTimer);
    realTimer = setTimeout(() => { pointer.real = false; }, 2500);
    pointer.inside =
      pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;

    // Any non-touch pointer charges by scrubbing — including a mouse or
    // trackpad on a coarse-classified device (touch events returned above).
    if (o.attract === 'scrub' && o.mode === 'follow' && pointer.inside) {
      if (chargeCX < -999) {
        chargeCX = pointer.x;
        chargeCY = pointer.y;
      }
      if (lastEX < 0) {
        // First event after mount or re-entry: seed, no gain.
        lastEX = pointer.x;
        lastEY = pointer.y;
        return;
      }
      // Distance-based, so charging is pointer-rate independent; capped per
      // event so a fast flick cannot dump a full charge in a few events.
      const sdx = pointer.x - lastEX;
      const sdy = pointer.y - lastEY;
      const step = Math.min(40, Math.sqrt(sdx * sdx + sdy * sdy));
      lastEX = pointer.x;
      lastEY = pointer.y;
      const ox = pointer.x - chargeCX;
      const oy = pointer.y - chargeCY;
      if (ox * ox + oy * oy < o.scrubRadius * o.scrubRadius) {
        // Overfills to 1.25: the buffer absorbs the micro-pauses between
        // direction changes, so vigorous scrubbing holds the formation target
        // pinned at a full 1 instead of flickering just below it.
        charge = Math.min(1.25, charge + step / o.scrubCharge);
      }
    }
  }

  function onPointerEnd(e) {
    if (e.pointerType !== 'touch') return;
    touchHeld = false;
    // A cancel means the gesture became a scroll — that was never a tap, so it
    // earns no pulse. A clean lift keeps the magnet on for one more window.
    tapUntil = e.type === 'pointercancel' ? 0 : performance.now() + o.tapPulse;
  }

  function onPointerLeave(e) {
    // Touch lifts synthesize a leave; the tap window outlives it on purpose.
    if (e && e.pointerType === 'touch') return;
    pointer.x = -9999;
    pointer.y = -9999;
    pointer.inside = false;
    pointer.real = false;
    lastEX = -1;
    lastEY = -1;
  }

  function onVisibility() {
    if (document.hidden) stop();
    else if (visible) start();
  }

  const ro = new ResizeObserver(() => {
    build();
    if (reduced) paintStatic();
  });
  ro.observe(container);

  let io = null;
  if (o.pauseWhenOffscreen && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(container);
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerdown', onPointerMove, { passive: true });
  window.addEventListener('pointerup', onPointerEnd, { passive: true });
  window.addEventListener('pointercancel', onPointerEnd, { passive: true });
  document.addEventListener('pointerleave', onPointerLeave);
  document.addEventListener('visibilitychange', onVisibility);

  function boot() {
    build();
    if (reduced) paintStatic();
    else start();
  }

  // Fonts must be resolved before sampling or the glyph shape is measured
  // against a fallback face and the point cloud comes out wrong.
  const ready = o.image
    ? new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          logo = img;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = o.image;
      })
    : document.fonts && document.fonts.ready
      ? document.fonts.ready
      : Promise.resolve();

  ready.then(() => {
    if (!destroyed) boot();
  });

  return {
    canvas,
    setText(text) {
      o.text = text;
      o.image = null;
      logo = null;
      build();
      if (reduced) paintStatic();
    },
    setOptions(patch) {
      o = { ...o, ...patch };
      o.fontFamily = resolveFontStack(o.fontFamily);
      build();
      if (reduced) paintStatic();
    },
    pause: stop,
    resume: start,
    destroy() {
      destroyed = true;
      stop();
      ro.disconnect();
      if (io) io.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerMove);
      window.removeEventListener('pointerup', onPointerEnd);
      window.removeEventListener('pointercancel', onPointerEnd);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      clearTimeout(realTimer);
      canvas.remove();
    },
  };
}

/**
 * The layering rule, executed instead of documented: every visible piece of
 * text must sit ABOVE the field canvas. Walks all text nodes; any without a
 * positioned ancestor at z >= zMin gets its section-level container raised
 * (position: relative + z-index). Section/landmark elements themselves are
 * never raised, so full-bleed section backgrounds stay BELOW the canvas and
 * the field runs continuously over every band.
 *
 * Known trade-off of automatic mode: if a site paints a band's background on
 * an inner wrapper div rather than the section itself, that wrapper is
 * raised along with its text and hides the field inside that band. That is
 * the safe failure (content always wins); convert such wrappers manually if
 * the field should show there.
 */
const RAISE_BOUNDARY = /^(BODY|MAIN|SECTION|ARTICLE|HEADER|FOOTER|NAV|ASIDE)$/;

export function raiseContentAbove(zMin) {
  let changed = 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.textContent.trim()) continue;
    const el = node.parentElement;
    if (!el) continue;
    const tag = el.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'TEMPLATE') continue;
    if (el.closest('[aria-hidden="true"]')) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    let raised = false;
    for (let a = el; a && a !== document.body; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.position !== 'static' && parseInt(cs.zIndex, 10) >= zMin) { raised = true; break; }
    }
    if (raised) continue;
    let target = el;
    while (
      target.parentElement &&
      target.parentElement !== document.body &&
      !RAISE_BOUNDARY.test(target.parentElement.tagName)
    ) {
      target = target.parentElement;
    }
    if (getComputedStyle(target).position === 'static') target.style.position = 'relative';
    if (!(parseInt(getComputedStyle(target).zIndex, 10) >= zMin)) target.style.zIndex = String(zMin);
    changed++;
  }
  return changed;
}

/**
 * The one-call integration: mounts the page-wide field and performs the
 * layering itself. This is the default way to apply the effect to a site —
 * no CSS to write, no selectors to derive, no wrapper components.
 *
 *   import { particleizePage } from './particle-wordmark.js';
 *   particleizePage({ text: 'brand', fontFamily: 'Brand, sans-serif',
 *                     colors: ['#2C76FF', '#8FB4FF', '#8D9399'], opacity: 0.8 });
 *
 * Options are createParticleWordmark's, plus:
 * - `words`: { '/route': 'word', '*': 'fallback' } — per-route words. Route
 *   changes are detected by polling location.pathname (framework-agnostic),
 *   so SPAs re-form the right word with no router wiring.
 * - `zIndex` (default 1): the canvas layer; content is raised to zIndex + 1.
 *
 * The host is fixed at 100lvh (not bottom-anchored) so iOS Safari's URL bar
 * collapse never resizes it and reshuffles the field. Content that renders
 * late (hydration, SPA navigation) is raised by a debounced MutationObserver.
 */
export function particleizePage(userOptions = {}) {
  const { words = null, zIndex = 1, ...opts } = userOptions;

  const host = document.createElement('div');
  host.setAttribute('aria-hidden', 'true');
  host.style.cssText =
    'position:fixed;top:0;left:0;right:0;height:100vh;pointer-events:none;' +
    'z-index:' + zIndex + ';transform:translateZ(0);';
  host.style.setProperty('height', '100lvh');
  document.body.prepend(host);

  const zMin = zIndex + 1;
  raiseContentAbove(zMin);

  const wordFor = () =>
    words ? (words[location.pathname] ?? words['*'] ?? opts.text ?? DEFAULTS.text) : (opts.text ?? DEFAULTS.text);

  const wm = createParticleWordmark(host, { ...opts, text: wordFor(), zIndex: 0 });

  let raiseTimer = 0;
  const mo = new MutationObserver(() => {
    clearTimeout(raiseTimer);
    raiseTimer = setTimeout(() => raiseContentAbove(zMin), 250);
  });
  mo.observe(document.body, { childList: true, subtree: true });

  let lastPath = location.pathname;
  const routeTimer = setInterval(() => {
    if (location.pathname !== lastPath) {
      lastPath = location.pathname;
      if (words) wm.setText(wordFor());
      raiseContentAbove(zMin);
    }
  }, 400);

  window.addEventListener('load', () => raiseContentAbove(zMin), { once: true });

  return {
    canvas: wm.canvas,
    setText: wm.setText,
    setOptions: wm.setOptions,
    pause: wm.pause,
    resume: wm.resume,
    destroy() {
      mo.disconnect();
      clearInterval(routeTimer);
      clearTimeout(raiseTimer);
      wm.destroy();
      host.remove();
    },
  };
}

if (typeof window !== 'undefined') {
  window.createParticleWordmark = createParticleWordmark;
  window.particleizePage = particleizePage;
}

export default createParticleWordmark;
