import manifestJson from './manifest.json';
import type { AdventureManifest } from '@engine/types';

export const lostLineManifest = manifestJson as AdventureManifest;

export { allBoards, boardMap } from './boards';
export { default as credits } from './credits.json';
