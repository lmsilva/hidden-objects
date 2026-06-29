/**
 * Procedurally compose ch02_board02 (Busking Corner) at 1920x1080.
 *
 * The object geometry below is the SINGLE SOURCE OF TRUTH: it both paints the
 * scene AND defines the hit polygons, so hitboxes match the art exactly (no
 * after-the-fact detection needed). Distractor decor is painted with no hit
 * entry, so only the 13 valid objects are findable.
 *
 * Outputs:
 *   - public/adventures/the-lost-line/backgrounds/boards/ch02_board02.png
 *   - src/adventures/the-lost-line/boards/pools/ch02_board02.ts  (10 standards)
 *   - tools/_generated/ch02_board02-hit-export.json              (v2, all 13)
 *   - tools/_generated/ch02_board02-index-objects.txt            (index.ts block)
 *
 * Usage: node tools/generate-board-ch02_board02.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const W = 1920;
const H = 1080;

const P = (pts) => pts.map((p) => `${p[0]},${p[1]}`).join(' ');
const poly = (pts, fill, extra = '') => `<polygon points="${P(pts)}" fill="${fill}" ${extra}/>`;

/* ----------------------------------------------------------------------------
 * Valid objects — geometry drives both art and hitboxes.
 * role: standard | fragment | collectible | brakeman
 * -------------------------------------------------------------------------- */
