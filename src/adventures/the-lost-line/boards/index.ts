import type { BoardDefinition, HitBounds, ScenePoint } from '@engine/types';
import { ch01Board01Pool } from './pools/ch01_board01';
import { ch01Board02Pool } from './pools/ch01_board02';
import { ch02Board02Pool } from './pools/ch02_board02';

const BG = '/adventures/the-lost-line/backgrounds/boards';

function boardBg(boardId: string, ext: 'png' | 'jpg') {
  return `${BG}/${boardId}.${ext}`;
}

function std(
  id: string,
  labelKey: string,
  x: number,
  y: number,
  w = 44,
  h = 44,
  extra?: { evidence?: boolean; lostProperty?: boolean },
) {
  return {
    id,
    labelKey,
    type: 'standard' as const,
    bounds: { x, y, width: w, height: h },
    evidence: extra?.evidence,
    lostProperty: extra?.lostProperty,
  };
}

function special(
  id: string,
  labelKey: string,
  x: number,
  y: number,
  w = 52,
  h = 52,
  polygon?: ScenePoint[],
  displayName?: string,
) {
  const bounds: HitBounds = { x, y, width: w, height: h };
  if (polygon && polygon.length >= 3) bounds.polygon = polygon;
  return {
    id,
    labelKey,
    type: 'special' as const,
    bounds,
    displayName,
    collectibleRole:
      id === 'special_map_fragment'
        ? ('fragment' as const)
        : id === 'special_brass_token'
          ? ('collectible' as const)
          : undefined,
  };
}

function brakeman(
  x: number,
  y: number,
  w = 40,
  h = 40,
  polygon?: ScenePoint[],
) {
  const bounds: HitBounds = { x, y, width: w, height: h };
  if (polygon && polygon.length >= 3) bounds.polygon = polygon;
  return {
    id: 'easter_egg_brakeman',
    labelKey: 'easter_egg.brakeman',
    type: 'easter_egg' as const,
    bounds,
  };
}

export const ch01Boards = [
  {
    id: 'ch01_board01',
    chapterId: 'ch01',
    background: boardBg('ch01_board01', 'png'),
    poolTarget: 30,
    storyTriggerObjectId: 'special_brass_token',
    objects: [
      ...ch01Board01Pool,
      special('special_map_fragment', 'collectibles.map_fragment', 0, 0, 0, 0),
      special('special_brass_token', 'collectibles.brass_token', 0, 0, 0, 0),
      brakeman(0, 0, 0, 0),
    ],
  },
  {
    id: 'ch01_board02',
    chapterId: 'ch01',
    background: boardBg('ch01_board02', 'png'),
    objects: [
      ...ch01Board02Pool,
      special('special_map_fragment', 'collectibles.map_fragment', 978, 816, 116, 96, [[980,816],[1080,820],[1094,872],[1058,912],[990,896],[978,852]]),
      special('special_brass_token', 'collectibles.brass_token', 1356, 930, 48, 44, [[1366,930],[1394,930],[1404,942],[1404,962],[1394,974],[1366,974],[1356,962],[1356,942]]),
      brakeman(760, 742, 158, 116, [[770,748],[884,742],[918,790],[902,846],[836,858],[776,840],[760,792]]),
    ],
  },
  {
    id: 'ch01_board03',
    chapterId: 'ch01',
    background: boardBg('ch01_board03', 'png'),
    objects: [
      std('obj_departures_board', 'objects.departures_board', 720, 280, 80, 56),
      std('obj_mosaic_roundel', 'objects.mosaic_roundel', 960, 180, 64, 64),
      std('obj_suitcase', 'objects.suitcase', 380, 620),
      std('obj_bouquet', 'objects.bouquet', 540, 740),
      std('obj_transit_map', 'objects.transit_map', 1100, 520, 72, 56),
      std('obj_coin_purse', 'objects.coin_purse', 1280, 680),
      std('obj_crumpled_note', 'objects.crumpled_note', 1420, 560, 40, 36),
      std('obj_broken_umbrella', 'objects.broken_umbrella', 1560, 740),
      std('obj_photo_booth_strip', 'objects.photo_booth_strip', 200, 480, 36, 64),
      std('obj_seal_wax', 'objects.seal_wax', 860, 820),
      special('special_map_fragment', 'collectibles.map_fragment', 1780, 480),
      special('special_brass_token', 'collectibles.brass_token', 440, 360),
      brakeman(1320, 840),
    ],
  },
];

