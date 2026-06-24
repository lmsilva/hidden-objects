# ch03_board03 — Midjourney art brief (tidegate pier)

> **COPY-PASTE FOR MIDJOURNEY:** Use `docs/art-prompts/mj-prompts/ch03_board03/pass0.txt` etc. — **not this .md file.** See `mj-prompts/HOW_TO.txt`.

**Board:** `ch03_board03` · Gull Harbor · **Tidegate Pier**  
**Investigation location:** Tidegate Pier  
**Output file:** `public/adventures/the-lost-line/backgrounds/boards/ch03_board03.png`  
**Size:** **1920×1080**

> **Style:** [`CHARACTER_STYLE_GUIDE.md`](CHARACTER_STYLE_GUIDE.md) — `--sref` + `--cref` Brakeman.  
> **Story beat:** Fading witness — scarf, faded photo — **forgetting** motif.

---

## Object philosophy — casual, unique, everyday

Pier **tide-line debris and personal keepsakes** — sea glass, driftwood, witness scarf, faded photo. Ordinary coastal objects someone might lose; each **unique**.

**Mandatory count:** **10 standards + 2 specials + 1 Brakeman = 13 objects**.

---

## Complete mandatory checklist

### Standard pool — 10 casual everyday objects

| # | ID | Paint this (one only) | Everyday story | Zone |
|---|-----|----------------------|----------------|------|
| 1 | `obj_tide_pool` | **Small shallow tide pool** in rock crevice at waterline | Harbor nature | A — waterline |
| 2 | `obj_barnacle_cluster` | **Cluster of barnacles** on wooden piling | Coastal wear | A |
| 3 | `obj_driftwood` | **One weathered driftwood log** on pier | Washed ashore | B — pier boards |
| 4 | `obj_pier_bolt` | **One rusted iron pier bolt** in plank | Dock hardware | B |
| 5 | `obj_sea_glass` | **One smooth piece of sea glass** (frosted green) | Beachcomber find | B |
| 6 | `obj_faded_photo` | **Small faded sepia photograph** in frame on pier | Memory fading | C — personal |
| 7 | `obj_witness_scarf` | **Knitted scarf** draped on railing (**story witness**) | Someone being forgotten | C |
| 8 | `obj_lighthouse_lens` | **Glass lighthouse lens fragment** on crate (decorative relic) | Maritime curio | C |
| 9 | `obj_rope_ladder` | **Coiled rope ladder** on pier | Harbor access | D |
| 10 | `obj_pier_lamp` | **Vintage pier lamp post** warming up at dusk | Evening light | D |

### Specials + Brakeman — 3 required

| ID | Paint (one only) | Zone |
|----|------------------|------|
| `special_map_fragment` | Handheld torn map scrap, gold foil | D |
| `special_brass_token` | Brass token between planks | D |
| `easter_egg_brakeman` | Grey tomcat behind **driftwood pile** | D |

---

## Zone inpainting workflow

### Pass 0 — Base pier

```
Painterly hidden-object game illustration, 16:9 1920x1080, Mystery Case Files style, Tokyo tidegate pier late afternoon gold light on water, wooden pier tidal pools barnacles on pilings, gentle waves cozy harbor magical realism, no UI no text no watermark no full human figures
```

### Pass 1 — Zone A: waterline (2 items)

```
Same hidden-object art style, pier waterline, EXACTLY ONE of each: small shallow tide pool in rocks, cluster of barnacles on wooden piling, no duplicates
```

### Pass 2 — Zone B: pier boards (3 items)

```
Same art style, EXACTLY ONE of each casual everyday: weathered driftwood log on pier, rusted pier bolt in plank, one smooth sea glass piece frosted green, no duplicates
```

### Pass 3 — Zone C: memory objects (3 items)

```
Same art style, EXACTLY ONE of each: faded sepia photo in small frame, knitted scarf draped on railing, glass lighthouse lens fragment on crate, no duplicates
```

### Pass 4 — Zone D: infrastructure + specials (5 items)

```
Same art style, EXACTLY ONE of each: coiled rope ladder on pier, vintage pier lamp post warm glow, torn map scrap gold foil handheld, brass token between planks, grey tomcat notched left ear behind driftwood pile Brakeman, no duplicates
```

---

## Single-pass fallback

```
[GLOBAL ART STYLE], tidegate pier late afternoon tidal pools,

MANDATORY exactly one each casual unique everyday —
WATERLINE: tide pool, barnacles,
PIER: driftwood, pier bolt, sea glass,
MEMORY: faded photo, witness scarf, lighthouse lens,
INFRA: rope ladder, pier lamp,
SPECIALS: map scrap, brass token, tomcat behind driftwood Brakeman
```

---

## Negative prompt

```
two scarves, two photos, orange tabby, two cats, two tokens, horror, storm wreckage, watermark, empty pier, full human figures, duplicate driftwood logs
```

---

## After you generate

Audit **13** rows → save → resize → hit-tune → import
