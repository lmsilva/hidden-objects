/**
 * Copy selected backgrounds into flat board/ paths for stable URLs.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BG = path.join(ROOT, 'public/adventures/the-lost-line/backgrounds');
const OUT = path.join(BG, 'boards');
const VN = 'potat0master/Visual Novel Backgrounds (Starter Pack 2)';

const mappings = [
  { boardId: 'ch01_board01', src: `${VN}/apartment a living room day.png` },
  { boardId: 'ch01_board02', src: 'subway/subway/2eve.jpg' },
  { boardId: 'ch01_board03', src: `${VN}/city a s1st2 nightlights.png` },
  {
    boardId: 'ch02_board01',
    src: 'Cafe Backgrounds_021325/Cafe Backgrounds_021325/Cafe_Interior_Evening.jpg',
  },
  {
    boardId: 'ch02_board02',
    src: 'Cafe Backgrounds_021325/Cafe Backgrounds_021325/Cafe_Street_Evening.jpg',
  },
  { boardId: 'ch02_board03', src: `${VN}/under bridge night.png` },
  { boardId: 'ch03_board01', src: `${VN}/outskirts road a day2.png` },
  { boardId: 'ch03_board02', src: 'downtown/downtown/street.jpg' },
  { boardId: 'ch03_board03', src: `${VN}/park s3 day.png` },
];

fs.mkdirSync(OUT, { recursive: true });

for (const { boardId, src } of mappings) {
  const from = path.join(BG, src);
  const ext = path.extname(from);
  const to = path.join(OUT, `${boardId}${ext}`);
  if (!fs.existsSync(from)) {
    console.error(`MISSING: ${from}`);
    continue;
  }
  fs.copyFileSync(from, to);
  console.log(`ok: ${boardId} ← ${src}`);
}

console.log('Done →', OUT);
