# THE LOST LINE
### A Hidden Object Mystery — Design Bible (v1.1)

> **Adventure pack ID:** `the-lost-line`  
> **Engine:** Hidden Objects (modular web app)  
> **Status:** MVP = Stops 1–3 (9 boards); Stops 4–25 locked on map

---

## 1. Logline

A night-shift clerk at Meridian City's Lost & Found discovers a subway line that isn't on any map — the line where the city's lost things, lost moments, and quietly forgotten people end up. To find her vanished grandmother and stop the "forgetting" from spreading, she must ride the line stop by stop, recover what's been lost, and redraw the missing line back onto the map itself.

---

## 2. Tone & Genre

**Genre:** Hidden-object mystery / **cozy magical realism**.

**Tone in one breath:** *Spirited Away* meets a gentle detective story meets a vintage transit map. Warm, melancholy-but-hopeful, gently uncanny — **never horror.** The emotional engine is **loss and reunion** — returning something lost to the person who lost it.

**Aesthetic pillars:**
- Warm lantern glow, soft neon, reflections, fog, steam — **always lit**, never pitch-black
- Vintage transit design: enamel signs, tile mosaics, ticket stubs, brass tokens
- Late-night jazz soundtrack (Phase 2 audio) — hum of an empty platform, distant train
- Magical-realist touches treated as ordinary: a pocket watch still warm, a lantern that won't go out

**Lighting ratio (art direction):**
| Tier | Share | Examples |
|------|-------|----------|
| Day / golden hour | ~40% | Lantern market, festival district, reunion scenes |
| Evening / lantern glow | ~40% | Platforms, cafés, Lost & Found at dusk |
| Night (cozy-lit) | ~20% | Neon Mile, train interiors — always has light sources |

**What this tone rules OUT:** jump-scares, gore, horror-adjacent emptiness, villainy-for-villainy's-sake. Stakes are emotional, not violent. Family-safe.

---

## 3. Setting — Meridian City (Tokyo-inspired)

Fictional metropolis with **Tokyo-forward** art direction: dense neighborhoods, layered underground, lantern markets, shrine-adjacent quiet stops, and cozy neon — while keeping a **fictional transit system** (not real Tokyo Metro branding).

The story (lost things, reunion, night shift, community memory) fits Japanese cultural themes of *mono no aware*, seasonal light, and train-line life without requiring literal Japan-only plot beats.

The city has an **official subway map** and a hidden **Lost Line** erased from it.

---

## 4. Central Mystery (Designer spoilers)

**Surface:** Impossible objects arrive at Lost & Found stamped with unknown station names. People go missing and no one remembers them. Where is Wren's grandmother Edith?

**Truth (staged reveals):**
- The **Lost Line** collects everything the city loses — objects, memories, forgotten people
- **Edith Calloway** was the Conductor who returned lost things to the world
- **Marius Kheel ("the Collector")** severed the line and erased its terminus to hoard the lost forever; Edith was trapped at the terminus
- Severing causes "forgetting" to leak into the city

**Climax:** Restore the terminus to the map + **return to the Collector the one thing he lost** so he can let go. Completing the map = solving the mystery = winning.

---

## 5. Cast

| Character | Role |
|-----------|------|
| **Wren** (late 20s, she/her) | Protagonist. Graveyard-shift Lost & Found clerk. Observant — in-world reason she's good at finding things. Grandmother Edith vanished when Wren was a child. |
| **Brakeman** | Grey tomcat, notched ear. **Easter egg** in every board (bonus points). Late reveal: Edith's cat, left as a guide. Does **not** replace the hint system. |
| **Silas Vane** | The Conductor. Cryptic ally; delivers **hint flavor** in story. Fading each time he helps. |
| **Marius Kheel** | The Collector. Sympathetic antagonist. Grief-broken hoarder. Weakness: cannot keep what is freely **returned**. |
| **Edith Calloway** | Missing grandmother / former Conductor. **25 letters** (one per chapter complete). |

---

## 6. Subway Map = Navigation + Progress

**Map screen** = level select, progress tracker, journal — and in Act III, win condition.

- Visited stations light up; locked stations greyed; line **draws itself** as Map Fragments are collected
- Terminus starts as scratched-out blank at map edge
- Tap station → platform view with 3–5 board nodes; show best score, specials found, letter status
- **Phase 2:** Toggle Official vs Lost map; carry-across puzzles between versions

**Replay fiction:** *"The Lost Line runs again each night. A sharper eye catches what the first pass missed."* — justifies score chasing on cleared boards.

**Hint fiction:** Silas's brass tokens / the departures board "nudges" you toward a district — ties 60s hint UI to the world.

---

## 7. Gameplay Systems

### 7.1 Engine mapping (every board)