const objects = [
  {
    id: 'obj_music_stand',
    label: 'objects.music_stand',
    displayName: 'Music Stand',
    role: 'standard',
    polygon: [[470,430],[660,430],[660,512],[588,512],[596,792],[642,846],[566,816],[492,846],[538,792],[546,512],[470,512]],
    draw: () => `
      <g>
        <ellipse cx="566" cy="858" rx="120" ry="26" fill="#000000" opacity="0.28"/>
        <!-- legs -->
        <polygon points="560,520 574,520 642,846 624,848" fill="#15171c"/>
        <polygon points="560,520 574,520 566,840 552,840" fill="#202329"/>
        <polygon points="560,520 574,520 492,846 510,848" fill="#15171c"/>
        <!-- pole -->
        <rect x="556" y="510" width="20" height="20" fill="#2a2d34"/>
        <!-- tray back -->
        <polygon points="478,438 652,438 648,520 484,520" fill="#202329"/>
        <polygon points="478,438 652,438 651,452 479,452" fill="#34373f"/>
        <!-- sheet pages on tray -->
        <polygon points="498,446 636,446 642,512 506,516" fill="#efe7d2"/>
        <polygon points="498,446 636,446 638,460 500,460" fill="#fbf5e6"/>
        <g stroke="#9a8f72" stroke-width="2" opacity="0.7">
          <line x1="512" y1="470" x2="624" y2="468"/>
          <line x1="512" y1="482" x2="624" y2="480"/>
          <line x1="512" y1="494" x2="624" y2="492"/>
        </g>
        <circle cx="540" cy="486" r="4" fill="#3b3527"/>
        <circle cx="588" cy="478" r="4" fill="#3b3527"/>
        <line x1="544" y1="486" x2="544" y2="470" stroke="#3b3527" stroke-width="2"/>
        <line x1="592" y1="478" x2="592" y2="462" stroke="#3b3527" stroke-width="2"/>
      </g>`,
  },
  {
    id: 'obj_metronome',
    label: 'objects.metronome',
    displayName: 'Metronome',
    role: 'standard',
    polygon: [[428,700],[474,800],[382,800]],
    draw: () => `
      <g>
        <ellipse cx="428" cy="806" rx="58" ry="16" fill="#000000" opacity="0.26"/>
        <polygon points="428,700 474,800 382,800" fill="#7a4a24"/>
        <polygon points="428,700 451,766 428,772 405,766" fill="#5c3417"/>
        <polygon points="404,786 452,786 458,800 398,800" fill="#5c3417"/>
        <rect x="425" y="712" width="6" height="74" fill="#d9c9a3"/>
        <polygon points="428,712 436,724 420,724" fill="#caa24a"/>
        <circle cx="428" cy="700" r="5" fill="#caa24a"/>
      </g>`,
  },
  {
    id: 'obj_bow_rosin',
    label: 'objects.bow_rosin',
    displayName: 'Bow Rosin',
    role: 'standard',
    polygon: [[300,816],[352,810],[356,850],[304,854]],
    draw: () => `
      <g>
        <ellipse cx="328" cy="856" rx="34" ry="10" fill="#000000" opacity="0.24"/>
        <polygon points="300,816 352,810 356,850 304,854" fill="#3a2a1c"/>
        <polygon points="306,820 348,815 350,832 308,836" fill="#a0641f"/>
        <ellipse cx="328" cy="826" rx="16" ry="8" fill="#c8832f"/>
        <ellipse cx="328" cy="826" rx="16" ry="8" fill="url(#rosinShine)"/>
      </g>`,
  },
  {
    id: 'obj_sheet_music',
    label: 'objects.sheet_music',
    displayName: 'Sheet Music',
    role: 'standard',
    polygon: [[604,872],[748,858],[770,902],[626,930]],
    draw: () => `
      <g>
        <ellipse cx="690" cy="912" rx="92" ry="20" fill="#000000" opacity="0.22"/>
        <polygon points="600,882 742,866 760,906 618,924" fill="#e7dcc2"/>
        <polygon points="604,872 748,858 770,902 626,930" fill="#f6efdc"/>
        <g stroke="#9a8f72" stroke-width="2" opacity="0.75">
          <line x1="628" y1="884" x2="744" y2="872"/>
          <line x1="630" y1="894" x2="746" y2="882"/>
          <line x1="632" y1="904" x2="748" y2="892"/>
          <line x1="634" y1="914" x2="750" y2="902"/>
        </g>
        <circle cx="664" cy="889" r="4" fill="#41382a"/>
        <circle cx="702" cy="892" r="4" fill="#41382a"/>
        <circle cx="724" cy="888" r="4" fill="#41382a"/>
        <line x1="668" y1="889" x2="668" y2="876" stroke="#41382a" stroke-width="2"/>
        <line x1="728" y1="888" x2="728" y2="874" stroke="#41382a" stroke-width="2"/>
      </g>`,
  },
  {
    id: 'obj_busker_hat',
    label: 'objects.busker_hat',
    displayName: 'Busker Hat',
    role: 'standard',
    polygon: [[864,820],[978,820],[1004,862],[936,910],[862,900],[838,860]],
    draw: () => `
      <g>
        <ellipse cx="922" cy="902" rx="96" ry="22" fill="#000000" opacity="0.26"/>
        <!-- brim -->
        <ellipse cx="922" cy="864" rx="92" ry="40" fill="#43352a"/>
        <ellipse cx="922" cy="860" rx="92" ry="38" fill="#5a4636"/>
        <!-- inside bowl (upside down) -->
        <ellipse cx="922" cy="856" rx="58" ry="26" fill="#2c2018"/>
        <ellipse cx="922" cy="852" rx="54" ry="22" fill="#3a2c20"/>
        <!-- coins -->
        <ellipse cx="906" cy="856" rx="13" ry="6" fill="#d9b24a"/>
        <ellipse cx="906" cy="853" rx="13" ry="6" fill="#f0cf6a"/>
        <ellipse cx="936" cy="860" rx="12" ry="6" fill="#c79a3e"/>
        <ellipse cx="936" cy="857" rx="12" ry="6" fill="#e8c25c"/>
        <ellipse cx="922" cy="848" rx="11" ry="5" fill="#f0cf6a"/>
      </g>`,
  },
  {
    id: 'obj_subway_grate',
    label: 'objects.subway_grate',
    displayName: 'Subway Grate',
    role: 'standard',
    polygon: [[980,880],[1180,872],[1190,952],[990,962]],
    draw: () => {
      const bars = [];
      for (let i = 1; i < 9; i++) {
        const t = i / 9;
        const xTop = 980 + (1180 - 980) * t;
        const xBot = 990 + (1190 - 990) * t;
        bars.push(`<line x1="${xTop}" y1="874" x2="${xBot}" y2="958" stroke="#1c1e22" stroke-width="6"/>`);
        bars.push(`<line x1="${xTop + 3}" y1="874" x2="${xBot + 3}" y2="958" stroke="#4a4d54" stroke-width="2"/>`);
      }
      return `
      <g>
        <polygon points="980,880 1180,872 1190,952 990,962" fill="#2f3137"/>
        <polygon points="980,880 1180,872 1190,952 990,962" fill="url(#grateGrad)"/>
        ${bars.join('')}
        <polygon points="980,880 1180,872 1190,952 990,962" fill="none" stroke="#15161a" stroke-width="6"/>
        <polygon points="980,880 1180,872 1190,952 990,962" fill="none" stroke="#5a5d64" stroke-width="2"/>
      </g>`;
    },
  },
  {
    id: 'obj_loose_string',
    label: 'objects.loose_string',
    displayName: 'Loose String',
    role: 'standard',
    polygon: [[1240,776],[1320,770],[1322,810],[1244,812]],
    draw: () => `
      <g>
        <ellipse cx="1281" cy="812" rx="44" ry="10" fill="#000000" opacity="0.2"/>
        <path d="M1246,800 C1240,772 1286,766 1290,786 C1294,804 1256,804 1262,788 C1266,776 1300,778 1318,792"
              fill="none" stroke="#c9b48a" stroke-width="3"/>
        <path d="M1248,804 C1244,780 1284,774 1288,790 C1292,806 1260,806 1266,792"
              fill="none" stroke="#e6d4ab" stroke-width="2"/>
        <circle cx="1318" cy="792" r="4" fill="#8a6d3a"/>
      </g>`,
  },
  {
    id: 'obj_ticket_stub',
    label: 'objects.ticket_stub',
    displayName: 'Ticket Stub',
    role: 'standard',
    polygon: [[1430,818],[1500,812],[1504,848],[1434,852]],
    draw: () => `
      <g>
        <ellipse cx="1468" cy="852" rx="40" ry="9" fill="#000000" opacity="0.2"/>
        <polygon points="1430,818 1500,812 1504,848 1434,852" fill="#d8c9ad"/>
        <polygon points="1430,818 1500,812 1502,830 1432,835" fill="#e7dbc2"/>
        <line x1="1466" y1="814" x2="1468" y2="850" stroke="#b3a07e" stroke-width="2" stroke-dasharray="4 3"/>
        <rect x="1440" y="826" width="18" height="5" fill="#9a8a68"/>
        <rect x="1476" y="822" width="18" height="5" fill="#9a8a68"/>
      </g>`,
  },
  {
    id: 'obj_chalk_mark',
    label: 'objects.chalk_mark',
    displayName: 'Chalk Mark',
    role: 'standard',
    polygon: [[300,300],[410,300],[410,410],[300,410]],
    draw: () => `
      <g opacity="0.9" stroke-linecap="round" fill="none" stroke="#e8eef0">
        <circle cx="356" cy="352" r="30" stroke-width="6"/>
        <path d="M356,330 L356,380" stroke-width="6"/>
        <path d="M338,346 L356,328 L374,346" stroke-width="6"/>
        <path d="M316,394 L398,384" stroke-width="5" opacity="0.8"/>
      </g>`,
  },
  {
    id: 'obj_street_lamp',
    label: 'objects.street_lamp',
    displayName: 'Street Lamp',
    role: 'standard',
    polygon: [[1704,300],[1808,300],[1808,360],[1780,408],[1772,730],[1742,730],[1750,408],[1722,360],[1704,360]],
    draw: () => `
      <g>
        <ellipse cx="1756" cy="360" rx="150" ry="120" fill="url(#lampGlow)"/>
        <!-- post -->
        <rect x="1748" y="408" width="16" height="592" fill="#23252b"/>
        <rect x="1750" y="408" width="6" height="592" fill="#3a3d44"/>
        <rect x="1726" y="980" width="60" height="24" rx="6" fill="#1c1e22"/>
        <!-- bracket -->
        <polygon points="1740,408 1772,408 1768,392 1744,392" fill="#23252b"/>
        <!-- lantern head -->
        <polygon points="1716,360 1796,360 1782,300 1730,300" fill="#2a2c33"/>
        <polygon points="1726,356 1786,356 1776,310 1736,310" fill="url(#lampLens)"/>
        <polygon points="1722,300 1790,300 1756,272" fill="#23252b"/>
        <circle cx="1756" cy="334" r="12" fill="#fff2c4"/>
      </g>`,
  },
  {
    id: 'special_map_fragment',
    label: 'collectibles.map_fragment',
    displayName: 'Map Fragment',
    role: 'fragment',
    polygon: [[1384,600],[1470,588],[1492,636],[1468,682],[1398,672],[1376,628]],
    draw: () => `
      <g>
        <ellipse cx="1432" cy="686" rx="60" ry="14" fill="#000000" opacity="0.22"/>
        <polygon points="1384,600 1470,588 1492,636 1468,682 1398,672 1376,628"
                 fill="#f3ead0" stroke="#d8c089" stroke-width="2"/>
        <polygon points="1470,588 1492,636 1468,682 1466,632"
                 fill="#e9c45a" opacity="0.85"/>
        <path d="M1396,612 C1420,628 1426,650 1456,660" fill="none" stroke="#2f8f86" stroke-width="4"/>
        <circle cx="1396" cy="612" r="4" fill="#2f8f86"/>
        <circle cx="1456" cy="660" r="4" fill="#2f8f86"/>
      </g>`,
  },
  {
    id: 'special_brass_token',
    label: 'collectibles.brass_token',
    displayName: 'Brass Token',
    role: 'collectible',
    polygon: [[1308,906],[1336,906],[1346,918],[1346,938],[1336,950],[1308,950],[1298,938],[1298,918]],
    draw: () => `
      <g>
        <ellipse cx="1322" cy="952" rx="28" ry="7" fill="#000000" opacity="0.22"/>
        <circle cx="1322" cy="928" r="24" fill="url(#tokenGrad)" stroke="#7c5a1e" stroke-width="2"/>
        <circle cx="1322" cy="928" r="16" fill="none" stroke="#8a6a2a" stroke-width="2"/>
        <path d="M1314,936 L1314,920 L1322,930 L1330,920 L1330,936" fill="none" stroke="#6b4e1c" stroke-width="3"/>
      </g>`,
  },
  {
    id: 'easter_egg_brakeman',
    label: 'easter_egg.brakeman',
    displayName: 'Brakeman (grey cat)',
    role: 'brakeman',
    polygon: [[636,724],[742,710],[786,756],[772,824],[706,848],[640,830],[612,778]],
    draw: () => `
      <g>
        <!-- body tucked behind stand leg -->
        <ellipse cx="704" cy="800" rx="74" ry="48" fill="#6b727c"/>
        <ellipse cx="704" cy="792" rx="70" ry="42" fill="#7b828c"/>
        <!-- tail -->
        <path d="M772,812 C812,804 812,760 784,752" fill="none" stroke="#6b727c" stroke-width="16" stroke-linecap="round"/>
        <!-- head -->
        <circle cx="690" cy="752" r="40" fill="#7b828c"/>
        <circle cx="690" cy="752" r="40" fill="url(#catShade)"/>
        <!-- ears: left ear notched (cat's left = viewer right) -->
        <polygon points="662,724 680,720 676,748" fill="#6b727c"/>
        <polygon points="718,720 700,722 706,748" fill="#6b727c"/>
        <polygon points="714,720 708,728 712,734" fill="#4f555d"/>
        <!-- eyes -->
        <ellipse cx="676" cy="752" rx="7" ry="9" fill="#cdd86a"/>
        <ellipse cx="706" cy="750" rx="7" ry="9" fill="#cdd86a"/>
        <ellipse cx="676" cy="753" rx="2.4" ry="7" fill="#1d2410"/>
        <ellipse cx="706" cy="751" rx="2.4" ry="7" fill="#1d2410"/>
        <!-- nose + whiskers -->
        <polygon points="690,762 684,758 696,758" fill="#3a3f46"/>
        <g stroke="#c9cdd3" stroke-width="1.5" opacity="0.8">
          <line x1="690" y1="766" x2="652" y2="760"/>
          <line x1="690" y1="768" x2="654" y2="772"/>
          <line x1="692" y1="766" x2="728" y2="760"/>
          <line x1="692" y1="768" x2="726" y2="772"/>
        </g>
      </g>`,
  },
];

