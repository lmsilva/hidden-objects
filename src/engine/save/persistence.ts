import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { GameSave } from '../types';
import { createDifficultyFromPreset } from '../gameplay/constants';
const DB_NAME = 'hidden-objects-save';
const DB_VERSION = 1;
const STORE = 'saves';

interface SaveDB extends DBSchema {
  [STORE]: {
    key: string;
    value: GameSave;
  };
}

let dbPromise: Promise<IDBPDatabase<SaveDB>> | null = null;

function getDb() {
  if (!dbPromise) {
    dbPromise = openDB<SaveDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        db.createObjectStore(STORE);
      },
    });
  }
  return dbPromise;
}

export const SAVE_VERSION = 1;

export function createInitialSave(
  adventureId: string,
  options?: { gameStarted?: boolean },
): GameSave {
  const difficulty = createDifficultyFromPreset('normal');
  return {
    version: SAVE_VERSION,
    adventureId,
    difficulty,
    boardFindLists: {},
    activeBoardSessions: {},
    totalScore: 0,
    totalPlayTimeSeconds: 0,
    mapFragmentsCollected: 0,
    brassTokensCollected: 0,
    brakemanSightings: 0,
    brakemanMilestonesAwarded: [],
    brakemanMvpRewardClaimed: false,
    brakemanFullRewardClaimed: false,
    prologueSeen: false,
    gameStarted: options?.gameStarted ?? false,
    chapters: {
      ch01: {
        chapterId: 'ch01',
        unlocked: true,
        completed: false,
        letterRead: false,
        boards: {},
      },
    },
    audio: {
      musicEnabled: true,
      sfxEnabled: true,
      musicVolume: 0.7,
    },
    lastPlayedAt: new Date().toISOString(),
  };
}

export async function loadSave(adventureId: string): Promise<GameSave | null> {
  const db = await getDb();
  const raw = await db.get(STORE, adventureId);
  return raw ? migrateSave(raw) : null;
}

export async function writeSave(save: GameSave): Promise<void> {
  const db = await getDb();
  await db.put(STORE, { ...save, lastPlayedAt: new Date().toISOString() }, save.adventureId);
}

export async function deleteSave(adventureId: string): Promise<void> {
  const db = await getDb();
  await db.delete(STORE, adventureId);
}

export async function deleteDatabase(): Promise<void> {
  const db = await getDb();
  db.close();
  dbPromise = null;

  await new Promise<void>((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error ?? new Error('Failed to delete database'));
    request.onblocked = () => resolve();
  });
}

export function exportSaveJson(save: GameSave): string {
  return JSON.stringify(save, null, 2);
}

export function importSaveJson(json: string): GameSave {
  const parsed = JSON.parse(json) as GameSave;
  if (!parsed.adventureId || !parsed.version) {
    throw new Error('Invalid save file');
  }
  return migrateSave(parsed);
}

function saveHasGameProgress(save: GameSave): boolean {
  return (
    save.totalScore > 0 ||
    save.mapFragmentsCollected > 0 ||
    save.brassTokensCollected > 0 ||
    save.prologueSeen ||
    Object.values(save.chapters).some(
      (ch) => ch.completed || Object.keys(ch.boards).length > 0,
    )
  );
}

function migrateSave(save: GameSave): GameSave {
  const next: GameSave = {
    ...save,
    brakemanMilestonesAwarded: save.brakemanMilestonesAwarded ?? [],
    brakemanMvpRewardClaimed: save.brakemanMvpRewardClaimed ?? false,
    brakemanFullRewardClaimed: save.brakemanFullRewardClaimed ?? false,
    brakemanSightings: save.brakemanSightings ?? 0,
  };
  if (!next.boardFindLists) {
    next.boardFindLists = {};
  }
  if (!next.activeBoardSessions) {
    next.activeBoardSessions = {};
  }
  if (next.prologueSeen == null) {
    next.prologueSeen = saveHasGameProgress(next);
  }
  if (next.gameStarted == null) {
    next.gameStarted = saveHasGameProgress(next);
  }
  return next;
}
