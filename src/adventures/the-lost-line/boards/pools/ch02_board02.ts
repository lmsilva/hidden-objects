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

export const ch02Board02Pool: BoardObject[] = [
  pool('obj_music_stand', 'objects.music_stand', 470, 430, 190, 416, { polygon: [[470,430],[660,430],[660,512],[588,512],[596,792],[642,846],[566,816],[492,846],[538,792],[546,512],[470,512]], displayName: "Music Stand" }),
  pool('obj_metronome', 'objects.metronome', 382, 700, 92, 100, { polygon: [[428,700],[474,800],[382,800]], displayName: "Metronome" }),
  pool('obj_bow_rosin', 'objects.bow_rosin', 300, 810, 56, 44, { polygon: [[300,816],[352,810],[356,850],[304,854]], displayName: "Bow Rosin" }),
  pool('obj_sheet_music', 'objects.sheet_music', 604, 858, 166, 72, { polygon: [[604,872],[748,858],[770,902],[626,930]], displayName: "Sheet Music" }),
  pool('obj_busker_hat', 'objects.busker_hat', 838, 820, 166, 90, { polygon: [[864,820],[978,820],[1004,862],[936,910],[862,900],[838,860]], displayName: "Busker Hat" }),
  pool('obj_subway_grate', 'objects.subway_grate', 980, 872, 210, 90, { polygon: [[980,880],[1180,872],[1190,952],[990,962]], displayName: "Subway Grate" }),
  pool('obj_loose_string', 'objects.loose_string', 1240, 770, 82, 42, { polygon: [[1240,776],[1320,770],[1322,810],[1244,812]], displayName: "Loose String" }),
  pool('obj_ticket_stub', 'objects.ticket_stub', 1430, 812, 74, 40, { polygon: [[1430,818],[1500,812],[1504,848],[1434,852]], displayName: "Ticket Stub" }),
  pool('obj_chalk_mark', 'objects.chalk_mark', 300, 300, 110, 110, { polygon: [[300,300],[410,300],[410,410],[300,410]], displayName: "Chalk Mark" }),
  pool('obj_street_lamp', 'objects.street_lamp', 1704, 300, 104, 430, { polygon: [[1704,300],[1808,300],[1808,360],[1780,408],[1772,730],[1742,730],[1750,408],[1722,360],[1704,360]], displayName: "Street Lamp" }),
];
