# ch03_board02 — Midjourney art brief (fishmonger stalls)

> **COPY-PASTE FOR MIDJOURNEY:** Use `docs/art-prompts/mj-prompts/ch03_board02/pass0.txt` etc. — **not this .md file.** See `mj-prompts/HOW_TO.txt`.

**Board:** `ch03_board02` · Gull Harbor · **Fishmonger Stalls**  
**Investigation location:** Fishmonger Stalls  
**Output file:** `public/adventures/the-lost-line/backgrounds/boards/ch03_board02.jpg`  
**Size:** **1920×1080**

> **Style:** [`CHARACTER_STYLE_GUIDE.md`](CHARACTER_STYLE_GUIDE.md) — `--sref` + `--cref` Brakeman.  
> **Note:** Family-safe market — ice and scales only, **no gore or whole fish carcasses**.

---

## Object philosophy — casual, unique, everyday

Fish market **vendor tools and stall clutter** — ice tray, price chalk, burlap sack, measuring cup. Ordinary working-market objects, **one of each**.

**Mandatory count:** **10 standards + 2 specials + 1 Brakeman = 13 objects**.

---

## Complete mandatory checklist

### Standard pool — 10 casual everyday objects

| # | ID | Paint this (one only) | Everyday story | Zone |
|---|-----|----------------------|----------------|------|
| 1 | `obj_stall_awning` | **Striped canvas stall awning** overhead | Market shade | A — stall front |
| 2 | `obj_ice_tray` | **Metal ice cube tray** on counter | Keep catch cold | B — counter |
| 3 | `obj_fish_scale` | **Small pile of iridescent fish scales** on ice (scales only, not whole fish) | Processing debris | B |
| 4 | `obj_apron_clip` | **Metal clip for vendor apron** on hook | Work uniform | B |
| 5 | `obj_price_chalk` | **Stub of white price chalk** on counter | Daily pricing | B |
| 6 | `obj_measuring_cup` | **Glass measuring cup** on counter | Portion sales | B |
| 7 | `obj_burlap_sack` | **One burlap sack** leaning against stall | Storage | C — ground |
| 8 | `obj_wooden_crate` | **Wooden shipping crate** on dock | Harbor logistics | C |
| 9 | `obj_rope_coil` | **Coiled hemp rope** on ground | Dock rope | C |
| 10 | `obj_shell_necklace` | **Shell necklace** on display hook | Souvenir trinket | C |

### Specials + Brakeman — 3 required

| ID | Paint (one only) | Zone |
|----|------------------|------|
| `special_map_fragment` | Handheld torn map scrap, gold foil | D |
| `special_brass_token` | Brass token on ice bed | D |
| `easter_egg_brakeman` | Grey tomcat **under stall awning fold** | D |

---

## Zone inpainting workflow

### Pass 0 — Base fish market

```
Painterly hidden-object game illustration, 16:9 1920x1080, Mystery Case Files style, Tokyo harbor fishmonger market soft afternoon, striped canvas awning, ice beds wooden crates, vendor tools, crowded everyday market clutter family-safe no gore no whole fish, no UI no text no watermark no full human figures
```

### Pass 1 — Zone A: awning (1 item)

```
Same hidden-object art style, EXACTLY ONE striped canvas fish stall awning overhead, no duplicates
```

### Pass 2 — Zone B: counter tools (5 items)

```
Same art style, fish stall counter, EXACTLY ONE of each casual everyday: metal ice cube tray, small pile fish scales on ice not whole fish, metal apron clip on hook, stub of price chalk, glass measuring cup, no duplicates
```

### Pass 3 — Zone C: ground & display (4 items)

```
Same art style, EXACTLY ONE of each: burlap sack leaning on stall, wooden shipping crate, coiled hemp rope on ground, shell necklace on hook, no duplicates
```

### Pass 4 — Zone D: specials + Brakeman (3 items)

```
Same art style, EXACTLY ONE of each: torn map scrap gold foil, brass token on ice, grey tomcat notched left ear under stall awning fold Brakeman, no duplicates
```

---

## Single-pass fallback

```
[GLOBAL ART STYLE], harbor fishmonger stalls afternoon,

MANDATORY exactly one each casual unique everyday —
STALL: striped awning, ice tray, fish scales pile, apron clip, price chalk, measuring cup, burlap sack, wooden crate, rope coil, shell necklace,
SPECIALS: map scrap, brass token, tomcat under awning Brakeman
```

---

## Negative prompt

```
whole fish carcasses, blood, gore, guts, two ice trays, orange tabby, two cats, two tokens, readable price text, watermark, empty stall, full human figures
```

---

## After you generate

Audit **13** rows → save → resize → hit-tune → import
