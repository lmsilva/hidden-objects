# ch01_board01 — Midjourney art brief (apartment)

> **COPY-PASTE FOR MIDJOURNEY:** Use plain `.txt` files only — **not this markdown file.**  
> Open `docs/art-prompts/mj-prompts/ch01_board01/pass0.txt` → Ctrl+A → paste into Midjourney.  
> Read `docs/art-prompts/mj-prompts/HOW_TO.txt` first.

**Board:** `ch01_board01` · Central Exchange · **Edith's Apartment**  
**Investigation location:** Edith's Apartment  
**Output file:** `public/adventures/the-lost-line/backgrounds/boards/ch01_board01.png`  
**Size:** **1920×1080** (resize with `node tools/resize-board-background.mjs ch01_board01` if needed)

> **Character consistency:** Read [`CHARACTER_STYLE_GUIDE.md`](CHARACTER_STYLE_GUIDE.md).  
> Brakeman is a **grey tomcat with notched left ear** (game bible canon) — not orange tabby.  
> After approving this board, save it as `references/style-reference.png` for `--sref` on all future boards.

---

## Object philosophy — casual, unique, everyday

Every findable must be something a **real person would actually own or leave behind** in a lived-in Tokyo apartment — not fantasy loot, not duplicate categories.

| Rule | Meaning |
|------|---------|
| **Casual** | Coffee mug, house slippers, TV remote — ordinary domestic life |
| **Unique** | **Exactly one** of each object type in the scene (one mug, one clock, one umbrella) |
| **Everyday** | Props Wren or a commuter would touch tonight — scale, tickets, ledger, chopsticks |
| **Scene-fit** | Belongs in a kotatsu living room behind a Lost & Found counter — not random swords or treasure |

Midjourney must paint **each checklist row once**. Use zone inpainting (≤7 names per pass) — never one prompt with 30+ items.

---

## Author-defined finds (current workflow)

**The game does not require all 30 checklist items in the PNG.** Midjourney is used for a **crowded apartment scene**; you then:

1. Open **`/hit-area-tuner.html`** — preloads `public/hit-areas/ch01_board01.json`
2. **Rename** objects to match what you actually painted
3. **Add** custom objects (`+ Add object`) for props not in the starter pool
4. Set **Map fragment** / **Collectible** roles on the props you want as specials
5. Draw hit polygons → export → `node tools/import-hit-areas.mjs your.json`

The checklist below is a **reference wish-list**, not a binding contract. See [`ch01_board01_RENDER_AUDIT.md`](ch01_board01_RENDER_AUDIT.md) for what the current PNG contains.

---

## Did the old prompt ask for all 30 objects?

**Yes — explicitly.** The v1 prompt included:

- A **30-row checklist** in this doc (IDs + placement)
- A Midjourney line: `EXACTLY ONE of each no duplicates:` followed by all 30 item names in one comma-separated list
- Separate lines for map fragment, brass token, and Brakeman

**Why Midjourney still skipped items:** Image models do **not** treat long object lists as a binding contract. After roughly **8–12 named objects**, later names get ignored or merged into generic “clutter.” A single 33-item sentence reads as *vibe* (“very cluttered apartment”) not *inventory*. This is normal — not a mistake in your prompt wording.

**Reliable rule:** Never expect one Midjourney pass to deliver 30+ specific findables. Use **zone inpainting** (below) or shrink the must-paint list per pass to **≤7 items**.

---

## Critical rules

### ONE of each item

Each object type appears **exactly once**. No duplicate clocks, umbrellas, cats, tokens, or map scraps.

### Recurring characters (locked design)

| Element | This board |
|---------|------------|
| **Brakeman** | Grey shorthair tomcat, **notched left ear**, peeking from **under kotatsu blanket edge** (left side) |
| **Brass token** | One vintage brass coin with Meridian roundel embossing |
| **Map fragment** | One torn map **scrap** with gold foil edge (not the wall poster) |

---

## What the game does

| Layer | Count |
|-------|-------|
| **Configured find pool** | Whatever you box in the tuner (starter list has 30 IDs — rename/add/remove) |
| Find list per new game | **8–12** random standards + fragment + collectible when configured |
| Easter egg | Brakeman (optional) |

**Only objects with hit boxes** enter gameplay. Paint clutter freely; box the findables you want.

---

## Complete object checklist (reference only — optional audit)

Use this table **if** you want to inpaint specific props. **Hit-tuning does not require all rows.** Canonical game data: `public/hit-areas/ch01_board01.json`.

### Standard pool — 30 casual everyday unique objects (exactly one each)

Each row is a **real domestic object** — unique in the scene, ordinary for a lived-in apartment.

