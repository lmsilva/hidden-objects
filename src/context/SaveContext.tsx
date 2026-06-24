import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { DifficultySettings, GameSave } from '@engine/types';
import {
  createInitialSave,
  exportSaveJson,
  importSaveJson,
  loadSave,
  writeSave,
} from '@engine/save/persistence';
import { clearAllAppData } from '@engine/save/clearAppData';
import { lostLineManifest } from '@adventures/the-lost-line';
import { allBoards } from '@adventures/the-lost-line/boards/index';
import { applyDifficultyToFindLists } from '@engine/progress/boardSelections';

interface SaveContextValue {
  save: GameSave | null;
  ready: boolean;
  /** Saved preferences and/or progress exist on disk. */
  hasSave: boolean;
  /** Player started a run (New Game) — show Continue on main menu. */
  canContinue: boolean;
  updateSave: (updater: (prev: GameSave) => GameSave) => Promise<void>;
  startNewGame: () => Promise<void>;
  resetProgress: () => Promise<void>;
  clearAllCacheAndData: () => Promise<void>;
  exportSave: () => string | null;
  importSave: (json: string) => Promise<void>;
  setDifficulty: (difficulty: DifficultySettings) => Promise<void>;
}

const SaveContext = createContext<SaveContextValue | null>(null);

const ADVENTURE_ID = lostLineManifest.id;

export function SaveProvider({ children }: { children: ReactNode }) {
  const [save, setSave] = useState<GameSave | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void (async () => {
      const existing = await loadSave(ADVENTURE_ID);
      setSave(existing);
      setReady(true);
    })();
  }, []);

  const persist = useCallback(async (next: GameSave) => {
    setSave(next);
    await writeSave(next);
  }, []);

  const updateSave = useCallback(
    async (updater: (prev: GameSave) => GameSave) => {
      setSave((prev) => {
        const base = prev ?? createInitialSave(ADVENTURE_ID);
        const next = updater(base);
        void writeSave(next);
        return next;
      });
    },
    [],
  );

  const startNewGame = useCallback(async () => {
    await persist(createInitialSave(ADVENTURE_ID, { gameStarted: true }));
  }, [persist]);

  const resetProgress = useCallback(async () => {
    const gameStarted = save?.gameStarted ?? false;
    await persist(createInitialSave(ADVENTURE_ID, { gameStarted }));
  }, [persist, save?.gameStarted]);

  const clearAllCacheAndData = useCallback(async () => {
    await clearAllAppData(ADVENTURE_ID);
    setSave(null);
    const base = import.meta.env.BASE_URL.replace(/\/$/, '') || '';
    window.location.href = `${base}/`;
  }, []);

  const exportSave = useCallback(() => {
    return save ? exportSaveJson(save) : null;
  }, [save]);

  const importSave = useCallback(
    async (json: string) => {
      const parsed = importSaveJson(json);
      if (parsed.adventureId !== ADVENTURE_ID) {
        throw new Error('Save is for a different adventure');
      }
      await persist(parsed);
    },
    [persist],
  );

  const setDifficulty = useCallback(
    async (difficulty: DifficultySettings) => {
      await updateSave((prev) =>
        applyDifficultyToFindLists(prev, allBoards, difficulty),
      );
    },
    [updateSave],
  );

  const value = useMemo<SaveContextValue>(
    () => ({
      save,
      ready,
      hasSave: save !== null,
      canContinue: save?.gameStarted === true,
      updateSave,
      startNewGame,
      resetProgress,
      clearAllCacheAndData,
      exportSave,
      importSave,
      setDifficulty,
    }),
    [
      save,
      ready,
      updateSave,
      startNewGame,
      resetProgress,
      clearAllCacheAndData,
      exportSave,
      importSave,
      setDifficulty,
    ],
  );

  return <SaveContext.Provider value={value}>{children}</SaveContext.Provider>;
}

export function useSave() {
  const ctx = useContext(SaveContext);
  if (!ctx) throw new Error('useSave must be used within SaveProvider');
  return ctx;
}
