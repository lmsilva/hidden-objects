import type { BoardDefinition, DifficultySettings, GameSave } from '../types';
import { isBoundsConfigured } from '../gameplay/hitShape';

function defaultRng(): number {  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0]! / (0xffffffff + 1);
  }
  return Math.random();
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function listsEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((id, i) => id === sortedB[i]);
}

export function getStandardPool(board: BoardDefinition): string[] {
  return board.objects.filter((o) => o.type === 'standard').map((o) => o.id);
}

/** Standard objects with hit areas configured (playable on this board art). */
export function getPlayableStandardPool(board: BoardDefinition): string[] {
  return board.objects
    .filter((o) => o.type === 'standard' && isBoundsConfigured(o.bounds))
    .map((o) => o.id);
}

/** Random standard-object ids for one board visit. */
export function createBoardFindList(
  board: BoardDefinition,
  difficulty: DifficultySettings,
  options?: {
    rng?: () => number;
    /** Avoid repeating the previous roll when the pool allows variation. */
    previousList?: string[];
  },
): string[] {
  const rng = options?.rng ?? defaultRng;
  const pool = getPlayableStandardPool(board);
  if (pool.length === 0) return [];

  const count = Math.min(difficulty.objectCount, pool.length);
  const canVary = pool.length > count;
  const maxAttempts = canVary ? 12 : 1;
  const previousList = options?.previousList;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const list = shuffle(pool, rng).slice(0, count);
    if (!previousList?.length || !listsEqual(list, previousList)) {
      return list;
    }
  }

  return shuffle(pool, rng).slice(0, count);
}

/** Pick which standard objects are on the find list for each board (legacy bulk helper). */
export function createBoardFindLists(
  boards: BoardDefinition[],
  difficulty: DifficultySettings,
  rng: () => number = defaultRng,
): Record<string, string[]> {
  const lists: Record<string, string[]> = {};
  for (const board of boards) {
    lists[board.id] = createBoardFindList(board, difficulty, { rng });
  }
  return lists;
}
export function getBoardFindList(save: GameSave, boardId: string): string[] | undefined {
  return save.boardFindLists?.[boardId];
}

/** Re-roll find lists when difficulty changes. Lists are rolled per board visit. */
export function applyDifficultyToFindLists(
  save: GameSave,
  _boards: BoardDefinition[],
  difficulty: DifficultySettings,
): GameSave {
  return {
    ...save,
    difficulty,
    boardFindLists: {},
    activeBoardSessions: {},
  };
}

export function setBoardFindList(
  save: GameSave,
  boardId: string,
  findList: string[],
): GameSave {
  return {
    ...save,
    boardFindLists: {
      ...(save.boardFindLists ?? {}),
      [boardId]: findList,
    },
  };
}

export function clearActiveBoardSession(save: GameSave, boardId: string): GameSave {
  if (!save.activeBoardSessions?.[boardId]) return save;
  const activeBoardSessions = { ...save.activeBoardSessions };
  delete activeBoardSessions[boardId];
  return { ...save, activeBoardSessions };
}
