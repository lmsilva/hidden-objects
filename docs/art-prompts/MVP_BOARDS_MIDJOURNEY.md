# MVP boards — Midjourney index

## Use plain text prompts (not Markdown)

Midjourney **cannot** read `.md` files. Tables, `##`, `**bold**`, and `---` cause errors.

**Start here:** [`mj-prompts/HOW_TO.txt`](mj-prompts/HOW_TO.txt)

Each board has a folder under [`mj-prompts/`](mj-prompts/):

```
mj-prompts/ch01_board02/
  pass0.txt          ← paste entire file into MJ (base scene)
  pass1.txt …        ← one inpaint per file
  pass-final.txt     ← specials + Brakeman
  single-pass.txt    ← optional one-shot
  negative.txt       ← MJ --no field
  object-list.txt    ← checklist for you (never paste into MJ)
```

Parameters (`--ar 16:9`, `--sref`, `--cref`): [`mj-prompts/parameters.txt`](mj-prompts/parameters.txt)

---

## Board index

| Board | Investigation location | MJ prompts folder | Human reference |
|-------|------------------------|-------------------|-----------------|
| ch01_board01 | Edith's Apartment | [`mj-prompts/ch01_board01/`](mj-prompts/ch01_board01/) | [`ch01_board01.md`](ch01_board01.md) |
| ch01_board02 | Platform 1 at Midnight | [`mj-prompts/ch01_board02/`](mj-prompts/ch01_board02/) | [`ch01_board02.md`](ch01_board02.md) |
| ch01_board03 | Grand Ticket Hall | [`mj-prompts/ch01_board03/`](mj-prompts/ch01_board03/) | [`ch01_board03.md`](ch01_board03.md) |
| ch02_board01 | Lantern Street Market | [`mj-prompts/ch02_board01/`](mj-prompts/ch02_board01/) | [`ch02_board01.md`](ch02_board01.md) |
| ch02_board02 | Busking Corner | [`mj-prompts/ch02_board02/`](mj-prompts/ch02_board02/) | [`ch02_board02.md`](ch02_board02.md) |
| ch02_board03 | Phantom Underpass | [`mj-prompts/ch02_board03/`](mj-prompts/ch02_board03/) | [`ch02_board03.md`](ch02_board03.md) |
| ch03_board01 | Ferry Platform | [`mj-prompts/ch03_board01/`](mj-prompts/ch03_board01/) | [`ch03_board01.md`](ch03_board01.md) |
| ch03_board02 | Fishmonger Stalls | [`mj-prompts/ch03_board02/`](mj-prompts/ch03_board02/) | [`ch03_board02.md`](ch03_board02.md) |
| ch03_board03 | Tidegate Pier | [`mj-prompts/ch03_board03/`](mj-prompts/ch03_board03/) | [`ch03_board03.md`](ch03_board03.md) |

**Style & characters:** [`CHARACTER_STYLE_GUIDE.md`](CHARACTER_STYLE_GUIDE.md)

---

## Generation order

1. **ch01_board01** → approve → `--sref` for boards 2–9  
2. Reference sheets: Brakeman, brass token, map scrap  
3. ch01_board02 → ch01_board03 → ch02_* → ch03_*

After each PNG: hit-area tuner → `node tools/import-hit-areas.mjs export.json`

Regenerate txt from script: `node tools/generate-mj-prompt-txt.mjs` (boards 03–09)
