import type {
  AdventureManifest,
  BoardProgress,
  BoardSession,
  ChapterProgress,
  GameSave,
} from '../types';
import type { BoardDefinition } from '../types';
import {
  calcBrakemanCollectionBonuses,
  countBrakemanSightings,
} from './brakeman';
import { clearActiveBoardSession } from './boardSelections';

export function ensureChapter(save: GameSave, chapterId: string): ChapterProgress {
  if (!save.chapters[chapterId]) {
    save.chapters[chapterId] = {
      chapterId,
      unlocked: false,
      completed: false,
      letterRead: false,
      boards: {},
    };
  }
  return save.chapters[chapterId];
}

export function getBoardProgress(
  save: GameSave,
  boardId: string,
  chapterId: string,
): BoardProgress {
  const chapter = ensureChapter(save, chapterId);
  if (!chapter.boards[boardId]) {
    chapter.boards[boardId] = {
      boardId,
      completed: false,
      bestScore: 0,
      foundObjectIds: [],
      brakemanFound: false,
      hintsUsed: 0,
      bestTimeSeconds: null,
    };
  }
  return chapter.boards[boardId];
}

export function isChapterComplete(
  manifest: AdventureManifest,
  chapterId: string,
  save: GameSave,
): boolean {
  const chapter = manifest.chapters.find((c) => c.id === chapterId);
  if (!chapter) return false;
  const progress = save.chapters[chapterId];
  if (!progress) return false;
  return chapter.boardIds.every((id) => progress.boards[id]?.completed);
}

export function applyBoardCompletion(
  save: GameSave,
  manifest: AdventureManifest,
  board: BoardDefinition,
  session: BoardSession,
  finalScore: number,
): GameSave {
  const next: GameSave = structuredClone(save);
  const chapter = ensureChapter(next, board.chapterId);
  const bp = getBoardProgress(next, board.id, board.chapterId);
  const firstCompletion = !bp.completed;

  const foundIds = [...session.foundIds];
  const brakemanFoundNow = session.foundIds.has('easter_egg_brakeman');
  const brakemanNewOnBoard = brakemanFoundNow && !bp.brakemanFound;

  let bonusScore = 0;

  if (firstCompletion) {
    if (session.foundIds.has('special_map_fragment')) {
      next.mapFragmentsCollected += 1;
    }
    if (session.foundIds.has('special_brass_token')) {
      next.brassTokensCollected += 1;
    }
  }

  chapter.boards[board.id] = {
    ...bp,
    completed: true,
    foundObjectIds: foundIds,
    brakemanFound: bp.brakemanFound || brakemanFoundNow,
    hintsUsed: session.hintsUsed,
    bestTimeSeconds:
      bp.bestTimeSeconds === null
        ? session.elapsedSeconds
        : Math.min(bp.bestTimeSeconds, session.elapsedSeconds),
  };

  if (brakemanNewOnBoard) {
    const rewards = calcBrakemanCollectionBonuses(next, true);
    bonusScore += rewards.bonus;
    if (rewards.milestone !== null) {
      next.brakemanMilestonesAwarded.push(rewards.milestone);
    }
    if (rewards.mvpComplete) {
      next.brakemanMvpRewardClaimed = true;
    }
    if (rewards.fullComplete) {
      next.brakemanFullRewardClaimed = true;
    }
  }

  const scoreWithBrakemanBonus = finalScore + bonusScore;
  chapter.boards[board.id]!.bestScore = Math.max(
    bp.bestScore,
    scoreWithBrakemanBonus,
  );
  next.brakemanSightings = countBrakemanSightings(next);
  next.totalScore += Math.max(0, scoreWithBrakemanBonus - bp.bestScore);

  if (isChapterComplete(manifest, board.chapterId, next)) {
    chapter.completed = true;
    const idx = manifest.chapters.findIndex((c) => c.id === board.chapterId);
    const nextChapter = manifest.chapters[idx + 1];
    if (nextChapter) {
      ensureChapter(next, nextChapter.id).unlocked = true;
    }
  } else {
    const chapterDef = manifest.chapters.find((c) => c.id === board.chapterId);
    const boardIdx = chapterDef?.boardIds.indexOf(board.id) ?? -1;
    if (boardIdx >= 0 && chapterDef && boardIdx < chapterDef.boardIds.length - 1) {
      getBoardProgress(next, chapterDef.boardIds[boardIdx + 1]!, board.chapterId);
    }
  }

  return clearActiveBoardSession(next, board.id);
}

export function getMapRestorePercent(save: GameSave, mvpStationCount: number): number {
  const completed = Object.values(save.chapters).filter((c) => c.completed).length;
  return Math.round((completed / mvpStationCount) * 100);
}

export function isStationUnlocked(
  save: GameSave,
  chapterId: string,
  mvp: boolean,
): boolean {
  if (!mvp) return false;
  const ch = save.chapters[chapterId];
  return ch?.unlocked ?? false;
}
