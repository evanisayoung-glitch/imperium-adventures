export type BrushStroke = {
  x: number;
  y: number;
  angle: number;
  length: number;
  width: number;
  curve: number;
};

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

export function generateBrushStrokes(
  width: number,
  height: number,
  count: number,
  seed: number,
): BrushStroke[] {
  const rand = mulberry32(seed);
  const strokes: BrushStroke[] = [];

  for (let i = 0; i < count; i++) {
    strokes.push({
      x: rand() * width,
      y: rand() * height,
      angle: rand() * Math.PI * 2,
      length: 18 + rand() * 72,
      width: 6 + rand() * 22,
      curve: (rand() - 0.5) * 0.6,
    });
  }

  // Fisher–Yates shuffle with seeded random for stable reveal order.
  for (let i = strokes.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [strokes[i], strokes[j]] = [strokes[j]!, strokes[i]!];
  }

  return strokes;
}

export function drawStroke(
  ctx: CanvasRenderingContext2D,
  stroke: BrushStroke,
  alpha = 1,
) {
  const { x, y, angle, length, width, curve } = stroke;
  const endX = x + Math.cos(angle) * length;
  const endY = y + Math.sin(angle) * length;
  const cpX = x + Math.cos(angle) * length * 0.5 + Math.sin(angle) * length * curve;
  const cpY = y + Math.sin(angle) * length * 0.5 - Math.cos(angle) * length * curve;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(cpX, cpY, endX, endY);
  ctx.stroke();
  ctx.restore();
}

export function paintReveal(
  ctx: CanvasRenderingContext2D,
  strokes: BrushStroke[],
  progress: number,
  coverColor: string,
) {
  const { width, height } = ctx.canvas;
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = coverColor;
  ctx.fillRect(0, 0, width, height);

  const revealCount = Math.floor(progress * strokes.length);
  if (revealCount === 0) return;

  ctx.globalCompositeOperation = "destination-out";
  ctx.strokeStyle = "rgba(0,0,0,1)";

  for (let i = 0; i < revealCount; i++) {
    drawStroke(ctx, strokes[i]!);
  }

  // Partial stroke on the leading edge for a softer paint-in feel.
  const partial = progress * strokes.length - revealCount;
  if (partial > 0 && revealCount < strokes.length) {
    drawStroke(ctx, strokes[revealCount]!, partial);
  }

  ctx.globalCompositeOperation = "source-over";
}
