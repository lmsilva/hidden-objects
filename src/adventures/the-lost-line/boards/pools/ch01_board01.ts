import type { BoardObject } from '@engine/types';

/** Placeholder until hit-area tuner configures bounds (width/height 0 = missing). */
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

/** 30 unique findable objects — exactly one of each must appear in the composited art. */
export const ch01Board01Pool: BoardObject[] = [
  pool('obj_brass_scale', 'objects.brass_scale', 567, 501, 215, 179, { polygon: [[567,544],[678,501],[782,535],[775,675],[685,680],[581,660]] }),
  pool('obj_timetable', 'objects.timetable', 1655, 169, 82, 140, { polygon: [[1655,169],[1726,187],[1737,309],[1661,309]] }),
  pool('obj_inkwell', 'objects.inkwell', 921, 597, 96, 94, { polygon: [[957,597],[1009,609],[1017,690],[921,691]] }),
  pool('obj_ticket_roll', 'objects.ticket_roll', 871, 936, 76, 67, { polygon: [[871,955],[906,936],[947,955],[947,1003],[871,1003]] }),
  pool('obj_magnifying_glass', 'objects.magnifying_glass', 967, 950, 121, 53, { polygon: [[969,950],[1085,951],[1088,1003],[967,999]] }),
  pool('obj_coffee_cup', 'objects.coffee_cup', 1197, 773, 88, 83, { polygon: [[1197,773],[1285,773],[1285,856],[1197,856]] }),
  pool('obj_rubber_stamp', 'objects.rubber_stamp', 1101, 421, 27, 39, { polygon: [[1101,421],[1128,421],[1128,460],[1101,460]] }),
  pool('obj_pocket_watch', 'objects.pocket_watch', 1464, 315, 49, 231, { polygon: [[1489,316],[1500,315],[1513,546],[1464,539]] }),
  pool('obj_postcard', 'objects.postcard'),
  pool('obj_ledger', 'objects.ledger'),
  pool('obj_tv_remote', 'objects.tv_remote', 1428, 879, 173, 84, { polygon: [[1428,937],[1541,879],[1601,895],[1494,963]] }),
  pool('obj_yarn_ball', 'objects.yarn_ball'),
  pool('obj_analog_clock', 'objects.analog_clock', 1447, 189, 98, 128, { polygon: [[1486,189],[1502,189],[1544,260],[1545,261],[1530,317],[1465,315],[1447,261]] }),
  pool('obj_calculator', 'objects.calculator'),
  pool('obj_fountain_pen', 'objects.fountain_pen'),
  pool('obj_chopsticks', 'objects.chopsticks'),
  pool('obj_house_slippers', 'objects.house_slippers'),
  pool('obj_brass_bell', 'objects.brass_bell'),
  pool('obj_potted_plant', 'objects.potted_plant'),
  pool('obj_world_map_poster', 'objects.world_map_poster'),
  pool('obj_purple_umbrella', 'objects.purple_umbrella'),
  pool('obj_door_keys', 'objects.door_keys'),
  pool('obj_rice_bowl', 'objects.rice_bowl'),
  pool('obj_desk_lamp', 'objects.desk_lamp'),
  pool('obj_transit_pass', 'objects.transit_pass'),
  pool('obj_scissors', 'objects.scissors'),
  pool('obj_tissue_box', 'objects.tissue_box'),
  pool('obj_framed_photo', 'objects.framed_photo'),
  pool('obj_sewing_kit', 'objects.sewing_kit'),
  pool('obj_teacup_saucer', 'objects.teacup_saucer'),
];
