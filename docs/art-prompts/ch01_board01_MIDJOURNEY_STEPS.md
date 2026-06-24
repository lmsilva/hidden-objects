# ch01_board01 — Midjourney step-by-step (optional inpainting)

> **Workflow update:** You do **not** need all 33 checklist items in the PNG. Generate a crowded scene, then **name and box finds in the hit-area tuner** (`public/hit-areas/ch01_board01.json`). Use the steps below only if you want to inpaint specific props.

**Optional goal:** Paint map fragment, brass token, Brakeman, and any extra props you care about.

**Rule:** Do **not** use one prompt with 30 item names. Midjourney ignores most of them. Use **zone inpainting** with **≤7 named objects per pass** if inpainting.

---

## Before you start

1. Open the checklist at the bottom of this doc (or `ch01_board01.md`) — you will tick each item after every pass.
2. In Midjourney, use **Editor** (upload image → paint mask → prompt) for passes 1–5.  
   - On [midjourney.com](https://www.midjourney.com): open your image → **Editor** → brush the zone → paste prompt → **Submit**.
3. After your **first** pass you approve, add style lock on later passes:
   ```
   --sref <URL of your approved apartment image>
   ```
4. Optional but helps Brakeman on pass 5:
   ```
   --cref <URL of brakeman-reference.png>
   ```
   Generate that reference once (see `CHARACTER_STYLE_GUIDE.md`).

---

## Pass 0 — Base room (no find list)

**Action:** New generation **or** keep your current apartment if you like the layout.

**Prompt:**

```
Painterly hidden-object game illustration, 16:9 landscape, casual PC game art like Mystery Case Files, cohesive illustrated realism, warm cozy lighting, Tokyo apartment living room at night, kotatsu with teal quilted blanket center, blue floor cushions, wooden floors, warm pink walls, city night through window left, kitchen archway back, cluttered books plants dishes papers, soft shadows, cozy mood, no UI no text no watermark no full human figures, leave clear empty space on kotatsu wooden tabletop and open floor patches for placing small objects later, no cat
```

**Negative prompt (Settings → append or --no):**

```
duplicate objects, two cats, orange tabby, text, logo, watermark, empty room, sparse, anime chibi, pixel art, stickers, full human figures
```

**Check after pass 0:** Room layout OK only. Do **not** expect findables yet.

---

## Pass 1 — Kotatsu tabletop (8 items)

**Mask:** Brush only the **wooden kotatsu table surface** (not the blanket).

**Prompt:**

```
hidden-object game art same painterly style warm lighting, kotatsu tabletop only, inventory layout, EXACTLY ONE of each object clearly visible and distinct: brass balance scale, folded paper timetable, inkwell with lid, rubber stamp, green pocket calculator, fountain pen in stand, pair of chopsticks, white teacup with saucer, no duplicates, no text labels
```

**Tick when visible:** brass scale, timetable, inkwell, rubber stamp, calculator, fountain pen, chopsticks, teacup & saucer

---

## Pass 2 — Kotatsu edge + floor beside kotatsu (7 items)

**Mask:** Blue blanket edge, floor cushions, floor immediately around kotatsu.

**Prompt:**

```
same hidden-object art style, kotatsu blanket edge and blue cushions and wooden floor beside kotatsu, EXACTLY ONE of each clearly visible: roll of transit tickets, magnifying glass partly under blanket, dark ceramic coffee mug, pair of Japanese house slippers, small brass bell, empty rice bowl, plastic transit pass card, soft shadows, no duplicates
```

**Tick when visible:** ticket roll, magnifying glass, coffee cup, house slippers, brass bell, rice bowl, transit pass

---

## Pass 3 — Floor left / TV area (6 items)

**Mask:** Floor and low area near **TV console** (left side).

**Prompt:**

```
same art style, floor left near TV wooden console, EXACTLY ONE of each clearly visible: flat picture postcard on floor, thick closed ledger notebook on book stack, black TV remote control, purple pink yarn ball, small round analog alarm clock, rectangular tissue box, scattered papers, no duplicates
```

**Tick when visible:** postcard, ledger (if not using kotatsu open book), TV remote, yarn ball, analog clock, tissue box

> **Note:** If pass 1 already has an **open ledger on kotatsu**, skip duplicating ledger here — one ledger only.

---

## Pass 4 — Right wall + desk (6 items)

**Mask:** Right wall, desk, umbrella stand area.

**Prompt:**

```
same art style, right wall and desk area, EXACTLY ONE of each clearly visible: large world map poster on wall full world map not schedule chart, purple folded umbrella in stand, small lit desk lamp on desk, potted houseplant, framed photo of kind silver-haired elderly woman Edith, metal door keys on ring hanging on wall hook, no duplicates
```

**Tick when visible:** world map poster, purple umbrella, desk lamp, potted plant, framed photo, door keys

---

## Pass 5 — Misc floor + specials + Brakeman (6 items)

**Mask:** Several small regions OR one wide floor/wall mask — run twice if needed.

**Prompt (specials + cat — run first):**

```
same art style, EXACTLY ONE of each clearly visible: torn scrap of transit map paper with gold foil torn edge and teal curved line handheld size not wall poster, vintage brass subway token coin with Meridian roundel embossing on wooden floor, small grey shorthair tomcat with notched left ear and yellow-green eyes peeking from under left side of kotatsu blanket subtle hidden Brakeman, no orange cat no second cat, no duplicates
```

**Prompt (misc — second mask on floor clutter):**

```
same art style, EXACTLY ONE of each on floor or wall hook clearly visible: pocket watch on chain, scissors, sewing kit with pin cushion, no duplicates
```

**Tick when visible:** map fragment, brass token, grey cat Brakeman, pocket watch, scissors, sewing kit

---

## Pass 6 — Fix anything still missing (one object per prompt)

For **each** unchecked item, mask a **small** area where it should sit and use **only that object’s name**:

| Missing item | Mask near | Prompt |
|--------------|-----------|--------|
| Yarn ball | Floor left by TV | `exactly one purple pink ball of yarn on floor, same art style` |
| Calculator | Kotatsu top | `exactly one small green calculator on kotatsu table, same art style` |
| Chopsticks | Kotatsu top | `exactly one pair of wooden chopsticks on kotatsu, same art style` |
| House slippers | Floor by kotatsu | `exactly one pair of Japanese house slippers on floor, same art style` |
| Brass bell | Kotatsu | `exactly one small brass bell on kotatsu, same art style` |
| World map poster | Right wall | `exactly one large world map poster on wall, same art style` |
| Purple umbrella | Right side | `exactly one purple umbrella in stand, same art style` |
| Door keys | Wall hook | `exactly one key ring with keys on hook, same art style` |
| Rice bowl | Kotatsu | `exactly one empty rice bowl on kotatsu, same art style` |
| Transit pass | Kotatsu/floor | `exactly one plastic transit pass card, same art style` |
| Scissors | Floor | `exactly one pair of scissors on floor, same art style` |
| Tissue box | Floor left | `exactly one tissue box on floor, same art style` |
| Sewing kit | Floor right | `exactly one sewing kit pin cushion on floor, same art style` |
| Teacup & saucer | Kotatsu | `exactly one white teacup with saucer on kotatsu not coffee mug, same art style` |
| Map fragment | Kotatsu/floor | `exactly one torn map scrap gold foil edge handheld, same art style` |
| Brass token | Floor cushion area | `exactly one brass subway token coin on floor, same art style` |
| Grey cat | Under kotatsu left | `exactly one grey tomcat notched left ear peeking under kotatsu blanket left side Brakeman, same art style` |
| Postcard | Floor papers | `exactly one flat postcard with picture on floor, same art style` |
| Framed photo | Wall | `exactly one framed photo silver-haired grandmother on wall, same art style` |

---

## Full verification checklist (print this)

Tick **only** when you can point to the object in the image.

### Pool (30)

- [ ] Brass scale  
- [ ] Timetable  
- [ ] Inkwell  
- [ ] Ticket roll  
- [ ] Magnifying glass  
- [ ] Coffee cup  
- [ ] Rubber stamp  
- [ ] Pocket watch  
- [ ] Postcard  
- [ ] Ledger  
- [ ] TV remote  
- [ ] Yarn ball  
- [ ] Analog clock  
- [ ] Calculator  
- [ ] Fountain pen  
- [ ] Chopsticks  
- [ ] House slippers  
- [ ] Brass bell  
- [ ] Potted plant  
- [ ] World map poster  
- [ ] Purple umbrella  
- [ ] Door keys  
- [ ] Rice bowl  
- [ ] Desk lamp  
- [ ] Transit pass  
- [ ] Scissors  
- [ ] Tissue box  
- [ ] Framed photo (Edith)  
- [ ] Sewing kit  
- [ ] Teacup & saucer  

### Specials

- [ ] Map fragment (torn scrap, gold edge — **not** the wall poster)  
- [ ] Brass token (coin on floor/surface)  
- [ ] Brakeman (grey cat, **notched left ear**, under kotatsu left — **not** in window)

**All 33 checked?** → Save PNG → `node tools/resize-board-background.mjs ch01_board01` → hit-tune.

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| One prompt with 30 names | Use passes above |
| Cat in window | Prompt says **under kotatsu left**; mask that area only |
| Map poster = map fragment | Fragment = **small torn scrap**; poster = **large wall chart** — separate passes |
| Coffee mug = teacup | Mug on cushion = coffee; **teacup + saucer on kotatsu** = separate object |
| Generic clutter | Pass 6 one-object inpaint |

---

## Negative prompt (use on every Editor pass)

```
duplicate objects, two clocks, two umbrellas, two cats, orange tabby, black cat, cat in window, multiple cats, two brass tokens, two map scraps, text, logo, watermark, sparse room, missing named objects, generic clutter only
```
