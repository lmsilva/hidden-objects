import type { GameSave, MapLineSegment, StationMapNode } from '@engine/types';

/** Manhattan-style subway path between two stations. */
export function subwayPathD(
  from: { x: number; y: number },
  to: { x: number; y: number },
): string {
  const midX = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} H ${midX} V ${to.y} H ${to.x}`;
}

export function isSegmentActive(save: GameSave, seg: MapLineSegment): boolean {
  const ch = save.chapters[seg.chapterUnlock];
  return !!(ch?.unlocked || ch?.completed);
}

export function segmentStroke(
  save: GameSave,
  seg: MapLineSegment,
  toStation: StationMapNode,
): {
  stroke: string;
  strokeWidth: number;
  strokeDasharray?: string;
  opacity: number;
} {
  const active = isSegmentActive(save, seg);
  return {
    stroke: active ? toStation.lineColor : '#7d8fa3',
    strokeWidth: active ? 8 : 5,
    strokeDasharray: active ? undefined : '12 8',
    opacity: active ? 1 : 0.65,
  };
}

export function labelAnchor(station: StationMapNode): { x: number; y: number } {
  const below = station.y + 26;
  const above = station.y - 14;
  return { x: station.x, y: below > 360 ? above : below };
}
