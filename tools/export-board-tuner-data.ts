import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allBoards } from '../src/adventures/the-lost-line/boards/index.ts';
import adventureEn from '../src/adventures/the-lost-line/locales/en.json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function labelFor(key: string): string {
  const parts = key.split('.');
  if (parts[0] === 'objects' && parts[1]) {
    return (adventureEn.objects as Record<string, string>)[parts[1]] ?? key;
  }
  if (parts[0] === 'collectibles' && parts[1]) {
    const engine = JSON.parse(
      fs.readFileSync(path.join(ROOT, 'src/engine/i18n/locales/en.json'), 'utf8'),
    ) as { collectibles: Record<string, string> };
    return engine.collectibles[parts[1]] ?? key;
  }
  if (key === 'easter_egg.brakeman') {
    return adventureEn.easter_egg.brakeman;
  }
  return key;
}

function isConfigured(bounds: { width: number; height: number }): boolean {
  return bounds.width > 0 && bounds.height > 0;
}

const data = {
  sceneSize: { width: 1920, height: 1080 },
  boards: allBoards.map((board) => {
    const standards = board.objects.filter((o) => o.type === 'standard');
    return {
      id: board.id,
      chapterId: board.chapterId,
      background: board.background,
      poolSize: standards.length,
      targetPoolSize: 30,
      objects: board.objects.map((o) => ({
        id: o.id,
        labelKey: o.labelKey,
        displayName: o.displayName ?? labelFor(o.labelKey),
        type: o.type,
        collectibleRole:
          o.collectibleRole ??
          (o.id === 'special_map_fragment'
            ? 'fragment'
            : o.id === 'special_brass_token'
              ? 'collectible'
              : o.type === 'easter_egg'
                ? 'brakeman'
                : 'standard'),
        bounds: { ...o.bounds },
        configured: isConfigured(o.bounds),
        evidence: o.evidence ?? false,
        lostProperty: o.lostProperty ?? false,
      })),
    };
  }),
};

const out = path.join(ROOT, 'public/board-tuner-data.json');
fs.writeFileSync(out, JSON.stringify(data, null, 2));
console.log('Wrote', out, `(${data.boards.length} boards)`);
