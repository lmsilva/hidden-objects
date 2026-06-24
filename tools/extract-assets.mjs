/**
 * Extract art zips from public/zipped_asset_downloads/ into adventure asset folders.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ZIP_DIR = path.join(ROOT, 'public/zipped_asset_downloads');
const OUT_BG = path.join(ROOT, 'public/adventures/the-lost-line/backgrounds');
const OUT_OBJ = path.join(ROOT, 'public/adventures/the-lost-line/objects');

const ZIPS = fs.existsSync(ZIP_DIR)
  ? fs.readdirSync(ZIP_DIR).filter((f) => f.endsWith('.zip'))
  : [];

fs.mkdirSync(OUT_BG, { recursive: true });
fs.mkdirSync(OUT_OBJ, { recursive: true });

function extractZip(zipName, destSubdir) {
  const zipPath = path.join(ZIP_DIR, zipName);
  const dest = path.join(ROOT, 'public/adventures/the-lost-line', destSubdir, zipName.replace(/\.zip$/i, ''));
  if (!fs.existsSync(zipPath)) {
    console.warn(`missing: ${zipName}`);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  console.log(`extract: ${zipName} → ${dest}`);
  try {
    execSync(
      `powershell -NoProfile -Command "Expand-Archive -Path '${zipPath.replace(/'/g, "''")}' -DestinationPath '${dest.replace(/'/g, "''")}' -Force"`,
      { stdio: 'inherit' },
    );
  } catch (e) {
    console.error(`failed: ${zipName}`, e);
  }
}

for (const zip of ZIPS) {
  const lower = zip.toLowerCase();
  if (lower.includes('item') || lower.includes('mf_')) {
    extractZip(zip, 'objects');
  } else {
    extractZip(zip, 'backgrounds');
  }
}

console.log('\nExtracted', ZIPS.length, 'archives.');