/* ----------------------------------------------------------------------------
 * Defs (gradients) — soft look without SVG filters (resvg-safe).
 * -------------------------------------------------------------------------- */
const defs = `
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1b2444"/>
      <stop offset="0.55" stop-color="#3a3a5c"/>
      <stop offset="1" stop-color="#9c5f3c"/>
    </linearGradient>
    <linearGradient id="brick" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5c3b34"/>
      <stop offset="1" stop-color="#3c2723"/>
    </linearGradient>
    <linearGradient id="pavement" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#71707a"/>
      <stop offset="1" stop-color="#46454e"/>
    </linearGradient>
    <radialGradient id="lampGlow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#ffe6a0" stop-opacity="0.85"/>
      <stop offset="0.5" stop-color="#ffcf6e" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#ffcf6e" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="lampLens" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff4cf"/>
      <stop offset="1" stop-color="#ffcf6e"/>
    </linearGradient>
    <radialGradient id="tokenGrad" cx="0.4" cy="0.35" r="0.7">
      <stop offset="0" stop-color="#f3d27a"/>
      <stop offset="0.6" stop-color="#c79a3e"/>
      <stop offset="1" stop-color="#9a7228"/>
    </radialGradient>
    <linearGradient id="grateGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3a3d44"/>
      <stop offset="1" stop-color="#26282d"/>
    </linearGradient>
    <radialGradient id="rosinShine" cx="0.4" cy="0.35" r="0.7">
      <stop offset="0" stop-color="#ffd9a0" stop-opacity="0.5"/>
      <stop offset="1" stop-color="#ffd9a0" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="catShade" cx="0.5" cy="0.4" r="0.7">
      <stop offset="0" stop-color="#9aa0a9" stop-opacity="0.5"/>
      <stop offset="1" stop-color="#9aa0a9" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="awning" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#9c3a36"/>
      <stop offset="1" stop-color="#7e2c29"/>
    </linearGradient>
    <radialGradient id="lanternGlow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#ffd98a" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#ffd98a" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="windowGlow" cx="0.5" cy="0.5" r="0.6">
      <stop offset="0" stop-color="#ffdf9e" stop-opacity="0.95"/>
      <stop offset="1" stop-color="#caa15a" stop-opacity="0.2"/>
    </radialGradient>
  </defs>`;

