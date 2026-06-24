import type { BoardDefinition, BoardObject, DifficultySettings } from '../types';
import { isBoundsConfigured, pointInBounds } from './hitShape';

export { getHintArea } from './hitShape';

export function getObjectDisplayName(
  obj: BoardObject,
  t: (key: string) => string,
): string {
  if (obj.displayName?.trim()) return obj.displayName.trim();
  return t(obj.labelKey);
}

export function isObjectConfigured(obj: BoardObject): boolean {
  return isBoundsConfigured(obj.bounds);
}

export function selectObjectsForBoard(
  board: BoardDefinition,
  difficulty: DifficultySettings,
  activeStandardIds?: string[],
): BoardObject[] {
  const specials = board.objects.filter((o) => o.type === 'special' && isObjectConfigured(o));
  const easterEgg = board.objects.find((o) => o.type === 'easter_egg' && isObjectConfigured(o));
  const standards = board.objects.filter((o) => o.type === 'standard' && isObjectConfigured(o));

  let selectedStandards: BoardObject[];

  if (activeStandardIds && activeStandardIds.length > 0) {
    const byId = new Map(standards.map((o) => [o.id, o]));
    selectedStandards = activeStandardIds
      .map((id) => byId.get(id))
      .filter((o): o is BoardObject => o != null);
  } else {
    const standardCount = Math.max(
      0,
      Math.min(difficulty.objectCount, standards.length),
    );
    selectedStandards = standards.slice(0, standardCount);
  }

  const result: BoardObject[] = [...specials, ...selectedStandards];
  if (easterEgg) result.push(easterEgg);
  return result;
}

export function getActiveListObjects(objects: BoardObject[]): BoardObject[] {
  return objects.filter((o) => o.type !== 'easter_egg');
}

export function hitTest(
  sceneX: number,
  sceneY: number,
  objects: BoardObject[],
  foundIds: Set<string>,
): BoardObject | null {
  for (let i = objects.length - 1; i >= 0; i--) {
    const obj = objects[i];
    if (foundIds.has(obj.id)) continue;
    if (!isObjectConfigured(obj)) continue;
    if (pointInBounds(sceneX, sceneY, obj.bounds)) {
      return obj;
    }
  }
  return null;
}

export function pickHintTarget(
  objects: BoardObject[],
  foundIds: Set<string>,
): BoardObject | null {
  const unfound = objects.filter(
    (o) => !foundIds.has(o.id) && o.type !== 'easter_egg',
  );
  if (unfound.length === 0) return null;
  return unfound[Math.floor(Math.random() * unfound.length)] ?? null;
}

