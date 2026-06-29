/**
 * Procedurally compose ch01_board02 (Platform 1 at Midnight) at 1920x1080.
 *
 * Object geometry below is the SINGLE SOURCE OF TRUTH: it paints the scene AND
 * defines the hit polygons, so hitboxes match the art exactly. Distractor decor
 * is painted with no hit entry, so only the 13 valid objects are findable.
 *
 * Outputs:
 *   - public/adventures/the-lost-line/backgrounds/boards/ch01_board02.png
 *   - src/adventures/the-lost-line/boards/pools/ch01_board02.ts  (10 standards)
 *   - tools/_generated/ch01_board02-hit-export.json              (v2, all 13)
 *   - tools/_generated/ch01_board02-index-objects.txt            (index.ts block)
 *
 * Usage: node tools/generate-board-ch01_board02.mjs
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
const scatter = (items, fn) => items.map(fn).join('');

/* ----------------------------------------------------------------------------
 * Valid objects — geometry drives both art and hitboxes.
 * -------------------------------------------------------------------------- */
const objects = [
  {
    id: 'obj_enamel_sign',
    label: 'objects.enamel_sign',
    displayName: 'Enamel Sign',
    role: 'standard',
    polygon: [[470,150],[690,150],[690,280],[470,280]],
    draw: () => `
      <g>
        <rect x="470" y="150" width="220" height="130" rx="10" fill="#1f3d52" stroke="#10212e" stroke-width="4"/>
        <rect x="480" y="160" width="200" height="110" rx="6" fill="#27506b"/>
        <rect x="480" y="160" width="200" height="14" rx="6" fill="#3a6b88" opacity="0.7"/>
        <circle cx="540" cy="218" r="26" fill="none" stroke="#eef3f2" stroke-width="6"/>
        <rect x="588" y="200" width="74" height="12" rx="6" fill="#eef3f2" opacity="0.9"/>
        <rect x="588" y="224" width="54" height="10" rx="5" fill="#cfe0e4" opacity="0.8"/>
      </g>`,
  },
  {
    id: 'obj_schedule_poster',
    label: 'objects.schedule_poster',
    displayName: 'Schedule Poster',
    role: 'standard',
    polygon: [[1040,170],[1210,170],[1210,452],[1040,452]],
    draw: () => {
      const rows = [];
      for (let i = 0; i < 9; i++) {
        rows.push(`<line x1="1058" y1="${214 + i * 24}" x2="1192" y2="${214 + i * 24}" stroke="#9a8f72" stroke-width="2" opacity="0.7"/>`);
      }
      return `
      <g>
        <rect x="1040" y="170" width="170" height="282" rx="4" fill="#1c2730"/>
        <rect x="1048" y="178" width="154" height="266" fill="#efe7d2"/>
        <rect x="1058" y="190" width="134" height="18" fill="#7c4a33" opacity="0.85"/>
        ${rows.join('')}
        <line x1="1100" y1="210" x2="1100" y2="436" stroke="#9a8f72" stroke-width="2" opacity="0.6"/>
        <line x1="1150" y1="210" x2="1150" y2="436" stroke="#9a8f72" stroke-width="2" opacity="0.6"/>
      </g>`;
    },
  },
  {
    id: 'obj_vending_snack',
    label: 'objects.vending_snack',
    displayName: 'Vending Snack',
    role: 'standard',
    polygon: [[210,410],[296,410],[296,520],[210,520]],
    draw: () => `
      <g>
        <rect x="210" y="410" width="86" height="110" rx="8" fill="#c7402f"/>
        <rect x="210" y="410" width="86" height="110" rx="8" fill="url(#snackShine)"/>
        <polygon points="210,452 296,442 296,470 210,480" fill="#f0d24a" opacity="0.9"/>
        <circle cx="253" cy="436" r="10" fill="#f6e6b0" opacity="0.85"/>
        <rect x="224" y="492" width="58" height="10" rx="5" fill="#7c2018" opacity="0.7"/>
      </g>`,
  },
  {
    id: 'obj_token_slot',
    label: 'objects.token_slot',
    displayName: 'Token Slot',
    role: 'standard',
    polygon: [[300,596],[362,596],[362,662],[300,662]],
    draw: () => `
      <g>
        <rect x="300" y="596" width="62" height="66" rx="6" fill="url(#brassPlate)" stroke="#6e521e" stroke-width="3"/>
        <rect x="318" y="610" width="26" height="9" rx="4" fill="#1c150a"/>
        <circle cx="331" cy="640" r="12" fill="none" stroke="#5d4516" stroke-width="3"/>
        <line x1="331" y1="630" x2="331" y2="650" stroke="#5d4516" stroke-width="3"/>
      </g>`,
  },
  {
    id: 'obj_bench_plaque',
    label: 'objects.bench_plaque',
    displayName: 'Bench Plaque',
    role: 'standard',
    polygon: [[612,610],[744,610],[744,650],[612,650]],
    draw: () => `
      <g>
        <rect x="612" y="610" width="132" height="40" rx="5" fill="url(#bronze)" stroke="#5e4a1c" stroke-width="2"/>
        <rect x="620" y="617" width="60" height="7" rx="3" fill="#5e4a1c" opacity="0.7"/>
        <rect x="620" y="630" width="92" height="6" rx="3" fill="#5e4a1c" opacity="0.55"/>
        <circle cx="724" cy="630" r="6" fill="#7a6326"/>
      </g>`,
  },
  {
    id: 'obj_lost_scarf',
    label: 'objects.lost_scarf',
    displayName: 'Lost Scarf',
    role: 'standard',
    polygon: [[496,688],[626,688],[626,742],[496,742]],
    draw: () => `
      <g>
        <ellipse cx="560" cy="744" rx="70" ry="14" fill="#000000" opacity="0.22"/>
        <path d="M498,706 C520,690 600,690 624,700 C628,716 620,732 600,734 C560,738 520,736 500,732 C492,724 492,714 498,706 Z" fill="#6b4a7a"/>
        <path d="M500,710 C540,702 596,702 622,708" fill="none" stroke="#8a6699" stroke-width="5"/>
        <g stroke="#4f3559" stroke-width="3" opacity="0.7">
          <line x1="520" y1="698" x2="524" y2="730"/>
          <line x1="556" y1="696" x2="560" y2="732"/>
          <line x1="592" y1="698" x2="596" y2="730"/>
        </g>
        <g stroke="#7a577f" stroke-width="3">
          <line x1="606" y1="730" x2="612" y2="748"/>
          <line x1="614" y1="728" x2="620" y2="746"/>
        </g>
      </g>`,
  },
  {
    id: 'obj_newspaper',
    label: 'objects.newspaper',
    displayName: 'Newspaper',
    role: 'standard',
    polygon: [[660,680],[792,680],[792,742],[660,742]],
    draw: () => `
      <g>
        <ellipse cx="726" cy="744" rx="74" ry="13" fill="#000000" opacity="0.2"/>
        <polygon points="660,686 792,680 788,738 664,742" fill="#d9d3c4"/>
        <polygon points="660,686 792,680 790,700 662,706" fill="#e7e1d2"/>
        <rect x="676" y="690" width="72" height="9" fill="#5a5a52" opacity="0.8"/>
        <g stroke="#8a8a80" stroke-width="2" opacity="0.7">
          <line x1="676" y1="710" x2="744" y2="708"/>
          <line x1="676" y1="720" x2="744" y2="718"/>
          <line x1="676" y1="730" x2="744" y2="728"/>
          <line x1="754" y1="709" x2="784" y2="708"/>
          <line x1="754" y1="719" x2="784" y2="718"/>
          <line x1="754" y1="729" x2="784" y2="728"/>
        </g>
      </g>`,
  },
  {
    id: 'obj_glove',
    label: 'objects.glove',
    displayName: 'Glove',
    role: 'standard',
    polygon: [[812,690],[900,690],[900,738],[812,738]],
    draw: () => `
      <g>
        <ellipse cx="856" cy="740" rx="50" ry="11" fill="#000000" opacity="0.2"/>
        <path d="M816,724 C812,706 820,694 836,694 L884,698 C896,700 900,712 892,720 L872,730 C854,736 828,734 816,724 Z" fill="#5a3a24"/>
        <path d="M884,698 L896,690 M886,704 L900,700 M886,710 L900,710" stroke="#5a3a24" stroke-width="7" stroke-linecap="round"/>
        <path d="M820,720 C840,724 866,724 884,716" fill="none" stroke="#74503a" stroke-width="3"/>
      </g>`,
  },
  {
    id: 'obj_loose_button',
    label: 'objects.loose_button',
    displayName: 'Loose Button',
    role: 'standard',
    polygon: [[556,902],[602,902],[602,940],[556,940]],
    draw: () => `
      <g>
        <ellipse cx="579" cy="942" rx="22" ry="6" fill="#000000" opacity="0.2"/>
        <circle cx="579" cy="921" r="19" fill="#e7e0cf" stroke="#b3a884" stroke-width="2"/>
        <circle cx="579" cy="921" r="11" fill="none" stroke="#a89c78" stroke-width="2"/>
        <circle cx="574" cy="917" r="2.5" fill="#7c7152"/>
        <circle cx="584" cy="917" r="2.5" fill="#7c7152"/>
        <circle cx="574" cy="926" r="2.5" fill="#7c7152"/>
        <circle cx="584" cy="926" r="2.5" fill="#7c7152"/>
      </g>`,
  },
  {
    id: 'obj_coin',
    label: 'objects.coin',
    displayName: 'Coin',
    role: 'standard',
    polygon: [[1184,980],[1222,980],[1222,1016],[1184,1016]],
    draw: () => `
      <g>
        <ellipse cx="1203" cy="1018" rx="20" ry="6" fill="#000000" opacity="0.22"/>
        <circle cx="1203" cy="998" r="18" fill="url(#silverCoin)" stroke="#7c7c84" stroke-width="2"/>
        <circle cx="1203" cy="998" r="11" fill="none" stroke="#9a9aa2" stroke-width="2"/>
      </g>`,
  },
  {
    id: 'special_map_fragment',
    label: 'collectibles.map_fragment',
    displayName: 'Map Fragment',
    role: 'fragment',
    polygon: [[980,816],[1080,820],[1094,872],[1058,912],[990,896],[978,852]],
    draw: () => `
      <g>
        <ellipse cx="1034" cy="912" rx="62" ry="14" fill="#000000" opacity="0.22"/>
        <polygon points="980,816 1080,820 1094,872 1058,912 990,896 978,852"
                 fill="#f3ead0" stroke="#d8c089" stroke-width="2"/>
        <polygon points="1080,820 1094,872 1058,912 1066,860"
                 fill="#e9c45a" opacity="0.85"/>
        <path d="M996,836 C1024,852 1028,880 1058,888" fill="none" stroke="#2f8f86" stroke-width="4"/>
        <circle cx="996" cy="836" r="4" fill="#2f8f86"/>
        <circle cx="1058" cy="888" r="4" fill="#2f8f86"/>
      </g>`,
  },
  {
    id: 'special_brass_token',
    label: 'collectibles.brass_token',
    displayName: 'Brass Token',
    role: 'collectible',
    polygon: [[1366,930],[1394,930],[1404,942],[1404,962],[1394,974],[1366,974],[1356,962],[1356,942]],
    draw: () => `
      <g>
        <ellipse cx="1380" cy="976" rx="28" ry="7" fill="#000000" opacity="0.22"/>
        <circle cx="1380" cy="952" r="24" fill="url(#tokenGrad)" stroke="#7c5a1e" stroke-width="2"/>
        <circle cx="1380" cy="952" r="16" fill="none" stroke="#8a6a2a" stroke-width="2"/>
        <path d="M1372,960 L1372,944 L1380,954 L1388,944 L1388,960" fill="none" stroke="#6b4e1c" stroke-width="3"/>
      </g>`,
  },
  {
    id: 'easter_egg_brakeman',
    label: 'easter_egg.brakeman',
    displayName: 'Brakeman (grey cat)',
    role: 'brakeman',
    polygon: [[770,748],[884,742],[918,790],[902,846],[836,858],[776,840],[760,792]],
    draw: () => `
      <g>
        <ellipse cx="846" cy="828" rx="72" ry="40" fill="#6b727c"/>
        <ellipse cx="846" cy="820" rx="68" ry="36" fill="#7b828c"/>
        <path d="M906,832 C944,824 944,786 918,780" fill="none" stroke="#6b727c" stroke-width="15" stroke-linecap="round"/>
        <circle cx="820" cy="784" r="38" fill="#7b828c"/>
        <circle cx="820" cy="784" r="38" fill="url(#catShade)"/>
        <polygon points="794,758 812,754 808,780" fill="#6b727c"/>
        <polygon points="846,754 828,756 834,780" fill="#6b727c"/>
        <polygon points="842,754 836,762 840,768" fill="#4f555d"/>
        <ellipse cx="806" cy="784" rx="6.5" ry="8.5" fill="#cdd86a"/>
        <ellipse cx="834" cy="782" rx="6.5" ry="8.5" fill="#cdd86a"/>
        <ellipse cx="806" cy="785" rx="2.2" ry="6.5" fill="#1d2410"/>
        <ellipse cx="834" cy="783" rx="2.2" ry="6.5" fill="#1d2410"/>
        <polygon points="820,793 814,789 826,789" fill="#3a3f46"/>
        <g stroke="#c9cdd3" stroke-width="1.5" opacity="0.8">
          <line x1="820" y1="797" x2="784" y2="792"/>
          <line x1="820" y1="799" x2="786" y2="803"/>
          <line x1="822" y1="797" x2="856" y2="792"/>
          <line x1="822" y1="799" x2="854" y2="803"/>
        </g>
      </g>`,
  },
];

