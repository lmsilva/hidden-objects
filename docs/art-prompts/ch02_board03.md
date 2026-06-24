# ch02_board03 — Midjourney art brief (phantom underpass)

> **COPY-PASTE FOR MIDJOURNEY:** Use `docs/art-prompts/mj-prompts/ch02_board03/pass0.txt` etc. — **not this .md file.** See `mj-prompts/HOW_TO.txt`.

**Board:** `ch02_board03` · Lantern Street · **Phantom Underpass**  
**Investigation location:** Phantom Underpass  
**Output file:** `public/adventures/the-lost-line/backgrounds/boards/ch02_board03.png`  
**Size:** **1920×1080**

> **Style:** [`CHARACTER_STYLE_GUIDE.md`](CHARACTER_STYLE_GUIDE.md) — `--sref` + `--cref` Brakeman.  
> **Tone:** Gentle uncanny — phantom platform glow — **never horror**.

---

## Object philosophy — casual, unique, everyday

Underpass **urban litter and commuter debris** — wet leaf, discarded ticket, glass shard, train whistle souvenir. Casual objects a pedestrian would pass daily; each **unique**.

**Mandatory count:** **10 standards + 2 specials + 1 Brakeman = 13 objects**.

---

## Complete mandatory checklist

### Standard pool — 10 casual everyday objects

| # | ID | Paint this (one only) | Everyday story | Zone |
|---|-----|----------------------|----------------|------|
| 1 | `obj_phantom_sign` | **Faded peeling station sign** on tile (ghost platform name, illegible) | Urban decay | A — wall |
| 2 | `obj_flickering_light` | **Single bare bulb** on wire, warm flicker | Underpass lighting | A |
| 3 | `obj_graffiti_tag` | **Small graffiti stencil tag** on tile (abstract symbol, not words) | Street art | A |
| 4 | `obj_discarded_ticket` | **Crumpled transit ticket** on wet ground | Commuter litter | B — ground |
| 5 | `obj_wet_leaf` | **One wet autumn leaf** in puddle | Everyday nature | B |
| 6 | `obj_rusty_rail` | **Short decorative rusty rail section** on ground (relic, not full tracks) | Urban oddity | B |
| 7 | `obj_echo_shell` | **Small conch shell** on ground (echo / sound motif) | Found object | B |
| 8 | `obj_train_whistle` | **Small vintage metal train whistle** on ground | Collector trinket | C |
| 9 | `obj_glass_shard` | **One shard of broken glass** near wall | Street debris | C |
| 10 | `obj_platform_edge` | **Yellow painted platform edge line** on tunnel floor section | Transit motif | C |

### Specials + Brakeman — 3 required

| ID | Paint (one only) | Zone |
|----|------------------|------|
| `special_map_fragment` | Handheld torn map scrap, gold foil | D |
| `special_brass_token` | Brass token in puddle | D |
| `easter_egg_brakeman` | Grey tomcat in **shadow behind concrete pillar** | D |

---

## Zone inpainting workflow

### Pass 0 — Base underpass

```
Painterly hidden-object game illustration, 16:9 1920x1080, Mystery Case Files style, Tokyo underpass beneath bridge night, tiled pedestrian tunnel, damp pillars, distant soft phantom platform glow magical realism cozy never horror, puddles and urban everyday litter, no UI no text no watermark no full human figures
```

### Pass 1 — Zone A: wall (3 items)

```
Same hidden-object art style, underpass wall, EXACTLY ONE of each: faded peeling phantom station sign illegible, single flickering bare bulb on wire, small graffiti stencil tag abstract not words, no duplicates
```

### Pass 2 — Zone B: ground litter (4 items)

```
Same art style, wet underpass ground, EXACTLY ONE of each casual everyday: crumpled transit ticket, one wet autumn leaf in puddle, short rusty rail relic on ground, small conch shell on ground, no duplicates
```

### Pass 3 — Zone C: debris & line (3 items)

```
Same art style, EXACTLY ONE of each: vintage metal train whistle on ground, one shard of broken glass near wall, yellow painted platform edge line on floor, no duplicates
```

### Pass 4 — Zone D: specials + Brakeman (3 items)

```
Same art style, EXACTLY ONE of each: torn map scrap gold foil handheld, brass token in puddle, grey tomcat notched left ear in shadow behind concrete pillar Brakeman, no duplicates no orange cat
```

---

## Single-pass fallback

```
[GLOBAL ART STYLE], underpass night tiled tunnel phantom glow cozy,

MANDATORY exactly one each —
WALL: phantom sign, flickering bulb, graffiti tag,
GROUND: discarded ticket, wet leaf, rusty rail relic, echo shell,
DEBRIS: train whistle, glass shard, platform edge line,
SPECIALS: map scrap, brass token, tomcat behind pillar Brakeman
```

---

## Negative prompt

```
horror, scary monster, blood, two tickets, orange tabby, two cats, two tokens, readable graffiti, watermark, empty tunnel, full human figures, duplicate litter
```

---

## After you generate

Audit **13** rows → save → resize → hit-tune → import
