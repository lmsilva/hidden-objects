# Stop 1 — Central Exchange (Lost & Found HQ)
### Chapter 1 content package · MVP template

**Adventure:** `the-lost-line` · **Stop ID:** `ch01` · **Letter:** #1  
**Boards in MVP:** 3 (`ch01_board01`–`ch01_board03`)  
**Art sources:** Spiral Atlas (subway), Potat0Master (ticket hall), Kenney + Marie Pepo (objects)

---

## Establishing description

The Central Exchange never quite sleeps. Under vaulted tile and a departures board stuck one minute from midnight, the Lost & Found counter glows like a small lighthouse. Wren is three hours into her first graveyard shift when a grey tomcat with a notched ear hops onto the scale and refuses to leave. Somewhere in the echoing hall, something has arrived that shouldn't exist — stamped with a station that isn't on any map she's ever seen.

---

## Board 1 — `ch01_board01` — The Lost & Found Counter

**Scene:** Cluttered counter, pigeonholes, dangling keys, misplaced umbrellas, a brass scale. Warm desk lamp. Midnight through arched windows.

**Background asset:** `potat0master/apartment-living-day.png` (placeholder until art import)

### Objects (Normal difficulty = 10 + 2 specials)

| ID | Label key | Type | Notes |
|----|-----------|------|-------|
| `obj_brass_scale` | objects.brass_scale | standard | On counter |
| `obj_timetable` | objects.timetable | standard | Evidence flag |
| `obj_inkwell` | objects.inkwell | standard | |
| `obj_ticket_roll` | objects.ticket_roll | standard | |
| `obj_magnifying_glass` | objects.magnifying_glass | standard | Evidence flag |
| `obj_coffee_cup` | objects.coffee_cup | standard | |
| `obj_rubber_stamp` | objects.rubber_stamp | standard | |
| `obj_pocket_watch` | objects.pocket_watch | standard | Warm to touch — story flavor |
| `obj_postcard` | objects.postcard | standard | Shows Edith's photo |
| `obj_ledger` | objects.ledger | standard | |
| `special_map_fragment` | collectibles.map_fragment | special | #1 — glows faintly |
| `special_brass_token` | collectibles.brass_token | special | Inciting token — unknown station stamp |
| `easter_egg_brakeman` | easter_egg.brakeman | easter_egg | Curled on ledger |

### Story trigger
Finding `special_brass_token` unlocks interstitial: *"The token is warm. The stamp reads a station name — **Lantern Street** — that doesn't appear on any map in the archive."*

---

## Board 2 — `ch01_board02` — Platform 1 at Midnight

**Scene:** Empty platform, vintage ads, bench, vending machine hum, tracks disappearing into tunnel. Cozy-lit, not scary.

**Background asset:** `spiral-atlas/subway-platform.png` (placeholder)

### Objects (Normal = 10 + 2 specials)

| ID | Label key | Type |
|----|-----------|------|
| `obj_bench_plaque` | objects.bench_plaque | standard |
| `obj_vending_snack` | objects.vending_snack | standard |
| `obj_loose_button` | objects.loose_button | standard |
| `obj_newspaper` | objects.newspaper | standard |
| `obj_enamel_sign` | objects.enamel_sign | standard |
| `obj_lost_scarf` | objects.lost_scarf | standard |
| `obj_coin` | objects.coin | standard |
| `obj_schedule_poster` | objects.schedule_poster | standard |
| `obj_glove` | objects.glove | standard |
| `obj_token_slot` | objects.token_slot | standard |
| `special_map_fragment` | collectibles.map_fragment | special |
| `special_brass_token` | collectibles.brass_token | special |
| `easter_egg_brakeman` | easter_egg.brakeman | easter_egg |

---

## Board 3 — `ch01_board03` — The Ticket Hall & Departures Board

**Scene:** Grand ticket hall, mosaic roundel, flickering departures board. One row scrolls destinations that blur when you stare.

**Background asset:** `potat0master/city-day.png` (placeholder)

### Objects (Normal = 10 + 2 specials)

| ID | Label key | Type |
|----|-----------|------|
| `obj_departures_board` | objects.departures_board | standard |
| `obj_mosaic_roundel` | objects.mosaic_roundel | standard |
| `obj_suitcase` | objects.suitcase | standard |
| `obj_bouquet` | objects.bouquet | standard |
| `obj_transit_map` | objects.transit_map | standard |
| `obj_coin_purse` | objects.coin_purse | standard |
| `obj_crumpled_note` | objects.crumpled_note | standard |
| `obj_broken_umbrella` | objects.broken_umbrella | standard |
| `obj_photo_booth_strip` | objects.photo_booth_strip | standard |
| `obj_seal_wax` | objects.seal_wax | standard |
| `special_map_fragment` | collectibles.map_fragment | special |
| `special_brass_token` | collectibles.brass_token | special |
| `easter_egg_brakeman` | easter_egg.brakeman | easter_egg |

---

## Chapter complete — Story card

**Title:** `story.ch01_complete.title` — *"A Station With No Map"*

**Body:**

> The brass token won't cool down. Brakeman watches the tunnel as if he can see a train no one else can.
>
> In the back of the ledger, tucked under a photo of a woman with kind eyes — your grandmother, Edith — a note in her handwriting: *"If you're reading this, you've started to notice. Don't let them convince you that lost means gone."*
>
> The departures board flickers. For one frame, a new destination appears: **Lantern Street**.

---

## Edith's Letter #1

> **My dear —**
>
> If this letter found you, then the city is already forgetting small things, and you are already learning to see what others overlook. I used to think "lost" was the end of a story. Working the line taught me it's only the middle.
>
> Start at the counter. Count what doesn't belong. The cat knows more than he lets on.
>
> — E.

---

## Map update on chapter complete

- Station **Central Exchange** lights up on map
- Line segment stub toward **Lantern Street** (locked until ch02 started)
- Unlock stop: **Lantern Street**
