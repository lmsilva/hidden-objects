# Canonical hit-area definitions

Each file is the **source of truth** for object names, roles, and hit shapes for one board.

| File | Board |
|------|-------|
| `ch01_board01.json` | Central Exchange — apartment |
| … | (one JSON per MVP board) |

## Format (v2)

```json
{
  "boardId": "ch01_board01",
  "version": 2,
  "objects": [
    {
      "id": "obj_brass_scale",
      "displayName": "Kitchen scale",
      "collectibleRole": "standard",
      "bounds": { "x": 567, "y": 501, "width": 215, "height": 179, "polygon": [[...]] },
      "configured": true
    }
  ]
}
```

`collectibleRole`: `standard` | `fragment` | `collectible` | `brakeman`

## Workflow

1. **Hit-area tuner** (`npm run dev` → `/hit-area-tuner.html`) preloads this folder automatically.
2. Tweak names, roles, polygons; export JSON from the tuner.
3. **Import into code:** `node tools/import-hit-areas.mjs path/to/export.json`
4. Import updates TypeScript pools + refreshes these JSON files via `export-hit-areas-json.ts`.

Regenerate all JSON from code only:

```bash
npm run export:tuner-data
```

## Design note

Object lists are **author-defined in the tuner**, not locked to Midjourney checklist IDs. Paint whatever appears in your composited PNG, then name and box it here.
