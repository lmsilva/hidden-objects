import type { BoardDefinition, BoardSession, DifficultySettings, GameSave } from '../types';
import { createBoardSession, restoreBoardSession } from '../gameplay/scoring';
import {
  clearActiveBoardSession,
  createBoardFindList,
  getBoardFindList,
  setBoardFindList,
} from './boardSelections';
import { getBoardProgress } from './helpers';

export type BoardPlayBootstrap = {
  save: GameSave;
  session: BoardSession;
  continued: boolean;
};

function canResumeBoard(
  save: GameSave,
  board: BoardDefinition,
): boolean {
  const progress = getBoardProgress(save, board.id, board.chapterId);
  if (progress.completed) return false;

  const persisted = save.activeBoardSessions?.[board.id];
  if (!persisted || persisted.foundIds.length === 0) return false;

  const savedList = getBoardFindList(save, board.id);
  if (!savedList?.length) return false;

  // Only resume when every found id belongs to the current find list for this visit.
  return persisted.foundIds.every((id) => savedList.includes(id));
}

/** Prepare save + session when entering a board (fresh roll or resume in-progress). */
export function bootstrapBoardPlay(
  save: GameSave,
  board: BoardDefinition,
  difficulty: DifficultySettings,
): BoardPlayBootstrap {
  const persisted = save.activeBoardSessions?.[board.id];

  if (canResumeBoard(save, board) && persisted) {
    return {
      save,
      session: restoreBoardSession(persisted, difficulty),
      continued: true,
    };
  }

  const previousList = getBoardFindList(save, board.id);
  const findList = createBoardFindList(board, difficulty, { previousList });
  let next = setBoardFindList(save, board.id, findList);
  next = clearActiveBoardSession(next, board.id);

  const session: BoardSession = {
    ...createBoardSession(board.id),
    hintCooldownRemaining: difficulty.hintCooldownSeconds,
  };

  return { save: next, session, continued: false };
}

export function hasBoardFindList(save: GameSave, boardId: string): boolean {
  const list = getBoardFindList(save, boardId);
  return list != null && list.length > 0;
}
