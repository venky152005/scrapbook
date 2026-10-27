import { NAME, NOTE, MEM, LETTER } from './memories.js';
import { LINES, QUESTION, FINAL_MESSAGE } from './proposal.js';
import { renderStickers } from './stickerLayout.js';
import './style.css';

// ── Strict Mobile Desktop Site Mode Enforcer ─────────────────────────────────
function enforceDesktopSiteMode() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || window.innerWidth < 900
    || ('ontouchstart' in window && window.innerWidth < 1024);

  let metaViewport = document.querySelector('meta[name="viewport"]');
  if (!metaViewport) {
    metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    document.head.appendChild(metaViewport);
  }

  if (isMobile) {
    const targetWidth = 1200;
    const screenWidth = window.screen.width || window.innerWidth;
    const initialScale = Math.max(0.25, Math.min(1.0, screenWidth / targetWidth));

    metaViewport.setAttribute(
      'content',
      `width=${targetWidth}, initial-scale=${initialScale.toFixed(3)}, minimum-scale=0.2, maximum-scale=3.0, user-scalable=yes`
    );
    document.documentElement.classList.add('mobile-desktop-mode');
  } else {
    metaViewport.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover');
    document.documentElement.classList.remove('mobile-desktop-mode');
  }
}

enforceDesktopSiteMode();
window.addEventListener('resize', enforceDesktopSiteMode);
window.addEventListener('orientationchange', () => setTimeout(enforceDesktopSiteMode, 150));

// ── Ephemera Helper Components & SVG Definitions ─────────────────────────────

const svgDefs = `
<svg style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">
  <defs>
    <linearGradient id="wing-pink" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f472b6" />
      <stop offset="100%" stop-color="#db2777" />
    </linearGradient>
    <linearGradient id="wing-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <radialGradient id="disco-grad" cx="40%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#cbd5e1" />
      <stop offset="100%" stop-color="#64748b" />
    </radialGradient>
  </defs>
</svg>
`;



// Sketched Lantern & Sparkles SVG
const handDoodlesSVG = (left, top, type = 'lantern', rot = 0) => {
  if (type === 'lantern') {
    return `
      <svg class="doodle-svg" style="left:${left}px;top:${top}px;transform:rotate(${rot}deg);width:32px;height:40px" viewBox="0 0 32 40">
        <path d="M10 8 Q16 4 22 8 L24 30 Q16 34 8 30 Z" fill="rgba(255, 210, 110, 0.25)" stroke="#d97706" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M10 8 L22 8 M8 30 L24 30 M16 4 L16 34" fill="none" stroke="#b45309" stroke-width="0.8" opacity="0.6" />
        <circle cx="16" cy="24" r="3.5" fill="#f59e0b" opacity="0.85" />
      </svg>
    `;
  }
  if (type === 'stars') {
    return `
      <svg class="doodle-svg" style="left:${left}px;top:${top}px;transform:rotate(${rot}deg);width:45px;height:35px" viewBox="0 0 45 35">
        <path d="M10 12 L12 16 L16 16 L13 19 L14 23 L10 20 L6 23 L7 19 L4 16 L8 16 Z" fill="rgba(250, 204, 21, 0.6)" stroke="#ca8a04" stroke-width="0.8" />
        <path d="M30 6 L31.5 9 L35 9 L32.5 11 L33.5 14 L30 12 L26.5 14 L27.5 11 L25 9 L28.5 9 Z" fill="rgba(250, 204, 21, 0.7)" stroke="#ca8a04" stroke-width="0.8" />
        <path d="M22 22 L23 24 L25 24 L23.5 25.5 L24 27.5 L22 26 L20 27.5 L20.5 25.5 L19 24 L21 24 Z" fill="rgba(250, 204, 21, 0.5)" stroke="#ca8a04" stroke-width="0.7" />
      </svg>
    `;
  }
  if (type === 'heart') {
    return `
      <svg class="doodle-svg" style="left:${left}px;top:${top}px;transform:rotate(${rot}deg);width:22px;height:22px" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="rgba(225, 29, 72, 0.25)" stroke="#be123c" stroke-width="1.3" stroke-linecap="round" />
      </svg>
    `;
  }
  return '';
};

// Red Ribbon Bow SVG for Photo Strips
const redBowSVG = () => `
  <svg class="red-bow-svg" viewBox="0 0 30 20" style="width:24px;height:16px" aria-hidden="true">
    <g filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))">
      <path d="M15 10 C8 2, 0 4, 3 11 C6 16, 12 11, 15 10 Z" fill="#a4262c" stroke="#681317" stroke-width="0.5"/>
      <path d="M15 10 C22 2, 30 4, 27 11 C24 16, 18 11, 15 10 Z" fill="#a4262c" stroke="#681317" stroke-width="0.5"/>
      <ellipse cx="15" cy="10" rx="2.5" ry="2" fill="#d9381e"/>
      <path d="M14 10 Q10 18 7 19 M16 10 Q20 18 23 19" stroke="#a4262c" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    </g>
  </svg>
`;

// SVG Butterfly Cut-out
const butterflySVG = (left, top, rot = 0, scale = 1) => `
  <svg class="doodle-svg st-svg" style="left:${left}px;top:${top}px;transform:rotate(${rot}deg) scale(${scale});width:34px;height:34px" viewBox="0 0 40 40">
    <g filter="drop-shadow(0 0 1.5px #fff) drop-shadow(1px 2px 4px rgba(0,0,0,0.22))">
      <path d="M20 20 C10 5, 2 10, 5 22 C8 28, 18 24, 20 20" fill="url(#wing-pink)" stroke="#9d174d" stroke-width="0.8"/>
      <path d="M20 20 C30 5, 38 10, 35 22 C32 28, 22 24, 20 20" fill="url(#wing-pink)" stroke="#9d174d" stroke-width="0.8"/>
      <path d="M20 20 C12 24, 8 32, 14 36 C18 38, 20 28, 20 20" fill="url(#wing-gold)" stroke="#b45309" stroke-width="0.8"/>
      <path d="M20 20 C28 24, 32 32, 26 36 C22 38, 20 28, 20 20" fill="url(#wing-gold)" stroke="#b45309" stroke-width="0.8"/>
      <ellipse cx="20" cy="20" rx="1.5" ry="7" fill="#3b0764"/>
      <path d="M20 13 Q17 7 14 6 M20 13 Q23 7 26 6" stroke="#3b0764" stroke-width="0.8" fill="none"/>
    </g>
  </svg>
`;

// SVG Disco Ball with Pink Stars
const discoBallSVG = (left, top, rot = 0, scale = 1) => `
  <svg class="doodle-svg st-svg" style="left:${left}px;top:${top}px;transform:rotate(${rot}deg) scale(${scale});width:36px;height:42px" viewBox="0 0 40 48">
    <g filter="drop-shadow(0 0 1.5px #fff) drop-shadow(1px 3px 5px rgba(0,0,0,0.22))">
      <line x1="20" y1="0" x2="20" y2="10" stroke="#94a3b8" stroke-width="1.2"/>
      <circle cx="20" cy="25" r="14" fill="url(#disco-grad)" stroke="#64748b" stroke-width="0.8"/>
      <path d="M6 25 Q20 30 34 25 M6 20 Q20 24 34 20 M8 15 Q20 18 32 15 M8 30 Q20 34 32 30" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="0.6"/>
      <path d="M20 11 Q15 25 20 39 M14 12 Q10 25 14 38 M26 12 Q30 25 26 38" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="0.6"/>
      <path d="M35 12 L36 14 L38 14 L36.5 15.5 L37 17.5 L35 16 L33 17.5 L33.5 15.5 L32 14 L34 14 Z" fill="#f472b6"/>
      <path d="M4 32 L5 34 L7 34 L5.5 35.5 L6 37.5 L4 36 L2 37.5 L2.5 35.5 L1 34 L3 34 Z" fill="#f472b6"/>
    </g>
  </svg>
`;

// All photos array from /public/photos
const ALL_PHOTOS = ['/photos/samantha.jpg', '/photos/samantha2.jpg', '/photos/samantha3.jpg'];

// Reusable Flower Image Component Helper
const flowerImgHTML = (src, size = 100, rotation = 0, left = '0px', top = '0px', isMobileHide = false, zIndex = 2) => {
  const path = src.startsWith('/') ? src : `/stickers/flowers/${src}`;
  const mobileCls = isMobileHide ? ' mobile-hide' : '';
  return `<img src="${path}" class="real-flower-img${mobileCls}" style="left:${left};top:${top};width:${size}px;transform:rotate(${rotation}deg);z-index:${zIndex}" alt="" aria-hidden="true" />`;
};

