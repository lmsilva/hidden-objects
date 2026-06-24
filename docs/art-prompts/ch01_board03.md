# ch01_board03 — Midjourney art brief (ticket hall)

> **COPY-PASTE FOR MIDJOURNEY:** Use `docs/art-prompts/mj-prompts/ch01_board03/pass0.txt` etc. — **not this .md file.** See `mj-prompts/HOW_TO.txt`.

**Board:** `ch01_board03` · Central Exchange · **Grand Ticket Hall**  
**Investigation location:** Grand Ticket Hall  
**Output file:** `public/adventures/the-lost-line/backgrounds/boards/ch01_board03.png`  
**Size:** **1920×1080**

> **Style:** [`CHARACTER_STYLE_GUIDE.md`](CHARACTER_STYLE_GUIDE.md) — `--sref` from `ch01_board01` + `--cref` Brakeman.

---

## Object philosophy — casual, unique, everyday

Travelers drop **ordinary things** in a grand hall — suitcase, umbrella, coin purse, crumpled note. Each is **casual**, **unique** (one per type), and **fits a busy ticket hall** at night.

| Rule | Meaning |
|------|---------|
| **Casual** | Bouquet for someone, photo booth strip, broken umbrella — real trip debris |
| **Unique** | One suitcase, one umbrella, one purse — no duplicate luggage piles |
| **Everyday** | What Wren catalogs after the departures board flickers |
| **Scene-fit** | Grand transit cathedral — mosaic roundel, departures board, marble floor |

**Mandatory count:** **10 standards + 2 specials + 1 Brakeman = 13 objects**.

---

## Complete mandatory checklist

### Standard pool — 10 casual everyday objects

| # | ID | Paint this (one only) | Everyday story | Zone |
|---|-----|----------------------|----------------|------|
| 1 | `obj_mosaic_roundel` | **Circular ceramic mosaic roundel** on far wall (transit motif, no readable text) | Station identity | A — architecture |
| 2 | `obj_departures_board` | **Large electronic departures board** glowing soft blue (blurred rows, not readable) | Every commuter checks it | A |
| 3 | `obj_suitcase` | **One vintage hardshell suitcase** with travel stickers | Left behind in rush | B — traveler floor |
| 4 | `obj_bouquet` | **Small wrapped flower bouquet** (paper cone) | Gift someone forgot | B |
| 5 | `obj_broken_umbrella` | **One collapsed broken umbrella** (bent ribs) | Rainy night casualty | B |
| 6 | `obj_photo_booth_strip` | **Photo booth strip** of four small photos on floor | Night out memento | B |
| 7 | `obj_coin_purse` | **Small leather coin purse** (clasp closed) | Dropped change holder | C — counter/floor |
| 8 | `obj_crumpled_note` | **Crumpled handwritten note** (paper only, no readable words) | Hurried message | C |
| 9 | `obj_seal_wax` | **Red wax seal stick** on counter | Old-fashioned correspondence | C |
| 10 | `obj_transit_map` | **Folded paper transit map chart** on counter (full chart — **not** the torn scrap special) | Commuter reference | C |

### Specials + Brakeman — 3 required

| ID | Paint (one only) | Zone |
|----|------------------|------|
| `special_map_fragment` | **Handheld torn scrap** with gold foil edge — distinct from wall chart | D |
| `special_brass_token` | One brass subway token, Meridian roundel | D |
| `easter_egg_brakeman` | Grey tomcat, notched left ear, behind **suitcase** (left) | D |

---

## Zone inpainting workflow

### Pass 0 — Base hall

```
Painterly hidden-object game illustration, 16:9 1920x1080, casual PC game art Mystery Case Files style, grand Tokyo subway ticket hall at night, vaulted ceramic tile, marble floor, ticket wickets, warm lanterns, travelers lost luggage scattered, cozy magical realism, no UI no readable text no watermark no full human figures, leave floor and counters clear for everyday props
```

### Pass 1 — Zone A: architecture (2 items)

```
Same hidden-object art style, ticket hall upper wall, EXACTLY ONE of each: large circular mosaic transit roundel on wall, glowing electronic departures board with blurred destination rows abstract not readable, no duplicates
```

### Pass 2 — Zone B: traveler clutter (4 items)

```
Same art style, ticket hall floor left, EXACTLY ONE of each casual everyday object: vintage hardshell suitcase with stickers, small wrapped flower bouquet, one broken collapsed umbrella, photo booth strip of four photos on floor, no duplicates
```

### Pass 3 — Zone C: counter papers (4 items)

```
Same art style, ticket counter area, EXACTLY ONE of each: small leather coin purse, crumpled handwritten note no readable text, red wax seal stick on counter, folded paper transit map chart on counter not torn scrap, no duplicates
```

### Pass 4 — Zone D: specials + Brakeman (3 items)

```
Same art style, EXACTLY ONE of each: torn handheld map scrap gold foil edge teal line, brass subway token on marble floor, grey tomcat notched left ear peeking behind suitcase left Brakeman, no duplicates
```

---

## Single-pass fallback

```
[GLOBAL ART STYLE], grand ticket hall night vaulted tile,

MANDATORY exactly one each casual unique everyday —
ARCHITECTURE: mosaic roundel, departures board,
TRAVEL: suitcase, bouquet, broken umbrella, photo booth strip,
COUNTER: coin purse, crumpled note, seal wax, folded transit map chart not scrap,
SPECIALS: torn map scrap, brass token, grey tomcat behind suitcase Brakeman
```

---

## Negative prompt

```
duplicate suitcases, two umbrellas, two bouquets, two map scraps, wall-sized map confused with scrap, orange tabby, two cats, two tokens, horror, readable text, watermark, sparse hall, full human figures
```

---

## After you generate

1. Audit all **13** rows  
2. Save → `ch01_board03.png` → resize → hit-tune → import