| # | ID | Paint this (one only) | Zone | In image? |
|---|-----|----------------------|------|-----------|
| 1 | obj_brass_scale | Brass weighing scale | A — kotatsu top | ☐ |
| 2 | obj_timetable | Folded paper timetable | A | ☐ |
| 3 | obj_inkwell | Inkwell with lid | A | ☐ |
| 4 | obj_ticket_roll | Roll of transit tickets | B — kotatsu / floor | ☐ |
| 5 | obj_magnifying_glass | Magnifying glass | B | ☐ |
| 6 | obj_coffee_cup | Dark ceramic coffee mug | B | ☐ |
| 7 | obj_rubber_stamp | Rubber stamp | A | ☐ |
| 8 | obj_pocket_watch | Pocket watch on chain | E — shelf / hook | ☐ |
| 9 | obj_postcard | Postcard (flat) | C — floor left | ☐ |
| 10 | obj_ledger | Thick ledger notebook | C | ☐ |
| 11 | obj_tv_remote | TV remote | C | ☐ |
| 12 | obj_yarn_ball | Ball of yarn (purple/pink) | C | ☐ |
| 13 | obj_analog_clock | Small round analog clock | C | ☐ |
| 14 | obj_calculator | Green calculator | A | ☐ |
| 15 | obj_fountain_pen | Fountain pen in stand | A | ☐ |
| 16 | obj_chopsticks | Chopsticks (pair) | A | ☐ |
| 17 | obj_house_slippers | House slippers (pair) | B | ☐ |
| 18 | obj_brass_bell | Small brass bell | B | ☐ |
| 19 | obj_potted_plant | Potted plant | D — right side | ☐ |
| 20 | obj_world_map_poster | **World map poster** on wall (large) | D — NOT map fragment | ☐ |
| 21 | obj_purple_umbrella | Purple umbrella in stand | D | ☐ |
| 22 | obj_door_keys | Keys on ring | D — entry hook | ☐ |
| 23 | obj_rice_bowl | Empty rice bowl | B | ☐ |
| 24 | obj_desk_lamp | Small lit desk lamp | D | ☐ |
| 25 | obj_transit_pass | Transit pass card | B | ☐ |
| 26 | obj_scissors | Scissors | E — floor clutter | ☐ |
| 27 | obj_tissue_box | Tissue box | C | ☐ |
| 28 | obj_framed_photo | Framed photo of silver-haired woman (Edith) | D | ☐ |
| 29 | obj_sewing_kit | Sewing kit / pin cushion | E | ☐ |
| 30 | obj_teacup_saucer | Teacup with saucer (not the coffee mug) | A | ☐ |

### Specials + Brakeman

| ID | Paint (one only) | In image? |
|----|------------------|-----------|
| special_map_fragment | Torn transit map **scrap**, gold foil edge, handheld size | ☐ |
| special_brass_token | Vintage **brass subway token**, Meridian roundel | ☐ |
| easter_egg_brakeman | **Grey tomcat, notched left ear**, under kotatsu (left) | ☐ |

---

## Recommended workflow — zone inpainting (5 passes)

**→ Full copy-paste Midjourney UI steps:** [`ch01_board01_MIDJOURNEY_STEPS.md`](ch01_board01_MIDJOURNEY_STEPS.md)

This is the **reliable** way to get all 33 targets. Each pass paints **≤7 named objects** into one area.

### Pass 0 — Base room (no find list)

Generate a cluttered apartment **without** naming all 30 findables. Leave clear surfaces on the kotatsu, floor left, and right wall for later passes.

```
Painterly hidden-object game illustration, 16:9 landscape, casual PC game art like Mystery Case Files, cohesive illustrated realism, warm cozy lighting, Tokyo apartment living room at night, kotatsu with teal quilted blanket center, blue floor cushions, wooden floors, warm pink walls, city night through window left, kitchen archway back, EXTREMELY cluttered everyday props books plants dishes, soft shadows, magical realism cozy mood, no UI no text no watermark no full human figures, leave visible empty space on kotatsu tabletop and floor areas for adding small objects later
```

### Pass 1 — Zone A: kotatsu tabletop (8 items)

**Vary / inpaint** the kotatsu table area. Paste only these names:

```
Inpainting hidden-object game art same style, kotatsu tabletop surface only, EXACTLY ONE of each clearly visible: brass balance scale, folded paper timetable, inkwell with lid, rubber stamp, green calculator, fountain pen in stand, pair of chopsticks, teacup with saucer, painted into scene matching lighting, no duplicates, no text
```

### Pass 2 — Zone B: kotatsu edge / cushions / floor (7 items)