// Polaroid Component Helper with Gold Star Corners (TL, TR, BL ONLY — BR removed for caption!)
const polaroidHTML = (photoUrl = '/photos/samantha.jpg', capText = '', dateText = '', rot = -2, isRight = false) => `
  <div class="pol ${isRight ? 'pol-right' : 'pol-left'}" style="transform:rotate(${rot}deg)">
    <span class="pol-star tl">✦</span>
    <span class="pol-star tr">✦</span>
    <span class="pol-star bl">✦</span>
    <div class="washi-tape rose" style="top:-9px;left:50%;width:70px;margin-left:-35px;transform:rotate(${isRight ? '-2deg' : '2deg'});z-index:3"></div>
    <div class="ph" style="${photoUrl ? `background-image:url(${photoUrl})` : ''}" onclick="document.getElementById('photo-input').click()">
      ${photoUrl ? '' : 'tap to upload<br>a photo'}
    </div>
    ${capText ? `<div class="cap">${capText}</div>` : ''}
    ${dateText ? `<div class="date" style="position:absolute;bottom:6px;right:8px;font-size:9px;z-index:10">${dateText}</div>` : ''}
  </div>
`;

// Photo Strip Component Helper (3 Stacked Photos with Red Bows - 78px width, clear of spine & heading)
const photoStripHTML = (photos = ['/photos/samantha.jpg', '/photos/samantha2.jpg', '/photos/samantha3.jpg'], rot = 6, styleStr = '') => `
  <div class="photo-strip" style="transform:rotate(${rot}deg);${styleStr}">
    <div class="bow-top">${redBowSVG()}</div>
    ${photos.map(p => `
      <div class="strip-ph" style="${p ? `background-image:url(${p})` : ''}" onclick="document.getElementById('photo-input').click()">
        ${p ? '' : 'tap to add'}
      </div>
    `).join('')}
    <div class="bow-bottom">${redBowSVG()}</div>
  </div>
`;

// Quote Highlight Strip Helper (max-width 60%, 2 lines wrapping, z-index:10)
const quoteStripHTML = (lines = [], fontClass = '') => `
  <div class="quote-strip">
    ${lines.map(l => `<span class="quote-line ${fontClass}">${l}</span>`).join('')}
  </div>
`;

// Torn Paper Scrap Helper
const paperScrapHTML = (type = 'map', styleStr = '') => {
  if (type === 'map') {
    return `<div class="paper-scrap-corner scrap-map" style="${styleStr}"></div>`;
  }
  if (type === 'news') {
    return `
      <div class="paper-scrap-corner scrap-news" style="${styleStr}">
        <div style="font-weight:700;border-bottom:1px solid rgba(0,0,0,0.2);margin-bottom:2px">SPECIAL EDITION</div>
        <div>remember this moment</div>
      </div>`;
  }
  return `<div class="paper-scrap-corner scrap-sepia" style="${styleStr}"></div>`;
};

const cover = `
    ${svgDefs}
  <!-- ══ SCRAPBOOK COVER — FLOWER COLLAGE ══ -->

  <!-- ── Bouquet: 6 flower images layered as a center-upper arrangement ── -->
  ${flowerImgHTML('leaf-7.png', 145, -25, '85px', '18px', false, 1)}
  ${flowerImgHTML('leaf-3.png', 130, 22, '155px', '12px', false, 1)}
  ${flowerImgHTML('lavender-2.png', 170, -15, '65px', '10px', false, 2)}
  ${flowerImgHTML('rose-2.png', 155, -8, '88px', '68px', false, 4)}
  ${flowerImgHTML('daisy-5.png', 120, 12, '155px', '90px', false, 3)}
  ${flowerImgHTML('babys-breath-1.png', 200, 5, '70px', '110px', false, 5)}

  <!-- ── Heading text — highest z-index ── -->
  <div class="scbk-cover-text" style="position:absolute;left:0;right:0;top:235px;text-align:center;z-index:20;pointer-events:none">
    <h1 class="scbk-name" style="
      font-family:'Cormorant Garamond',Georgia,serif;
      font-size:62px;
      font-style:italic;
      font-weight:700;
      color:#f7ede0;
      margin:0;
      line-height:1;
      letter-spacing:0.03em;
      text-shadow:0 2px 6px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.9);
    ">${NAME}</h1>
    <p style="
      font-family:'Cormorant Garamond',Georgia,serif;
      font-size:15px;
      font-style:italic;
      font-weight:600;
      color:#f7ede0;
      margin:6px 0 0;
      letter-spacing:0.18em;
      text-transform:lowercase;
      text-shadow:0 1px 4px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.9);
    ">a little book of us</p>
  </div>

  <!-- ── Peach quote strip ── -->
  <div style="position:absolute;left:0;right:0;bottom:100px;display:flex;justify-content:center;z-index:20;pointer-events:none">
    ${quoteStripHTML(['turn the pages slowly'])}
  </div>

  <!-- ── Circular stamp: BIRTHDAY EDITION · 29·09·2026 ── -->
  <div class="vintage-stamp" style="bottom:28px;right:28px;transform:rotate(12deg);z-index:20;width:58px;height:58px;border-color:rgba(235,125,145,0.8);color:rgba(235,125,145,0.95)">
    <span style="font-size:7px;font-weight:700;letter-spacing:0.06em">BIRTHDAY</span>
    <span style="font-size:7px;font-weight:700;letter-spacing:0.06em">EDITION</span>
    <span style="font-size:6px;opacity:0.8;margin-top:1px">29·09·2026</span>
  </div>

  <!-- ── SVG doodle fillers ── -->
  ${handDoodlesSVG(48, 365, 'stars', -8)}
  ${handDoodlesSVG(282, 20, 'heart', 10)}
`;

const p1 = `
  ${paperScrapHTML('map', 'top:-10px;left:-10px;width:95px;height:95px')}
  ${paperScrapHTML('news', 'bottom:-10px;right:-10px;width:110px;height:85px')}
  <div class="washi-tape lavender" style="top:12px;left:36px;width:80px;transform:rotate(-3deg);z-index:3"></div>
  
  <!-- Real Pressed Flowers Cluster -->
  ${flowerImgHTML('daisy-1.png', 85, -10, '-5px', '-5px', false, 2)}
  ${flowerImgHTML('leaf-1.png', 100, 20, '40px', '5px', true, 1)}
  ${flowerImgHTML('rose-petal-1.png', 36, 15, '240px', '390px', true, 2)}

  <div class="date" style="position:relative;z-index:10">29 · 09 • Cancer Moon ♋</div>
  <div class="big" style="max-width:60%;line-height:1.1;margin:18px 0 8px;position:relative;z-index:10">happy birthday,<br>${NAME}</div>
  ${quoteStripHTML(['may your screen presence light up millions of hearts 🎬✨'], 'paper-scrap')}

  <!-- Photo Strip: 78px width, top:165px, right:14px -> clear of heading & 248px from spine (>40px!) -->
  ${photoStripHTML([ALL_PHOTOS[0], ALL_PHOTOS[1], ALL_PHOTOS[0]], 7, 'top:165px;right:14px')}

  <!-- Handwritten note: bottom:22px, left:36px -> >60px clear of stickers, z-index:12 -->
  <div class="handwritten-note" style="bottom:22px;left:36px;transform:rotate(-2deg);z-index:12">
    don't forget this moment ♡
  </div>

  <div class="paper-clip" style="top:172px;left:185px;transform:rotate(15deg)"></div>
  ${handDoodlesSVG(180, 220, 'lantern', -5)}
  ${handDoodlesSVG(245, 12, 'stars', 0)}
  ${butterflySVG(160, 310, 12, 0.9)}
  ${discoBallSVG(22, 290, -8, 0.85)}
`;

const p2 = `
  ${paperScrapHTML('map', 'top:-10px;left:-10px;width:90px;height:90px')}
  <div class="washi-tape rose" style="top:10px;left:140px;width:70px;transform:rotate(1deg);z-index:3"></div>
  <div class="date" style="position:relative;z-index:10">a note</div>
  
  <!-- Real Pressed Flowers Cluster -->
  ${flowerImgHTML('rose-3.png', 105, -8, '-5px', '-5px', false, 2)}
  ${flowerImgHTML('lavender-1.png', 95, 18, '55px', '15px', true, 1)}

  ${polaroidHTML(ALL_PHOTOS[1], '😍', '14.10.2023', -2)}

  ${quoteStripHTML(['from iconic debuts to powerhouse roles that defined cinema'])}

  <!-- Ticket stub with full text readable, z-index:10 -->
  <div class="ticket-stub" style="top:12px;right:16px;transform:rotate(2.5deg);z-index:10">
    <div class="ticket-title">LANTERN FESTIVAL</div>
    <div class="ticket-sub">ADMIT ONE • № 092926</div>
  </div>

  <div class="paper-clip" style="top:6px;right:105px;transform:rotate(-10deg)"></div>
  ${handDoodlesSVG(255, 340, 'heart', 8)}
  ${butterflySVG(36, 375, -10, 0.85)}
  ${discoBallSVG(255, 380, 14, 0.85)}
`;

