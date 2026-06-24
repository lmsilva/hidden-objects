/**
 * Download Kevin MacLeod tracks from incompetech.com into public/adventures/the-lost-line/audio/
 *
 * Usage:
 *   node tools/download-soundtrack.mjs          # MVP: theme + ch01–ch03
 *   node tools/download-soundtrack.mjs --all    # all 26 tracks
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(
  ROOT,
  'src/adventures/the-lost-line/audio/manifest.json',
);
const OUT_DIR = path.join(ROOT, 'public/adventures/the-lost-line/audio');
const BASE_URL = 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/';

const MVP_SLOTS = new Set(['theme', 'stop-01', 'stop-02', 'stop-03']);

/** Per-board gameplay tracks (must match src/engine/audio/tracks.ts BOARD_MUSIC_FILES). */
const MVP_BOARD_FILES = new Set([
  'Space Jazz.mp3',
  'Magic Escape Room.mp3',
  'That Zen Moment.mp3',
  'Parisian.mp3',
  'Evening.mp3',
  'Equatorial Complex.mp3',
  'Pensif.mp3',
  'Adventures in Adventureland.mp3',
  'Brain Dance.mp3',
]);

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
const all = manifest.tracks;
const tracks = process.argv.includes('--all')
  ? all
  : all.filter((t) => MVP_SLOTS.has(t.slot) || MVP_BOARD_FILES.has(t.filename));

fs.mkdirSync(OUT_DIR, { recursive: true });

function encodeFilename(name) {
  return name.split('/').map(encodeURIComponent).join('/');
}

async function downloadTrack(track) {
  const dest = path.join(OUT_DIR, track.filename);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
    console.log(`skip (exists): ${track.filename}`);
    return true;
  }

  const url = BASE_URL + encodeFilename(track.filename);
  console.log(`fetch: ${track.title} ← ${url}`);

  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAIL ${res.status}: ${track.filename}`);
    return false;
  }

  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 10000) {
    console.error(`FAIL (too small): ${track.filename}`);
    return false;
  }

  fs.writeFileSync(dest, buf);
  console.log(`saved: ${track.filename} (${(buf.length / 1024).toFixed(0)} KB)`);
  return true;
}

let ok = 0;
let fail = 0;
for (const track of tracks) {
  if (await downloadTrack(track)) ok++;
  else fail++;
}

console.log(`\nDone: ${ok} ok, ${fail} failed → ${OUT_DIR}`);
process.exit(fail > 0 ? 1 : 0);
