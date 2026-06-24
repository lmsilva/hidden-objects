/**
 * Merge hit-areas JSON from the tuner into board pool + index specials.
 *
 * Supports v2: { boardId, version: 2, objects: [{ id, displayName, bounds, collectibleRole, ... }] }
 * Legacy v1: { boardId, hits: { id: bounds } }
 *
 * Usage: node tools/import-hit-areas.mjs path/to/hit-areas-ch01_board01.json
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const jsonPath = process.argv[2];

if (!jsonPath) {
  console.error('Usage: node tools/import-hit-areas.mjs <hit-areas.json>');
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const { boardId } = raw;

const objects = normalizeExport(raw);
const poolFile = path.join(
  __dirname,
  `../src/adventures/the-lost-line/boards/pools/${boardId}.ts`,
);
const indexFile = path.join(__dirname, '../src/adventures/the-lost-line/boards/index.ts');

function normalizeExport(data) {
  if (Array.isArray(data.objects)) {
    return data.objects.filter((o) => o.bounds && isConfigured(o.bounds));
  }
  const list = [];
  for (const [id, bounds] of Object.entries(data.hits ?? {})) {
    list.push({ id, bounds, type: 'standard', collectibleRole: 'standard' });
  }
  return list;
}

function isConfigured(bounds) {
  return (bounds.width ?? bounds.w ?? 0) > 0 && (bounds.height ?? bounds.h ?? 0) > 0;
}

function shapePoints(b) {
  return b.polygon ?? b.quad ?? null;
}

function poolExtras(o) {
  const parts = [];
  if (o.evidence) parts.push('evidence: true');
  const poly = shapePoints(o.bounds);
  if (poly) parts.push(`polygon: ${JSON.stringify(poly)}`);
  if (o.displayName?.trim()) {
    parts.push(`displayName: ${JSON.stringify(o.displayName.trim())}`);
  }
  return parts.length ? `, { ${parts.join(', ')} }` : '';
}

function boundsArgs(b) {
  const x = b.x ?? 0;
  const y = b.y ?? 0;
  const w = b.width ?? b.w ?? 0;
  const h = b.height ?? b.h ?? 0;
  return `${x}, ${y}, ${w}, ${h}`;
}

function boardSection(source, id) {
  const marker = `id: '${id}'`;
  const start = source.indexOf(marker);
  if (start < 0) return null;
  const next = source.indexOf("\n  {\n    id: '", start + marker.length);
  const end = next > 0 ? next : source.length;
  return { start, end, text: source.slice(start, end) };
}

function replaceInBoardSection(source, id, pattern, replacement) {
  const section = boardSection(source, id);
  if (!section) return { source, count: 0 };
  const updated = section.text.replace(pattern, replacement);
  if (updated === section.text) return { source, count: 0 };
  return {
    source: source.slice(0, section.start) + updated + source.slice(section.end),
    count: 1,
  };
}

function labelKeyFor(o) {
  if (o.labelKey) return o.labelKey;
  if (o.collectibleRole === 'fragment') return 'collectibles.map_fragment';
  if (o.collectibleRole === 'collectible') return 'collectibles.brass_token';
  if (o.collectibleRole === 'brakeman' || o.type === 'easter_egg') return 'easter_egg.brakeman';
  const slug = o.id.replace(/^obj_/, '');
  return `objects.${slug}`;
}

function roleOf(o) {
  if (o.collectibleRole) return o.collectibleRole;
  if (o.id === 'special_map_fragment') return 'fragment';
  if (o.id === 'special_brass_token') return 'collectible';
  if (o.id === 'easter_egg_brakeman' || o.type === 'easter_egg') return 'brakeman';
  return 'standard';
}

const poolObjects = objects.filter((o) => roleOf(o) === 'standard');
const fragment = objects.find((o) => roleOf(o) === 'fragment');
const collectible = objects.find((o) => roleOf(o) === 'collectible');
const brakeman = objects.find((o) => roleOf(o) === 'brakeman');

let poolCount = 0;
if (fs.existsSync(poolFile)) {
  let lines = fs.readFileSync(poolFile, 'utf8').split('\n');
  const touched = new Set();

  for (const o of poolObjects) {
    const labelKey = labelKeyFor(o);
    let idx = lines.findIndex((l) => l.includes(`'${o.id}'`));
    if (idx < 0) {
      const insertAt = lines.findIndex((l) => l.includes('export const'));
      const exportLine = lines.findIndex((l) => l.startsWith('export const'));
      const closeIdx = lines.lastIndexOf('];');
      const line = `  pool('${o.id}', '${labelKey}', ${boundsArgs(o.bounds)}${poolExtras(o)}),`;
      if (closeIdx > 0) {
        lines.splice(closeIdx, 0, line);
        poolCount += 1;
        touched.add(o.id);
      }
      continue;
    }
    while (idx + 1 < lines.length && /^\s+(evidence:|displayName:|quad:|polygon:|\})/.test(lines[idx + 1])) {
      lines.splice(idx + 1, 1);
    }
    lines[idx] = `  pool('${o.id}', '${labelKey}', ${boundsArgs(o.bounds)}${poolExtras(o)}),`;
    poolCount += 1;
    touched.add(o.id);
  }

  fs.writeFileSync(poolFile, lines.join('\n'));
  console.log(`Updated ${poolCount} pool entries in ${poolFile}`);
} else if (poolObjects.length) {
  console.warn(`No pool file at ${poolFile} — skipped pool updates`);
}

let indexCount = 0;
if (fs.existsSync(indexFile)) {
  let index = fs.readFileSync(indexFile, 'utf8');

  if (brakeman) {
    const b = brakeman.bounds;
    const poly = shapePoints(b);
    const polyArg = poly ? `, ${JSON.stringify(poly)}` : '';
    const pattern = /brakeman\(\d+,\s*\d+(?:,\s*\d+,\s*\d+(?:,\s*\[[\s\S]*?\])?)?\)/;
    const result = replaceInBoardSection(
      index,
      boardId,
      pattern,
      `brakeman(${boundsArgs(b)}${polyArg})`,
    );
    index = result.source;
    indexCount += result.count;
  }

  if (fragment) {
    const b = fragment.bounds;
    const poly = shapePoints(b);
    const display = fragment.displayName?.trim();
    let call = `special('special_map_fragment', 'collectibles.map_fragment', ${boundsArgs(b)}`;
    if (poly) call += `, ${JSON.stringify(poly)}`;
    else if (display) call += `, undefined`;
    if (display) call += `, ${JSON.stringify(display)}`;
    call += ')';
    const lineRe = /special\('special_map_fragment', '[^']+', \d+, \d+, \d+, \d+(?:,\s*(?:undefined|\[[\s\S]*?\]))?(?:,\s*'[^']*')?\)/;
    const result = replaceInBoardSection(index, boardId, lineRe, call);
    index = result.source;
    indexCount += result.count;
  }

  if (collectible) {
    const b = collectible.bounds;
    const poly = shapePoints(b);
    const display = collectible.displayName?.trim();
    let call = `special('special_brass_token', 'collectibles.brass_token', ${boundsArgs(b)}`;
    if (poly) call += `, ${JSON.stringify(poly)}`;
    else if (display) call += `, undefined`;
    if (display) call += `, ${JSON.stringify(display)}`;
    call += ')';
    const lineRe = /special\('special_brass_token', '[^']+', \d+, \d+, \d+, \d+(?:,\s*(?:undefined|\[[\s\S]*?\]))?(?:,\s*'[^']*')?\)/;
    const result = replaceInBoardSection(index, boardId, lineRe, call);
    index = result.source;
    indexCount += result.count;
  }

  fs.writeFileSync(indexFile, index);
  console.log(`Updated ${indexCount} specials/brakeman in ${indexFile}`);
}

console.log(
  `Import complete for ${boardId}: ${poolObjects.length} standards, fragment=${!!fragment}, collectible=${!!collectible}, brakeman=${!!brakeman}`,
);

import { spawnSync } from 'node:child_process';
const exportScript = path.join(__dirname, 'export-hit-areas-json.ts');
const result = spawnSync('npx', ['tsx', exportScript], {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
  shell: true,
});
if (result.status !== 0) {
  console.warn('Warning: could not refresh public/hit-areas/*.json from code');
}