const p3 = `
  ${paperScrapHTML('news', 'bottom:-10px;right:-10px;width:105px;height:80px')}
  
  <!-- Real Pressed Flowers Cluster -->
  ${flowerImgHTML('daisy-2.png', 90, 15, '220px', '370px', false, 2)}
  ${flowerImgHTML('leaf-2.png', 110, -22, '170px', '350px', true, 1)}
  ${flowerImgHTML('rose-petal-2.png', 34, -12, '250px', '340px', true, 2)}

  ${quoteStripHTML(['ACTING JOURNEY 🎬', 'Every character you bring to life leaves an indelible mark on cinema.', 'Your dedication, emotional depth, and raw talent inspire millions.', 'A true queen who commands the silver screen with effortless grace.'])}
  
  <div class="ticket-stub" style="top:275px;left:34px;transform:rotate(-3deg);z-index:10">
    <div class="ticket-title">NO. 01 • MEMORY</div>
    <div class="ticket-sub">VIP PASS • 2026</div>
  </div>

  ${photoStripHTML([ALL_PHOTOS[1], ALL_PHOTOS[0], ALL_PHOTOS[1]], 6, 'top:140px;right:14px')}

  <div class="handwritten-note" style="bottom:24px;left:36px;transform:rotate(-1.5deg);z-index:12">
    this page is yours ♡
  </div>
  
  <div class="vintage-stamp" style="top:12px;right:18px;transform:rotate(8deg);z-index:10">
    <span>MEMORY PASS</span>
    <span style="font-size:6px;opacity:0.8">2026</span>
  </div>
${butterflySVG(220, 140, 5, 0.9)}
  ${handDoodlesSVG(170, 320, 'stars', 10)}
  ${butterflySVG(140, 240, 5, 0.9)}
  
`;

const p4 = `
  ${paperScrapHTML('sepia', 'top:-10px;left:-10px;width:95px;height:95px')}
  <div class="washi-tape gold" style="top:10px;left:120px;width:75px;transform:rotate(3deg);z-index:3"></div>
  <div class="date" style="position:relative;z-index:10">03.12.2023</div>

  <!-- Real Pressed Flowers Cluster -->
  ${flowerImgHTML('rose-1.png', 95, 10, '-5px', '-5px', false, 2)}
  ${flowerImgHTML('babys-breath-3.png', 90, -18, '50px', '10px', true, 1)}

  ${polaroidHTML(ALL_PHOTOS[0], '🤍✨', '03.12.2023', 2)}

  ${quoteStripHTML(['the unforgettable scenes & performances that mesmerize us all'])}

  <div class="ticket-stub" style="top:12px;right:22px;transform:rotate(4deg);z-index:10">
    <div class="ticket-title">MEMORY PASS</div>
    <div class="ticket-sub">ONE MAGICAL NIGHT</div>
  </div>
  <div class="paper-clip" style="top:6px;right:105px;transform:rotate(-12deg)"></div>
  ${handDoodlesSVG(250, 370, 'stars', 10)}
  ${butterflySVG(245, 300, -12, 0.85)}
  ${discoBallSVG(34, 300, 8, 0.8)}
`;

const p5 = `
  ${paperScrapHTML('map', 'bottom:-10px;right:-10px;width:100px;height:85px')}
  
  <!-- Real Pressed Flowers Cluster -->
  ${flowerImgHTML('daisy-3.png', 88, -12, '10px', '375px', false, 2)}
  ${flowerImgHTML('lavender-3.png', 100, 15, '60px', '360px', true, 1)}

  <!-- Required Flower Quote on Middle Spread -->
  ${quoteStripHTML(['Through every role, every obstacle faced, and every milestone won,'])}
  ${quoteStripHTML([`you stood resilient, fearless, and endlessly inspiring.`, `Your talent shines brighter than any spotlight,`, `and your journey continues to break every boundary in cinema.`])}

  ${photoStripHTML([ALL_PHOTOS[0], ALL_PHOTOS[1], ALL_PHOTOS[0]], -5, 'top:145px;right:14px')}

  <div class="washi-tape mint" style="top:10px;left:110px;width:75px;transform:rotate(-2deg);z-index:3"></div>
  
  <div class="ticket-stub" style="top:315px;left:34px;transform:rotate(-2deg);z-index:10">
    <div class="ticket-title">OCEAN MEMORY</div>
    <div class="ticket-sub">CANCER MOON</div>
  </div>

  <div class="handwritten-note" style="bottom:24px;left:36px;transform:rotate(-1deg);z-index:12">
    keep shining ♡
  </div>
  ${handDoodlesSVG(170, 240, 'heart', -5)}
  ${butterflySVG(120, 300, 8, 0.9)}
`;

const p6 = `
  ${paperScrapHTML('sepia', 'top:-10px;left:-10px;width:95px;height:95px')}
  <div class="date" style="position:relative;z-index:10">29.09.2024</div>

  <!-- Real Pressed Flowers Cluster -->
  ${flowerImgHTML('rose-4.png', 90, -15, '-5px', '-5px', false, 2)}
  ${flowerImgHTML('leaf-4.png', 105, 25, '50px', '10px', true, 1)}

  ${polaroidHTML(ALL_PHOTOS[2], '🎉🎊', '04.04.2026', -3)}

  ${quoteStripHTML(['You don’t just act in movies; you create magic on screen. \n Always our ultimate favorite superstar! 🌟🎬'])}

  <div class="ticket-stub" style="bottom:18px;left:36px;transform:rotate(-3deg);z-index:10">
    <div class="ticket-title">MAGIC PASS</div>
    <div class="ticket-sub">№ 092926 • VIP</div>
  </div>
  <div class="paper-clip" style="bottom:30px;left:145px;transform:rotate(12deg)"></div>
  ${butterflySVG(34, 320, -15, 0.85)}
  ${discoBallSVG(245, 310, 10, 0.8)}
`;

const p7 = `
  ${paperScrapHTML('news', 'bottom:-10px;right:-10px;width:115px;height:85px')}
  <div class="washi-tape lavender" style="top:10px;left:36px;width:75px;transform:rotate(-1.5deg);z-index:3"></div>

  <!-- Real Pressed Flowers Cluster -->
  ${flowerImgHTML('daisy-4.png', 85, 10, '-5px', '-5px', false, 2)}
  ${flowerImgHTML('babys-breath-5.png', 95, -20, '45px', '15px', true, 1)}
  ${flowerImgHTML('rose-petal-3.png', 32, 25, '260px', '370px', true, 2)}

  <div class="date" style="position:relative;z-index:10">a letter</div>
  <div class="big" style="font-size:32px;margin:16px 0 8px;position:relative;z-index:10">Dear ${NAME},</div>
  
  ${quoteStripHTML([
  'some stars light up the sky,',
  'but you light up cinema and millions of lives.',
  'thank you for every extraordinary performance you give us.'
], 'handwritten')}

  ${photoStripHTML([ALL_PHOTOS[1], ALL_PHOTOS[0], ALL_PHOTOS[1]], 7, 'top:140px;right:14px')}

  <div class="handwritten-note" style="bottom:22px;left:16px;transform:rotate(-3deg);font-size:15px;z-index:12">
    you + your light ♡
  </div>

  ${handDoodlesSVG(170, 360, 'stars', -5)}
  ${butterflySVG(120, 360, 6, 0.9)}
`;

const p8 = `
  ${paperScrapHTML('map', 'top:-10px;left:-10px;width:95px;height:95px')}
  <div class="date" style="position:relative;z-index:10">the last page</div>
  ${quoteStripHTML(['there is one more thing.'])}
  
  <!-- Real Pressed Flowers Framing Proposal Envelope -->
  ${flowerImgHTML('rose-5.png', 85, -12, '15px', '220px', false, 2)}
  ${flowerImgHTML('leaf-5.png', 90, 15, '65px', '240px', true, 1)}

  <!-- Realistic Centered Wax Envelope -->
  <div class="env-wrapper" id="env" role="button" tabindex="0" aria-label="Open the envelope">
    <div class="env-body">
      <svg class="env-svg" viewBox="0 0 160 110" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="160" height="110" rx="5" ry="5" fill="#faf5ee" stroke="#d4c8b8" stroke-width="1.2"/>
        <polygon points="0,110 80,62 0,0" fill="#eddccb" opacity="0.65"/>
        <polygon points="160,110 80,62 160,0" fill="#eddccb" opacity="0.65"/>
        <polygon points="0,110 80,56 160,110" fill="#f3e8da" stroke="#d9cbba" stroke-width="0.8"/>
        <polygon points="0,0 80,58 160,0" fill="#fffcf7" stroke="#cbbca8" stroke-width="1.2" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.14))"/>
      </svg>
      <div class="wax-seal">
        <span class="wax-heart">♥</span>
      </div>
    </div>
    <div class="env-tap-badge">
      <span class="tap-hand">👉</span>
      <span>tap envelope to open</span>
      <span class="tap-sparkle">✨</span>
    </div>
  </div>

  <div class="ticket-stub" style="top:16px;right:24px;width:95px;transform:rotate(3deg);z-index:10">
    <div class="ticket-title">THE LAST PAGE</div>
    <div class="ticket-sub">VIP ADMIT ONE</div>
  </div>
  <div class="paper-clip" style="top:10px;right:110px;transform:rotate(-8deg)"></div>

  <div style="position:absolute;left:45%;top:80px;transform:translateX(-50%);width:100%;display:flex;justify-content:center;z-index:10;pointer-events:none">
    ${quoteStripHTML(['one more chapter ♡'], 'handwritten')}
  </div>

  ${handDoodlesSVG(36, 80, 'lantern', -10)}
  ${butterflySVG(34, 360, 10, 0.85)}
  ${discoBallSVG(255, 290, -8, 0.8)}
  <div class="hint" style="color:#8b1e3f;bottom:14px;left:0;right:0;text-align:center;position:absolute;z-index:10;font-family:'Caveat',cursive;font-size:18px;font-weight:700">💌 tap the envelope to open your letter ♡</div>
`;