| In-world | Engine implementation | MVP |
|----------|----------------------|-----|
| Standard lost objects | Find-list items | ✓ |
| Map Fragment | Special collectible #1 | ✓ |
| Brass token / subway token | Special collectible #2 | ✓ |
| Edith's letter | Story card on **chapter complete** | ✓ |
| Brakeman sighting | Hidden easter egg (bonus score) | ✓ |
| Memory Vignette | Story card on key object found | Phase 2 |
| Station lock mini-puzzle | Contextual puzzle to clear stop | Phase 2 |
| Official / Lost map toggle | Dual-map boards | Phase 2 |
| Vintage tickets | Journal cosmetics | Full game |
| Evidence vs Lost Property | Data flags on standard items | ✓ (metadata only) |

### 7.2 Core loop (per board)

1. Arrive at board (hidden-object scene)
2. Find list items + 2 specials + optional Brakeman
3. Score, hints (60s cooldown, area highlight), pan/zoom
4. Board complete → update map, save progress
5. After all boards in chapter → story card + Edith letter

### 7.3 Difficulty (player profile setting)

| | Relaxed | Normal | Hard |
|--|---------|--------|------|
| Objects | 8 | 10 | 12 |
| Time | Stats only | Soft bonus | Strict penalty |
| Miss penalty | Spam only | Spam only | Every miss |
| Hint cooldown | 45s | 60s | 90s |

**Custom:** full control. See engine `difficulty.ts`.

### 7.4 Narrative vs mechanical time

- **Narrative fading (Act II):** Wren visually fades in story — cosmetic/story stakes, **no fail**
- **Mechanical timer:** from difficulty settings only
- Marrow Lane anchor slows **story** fading, not difficulty rules

### 7.5 Pan & zoom

- Pinch + scroll wheel + UI +/- / Reset
- **No double-tap** (conflicts with object taps)
- Drag to pan when zoomed > 1.0×

### 7.6 Scene types

| Type | MVP | Phase |
|------|-----|-------|
| Classic list-find | ✓ | — |
| Silhouette-find | — | Phase 2 |
| Return-to-owner (story) | ✓ (flavor) | — |
| What changed? (dual map) | — | Phase 2 |
| Assemble-object | — | Phase 2 |

---

## 8. Collectibles & Motifs

- **Map Fragments** → special #1; restore the Lost Line on the map UI
- **Brass Tokens** → special #2; unlock new stops (narrative + map gates)
- **Edith's 25 Letters** → epistolary spine; delivered on chapter complete
- **Brakeman** → optional per-board easter egg
- **Vintage Tickets** → post-game journal cosmetics (Full game)

---

## 9. Three-Act Structure

- **Act I (Stops 1–6):** Anomaly, first objects, board the Lost Line
- **Act II (Stops 7–18):** Ride the line, learn Collector's truth, narrative fading begins
- **Act III (Stops 19–25):** Terminus, complete map, reunion, post-game hub

---

## 10. The 25 Stops

> **Art tier:** 🟢 MVP-ready pack · 🟡 needs search · 🔴 custom/Phase 2  
> **MVP:** Stops 1–3 only (9 boards). Stops 4–25 visible but locked.

### ACT I — The Anomaly

**1. Central Exchange — Lost & Found HQ** 🟢 · *tutorial / hub*  
Vibe: grand transit cathedral at midnight, warmly lit. Beat: first shift; Brakeman; impossible brass token; Edith photo + Letter #1 on chapter complete.  
Screens: (a) Lost & Found Counter, (b) Platform 1 at midnight, (c) Ticket Hall.  
Key: inciting brass token. Revisit: 6, 24.

**2. Lantern Street** 🟢 · *first case*  
Vibe: lantern-strung **evening** market. Beat: return violinist's case; phantom platform glimpse.  
Screens: (a) Market, (b) Busking corner, (c) Underpass.  
Key: return-to-owner tutorial. Revisit: 12.

**3. Gull Harbor (Tidegate)** 🟡 · *forgetting rules*  
Vibe: foggy waterfront, **soft afternoon light** (not oppressive). Beat: forgotten person; fading witness; first Map Fragment.  
Screens: (a) Ferry platform, (b) Fishmonger stalls, (c) Pier.  
Key: floodgate key (pays off 13). Revisit: 18.

**4. Old Bell (Belfry)** 🟡 · *meet Silas*  
Vibe: clocktower, whimsical stopped clocks (bells ring wrong notes). Beat: three tokens to call the train.  
Screens: (a) Clock gallery, (b) Bell chamber, (c) Waiting room.

**5. Cinder Yards** 🔴 · *sabotage discovered*  
Vibe: industrial sidings, molten **glow** (warm, not grim). Beat: deliberate erasure; Collector's calling card.  
Screens: (a) Scrapyard, (b) Signal tower, (c) Boneyard.

