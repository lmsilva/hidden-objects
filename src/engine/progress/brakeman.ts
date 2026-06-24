import type { GameSave } from '../types';

/** Total boards in full game (25 stops × ~4 boards — collection tracks unique board sightings). */
export const BRAKEMAN_COLLECTION_TOTAL = 25;

/** MVP playable boards (3 chapters × 3). */
export const BRAKEMAN_MVP_BOARDS = 9;

export const BRAKEMAN_REWARDS = {
  pointsPerFirstFind: 50,
  milestoneBonus: 250,
  mvpCompleteBonus: 500,
  fullCompleteBonus: 2000,
  milestones: [3, 6, 9, 12, 15, 18, 21, 25] as const,
};

export function countBrakemanSightings(save: GameSave): number {
  let n = 0;
  for (const chapter of Object.values(save.chapters)) {
    for (const board of Object.values(chapter.boards)) {
      if (board.brakemanFound) n += 1;
    }
  }
  return n;
}

export function syncBrakemanSightings(save: GameSave): GameSave {
  return { ...save, brakemanSightings: countBrakemanSightings(save) };
}

export function getNextMilestone(count: number): number | null {
  for (const m of BRAKEMAN_REWARDS.milestones) {
    if (count < m) return m;
  }
  return null;
}

export function isMilestone(count: number): boolean {
  return (BRAKEMAN_REWARDS.milestones as readonly number[]).includes(count);
}

export function isMvpCollectionComplete(save: GameSave): boolean {
  return countBrakemanSightings(save) >= BRAKEMAN_MVP_BOARDS;
}

export function calcBrakemanCollectionBonuses(
  save: GameSave,
  brakemanNewOnBoard: boolean,
): {
  bonus: number;
  milestone: number | null;
  mvpComplete: boolean;
  fullComplete: boolean;
} {
  if (!brakemanNewOnBoard) {
    return { bonus: 0, milestone: null, mvpComplete: false, fullComplete: false };
  }

  const count = countBrakemanSightings(save);
  let bonus = 0;
  let milestone: number | null = null;
  let mvpComplete = false;
  let fullComplete = false;

  if (isMilestone(count) && !save.brakemanMilestonesAwarded.includes(count)) {
    milestone = count;
    bonus += BRAKEMAN_REWARDS.milestoneBonus;
  }
  if (
    count >= BRAKEMAN_MVP_BOARDS &&
    !save.brakemanMvpRewardClaimed &&
    isMvpCollectionComplete(save)
  ) {
    mvpComplete = true;
    bonus += BRAKEMAN_REWARDS.mvpCompleteBonus;
  }
  if (isFullCollectionComplete(save) && !save.brakemanFullRewardClaimed) {
    fullComplete = true;
    bonus += BRAKEMAN_REWARDS.fullCompleteBonus;
  }

  return { bonus, milestone, mvpComplete, fullComplete };
}

export function isFullCollectionComplete(save: GameSave): boolean {
  return countBrakemanSightings(save) >= BRAKEMAN_COLLECTION_TOTAL;
}
