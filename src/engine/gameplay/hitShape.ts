import type { HitBounds, ScenePoint } from '../types';

export function isBoundsConfigured(bounds: HitBounds): boolean {
  return bounds.width > 0 && bounds.height > 0;
}

export function rectToPolygon(
  x: number,
  y: number,
  width: number,
  height: number,
): ScenePoint[] {
  return [
    [x, y],
    [x + width, y],
    [x + width, y + height],
    [x, y + height],
  ];
}

/** Reads polygon, legacy quad, or falls back to axis-aligned rect. */
export function getPolygon(bounds: HitBounds): ScenePoint[] | null {
  const poly = bounds.polygon ?? bounds.quad;
  if (poly && poly.length >= 3) return poly;
  if (!isBoundsConfigured(bounds)) return null;
  return rectToPolygon(bounds.x, bounds.y, bounds.width, bounds.height);
}

export function syncAabbFromPolygon(bounds: HitBounds): void {
  const poly = getPolygon(bounds);
  if (!poly || poly.length < 3) return;
  const xs = poly.map((p) => p[0]);
  const ys = poly.map((p) => p[1]);
  bounds.x = Math.min(...xs);
  bounds.y = Math.min(...ys);
  bounds.width = Math.max(...xs) - bounds.x;
  bounds.height = Math.max(...ys) - bounds.y;
}

export function pointInPolygon(px: number, py: number, points: ScenePoint[]): boolean {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [xi, yi] = points[i]!;
    const [xj, yj] = points[j]!;
    const intersects =
      yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

export function pointInBounds(px: number, py: number, bounds: HitBounds): boolean {
  if (!isBoundsConfigured(bounds)) return false;
  const poly = getPolygon(bounds);
  if (poly) return pointInPolygon(px, py, poly);
  return (
    px >= bounds.x &&
    px <= bounds.x + bounds.width &&
    py >= bounds.y &&
    py <= bounds.y + bounds.height
  );
}

export function getHintArea(bounds: HitBounds) {
  const padX = bounds.width * 2;
  const padY = bounds.height * 2;
  return {
    x: bounds.x + bounds.width / 2 - padX / 2,
    y: bounds.y + bounds.height / 2 - padY / 2,
    width: padX,
    height: padY,
  };
}

export function devHitClipPath(bounds: HitBounds): string | undefined {
  const poly = getPolygon(bounds);
  if (!poly || bounds.width <= 0 || bounds.height <= 0) return undefined;
  const pts = poly
    .map(
      ([qx, qy]) =>
        `${((qx - bounds.x) / bounds.width) * 100}% ${((qy - bounds.y) / bounds.height) * 100}%`,
    )
    .join(', ');
  return `polygon(${pts})`;
}

/** Scene-space center for find effects. */
export function objectCenter(bounds: HitBounds): { x: number; y: number } {
  const poly = getPolygon(bounds);
  if (poly && poly.length > 0) {
    const x = poly.reduce((sum, p) => sum + p[0], 0) / poly.length;
    const y = poly.reduce((sum, p) => sum + p[1], 0) / poly.length;
    return { x, y };
  }
  return {
    x: bounds.x + bounds.width / 2,
    y: bounds.y + bounds.height / 2,
  };
}

/** Scene-space size for a found-object mark, scaled to the hit area. */
export function objectMarkSize(bounds: HitBounds): number {
  const base = Math.max(bounds.width, bounds.height) * 0.72;
  return Math.min(96, Math.max(28, base));
}
