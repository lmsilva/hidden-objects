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
  pool('obj_bench_plaque', 'objects.bench_plaque', 393, 607, 189, 52, { polygon: [[393,610],[568,607],[582,649],[399,659]] }),
  pool('obj_vending_snack', 'objects.vending_snack', 851, 791, 109, 126, { polygon: [[851,791],[960,791],[960,917],[851,917]] }),
  pool('obj_loose_button', 'objects.loose_button', 381, 981, 56, 32, { polygon: [[381,981],[437,981],[437,1013],[381,1013]], displayName: 'Cigarettes' }),
  pool('obj_newspaper', 'objects.newspaper', 470, 841, 227, 154, { polygon: [[470,852],[616,841],[649,933],[697,948],[545,995],[483,967]] }),
  pool('obj_enamel_sign', 'objects.enamel_sign', 275, 155, 180, 122, { polygon: [[275,155],[455,155],[455,277],[275,277]] }),
  pool('obj_coin', 'objects.coin', 1320, 880, 28, 28),
  pool('obj_schedule_poster', 'objects.schedule_poster', 1370, 309, 129, 249, { polygon: [[1370,309],[1499,327],[1497,557],[1370,558]] }),
  pool('obj_glove', 'objects.glove', 561, 735, 106, 62, { polygon: [[561,735],[667,735],[667,797],[561,797]] }),
  pool('obj_token_slot', 'objects.token_slot', 347, 648, 34, 37, { polygon: [[347,648],[381,648],[381,685],[347,685]] }),
];
