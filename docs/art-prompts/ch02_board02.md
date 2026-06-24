# ch02_board02 — Midjourney art brief (busking corner)

> **COPY-PASTE FOR MIDJOURNEY:** Use `docs/art-prompts/mj-prompts/ch02_board02/pass0.txt` etc. — **not this .md file.** See `mj-prompts/HOW_TO.txt`.

**Board:** `ch02_board02` · Lantern Street · **Busking Corner**  
**Investigation location:** Busking Corner  
**Output file:** `public/adventures/the-lost-line/backgrounds/boards/ch02_board02.jpg`  
**Size:** **1920×1080**

> **Style:** [`CHARACTER_STYLE_GUIDE.md`](CHARACTER_STYLE_GUIDE.md) — `--sref` + `--cref` Brakeman.

---

## Object philosophy — casual, unique, everyday

A **musician's corner** — everyday busker gear and street clutter. Sheet music, hat with coins, metronome. All **casual**, **unique**, **ordinary** urban objects.

**Mandatory count:** **10 standards + 2 specials + 1 Brakeman = 13 objects**.

---

## Complete mandatory checklist

### Standard pool — 10 casual everyday objects

| # | ID | Paint this (one only) | Everyday story | Zone |
|---|-----|----------------------|----------------|------|
| 1 | `obj_music_stand` | **Black folding music stand** with sheet pages | Busker setup | A — pavement |
| 2 | `obj_sheet_music` | **Loose sheet music pages** on ground (notes abstract, not readable) | Rehearsal litter | A |
| 3 | `obj_bow_rosin` | **Small rosin cake** in box for violin bow | Musician supply | A |
| 4 | `obj_busker_hat` | **Worn felt hat upside-down** with a few coins | Tips from crowd | A |
| 5 | `obj_metronome` | **Wooden pyramid metronome** on pavement | Practice tool | A |
| 6 | `obj_subway_grate` | **Metal subway ventilation grate** in pavement | Everyday street | B — street |
| 7 | `obj_loose_string` | **Coil of loose violin string** on ground | Broken string replacement | B |
| 8 | `obj_ticket_stub` | **One discarded transit ticket stub** | Commuter litter | B |
| 9 | `obj_chalk_mark` | **Chalk symbol/mark** on brick wall (abstract, not words) | Street musician territory | B |
| 10 | `obj_street_lamp` | **Vintage street lamp post** at corner edge, warm glow | Evening light | C — corner |

### Specials + Brakeman — 3 required

| ID | Paint (one only) | Zone |
|----|------------------|------|
| `special_map_fragment` | Handheld torn map scrap, gold foil | D |
| `special_brass_token` | Brass token on pavement | D |
| `easter_egg_brakeman` | Grey tomcat behind **music stand leg** | D |

---

## Zone inpainting workflow

### Pass 0 — Base corner

```
Painterly hidden-object game illustration, 16:9 1920x1080, Mystery Case Files style, Tokyo street busking corner evening, café awning, brick wall, subway grate in pavement, vintage street lamp, scattered musician everyday clutter, cozy not gritty, no UI no text no watermark no full human figures
```

### Pass 1 — Zone A: musician props (5 items)

```
Same hidden-object art style, busking pavement, EXACTLY ONE of each casual everyday: black folding music stand with pages, loose sheet music on ground abstract notes, small violin rosin cake box, worn busker hat upside down with coins, wooden metronome on pavement, no duplicates
```

### Pass 2 — Zone B: street litter (4 items)

```
Same art style, EXACTLY ONE of each: metal subway grate in pavement, coil of loose violin string, one discarded ticket stub, chalk mark on brick wall abstract not words, no duplicates
```

### Pass 3 — Zone C: lamp (1 item)

```
Same art style, EXACTLY ONE vintage street lamp post at corner warm glow, no duplicates
```

### Pass 4 — Zone D: specials + Brakeman (3 items)

```
Same art style, EXACTLY ONE of each: torn map scrap gold foil, brass token on pavement, grey tomcat notched left ear behind music stand leg Brakeman, no duplicates
```

---

## Single-pass fallback

```
[GLOBAL ART STYLE], evening busking corner,

MANDATORY exactly one each —
MUSIC: music stand, sheet music, bow rosin, busker hat, metronome,
STREET: subway grate, loose string, ticket stub, chalk mark, street lamp,
SPECIALS: map scrap, brass token, tomcat behind music stand Brakeman
```

---

## Negative prompt

```
two music stands, two hats, orange tabby, two cats, two tokens, horror, readable graffiti words, watermark, empty street, full human figures, duplicate musician props
```

---

## After you generate

Audit **13** rows → save → resize → hit-tune → import
