/**
 * Resize composited board art to 1920×1080 for scene coordinates.
 * Usage: node tools/resize-board-background.mjs ch01_board01 [png|jpg]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BOARDS = path.join(ROOT, 'public/adventures/the-lost-line/backgrounds/boards');

const boardId = process.argv[2];
const ext = process.argv[3] ?? 'png';

if (!boardId) {
  console.error('Usage: node tools/resize-board-background.mjs <boardId> [png|jpg]');
  process.exit(1);
}

const target = path.join(BOARDS, `${boardId}.${ext}`);
const backup = path.join(BOARDS, `${boardId}_source.${ext}`);

if (!fs.existsSync(target)) {
  console.error('Missing:', target);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(target, backup);
  console.log('Backup →', backup);
}

const src = backup;
const ps = `
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('${src.replace(/'/g, "''")}')
$bmp = New-Object System.Drawing.Bitmap 1920, 1080
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, 1920, 1080)
$bmp.Save('${target.replace(/'/g, "''")}', [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose(); $img.Dispose()
`;

execSync(`powershell -NoProfile -Command "${ps.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
console.log('Resized →', target, '(1920×1080)');
