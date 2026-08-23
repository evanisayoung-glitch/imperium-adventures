export type CottonDab = {
  kind: "dab";
  x: number;
  y: number;
  size: number;
  rotation: number;
  seed: number;
};

export type SweepStroke = {
  kind: "stroke";
  x: number;
  y: number;
  angle: number;
  length: number;
  width: number;
  curve: number;
  seed: number;
};

export type RevealMark = CottonDab | SweepStroke;

/** Deterministic pseudo-random from a seed — same painting always gets the same stroke order. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateRevealMarks(
  width: number,
  height: number,
  count: number,
  seed: number,
): RevealMark[] {
  const rand = mulberry32(seed);
  const dabCount = Math.floor(count * 0.62);
  const marks: RevealMark[] = [];

  for (let i = 0; i < dabCount; i++) {
    marks.push({
      kind: "dab",
      x: rand() * width,
      y: rand() * height,
      size: 10 + rand() * 28,
      rotation: rand() * Math.PI * 2,
      seed: Math.floor(rand() * 1_000_000),
    });
  }

  for (let i = dabCount; i < count; i++) {
    marks.push({
      kind: "stroke",
      x: rand() * width,
      y: rand() * height,
      angle: rand() * Math.PI * 2,
      length: 28 + rand() * 110,
      width: 10 + rand() * 26,
      curve: (rand() - 0.5) * 0.75,
      seed: Math.floor(rand() * 1_000_000),
    });
  }

  for (let i = marks.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [marks[i], marks[j]] = [marks[j]!, marks[i]!];
  }

  return marks;
}

/** Irregular cotton-ball dab — clustered soft lobes, never a perfect circle. */
function drawCottonDab(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
  alpha: number,
  seed: number,
) {
  const rand = mulberry32(seed);
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.fillStyle = "rgba(0,0,0,1)";

  const lobes = 5 + Math.floor(rand() * 4);
  for (let i = 0; i < lobes; i++) {
    const angle = (i / lobes) * Math.PI * 2 + rand() * 0.9;
    const dist = rand() * size * 0.42;
    const rx = size * (0.22 + rand() * 0.38);
    const ry = size * (0.18 + rand() * 0.42);
    const lobeRot = rand() * Math.PI;
    ctx.globalAlpha = alpha * (0.28 + rand() * 0.42);
    ctx.beginPath();
    ctx.ellipse(Math.cos(angle) * dist, Math.sin(angle) * dist, rx, ry, lobeRot, 0, Math.PI * 2);
    ctx.fill();
  }

  // Soft fibrous core with slight squeeze — reads as cotton, not a stamp.
  ctx.globalAlpha = alpha * (0.45 + rand() * 0.35);
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.42, size * 0.34, rand() * 0.6, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function pointOnStroke(stroke: SweepStroke, t: number) {
  const { x, y, angle, length, curve } = stroke;
  const endX = x + Math.cos(angle) * length;
  const endY = y + Math.sin(angle) * length;
  const cpX = x + Math.cos(angle) * length * 0.5 + Math.sin(angle) * length * curve;
  const cpY = y + Math.sin(angle) * length * 0.5 - Math.cos(angle) * length * curve;
  const u = 1 - t;
  return {
    x: u * u * x + 2 * u * t * cpX + t * t * endX,
    y: u * u * y + 2 * u * t * cpY + t * t * endY,
  };
}

/** Sweeping brush stroke built from overlapping cotton dabs along a curved path. */
function drawSweepStroke(
  ctx: CanvasRenderingContext2D,
  stroke: SweepStroke,
  partial: number,
) {
  const rand = mulberry32(stroke.seed);
  const steps = Math.max(4, Math.floor((stroke.length / 5) * partial));
  const dabSpacing = stroke.length / steps;

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * partial;
    const pt = pointOnStroke(stroke, t);
    const taper = Math.sin(t * Math.PI);
    const pressure = 0.35 + taper * 0.65;
    const width = stroke.width * pressure * (0.75 + rand() * 0.35);
    const dabAngle = stroke.angle + (rand() - 0.5) * 1.1 + t * stroke.curve * 0.4;
    const jitterX = (rand() - 0.5) * dabSpacing * 0.35;
    const jitterY = (rand() - 0.5) * dabSpacing * 0.35;

    drawCottonDab(
      ctx,
      pt.x + jitterX,
      pt.y + jitterY,
      width,
      dabAngle,
      0.42 + taper * 0.38,
      stroke.seed + i * 97,
    );
  }
}

function drawMark(ctx: CanvasRenderingContext2D, mark: RevealMark, partial = 1) {
  if (mark.kind === "dab") {
    drawCottonDab(
      ctx,
      mark.x,
      mark.y,
      mark.size * (0.35 + partial * 0.65),
      mark.rotation,
      0.55 + partial * 0.45,
      mark.seed,
    );
    return;
  }
  drawSweepStroke(ctx, mark, partial);
}

export function paintReveal(
  ctx: CanvasRenderingContext2D,
  marks: RevealMark[],
  progress: number,
  coverColor: string,
) {
  const { width, height } = ctx.canvas;
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = coverColor;
  ctx.fillRect(0, 0, width, height);

  const revealCount = Math.floor(progress * marks.length);
  if (revealCount === 0 && progress <= 0) return;

  ctx.globalCompositeOperation = "destination-out";

  for (let i = 0; i < revealCount; i++) {
    drawMark(ctx, marks[i]!);
  }

  const partial = progress * marks.length - revealCount;
  if (partial > 0 && revealCount < marks.length) {
    drawMark(ctx, marks[revealCount]!, partial);
  }

  ctx.globalCompositeOperation = "source-over";
}