```
Same hidden-object art style, kotatsu blanket edge and blue floor cushions and floor beside kotatsu, EXACTLY ONE of each: roll of transit tickets, magnifying glass partly under blanket, dark ceramic coffee mug, pair of house slippers, small brass bell, empty rice bowl, plastic transit pass card, soft shadows partially hidden, no duplicates
```

### Pass 3 — Zone C: floor left / TV area (6 items)

```
Same art style, floor left near TV console, EXACTLY ONE of each: flat postcard, thick ledger notebook, TV remote control, purple pink yarn ball, small round analog clock, tissue box, scattered papers, no duplicates
```

### Pass 4 — Zone D: right wall / desk (7 items)

```
Same art style, right wall and desk area, EXACTLY ONE of each: large world map poster on wall, purple umbrella in stand, small lit desk lamp, potted houseplant, framed photo of kind silver-haired grandmother, door keys on ring on hook, no duplicates, map poster is full wall chart not a torn scrap
```

### Pass 5 — Zone E: misc + specials + Brakeman (6 items)

```
Same art style, EXACTLY ONE of each: pocket watch on chain hanging on wall hook, scissors on floor clutter, sewing kit with pin cushion on floor, one torn scrap of transit map paper with gold foil torn edge and teal curved line handheld size, one vintage brass subway token coin with Meridian roundel embossing, one small grey shorthair tomcat with notched left ear peeking from under left side of kotatsu blanket subtle Brakeman character, no duplicates no orange cat
```

### Merge

1. Export final composite at **1920×1080**
2. Run the **audit checklist** above — fix any ☐ with another small inpaint pass
3. Only then resize + hit-tune

---

## Single-pass prompt (v2 — best effort only)

Use this only if you accept ~60–70% hit rate and plan inpaint fixes. Objects are **grouped by zone** so Midjourney attends better than one long comma list.

```
Painterly hidden-object game illustration, 16:9 landscape 1920x1080, casual PC game art like Mystery Case Files, cohesive illustrated realism, warm cozy lighting, Tokyo apartment at night, kotatsu teal blanket center, cluttered hidden-object scene, no UI no text no watermark,

MANDATORY CHECKLIST all 30 items exactly once no duplicates —
KOTATSU TABLE: brass balance scale, folded timetable, inkwell, rubber stamp, green calculator, fountain pen, chopsticks, teacup with saucer,
KOTATSU FLOOR: ticket roll, magnifying glass, coffee mug, house slippers, brass bell, rice bowl, transit pass card,
FLOOR LEFT: postcard, ledger book, TV remote, yarn ball, analog clock, tissue box,
RIGHT WALL: world map poster, purple umbrella, desk lamp, potted plant, framed photo of silver-haired woman, door keys,
MISC: pocket watch on chain, scissors, sewing kit,
SPECIALS: one torn map scrap gold foil edge handheld not wall poster, one brass subway token Meridian roundel, one grey tomcat notched left ear under kotatsu left Brakeman
```

---

## Negative prompt (every pass)

```
duplicate objects, two clocks, two umbrellas, two cats, orange tabby, black cat, multiple cats, repeated items, two brass tokens, two map scraps, inconsistent cat design, different cat breed, photorealistic cat cutout, pixel art, icons, stickers, 3D render, anime chibi, text, logo, watermark, empty room, sparse, fantasy weapons, horror, gore, full human figures, multiple identical items, missing objects, generic clutter instead of named props
```

---

## After you generate

1. **Audit** — check every row in the checklist (do not skip)
2. **Inpaint** any missing items (targeted pass with only that object’s name)
3. Save PNG → `public/.../backgrounds/boards/ch01_board01.png`
4. Resize: `node tools/resize-board-background.mjs ch01_board01`
5. Save approved image → `docs/art-prompts/references/style-reference.png`
6. Hit-tune: `http://localhost:5173/hit-area-tuner.html` (preloads `public/hit-areas/ch01_board01.json`)
7. Export JSON → `node tools/import-hit-areas.mjs hit-areas-ch01_board01.json`
8. **New Game** → playtest

### After board 1 is approved

```
--sref <url-of-approved-ch01_board01.png>
--cref <url-of-brakeman-reference.png>   # after generating references/brakeman-reference.png
```

See [`INTEGRATION.md`](INTEGRATION.md), [`PROMPT_TEMPLATE.md`](PROMPT_TEMPLATE.md), [`CHARACTER_STYLE_GUIDE.md`](CHARACTER_STYLE_GUIDE.md), and **[`ch01_board01_RENDER_AUDIT.md`](ch01_board01_RENDER_AUDIT.md)** for item-by-item status on the current PNG.