/* ----------------------------------------------------------------------------
 * Decor / distractors — painted, NOT findable (no hit entries).
 * -------------------------------------------------------------------------- */
function brickWall() {
  const rows = [];
  for (let y = 40; y < 620; y += 34) {
    const off = (Math.floor(y / 34) % 2) * 36;
    rows.push(`<line x1="0" y1="${y}" x2="1920" y2="${y}" stroke="#2e1d1a" stroke-width="3" opacity="0.5"/>`);
    for (let x = -off; x < 1920; x += 72) {
      rows.push(`<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 34}" stroke="#2e1d1a" stroke-width="2" opacity="0.4"/>`);
    }
  }
  return `<rect x="0" y="0" width="1920" height="620" fill="url(#brick)"/>${rows.join('')}`;
}

function pavement() {
  const lines = [];
  for (let i = 0; i < 8; i++) {
    const y = 640 + i * 58;
    lines.push(`<line x1="0" y1="${y}" x2="1920" y2="${y + 6}" stroke="#33323a" stroke-width="2" opacity="0.35"/>`);
  }
  for (let x = 120; x < 1920; x += 220) {
    lines.push(`<line x1="${x}" y1="624" x2="${x - 120}" y2="1080" stroke="#33323a" stroke-width="2" opacity="0.28"/>`);
  }
  return `
    <polygon points="0,620 1920,620 1920,1080 0,1080" fill="url(#pavement)"/>
    <polygon points="0,620 1920,620 1920,648 0,648" fill="#2c2b32" opacity="0.6"/>
    ${lines.join('')}`;
}

