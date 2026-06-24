# Board prompt template

Copy this structure for each new `ch##_board##.md` file.

---

## Header

```markdown
# <boardId> — <scene title>

**Board:** `<boardId>` · <station> · <story beat>
**Output:** `public/adventures/the-lost-line/backgrounds/boards/<boardId>.png`
**Size:** 1920×1080

> **Style & characters:** Read `CHARACTER_STYLE_GUIDE.md` — use `--sref` and `--cref` for Brakeman.
```

---

## Sections (in order)

1. **Author-defined finds** — hit-area tuner + `public/hit-areas/<boardId>.json` (primary workflow)
2. **Did the prompt require all objects?** — explain single-pass limits (~8–12 reliable names); checklist is **reference only**
3. **Critical rule — ONE of each item** (when inpainting named props)
4. **What the game does** (configured pool, 8–12 find list, fragment/collectible roles, Brakeman)
5. **Complete object checklist** — optional reference table with zones
6. **Recommended workflow — zone inpainting** — optional; Pass 0 base + Pass 1–N ≤7 objects
7. **Single-pass prompt** — mood/clutter fallback
8. **Negative prompt** (from CHARACTER_STYLE_GUIDE.md)
9. **After you generate** — tuner → import → New Game

---

## Primary workflow (author-defined)

1. Composited PNG in `backgrounds/boards/`
2. Hit-area tuner preloads `public/hit-areas/<boardId>.json`
3. Rename / add objects; assign fragment & collectible roles; draw polygons
4. `node tools/import-hit-areas.mjs export.json`

Midjourney checklists are **optional** for driving art — not required to match pool IDs.

---

## Why not one big prompt?

Midjourney **cannot guarantee** 30+ specifically named objects in one image. That is acceptable: **define finds in the tuner** after generation. Zone inpainting remains useful when you want specific props visible.

---

## Zone inpainting assembly

Split the 30 pool items into **5–6 spatial zones** (e.g. kotatsu top, floor left, right wall). Each zone gets its own inpaint prompt:

```
Same hidden-object art style, [ZONE DESCRIPTION], EXACTLY ONE of each clearly visible: [item1], [item2], ... (max 7), painted into scene matching lighting, no duplicates, no text
```

Pass 0 generates the **base room** without naming all findables — leave surfaces for later passes.

Specials + Brakeman usually go in the **last pass** (or dedicated micro-pass if missed).

---

## Single-pass fallback (grouped checklist)

If attempting one shot, group objects by zone with a `MANDATORY CHECKLIST` header — never one flat comma list of 30 items. Expect to inpaint 30–40% of items afterward.

```
MANDATORY CHECKLIST all 30 items exactly once no duplicates —
ZONE A: item1, item2, ...
ZONE B: item3, item4, ...
SPECIALS: map scrap, brass token, Brakeman snippet
```

---

## Prompt assembly order (single-pass fallback only)

```
[GLOBAL ART STYLE from CHARACTER_STYLE_GUIDE]

[SCENE: location, time of day, clutter level, lighting]

MANDATORY CHECKLIST — grouped by zone, max ~7 names per line: [30 pool items]

[BRASS TOKEN snippet]

[MAP FRAGMENT snippet]

[BRAKEMAN snippet with board-specific LOCATION]

--sref <style-reference-url> --cref <brakeman-reference-url>
```

---

## Brakeman location examples by board type

| Board type | Example `[LOCATION]` |
|------------|----------------------|
| Apartment | under kotatsu blanket edge |
| Subway platform | behind bench leg |
| Café | under counter stool |
| Street / bridge | behind crate, alley shadow |
| Harbor | behind rope coil |

Keep cat **partially occluded** every time.

---

## Post-generation gate (required)

Before hit-tuning:

- [ ] Every pool row marked ✅ in the audit table
- [ ] Inpaint pass for any missing item (prompt with **only** that object’s name)
- [ ] Brakeman matches reference (grey, notched **left** ear)
- [ ] Only one cat, one token, one map scrap
