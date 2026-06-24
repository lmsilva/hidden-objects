# ch01_board01 — Render audit (current PNG)

**Image:** `public/adventures/the-lost-line/backgrounds/boards/ch01_board01.png`  
**Date:** 2026-06-23  
**Verdict:** ~10 pool items are paintable as-is, ~8 are ambiguous stand-ins, **~15 must be inpainted**, and **Brakeman placement is wrong** (cat on window sill, not under kotatsu).

**Workflow:** You do **not** need to inpaint every missing checklist item. Box what exists in the **hit-area tuner**, rename to match the art, add custom objects as needed. Canonical data: `public/hit-areas/ch01_board01.json`.

---

## Your trouble list — status on this render

| Item | Status | Where to look / what to do |
|------|--------|---------------------------|
| **Postcard** | ⚠️ Ambiguous | Floor papers near kotatsu / rotary phone — no clear postcard; **inpaint** |
| **Ledger** | ✅ Present | **Open columnar book on kotatsu** (center table, right of scale) |
| **Yarn ball** | ❌ Missing | **Inpaint** — floor left by TV stand |
| **Calculator** | ❌ Missing | **Inpaint** — kotatsu tabletop |
| **Fountain pen** | ✅ Present | **In inkwell on kotatsu** (next to papers) |
| **Chopsticks** | ❌ Missing | **Inpaint** — kotatsu edge |
| **House slippers** | ❌ Missing | **Inpaint** — floor by kotatsu cushion |
| **Brass bell** | ❌ Missing | **Inpaint** — kotatsu or wall shelf |
| **Potted plant** | ✅ Present | **Bottom-left floor**, window sill, bookshelf top, right desk — pick **one** clearest for hit box |
| **World map poster** | ❌ Missing | Wall has notes/charts, not a world map — **inpaint** right wall |
| **Purple umbrella** | ❌ Missing | **Inpaint** — right side by desk |
| **Door keys** | ❌ Missing | **Inpaint** — hook near kitchen arch |
| **Rice bowl** | ❌ Missing | **Inpaint** — kotatsu |
| **Desk lamp** | ✅ Present | Green lamp on **window sill**; also pendant over kotatsu; wall lamp right — pick one canonical lamp per pool rules |
| **Transit pass** | ❌ Missing | **Inpaint** — kotatsu papers or floor |
| **Scissors** | ❌ Missing | **Inpaint** — floor clutter |
| **Tissue box** | ❌ Missing | **Inpaint** — floor left or side table |
| **Framed photo** | ⚠️ Ambiguous | **Girl portrait** above bookshelf — may not read as Edith (silver-haired); inpaint if wrong subject |
| **Sewing kit** | ❌ Missing | **Inpaint** — floor near yellow smiley bag |
| **Teacup & saucer** | ❌ Missing | Brown **mug on cushion** = coffee cup, not teacup — **inpaint** teacup on kotatsu |
| **Map fragment** | ⚠️ Ambiguous | Grid papers on kotatsu / floor may be **timetable**, not torn gold-edge scrap — **inpaint** distinct scrap |
| **Brass token** | ❌ Missing | **Inpaint** — floor by blue cushion (lower right) |
| **Grey cat (Brakeman)** | ❌ Missing | **Not visible** in current PNG (no cat in windows or under kotatsu). **Inpaint** under kotatsu left with notched ear |

### Also confirmed present (for hit-tuning)

| Item | Where |
|------|--------|
| Brass scale | Kotatsu center |
| Timetable / schedule papers | Kotatsu |
| Inkwell | Kotatsu |
| Ticket roll | Orange tape roll on floor? — verify; may need inpaint |
| Magnifying glass | Floor by rotary phone |
| Coffee cup | Brown mug on blue cushion |
| Rubber stamp | Kotatsu papers (small) |
| Pocket watch | Check wall/shelf — verify |
| TV remote | Floor lower right |
| Analog clock | **Round wall clock** right of archway |

---

## Inpaint prompts (copy-paste per item)

Use **Vary Region** / inpaint on the current image. Keep style: `same painterly hidden-object game art style, soft warm lighting, no text`.

### Kotatsu tabletop (select kotatsu wood surface)

```
exactly one small green pocket calculator on kotatsu table, same art style, no duplicates
```

```
exactly one pair of wooden chopsticks resting on kotatsu table edge, same art style
```

```
exactly one empty ceramic rice bowl on kotatsu table, same art style
```

```
exactly one white teacup with saucer on kotatsu table not a coffee mug, same art style
```

```
exactly one small brass desk bell on kotatsu table, same art style
```

### Kotatsu / floor edge (select blanket, cushions, floor beside kotatsu)

```
exactly one pair of Japanese house slippers on floor beside kotatsu blue cushion, same art style
```

```
exactly one small grey shorthair tomcat with notched left ear peeking from under left side of kotatsu blanket Brakeman, same art style, subtle
```

### Floor left / TV area (select floor near TV console)

```
exactly one purple and pink ball of yarn on wooden floor near TV stand, same art style
```

```
exactly one rectangular tissue box on floor near TV area, same art style
```

```
exactly one flat travel postcard with picture on floor among papers, same art style
```

```
exactly one thick ledger notebook closed on floor book stack, same art style
```
*(Skip if using kotatsu open book as ledger.)*

### Right wall / desk (select wall or desk zone)

```
exactly one large world map poster on pink wall clearly a world map not a schedule chart, same art style
```

```
exactly one purple folded umbrella in umbrella stand by desk, same art style
```

```
exactly one metal key ring with door keys hanging on wall hook, same art style
```

```
exactly one small sewing kit with pin cushion on floor near desk, same art style
```

### Floor clutter (small regions)

```
exactly one pair of scissors on wooden floor, same art style
```

```
exactly one plastic transit pass card on floor partially hidden, same art style
```

```
exactly one vintage brass subway token coin with roundel embossing on wooden floor, same art style
```

```
exactly one torn scrap of transit map paper with gold foil torn edge handheld size not a wall poster, same art style
```

### Framed photo (only if girl portrait is wrong for Edith)

```
exactly one framed photograph of kind silver-haired elderly woman on wall or shelf Edith, same art style
```

### Remove wrong cat (optional)

Current render has **no grey cat** — skip removal. Inpaint Brakeman only under kotatsu left.

---

## Suggested inpaint order

1. **Specials + Brakeman** (map scrap, token, cat under kotatsu)  
2. **Kotatsu cluster** (calculator, chopsticks, rice bowl, teacup, bell)  
3. **Right wall** (world map poster, umbrella, keys)  
4. **Floor left** (yarn, tissue box, postcard)  
5. **Floor misc** (scissors, transit pass, sewing kit)  
6. **Re-run audit checklist** in `ch01_board01.md`  
7. Resize → hit-tune

---

## Alternative: match art in the tuner (recommended)

Instead of inpainting every missing checklist ID, **box and rename** what is clearly in the PNG. Add custom objects for props not in the starter pool. See `public/hit-areas/ch01_board01.json` and `INTEGRATION.md`.

## Alternative: shrink pool to match art (legacy)

Only if you want to ship without more MJ work — swap missing IDs in `pools/ch01_board01.ts` for objects that **are** clearly painted. Not recommended until inpaint passes fail; the game design expects 30 unique finds per board.