const decorBack = `
  <!-- café awning, upper left -->
  <g>
    <polygon points="0,118 520,118 470,250 0,250" fill="url(#awning)"/>
    ${Array.from({ length: 9 }, (_, i) => {
      const x0 = i * 58;
      return i % 2 === 0 ? `<polygon points="${x0},118 ${x0 + 58},118 ${x0 + 44},250 ${x0 - 12},250" fill="#efe3cf" opacity="0.92"/>` : '';
    }).join('')}
    <polygon points="0,238 470,238 466,262 0,262" fill="#5e2421"/>
  </g>
  <!-- hanging paper lantern under awning -->
  <ellipse cx="232" cy="316" rx="90" ry="90" fill="url(#lanternGlow)"/>
  <line x1="232" y1="250" x2="232" y2="286" stroke="#1c120f" stroke-width="3"/>
  <ellipse cx="232" cy="318" rx="34" ry="40" fill="#e8a24a"/>
  <ellipse cx="232" cy="318" rx="34" ry="40" fill="#ffce7a" opacity="0.5"/>
  <rect x="216" y="282" width="32" height="8" fill="#7e4a1e"/>
  <rect x="216" y="350" width="32" height="8" fill="#7e4a1e"/>
  <!-- warm window on brick -->
  <g>
    <rect x="612" y="176" width="168" height="196" rx="6" fill="#23303a"/>
    <rect x="624" y="188" width="144" height="172" fill="url(#windowGlow)"/>
    <line x1="696" y1="188" x2="696" y2="360" stroke="#23303a" stroke-width="8"/>
    <line x1="624" y1="274" x2="768" y2="274" stroke="#23303a" stroke-width="8"/>
    <rect x="606" y="368" width="180" height="14" fill="#4a3128"/>
  </g>
  <!-- abstract poster -->
  <g>
    <rect x="918" y="196" width="150" height="200" rx="4" fill="#dcd2bb" transform="rotate(-2 993 296)"/>
    <rect x="936" y="222" width="116" height="60" fill="#b8553f" transform="rotate(-2 993 296)" opacity="0.85"/>
    <rect x="936" y="296" width="116" height="14" fill="#5d6f7a" transform="rotate(-2 993 296)"/>
    <rect x="936" y="320" width="80" height="14" fill="#5d6f7a" transform="rotate(-2 993 296)"/>
  </g>
  <!-- drainpipe right -->
  <rect x="1858" y="0" width="26" height="620" fill="#2a2722"/>
  <rect x="1860" y="0" width="8" height="620" fill="#3c382f"/>
  <!-- climbing vine left -->
  <path d="M40,620 C70,520 30,440 70,360 C100,300 60,240 96,180" fill="none" stroke="#3f5a36" stroke-width="6" opacity="0.8"/>
  ${Array.from({ length: 10 }, (_, i) => `<ellipse cx="${52 + (i % 2) * 30}" cy="${600 - i * 44}" rx="14" ry="8" fill="#456b3a" opacity="0.85"/>`).join('')}
`;

