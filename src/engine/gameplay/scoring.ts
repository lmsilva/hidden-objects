import type {
  BoardObject,
  BoardSession,
  DifficultySettings,
  PersistedBoardSession,
} from '../types';
import { SCORE } from './constants';

export function clampScore(score: number): number {
  return Math.max(0, score);
}

export function createBoardSession(boardId: string): BoardSession {
  return {
    boardId,
    score: 0,
    foundIds: new Set(),
    misses: 0,
    hintsUsed: 0,
    hintCooldownRemaining: 0,
    startedAt: Date.now(),
    elapsedSeconds: 0,
    spamStrikes: 0,
    combo: 0,
    lastFindAt: null,
    lastClickAt: null,
    recentClicks: [],
  };
}

export function serializeBoardSession(session: BoardSession): PersistedBoardSession {
  return {
    boardId: session.boardId,
    score: session.score,
    foundIds: [...session.foundIds],
    misses: session.misses,
    hintsUsed: session.hintsUsed,
    hintCooldownRemaining: session.hintCooldownRemaining,
    startedAt: session.startedAt,
    elapsedSeconds: session.elapsedSeconds,
    spamStrikes: session.spamStrikes,
    combo: session.combo,
    lastFindAt: session.lastFindAt,
    lastClickAt: session.lastClickAt,
    recentClicks: [...session.recentClicks],
  };
}

export function restoreBoardSession(
  persisted: PersistedBoardSession,
  _difficulty: DifficultySettings,
): BoardSession {
  return {
    boardId: persisted.boardId,
    score: persisted.score,
    foundIds: new Set(persisted.foundIds),
    misses: persisted.misses,
    hintsUsed: persisted.hintsUsed,
    hintCooldownRemaining: persisted.hintCooldownRemaining,
    startedAt: persisted.startedAt,
    elapsedSeconds: persisted.elapsedSeconds,
    spamStrikes: persisted.spamStrikes,
    combo: persisted.combo,
    lastFindAt: persisted.lastFindAt,
    lastClickAt: persisted.lastClickAt,
    recentClicks: [...persisted.recentClicks],
  };
}

function resetSpamIfIdle(session: BoardSession, now: number): BoardSession {
  if (
    session.lastClickAt != null &&
    now - session.lastClickAt > SCORE.SPAM_IDLE_RESET_MS
  ) {
    return { ...session, recentClicks: [], spamStrikes: 0 };
  }
  return session;
}

function isSpamClick(session: BoardSession, wasHit: boolean): boolean {
  session.recentClicks.push(wasHit ? 1 : 0);
  while (session.recentClicks.length > SCORE.SPAM_CLICK_COUNT * 2) {
    session.recentClicks.shift();
  }
  const recent = session.recentClicks.slice(-SCORE.SPAM_CLICK_COUNT);
  if (recent.length < SCORE.SPAM_CLICK_COUNT) return false;
  const hits = recent.filter(Boolean).length;
  const hitRate = hits / recent.length;
  return hitRate < SCORE.SPAM_HIT_RATE;
}

export function applyMiss(
  session: BoardSession,
  difficulty: DifficultySettings,
  now = Date.now(),
): { session: BoardSession; penalty: number } {
  let next = { ...session, foundIds: new Set(session.foundIds) };
  next = resetSpamIfIdle(next, now);
  next.lastClickAt = now;
  next.misses += 1;
  next.combo = 0;

  const spam = isSpamClick(next, false);
  let penalty = 0;
  if (difficulty.missPenalty === 'every') {
    penalty = SCORE.MISS_PENALTY;
    next.score = clampScore(next.score - penalty);
  } else if (difficulty.missPenalty === 'spam' && spam) {
    penalty = SCORE.SPAM_BURST_PENALTY;
    next.score = clampScore(next.score - penalty);
    next.spamStrikes += 1;
  }

  return { session: next, penalty };
}

export function applyFind(
  session: BoardSession,
  object: BoardObject,
  now = Date.now(),
): BoardSession {
  let next = { ...session, foundIds: new Set(session.foundIds) };
  next = resetSpamIfIdle(next, now);
  next.lastClickAt = now;
  next.foundIds.add(object.id);
  isSpamClick(next, true);

  if (object.type === 'special') {
    next.score += SCORE.SPECIAL_FIND;
  } else if (object.type === 'easter_egg') {
    next.score += SCORE.EASTER_EGG;
  } else {
    next.score += SCORE.STANDARD_FIND;
    if (
      next.lastFindAt &&
      (now - next.lastFindAt) / 1000 <= SCORE.SPEED_THRESHOLD_SEC
    ) {
      next.score += SCORE.SPEED_BONUS;
    }
    next.combo += 1;
    if (next.combo >= SCORE.COMBO_THRESHOLD) {
      next.score += SCORE.COMBO_BONUS;
    }
  }

  next.lastFindAt = now;
  return next;
}

export function applyHint(
  session: BoardSession,
  difficulty: DifficultySettings,
): BoardSession {
  return {
    ...session,
    foundIds: new Set(session.foundIds),
    hintsUsed: session.hintsUsed + 1,
    score: clampScore(session.score - difficulty.hintPenalty),
    hintCooldownRemaining: difficulty.hintCooldownSeconds,
  };
}

export function tickSession(session: BoardSession, deltaSeconds: number): BoardSession {
  const next = { ...session, foundIds: new Set(session.foundIds) };
  next.elapsedSeconds += deltaSeconds;
  if (next.hintCooldownRemaining > 0) {
    next.hintCooldownRemaining = Math.max(
      0,
      next.hintCooldownRemaining - deltaSeconds,
    );
  }
  return next;
}

export function computeBoardCompletionBonus(
  session: BoardSession,
  difficulty: DifficultySettings,
  allSpecialsFound: boolean,
): number {
  let bonus = 0;
  if (session.hintsUsed === 0) bonus += SCORE.BOARD_NO_HINT_BONUS;
  if (allSpecialsFound) bonus += SCORE.BOARD_ALL_SPECIALS_BONUS;
  if (
    difficulty.timeMode !== 'none' &&
    session.elapsedSeconds <= difficulty.parTimeSeconds
  ) {
    bonus += SCORE.BOARD_UNDER_PAR_BONUS;
  }
  if (
    difficulty.timeMode === 'strict' &&
    session.elapsedSeconds > difficulty.parTimeSeconds
  ) {
    bonus -= SCORE.BOARD_UNDER_PAR_BONUS;
  }
  return bonus;
}
