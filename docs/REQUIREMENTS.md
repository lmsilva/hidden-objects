# The Lost Line — Agent Requirements (read first)

Concise spec for new agent sessions. Full narrative: `docs/The_Lost_Line_Game_Bible_v1.1.md`.

## Product

- **Title:** The Lost Line
- **Genre:** Hidden-object adventure (mid-2000s PopCap casual feel)
- **Setting:** Fictional **Tokyo-inspired Meridian City** — cozy magical realism (not horror/noir)
- **MVP scope:** 3 chapters × 3 boards = **9 playable scenes**; subway map shows stops 4–25 as locked
- **Hosting:** GitHub Pages (static, no backend); hash routing in production

## Stack

| Layer | Choice |
|-------|--------|
| Build | Vite 7 + React 19 + TypeScript |
| Routing | react-router-dom (HashRouter when `VITE_GITHUB_PAGES=true`) |
| i18n | i18next + react-i18next (engine + per-adventure locale JSON) |
| Save | IndexedDB via `idb` — local only, export/import JSON |
| PWA | vite-plugin-pwa (MP3s runtime-cached, not precached) |

## Repo layout

```
src/engine/           — types, gameplay, camera, save, i18n, audio, progress (brakeman)
src/ui/screens/       — MainMenu, Settings, Credits, Map, Station, Gameplay, Story
src/adventures/the-lost-line/  — manifest, boards, credits, locales, audio manifest
public/adventures/the-lost-line/ — backgrounds, objects, audio MP3s
public/zipped_asset_downloads/   — source zips (user-provided)
tools/                — extract-assets.mjs, import-hit-areas.mjs, export-hit-areas-json.ts
public/hit-areas/     — canonical per-board object names, roles, hit JSON (tuner preload)
docs/                 — bible, REQUIREMENTS (this file), DEPLOYMENT, ASSETS
```

## Core gameplay (locked)

- **HUD:** Horizontal bottom bar (object list, hints, pause, score)
- **Scene:** 1920×1080 logical coords; pan/zoom via pinch, scroll wheel, +/- / reset — **no double-tap**
- **Difficulty presets:** Relaxed / Normal / Hard / Custom (object count, timer, miss penalty, hints)
- **Win condition:** Find all list objects (+ optional specials); board completion saves progress
- **Hints:** Cooldown + score penalty per difficulty
- **Dev mode:** Dashed hit-area outlines when `import.meta.env.DEV`

## Collectibles

| Item | Rule |
|------|------|
| Map Fragment | 1 per board (special object); counts toward map restore |
| Brass Token | 1 per board (special object) |
| Edith letter | Shown on chapter complete (story screen) |
| **Brakeman** | Hidden cat (`easter_egg_brakeman`) on every board — **collection track** |

### Brakeman collection (implemented)

- Track **unique boards** where cat was found: **X / 25** (full game); MVP sub-track **X / 9**
- **Not required** to finish a board; hidden from scene if already collected on that board
- **Rewards (score):**
  - +50 per first find on a board (session score, `SCORE.EASTER_EGG`)
  - +250 at milestones: 3, 6, 9, 12, 15, 18, 21, 25
  - +500 when all **9 MVP** boards have Brakeman
  - +2000 when **25/25** complete
- Save fields: `brakemanSightings`, `brakemanMilestonesAwarded[]`, `brakemanMvpRewardClaimed`, `brakemanFullRewardClaimed`
- Map screen shows collection count, progress bar, next milestone

## Audio

- Kevin MacLeod tracks (CC BY 4.0); manifest: `src/adventures/the-lost-line/audio/manifest.json`
- MVP: 4 MP3s in `public/.../audio/`; `npm run download:soundtrack` for MVP set
- Theme on menu/map; chapter track during gameplay

## Art pipeline

**Hidden objects are baked into composited scene images** — see `docs/ART_PIPELINE.md`.

**Author-defined object lists (design decision):** Findable items are **named and hit-boxed in the tuner** to match whatever appears in your art — not a fixed Midjourney 30-item checklist. Canonical definitions: `public/hit-areas/<boardId>.json`.

- **8–12 standards** on find list per new game (randomized among configured pool objects)
- **Fragment + collectible** roles assigned per board in tuner
- Hit tuning: `npm run dev` → `http://localhost:5173/hit-area-tuner.html` (preloads `public/hit-areas/`)
- Import: `node tools/import-hit-areas.mjs <export.json>`
- Pool docs: `docs/art-prompts/BOARD_POOLS.md`
- Scene art briefs (optional MJ reference): `docs/art-prompts/<board>.md`

## Commands

```bash
npm run dev
npm run build
npm run assets:setup          # extract zips + copy board backgrounds
npm run export:tuner-data   # board-tuner-data.json + public/hit-areas/*.json
```

## Deployment

- `docs/DEPLOYMENT.md` — GitHub Actions workflow on `main`, `base` path for repo name
- Production: set `GITHUB_PAGES=true` / `VITE_GITHUB_PAGES=true`

## Phase 2 (not MVP)

- Stops 4–25 content, dual-map toggle, mini-puzzles between boards
- Composite object sprites onto scenes (replace dashed hit areas)
- Full 26-track soundtrack download script
- Additional locales beyond `en`

## Agent conventions

- Minimize scope; match existing patterns in `src/engine` and adventure data
- Do not commit secrets or large zips unless user asks
- Credits/attribution in `credits.json` + Credits screen
- When changing board backgrounds or object positions, update `boards/index.ts` only

## Key files

| File | Purpose |
|------|---------|
| `src/adventures/the-lost-line/manifest.json` | Chapters, stations, line segments |
| `src/adventures/the-lost-line/boards/index.ts` | 9 boards, objects, backgrounds |
| `src/engine/progress/brakeman.ts` | Collection math + rewards |
| `src/engine/progress/helpers.ts` | Save progress, `applyBoardCompletion` |
| `tools/prepare-board-backgrounds.mjs` | Zip path → board image mapping |