/* ----------------------------------------------------------------------------
 * Defs
 * -------------------------------------------------------------------------- */
const defs = `
  <defs>
    <linearGradient id="ceiling" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#14171f"/>
      <stop offset="1" stop-color="#222732"/>
    </linearGradient>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#9aa39a"/>
      <stop offset="1" stop-color="#717b76"/>
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5d626b"/>
      <stop offset="1" stop-color="#3c3f47"/>
    </linearGradient>
    <radialGradient id="tunnel" cx="0.5" cy="0.5" r="0.6">
      <stop offset="0" stop-color="#2a2620"/>
      <stop offset="0.7" stop-color="#0f1115"/>
      <stop offset="1" stop-color="#080a0d"/>
    </radialGradient>
    <linearGradient id="vending" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2b3340"/>
      <stop offset="1" stop-color="#1b2029"/>
    </linearGradient>
    <radialGradient id="vendGlow" cx="0.5" cy="0.5" r="0.6">
      <stop offset="0" stop-color="#fff2c6" stop-opacity="0.95"/>
      <stop offset="1" stop-color="#c9b06a" stop-opacity="0.25"/>
    </radialGradient>
    <linearGradient id="bench" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7a5430"/>
      <stop offset="1" stop-color="#5a3c22"/>
    </linearGradient>
    <radialGradient id="tokenGrad" cx="0.4" cy="0.35" r="0.7">
      <stop offset="0" stop-color="#f3d27a"/>
      <stop offset="0.6" stop-color="#c79a3e"/>
      <stop offset="1" stop-color="#9a7228"/>
    </radialGradient>
    <linearGradient id="brassPlate" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#caa24a"/>
      <stop offset="1" stop-color="#8a6a2a"/>
    </linearGradient>
    <linearGradient id="bronze" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#b98f48"/>
      <stop offset="1" stop-color="#8a6a30"/>
    </linearGradient>
    <radialGradient id="silverCoin" cx="0.4" cy="0.35" r="0.7">
      <stop offset="0" stop-color="#e4e6ea"/>
      <stop offset="1" stop-color="#9a9aa2"/>
    </radialGradient>
    <radialGradient id="snackShine" cx="0.4" cy="0.3" r="0.8">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="catShade" cx="0.5" cy="0.4" r="0.7">
      <stop offset="0" stop-color="#9aa0a9" stop-opacity="0.5"/>
      <stop offset="1" stop-color="#9aa0a9" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="ceilLight" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#fbf4d8" stop-opacity="0.8"/>
      <stop offset="1" stop-color="#fbf4d8" stop-opacity="0"/>
    </radialGradient>
  </defs>`;

