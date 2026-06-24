/**
 * Write canonical hit-area definitions to public/hit-areas/<boardId>.json.
 * The hit-area tuner preloads these files; import-hit-areas.mjs updates them after import.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allBoards } from '../src/adventures/the-lost-line/boards/index.ts';
import adventureEn from '../src/adventures/the-lost-line/locales/en.json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public/hit-areas');

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

function collectibleRoleFor(obj: {
  id: string;
  type: string;
  collectibleRole?: string;
}): string {
  if (obj.collectibleRole) return obj.collectibleRole;
  if (obj.id === 'special_map_fragment') return 'fragment';
  if (obj.id === 'special_brass_token') return 'collectible';
  if (obj.type === 'easter_egg') return 'brakeman';
  return 'standard';
}

function serializeObject(o: (typeof allBoards)[0]['objects'][0]) {
  const configured = isConfigured(o.bounds);
  return {
    id: o.id,
    labelKey: o.labelKey,
    displayName: o.displayName ?? labelFor(o.labelKey),
    type: o.type,
    collectibleRole: collectibleRoleFor(o),
    evidence: o.evidence ?? false,
    bounds: { ...o.bounds },
    configured,
  };
}

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

for (const board of allBoards) {
  const payload = {
    boardId: board.id,
    version: 2,
    objects: board.objects.map(serializeObject),
  };
  const outPath = path.join(OUT_DIR, `${board.id}.json`);
  fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`);
  const configured = payload.objects.filter((o) => o.configured).length;
  console.log(`Wrote ${outPath} (${configured}/${payload.objects.length} configured)`);
}