const decorFront = `
  <!-- potted plant near wall, left -->
  <g>
    <ellipse cx="160" cy="940" rx="64" ry="18" fill="#000000" opacity="0.26"/>
    <polygon points="120,902 200,902 188,968 132,968" fill="#8a4b2a"/>
    <polygon points="120,902 200,902 196,918 124,918" fill="#a35c34"/>
    ${Array.from({ length: 7 }, (_, i) => `<path d="M160,904 C${130 + i * 12},860 ${140 + i * 10},824 ${150 + i * 8},808" fill="none" stroke="#3f6b38" stroke-width="6"/>`).join('')}
  </g>
  <!-- manhole cover left-center -->
  <ellipse cx="430" cy="1000" rx="86" ry="30" fill="#34343c"/>
  <ellipse cx="430" cy="998" rx="86" ry="30" fill="#3e3e47"/>
  <ellipse cx="430" cy="998" rx="64" ry="22" fill="none" stroke="#26262c" stroke-width="3"/>
  <!-- puddle reflecting lamp, near lamp base -->
  <ellipse cx="1648" cy="1006" rx="120" ry="30" fill="#3a4150" opacity="0.7"/>
  <ellipse cx="1648" cy="1006" rx="120" ry="30" fill="url(#windowGlow)" opacity="0.25"/>
  <rect x="1640" y="980" width="6" height="28" fill="#ffe6a0" opacity="0.35"/>
  <!-- bottle near grate -->
  <g>
    <ellipse cx="1230" cy="930" rx="22" ry="7" fill="#000000" opacity="0.2"/>
    <rect x="1218" y="858" width="24" height="68" rx="10" fill="#3f6b4f" opacity="0.9"/>
    <rect x="1224" y="842" width="12" height="22" rx="4" fill="#3f6b4f"/>
    <rect x="1222" y="872" width="8" height="40" fill="#7fae8a" opacity="0.5"/>
  </g>
  <!-- scattered leaves -->
  ${[[300,690],[860,980],[1360,720],[520,940],[1500,940],[980,690],[1700,860],[700,640]]
    .map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="7" fill="${i % 2 ? '#b5722f' : '#9c5a2a'}" opacity="0.85" transform="rotate(${i * 37} ${x} ${y})"/>`).join('')}
