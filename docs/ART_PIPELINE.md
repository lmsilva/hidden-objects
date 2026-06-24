# Art pipeline — composited hidden-object scenes

## Why overlay sprites failed

Classic hidden-object games (Mystery Case Files, Hidden Expedition, etc.) do **not** stack icons on a photo background. Every object—findable and distractor—is **painted into one scene image** with:

- Matching **lighting and shadows**
- Consistent **painterly / illustrated fidelity**
- **Occlusion** (items behind furniture, in shadow, partially cropped)
- **Room-appropriate** props (no fantasy swords in a kotatsu apartment)

Our itch.io VN backgrounds are clean empty rooms. Glionox 16×16 icons and MF_Items fantasy sprites are a different art style—they will always read as “stickers,” not hidden objects.

**Engine rule:** gameplay shows a single `background` image + invisible hit rectangles. No runtime sprite clutter.

---

## Target workflow (recommended)

```
1. Generate or composite a CROWDED 1920×1080 scene (AI, inpaint, or manual)
2. Save PNG → public/.../backgrounds/boards/ch##_board##.png
3. Hit-area tuner — name objects, set fragment/collectible roles, draw polygons
   (preloads public/hit-areas/<boardId>.json)
4. Export JSON → node tools/import-hit-areas.mjs export.json
5. New Game → playtest
```

**You do not need every pre-planned pool ID in the image.** Define finds to match what you actually painted.

---

## Option A — AI scene generation

**Best for:** Quick crowded backgrounds. Use Midjourney for **mood and clutter**, not as a binding object inventory.

**Important:** A single prompt listing 30+ named findables will **not** reliably paint every item. That is fine — use the **hit-area tuner** to name and box what appears. Zone inpainting (≤7 objects per pass) remains useful if you want specific props visible. See `docs/art-prompts/ch01_board01.md`.

### Tools

- **Midjourney / DALL·E / Ideogram** — single-image scene prompts
- **Leonardo / SDXL** — more control, inpainting passes
- **Photoshop Generative Fill** — refine an existing VN room

### Prompt pattern

```
Hidden object game scene, 16:9, illustrated painterly casual game art,
[ROOM DESCRIPTION], extremely cluttered with everyday objects on every surface,
warm cozy lighting, soft shadows, objects partially hidden behind furniture,
no UI, no text, no characters, high detail, same art style throughout,
Meridian City Tokyo-inspired cozy apartment, lost-and-found mood
```

Add a **find list** to the prompt for pass 1, then iterate — or use **zone inpainting** (≤7 named objects per pass). Do not expect one prompt to deliver 30 specific items.

```
Include clearly visible but hard to spot: brass scale, pocket watch, coffee cup,
inkwell, rubber stamp, folded timetable, magnifying glass, leather ledger,
postcard, ticket roll, torn map fragment, brass transit token, small tabby cat
tucked under kotatsu blanket edge
```

### After generation

1. Save composited PNG to `public/adventures/the-lost-line/backgrounds/boards/`
2. Resize/crop to **1920×1080** if needed
3. Open **`http://localhost:5173/hit-area-tuner.html`** — preloads `public/hit-areas/<boardId>.json`
4. Rename finds, assign fragment/collectible roles, add custom objects, draw hit polygons
5. Export → `node tools/import-hit-areas.mjs hit-areas-<boardId>.json`
6. **New Game** → playtest

### Quality checklist

- [ ] Scene is densely cluttered (distractors OK — only boxed items are findable)
- [ ] Fragment + collectible roles assigned to visible props (if used on this board)
- [ ] Brakeman subtle if present (`brakeman` role)
- [ ] Custom display names match what players should search for
- [ ] `public/hit-areas/<boardId>.json` committed after import

**Per-board prompts:** `docs/art-prompts/`

---

## Option B — AI inpainting on VN backgrounds (more control)

**Best for:** Keeping exact room layout from Potat0Master / Spiral Atlas packs.

1. Use current empty `backgrounds/boards/*.png` as base
2. In Photoshop / Leonardo inpaint regions: kotatsu surface, floor, shelves
3. Prompt each region: “clutter of Japanese apartment objects, same illustration style, soft shadows”
4. Multiple passes until dense
5. Tune hit areas

Pros: room architecture stays consistent. Cons: more manual work per board.

---

## Option C — Manual composite (highest quality)

**Best for:** hero boards or if AI style drifts.

1. Source photo/illustration props (same license tier)
2. Composite in Krita/Photoshop with color grading to match room
3. Export flattened PNG

---

## What we keep from itch.io packs

| Pack | Use |
|------|-----|
| Potat0Master, Spiral Atlas, Itsu, Nimerone | **Empty room bases** or inpaint starting points |
| MF_Items, Glionox | **Not for overlays** — wrong style; optional reference only |
| Kenney UI | HUD chrome only |

---

## Hit area tuning

Scene coordinates are **1920×1080**, origin top-left.

**Canonical JSON:** `public/hit-areas/<boardId>.json` — tuner preload + git-tracked source.

```bash
npm run dev
# → http://localhost:5173/hit-area-tuner.html

# After editing pools in TypeScript:
npm run export:tuner-data

# After tuner export:
node tools/import-hit-areas.mjs path/to/export.json
```

Dev hit overlays: set `VITE_SHOW_DEV_HITS=true` in `.env.local` (off by default).

---

## Legal / credits

- AI-generated boards: document tool + prompt in `credits.json` when used
- VN backgrounds: keep itch.io attribution per pack license
- See `docs/ASSETS.md` for download sources

---

## Agent instructions

1. **Never** re-add runtime sprite overlays for findables or clutter
2. New board art = replace PNG in `backgrounds/boards/`, tune hits in **hit-area tuner**
3. Object names and roles are **author-defined** in tuner — not locked to MJ checklists
4. Commit `public/hit-areas/<boardId>.json` after import
5. Read `CHARACTER_STYLE_GUIDE.md` for Brakeman / token / map scrap visuals when painting them in
