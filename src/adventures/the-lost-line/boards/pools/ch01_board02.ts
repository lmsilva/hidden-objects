import type { BoardObject } from '@engine/types';

function pool(
  id: string,
  labelKey: string,
  x = 0,
  y = 0,
  w = 0,
  h = 0,
  extra?: { evidence?: boolean; polygon?: [number, number][]; displayName?: string },
): BoardObject {
  const bounds: BoardObject['bounds'] = { x, y, width: w, height: h };
  if (extra?.polygon && extra.polygon.length >= 3) {
    bounds.polygon = extra.polygon;
  }
  return {
    id,
    labelKey,
    type: 'standard',
    bounds,
    evidence: extra?.evidence,
    displayName: extra?.displayName,
  };
}

export const ch01Board02Pool: BoardObject[] = [
  pool('obj_enamel_sign', 'objects.enamel_sign', 470, 150, 220, 130, { polygon: [[470,150],[690,150],[690,280],[470,280]], displayName: "Enamel Sign" }),
  pool('obj_schedule_poster', 'objects.schedule_poster', 1040, 170, 170, 282, { polygon: [[1040,170],[1210,170],[1210,452],[1040,452]], displayName: "Schedule Poster" }),
  pool('obj_vending_snack', 'objects.vending_snack', 210, 410, 86, 110, { polygon: [[210,410],[296,410],[296,520],[210,520]], displayName: "Vending Snack" }),
  pool('obj_token_slot', 'objects.token_slot', 300, 596, 62, 66, { polygon: [[300,596],[362,596],[362,662],[300,662]], displayName: "Token Slot" }),
  pool('obj_bench_plaque', 'objects.bench_plaque', 612, 610, 132, 40, { polygon: [[612,610],[744,610],[744,650],[612,650]], displayName: "Bench Plaque" }),
  pool('obj_lost_scarf', 'objects.lost_scarf', 496, 688, 130, 54, { polygon: [[496,688],[626,688],[626,742],[496,742]], displayName: "Lost Scarf" }),
  pool('obj_newspaper', 'objects.newspaper', 660, 680, 132, 62, { polygon: [[660,680],[792,680],[792,742],[660,742]], displayName: "Newspaper" }),
  pool('obj_glove', 'objects.glove', 812, 690, 88, 48, { polygon: [[812,690],[900,690],[900,738],[812,738]], displayName: "Glove" }),
  pool('obj_loose_button', 'objects.loose_button', 556, 902, 46, 38, { polygon: [[556,902],[602,902],[602,940],[556,940]], displayName: "Loose Button" }),
  pool('obj_coin', 'objects.coin', 1184, 980, 38, 36, { polygon: [[1184,980],[1222,980],[1222,1016],[1184,1016]], displayName: "Coin" }),
];
