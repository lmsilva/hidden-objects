# ch03_board01 — Midjourney art brief (ferry platform)

> **COPY-PASTE FOR MIDJOURNEY:** Use `docs/art-prompts/mj-prompts/ch03_board01/pass0.txt` etc. — **not this .md file.** See `mj-prompts/HOW_TO.txt`.

**Board:** `ch03_board01` · Gull Harbor · **Ferry Platform**  
**Investigation location:** Ferry Platform  
**Output file:** `public/adventures/the-lost-line/backgrounds/boards/ch03_board01.png`  
**Size:** **1920×1080**

> **Style:** [`CHARACTER_STYLE_GUIDE.md`](CHARACTER_STYLE_GUIDE.md) — `--sref` + `--cref` Brakeman.  
> **Lighting:** Soft **afternoon fog** — gentle, not oppressive grey.

---

## Object philosophy — casual, unique, everyday

Harbor dock **working-day objects** — mooring rope, ferry schedule, compass, oil lantern. What fishermen and commuters leave on a wharf. **Casual, unique, nautical everyday**.

**Mandatory count:** **10 standards + 2 specials + 1 Brakeman = 13 objects**.

---

## Complete mandatory checklist

### Standard pool — 10 casual everyday objects

| # | ID | Paint this (one only) | Everyday story | Zone |
|---|-----|----------------------|----------------|------|
| 1 | `obj_mooring_rope` | **Coiled hemp mooring rope** on bollard | Dock work | A — dock |
| 2 | `obj_fog_buoy` | **Red-white harbor fog buoy** on edge | Navigation aid | A |
| 3 | `obj_ferry_schedule` | **Folded paper ferry timetable** on bench (abstract grid, not readable) | Commuter planning | A |
| 4 | `obj_salt_crate` | **Wooden salt crate** stamped abstract on dock | Harbor trade | B |
| 5 | `obj_fisher_net` | **Folded fishing net bundle** on dock | Working gear | B |
| 6 | `obj_wharf_plank` | **Weathered loose wharf plank** with rusty nail | Dock repair | B |
| 7 | `obj_seagull_feather` | **One white seagull feather** on planks | Everyday nature | B |
| 8 | `obj_compass` | **Brass pocket compass** in small leather case | Sailor tool | C |
| 9 | `obj_oil_lantern` | **Old oil lantern** with warm glass | Dock light | C |
| 10 | `obj_floodgate_key` | **Ornate brass floodgate key** on keyring (**story evidence**) | Pays off later | C |

### Specials + Brakeman — 3 required

| ID | Paint (one only) | Zone |
|----|------------------|------|
| `special_map_fragment` | Handheld torn map scrap, gold foil | D |
| `special_brass_token` | Brass token on wet planks | D |
| `easter_egg_brakeman` | Grey tomcat behind **rope coil** (right) | D |

---

## Zone inpainting workflow

### Pass 0 — Base ferry platform

```
Painterly hidden-object game illustration, 16:9 1920x1080, Mystery Case Files style, Tokyo harbor ferry platform soft afternoon fog, wooden wharf planks, mooring bollards, calm water, everyday nautical clutter, warm gentle light magical realism, no UI no text no watermark no full human figures
```

### Pass 1 — Zone A: dock edge (3 items)

```
Same hidden-object art style, ferry dock edge, EXACTLY ONE of each casual everyday: coiled mooring rope on bollard, red white fog buoy, folded ferry schedule paper on bench abstract not readable, no duplicates
```

### Pass 2 — Zone B: working gear (4 items)

```
Same art style, EXACTLY ONE of each: wooden salt crate on dock, folded fishing net bundle, weathered wharf plank with nail, one white seagull feather on planks, no duplicates
```

### Pass 3 — Zone C: tools (3 items)

```
Same art style, EXACTLY ONE of each: brass pocket compass in leather case, old oil lantern warm glass, ornate brass floodgate key on keyring, no duplicates
```

### Pass 4 — Zone D: specials + Brakeman (3 items)

```
Same art style, EXACTLY ONE of each: torn map scrap gold foil handheld, brass token on wet planks, grey tomcat notched left ear behind rope coil right Brakeman, no duplicates
```

---

## Single-pass fallback

```
[GLOBAL ART STYLE], ferry platform harbor afternoon fog,

MANDATORY exactly one each casual unique everyday nautical —
DOCK: mooring rope, fog buoy, ferry schedule,
GEAR: salt crate, fisher net, wharf plank, seagull feather,
TOOLS: compass, oil lantern, floodgate key,
SPECIALS: map scrap, brass token, tomcat behind rope coil Brakeman
```

---

## Negative prompt

```
two ropes, two compasses, gore, dead fish piles, orange tabby, two cats, two tokens, horror storm, readable schedule text, watermark, empty dock, full human figures
```

---

## After you generate

Audit **13** rows → save → resize → hit-tune → import
