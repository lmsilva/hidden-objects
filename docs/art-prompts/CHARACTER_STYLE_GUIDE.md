# Character & recurring visual style guide (Midjourney)

Use this document for **every** composited board. Recurring elements must look like the **same** cat, token, and map scrap across all 25+ scenes.

**Workflow:** Generate **reference sheets first** → lock with `--sref` / `--cref` → paste blocks below into each board prompt.

Reference images (save your approved generations here):

```
docs/art-prompts/references/
  brakeman-reference.png      ← generate first; use --cref on all boards
  brass-token-reference.png   ← optional --cref for specials
  map-fragment-reference.png
  style-reference.png         ← best ch01_board01 frame; use --sref for all boards
```

---

## Global art style (paste into EVERY board prompt)

```
Painterly hidden-object game illustration, 16:9 landscape 1920x1080, casual PC game art style similar to Mystery Case Files / Hidden Expedition, cohesive illustrated realism NOT photorealistic NOT pixel art NOT anime chibi, soft brushwork, warm cozy lighting with visible shadows, Tokyo-inspired Meridian City magical realism, family-safe, no horror, no UI, no text, no watermarks, no full human figures in scene
```

**Style reference (`--sref`):** After you approve `ch01_board01.png`, use it as `--sref` on all later boards so line weight, color grading, and object rendering stay consistent.

---

## Tier 1 — Must match exactly (every board)

### Brakeman (easter egg cat)

| Attribute | Locked design |
|-----------|----------------|
| Species | **Grey shorthair tomcat** (blue-grey coat, no stripes or subtle mackerel only) |
| Ear | **Single notched/torn left ear** (signature — always the left ear) |
| Eyes | Yellow-green, almond, calm |
| Size | Small adult cat — hidden-object scale (fits under furniture edge) |
| Expression | Watchful, still — not cartoonish |
| Count | **Exactly ONE cat** in the entire scene |
| Placement | Partially hidden: under furniture, behind object, edge of frame — never center-stage |

**Midjourney snippet (paste verbatim):**

```
exactly one small grey shorthair tomcat with notched left ear and yellow-green eyes, Brakeman character, partially hidden peeking from [LOCATION], same cat design as reference, subtle easter egg placement
```

**After first good Brakeman close-up:** save as `brakeman-reference.png` → append `--cref <url>` on every board generation.

**Do NOT use:** orange tabby, black cat, multiple cats, cartoon cat, realistic photo cat pasted on illustration.

---

### Brass transit token (special collectible)

| Attribute | Locked design |
|-----------|----------------|
| Shape | Round coin/token, ~25mm diameter |
| Material | Warm **brass** with slight patina |
| Marking | Embossed **Meridian roundel** — circle with stylized "M" or concentric ring motif (fictional, not real metro logos) |
| Edge | Slightly worn rim |
| Count | **Exactly ONE** token per scene |

**Midjourney snippet:**

```
exactly one vintage brass subway token coin with embossed Meridian roundel symbol, warm patina, single object only
```

Use `--cref` from `brass-token-reference.png` once approved.

---

### Map fragment (special collectible)

| Attribute | Locked design |
|-----------|----------------|
| Form | **Torn scrap** of transit map (handheld paper size, not wall poster) |
| Colors | Teal line art on cream paper, **gold foil** along torn edge |
| Content | Abstract curved line segment (Lost Line), no readable station names |
| Count | **Exactly ONE** scrap per scene — distinct from any full wall map poster in pool |

**Midjourney snippet:**

```
exactly one torn scrap of transit map paper with gold foil torn edge and teal curved line, handheld size, not a wall poster
```

---

## Tier 2 — Recurring props (same design when they appear)

| Prop | Design lock | Boards |
|------|-------------|--------|
| Edith's photo | Small framed portrait: kind-eyed older woman, silver hair, warm smile — **same face** if photo appears in multiple scenes | ch01, select story boards |
| Silas's conductor glove | Worn brass-button navy glove (object only, not worn) | rare pool item later |
| Lantern motif | Warm paper lantern, cream shade, soft glow | ch02+ |

Tier 2 items get reference PNGs when they recur in 3+ boards.

---

## Tier 3 — Characters (usually NOT in HO scenes)

| Character | Visual policy |
|-----------|----------------|
| **Wren** | Player avatar — not painted into HO scenes (first-person find) |
| **Silas Vane** | Story text only in MVP; if ever in art: distant silhouette, conductor cap, no detailed face |
| **Edith** | Letters + photo prop only in MVP |
| **Marius** | Full game / late acts only |

---

## Midjourney workflow checklist

**Game integration:** After art is done, define finds in the **hit-area tuner** (`public/hit-areas/<boardId>.json`) — names and fragment/collectible roles are author-set, not fixed to this guide.

When **painting** Brakeman / token / map scrap in MJ:

### Phase A — Lock references (do once)

1. **Style plate:** Generate `ch01_board01` apartment (full scene) → approve → `style-reference.png`
2. **Brakeman sheet:** Generate tight reference:
   ```
   Character reference sheet, grey shorthair tomcat, notched left ear, yellow-green eyes, sitting and peeking poses, painterly hidden-object game art style, white/neutral background, same style as Mystery Case Files, no text
   ```
3. **Token sheet:** Single brass token, 3 angles, same style
4. **Map scrap sheet:** Torn map fragment, gold edge, same style

### Phase B — Each new board

1. Open board prompt (`docs/art-prompts/<boardId>.md`)
2. Paste **global art style** block
3. Paste board-specific scene + 30 unique objects (one of each)
4. Paste **Brakeman + specials** snippets with board-specific hiding spot
5. Add `--sref style-reference.png` and `--cref brakeman-reference.png`
6. Negative prompt includes: `orange tabby, duplicate cats, duplicate tokens, two map scraps, inconsistent character design`

### Phase C — Quality gate before hit tuning

- [ ] Brakeman matches reference (grey, notched **left** ear) — if painted
- [ ] Only one cat, one token, one map scrap — if painted
- [ ] Style matches prior approved board
- [ ] **Tuner:** names, fragment/collectible roles, and hit boxes saved to `public/hit-areas/<boardId>.json`

---

## Negative prompt block (append to every board)

```
duplicate objects, two clocks, two umbrellas, two cats, orange tabby, black cat, multiple cats, repeated items, two brass tokens, two map scraps, inconsistent character design, different cat breed, photorealistic cat cutout, pixel art, icons, stickers, 3D render, anime chibi, text, logo, watermark, empty room, sparse, horror, gore, full human figures, multiple identical items
```

---

## Agent / author notes

- Game bible canon: **Brakeman = grey tomcat, notched ear** (not orange tabby).
- When writing new `ch##_board##.md` prompts, copy Tier 1 snippets unchanged — only change `[LOCATION]` for Brakeman.
- Update this file if a reference image is re-approved (version date in filename, e.g. `brakeman-reference-v2.png`).