/* ----------------------------------------------------------------------------
 * Base scene + decor (distractors) — no hit entries.
 * -------------------------------------------------------------------------- */
function tiledWall() {
  const tiles = [];
  for (let y = 60; y < 560; y += 40) {
    tiles.push(`<line x1="0" y1="${y}" x2="1920" y2="${y}" stroke="#5a635e" stroke-width="2" opacity="0.5"/>`);
    const off = (Math.floor(y / 40) % 2) * 40;
    for (let x = -off; x < 1920; x += 80) {
      tiles.push(`<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 40}" stroke="#5a635e" stroke-width="1.5" opacity="0.4"/>`);
    }
  }
  return `<rect x="0" y="56" width="1920" height="504" fill="url(#wall)"/>${tiles.join('')}`;
}

function floor() {
  const lines = [];
  for (let i = 0; i < 7; i++) {
    const y = 600 + i * 70;
    lines.push(`<line x1="0" y1="${y}" x2="1920" y2="${y + 8}" stroke="#2f323a" stroke-width="2" opacity="0.35"/>`);
  }
  for (let x = 80; x < 1920; x += 200) {
    lines.push(`<line x1="${x}" y1="560" x2="${x - 160}" y2="1080" stroke="#2f323a" stroke-width="2" opacity="0.28"/>`);
  }
  return `
    <polygon points="0,560 1920,560 1920,1080 0,1080" fill="url(#floor)"/>
    ${lines.join('')}
    <!-- yellow safety line -->
    <polygon points="0,966 1920,966 1920,992 0,992" fill="#d4b03c" opacity="0.92"/>
    <polygon points="0,966 1920,966 1920,972 0,972" fill="#f0d564" opacity="0.8"/>`;
}

