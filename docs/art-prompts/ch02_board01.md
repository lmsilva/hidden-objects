# ch02_board01 — Midjourney art brief (lantern market)

> **COPY-PASTE FOR MIDJOURNEY:** Use `docs/art-prompts/mj-prompts/ch02_board01/pass0.txt` etc. — **not this .md file.** See `mj-prompts/HOW_TO.txt`.

**Board:** `ch02_board01` · Lantern Street · **Lantern Street Market**  
**Investigation location:** Lantern Street Market  
**Output file:** `public/adventures/the-lost-line/backgrounds/boards/ch02_board01.jpg`  
**Size:** **1920×1080**

> **Style:** [`CHARACTER_STYLE_GUIDE.md`](CHARACTER_STYLE_GUIDE.md) — `--sref` + `--cref` Brakeman.

---

## Object philosophy — casual, unique, everyday

Evening market props people **actually buy, carry, and drop** — noodle bowl, spice jar, fan, **lost violin case**. Casual street life, **one of each**, nothing fantasy.

| Rule | Meaning |
|------|---------|
| **Casual** | Street food, tea kettle, coin pouch — market errands |
| **Unique** | One violin case (story prop), one fan, one scale |
| **Everyday** | Lantern Street shoppers and buskers leave these behind |
| **Scene-fit** | Paper lanterns, wooden stalls, evening golden light |

**Mandatory count:** **10 standards + 2 specials + 1 Brakeman = 13 objects**.

---

## Complete mandatory checklist

### Standard pool — 10 casual everyday objects

| # | ID | Paint this (one only) | Everyday story | Zone |
|---|-----|----------------------|----------------|------|
| 1 | `obj_lantern_string` | **String of warm paper lanterns** overhead | Market atmosphere | A — overhead |
| 2 | `obj_paper_lantern` | **Single hanging paper lantern** (cream shade, soft glow) | Stall light | A |
| 3 | `obj_wooden_sign` | **Hand-painted wooden shop sign** on stall (abstract, no readable text) | Vendor signage | A |
| 4 | `obj_noodle_bowl` | **Bowl of ramen/noodles** with chopsticks on stall counter | Street dinner | B — food stall |
| 5 | `obj_spice_jar` | **Glass spice jar** with colorful powder | Market cooking | B |
| 6 | `obj_tea_kettle` | **Cast iron tea kettle** on stall | Everyday vendor tool | B |
| 7 | `obj_merchant_scale` | **Small brass merchant balance scale** on counter | Weighing produce | B |
| 8 | `obj_violin_case` | **Black violin hard case** leaning against stall (**lost property** — story beat) | Musician left it | C — ground |
| 9 | `obj_folding_fan` | **One folded decorative folding fan** on stall or ground | Summer market item | C |
| 10 | `obj_coin_pouch` | **Small leather coin pouch** on cobblestones | Dropped change bag | C |

### Specials + Brakeman — 3 required

| ID | Paint (one only) | Zone |
|----|------------------|------|
| `special_map_fragment` | Handheld torn map scrap, gold foil edge | D |
| `special_brass_token` | Brass subway token on cobblestones | D |
| `easter_egg_brakeman` | Grey tomcat, notched left ear, **under market stall table** (center-right) | D |

---

## Zone inpainting workflow

### Pass 0 — Base market

```
Painterly hidden-object game illustration, 16:9 1920x1080, Mystery Case Files style, Tokyo evening street market alley, warm paper lanterns overhead, wooden vendor stalls, steam and spices, crowded everyday clutter, Spirited Away cozy mood, no UI no text no watermark no full human figures, leave stall tops and ground clear
```

### Pass 1 — Zone A: overhead & signs (3 items)

```
Same hidden-object art style, market overhead, EXACTLY ONE of each: string of paper lanterns, single hanging paper lantern cream shade, hand-painted wooden shop sign abstract not readable, no duplicates
```

### Pass 2 — Zone B: stall food & trade (4 items)

```
Same art style, market stall counter, EXACTLY ONE of each casual everyday: bowl of noodles with chopsticks, glass spice jar, cast iron tea kettle, small brass merchant balance scale, no duplicates
```

### Pass 3 — Zone C: ground & lost items (3 items)

```
Same art style, market ground, EXACTLY ONE of each: black violin hard case leaning on stall, folded decorative folding fan, small leather coin pouch on cobblestones, no duplicates
```

### Pass 4 — Zone D: specials + Brakeman (3 items)

```
Same art style, EXACTLY ONE of each: torn map scrap gold foil handheld, brass token on stones, grey tomcat notched left ear under market stall table center-right Brakeman, no duplicates
```

---

## Single-pass fallback

```
[GLOBAL ART STYLE], evening lantern street market,

MANDATORY exactly one each casual unique everyday —
OVERHEAD: lantern string, paper lantern, wooden sign,
STALL: noodle bowl, spice jar, tea kettle, merchant scale,
GROUND: violin case, folding fan, coin pouch,
SPECIALS: map scrap, brass token, tomcat under stall Brakeman
```

---

## Negative prompt

```
duplicate violin cases, two kettles, two fans, orange tabby, two cats, two tokens, fantasy weapons, horror, readable shop text, watermark, empty market, full human figures
```

---

## After you generate

Audit **13** rows → save → resize → hit-tune → import
