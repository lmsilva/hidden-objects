# Board integration checklist

> **Recurring characters:** Before generating board 2+, read [`CHARACTER_STYLE_GUIDE.md`](CHARACTER_STYLE_GUIDE.md) and lock Brakeman / token / map scrap references.

## Workflow summary (author-defined objects)

**Design decision:** The find list is **not** bound to a fixed Midjourney 30-item checklist. You paint a crowded scene, then **name and box whatever is actually in the art** using the hit-area tuner.

1. **Generate** a composited scene (Midjourney, inpainting, or manual — see `docs/art-prompts/<board>.md`)
2. **Save** PNG → `public/adventures/the-lost-line/backgrounds/boards/<boardId>.png`
3. **Resize** to 1920×1080 if needed: `node tools/resize-board-background.mjs <boardId>`
4. **Open hit-area tuner** → `http://localhost:5173/hit-area-tuner.html`  
   - Preloads **`public/hit-areas/<boardId>.json`** (existing names, roles, polygons)
   - Rename objects, mark **map fragment** / **collectible**, add custom objects, draw polygons
5. **Export JSON** from tuner → `node tools/import-hit-areas.mjs your-export.json`  
   - Updates TypeScript pools + `public/hit-areas/<boardId>.json`
6. **New Game** in app → playtest random find list

```bash
npm run export:tuner-data   # refresh board-tuner-data.json + hit-areas/*.json from code
```

---

## Canonical hit-area JSON

| Path | Purpose |
|------|---------|
| `public/hit-areas/<boardId>.json` | Names, roles, bounds — **tuner preload + version control** |
| `public/board-tuner-data.json` | Board list + backgrounds (generated from code) |

Commit `public/hit-areas/*.json` when you want the team / future sessions to pick up your latest boxes.

---

## Hit area tuner

| Feature | Description |
|---------|-------------|
| Preload | Fetches `/hit-areas/<boardId>.json` on every board switch |
| Display name | Custom label shown in-game (overrides i18n) |
| Object role | Find object · Map fragment · Collectible (token) · Brakeman |
| + Add object | Custom finds (`obj_custom_N`) |
| Delete | Remove selected object from the board list (keyboard: Delete) |
| List delete | Hover a row → 🗑 next to status badge for one-click remove |
| Undo / Redo | **Ctrl+Z** / **Ctrl+Y** (or **Ctrl+Shift+Z**) — restores objects, shapes, names, roles |
| Draw | Polygons — drag box, edit vertices, outline mode |
| Click to select | Click any hit box on the image to select it (syncs list + name editor) |
| Right-click shape | Add point on edge, or remove vertex (&lt;3 points clears the outline) |
| Export | v2 JSON → `import-hit-areas.mjs` |
| Import | Load a previous export into the current board |
| Session draft | `localStorage` v6 overlays repo JSON until you export |

---

## Random find lists

On **New Game**, each board randomizes **8–12** configured standard objects from the pool (by difficulty). **Map fragment** and **collectible** roles always appear when configured. Brakeman rules unchanged.

Only objects with **configured hit boxes** enter the random pool (`getPlayableStandardPool`).

Stored in save as `boardFindLists`. Start **New Game** to re-roll.

---

## Credits

Document AI tool in `credits.json` when required.
