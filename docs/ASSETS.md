# Art assets

## Current vs target

| Stage | What you see |
|-------|----------------|
| **MVP boards** | Midjourney composited PNGs (1920×1080) in `backgrounds/boards/` |
| **ch01_board01** | Art in game; hit boxes partially tuned (see render audit) |
| **ch01_board02–ch03_board03** | Art in game; placeholder hit regions — **re-tune in hit-area tuner** against new art |

## Quick setup (empty room bases)

Place downloaded itch.io zips in:

```
public/zipped_asset_downloads/*.zip
```

Then run:

```bash
npm run assets:setup
```

This extracts archives and copies the 9 MVP board backgrounds into `public/adventures/the-lost-line/backgrounds/boards/`.

## Kenney UI (optional)

| Asset | Source | Path |
|-------|--------|------|
| Kenney UI Pack | [OpenGameArt](https://opengameart.org/content/ui-pack) | `tools/assets-cache/kenney_ui-pack.zip` |

CC0 — optional credit in Credits screen.

## itch.io packs (sources)

| Pack | URL | Used for |
|------|-----|----------|
| Potat0Master VN Starter 2 | [itch.io](https://potat0master.itch.io/free-visual-novel-backgrounds-starter-pack-2) | Apartment, city night, bridge, outskirts, park |
| Spiral Atlas Contemporary | [itch.io](https://spiralatlas.itch.io/contemporary-vn-backgrounds) | Subway, downtown |
| Itsu Cafe | [itch.io](https://itsu-saragi.itch.io/cafe-backgrounds) | Ch02 café boards |
| Nimerone Cozy House | [itch.io](https://nimerone.itch.io/cozy-house-free-backgrounds) | Reserve / future interiors |
| Marie Pepo MF_Items | [itch.io](https://marie-pepo.itch.io/mf-items) | Object sprites |
| Glionox Items 16×16 | [itch.io](https://glionox.itch.io/items16) | Object sprites |

## Board backgrounds (composited)

All MVP boards use **Midjourney composited PNGs** at:

`public/adventures/the-lost-line/backgrounds/boards/ch##_board##.png` (1920×1080)

| Board | Investigation location | Status |
|-------|------------------------|--------|
| ch01_board01 | Edith's Apartment | Composited · hit-tune in progress |
| ch01_board02 | Platform 1 at Midnight | Composited · placeholder hits |
| ch01_board03 | Grand Ticket Hall | Composited · placeholder hits |
| ch02_board01 | Lantern Street Market | Composited · placeholder hits |
| ch02_board02 | Busking Corner | Composited · placeholder hits |
| ch02_board03 | Phantom Underpass | Composited · placeholder hits |
| ch03_board01 | Ferry Platform | Composited · placeholder hits |
| ch03_board02 | Fishmonger Stalls | Composited · placeholder hits |
| ch03_board03 | Tidegate Pier | Composited · placeholder hits |

Original VN pack sources (superseded for gameplay) are listed in `tools/prepare-board-backgrounds.mjs`.

Output paths: `public/adventures/the-lost-line/backgrounds/boards/ch##_board##.png`

Board definitions: `src/adventures/the-lost-line/boards/index.ts` (`boardBg()` helper).

## Extracted layout

Zips unpack with nested folder names under:

```
public/adventures/the-lost-line/
  backgrounds/<zip-stem>/...
  objects/<zip-stem>/...
  backgrounds/boards/     ← flat copies for the game
```

Object sprites are extracted for reference only — **do not overlay in gameplay**. Use `docs/ART_PIPELINE.md` for composited scenes.

## Compositing next step

1. Generate crowded board art (see `docs/art-prompts/ch01_board01.md`)
2. Replace file in `backgrounds/boards/`
3. **Hit-area tuner:** `npm run dev` → `http://localhost:5173/hit-area-tuner.html`  
   Preloads `public/hit-areas/<boardId>.json` — rename objects, set fragment/collectible roles, draw polygons
4. Export → `node tools/import-hit-areas.mjs your-export.json`

## Legal

Attribution in `src/adventures/the-lost-line/credits.json` and the in-game **Credits** screen.