const back = `
  <!-- Real Pressed Flowers Cluster Framing "to be continued..." -->

  <div class="vintage-stamp blue" style="top:85px;left:50%;margin-left:-26px;transform:rotate(-4deg);z-index:10">
    <span>THE END</span>
    <span>FOR NOW</span>
  </div>
  <p style="position:absolute;left:0;right:0;top:62%;text-align:center;font-size:24px;font-style:italic;margin:0;z-index:10">to be continued…</p>

`;

// Spreads: [front-face content, back-face content]
const S = [
  [cover, p1],
  [p2, p3],
  [p4, p5],
  [p6, p7],
  [p8, back],
];

// â”€â”€ Continuous 3D Metal Spiral SVG Generator â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderRealisticSpiralBinding() {
  const ringBackEl = document.getElementById('spiral-back');
  const ringFrontEl = document.getElementById('spiral-front');
  if (!ringBackEl || !ringFrontEl) return;

  const ringCount = 18;
  const pitch = 24;
  const startY = 14;

  const holeLeftX = 18;  // Left hole center X in 60px SVG space
  const holeRightX = 42; // Right hole center X in 60px SVG space

  let frontPathD = '';
  let backPathD = '';

  for (let i = 0; i < ringCount; i++) {
    const yLeft = startY + i * pitch;
    const yRight = yLeft + pitch * 0.35; // ~8.4px helix winding drop

    // --- FRONT LOOP: curves forward over paper from left hole to right hole ---
    const fMove = `M ${holeLeftX} ${yLeft}`;
    const fCurve = `C ${3} ${yLeft + 1}, ${57} ${yRight - 1}, ${holeRightX} ${yRight}`;
    frontPathD += (i === 0 ? fMove : ` M ${holeLeftX} ${yLeft}`) + ` ${fCurve}`;

    // --- BACK LOOP: curves behind spine paper from right hole to next left hole ---
    const nextYLeft = yLeft + pitch;
    const bMove = `M ${holeRightX} ${yRight}`;
    const bCurve = `C ${49} ${yRight + pitch * 0.45}, ${11} ${nextYLeft - pitch * 0.15}, ${holeLeftX} ${nextYLeft}`;
    backPathD += (i === 0 ? bMove : ` M ${holeRightX} ${yRight}`) + ` ${bCurve}`;
  }

  // Back SVG (behind paper sheets)
  const backSVG = `
    <svg class="spiral-svg spiral-svg-back" viewBox="0 0 60 460" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="metal-back-core" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0b0e12" />
          <stop offset="35%" stop-color="#2a303b" />
          <stop offset="70%" stop-color="#444d5c" />
          <stop offset="100%" stop-color="#12151b" />
        </linearGradient>
        <filter id="back-coil-shadow" x="-30%" y="-10%" width="160%" height="120%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.85" />
        </filter>
      </defs>
      <path d="${backPathD}" fill="none" stroke="#000000" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.65" filter="url(#back-coil-shadow)" />
      <path d="${backPathD}" fill="none" stroke="url(#metal-back-core)" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;

  // Front SVG (in front of paper sheets)
  const frontSVG = `
    <svg class="spiral-svg spiral-svg-front" viewBox="0 0 60 460" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Metallic Silver/Chrome Core Gradient -->
        <linearGradient id="metal-chrome-core" x1="0%" y1="0%" x2="100%" y2="40%">
          <stop offset="0%" stop-color="#181c22" />
          <stop offset="10%" stop-color="#5a687a" />
          <stop offset="25%" stop-color="#f1f5f9" />
          <stop offset="40%" stop-color="#ffffff" />
          <stop offset="58%" stop-color="#334155" />
          <stop offset="76%" stop-color="#cbd5e1" />
          <stop offset="90%" stop-color="#e2e8f0" />
          <stop offset="100%" stop-color="#1e293b" />
        </linearGradient>

        <!-- Specular Edge Highlight Gradient -->
        <linearGradient id="metal-chrome-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.1)" />
          <stop offset="22%" stop-color="rgba(255,255,255,0.95)" />
          <stop offset="50%" stop-color="#ffffff" />
          <stop offset="78%" stop-color="rgba(255,255,255,0.9)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0.1)" />
        </linearGradient>

        <!-- Dark Bottom Edge Shadow Gradient for 3D Cylindrical Roundness -->
        <linearGradient id="metal-chrome-shadow" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(0,0,0,0.6)" />
          <stop offset="50%" stop-color="rgba(0,0,0,0.15)" />
          <stop offset="100%" stop-color="rgba(0,0,0,0.45)" />
        </linearGradient>

        <!-- Soft Ambient Drop Shadow onto Paper -->
        <filter id="front-coil-shadow" x="-40%" y="-20%" width="180%" height="140%">
          <feDropShadow dx="2.5" dy="4" stdDeviation="3.2" flood-color="#000000" flood-opacity="0.45" />
        </filter>
      </defs>

      <!-- Layer 1: Soft Contact Drop Shadow on Paper -->
      <path d="${frontPathD}" fill="none" stroke="#000000" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity="0.4" filter="url(#front-coil-shadow)" />

      <!-- Layer 2: Main Chrome Metal Body -->
      <path d="${frontPathD}" fill="none" stroke="url(#metal-chrome-core)" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Layer 3: Cylindrical Bottom Shading -->
      <path d="${frontPathD}" fill="none" stroke="url(#metal-chrome-shadow)" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Layer 4: Crisp Top Specular Highlight Streak -->
      <path d="${frontPathD}" fill="none" stroke="url(#metal-chrome-highlight)" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" transform="translate(-0.6, -0.8)" />

      <!-- Layer 5: Hole Entry Ring Accents -->
      <g>
        ${Array.from({ length: ringCount }, (_, i) => {
    const yL = startY + i * pitch;
    const yR = yL + pitch * 0.35;
    return `
            <ellipse cx="${holeLeftX}" cy="${yL}" rx="2.5" ry="3.2" fill="none" stroke="rgba(0,0,0,0.65)" stroke-width="1.2" />
            <ellipse cx="${holeRightX}" cy="${yR}" rx="2.5" ry="3.2" fill="none" stroke="rgba(0,0,0,0.65)" stroke-width="1.2" />
          `;
  }).join('')}
      </g>
    </svg>
  `;

  ringBackEl.innerHTML = backSVG;
  ringFrontEl.innerHTML = frontSVG;
}

// â”€â”€ Boot â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// -- Image Preloader ----------------------------------------------------------
const ALL_IMAGE_URLS = [
  '/photos/samantha.jpg', '/photos/samantha2.jpg', '/photos/samantha3.jpg',
  '/stickers/flowers/leaf-7.png', '/stickers/flowers/leaf-3.png',
  '/stickers/flowers/lavender-2.png', '/stickers/flowers/daisy-5.png',
  '/stickers/flowers/babys-breath-1.png', '/stickers/flowers/rose-2.png',
  '/stickers/flowers/leaf-1.png', '/stickers/flowers/leaf-2.png',
  '/stickers/flowers/leaf-4.png', '/stickers/flowers/leaf-5.png',
  '/stickers/flowers/leaf-6.png', '/stickers/flowers/leaf-8.png',
  '/stickers/flowers/leaf-9.png', '/stickers/flowers/leaf-10.png',
  '/stickers/flowers/leaf-11.png', '/stickers/flowers/daisy-1.png',
  '/stickers/flowers/daisy-2.png', '/stickers/flowers/daisy-3.png',
  '/stickers/flowers/daisy-4.png', '/stickers/flowers/daisy-6.png',
  '/stickers/flowers/rose-1.png', '/stickers/flowers/rose-3.png',
  '/stickers/flowers/rose-4.png', '/stickers/flowers/rose-5.png',
  '/stickers/flowers/rose-6.png', '/stickers/flowers/lavender-1.png',
  '/stickers/flowers/lavender-3.png', '/stickers/flowers/babys-breath-2.png',
  '/stickers/flowers/babys-breath-3.png', '/stickers/flowers/rose-petal-1.png',
  '/stickers/flowers/rose-petal-2.png',
  '/stickers/rapunzel/06_rapunzel_standing.png',
  '/stickers/rapunzel/08_rapunzel_brushing_hair.png',
  '/stickers/rapunzel/08_rapunzel_flynn_hair.png',
  '/stickers/rapunzel/12_flynn_rapunzel_hair_scene.png',
  '/stickers/rapunzel/14_rapunzel_flynn_boat.png',
  '/stickers/rapunzel/13_bottom_rapunzel_flynn.png',
  '/stickers/rapunzel/04_maximus_horse.png',
  '/stickers/rapunzel/09_flower_bouquet_rapunzel.png',
  '/stickers/rapunzel/10_rapunzel_pascal_portrait.png',
  '/stickers/rapunzel/12_rapunzel_standing.png',
];

function createLoadingScreen() {
  const el = document.createElement('div');
  el.id = 'preload-screen';
  const spinnerDiv = document.createElement('div');
  spinnerDiv.style.cssText = 'text-align:center';
  const icon = document.createElement('div');
  icon.style.cssText = 'font-size:60px;margin-bottom:18px;animation:preload-spin 3s linear infinite';
  icon.textContent = '\u{1F338}';
  const title = document.createElement('div');
  title.style.cssText = "font-size:2rem;font-style:italic;font-weight:600;color:#6b3a2a;letter-spacing:.04em;margin-bottom:6px;font-family:'Cormorant Garamond',serif";
  title.textContent = 'A Little Book of Us';
  const sub = document.createElement('div');
  sub.style.cssText = "font-size:1rem;color:#9b7160;margin-bottom:28px;font-style:italic;font-family:'Cormorant Garamond',serif";
  sub.textContent = 'Gathering all the magic…';
  const barWrap = document.createElement('div');
  barWrap.style.cssText = 'width:240px;height:6px;background:rgba(107,58,42,.15);border-radius:99px;overflow:hidden;margin:0 auto 10px';
  const bar = document.createElement('div');
  bar.id = 'preload-bar';
  bar.style.cssText = 'height:100%;width:0%;background:linear-gradient(90deg,#c5835a,#9b3a2a);border-radius:99px;transition:width .3s ease';
  barWrap.appendChild(bar);
  const pctEl = document.createElement('div');
  pctEl.id = 'preload-pct';
  pctEl.style.cssText = "font-size:.85rem;color:#9b7160;font-style:italic;font-family:'Cormorant Garamond',serif";
  pctEl.textContent = '0%';
  spinnerDiv.append(icon, title, sub, barWrap, pctEl);
  el.appendChild(spinnerDiv);
  Object.assign(el.style, {
    position: 'fixed', inset: '0', zIndex: '99999',
    background: 'linear-gradient(135deg,#f2ece2 0%,#e8ddd0 50%,#d9cfc4 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'opacity 0.8s ease',
  });
  const style = document.createElement('style');
  style.textContent = '@keyframes preload-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';
  document.head.appendChild(style);
  document.body.appendChild(el);
  return el;
}

function preloadAllImages(onComplete) {
  const screen = createLoadingScreen();
  const bar = document.getElementById('preload-bar');
  const pct = document.getElementById('preload-pct');
  const total = ALL_IMAGE_URLS.length;
  let loaded = 0;
  function updateProgress() {
    loaded++;
    const p = Math.round((loaded / total) * 100);
    if (bar) bar.style.width = p + '%';
    if (pct) pct.textContent = p + '%';
    if (loaded >= total) finish();
  }
  function finish() {
    setTimeout(function () {
      screen.style.opacity = '0';
      setTimeout(function () { screen.remove(); onComplete(); }, 800);
    }, 300);
  }
  setTimeout(function () { if (loaded < total) { loaded = total; finish(); } }, 8000);
  ALL_IMAGE_URLS.forEach(function (url) {
    var img = new Image();
    img.onload = img.onerror = function () { updateProgress(); };
    img.src = url;
  });
  if (total === 0) finish();
}

document.addEventListener('DOMContentLoaded', function () {
  // Preload images then boot directly
  preloadAllImages(function () { bootApp(); });
});

function bootApp() {

  const inner = document.getElementById('inner');
  if (!inner) return;

  const N = S.length;

  // â”€â”€ Render 3D Continuous SVG Metal Spiral â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  renderRealisticSpiralBinding();

  // â”€â”€ Build sheet DOM & add stickers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  inner.innerHTML = S.map((spread, i) => `
    <div class="sheet">
      <div class="face f p${(i * 2) % 4 + 1}${i === 0 ? ' dark' : ''}"></div>
      <div class="face b p${(i * 2 + 1) % 4 + 1}${i === 4 ? ' dark' : ''}"></div>
    </div>
  `).join('');

  // Populate content + stickers per face
  const sheets = [...inner.querySelectorAll('.sheet')];
  sheets.forEach((sheetEl, i) => {
    sheetEl.style.zIndex = N - i + 2;

    const frontFace = sheetEl.querySelector('.face.f');
    const backFace = sheetEl.querySelector('.face.b');

    frontFace.innerHTML = S[i][0];
    backFace.innerHTML = S[i][1];

    // Sticker face indices: front face = i*2, back face = i*2+1
    renderStickers(frontFace, i * 2);
    renderStickers(backFace, i * 2 + 1);
  });

  // â”€â”€ Navigation dots â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const dots = document.getElementById('dots');
  dots.innerHTML = Array.from({ length: N + 1 }, () => '<b></b>').join('');

  const pv = document.getElementById('prev');
  const nx = document.getElementById('next');
  let k = 0;

  const bookGroup = document.getElementById('book-group');

  function view() {
    // Translate the whole group (spirals + book) so rings always sit on the spine
    if (bookGroup) bookGroup.style.transform = `translateX(${k === 0 ? -170 : k === N ? 170 : 0}px)`;
    [...dots.children].forEach((d, i) => d.classList.toggle('on', i === k));
    if (pv) pv.disabled = k === 0;
    if (nx) nx.disabled = k === N;
  }

  function go(d) {
    const j = d > 0 ? k : k - 1;
    if (j < 0 || j >= N) return;
    const s = sheets[j];
    // While flipping: z-index 100 â€” below .spiral-front (z:500) but above other sheets
    s.style.zIndex = 100;
    s.classList.toggle('turned', d > 0);

    // Micro-interaction on coil during turn
    if (bookGroup) {
      bookGroup.classList.add('turning');
      setTimeout(() => bookGroup.classList.remove('turning'), 550);
    }

    k += d;
    view();
    setTimeout(() => {
      s.style.zIndex = d > 0 ? j + 2 : N - j + 2;
    }, 550);
  }

  if (nx) nx.onclick = () => go(1);
  if (pv) pv.onclick = () => go(-1);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  });

  view();

  // â”€â”€ Stage scale fit â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  let sc = 1;
  function fit() {
    sc = Math.min((window.innerWidth - 16) / 680, (window.innerHeight - 120) / 460, 1.7);
    const f = document.getElementById('fit');
    const stEl = document.getElementById('stage');
    if (f && stEl) {
      f.style.width = 680 * sc + 'px';
      f.style.height = 460 * sc + 'px';
      stEl.style.transform = `scale(${sc})`;
    }
  }
  window.addEventListener('resize', fit);
  fit();

  // â”€â”€ Sticker drag + swipe â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const bk = document.getElementById('stage');
  let sx = null;

  if (bk) {
    bk.addEventListener('pointerdown', (e) => {
      const stickerEl = e.target.closest('.st:not(.st-nodrag)');
      if (!stickerEl) { sx = e.clientX; return; }
      sx = null;
      stickerEl.setPointerCapture(e.pointerId);
      const x0 = e.clientX, y0 = e.clientY;
      const l0 = parseFloat(stickerEl.style.left);
      const t0 = parseFloat(stickerEl.style.top);
      const mv = (ev) => {
        stickerEl.style.left = l0 + (ev.clientX - x0) / sc + 'px';
        stickerEl.style.top = t0 + (ev.clientY - y0) / sc + 'px';
      };
      stickerEl.addEventListener('pointermove', mv);
      stickerEl.addEventListener('pointerup', () => stickerEl.removeEventListener('pointermove', mv), { once: true });
    });

    bk.addEventListener('pointerup', (e) => {
      if (sx !== null) {
        const d = e.clientX - sx;
        if (d < -50) go(1);
        if (d > 50) go(-1);
      }
      sx = null;
    });

    // Tap any polaroid or photo strip frame to upload photo
    bk.addEventListener('click', (e) => {
      const ph = e.target.closest('.ph, .strip-ph, .frameless-ph');
      if (!ph) return;
      const f = document.createElement('input');
      f.type = 'file'; f.accept = 'image/*';
      f.onchange = () => {
        const file = f.files[0];
        if (!file) return;
        ph.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
        ph.textContent = '';
      };
      f.click();
    });
  }

  // â”€â”€ Audio â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  initAudioPlayer();

  // â”€â”€ Proposal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  initProposalFlow();

  // â”€â”€ 3-Layer Cinematic Environment & Parallax â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  initBackgroundVideo();
  renderFloralGarden();
  renderFallingPetals();
  initParallaxAndOpening();
}

function startBirthdayWishingEffects() {
  const symbols = ['🎂', '✨', '💖', '🌸', '✦', '🌙', '🎉', '🤍'];
  for (let i = 0; i < 36; i++) {
    const s = document.createElement('span');
    s.className = 'fall';
    s.textContent = symbols[i % symbols.length];
    s.style.left = (i * 2.7 + Math.random() * 2) + 'vw';
    s.style.fontSize = (14 + Math.random() * 18) + 'px';
    s.style.animationDuration = (4 + Math.random() * 5) + 's';
    s.style.animationDelay = (Math.random() * 3) + 's';
    document.body.appendChild(s);
  }
}

// â”€â”€ Background Video Controller â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initBackgroundVideo() {
  const video = document.getElementById('bg-video');
  if (!video) return;

  video.muted = true;
  video.play().catch(() => {
    window.addEventListener('pointerdown', () => video.play(), { once: true });
  });
}

// â”€â”€ Photorealistic Botanical Garden Generator â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderFloralGarden() {
  const gardenFloor = document.getElementById('garden-floor');
  const gardenBack = document.getElementById('garden-back');
  const gardenMid = document.getElementById('garden-mid');
  const gardenFront = document.getElementById('garden-front');

  if (!gardenBack || !gardenMid || !gardenFront) return;

  // Dark Soil & Grass Base Floor
  if (gardenFloor) {
    gardenFloor.innerHTML = `
      <svg viewBox="0 0 1200 240" preserveAspectRatio="none" style="width:100%;height:100%">
        <path d="M0 240 L0 175 Q 200 165 400 185 Q 600 195 800 175 Q 1000 165 1200 180 L1200 240 Z" fill="#030107" />
        <path d="M0 240 L0 190 Q 300 175 600 195 Q 900 180 1200 200 L1200 240 Z" fill="#090412" />
        <!-- Micro Grass Blades Base -->
        <path d="M20 180 L25 160 L30 182 M50 185 L54 162 L60 188 M80 178 L85 155 L90 180 M110 182 L115 160 L120 185" stroke="#143818" stroke-width="2" />
        <path d="M1080 180 L1085 160 L1090 182 M1110 185 L1114 162 L1120 188 M1140 178 L1145 155 L1150 180" stroke="#143818" stroke-width="2" />
      </svg>
    `;
  }

  // Back Layer: Soft Blurred Background Foliage Silhouettes
  gardenBack.innerHTML = `
    <svg viewBox="0 0 1200 240" preserveAspectRatio="none" style="width:100%;height:100%">
      <!-- Left Silhouette -->
      <path d="M-30 240 C 40 120, 120 60, 260 100 C 330 125, 360 180, 440 240 Z" fill="#0a0515" />
      <path d="M30 240 Q 110 70 170 40 Q 220 100 270 240" fill="#100820" />
      <!-- Right Silhouette -->
      <path d="M1230 240 C 1160 120, 1080 60, 940 100 C 870 125, 840 180, 760 240 Z" fill="#0a0515" />
      <path d="M1170 240 Q 1100 70 1030 40 Q 980 100 930 240" fill="#100820" />
    </svg>
  `;

  // Mid Layer: Photorealistic Botanical Flowers with Warm Lantern Light Highlights & Dew Drops
  gardenMid.innerHTML = `
    <svg viewBox="0 0 1200 240" preserveAspectRatio="none" style="width:100%;height:100%">
      <defs>
        <!-- Purple Dahlia Multi-Tone Radial Gradient -->
        <radialGradient id="dahlia-purple-grad" cx="48%" cy="48%" r="52%">
          <stop offset="0%" stop-color="#fae8ff" />
          <stop offset="25%" stop-color="#e9d5ff" />
          <stop offset="50%" stop-color="#c084fc" />
          <stop offset="78%" stop-color="#7e22ce" />
          <stop offset="100%" stop-color="#3b0764" />
        </radialGradient>
        <!-- Pink Garden Rose Multi-Tone Gradient -->
        <radialGradient id="rose-pink-grad" cx="42%" cy="42%" r="58%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="22%" stop-color="#f472b6" />
          <stop offset="60%" stop-color="#db2777" />
          <stop offset="88%" stop-color="#9d174d" />
          <stop offset="100%" stop-color="#4c0519" />
        </radialGradient>
        <!-- Leaf Organic Gradient with Golden Lantern Top Highlight -->
        <linearGradient id="leaf-grad-left" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff0aa" />
          <stop offset="18%" stop-color="#4ade80" />
          <stop offset="55%" stop-color="#15803d" />
          <stop offset="100%" stop-color="#022c22" />
        </linearGradient>
        <linearGradient id="leaf-grad-right" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fff0aa" />
          <stop offset="18%" stop-color="#4ade80" />
          <stop offset="55%" stop-color="#15803d" />
          <stop offset="100%" stop-color="#022c22" />
        </linearGradient>
      </defs>

      <!-- LEFT SIDE BOTANICAL BOUQUET (0% to 32% Width) -->
      <g filter="drop-shadow(4px 8px 14px rgba(0,0,0,0.7))">
        <!-- Deep Leaves & Vine Stems with Vein Shading -->
        <path d="M 0 240 C 60 130, 160 110, 270 185 C 190 210, 95 220, 0 240 Z" fill="url(#leaf-grad-left)" stroke="rgba(255,240,170,0.6)" stroke-width="1.2" />
        <path d="M 10 240 C 120 170, 220 150, 260 180" fill="none" stroke="#22543d" stroke-width="1.5" />
        <path d="M 40 240 C 110 100, 195 80, 235 145 C 165 180, 95 195, 40 240 Z" fill="url(#leaf-grad-left)" stroke="rgba(255,240,170,0.6)" stroke-width="1" />

        <!-- Lavender Stems & Multi-Faceted 3D Buds -->
        <g transform="translate(100, 55)">
          <path d="M0 185 Q 5 -25 10 -65" fill="none" stroke="#2e1065" stroke-width="3.5" />
          <circle cx="10" cy="-65" r="5.5" fill="#f5d0fe" stroke="#ffd98a" stroke-width="0.9" />
          <circle cx="7" cy="-52" r="6.5" fill="#e9d5ff" />
          <circle cx="13" cy="-39" r="7" fill="#c084fc" />
          <circle cx="6" cy="-26" r="7.5" fill="#a855f7" />
          <circle cx="14" cy="-13" r="8" fill="#7e22ce" />
        </g>
        <g transform="translate(155, 40)">
          <path d="M0 200 Q 8 -30 12 -75" fill="none" stroke="#2e1065" stroke-width="3.5" />
          <circle cx="12" cy="-75" r="6" fill="#f472b6" stroke="#ffd98a" stroke-width="0.9" />
          <circle cx="8" cy="-60" r="7" fill="#f5d0fe" />
          <circle cx="15" cy="-45" r="7.5" fill="#e9d5ff" />
          <circle cx="7" cy="-30" r="8" fill="#c084fc" />
          <circle cx="16" cy="-15" r="8.5" fill="#7e22ce" />
        </g>

        <!-- Photorealistic Multi-Layered Purple Dahlia -->
        <g transform="translate(210, 120)">
          <!-- Outer Petal Layer (12 Curved Bezier Petals) -->
          <path d="M0 -38 C 16 -24, 16 24, 0 38 C -16 24, -16 -24, 0 -38 Z" fill="url(#dahlia-purple-grad)" stroke="rgba(255,240,170,0.8)" stroke-width="0.8" />
          <path d="M-38 0 C -24 16, 24 16, 38 0 C 24 -16, -24 -16, -38 0 Z" fill="url(#dahlia-purple-grad)" stroke="rgba(255,240,170,0.8)" stroke-width="0.8" />
          <path d="M-27 -27 C -12 -35, 24 -12, 27 27 C 12 35, -24 12, -27 -27 Z" fill="url(#dahlia-purple-grad)" stroke="rgba(255,240,170,0.8)" stroke-width="0.8" />
          <path d="M27 -27 C 35 -12, 12 24, -27 27 C -35 12, -12 -24, 27 -27 Z" fill="url(#dahlia-purple-grad)" stroke="rgba(255,240,170,0.8)" stroke-width="0.8" />
          <!-- Mid Petal Layer -->
          <path d="M0 -26 C 11 -16, 11 16, 0 26 C -11 16, -11 -16, 0 -26 Z" fill="#c084fc" opacity="0.9" />
          <path d="M-26 0 C -16 11, 16 11, 26 0 C 16 -11, -16 -11, -26 0 Z" fill="#c084fc" opacity="0.9" />
          <!-- Center Stamen & Dew Drops -->
          <circle cx="0" cy="0" r="14" fill="#e9d5ff" />
          <circle cx="0" cy="0" r="8.5" fill="#fef08a" />
          <circle cx="0" cy="0" r="4.5" fill="#ca8a04" />
          <!-- Dew Drop Highlight -->
          <circle cx="-12" cy="-14" r="2.2" fill="rgba(255,255,255,0.85)" />
          <circle cx="-10" cy="-13" r="1.2" fill="#ffffff" />
        </g>

        <!-- Photorealistic Pink Garden Rose -->
        <g transform="translate(120, 145)">
          <path d="M-30 -12 C -18 -34, 24 -28, 30 -6 C 36 18, 6 34, -18 28 C -34 18, -34 -6, -30 -12 Z" fill="url(#rose-pink-grad)" stroke="rgba(255,240,170,0.85)" stroke-width="1" />
          <circle cx="0" cy="0" r="20" fill="#f472b6" />
          <circle cx="0" cy="0" r="12" fill="#fde047" />
          <circle cx="0" cy="0" r="6" fill="#d97706" />
          <!-- Dew Drop -->
          <circle cx="8" cy="-10" r="2" fill="rgba(255,255,255,0.85)" />
        </g>

        <!-- Baby's Breath & Wildflower Star Clusters -->
        <g transform="translate(50, 75)">
          <circle cx="10" cy="10" r="3.8" fill="#ffffff" stroke="#ffd98a" stroke-width="0.5" />
          <circle cx="26" cy="4" r="4.2" fill="#ffd98a" />
          <circle cx="42" cy="16" r="3.8" fill="#ffffff" stroke="#ffd98a" stroke-width="0.5" />
          <circle cx="58" cy="8" r="4.2" fill="#ffd98a" />
        </g>
      </g>

      <!-- RIGHT SIDE BOTANICAL BOUQUET (68% to 100% Width) -->
      <g filter="drop-shadow(-4px 8px 14px rgba(0,0,0,0.7))">
        <!-- Deep Leaves & Vine Stems with Vein Shading -->
        <path d="M 1200 240 C 1140 130, 1040 110, 930 185 C 1010 210, 1105 220, 1200 240 Z" fill="url(#leaf-grad-right)" stroke="rgba(255,240,170,0.6)" stroke-width="1.2" />
        <path d="M 1190 240 C 1080 170, 980 150, 940 180" fill="none" stroke="#22543d" stroke-width="1.5" />
        <path d="M 1160 240 C 1090 100, 1005 80, 965 145 C 1035 180, 1105 195, 1160 240 Z" fill="url(#leaf-grad-right)" stroke="rgba(255,240,170,0.6)" stroke-width="1" />

        <!-- Lavender Stems & Multi-Faceted Buds -->
        <g transform="translate(1100, 55)">
          <path d="M0 185 Q -5 -25 -10 -65" fill="none" stroke="#2e1065" stroke-width="3.5" />
          <circle cx="-10" cy="-65" r="5.5" fill="#f5d0fe" stroke="#ffd98a" stroke-width="0.9" />
          <circle cx="-7" cy="-52" r="6.5" fill="#e9d5ff" />
          <circle cx="-13" cy="-39" r="7" fill="#c084fc" />
          <circle cx="-6" cy="-26" r="7.5" fill="#a855f7" />
          <circle cx="-14" cy="-13" r="8" fill="#7e22ce" />
        </g>

        <!-- Photorealistic Multi-Layered Purple Dahlia -->
        <g transform="translate(990, 120)">
          <path d="M0 -38 C 16 -24, 16 24, 0 38 C -16 24, -16 -24, 0 -38 Z" fill="url(#dahlia-purple-grad)" stroke="rgba(255,240,170,0.8)" stroke-width="0.8" />
          <path d="M-38 0 C -24 16, 24 16, 38 0 C 24 -16, -24 -16, -38 0 Z" fill="url(#dahlia-purple-grad)" stroke="rgba(255,240,170,0.8)" stroke-width="0.8" />
          <path d="M-27 -27 C -12 -35, 24 -12, 27 27 C 12 35, -24 12, -27 -27 Z" fill="url(#dahlia-purple-grad)" stroke="rgba(255,240,170,0.8)" stroke-width="0.8" />
          <path d="M27 -27 C 35 -12, 12 24, -27 27 C -35 12, -12 -24, 27 -27 Z" fill="url(#dahlia-purple-grad)" stroke="rgba(255,240,170,0.8)" stroke-width="0.8" />
          <circle cx="0" cy="0" r="14" fill="#e9d5ff" />
          <circle cx="0" cy="0" r="8.5" fill="#fef08a" />
          <circle cx="0" cy="0" r="4.5" fill="#ca8a04" />
          <!-- Dew Drop -->
          <circle cx="12" cy="-14" r="2.2" fill="rgba(255,255,255,0.85)" />
        </g>

        <!-- Photorealistic Pink Garden Rose -->
        <g transform="translate(1080, 145)">
          <path d="M-30 -12 C -18 -34, 24 -28, 30 -6 C 36 18, 6 34, -18 28 C -34 18, -34 -6, -30 -12 Z" fill="url(#rose-pink-grad)" stroke="rgba(255,240,170,0.85)" stroke-width="1" />
          <circle cx="0" cy="0" r="20" fill="#f472b6" />
          <circle cx="0" cy="0" r="12" fill="#fde047" />
          <circle cx="0" cy="0" r="6" fill="#d97706" />
        </g>

        <!-- Wildflower Star Clusters -->
        <g transform="translate(1130, 75)">
          <circle cx="-10" cy="10" r="3.8" fill="#ffffff" stroke="#ffd98a" stroke-width="0.5" />
          <circle cx="-26" cy="4" r="4.2" fill="#ffd98a" />
          <circle cx="-42" cy="16" r="3.8" fill="#ffffff" stroke="#ffd98a" stroke-width="0.5" />
        </g>
      </g>
    </svg>
  `;

  // Front Layer: Shallow Depth-of-Field Large Foreground Corner Flowers
  gardenFront.innerHTML = `
    <svg viewBox="0 0 1200 240" preserveAspectRatio="none" style="width:100%;height:100%">
      <!-- Bottom Left Large Foreground Dahlia (Entering Frame) -->
      <g transform="translate(-10, 50)">
        <path d="M 0 190 C 90 100, 190 90, 290 190 Z" fill="#15803d" stroke="#fef08a" stroke-width="1.2" />
        <g transform="translate(125, 135)">
          <circle cx="0" cy="0" r="44" fill="#6b21a8" />
          <circle cx="0" cy="0" r="32" fill="#a855f7" />
          <circle cx="0" cy="0" r="20" fill="#e9d5ff" />
          <circle cx="0" cy="0" r="10" fill="#fde047" />
        </g>
      </g>

      <!-- Bottom Right Large Foreground Dahlia (Entering Frame) -->
      <g transform="translate(920, 50)">
        <path d="M 290 190 C 200 100, 100 90, 0 190 Z" fill="#15803d" stroke="#fef08a" stroke-width="1.2" />
        <g transform="translate(165, 135)">
          <circle cx="0" cy="0" r="44" fill="#be185d" />
          <circle cx="0" cy="0" r="32" fill="#f472b6" />
          <circle cx="0" cy="0" r="20" fill="#fde047" />
          <circle cx="0" cy="0" r="10" fill="#ffffff" />
        </g>
      </g>
    </svg>
  `;
}


// â”€â”€ Falling Flower Petals System (12 Petals Drifting) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function renderFallingPetals() {
  const container = document.getElementById('falling-petals-container');
  if (!container) return;
  container.innerHTML = '';

  for (let i = 0; i < 12; i++) {
    const petal = document.createElement('div');
    petal.className = 'falling-petal';
    const left = (i * 8.2 + Math.random() * 4) % 96;
    const delay = Math.random() * 14;
    const dur = 10 + Math.random() * 7;
    const scale = 0.55 + Math.random() * 0.55;

    petal.style.left = `${left}vw`;
    petal.style.top = `-25px`;
    petal.style.animationDelay = `-${delay}s`;
    petal.style.animationDuration = `${dur}s`;
    petal.style.transform = `scale(${scale})`;
    container.appendChild(petal);
  }
}


// â”€â”€ 3D Mouse / Touch Parallax & Book Opening Interaction â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initParallaxAndOpening() {
  const bgEnv = document.getElementById('bg-environment');
  const fitEl = document.getElementById('fit');
  const fgGard = document.getElementById('fg-garden');
  const tapBtn = document.getElementById('tap-invitation');

  // Mouse Parallax Effect
  window.addEventListener('mousemove', (e) => {
    const cx = (e.clientX / window.innerWidth - 0.5) * 2;
    const cy = (e.clientY / window.innerHeight - 0.5) * 2;

    if (bgEnv) bgEnv.style.transform = `translate3d(${cx * 8}px, ${cy * 6}px, 0)`;
    if (fitEl) fitEl.style.transform = `translate3d(${cx * -12}px, ${cy * -8}px, 0)`;
    if (fgGard) fgGard.style.transform = `translate3d(${cx * 18}px, ${cy * 12}px, 0)`;
  });

  // Touch / Gyro orientation fallback
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (!e.gamma || !e.beta) return;
      const cx = Math.max(-1, Math.min(1, e.gamma / 30));
      const cy = Math.max(-1, Math.min(1, e.beta / 45));

      if (bgEnv) bgEnv.style.transform = `translate3d(${cx * 8}px, ${cy * 6}px, 0)`;
      if (fitEl) fitEl.style.transform = `translate3d(${cx * -12}px, ${cy * -8}px, 0)`;
      if (fgGard) fgGard.style.transform = `translate3d(${cx * 18}px, ${cy * 12}px, 0)`;
    });
  }

  // Cover Page Opening Trigger on Tap / Click
  if (tapBtn) {
    tapBtn.addEventListener('click', () => {
      const nextBtn = document.getElementById('next');
      if (nextBtn && !nextBtn.disabled) {
        nextBtn.click();
        launchSkyLanterns(8);
      }
    });
  }

  // Clicking on cover directly turns page
  const inner = document.getElementById('inner');
  if (inner) {
    inner.addEventListener('click', (e) => {
      const coverEl = e.target.closest('.sheet:first-child .face.f');
      if (coverEl) {
        const nextBtn = document.getElementById('next');
        if (nextBtn && !nextBtn.disabled) {
          nextBtn.click();
          launchSkyLanterns(8);
        }
      }
    });
  }
}


// â”€â”€ Sky Lanterns â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function launchSkyLanterns(count) {
  for (let i = 0; i < count; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'sky-lantern-wrapper';
    const scale = 0.5 + Math.random() * 0.7;
    const duration = 8 + Math.random() * 8;
    const delay = Math.random() * 3;
    wrapper.style.left = `${Math.random() * 92}vw`;
    wrapper.style.transform = `scale(${scale})`;
    wrapper.style.animationDuration = `${duration}s`;
    wrapper.style.animationDelay = `${delay}s`;
    wrapper.innerHTML = `
      <div class="sky-lantern-body">
        <div class="sky-lantern-flame"></div>
      </div>`;
    document.body.appendChild(wrapper);
    setTimeout(() => wrapper.remove(), (duration + delay + 2) * 1000);
  }
}

// â”€â”€ Audio Player â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initAudioPlayer() {
  const musicBtn = document.getElementById('music-btn');
  const musicLabel = document.getElementById('music-label');
  const audio = new Audio('/song.mp3');
  audio.loop = true; audio.volume = 0.4;
  let isPlaying = false, synthCtx = null, synthGain = null;

  const startSynth = () => {
    if (synthCtx) return;
    try {
      synthCtx = new (window.AudioContext || window.webkitAudioContext)();
      synthGain = synthCtx.createGain();
      synthGain.gain.value = 0.12;
      synthGain.connect(synthCtx.destination);
      [185.00, 220.00, 277.18, 329.63].forEach(freq => {
        const osc = synthCtx.createOscillator();
        const filter = synthCtx.createBiquadFilter();
        osc.type = 'sine'; osc.frequency.value = freq;
        filter.type = 'lowpass'; filter.frequency.value = 450;
        osc.connect(filter); filter.connect(synthGain); osc.start();
      });
    } catch { /* silently fail */ }
  };

  const toggleMusic = () => {
    if (!isPlaying) {
      audio.play().then(() => {
        isPlaying = true;
        if (musicLabel) musicLabel.textContent = 'Music On';
      }).catch(() => {
        startSynth(); isPlaying = true;
        if (musicLabel) musicLabel.textContent = 'Music On';
      });
    } else {
      audio.pause();
      if (synthGain) synthGain.gain.value = 0;
      isPlaying = false;
      if (musicLabel) musicLabel.textContent = 'Music Off';
    }
  };

  if (musicBtn) musicBtn.addEventListener('click', toggleMusic);
}

// â”€â”€ Proposal Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function initProposalFlow() {
  const pop = document.getElementById('pop');
  const popVideo = document.getElementById('pop-video');
  const linesContainer = document.getElementById('lines');
  const q = document.getElementById('q');
  const finalMsgContainer = document.getElementById('final-msg');
  const env = document.getElementById('env');
  const popClose = document.getElementById('pop-close');
  const bdayWishCard = document.getElementById('bday-wish-card');
  const vintageLetter = document.getElementById('vintage-letter');
  const readLetterBtn = document.getElementById('read-letter-btn');

  if (!pop || !env) return;

  function closeProposal() {
    pop.classList.remove('show');
    if (bdayWishCard) bdayWishCard.style.display = 'flex';
    if (vintageLetter) vintageLetter.style.display = 'none';
  }

  if (popClose) popClose.onclick = closeProposal;

  pop.onclick = (e) => {
    if (e.target === pop) closeProposal();
  };

  // Step 1: Open Envelope -> Show Wish Card & Trigger Birthday Wishing Effects
  function openProposal() {
    if (popVideo) popVideo.play().catch(() => { });
    if (bdayWishCard) bdayWishCard.style.display = 'flex';
    if (vintageLetter) vintageLetter.style.display = 'none';

    pop.classList.add('show');

    // Trigger grand wishing lanterns & falling birthday celebration effects
    launchSkyLanterns(16);
    startBirthdayWishingEffects();
  }

  // Step 2: Click Read Letter -> Reveal Vintage Letter Sheet & Animate Text
  function startLetterReading() {
    if (bdayWishCard) bdayWishCard.style.display = 'none';
    if (vintageLetter) vintageLetter.style.display = 'flex';

    // Render LINES
    linesContainer.innerHTML = LINES.map(l => `<p>${l}</p>`).join('');
    const ps = [...linesContainer.children];
    ps.forEach((p, i) => setTimeout(() => p.classList.add('on'), 500 + i * 1800));

    const questionDelay = 500 + ps.length * 1800;
    setTimeout(() => {
      if (q) {
        q.textContent = QUESTION;
        q.classList.add('on');
      }
    }, questionDelay);

    // Render FINAL_MESSAGE paragraphs sequentially
    if (finalMsgContainer) {
      finalMsgContainer.innerHTML = FINAL_MESSAGE.map(l =>
        `<p style="font-family:'Caveat','Dancing Script',cursive;font-size:26px;font-weight:600;line-height:1.55;margin:6px 0;color:#1d0d04;text-shadow:0.4px 0.4px 0.8px rgba(29,13,4,0.45),0 0 1px rgba(29,13,4,0.28);letter-spacing:0.02em">${l}</p>`
      ).join('');
      const finalPs = [...finalMsgContainer.children];
      const finalDelay = questionDelay + 1400;
      finalPs.forEach((p, i) => setTimeout(() => p.classList.add('on'), finalDelay + i * 1800));
    }

    // ── Scroll hint logic ──────────────────────────────────────────────────
    const scrollHint = document.getElementById('letter-scroll-hint');
    if (scrollHint && vintageLetter) {
      function updateScrollHint() {
        const atBottom = vintageLetter.scrollTop + vintageLetter.clientHeight >= vintageLetter.scrollHeight - 60;
        const isScrollable = vintageLetter.scrollHeight > vintageLetter.clientHeight + 20;
        if (!isScrollable || atBottom) {
          scrollHint.classList.add('hidden');
        } else {
          scrollHint.classList.remove('hidden');
        }
      }
      // Initially hidden — reveal after a short delay so content can render
      scrollHint.classList.add('hidden');
      setTimeout(() => { updateScrollHint(); }, 600);
      vintageLetter.addEventListener('scroll', updateScrollHint, { passive: true });
      // Re-check as lines animate in (content grows)
      const totalDuration = questionDelay + 1400 + FINAL_MESSAGE.length * 1800 + 1000;
      const recheckInterval = setInterval(updateScrollHint, 1800);
      setTimeout(() => clearInterval(recheckInterval), totalDuration);
    }
  }


  // ── Runaway "No" Button & Celebration Logic ──────────────────────────────────
  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const proposalBtnGroup = document.getElementById('proposal-btn-group');
  const proposalSuccessCard = document.getElementById('proposal-success-card');

  if (btnNo && vintageLetter) {
    function moveNoBtn(e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }

      const letterRect = vintageLetter.getBoundingClientRect();
      const btnRect = btnNo.getBoundingClientRect();

      const minX = 30;
      const maxX = Math.max(minX, letterRect.width - btnRect.width - 40);
      const minY = 30;
      const maxY = Math.max(minY, letterRect.height - btnRect.height - 40);

      const randomX = Math.floor(Math.random() * (maxX - minX)) + minX;
      const randomY = Math.floor(Math.random() * (maxY - minY)) + minY;

      btnNo.style.position = 'absolute';
      btnNo.style.left = `${randomX}px`;
      btnNo.style.top = `${randomY}px`;
      btnNo.style.zIndex = '999';
      btnNo.style.transition = 'left 0.18s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)';
    }

    btnNo.addEventListener('mouseenter', moveNoBtn);
    btnNo.addEventListener('mouseover', moveNoBtn);
    btnNo.addEventListener('pointerover', moveNoBtn);
    btnNo.addEventListener('touchstart', moveNoBtn, { passive: false });
    btnNo.addEventListener('click', moveNoBtn);
  }

  if (btnYes) {
    btnYes.onclick = () => {
      if (proposalBtnGroup) proposalBtnGroup.style.display = 'none';
      if (btnNo) btnNo.style.display = 'none';
      if (proposalSuccessCard) proposalSuccessCard.style.display = 'block';

      // Grand celebration fireworks & lanterns
      launchSkyLanterns(25);
      startBirthdayWishingEffects();
    };
  }

  if (readLetterBtn) readLetterBtn.onclick = startLetterReading;

  env.onclick = openProposal;
  env.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') openProposal(); };
}
