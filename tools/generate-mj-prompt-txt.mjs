/**
 * Generates plain-text Midjourney prompt files (no markdown).
 * Run: node tools/generate-mj-prompt-txt.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outRoot = path.join(__dirname, '../docs/art-prompts/mj-prompts');

const boards = {
  ch01_board03: {
    objectList: `ch01_board03 — Grand Ticket Hall — 13 objects (checklist only)
mosaic roundel, departures board, suitcase, bouquet, broken umbrella, photo booth strip, coin purse, crumpled note, seal wax, folded transit map chart not scrap, torn map scrap, brass token, grey tomcat behind suitcase`,
    pass0: `Painterly hidden-object game illustration, 16:9 1920x1080, casual PC game art Mystery Case Files style, grand Tokyo subway ticket hall at night, vaulted ceramic tile, marble floor, ticket wickets, warm lanterns, travelers lost luggage scattered, cozy magical realism, no UI no readable text no watermark no full human figures, leave floor and counters clear for everyday props`,
    pass1: `Same hidden-object art style, ticket hall upper wall, EXACTLY ONE of each: large circular mosaic transit roundel on wall, glowing electronic departures board with blurred destination rows abstract not readable, no duplicates`,
    pass2: `Same art style, ticket hall floor left, EXACTLY ONE of each casual everyday: vintage hardshell suitcase with stickers, small wrapped flower bouquet, one broken collapsed umbrella, photo booth strip of four photos on floor, no duplicates`,
    pass3: `Same art style, ticket counter area, EXACTLY ONE of each: small leather coin purse, crumpled handwritten note no readable text, red wax seal stick on counter, folded paper transit map chart on counter not torn scrap, no duplicates`,
    passFinal: `Same art style, EXACTLY ONE of each: torn handheld map scrap gold foil edge teal line, brass subway token on marble floor, grey tomcat notched left ear peeking behind suitcase left Brakeman, no duplicates`,
    singlePass: `Painterly hidden-object game illustration, 16:9 1920x1080, grand ticket hall night, EXACTLY ONE of each no duplicates: mosaic roundel, departures board, suitcase, bouquet, broken umbrella, photo booth strip, coin purse, crumpled note, seal wax, folded transit map chart not scrap, torn map scrap, brass token, grey tomcat behind suitcase Brakeman`,
    negative: `duplicate suitcases, two umbrellas, two bouquets, two map scraps, orange tabby, two cats, two tokens, horror, readable text, watermark, sparse hall, full human figures`,
  },
  ch02_board01: {
    objectList: `ch02_board01 — Lantern Street Market — 13 objects (checklist only)
lantern string, paper lantern, wooden sign, noodle bowl, spice jar, tea kettle, merchant scale, violin case, folding fan, coin pouch, torn map scrap, brass token, grey tomcat under stall table`,
    pass0: `Painterly hidden-object game illustration, 16:9 1920x1080, Mystery Case Files style, Tokyo evening street market alley, warm paper lanterns overhead, wooden vendor stalls, steam and spices, crowded everyday clutter, Spirited Away cozy mood, no UI no text no watermark no full human figures, leave stall tops and ground clear`,
    pass1: `Same hidden-object art style, market overhead, EXACTLY ONE of each: string of paper lanterns, single hanging paper lantern cream shade, hand-painted wooden shop sign abstract not readable, no duplicates`,
    pass2: `Same art style, market stall counter, EXACTLY ONE of each casual everyday: bowl of noodles with chopsticks, glass spice jar, cast iron tea kettle, small brass merchant balance scale, no duplicates`,
    pass3: `Same art style, market ground, EXACTLY ONE of each: black violin hard case leaning on stall, folded decorative folding fan, small leather coin pouch on cobblestones, no duplicates`,
    passFinal: `Same art style, EXACTLY ONE of each: torn map scrap gold foil handheld, brass token on stones, grey tomcat notched left ear under market stall table center-right Brakeman, no duplicates`,
    singlePass: `Painterly hidden-object game illustration, 16:9 1920x1080, evening lantern street market, EXACTLY ONE of each no duplicates: lantern string, paper lantern, wooden sign, noodle bowl, spice jar, tea kettle, merchant scale, violin case, folding fan, coin pouch, torn map scrap, brass token, tomcat under stall Brakeman`,
    negative: `duplicate violin cases, two kettles, two fans, orange tabby, two cats, two tokens, fantasy weapons, horror, readable shop text, watermark, empty market, full human figures`,
  },
  ch02_board02: {
    objectList: `ch02_board02 — Busking Corner — 13 objects (checklist only)
music stand, sheet music, bow rosin, busker hat, metronome, subway grate, loose violin string, ticket stub, chalk mark, street lamp, torn map scrap, brass token, grey tomcat behind music stand leg`,
    pass0: `Painterly hidden-object game illustration, 16:9 1920x1080, Mystery Case Files style, Tokyo street busking corner evening, café awning, brick wall, subway grate in pavement, vintage street lamp, scattered musician everyday clutter, cozy not gritty, no UI no text no watermark no full human figures`,
    pass1: `Same hidden-object art style, busking pavement, EXACTLY ONE of each casual everyday: black folding music stand with pages, loose sheet music on ground abstract notes, small violin rosin cake box, worn busker hat upside down with coins, wooden metronome on pavement, no duplicates`,
    pass2: `Same art style, EXACTLY ONE of each: metal subway grate in pavement, coil of loose violin string, one discarded ticket stub, chalk mark on brick wall abstract not words, no duplicates`,
    pass3: `Same art style, EXACTLY ONE vintage street lamp post at corner warm glow, no duplicates`,
    passFinal: `Same art style, EXACTLY ONE of each: torn map scrap gold foil, brass token on pavement, grey tomcat notched left ear behind music stand leg Brakeman, no duplicates`,
    singlePass: `Painterly hidden-object game illustration, 16:9 1920x1080, evening busking corner, EXACTLY ONE of each no duplicates: music stand, sheet music, bow rosin, busker hat, metronome, subway grate, loose string, ticket stub, chalk mark, street lamp, torn map scrap, brass token, tomcat behind music stand Brakeman`,
    negative: `two music stands, two hats, orange tabby, two cats, two tokens, horror, readable graffiti words, watermark, empty street, full human figures`,
  },
  ch02_board03: {
    objectList: `ch02_board03 — Phantom Underpass — 13 objects (checklist only)
phantom sign, flickering bulb, graffiti tag, discarded ticket, wet leaf, rusty rail relic, echo shell, train whistle, glass shard, platform edge line, torn map scrap, brass token, grey tomcat behind concrete pillar`,
    pass0: `Painterly hidden-object game illustration, 16:9 1920x1080, Mystery Case Files style, Tokyo underpass beneath bridge night, tiled pedestrian tunnel, damp pillars, distant soft phantom platform glow magical realism cozy never horror, puddles and urban everyday litter, no UI no text no watermark no full human figures`,
    pass1: `Same hidden-object art style, underpass wall, EXACTLY ONE of each: faded peeling phantom station sign illegible, single flickering bare bulb on wire, small graffiti stencil tag abstract not words, no duplicates`,
    pass2: `Same art style, wet underpass ground, EXACTLY ONE of each casual everyday: crumpled transit ticket, one wet autumn leaf in puddle, short rusty rail relic on ground, small conch shell on ground, no duplicates`,
    pass3: `Same art style, EXACTLY ONE of each: vintage metal train whistle on ground, one shard of broken glass near wall, yellow painted platform edge line on floor, no duplicates`,
    passFinal: `Same art style, EXACTLY ONE of each: torn map scrap gold foil handheld, brass token in puddle, grey tomcat notched left ear in shadow behind concrete pillar Brakeman, no duplicates no orange cat`,
    singlePass: `Painterly hidden-object game illustration, 16:9 1920x1080, underpass night tiled tunnel phantom glow cozy, EXACTLY ONE of each no duplicates: phantom sign, flickering bulb, graffiti tag, discarded ticket, wet leaf, rusty rail, echo shell, train whistle, glass shard, platform edge line, torn map scrap, brass token, tomcat behind pillar Brakeman`,
    negative: `horror, scary monster, blood, two tickets, orange tabby, two cats, two tokens, readable graffiti, watermark, empty tunnel, full human figures`,
  },
  ch03_board01: {
    objectList: `ch03_board01 — Ferry Platform — 13 objects (checklist only)
mooring rope, fog buoy, ferry schedule, salt crate, fisher net, wharf plank, seagull feather, compass, oil lantern, floodgate key, torn map scrap, brass token, grey tomcat behind rope coil`,
    pass0: `Painterly hidden-object game illustration, 16:9 1920x1080, Mystery Case Files style, Tokyo harbor ferry platform soft afternoon fog, wooden wharf planks, mooring bollards, calm water, everyday nautical clutter, warm gentle light magical realism, no UI no text no watermark no full human figures`,
    pass1: `Same hidden-object art style, ferry dock edge, EXACTLY ONE of each casual everyday: coiled mooring rope on bollard, red white fog buoy, folded ferry schedule paper on bench abstract not readable, no duplicates`,
    pass2: `Same art style, EXACTLY ONE of each: wooden salt crate on dock, folded fishing net bundle, weathered wharf plank with nail, one white seagull feather on planks, no duplicates`,
    pass3: `Same art style, EXACTLY ONE of each: brass pocket compass in leather case, old oil lantern warm glass, ornate brass floodgate key on keyring, no duplicates`,
    passFinal: `Same art style, EXACTLY ONE of each: torn map scrap gold foil handheld, brass token on wet planks, grey tomcat notched left ear behind rope coil right Brakeman, no duplicates`,
    singlePass: `Painterly hidden-object game illustration, 16:9 1920x1080, ferry platform harbor afternoon fog, EXACTLY ONE of each no duplicates: mooring rope, fog buoy, ferry schedule, salt crate, fisher net, wharf plank, seagull feather, compass, oil lantern, floodgate key, torn map scrap, brass token, tomcat behind rope coil Brakeman`,
    negative: `two ropes, two compasses, gore, dead fish piles, orange tabby, two cats, two tokens, horror storm, readable schedule text, watermark, empty dock, full human figures`,
  },
  ch03_board02: {
    objectList: `ch03_board02 — Fishmonger Stalls — 13 objects (checklist only)
stall awning, ice tray, fish scales pile, apron clip, price chalk, measuring cup, burlap sack, wooden crate, rope coil, shell necklace, torn map scrap, brass token, grey tomcat under awning fold`,
    pass0: `Painterly hidden-object game illustration, 16:9 1920x1080, Mystery Case Files style, Tokyo harbor fishmonger market soft afternoon, striped canvas awning, ice beds wooden crates, vendor tools, crowded everyday market clutter family-safe no gore no whole fish, no UI no text no watermark no full human figures`,
    pass1: `Same hidden-object art style, EXACTLY ONE striped canvas fish stall awning overhead, no duplicates`,
    pass2: `Same art style, fish stall counter, EXACTLY ONE of each casual everyday: metal ice cube tray, small pile fish scales on ice not whole fish, metal apron clip on hook, stub of price chalk, glass measuring cup, no duplicates`,
    pass3: `Same art style, EXACTLY ONE of each: burlap sack leaning on stall, wooden shipping crate, coiled hemp rope on ground, shell necklace on hook, no duplicates`,
    passFinal: `Same art style, EXACTLY ONE of each: torn map scrap gold foil, brass token on ice, grey tomcat notched left ear under stall awning fold Brakeman, no duplicates`,
    singlePass: `Painterly hidden-object game illustration, 16:9 1920x1080, harbor fishmonger stalls afternoon, EXACTLY ONE of each no duplicates: stall awning, ice tray, fish scales, apron clip, price chalk, measuring cup, burlap sack, wooden crate, rope coil, shell necklace, torn map scrap, brass token, tomcat under awning Brakeman`,
    negative: `whole fish carcasses, blood, gore, guts, two ice trays, orange tabby, two cats, two tokens, readable price text, watermark, empty stall, full human figures`,
  },
  ch03_board03: {
    objectList: `ch03_board03 — Tidegate Pier — 13 objects (checklist only)
tide pool, barnacles, driftwood, pier bolt, sea glass, faded photo, witness scarf, lighthouse lens, rope ladder, pier lamp, torn map scrap, brass token, grey tomcat behind driftwood`,
    pass0: `Painterly hidden-object game illustration, 16:9 1920x1080, Mystery Case Files style, Tokyo tidegate pier late afternoon gold light on water, wooden pier tidal pools barnacles on pilings, gentle waves cozy harbor magical realism, no UI no text no watermark no full human figures`,
    pass1: `Same hidden-object art style, pier waterline, EXACTLY ONE of each: small shallow tide pool in rocks, cluster of barnacles on wooden piling, no duplicates`,
    pass2: `Same art style, EXACTLY ONE of each casual everyday: weathered driftwood log on pier, rusted pier bolt in plank, one smooth sea glass piece frosted green, no duplicates`,
    pass3: `Same art style, EXACTLY ONE of each: faded sepia photo in small frame, knitted scarf draped on railing, glass lighthouse lens fragment on crate, no duplicates`,
    passFinal: `Same art style, EXACTLY ONE of each: coiled rope ladder on pier, vintage pier lamp post warm glow, torn map scrap gold foil handheld, brass token between planks, grey tomcat notched left ear behind driftwood pile Brakeman, no duplicates`,
    singlePass: `Painterly hidden-object game illustration, 16:9 1920x1080, tidegate pier late afternoon, EXACTLY ONE of each no duplicates: tide pool, barnacles, driftwood, pier bolt, sea glass, faded photo, witness scarf, lighthouse lens, rope ladder, pier lamp, torn map scrap, brass token, tomcat behind driftwood Brakeman`,
    negative: `two scarves, two photos, orange tabby, two cats, two tokens, horror, storm wreckage, watermark, empty pier, full human figures`,
  },
};

for (const [boardId, data] of Object.entries(boards)) {
  const dir = path.join(outRoot, boardId);
  fs.mkdirSync(dir, { recursive: true });
  const files = {
    'object-list.txt': data.objectList + '\n',
    'pass0.txt': data.pass0 + '\n',
    'pass1.txt': data.pass1 + '\n',
    'pass2.txt': data.pass2 + '\n',
    'pass3.txt': data.pass3 + '\n',
    'pass-final.txt': data.passFinal + '\n',
    'single-pass.txt': data.singlePass + '\n',
    'negative.txt': data.negative + '\n',
  };
  for (const [name, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, name), content);
  }
  console.log('Wrote', boardId);
}

console.log('Done.');
