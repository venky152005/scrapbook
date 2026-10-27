/**
 * stickerLayout.js — Rapunzel sticker map for all 10 page faces.
 *
 * Page face size: 340 × 460 px.
 * Front-face padding: top 30, right 28, bottom 24, LEFT spine 42 px.
 * Back-face  padding: top 30, RIGHT spine 42, bottom 24, left 28 px.
 *
 * SAFE-ZONE RULES (applied to every sticker below):
 *   • x ≥ 34 on front faces (≈10 % from the left/spine edge).
 *   • x ≤ 306 − sticker_width on front faces (10 % from right).
 *   • No sticker bounding box overlaps any text node.
 *   • Large scene images (draggable:false) are placed only in clearly open areas.
 *
 * Text occupancy by face (rough bounding boxes):
 *   Face 0  cover  – scrap:  x 40–250, y 0–143 | ransom: y 80–190 full width
 *   Face 1  p1     – date/big/strip: y 30–160, x 34–306
 *   Face 2  p2     – date+note text: y 30–210, x 34–306
 *   Face 3–6 mem   – date: y 30–50 | polaroid: y 52–340 centered 258 px wide | note: y 340–400
 *   Face 7  letter – date+Dear: y 30–100 | letter body: y 100–250, x 34–306
 *   Face 8  p8     – date/note: y 30–90 | envelope: x 95–245, y 184–284 | hint: y 366+
 *   Face 9  back   – "to be continued": y 270–310, centered
 */

const R = (f) => `/stickers/rapunzel/${f}`;

/**
 * @typedef {{ src:string, x:number, y:number, w:number, rotate:number, draggable:boolean }} StickerDef
 * @type {Record<number, StickerDef[]>}
 */
export const STICKER_MAP = {

  /* ── Face 0: Front Cover (dark) ───────────────────────────────────────── */
  0: [],

  /* ── Face 1: p1 – Happy Birthday ──────────────────────────────────────── */
  1: [
    // Rapunzel brushing hair – bottom centre (clear of heading text above)
    { src: R('08_rapunzel_brushing_hair.png'), x: 50, y: 260, w: 140, rotate: -2, draggable: true },
    // Sun card – far right
    { src: R('12_sun_card.png'), x: 241, y: 90, w: 36, rotate: 9, draggable: true },
    // Sun card – far right
    { src: R('12_sun_card.png'), x: 201, y: 60, w: 26, rotate: 9, draggable: true },
  ],

  /* ── Face 2: p2 – Note ──────────────────────────────────────────────────── */
  2: [
    // Pascal portrait – bottom-right area, clear of note
    { src: R('10_rapunzel_pascal_portrait.png'), x: 16, y: 370, w: 90, rotate: 4, draggable: true },
    // Pascal – bottom-left
    { src: R('06_pascal.png'), x: 150, y: 375, w: 40, rotate: -10, draggable: true },
    // Sun card – top-right, safe corner
    { src: R('07_sun_card.png'), x: 292, y: 40, w: 38, rotate: 25, draggable: true },
  ],

  /* ── Face 3: p3 – Memory 1 ──────────────────────────────────────────────── */
  3: [
    // Sun card – top-right corner above polaroid
    { src: R('07_sun_card.png'), x: 222, y: 6, w: 38, rotate: 25, draggable: true },
    // Pascal chameleon – bottom-left, below note text
    { src: R('05_pascal_chameleon.png'), x: 36, y: 380, w: 40, rotate: -5, draggable: true },
    // Small sun – top-left corner
    { src: R('13_sun_card_small.png'), x: 36, y: 6, w: 32, rotate: -4, draggable: true },
  ],

  /* ── Face 4: p4 – Memory 2 ──────────────────────────────────────────────── */
  4: [
    // Pascal – bottom-left below note
    { src: R('14_pascal.png'), x: 36, y: 408, w: 44, rotate: -7, draggable: true },
    // Sun card – bottom-right
    { src: R('16_sun_card_small.png'), x: 258, y: 412, w: 32, rotate: 8, draggable: true },
    // Chameleon – top-left corner
    { src: R('05_pascal_chameleon.png'), x: 70, y: 240, w: 36, rotate: -6, draggable: true },
  ],

  /* ── Face 5: p5 – Memory 3 ──────────────────────────────────────────────── */
  5: [
    // Rapunzel standing (small) – bottom-left
    { src: R('12_rapunzel_standing.png'), x: 170, y: 280, w: 65, rotate: -3, draggable: true },
    // Sun card – top-right corner
    { src: R('15_sun_card_large.png'), x: 258, y: 16, w: 36, rotate: 10, draggable: true },
    // Sun card – top-right corner
    { src: R('15_sun_card_large.png'), x: 228, y: 46, w: 26, rotate: 10, draggable: true },
    // Sun card – top-right corner
    { src: R('15_sun_card_large.png'), x: 268, y: 66, w: 16, rotate: 10, draggable: true },
  ],

  /* ── Face 6: p6 – Memory 4 ──────────────────────────────────────────────── */
  6: [
    // Pascal chameleon – top-left corner
    { src: R('05_pascal_chameleon.png'), x: 236, y: 406, w: 38, rotate: -9, draggable: true },
    // Sun card – top-right
    { src: R('17_sun_icon.png'), x: 258, y: 6, w: 36, rotate: 5, draggable: true },
  ],

  /* ── Face 7: p7 – Letter ───────────────────────────────────────────────── */
  7: [
    // Flynn+Rapunzel hair scene – bottom half, clear of letter text
    { src: R('08_rapunzel_flynn_hair.png'), x: -2, y: 300, w: 100, rotate: -16, draggable: true },
    // Sun card – top-right corner
    { src: R('12_sun_card.png'), x: 261, y: 4, w: 36, rotate: 12, draggable: true },
  ],

  /* ── Face 8: p8 – Envelope / Proposal ──────────────────────────────────── */
  8: [
    // Boat scene – below envelope, clear of text
    { src: R('14_rapunzel_flynn_boat.png'), x: 165, y: 310, w: 180, rotate: 0, draggable: false },
    // Sun card – top-right corner
    { src: R('13_sun_card_small.png'), x: 170, y: 6, w: 38, rotate: 8, draggable: true },
  ],

  /* ── Face 9: Back Cover (dark) ─────────────────────────────────────────── */
  9: []
};

/**
 * renderStickers(faceEl, pageIndex)
 * Appends sticker span+img elements to a page face.
 * Sets draggable="false" and -webkit-user-drag:none via attribute + CSS class.
 *
 * @param {HTMLElement} faceEl    – The .face DOM element
 * @param {number}      pageIndex – Face index (see STICKER_MAP)
 */
export function renderStickers(faceEl, pageIndex) {
  const stickers = STICKER_MAP[pageIndex];
  if (!stickers) return;

  stickers.forEach(({ src, x, y, w, rotate, draggable: isDraggable }) => {
    const span = document.createElement('span');
    span.className = isDraggable ? 'st' : 'st st-nodrag';
    span.style.cssText = `left:${x}px;top:${y}px;transform:rotate(${rotate}deg)`;

    const img = document.createElement('img');
    img.src = src;
    img.className = 'st-img';
    img.style.width = w + 'px';
    img.style.height = w + 'px';
    img.alt = '';
    // Prevent browser native drag ghost (the ⊘ symbol)
    img.draggable = false;
    img.setAttribute('draggable', 'false');

    span.appendChild(img);
    faceEl.appendChild(span);
  });
}
