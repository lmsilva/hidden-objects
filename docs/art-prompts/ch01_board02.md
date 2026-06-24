# ch01_board02 — Midjourney art brief (subway platform)

> **COPY-PASTE FOR MIDJOURNEY:** Use plain `.txt` files only — **not this markdown file.**  
> Open `docs/art-prompts/mj-prompts/ch01_board02/pass0.txt` → Ctrl+A → paste into Midjourney.  
> Read `docs/art-prompts/mj-prompts/HOW_TO.txt` first.

**Board:** `ch01_board02` · Central Exchange · **Platform 1 at Midnight**  
**Investigation location:** Platform 1 at Midnight  
**Output file:** `public/adventures/the-lost-line/backgrounds/boards/ch01_board02.jpg`  
**Size:** **1920×1080**

> **Style:** [`CHARACTER_STYLE_GUIDE.md`](CHARACTER_STYLE_GUIDE.md) — use `--sref` from approved `ch01_board01` + `--cref` Brakeman.

---

## Object philosophy — casual, unique, everyday

Paint **only things commuters lose on a real platform** — scarf left on a bench, glove, coin, newspaper. Each item is **ordinary**, **unique** (one per type), and **belongs on a midnight subway platform**.

| Rule | Meaning |
|------|---------|
| **Casual** | Lost property, vending snacks, dropped button — not weapons or treasure |
| **Unique** | One bench plaque, one scarf, one glove, one coin — no pairs of identical props |
| **Everyday** | What Wren would log at Lost & Found after last train |
| **Scene-fit** | Vintage Tokyo platform — enamel signs, token slot, schedule poster |

**Mandatory count:** **10 standards + 2 specials + 1 Brakeman = 13 objects** (all required).

---

## Complete mandatory checklist

Tick each row after generation. **Exactly one** of each.

### Standard pool — 10 casual everyday objects

| # | ID | Paint this (one only) | Everyday story | Zone |
|---|-----|----------------------|----------------|------|
| 1 | `obj_bench_plaque` | Small **bronze dedication plaque** screwed to bench back | Commuters read it every day | A — bench |
| 2 | `obj_lost_scarf` | **Folded wool scarf** (muted color) on bench seat | Someone left it on last train | A |
| 3 | `obj_glove` | **Single leather glove** (not a pair) on bench | Classic lost-item | A |
| 4 | `obj_loose_button` | **One loose shirt button** on platform tiles near bench | Fell off a coat | A |
| 5 | `obj_newspaper` | **Folded evening newspaper** on bench | Left behind reading material | A |
| 6 | `obj_vending_snack` | **Snack package** visible in vending machine window (chips or crackers) | Late-night platform habit | B — vending wall |
| 7 | `obj_enamel_sign` | **Vintage enamel station name sign** on tiled wall (abstract glyphs, no readable text) | Everyday transit furniture | B |
| 8 | `obj_schedule_poster` | **Paper timetable poster** on wall (grid abstract, not readable) | Commuter reference | B |
| 9 | `obj_token_slot` | **Brass token slot panel** on wall or machine | How you used to pay fare | B |
| 10 | `obj_coin` | **One small coin** on platform floor near yellow line | Dropped change | C — floor |

### Specials + Brakeman — 3 required

| ID | Paint (one only) | Zone |
|----|------------------|------|
| `special_map_fragment` | Torn **handheld** map scrap, gold foil edge, teal curved line — **not** a wall poster | D |
| `special_brass_token` | One **vintage brass subway token**, Meridian roundel embossing | D |
| `easter_egg_brakeman` | **Grey tomcat, notched left ear**, peeking from **behind bench leg** (right) | D |

---

## Zone inpainting workflow

### Pass 0 — Base platform (no find list yet)

```
Painterly hidden-object game illustration, 16:9 landscape 1920x1080, casual PC game art like Mystery Case Files, cohesive illustrated realism, warm cozy lighting, empty Tokyo subway platform at midnight, vintage enamel transit ads on tiled wall, wooden bench center, vending machine soft glow, tracks disappearing into tunnel right, yellow safety line, scattered everyday litter, magical realism cozy mood never scary, no UI no text no watermark no full human figures, leave bench seat and platform floor clear for small lost objects
```

### Pass 1 — Zone A: bench lost property (5 items)

```
Same hidden-object art style, subway platform bench only, EXACTLY ONE of each casual everyday object clearly visible: bronze bench dedication plaque on bench back, folded lost wool scarf on seat, single leather glove on bench not a pair, one loose shirt button on tiles near bench, folded evening newspaper on bench, no duplicates, no readable text
```

### Pass 2 — Zone B: wall & vending (4 items)

```
Same art style, platform wall and vending machine, EXACTLY ONE of each: snack package in vending window, vintage enamel station sign on tile wall abstract not readable, paper schedule poster on wall abstract grid, brass token slot panel on wall, everyday transit props, no duplicates
```

### Pass 3 — Zone C: floor (1 item)

```
Same art style, platform floor near yellow safety line, EXACTLY ONE small coin on ground, no duplicates
```

### Pass 4 — Zone D: specials + Brakeman (3 items)

```
Same art style, EXACTLY ONE of each: torn handheld transit map scrap gold foil edge teal line not wall poster, vintage brass subway token Meridian roundel on platform floor, small grey shorthair tomcat notched left ear peeking behind bench leg right Brakeman, no duplicates no orange cat
```

---

## Single-pass fallback

```
Painterly hidden-object game illustration, 16:9 1920x1080, Mystery Case Files style, Tokyo subway platform midnight cozy-lit, cluttered lost-property scene,

MANDATORY — exactly one each casual everyday unique object no duplicates —
BENCH: bronze bench plaque, folded wool scarf, single leather glove, loose shirt button, folded newspaper,
WALL: vending snack package, enamel station sign, schedule poster, brass token slot,
FLOOR: one coin,
SPECIALS: one torn map scrap gold foil handheld, one brass token Meridian roundel, grey tomcat notched left ear behind bench leg Brakeman
```

---

## Negative prompt

```
duplicate objects, two scarves, two gloves, two coins, two cats, orange tabby, multiple cats, two brass tokens, two map scraps, fantasy weapons, treasure chests, horror, scary empty tunnel, text, logo, watermark, sparse room, photorealistic, anime chibi, full human figures
```

---

## After you generate

1. Audit all **13** checklist rows  
2. Save → `backgrounds/boards/ch01_board02.jpg`  
3. `node tools/resize-board-background.mjs ch01_board02`  
4. Hit-tune → `node tools/import-hit-areas.mjs export.json`  
5. New Game → playtest