const decorBack = `
  <!-- ceiling -->
  <rect x="0" y="0" width="1920" height="60" fill="url(#ceiling)"/>
  ${[300, 760, 1500].map((x) => `<ellipse cx="${x}" cy="92" rx="150" ry="70" fill="url(#ceilLight)"/><rect x="${x - 70}" y="40" width="140" height="16" rx="6" fill="#cdd0c6"/>`).join('')}
  <!-- tunnel mouth, right -->
  <path d="M1470,560 L1470,210 Q1470,150 1540,150 L1860,150 Q1920,150 1920,210 L1920,560 Z" fill="url(#tunnel)"/>
  <path d="M1470,560 L1470,210 Q1470,150 1540,150 L1860,150 Q1920,150 1920,210 L1920,560 Z" fill="none" stroke="#3a3128" stroke-width="6"/>
  <rect x="1560" y="540" width="300" height="20" fill="#161310"/>
  <line x1="1600" y1="560" x2="1660" y2="300" stroke="#23201a" stroke-width="6"/>
  <line x1="1820" y1="560" x2="1760" y2="300" stroke="#23201a" stroke-width="6"/>
  <circle cx="1712" cy="320" r="9" fill="#caa24a" opacity="0.7"/>
  <!-- support pillar -->
  <rect x="1280" y="60" width="64" height="700" fill="#6b736d"/>
  <rect x="1280" y="60" width="20" height="700" fill="#7c847d"/>
  <rect x="1276" y="740" width="72" height="22" fill="#4f554f"/>
  <!-- vintage ad posters (distractors) -->
  <g>
    <rect x="820" y="150" width="150" height="120" rx="4" fill="#2e4a4a"/>
    <circle cx="895" cy="206" r="40" fill="#d98a4a" opacity="0.85"/>
    <rect x="838" y="244" width="114" height="14" fill="#cfe0e4" opacity="0.7"/>
  </g>
  <!-- wall clock (distractor) -->
  <circle cx="1112" cy="110" r="34" fill="#1c2228" stroke="#3a4048" stroke-width="4"/>
  <circle cx="1112" cy="110" r="28" fill="#d8d2c4"/>
  <line x1="1112" y1="110" x2="1112" y2="92" stroke="#22262c" stroke-width="3"/>
  <line x1="1112" y1="110" x2="1126" y2="116" stroke="#22262c" stroke-width="3"/>
  <!-- vending machine (body; snack + token slot are valid objects drawn later) -->
  <g>
    <rect x="130" y="248" width="270" height="520" rx="12" fill="url(#vending)" stroke="#10141a" stroke-width="4"/>
    <rect x="160" y="320" width="200" height="250" rx="8" fill="#0e1218"/>
    <rect x="172" y="332" width="176" height="226" rx="6" fill="url(#vendGlow)"/>
    ${Array.from({ length: 3 }, (_, r) => Array.from({ length: 3 }, (_, c) => `<rect x="${184 + c * 56}" y="${346 + r * 70}" width="40" height="54" rx="4" fill="#3a4150" opacity="0.55"/>`).join('')).join('')}
    <rect x="150" y="588" width="230" height="160" rx="8" fill="#1a1f27"/>
    <rect x="300" y="596" width="62" height="66" rx="6" fill="#11151b"/>
    <rect x="168" y="600" width="110" height="50" rx="6" fill="#2b3340"/>
  </g>
  <!-- bench (slatted wood; bench-top items are valid objects drawn later) -->
  <g>
    <ellipse cx="690" cy="772" rx="280" ry="26" fill="#000000" opacity="0.26"/>
    <rect x="452" y="600" width="468" height="14" rx="6" fill="url(#bench)"/>
    <rect x="452" y="620" width="468" height="12" rx="6" fill="url(#bench)"/>
    <rect x="452" y="664" width="468" height="22" rx="6" fill="url(#bench)"/>
    <rect x="452" y="690" width="468" height="22" rx="6" fill="#6a4828"/>
    <rect x="470" y="712" width="18" height="58" fill="#4a3017"/>
    <rect x="884" y="712" width="18" height="58" fill="#4a3017"/>
    <rect x="452" y="592" width="14" height="120" fill="#4a3017"/>
    <rect x="906" y="592" width="14" height="120" fill="#4a3017"/>
  </g>
  <!-- pipe along wall -->
  <rect x="0" y="120" width="1920" height="12" fill="#5a635e" opacity="0.5"/>
`;