export const ch02Boards = [
  {
    id: 'ch02_board01',
    chapterId: 'ch02',
    background: boardBg('ch02_board01', 'png'),
    objects: [
      std('obj_lantern_string', 'objects.lantern_string', 400, 200, 80, 40),
      std('obj_noodle_bowl', 'objects.noodle_bowl', 620, 580),
      std('obj_violin_case', 'objects.violin_case', 880, 640, 72, 48, { lostProperty: true }),
      std('obj_spice_jar', 'objects.spice_jar', 1040, 520),
      std('obj_folding_fan', 'objects.folding_fan', 1220, 700),
      std('obj_merchant_scale', 'objects.merchant_scale', 1400, 480),
      std('obj_paper_lantern', 'objects.paper_lantern', 1580, 320),
      std('obj_coin_pouch', 'objects.coin_pouch', 280, 720),
      std('obj_wooden_sign', 'objects.wooden_sign', 500, 400),
      std('obj_tea_kettle', 'objects.tea_kettle', 1720, 600),
      special('special_map_fragment', 'collectibles.map_fragment', 1800, 760),
      special('special_brass_token', 'collectibles.brass_token', 760, 380),
      brakeman(1180, 820),
    ],
  },
  {
    id: 'ch02_board02',
    chapterId: 'ch02',
    background: boardBg('ch02_board02', 'png'),
    objects: [
      ...ch02Board02Pool,
      special('special_map_fragment', 'collectibles.map_fragment', 1376, 588, 116, 94, [[1384,600],[1470,588],[1492,636],[1468,682],[1398,672],[1376,628]]),
      special('special_brass_token', 'collectibles.brass_token', 1298, 906, 48, 44, [[1308,906],[1336,906],[1346,918],[1346,938],[1336,950],[1308,950],[1298,938],[1298,918]]),
      brakeman(612, 710, 174, 138, [[636,724],[742,710],[786,756],[772,824],[706,848],[640,830],[612,778]]),
    ],
  },
  {
    id: 'ch02_board03',
    chapterId: 'ch02',
    background: boardBg('ch02_board03', 'png'),
    objects: [
      std('obj_phantom_sign', 'objects.phantom_sign', 380, 300, 56, 48),
      std('obj_flickering_light', 'objects.flickering_light', 600, 220),
      std('obj_discarded_ticket', 'objects.discarded_ticket', 780, 680),
      std('obj_graffiti_tag', 'objects.graffiti_tag', 960, 520, 64, 40),
      std('obj_rusty_rail', 'objects.rusty_rail', 1140, 780, 80, 24),
      std('obj_echo_shell', 'objects.echo_shell', 1320, 600, 36, 36),
      std('obj_wet_leaf', 'objects.wet_leaf', 1480, 740, 32, 32),
      std('obj_train_whistle', 'objects.train_whistle', 1660, 480),
      std('obj_platform_edge', 'objects.platform_edge', 220, 840, 72, 32),
      std('obj_glass_shard', 'objects.glass_shard', 500, 560, 28, 28),
      special('special_map_fragment', 'collectibles.map_fragment', 1740, 640),
      special('special_brass_token', 'collectibles.brass_token', 1040, 720),
      brakeman(820, 420),
    ],
  },
];

