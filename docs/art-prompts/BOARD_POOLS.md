# Board object pools (all scenes)

## System (updated)

| Concept | Value |
|---------|--------|
| **Author-defined finds** | You name and box objects in the **hit-area tuner** to match your composited art |
| Objects on **find list** each new game | **8–12** standards (difficulty) + fragment + collectible when configured |
| **Map fragment** | One object per board with role `fragment` |
| **Collectible (token)** | One object per board with role `collectible` |
| **Brakeman** | Optional cat (`brakeman` role) |

**Midjourney / AI art** supplies a **crowded scene** — not a binding 30-name inventory. The checklist in `ch01_board01.md` is a **reference**, not a contract. After painting, define the real list in the tuner.

**Canonical data:** `public/hit-areas/<boardId>.json` (preloaded by tuner, updated on import).

**Workflow per board:**

1. Composited PNG in `backgrounds/boards/`
2. Hit-area tuner → rename, roles, polygons (preloads existing JSON)
3. Export → `node tools/import-hit-areas.mjs export.json`
4. `npm run export:tuner-data` if you edited pools in TypeScript directly

---

## Pool status

| Board | Scene | Configured hits | Art prompt | Composited art |
|-------|-------|-----------------|------------|----------------|
| ch01_board01 | Apartment | 10/33 tuned | `ch01_board01.md` | Composited PNG |
| ch01_board02 | Subway platform | 13/13 placeholder | `ch01_board02.md` | Composited PNG |
| ch01_board03 | Ticket hall | 13/13 placeholder | `ch01_board03.md` | Composited PNG |
| ch02_board01 | Lantern market | 13/13 placeholder | `ch02_board01.md` | Composited PNG |
| ch02_board02 | Busking corner | 13/13 placeholder | `ch02_board02.md` | Composited PNG |
| ch02_board03 | Phantom underpass | 13/13 placeholder | `ch02_board03.md` | Composited PNG |
| ch03_board01 | Ferry platform | 13/13 placeholder | `ch03_board01.md` | Composited PNG |
| ch03_board02 | Fishmonger stalls | 13/13 placeholder | `ch03_board02.md` | Composited PNG |
| ch03_board03 | Tidegate pier | 13/13 placeholder | `ch03_board03.md` | Composited PNG |

---

## Code layout

| Path | Purpose |
|------|---------|
| `public/hit-areas/<boardId>.json` | Canonical names, roles, hit shapes |
| `src/.../boards/pools/<boardId>.ts` | Standard find pool (import target) |
| `src/.../boards/index.ts` | Specials + Brakeman per board |

---

## ch01_board01

Starter pool IDs live in `pools/ch01_board01.ts`. **Rename or replace** via tuner — e.g. only box items that exist in your PNG. See `ch01_board01_RENDER_AUDIT.md` for what the current art actually contains.
