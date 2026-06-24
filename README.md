# The Lost Line — Hidden Object Game

A modular, browser-based hidden-object mystery. MVP includes 3 stations (9 boards), subway map navigation, configurable difficulty, pan & zoom, local save, and offline-ready PWA shell.

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Project structure

```
docs/                          # Game bible v1.1 + content templates
src/
  engine/                      # Reusable game engine (adventure-agnostic)
  ui/screens/                  # Menus, map, gameplay HUD
  adventures/the-lost-line/    # First adventure pack (manifest, boards, locales, credits)
```

## Adding art assets

Download packs listed in `src/adventures/the-lost-line/credits.json` and place backgrounds under:

`public/adventures/the-lost-line/backgrounds/`

Update `background` paths in `src/adventures/the-lost-line/boards/index.ts`.

**Hit areas:** `public/hit-areas/<boardId>.json` — preloaded by `/hit-area-tuner.html`. See `docs/art-prompts/INTEGRATION.md`.

Dev hit overlays: `VITE_SHOW_DEV_HITS=true` in `.env.local` (off by default).

## Build & deploy

```bash
npm run build
```

Deploy the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages). No backend required.

See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** for **GitHub Pages** (free hosting).

Art packs: **[docs/ASSETS.md](docs/ASSETS.md)**. Soundtrack: `npm run download:soundtrack`.

## Save data

Progress is stored in the browser via IndexedDB. Use **Settings → Export Save** to back up.