export const ch03Boards = [
  {
    id: 'ch03_board01',
    chapterId: 'ch03',
    background: boardBg('ch03_board01', 'png'),
    objects: [
      std('obj_mooring_rope', 'objects.mooring_rope', 300, 600, 64, 32),
      std('obj_fog_buoy', 'objects.fog_buoy', 480, 480),
      std('obj_ferry_schedule', 'objects.ferry_schedule', 680, 360, 56, 48),
      std('obj_salt_crate', 'objects.salt_crate', 860, 640),
      std('obj_seagull_feather', 'objects.seagull_feather', 1020, 720, 36, 24),
      std('obj_fisher_net', 'objects.fisher_net', 1200, 520, 72, 56),
      std('obj_compass', 'objects.compass', 1380, 680),
      std('obj_wharf_plank', 'objects.wharf_plank', 1560, 780, 80, 32),
      std('obj_oil_lantern', 'objects.oil_lantern', 1720, 440),
      std('obj_floodgate_key', 'objects.floodgate_key', 540, 820, 40, 40, { evidence: true }),
      special('special_map_fragment', 'collectibles.map_fragment', 1780, 280),
      special('special_brass_token', 'collectibles.brass_token', 920, 560),
      brakeman(1280, 800),
    ],
  },
  {
    id: 'ch03_board02',
    chapterId: 'ch03',
    background: boardBg('ch03_board02', 'png'),
    objects: [
      std('obj_ice_tray', 'objects.ice_tray', 360, 540),
      std('obj_fish_scale', 'objects.fish_scale', 520, 700, 32, 32),
      std('obj_apron_clip', 'objects.apron_clip', 700, 480),
      std('obj_price_chalk', 'objects.price_chalk', 880, 620, 36, 28),
      std('obj_burlap_sack', 'objects.burlap_sack', 1060, 740),
      std('obj_measuring_cup', 'objects.measuring_cup', 1240, 560),
      std('obj_wooden_crate', 'objects.wooden_crate', 1420, 680),
      std('obj_rope_coil', 'objects.rope_coil', 1600, 500),
      std('obj_shell_necklace', 'objects.shell_necklace', 1780, 720),
      std('obj_stall_awning', 'objects.stall_awning', 240, 320, 80, 48),
      special('special_map_fragment', 'collectibles.map_fragment', 1680, 360),
      special('special_brass_token', 'collectibles.brass_token', 760, 760),
      brakeman(1100, 420),
    ],
  },
  {
    id: 'ch03_board03',
    chapterId: 'ch03',
    background: boardBg('ch03_board03', 'png'),
    objects: [
      std('obj_tide_pool', 'objects.tide_pool', 400, 780, 72, 40),
      std('obj_barnacle_cluster', 'objects.barnacle_cluster', 580, 680, 48, 40),
      std('obj_driftwood', 'objects.driftwood', 760, 600, 64, 32),
      std('obj_pier_bolt', 'objects.pier_bolt', 940, 740, 32, 32),
      std('obj_faded_photo', 'objects.faded_photo', 1120, 520, 44, 52),
      std('obj_witness_scarf', 'objects.witness_scarf', 1300, 640),
      std('obj_lighthouse_lens', 'objects.lighthouse_lens', 1480, 380, 56, 56),
      std('obj_rope_ladder', 'objects.rope_ladder', 1660, 560, 40, 72),
      std('obj_sea_glass', 'objects.sea_glass', 320, 560, 28, 28),
      std('obj_pier_lamp', 'objects.pier_lamp', 1800, 480),
      special('special_map_fragment', 'collectibles.map_fragment', 1720, 820),
      special('special_brass_token', 'collectibles.brass_token', 880, 400),
      brakeman(620, 460),
    ],
  },
];

export const allBoards: BoardDefinition[] = [
  ...ch01Boards,
  ...ch02Boards,
  ...ch03Boards,
] as BoardDefinition[];

export const boardMap = Object.fromEntries(
  allBoards.map((b) => [b.id, b]),
) as Record<string, BoardDefinition>;
