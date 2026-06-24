import audioManifest from '@adventures/the-lost-line/audio/manifest.json';

export interface AudioTrack {
  slot: string;
  chapterId: string | null;
  boardId?: string | null;
  station: string;
  title: string;
  filename: string;
  verified: boolean;
}

export const AUDIO_BASE = `${import.meta.env.BASE_URL}adventures/the-lost-line/audio`;

export const audioTracks = audioManifest.tracks as AudioTrack[];

export function trackUrl(filename: string): string {
  return `${AUDIO_BASE}/${encodeURIComponent(filename).replace(/%2F/g, '/')}`;
}

export function getThemeTrack(): AudioTrack | undefined {
  return audioTracks.find((t) => t.slot === 'theme');
}

export function getChapterTrack(chapterId: string): AudioTrack | undefined {
  return audioTracks.find((t) => t.chapterId === chapterId);
}

/** Per-board gameplay music (filename in audio folder). */
const BOARD_MUSIC_FILES: Record<string, string> = {
  ch01_board01: 'Space Jazz.mp3',
  ch01_board02: 'Magic Escape Room.mp3',
  ch01_board03: 'That Zen Moment.mp3',
  ch02_board01: 'Parisian.mp3',
  ch02_board02: 'Evening.mp3',
  ch02_board03: 'Equatorial Complex.mp3',
  ch03_board01: 'Pensif.mp3',
  ch03_board02: 'Adventures in Adventureland.mp3',
  ch03_board03: 'Brain Dance.mp3',
};

export function getBoardTrack(boardId: string): AudioTrack | undefined {
  const filename = BOARD_MUSIC_FILES[boardId];
  const chapterId = boardId.match(/^(ch\d+)/)?.[1] ?? null;
  const chapterMeta = chapterId ? getChapterTrack(chapterId) : undefined;

  if (filename) {
    return {
      slot: boardId,
      chapterId,
      boardId,
      station: chapterMeta?.station ?? boardId,
      title: chapterMeta?.title ?? filename.replace(/\.mp3$/i, ''),
      filename,
      verified: chapterMeta?.verified ?? false,
    };
  }

  if (chapterId) return getChapterTrack(chapterId) ?? getThemeTrack();
  return getThemeTrack();
}
