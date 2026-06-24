import type { AdventureManifest, GameSave } from '../types';

export function getPostBoardRoute(
  boardId: string,
  save: GameSave,
  manifest: AdventureManifest,
): string {
  const chapterDef = manifest.chapters.find((c) => c.boardIds.includes(boardId));
  if (!chapterDef) return '/map';

  const idx = chapterDef.boardIds.indexOf(boardId);
  if (idx >= 0 && idx < chapterDef.boardIds.length - 1) {
    return `/play/${chapterDef.boardIds[idx + 1]!}`;
  }

  const chapterProgress = save.chapters[chapterDef.id];
  if (chapterProgress?.completed) {
    return `/story/${chapterDef.id}`;
  }
  return `/station/${chapterDef.id}`;
}

export function getNextBoardId(
  boardId: string,
  manifest: AdventureManifest,
): string | null {
  const chapterDef = manifest.chapters.find((c) => c.boardIds.includes(boardId));
  if (!chapterDef) return null;
  const idx = chapterDef.boardIds.indexOf(boardId);
  if (idx < 0 || idx >= chapterDef.boardIds.length - 1) return null;
  return chapterDef.boardIds[idx + 1] ?? null;
}