const decorFront = `
  <!-- trash bin, clear floor right of map scrap -->
  <g>
    <ellipse cx="1166" cy="846" rx="56" ry="16" fill="#000000" opacity="0.26"/>
    <path d="M1118,742 L1214,742 L1204,840 L1128,840 Z" fill="#3a4048"/>
    <path d="M1118,742 L1214,742 L1210,762 L1122,762 Z" fill="#4a5058"/>
    <ellipse cx="1166" cy="742" rx="48" ry="10" fill="#23282e"/>
  </g>
  <!-- crumpled litter + leaves (distractors) -->
  ${[[360,900],[1480,1010],[700,1000],[1320,840]]
    .map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="14" ry="8" fill="${i % 2 ? '#b5a98a' : '#8a8270'}" opacity="0.8" transform="rotate(${i * 41} ${x} ${y})"/>`).join('')}
  <!-- faint puddle reflection on floor -->
  <ellipse cx="430" cy="1010" rx="120" ry="26" fill="#3a4150" opacity="0.55"/>
  <ellipse cx="430" cy="1010" rx="120" ry="26" fill="url(#vendGlow)" opacity="0.15"/>
`;

/* ----------------------------------------------------------------------------
 * Distractor clutter — dozens of non-findable props to densify the hunt.
 * All placed in gaps around the 13 findables; rendered BEHIND the findables
 * so a valid object is never occluded.
 * -------------------------------------------------------------------------- */
const clutter = `
  <!-- ===== ceiling extras ===== -->
  <rect x="0" y="18" width="1920" height="10" fill="#2a2f36" opacity="0.6"/>
  <ellipse cx="1080" cy="92" rx="150" ry="70" fill="url(#ceilLight)"/>
  <rect x="1010" y="40" width="140" height="16" rx="6" fill="#cdd0c6"/>
  <line x1="1612" y1="170" x2="1700" y2="300" stroke="#1a1712" stroke-width="3" opacity="0.7"/>
  <line x1="1788" y1="170" x2="1720" y2="320" stroke="#1a1712" stroke-width="3" opacity="0.7"/>

  <!-- ===== wall clutter ===== -->
  <rect x="36" y="56" width="12" height="504" fill="#5a635e" opacity="0.6"/>
  <rect x="412" y="56" width="10" height="200" fill="#5a635e" opacity="0.5"/>
  <g><rect x="84" y="150" width="40" height="10" fill="#4f554f"/><ellipse cx="104" cy="170" rx="22" ry="10" fill="url(#ceilLight)"/></g>
  <g><rect x="1396" y="150" width="40" height="10" fill="#4f554f"/><ellipse cx="1416" cy="170" rx="22" ry="10" fill="url(#ceilLight)"/></g>
  <!-- subway route-map diagram -->
  <g>
    <rect x="440" y="312" width="250" height="150" rx="6" fill="#1d2630" stroke="#39424c" stroke-width="4"/>
    <rect x="450" y="322" width="230" height="130" fill="#e7e1d2"/>
    <polyline points="468,360 540,360 580,400 660,400" fill="none" stroke="#cf5a48" stroke-width="5"/>
    <polyline points="470,420 520,420 560,386 640,386" fill="none" stroke="#3f7fae" stroke-width="5"/>
    <polyline points="500,338 500,440" fill="none" stroke="#4aa06a" stroke-width="5"/>
    ${scatter([[468,360],[540,360],[580,400],[660,400],[520,420],[560,386],[640,386],[500,338],[500,440]], ([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#22262c"/>`)}
  </g>
  <!-- vent grille -->
  <g>
    <rect x="720" y="312" width="120" height="64" rx="4" fill="#6b736d" stroke="#4f554f" stroke-width="3"/>
    ${scatter([0, 1, 2, 3, 4], (i) => `<line x1="728" y1="${322 + i * 11}" x2="832" y2="${322 + i * 11}" stroke="#3f453f" stroke-width="3"/>`)}
  </g>
  <!-- wall speaker -->
  <g><circle cx="900" cy="332" r="26" fill="#2b3138" stroke="#4f554f" stroke-width="3"/><circle cx="900" cy="332" r="14" fill="#1a1f24"/></g>
  <!-- secondary ad poster -->
  <g><rect x="884" y="398" width="120" height="150" rx="4" fill="#3a2e52"/><circle cx="944" cy="452" r="34" fill="#e0b24a" opacity="0.9"/><rect x="900" y="510" width="88" height="14" fill="#cfc6e0" opacity="0.8"/></g>
  <!-- mirror -->
  <g><rect x="706" y="150" width="72" height="112" rx="6" fill="#2b3138" stroke="#556a66" stroke-width="4"/><rect x="714" y="158" width="56" height="96" fill="#5b6b6a" opacity="0.7"/><polygon points="714,158 770,158 730,254" fill="#7c8a89" opacity="0.4"/></g>
  <!-- no-smoking abstract sign -->
  <g><circle cx="775" cy="430" r="34" fill="#e8e2d2" stroke="#c23b34" stroke-width="6"/><line x1="752" y1="408" x2="798" y2="452" stroke="#c23b34" stroke-width="6"/><rect x="762" y="424" width="26" height="10" rx="3" fill="#8a8276"/></g>
  <!-- graffiti tag -->
  <g opacity="0.85"><path d="M444,520 q30,-40 60,-6 q24,-36 56,-6 q20,-26 44,0" fill="none" stroke="#d2543f" stroke-width="8" stroke-linecap="round"/><path d="M470,536 q40,-20 120,-6" fill="none" stroke="#3f7fae" stroke-width="6" stroke-linecap="round"/></g>
  <!-- fire extinguisher cabinet -->
  <g><rect x="1352" y="300" width="68" height="120" rx="6" fill="#9a2a22" stroke="#5e1812" stroke-width="3"/><rect x="1362" y="312" width="48" height="84" fill="#7c211b"/><rect x="1378" y="322" width="16" height="60" rx="6" fill="#c23b34"/></g>
  <!-- emergency phone box -->
  <g><rect x="1352" y="436" width="68" height="96" rx="6" fill="#caa23a" stroke="#7c6320" stroke-width="3"/><rect x="1364" y="448" width="44" height="56" rx="4" fill="#1c1c1c"/><rect x="1372" y="456" width="10" height="30" rx="5" fill="#caa23a"/></g>
  <!-- hanging directional sign -->
  <g><line x1="600" y1="60" x2="600" y2="78" stroke="#2a2f36" stroke-width="3"/><line x1="772" y1="60" x2="772" y2="78" stroke="#2a2f36" stroke-width="3"/><rect x="560" y="78" width="220" height="40" rx="5" fill="#1f3d52"/><rect x="572" y="92" width="120" height="12" fill="#cfe0e4" opacity="0.85"/><polygon points="752,84 772,98 752,112" fill="#cfe0e4" opacity="0.85"/></g>
  <!-- platform number roundel -->
  <g><line x1="980" y1="60" x2="980" y2="74" stroke="#2a2f36" stroke-width="3"/><circle cx="980" cy="104" r="30" fill="#1f3d52" stroke="#cfe0e4" stroke-width="5"/><rect x="966" y="100" width="28" height="6" fill="#cfe0e4"/><rect x="977" y="88" width="6" height="30" fill="#cfe0e4"/></g>
  <!-- exit sign -->
  <g><rect x="1360" y="66" width="92" height="34" rx="4" fill="#1c3a24"/><rect x="1368" y="74" width="42" height="18" fill="#4aa06a"/><polygon points="1416,74 1444,83 1416,92" fill="#bfe6c8"/></g>

  <!-- ===== floor clutter ===== -->
  <!-- drain grate -->
  <g><rect x="150" y="984" width="132" height="52" rx="3" fill="#3a3f47" stroke="#23272d" stroke-width="3"/>${scatter([0, 1, 2, 3, 4, 5], (i) => `<line x1="${162 + i * 20}" y1="990" x2="${162 + i * 20}" y2="1030" stroke="#23272d" stroke-width="4"/>`)}</g>
  <!-- far-left trash bin -->
  <g><ellipse cx="80" cy="892" rx="42" ry="12" fill="#000000" opacity="0.26"/><path d="M44,782 L120,782 L112,884 L52,884 Z" fill="#3a4048"/><ellipse cx="82" cy="782" rx="38" ry="9" fill="#23282e"/></g>
  <!-- umbrella leaning -->
  <g><path d="M96,664 q54,-58 110,0 q-54,-26 -110,0Z" fill="#46607a"/><line x1="170" y1="650" x2="120" y2="916" stroke="#2b2f36" stroke-width="8"/><line x1="120" y1="916" x2="110" y2="930" stroke="#2b2f36" stroke-width="6"/></g>
  <!-- coffee cup -->
  <g><path d="M236,902 L260,902 L256,946 L240,946 Z" fill="#e7e1d2"/><rect x="234" y="896" width="28" height="10" rx="4" fill="#c9c1ad"/><path d="M260,912 q16,4 0,20" fill="none" stroke="#c9c1ad" stroke-width="4"/></g>
  <!-- soda can on side -->
  <g transform="rotate(-8 344 959)"><rect x="316" y="946" width="56" height="26" rx="10" fill="#b8402f"/><ellipse cx="316" cy="959" rx="6" ry="13" fill="#d8d2c4"/></g>
  <!-- shopping bag -->
  <g><path d="M286,996 L356,996 L350,1058 L292,1058 Z" fill="#caa86a"/><path d="M300,996 q21,-22 42,0" fill="none" stroke="#8a6a3a" stroke-width="4"/></g>
  <!-- A-frame standee -->
  <g><polygon points="1520,990 1560,824 1600,990" fill="#2b3138"/><polygon points="1560,990 1600,824 1640,990" fill="#3a424c"/><rect x="1548" y="852" width="84" height="70" rx="4" fill="#e7e1d2"/></g>
  <!-- briefcase -->
  <g><rect x="1664" y="930" width="130" height="76" rx="8" fill="#5a3c24" stroke="#3a2614" stroke-width="3"/><rect x="1664" y="952" width="130" height="8" fill="#3a2614"/><rect x="1712" y="916" width="34" height="18" rx="6" fill="none" stroke="#3a2614" stroke-width="5"/></g>
  <!-- bottle -->
  <g><rect x="1452" y="996" width="20" height="48" rx="8" fill="#3f6a4a" opacity="0.85"/><rect x="1457" y="982" width="10" height="18" fill="#3f6a4a" opacity="0.85"/></g>
  <!-- ticket stub -->
  <g transform="rotate(12 1290 1016)"><rect x="1268" y="1006" width="44" height="20" rx="3" fill="#efe7d2"/><line x1="1284" y1="1006" x2="1280" y2="1026" stroke="#b8a98a" stroke-width="2"/></g>
  <!-- painted floor arrows -->
  <g opacity="0.55"><polygon points="300,946 332,962 300,978 308,962" fill="#d4b03c"/></g>
  <g opacity="0.55"><polygon points="1660,946 1628,962 1660,978 1652,962" fill="#d4b03c"/></g>
  <!-- extra puddle -->
  <ellipse cx="1520" cy="1044" rx="110" ry="22" fill="#3a4150" opacity="0.5"/>

  <!-- ===== micro-litter (cigarettes, leaves, gum, pebbles) ===== -->
  ${scatter([[500, 1040], [690, 1028], [1150, 1004], [360, 1052], [1262, 1040], [820, 1046], [1460, 1052]], ([x, y]) => `<g transform="rotate(${(x * 7) % 60} ${x} ${y})"><rect x="${x - 9}" y="${y - 2}" width="18" height="4" rx="2" fill="#e7e1d2"/><rect x="${x + 7}" y="${y - 2}" width="4" height="4" fill="#8a4a2a"/></g>`)}
  ${scatter([[340, 1044], [1700, 1030], [1040, 1034], [470, 1056], [1560, 1066], [760, 1058]], ([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="7" fill="${i % 2 ? '#8a7a4a' : '#6a7a4a'}" opacity="0.8" transform="rotate(${i * 37} ${x} ${y})"/>`)}
  ${scatter([[420, 1010], [640, 1052], [1180, 1052], [900, 1040], [1320, 1006]], ([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="4" fill="#2b2f33" opacity="0.7"/>`)}
  ${scatter([[260, 1058], [1380, 1058], [980, 1062], [600, 1066]], ([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#1f2327" opacity="0.6"/>`)}
`;

/* ----------------------------------------------------------------------------
 * Compose
 * -------------------------------------------------------------------------- */
const objectLayer = objects
  .slice()
  .sort((a, b) => a.polygon[0][1] - b.polygon[0][1])
  .map((o) => o.draw())
  .join('\n');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${defs}
  <rect x="0" y="0" width="${W}" height="${H}" fill="#14171f"/>
  ${tiledWall()}
  ${floor()}
  ${decorBack}
  ${clutter}
  ${objectLayer}
  ${decorFront}
  <!-- midnight cool vignette -->
  <rect x="0" y="0" width="${W}" height="${H}" fill="#0a1020" opacity="0.18"/>
</svg>`;

/* ----------------------------------------------------------------------------
 * Render + outputs
 * -------------------------------------------------------------------------- */
const OUT_PNG = path.join(ROOT, 'public/adventures/the-lost-line/backgrounds/boards/ch01_board02.png');
const OUT_POOL = path.join(ROOT, 'src/adventures/the-lost-line/boards/pools/ch01_board02.ts');
const GEN_DIR = path.join(__dirname, '_generated');
fs.mkdirSync(GEN_DIR, { recursive: true });

const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W }, background: 'rgba(0,0,0,0)' });
fs.writeFileSync(OUT_PNG, resvg.render().asPng());
console.log('PNG   →', OUT_PNG);

const aabb = (pts) => {
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  return { x, y, width: Math.max(...xs) - x, height: Math.max(...ys) - y };
};

const standards = objects.filter((o) => o.role === 'standard');
const poolLines = standards
  .map((o) => {
    const b = aabb(o.polygon);
    return `  pool('${o.id}', '${o.label}', ${b.x}, ${b.y}, ${b.width}, ${b.height}, { polygon: ${JSON.stringify(o.polygon)}, displayName: ${JSON.stringify(o.displayName)} }),`;
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

export const ch01Board02Pool: BoardObject[] = [
${poolLines}
];
`;
fs.writeFileSync(OUT_POOL, poolFile);
console.log('Pool  →', OUT_POOL);

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
      ...ch01Board02Pool,
${special(frag)}
${special(tok)}
      brakeman(${catB.x}, ${catB.y}, ${catB.width}, ${catB.height}, ${JSON.stringify(cat.polygon)}),
    ],`;
fs.writeFileSync(path.join(GEN_DIR, 'ch01_board02-index-objects.txt'), indexBlock);
console.log('Index block →', path.join(GEN_DIR, 'ch01_board02-index-objects.txt'));

const exportJson = {
  boardId: 'ch01_board02',
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
fs.writeFileSync(path.join(GEN_DIR, 'ch01_board02-hit-export.json'), `${JSON.stringify(exportJson, null, 2)}\n`);
console.log('Export →', path.join(GEN_DIR, 'ch01_board02-hit-export.json'));
console.log('\nDone. 13 objects (10 standard + 2 special + Brakeman).');