**6. Central Exchange — REVISIT** 🟢 · *Act I climax*  
Beat: board Platform 0; enter the Lost Line. Screens: Archive, Platform 0, Train interior.

### ACT II — Riding the Lost Line

**7. The Drift** 🟡 · first Lost Line stop  
**8. Paper Lantern District** 🟢 · frozen festival, cozy  
**9. Vellum Square (Library)** 🟡 · Collector's identity revealed  
**10. Marrow Lane** 🟢 · Wren begins to fade (visual only)  
**11. The Aviary** 🟡 · Edith's scarf; Brakeman hint  
**12. Lantern Street — REVISIT** 🟢 · Lost-side; carry-across (Phase 2)  
**13. Rivermouth** 🔴 · flooded junction; midpoint twist  
**14. Letting-Go Garden** 🟡 · *(renamed from Ash Garden)* — things chosen to release, not death  
**15. The Spindle (Clockworks)** 🔴 · restart the line  
**16. Neon Mile** 🟡 · dazzling comfort-trap; warm arcade lights  
**17. Cradle Station** 🟡 · Collector's first hoard; his lost token  
**18. Gull Harbor & Cinder — REVISIT** 🔴 · Act II climax  

### ACT III — The Lost Station

**19. Quiet Car** 🟡 · *(renamed from The Hush)* — soft muffled warmth, not horror silence  
**20. Mirror Yards** 🔴 · reflection gauntlet  
**21. Terminus Lost — Part 1** 🔴 · confrontation  
**22. Terminus Lost — Part 2** 🔴 · complete the map wall (climax)  
**23. The Returned Line** 🟢 · reunion montage  
**24. Central Exchange — Homecoming** 🟢 · Edith returns  
**25. Terminus Reopened** 🟢 · post-game hub; **Architect's Route** score-attack replay (not "Darker Line")

---

## 11. Endings

**Core (always):** Map completed, line restored, forgetting reversed, Wren reunited with Edith.

**Branch A — Redemption:** Collector becomes keeper-of-returns.  
**Branch B — Release:** Collector lets go peacefully.

Tonal target: earned warmth. Last image: busy Lost & Found counter, one more letter from Edith.

---

## 12. Content Package Template (per stop)

For each station, author:
1. Establishing description (2–4 sentences, §2 tone)
2. 3–5 boards: scene description, object list (count from difficulty), 2 specials, Brakeman spot
3. Chapter-complete story card + Edith letter
4. NPC threads introduced/paid off
5. Map Fragment + token placement

**Object count:** 6–15 per board via player difficulty — not fixed in content.

---

## 13. Resolved Decisions

| Question | Decision |
|----------|----------|
| Tone | Cozy magical realism; not noir; family-safe lighting |
| City | Fictional Meridian City |
| Protagonist | Fixed: Wren (she/her) |
| Objects per board | Player difficulty setting |
| Art | Licensed stock + composited sprites; see `adventures/the-lost-line/credits.json` |
| Audio | Phase 2; mysterious jazz; mute + volume toggles |
| Language | English MVP; i18n keys throughout |
| Save | Local IndexedDB; export/import JSON |
| Hosting | Static frontend; no backend |
| UI | Horizontal bottom HUD; subway map level select |
| Map UI | Schematic diagram **+** Odyssey-style strip & preview panel |
| City art direction | Tokyo-inspired Meridian (fictional) |
| Fullscreen | User-initiated only (no auto-enter) |
| Hosting | Cloudflare Pages recommended; Apache self-host supported |

---

## 14. Art Source Matrix (MVP)

| Pack | Creator | License | MVP use |
|------|---------|---------|---------|
| Free VN Starter Pack 2 | Potat0Master | Royalty-free | City, train, rooms |
| Contemporary VN Backgrounds | Spiral Atlas | CC BY 4.0 | Subway, downtown |
| Cafe Backgrounds | Itsu | Credit required | Café scenes |
| Cozy House | Nimerone | Credit required | Interiors |
| Fantasy Items 16×16 | Marie Pepo | Credit required | Hidden objects |
| Items pack 16×16 | Glionox | Credit appreciated | Hidden objects |
| Kenney UI | Kenney | CC0 | Buttons, chrome |

Full attribution in-game: **Credits** screen reads `credits.json`.

---

## 15. Open Questions (for author / player)

1. **Ending branch default** — should MVP hint toward Redemption or stay neutral until Stop 22?
2. **Brakeman bonus** — flat +50 pts per sighting, or collectible track (12/25)?
3. **Map visual** — schematic diagram (Muni-style) or simplified Odyssey strip for MVP?

---

*See `docs/content/stop-01-central-exchange.md` for the turnkey Stop 1 template.*