`;

/* ----------------------------------------------------------------------------
 * Compose SVG
 * -------------------------------------------------------------------------- */
const objectLayer = objects
  .slice()
  .sort((a, b) => a.polygon[0][1] - b.polygon[0][1])
  .map((o) => o.draw())
  .join('\n');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${defs}
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#sky)"/>
  ${brickWall()}
  ${pavement()}
  ${decorBack}
  ${objectLayer}
  ${decorFront}
  <!-- gentle evening vignette -->
  <rect x="0" y="0" width="${W}" height="${H}" fill="#0a0a14" opacity="0.12"/>
</svg>`;

/* ----------------------------------------------------------------------------
 * Render + write outputs
 * -------------------------------------------------------------------------- */
const OUT_PNG = path.join(ROOT, 'public/adventures/the-lost-line/backgrounds/boards/ch02_board02.png');
const OUT_POOL = path.join(ROOT, 'src/adventures/the-lost-line/boards/pools/ch02_board02.ts');
const GEN_DIR = path.join(__dirname, '_generated');
fs.mkdirSync(GEN_DIR, { recursive: true });

const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W }, background: 'rgba(0,0,0,0)' });
fs.writeFileSync(OUT_PNG, resvg.render().asPng());
console.log('PNG   →', OUT_PNG);

// AABB from polygon
const aabb = (pts) => {
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  return { x, y, width: Math.max(...xs) - x, height: Math.max(...ys) - y };
};

// Pool TS (standards only)
const standards = objects.filter((o) => o.role === 'standard');
const poolLines = standards
  .map((o) => {
    const b = aabb(o.polygon);
    const polyStr = JSON.stringify(o.polygon);
    return `  pool('${o.id}', '${o.label}', ${b.x}, ${b.y}, ${b.width}, ${b.height}, { polygon: ${polyStr}, displayName: ${JSON.stringify(o.displayName)} }),`;
  })
  .join('\n');

const poolFile = `import type { BoardObject } from '@engine/types';

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
${poolLines}
];
`;
fs.writeFileSync(OUT_POOL, poolFile);
console.log('Pool  →', OUT_POOL);

// index.ts objects block (specials + brakeman with polygons)
const special = (o) => {
  const b = aabb(o.polygon);
  const id = o.role === 'fragment' ? 'special_map_fragment' : 'special_brass_token';
  const key = o.role === 'fragment' ? 'collectibles.map_fragment' : 'collectibles.brass_token';
  return `      special('${id}', '${key}', ${b.x}, ${b.y}, ${b.width}, ${b.height}, ${JSON.stringify(o.polygon)}),`;
};
const frag = objects.find((o) => o.role === 'fragment');
const tok = objects.find((o) => o.role === 'collectible');
const cat = objects.find((o) => o.role === 'brakeman');
const catB = aabb(cat.polygon);
const indexBlock = `    objects: [
      ...ch02Board02Pool,
${special(frag)}
${special(tok)}
      brakeman(${catB.x}, ${catB.y}, ${catB.width}, ${catB.height}, ${JSON.stringify(cat.polygon)}),
    ],`;
fs.writeFileSync(path.join(GEN_DIR, 'ch02_board02-index-objects.txt'), indexBlock);
console.log('Index block →', path.join(GEN_DIR, 'ch02_board02-index-objects.txt'));

// Full v2 hit-export (reference/backup)
const exportJson = {
  boardId: 'ch02_board02',
  version: 2,
  objects: objects.map((o) => ({
    id: o.id,
    labelKey: o.label,
    displayName: o.displayName,
    type: o.role === 'standard' ? 'standard' : o.role === 'brakeman' ? 'easter_egg' : 'special',
    collectibleRole: o.role,
    evidence: false,
    bounds: { ...aabb(o.polygon), polygon: o.polygon },
    configured: true,
  })),
  removedIds: [],
};
fs.writeFileSync(path.join(GEN_DIR, 'ch02_board02-hit-export.json'), `${JSON.stringify(exportJson, null, 2)}\n`);
console.log('Export →', path.join(GEN_DIR, 'ch02_board02-hit-export.json'));
console.log('\nDone. 13 objects (10 standard + 2 special + Brakeman).');
