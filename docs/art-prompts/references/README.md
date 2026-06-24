# Reference images for Midjourney consistency

Place approved reference PNGs here. These are **not** shipped in the game — they are for your Midjourney `--sref` / `--cref` workflow.

| File | Purpose | When to create |
|------|---------|----------------|
| `style-reference.png` | Overall painterly HOG look | After first approved full scene (ch01_board01) |
| `brakeman-reference.png` | Grey tomcat, notched **left** ear | Before generating board 2+ |
| `brass-token-reference.png` | Meridian brass token | Optional, before board 2+ |
| `map-fragment-reference.png` | Torn map scrap, gold edge | Optional |

## Brakeman reference prompt (generate first)

```
Character reference sheet, single grey shorthair tomcat, distinctive notched left ear, yellow-green eyes, calm expression, sitting and peeking from under furniture poses, painterly hidden-object game art style like Mystery Case Files, soft shadows, neutral cream background, no text, no duplicate cats --ar 1:1
```

Upload to Midjourney → use image URL with `--cref` on every board prompt.

See `CHARACTER_STYLE_GUIDE.md` for full workflow.
