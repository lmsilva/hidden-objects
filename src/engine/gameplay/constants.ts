import type { DifficultyPreset, DifficultySettings } from '../types';

export const DIFFICULTY_PRESETS: Record<
  Exclude<DifficultyPreset, 'custom'>,
  Omit<DifficultySettings, 'preset'>
> = {
  relaxed: {
    objectCount: 8,
    timeMode: 'none',
    parTimeSeconds: 300,
    missPenalty: 'spam',
    hintCooldownSeconds: 45,
    hintPenalty: 100,
    panZoomEnabled: true,
  },
  normal: {
    objectCount: 10,
    timeMode: 'soft',
    parTimeSeconds: 240,
    missPenalty: 'spam',
    hintCooldownSeconds: 60,
    hintPenalty: 150,
    panZoomEnabled: true,
  },
  hard: {
    objectCount: 12,
    timeMode: 'strict',
    parTimeSeconds: 180,
    missPenalty: 'every',
    hintCooldownSeconds: 90,
    hintPenalty: 250,
    panZoomEnabled: true,
  },
};

export function createDifficultyFromPreset(preset: DifficultyPreset): DifficultySettings {
  if (preset === 'custom') {
    return { preset: 'custom', ...DIFFICULTY_PRESETS.normal };
  }
  return { preset, ...DIFFICULTY_PRESETS[preset] };
}

export function getPresetSummaryKey(preset: Exclude<DifficultyPreset, 'custom'>): string {
  return `settings.difficulty.${preset}.summary`;
}

export const SCORE = {
  STANDARD_FIND: 100,
  SPECIAL_FIND: 250,
  EASTER_EGG: 50,
  SPEED_BONUS: 25,
  SPEED_THRESHOLD_SEC: 30,
  COMBO_BONUS: 50,
  COMBO_THRESHOLD: 3,
  MISS_PENALTY: 10,
  SPAM_BURST_PENALTY: 50,
  SPAM_CLICK_COUNT: 6,
  SPAM_WINDOW_MS: 2000,
  /** After this idle gap, miss-click spam tracking resets so the next tap is not penalized. */
  SPAM_IDLE_RESET_MS: 3500,
  SPAM_HIT_RATE: 0.2,
  BOARD_NO_HINT_BONUS: 500,
  BOARD_ALL_SPECIALS_BONUS: 300,
  BOARD_UNDER_PAR_BONUS: 200,
} as const;

export const CAMERA = {
  MIN_ZOOM: 1,
  MAX_ZOOM: 2.5,
  ZOOM_STEP: 0.15,
  WHEEL_SENSITIVITY: 0.001,
} as const;
