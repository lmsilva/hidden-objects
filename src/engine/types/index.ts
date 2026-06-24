export type DifficultyPreset = 'relaxed' | 'normal' | 'hard' | 'custom';

export type TimeMode = 'none' | 'soft' | 'strict';

export type MissPenaltyMode = 'none' | 'spam' | 'every';

export interface DifficultySettings {
  preset: DifficultyPreset;
  objectCount: number;
  timeMode: TimeMode;
  parTimeSeconds: number;
  missPenalty: MissPenaltyMode;
  hintCooldownSeconds: number;
  hintPenalty: number;
  panZoomEnabled: boolean;
}

export type ObjectType = 'standard' | 'special' | 'easter_egg';

export type ScenePoint = [number, number];

export interface HitBounds {
  x: number;
  y: number;
  width: number;
  height: number;
  /** Polygon vertices in scene space (clockwise). Min 3 points for non-rect shapes. */
  polygon?: ScenePoint[];
  /** @deprecated Use polygon. Still read for older tuner exports. */
  quad?: [ScenePoint, ScenePoint, ScenePoint, ScenePoint];
}

export interface BoardObject {
  id: string;
  labelKey: string;
  /** Overrides i18n labelKey when set (e.g. from hit-area tuner). */
  displayName?: string;
  type: ObjectType;
  bounds: HitBounds;
  evidence?: boolean;
  lostProperty?: boolean;
  /** Progress tracking when this find counts as a map fragment or brass token. */
  collectibleRole?: 'fragment' | 'collectible';
}

export interface BoardDefinition {
  id: string;
  chapterId: string;
  /** Composited hidden-object scene (objects baked into image). 1920×1080. */
  background: string;
  backgroundColor?: string;
  /** All objects in scene pool (standards + specials + easter egg). */
  objects: BoardObject[];
  /** Target pool size for art generation (default 30). */
  poolTarget?: number;
  storyTriggerObjectId?: string;
}

export interface ChapterDefinition {
  id: string;
  stationKey: string;
  boardIds: string[];
  letterKey: string;
  completeStoryKey: string;
  artTier: 'green' | 'yellow' | 'red';
  mvp: boolean;
}

export interface StationMapNode {
  id: string;
  chapterId: string;
  labelKey: string;
  x: number;
  y: number;
  lineColor: string;
  mvp: boolean;
}

export interface MapLineSegment {
  from: string;
  to: string;
  chapterUnlock: string;
}

export interface AdventureManifest {
  id: string;
  version: string;
  titleKey: string;
  taglineKey: string;
  specialCollectibleKeys: [string, string];
  chapters: ChapterDefinition[];
  stations: StationMapNode[];
  lineSegments: MapLineSegment[];
  totalStations: number;
}

export interface CreditEntry {
  name: string;
  creator: string;
  url: string;
  license: string;
  attributionRequired: boolean;
  usedIn: string[];
}

export interface CreditsFile {
  adventureId: string;
  assets: CreditEntry[];
}

export interface BoardProgress {
  boardId: string;
  completed: boolean;
  bestScore: number;
  foundObjectIds: string[];
  brakemanFound: boolean;
  hintsUsed: number;
  bestTimeSeconds: number | null;
}

export interface ChapterProgress {
  chapterId: string;
  unlocked: boolean;
  completed: boolean;
  letterRead: boolean;
  boards: Record<string, BoardProgress>;
}

export interface GameSave {
  version: number;
  adventureId: string;
  difficulty: DifficultySettings;
  totalScore: number;
  totalPlayTimeSeconds: number;
  mapFragmentsCollected: number;
  brassTokensCollected: number;
  brakemanSightings: number;
  /** Milestone thresholds already rewarded (e.g. 3, 6, 9). */
  brakemanMilestonesAwarded: number[];
  brakemanMvpRewardClaimed: boolean;
  brakemanFullRewardClaimed: boolean;
  /** Opening story shown once after New Game. */
  prologueSeen: boolean;
  /** True after the player chooses New Game; settings-only saves stay false. */
  gameStarted: boolean;
  /** Per-board find list for the current visit (standard object ids). */
  boardFindLists?: Record<string, string[]>;
  /** In-progress gameplay sessions (resume if player leaves mid-board). */
  activeBoardSessions?: Record<string, PersistedBoardSession>;
  chapters: Record<string, ChapterProgress>;
  audio: {
    musicEnabled: boolean;
    sfxEnabled: boolean;
    musicVolume: number;
  };
  lastPlayedAt: string;
}

export interface BoardSession {
  boardId: string;
  score: number;
  foundIds: Set<string>;
  misses: number;
  hintsUsed: number;
  hintCooldownRemaining: number;
  startedAt: number;
  elapsedSeconds: number;
  spamStrikes: number;
  combo: number;
  lastFindAt: number | null;
  lastClickAt: number | null;
  recentClicks: number[];
}

/** JSON-safe board session stored in GameSave.activeBoardSessions. */
export interface PersistedBoardSession {
  boardId: string;
  score: number;
  foundIds: string[];
  misses: number;
  hintsUsed: number;
  hintCooldownRemaining: number;
  startedAt: number;
  elapsedSeconds: number;
  spamStrikes: number;
  combo: number;
  lastFindAt: number | null;
  lastClickAt: number | null;
  recentClicks: number[];
}
