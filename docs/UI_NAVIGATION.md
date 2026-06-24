# UI navigation conventions

Use this document when adding or changing screens so navigation stays consistent across **The Lost Line**.

## Shared component

All non-gameplay back/exit navigation uses **`ScreenNav`** (`src/ui/components/ScreenNav.tsx`).

- Renders a vertical stack of bold pill buttons on the **left** (`map-nav-actions` + `map-nav-btn`).
- The main action uses `map-nav-btn-primary` (gold gradient).
- Secondary actions use the default panel style.
- On narrow viewports, the nav row moves to the **top** and flows horizontally.

```tsx
import { ScreenNav } from '@ui/components/ScreenNav';

<ScreenNav
  ariaLabel={t('app.menu')}
  links={[
    { to: '/', label: t('app.menu'), primary: true },
    { to: '/intro', label: t('app.gameOverview') },
  ]}
/>
```

**Do not** use `back-link` (← text links) for screen navigation. That pattern is deprecated.

## Layout

| Screen type | Wrapper class | Grid |
|-------------|---------------|------|
| Transit map | `map-odyssey-layout` | Nav · preview panel · map diagram |
| Station | `station-layout` | Nav · hero panel · location list |
| Utility (settings, credits, story) | `screen-odyssey-layout` | Nav · main content |

Utility screens: title (`screen-title`) above the grid; nav + scrollable content below.

## Per-screen rules

| Screen | Route | Navigation |
|--------|-------|------------|
| Main menu | `/` | No back nav — primary actions live in the menu card |
| Game overview / prologue | `/intro` | Single CTA at bottom (`intro-begin-btn`); no side nav |
| Transit map | `/map` | **Menu** → `/` (primary), **Game overview** → `/intro` |
| Station | `/station/:chapterId` | **Back to transit map** → `/map` (primary) |
| Gameplay | `/play/:boardId` | **Menu** → `/station/:chapterId` via `game-chrome-btn` (top-left overlay, not `ScreenNav`) |
| Story (chapter complete) | `/story/:chapterId` | **Back to transit map** → `/map` (primary), **Menu** → `/` |
| Settings | `/settings` | **Menu** → `/` (primary) |
| Credits | `/credits` | **Menu** → `/` (primary) |

## Gameplay exception

Gameplay uses compact **`game-chrome-btn`** controls in the viewport overlay (top-left), not `ScreenNav`, because the scene is full-bleed. Menu from gameplay returns to the **current chapter station**, not the main menu or transit map.

## Adding a new screen

1. Pick the layout row from the table above.
2. Import `ScreenNav` and wire links per the per-screen rules.
3. Use i18n keys under `app.*` or domain keys (`station.*`, etc.) for labels.
4. Set `aria-label` on the nav to describe the group (usually `t('app.menu')` or a screen-specific back label).
5. Mark exactly one link `primary: true` unless the screen has no clear primary (rare).

## CSS classes (do not duplicate)

- `map-nav-actions` — nav column / row container
- `map-nav-btn` — default nav button
- `map-nav-btn-primary` — gold primary action
- `screen-odyssey-layout` — two-column utility layout (nav + content)
- `game-chrome-btn` — gameplay overlay controls only
