interface CaseItem {
  kind: 'image' | 'holo';
  image?: string;
  video?: string;
  title: string;
  rows: string[];
  key: string;
  text: string;
  viewerLabel?: string;
  hitLabel?: string;
  sliceAltPrefix?: string;
  slices?: string[];
}

interface Pose {
  s: number;
  x: number;
  y: number;
  mob: boolean;
}

let initialized = false;

export function initPortfolio(): void {
  if (initialized) return;
  initialized = true;

  const ASSETS = {
    casePlate: './images/case_plate.webp',
    badge: './images/badge_lanyard.webp',
    trans: './media/hero_trans.mp4'
  };

  const CASES: CaseItem[] = [
    {
      kind: 'image',
      image: './images/portfolio/dd_cover.webp',
      title: '运营项目',
      rows: ['叮咚买菜', '3D 运营主视觉', '2026'],
      key: '// 鲜叮咚 够葡喜',
      text: '— 以毛毡质感小鸡 IP 与生鲜花市微缩场景为核心，打造高辨识度叮咚买菜运营主视觉画面。',
      viewerLabel: '叮咚买菜运营项目作品集',
      hitLabel: '查看叮咚买菜完整作品集',
      sliceAltPrefix: '叮咚买菜运营项目作品集 第 ',
      slices: [
        './images/portfolio/dd_s1.webp',
        './images/portfolio/dd_s2.webp',
        './images/portfolio/dd_s3.webp',
        './images/portfolio/dd_s4.webp'
      ]
    },
    {
      kind: 'image',
      image: './images/portfolio/wy_cover.webp',
      title: 'ux项目',
      rows: ['窝友自驾', '移动端 UX/UI 设计', '2026'],
      key: '// 窝友自驾',
      text: '— 围绕自驾出行与露营社交场景，整合旅行地图、智能行程规划与沿途路线分享的移动端体验设计。',
      viewerLabel: '窝友自驾 UX 项目作品集',
      hitLabel: '查看窝友自驾完整作品集',
      sliceAltPrefix: '窝友自驾 UX 项目作品集 第 ',
      slices: [
        './images/portfolio/wy_s1.webp',
        './images/portfolio/wy_s2.webp',
        './images/portfolio/wy_s3.webp',
        './images/portfolio/wy_s4.webp',
        './images/portfolio/wy_s5.webp',
        './images/portfolio/wy_s6.webp',
        './images/portfolio/wy_s7.webp',
        './images/portfolio/wy_s8.webp',
        './images/portfolio/wy_s9.webp',
        './images/portfolio/wy_s10.webp'
      ]
    },
    {
      kind: 'holo',
      title: '生活切片',
      rows: ['旅行&生活', '随手记录', '2026'],
      key: '// 生活切片',
      text: '— 工作之余喜欢去旅游看看风景，大多数照片为随手记录。'
    }
  ];

  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dur = (d: number) => (RM ? 0 : d);
  const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
  const EASE = 'cubic-bezier(.2,.8,.2,1)';

  const stage = document.getElementById('stage') as HTMLElement | null;
  const frame = document.getElementById('frame') as HTMLElement | null;
  const plate = document.getElementById('plate') as HTMLImageElement | null;
  const wm = document.getElementById('wm') as SVGSVGElement | null;
  const cut = document.getElementById('cut') as HTMLImageElement | null;
  const badge = document.getElementById('badge') as HTMLElement | null;
  const badgeImg = document.getElementById('badgeImg') as HTMLImageElement | null;
  const badgeHit = document.getElementById('badgeHit') as HTMLElement | null;
  const transVid = document.getElementById('trans') as HTMLVideoElement | null;
  const caseplate = document.getElementById('caseplate') as HTMLImageElement | null;
  const screen = document.getElementById('screen') as HTMLElement | null;
  const flash = document.getElementById('flash') as HTMLElement | null;
  const screenHit = document.getElementById('screenHit') as HTMLElement | null;

  const mWm = document.getElementById('mWm') as SVGSVGElement | null;
  const mBadgeWrap = document.getElementById('mBadge') as HTMLElement | null;

  const btnStudio = document.getElementById('btnStudio') as HTMLButtonElement | null;
  const btnPortfolio = document.getElementById('btnPortfolio') as HTMLButtonElement | null;
  const btnContacts = document.getElementById('btnContacts') as HTMLButtonElement | null;
  const btnDiscuss = document.getElementById('btnDiscuss') as HTMLButtonElement | null;
  const btnLogo = document.getElementById('btnLogo') as HTMLButtonElement | null;
  const hint = document.getElementById('hint') as HTMLElement | null;

  const ticket = document.getElementById('ticket') as HTMLElement | null;
  const ticketTitle = document.getElementById('ticketTitle') as HTMLElement | null;
  const ticketRows = document.getElementById('ticketRows') as HTMLElement | null;
  const desc = document.getElementById('desc') as HTMLElement | null;
  const descKey = document.getElementById('descKey') as HTMLElement | null;
  const descText = document.getElementById('descText') as HTMLElement | null;
  const descNum = document.getElementById('descNum') as HTMLElement | null;
  const btnPrev = document.getElementById('btnPrev') as HTMLButtonElement | null;
  const btnNext = document.getElementById('btnNext') as HTMLButtonElement | null;
  const caseViewer = document.getElementById('caseViewer') as HTMLElement | null;
  const caseViewerTrack = document.getElementById('caseViewerTrack') as HTMLElement | null;
  const caseViewerClose = document.getElementById('caseViewerClose') as HTMLButtonElement | null;
  const badgeZoom = document.getElementById('badgeZoom') as HTMLElement | null;
  const badgeZoomStage = document.getElementById('badgeZoomStage') as HTMLElement | null;
  const badgeZoomClose = document.getElementById('badgeZoomClose') as HTMLButtonElement | null;

  if (
    !stage || !frame || !plate || !wm || !cut || !badge || !badgeImg || !badgeHit ||
    !transVid || !caseplate || !screen || !flash || !screenHit || !mWm || !mBadgeWrap ||
    !btnStudio || !btnPortfolio || !btnContacts || !btnDiscuss || !btnLogo || !hint ||
    !ticket || !ticketTitle || !ticketRows || !desc || !descKey || !descText || !descNum ||
    !btnPrev || !btnNext || !caseViewer || !caseViewerTrack || !caseViewerClose ||
    !badgeZoom || !badgeZoomStage || !badgeZoomClose
  ) {
    return;
  }

  const tags: HTMLButtonElement[] = [btnStudio, btnPortfolio, btnContacts, btnDiscuss];
  const vids = Array.from(screen.querySelectorAll<HTMLElement>('.case-vid'));
  const isVid = (el?: Element | null): el is HTMLVideoElement => Boolean(el && el.tagName === 'VIDEO');

  // Populate local asset URLs
  caseplate.src = ASSETS.casePlate;
  badgeImg.src = ASSETS.badge;

  // Clone badge for mobile
  const mBadge = badge.cloneNode(true) as HTMLElement;
  mBadge.removeAttribute('id');
  mBadge.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
  mBadgeWrap.appendChild(mBadge);

  // Clone exact original badge for uniform enlarged preview
  const zBadge = badge.cloneNode(true) as HTMLElement;
  zBadge.removeAttribute('id');
  zBadge.classList.remove('pre');
  zBadge.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
  const zCard = zBadge.querySelector('.card');
  if (zCard) {
    const qrFill = document.createElement('div');
    qrFill.className = 'qr-fill';
    const qrImg = document.createElement('img');
    qrImg.src = './images/life/wechat_qr.jpg';
    qrImg.alt = '微信二维码名片';
    qrImg.draggable = false;
    qrImg.loading = 'eager';
    qrImg.decoding = 'async';
    qrImg.referrerPolicy = 'no-referrer';
    qrFill.appendChild(qrImg);
    zCard.appendChild(qrFill);
  }
  badgeZoomStage.appendChild(zBadge);

  // Assign case media
  vids.forEach((v, i) => {
    const c = CASES[i];
    if (!c) return;
    if (isVid(v) && c.video) {
      v.src = c.video;
      v.preload = i === 0 ? 'auto' : 'metadata';
    } else if (v instanceof HTMLImageElement && c.image) {
      v.src = c.image;
    }
  });

  // Fetch transition clip into Blob for keyframe-safe seeking
  let transReady = false;
  transVid.addEventListener('loadeddata', () => {
    transReady = true;
  }, { once: true });

  fetch(ASSETS.trans)
    .then(r => {
      if (!r.ok) throw new Error('trans fetch failed');
      return r.blob();
    })
    .then(blob => {
      transVid.src = URL.createObjectURL(blob);
      transVid.load();
    })
    .catch(() => {
      transVid.src = ASSETS.trans;
      transVid.load();
    });

  let mode: 'hero' | 'case' = 'hero';
  let idx = 0;
  let busy = false;
  let swayAnims: Animation[] = [];
  let wheelLockUntil = 0;
  let viewerOpen = false;
  let viewerCaseIdx = -1;
  let badgeZoomOpen = false;
  let badgeZoomKind: 'card' | 'qr' = 'card';
  let draggingBadge = false;

  function cancelAnims(el: Element) {
    el.getAnimations().forEach(a => a.cancel());
  }

  function getBadgeZoomScale(): number {
    const availW = Math.max(240, window.innerWidth - 48);
    const availH = Math.max(320, window.innerHeight - 120);
    return Math.max(0.85, Math.min(1.8, availH / 465, availW / 300));
  }

  function openBadgeZoom(kind: 'card' | 'qr' = 'card') {
    if (busy || mode !== 'hero' || badgeZoomOpen || !badgeZoom || !badgeZoomStage || !badge || !mBadgeWrap) return;
    badgeZoomOpen = true;
    badgeZoomKind = kind;
    zBadge.classList.toggle('is-qr', kind === 'qr');
    document.body.classList.add('is-badge-zoom');
    const targetScale = getBadgeZoomScale();
    cancelAnims(badgeZoomStage);
    badgeZoomStage.style.transform = `scale(${targetScale})`;
    badgeZoom.classList.add('open');
    badgeZoom.setAttribute('aria-hidden', 'false');

    const sourceCard = window.innerWidth <= 820
      ? (mBadgeWrap.querySelector('.card') || badge.querySelector('.card'))
      : badge.querySelector('.card');
    const zoomCard = zBadge.querySelector('.card');

    if (!RM && sourceCard && zoomCard) {
      const from = sourceCard.getBoundingClientRect();
      const to = zoomCard.getBoundingClientRect();
      if (from.width > 0 && to.width > 0) {
        const dx = (from.left + from.width / 2) - (to.left + to.width / 2);
        const dy = (from.top + from.height / 2) - (to.top + to.height / 2);
        const s = Math.max(0.35, Math.min(1, from.width / to.width));
        badgeZoomStage.animate(
          [
            { opacity: 0.45, transform: `translate(${dx}px, ${dy}px) scale(${targetScale * s}) rotate(-2deg)` },
            { opacity: 1, transform: `translate(0px, 0px) scale(${targetScale}) rotate(0deg)` }
          ],
          { duration: 360, easing: EASE, fill: 'forwards' }
        );
      }
    }
  }

  function closeBadgeZoom() {
    if (!badgeZoomOpen || !badgeZoom) return;
    badgeZoomOpen = false;
    document.body.classList.remove('is-badge-zoom');
    badgeZoom.classList.remove('open');
    badgeZoom.setAttribute('aria-hidden', 'true');
    if (mode === 'hero' && !busy && !draggingBadge) startSway();
  }

  function toggleBadgeZoom(kind: 'card' | 'qr' = 'card') {
    if (badgeZoomOpen) {
      if (badgeZoomKind !== kind) {
        badgeZoomKind = kind;
        zBadge.classList.toggle('is-qr', kind === 'qr');
      } else {
        closeBadgeZoom();
      }
    } else {
      openBadgeZoom(kind);
    }
  }

  function openCaseViewer(caseIdx: number) {
    const c = CASES[caseIdx];
    if (busy || mode !== 'case' || viewerOpen || !c || !c.slices || !c.slices.length || !caseViewer || !caseViewerTrack || !caseViewerClose) return;
    if (viewerCaseIdx !== caseIdx) {
      caseViewerTrack.textContent = '';
      const frag = document.createDocumentFragment();
      c.slices.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = (c.sliceAltPrefix || '作品集 第 ') + (i + 1) + ' 部分';
        img.loading = 'eager';
        img.decoding = 'async';
        img.referrerPolicy = 'no-referrer';
        frag.appendChild(img);
      });
      caseViewerTrack.appendChild(frag);
      viewerCaseIdx = caseIdx;
    }
    viewerOpen = true;
    caseViewer.scrollTop = 0;
    caseViewer.setAttribute('aria-label', c.viewerLabel || '完整作品集');
    caseViewer.classList.add('open');
    caseViewer.setAttribute('aria-hidden', 'false');
    caseViewerClose.focus({ preventScroll: true });
  }

  function closeCaseViewer() {
    if (!viewerOpen || !caseViewer) return;
    viewerOpen = false;
    caseViewer.classList.remove('open');
    caseViewer.setAttribute('aria-hidden', 'true');
  }

  function fillCase(i: number) {
    const c = CASES[i];
    if (!c || !ticketTitle || !ticketRows || !descKey || !descText || !descNum || !screenHit || !screen || !btnPrev) return;
    ticketTitle.textContent = c.title;
    const rowEls = ticketRows.children;
    for (let r = 0; r < 3; r++) {
      if (rowEls[r]) rowEls[r].textContent = c.rows[r] || '';
    }
    descKey.textContent = c.key;
    descText.textContent = c.text;
    descNum.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(CASES.length).padStart(2, '0');
    screenHit.setAttribute('aria-label', c.slices && c.slices.length ? (c.hitLabel || '查看完整作品集') : 'Next case');
    const isHolo = c.kind === 'holo';
    document.body.classList.toggle('is-holo', isHolo);
    screen.classList.toggle('holo-active', isHolo);
    btnPrev.classList.toggle('dim', i === 0);
  }

  fillCase(0);

  function pose(m: 'hero' | 'case'): Pose {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const mob = W <= 820;

    if (!mob) {
      const cover = Math.max(W / 1440, H / 810);
      const u = Math.min(W / 1440, H / 900);
      if (m === 'hero') {
        return { s: cover, x: (W - 1440 * cover) / 2, y: 0, mob: false };
      }
      const top = 66 * u;
      const fit = (H - top - 28 * u) / (762 - 79);
      let s: number;
      let y: number;
      if (fit >= cover) {
        s = cover;
        y = Math.min(0, Math.max(H - 810 * s, top - 79 * s));
      } else {
        s = fit;
        y = top - 79 * fit;
      }
      return { s, x: (W - 1440 * s) / 2, y, mob: false };
    }

    // Mobile / tablet <= 820px
    if (m === 'hero') {
      const s = Math.min(W / 650, (0.62 * H) / 810);
      const x = W / 2 - 805 * s;
      const y = H - 790 * s;
      return { s, x, y, mob: true };
    }

    const navH = 0.022 * H + 42 + 22;
    const th = ticket ? ticket.offsetHeight || 160 : 160;
    const dh = desc ? desc.offsetHeight || 70 : 70;
    const uiBottom = 62 + th + 18 + Math.max(60, dh) + 14;
    const s = Math.min((W - 28) / 905, Math.max(0.2, (H - navH - uiBottom) / (762 - 95)));
    const x = W / 2 - 720 * s;
    const y = H - navH - 762 * s;
    return { s, x, y, mob: true };
  }

  function fitHero(p: Pose) {
    if (!wm || !badge) return;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const vl = Math.max(0, -p.x / p.s);
    const vr = Math.min(1440, (W - p.x) / p.s);
    const pad = 18 / p.s;

    wm.style.left = (vl + 0.6 * pad) + 'px';
    wm.style.width = (vr - vl - 1.2 * pad) + 'px';

    badge.style.left = Math.min(986, vr - pad - 417) + 'px';
    const vb = Math.min(810, (H - p.y) / p.s);
    badge.style.top = Math.min(-165, vb - 56 / p.s - 935) + 'px';
  }

  function place(m: 'hero' | 'case') {
    if (!frame || !stage || !mBadgeWrap || !ticket) return;
    const p = pose(m);
    frame.style.transform = `translate(${p.x}px, ${p.y}px) scale(${p.s})`;
    frame.classList.toggle('m-case', m === 'case');
    stage.classList.toggle('m-case', m === 'case');
    frame.classList.toggle('d-fade', !p.mob);
    frame.classList.toggle('m-fade', p.mob);

    if (!p.mob && m === 'hero') {
      fitHero(p);
    }
    if (p.mob) {
      const rootStyle = document.documentElement.style;
      const mbw = mBadgeWrap.offsetWidth || (window.innerWidth * 0.27);
      rootStyle.setProperty('--mbs', String(mbw / 582));
      rootStyle.setProperty('--th', (ticket.offsetHeight || 160) + 'px');
    }
  }

  place('hero');

  window.addEventListener('resize', () => {
    frame.classList.remove('glide');
    place(mode);
    if (badgeZoomOpen) {
      cancelAnims(badgeZoomStage);
      badgeZoomStage.style.transform = `scale(${getBadgeZoomScale()})`;
    }
  });

  function startSway() {
    stopSway();
    if (RM || mode !== 'hero' || !badge) return;
    swayAnims = [badge, mBadge].map(el =>
      el.animate(
        [{ transform: 'rotate(-1.1deg)' }, { transform: 'rotate(1.1deg)' }],
        { duration: 3200, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' }
      )
    );
  }

  function stopSway() {
    swayAnims.forEach(a => a.cancel());
    swayAnims = [];
  }

  function swingBadge() {
    if (RM || mode !== 'hero' || draggingBadge || !badge) return;
    badge.animate(
      [
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(-6deg)' },
        { transform: 'rotate(4deg)' },
        { transform: 'rotate(-2deg)' },
        { transform: 'rotate(0deg)' }
      ],
      { duration: 1400, easing: 'ease-out', composite: 'add' }
    );
  }

  badgeHit.addEventListener('pointerenter', swingBadge);

  let dragStartX = 0;
  let dragStartY = 0;
  let dragFrameScale = 1;
  let dragDist = 0;

  function finishBadgeDrag(shouldOpen: boolean, pointerId?: number) {
    if (!draggingBadge || !badge || !badgeHit) return;
    draggingBadge = false;
    badgeHit.style.cursor = '';
    document.body.style.userSelect = '';
    try {
      if (pointerId != null && badgeHit.hasPointerCapture(pointerId)) {
        badgeHit.releasePointerCapture(pointerId);
      }
    } catch {
      // ignore
    }

    const pulledTransform = badge.style.transform || 'none';
    if (shouldOpen) {
      openBadgeZoom('qr');
    }

    badge.style.transform = '';
    if (!RM && pulledTransform !== 'none') {
      const snapBack = badge.animate(
        [{ transform: pulledTransform }, { transform: 'none' }],
        {
          duration: shouldOpen ? 320 : 380,
          easing: shouldOpen ? EASE : 'cubic-bezier(.22, 1.4, .36, 1)'
        }
      );
      snapBack.finished.then(() => {
        if (!shouldOpen && mode === 'hero' && !busy && !badgeZoomOpen) startSway();
      }).catch(() => {});
    } else if (!shouldOpen && mode === 'hero' && !busy && !badgeZoomOpen) {
      startSway();
    }
  }

  badgeHit.addEventListener('pointerdown', e => {
    if (busy || mode !== 'hero' || badgeZoomOpen || e.button > 0) return;
    e.preventDefault();
    draggingBadge = true;
    dragDist = 0;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragFrameScale = pose('hero').s || 1;
    stopSway();
    cancelAnims(badge);
    badgeHit.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
    try {
      badgeHit.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  });

  badgeHit.addEventListener('pointermove', e => {
    if (!draggingBadge) return;
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    dragDist = Math.hypot(dx, dy);
    const pullX = Math.max(-85, Math.min(85, (dx / dragFrameScale) * 0.55));
    const pullY = Math.max(-36, Math.min(115, (dy / dragFrameScale) * 0.65));
    const rot = Math.max(-14, Math.min(14, -pullX * 0.14));
    const pullScale = 1 + Math.min(0.08, dragDist / 900);
    badge.style.transform = `translate(${pullX}px, ${pullY}px) rotate(${rot}deg) scale(${pullScale})`;
    if (dragDist >= 82) {
      finishBadgeDrag(true, e.pointerId);
    }
  });

  badgeHit.addEventListener('pointerup', e => {
    if (!draggingBadge) return;
    finishBadgeDrag(dragDist >= 24, e.pointerId);
  });

  badgeHit.addEventListener('pointercancel', e => {
    if (!draggingBadge) return;
    finishBadgeDrag(false, e.pointerId);
  });

  // Entrance (runs once)
  function enter() {
    if (document.documentElement.dataset.in || !wm || !mWm || !badge || !hint) return;
    document.documentElement.dataset.in = '1';

    requestAnimationFrame(() => {
      place(mode);
      if (RM) {
        document.querySelectorAll('.pre').forEach(el => el.classList.remove('pre'));
        return;
      }

      tags.forEach((tag, i) => {
        tag.animate(
          [
            { opacity: 0, transform: 'translateY(-40px) rotate(-4deg)' },
            { opacity: 1, transform: 'none' }
          ],
          { duration: 700, delay: 120 + i * 80, easing: 'cubic-bezier(.3,1.5,.5,1)', fill: 'both' }
        );
        tag.classList.remove('pre');
      });

      [wm, mWm].forEach(el => {
        el.animate(
          [
            { opacity: 0, transform: 'translateY(60px)', clipPath: 'inset(100% 0 0 0)' },
            { opacity: 1, transform: 'none', clipPath: 'inset(0)' }
          ],
          { duration: 1100, delay: 260, easing: EASE, fill: 'both' }
        );
        el.classList.remove('pre');
      });

      const badgeDrop = badge.animate(
        [
          { offset: 0, opacity: 0, transform: 'translateY(-120%) rotate(8deg)' },
          { offset: 0.6, opacity: 1, transform: 'translateY(0) rotate(-3deg)' },
          { offset: 0.8, opacity: 1, transform: 'translateY(0) rotate(1.6deg)' },
          { offset: 1, opacity: 1, transform: 'none' }
        ],
        { duration: 1500, delay: 700, easing: EASE, fill: 'both' }
      );
      badge.classList.remove('pre');

      mBadge.animate(
        [
          { offset: 0, opacity: 0, transform: 'translateY(-120%) rotate(8deg)' },
          { offset: 0.6, opacity: 1, transform: 'translateY(0) rotate(-3deg)' },
          { offset: 0.8, opacity: 1, transform: 'translateY(0) rotate(1.6deg)' },
          { offset: 1, opacity: 1, transform: 'none' }
        ],
        { duration: 1500, delay: 700, easing: EASE, fill: 'both' }
      );
      mBadge.classList.remove('pre');

      badgeDrop.finished.then(() => {
        if (mode === 'hero' && !busy) {
          startSway();
        }
      }).catch(() => {});

      hint.animate(
        [{ opacity: 0 }, { opacity: 0.85 }],
        { duration: 600, delay: 1800, easing: EASE, fill: 'both' }
      );
      hint.classList.remove('pre');
    });
  }

  const plateReady = plate.complete
    ? Promise.resolve()
    : new Promise<void>(res => {
        plate.addEventListener('load', () => res(), { once: true });
        plate.addEventListener('error', () => res(), { once: true });
      });

  Promise.race([
    Promise.all([document.fonts.ready, plateReady]),
    sleep(2500)
  ]).then(enter);

  setTimeout(enter, 4000);

  function heroOut() {
    if (!wm || !mWm || !badge) return;
    stopSway();
    const opts: KeyframeAnimationOptions = { duration: dur(380), easing: 'cubic-bezier(.5,0,.75,0)', fill: 'forwards' };

    [wm, mWm].forEach(el => {
      cancelAnims(el);
      el.animate(
        [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-40px)' }],
        opts
      );
    });

    [badge, mBadge].forEach(el => {
      cancelAnims(el);
      el.animate(
        [
          { opacity: 1, transform: 'none' },
          { opacity: 0, transform: 'translateY(-110%) rotate(-6deg)' }
        ],
        opts
      );
    });
  }

  function caseIn(i: number, first: boolean) {
    if (!ticket || !descKey || !descText || !descNum) return;
    fillCase(i);
    if (window.innerWidth <= 820) {
      document.documentElement.style.setProperty('--th', (ticket.offsetHeight || 160) + 'px');
    }

    cancelAnims(ticket);
    ticket.animate(
      [
        { offset: 0, opacity: 0, transform: 'translateY(-60px) rotate(-6deg)' },
        { offset: 0.7, opacity: 1, transform: 'translateY(6px) rotate(1.2deg)' },
        { offset: 1, opacity: 1, transform: 'none' }
      ],
      {
        duration: dur(800),
        delay: dur(first ? 150 : 0),
        easing: EASE,
        fill: 'both'
      }
    );

    const kids = [descKey, descText, descNum];
    const baseDelay = first ? 250 : 80;
    kids.forEach((el, k) => {
      cancelAnims(el);
      el.animate(
        [
          { opacity: 0, transform: 'translateY(14px)' },
          { opacity: 1, transform: 'none' }
        ],
        {
          duration: dur(600),
          delay: dur(baseDelay + k * 70),
          easing: EASE,
          fill: 'both'
        }
      );
    });
  }

  function caseOut() {
    if (!ticket || !descKey || !descText || !descNum) return;
    cancelAnims(ticket);
    ticket.animate(
      [
        { opacity: 1, transform: 'none' },
        { opacity: 0, transform: 'translateY(-40px) rotate(4deg)' }
      ],
      { duration: dur(380), easing: 'cubic-bezier(.5,0,.75,0)', fill: 'forwards' }
    );

    [descKey, descText, descNum].forEach((el, k) => {
      cancelAnims(el);
      el.animate(
        [
          { opacity: 1, transform: 'none' },
          { opacity: 0, transform: 'translateY(-10px)' }
        ],
        {
          duration: dur(300),
          delay: dur(k * 40),
          easing: 'cubic-bezier(.5,0,.75,0)',
          fill: 'forwards'
        }
      );
    });
  }

  function playOnly(n: number) {
    vids.forEach((v, k) => {
      if (!isVid(v)) return;
      if (k === n) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }

  function arriveCase(targetIdx = 0) {
    if (!plate || !cut || !screen || !flash || !frame) return;
    mode = 'case';
    idx = targetIdx;
    document.body.classList.add('is-case');
    plate.style.visibility = 'hidden';
    cancelAnims(cut);
    cut.style.opacity = '0';

    cancelAnims(screen);
    screen.style.opacity = '1';

    cancelAnims(flash);
    flash.animate(
      [{ opacity: 0 }, { opacity: 0.55 }, { opacity: 0 }],
      { duration: dur(600), easing: 'ease-out', fill: 'forwards' }
    );

    vids.forEach((v, k) => {
      cancelAnims(v);
      v.style.transform = 'none';
      v.style.opacity = k === targetIdx ? '1' : '0';
    });

    const targetEl = vids[targetIdx];
    if (isVid(targetEl)) {
      targetEl.animate(
        [
          { opacity: 0, transform: 'scale(1.06)' },
          { opacity: 1, transform: 'scale(1)' }
        ],
        { duration: dur(700), easing: EASE, fill: 'both' }
      );
    }

    playOnly(targetIdx);
    caseIn(targetIdx, true);
    window.dispatchEvent(new CustomEvent('holo-case-active', { detail: CASES[targetIdx]?.kind === 'holo' }));

    const nxt = (targetIdx + 1) % CASES.length;
    const nxtEl = vids[nxt];
    if (isVid(nxtEl)) {
      nxtEl.preload = 'auto';
      nxtEl.load();
    }

    setTimeout(() => {
      busy = false;
      document.body.classList.remove('busy');
      frame.classList.remove('glide');
    }, dur(700));
  }

  async function toCase(targetIdx = 0) {
    if (busy || mode === 'case' || !caseplate || !transVid || !plate || !cut || !frame) return;
    busy = true;
    document.body.classList.add('busy');

    fillCase(targetIdx);
    heroOut();
    await sleep(dur(330));

    if (RM || !transReady) {
      place('case');
      cancelAnims(caseplate);
      caseplate.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: dur(500), easing: EASE, fill: 'forwards' }
      );
      await sleep(dur(500));
      arriveCase(targetIdx);
      return;
    }

    transVid.currentTime = 0;
    transVid.style.opacity = '1';

    await new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())));
    plate.style.visibility = 'hidden';

    cancelAnims(cut);
    cut.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 260, easing: 'ease-out', fill: 'forwards' }
    );

    document.documentElement.style.setProperty('--glide', '1.6s');
    frame.classList.add('glide');
    place('case');

    transVid.playbackRate = 1.8;
    try {
      await transVid.play();
    } catch {
      // ignore
    }

    await new Promise<void>(resolve => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        resolve();
      };
      const safety = setTimeout(finish, 3200);

      function tick() {
        if (done || !transVid) return;
        const d = transVid.duration || 5.04;
        const p = transVid.currentTime / d;
        transVid.playbackRate = Math.max(1.2, 1.8 + 2.4 * Math.sin(Math.PI * Math.min(p * 1.08, 1)));
        if (transVid.ended || p >= 0.995) {
          clearTimeout(safety);
          finish();
          return;
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });

    transVid.pause();
    cancelAnims(caseplate);
    caseplate.style.opacity = '1';
    transVid.style.opacity = '0';

    arriveCase(targetIdx);
  }

  async function swapTo(n: number) {
    if (busy || mode !== 'case' || n === idx || !flash) return;
    busy = true;
    document.body.classList.add('busy');

    const old = idx;
    idx = n;

    caseOut();
    const oldEl = vids[old];
    if (oldEl) {
      cancelAnims(oldEl);
      if (isVid(oldEl)) {
        oldEl.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: dur(350), easing: 'ease-out', fill: 'forwards' }
        );
      } else {
        oldEl.style.opacity = '0';
      }
    }

    await sleep(dur(380));

    if (isVid(oldEl)) oldEl.pause();

    cancelAnims(flash);
    flash.animate(
      [{ opacity: 0 }, { opacity: 0.35 }, { opacity: 0 }],
      { duration: dur(420), easing: 'ease-out', fill: 'forwards' }
    );

    const newEl = vids[n];
    if (newEl) {
      cancelAnims(newEl);
      if (isVid(newEl)) {
        newEl.animate(
          [
            { opacity: 0, transform: 'scale(1.04)' },
            { opacity: 1, transform: 'scale(1)' }
          ],
          { duration: dur(500), easing: EASE, fill: 'both' }
        );
      } else {
        newEl.style.transform = 'none';
        newEl.style.opacity = '1';
      }
    }

    playOnly(n);
    caseIn(n, false);
    window.dispatchEvent(new CustomEvent('holo-case-active', { detail: CASES[n]?.kind === 'holo' }));

    const nxt = (n + 1) % CASES.length;
    const nxtEl = vids[nxt];
    if (isVid(nxtEl)) {
      nxtEl.preload = 'auto';
      nxtEl.load();
    }

    setTimeout(() => {
      busy = false;
      document.body.classList.remove('busy');
    }, dur(520));
  }

  async function toHero() {
    if (busy || mode === 'hero' || !screen || !frame || !plate || !cut || !caseplate || !wm || !mWm || !badge) return;
    busy = true;
    document.body.classList.add('busy');

    caseOut();
    vids.forEach(v => {
      if (isVid(v)) v.pause();
    });
    cancelAnims(screen);
    screen.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: dur(300), easing: 'ease-out', fill: 'forwards' }
    );

    mode = 'hero';
    document.body.classList.remove('is-case');
    document.body.classList.remove('is-holo');
    screen.classList.remove('holo-active');
    window.dispatchEvent(new CustomEvent('holo-case-active', { detail: false }));
    document.documentElement.style.setProperty('--glide', RM ? '0s' : '.9s');
    if (!RM) frame.classList.add('glide');
    place('hero');

    plate.style.visibility = 'visible';
    cancelAnims(cut);
    cut.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: dur(700), delay: dur(150), easing: EASE, fill: 'both' }
    );

    cancelAnims(caseplate);
    caseplate.animate(
      [
        { opacity: 1, filter: 'blur(0px)' },
        { opacity: 0, filter: 'blur(12px)' }
      ],
      { duration: dur(800), easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' }
    );

    cancelAnims(plate);
    plate.animate(
      [
        { transform: 'scale(1.12)', filter: 'blur(8px)' },
        { transform: 'scale(1)', filter: 'blur(0px)' }
      ],
      { duration: dur(900), easing: EASE, fill: 'both' }
    );

    await sleep(dur(250));

    [wm, mWm].forEach(el => {
      cancelAnims(el);
      el.animate(
        [
          { opacity: 0, transform: 'translateY(40px)' },
          { opacity: 1, transform: 'none' }
        ],
        { duration: dur(700), easing: EASE, fill: 'both' }
      );
    });

    const badgeReturn = badge.animate(
      [
        { offset: 0, opacity: 0, transform: 'translateY(-110%) rotate(6deg)' },
        { offset: 0.7, opacity: 1, transform: 'translateY(0) rotate(-2deg)' },
        { offset: 1, opacity: 1, transform: 'none' }
      ],
      { duration: dur(1100), easing: EASE, fill: 'both' }
    );

    mBadge.animate(
      [
        { offset: 0, opacity: 0, transform: 'translateY(-110%) rotate(6deg)' },
        { offset: 0.7, opacity: 1, transform: 'translateY(0) rotate(-2deg)' },
        { offset: 1, opacity: 1, transform: 'none' }
      ],
      { duration: dur(1100), easing: EASE, fill: 'both' }
    );

    badgeReturn.finished.then(() => {
      if (mode === 'hero' && !busy) {
        startSway();
      }
    }).catch(() => {});

    setTimeout(() => {
      vids.forEach(v => {
        cancelAnims(v);
        v.style.opacity = '0';
      });
      frame.classList.remove('glide');
      busy = false;
      document.body.classList.remove('busy');
    }, dur(1000));
  }

  function nextCase() {
    if (busy) return;
    if (mode === 'hero') {
      void toCase();
    } else {
      void swapTo((idx + 1) % CASES.length);
    }
  }

  function prevCase() {
    if (busy || mode !== 'case') return;
    if (idx === 0) {
      void toHero();
    } else {
      void swapTo(idx - 1);
    }
  }

  // Nav & button clicks
  tags[0].addEventListener('click', () => {
    if (busy) return;
    if (viewerOpen) closeCaseViewer();
    if (mode === 'case') {
      void toHero();
    } else {
      toggleBadgeZoom('card');
    }
  });

  badgeZoom.addEventListener('click', e => {
    if (e.target === badgeZoom) closeBadgeZoom();
  });
  badgeZoomClose.addEventListener('click', closeBadgeZoom);

  ([
    [tags[1], 0],
    [tags[2], 1],
    [tags[3], 2]
  ] as [HTMLButtonElement, number][]).forEach(([btn, targetIdx]) => {
    btn.addEventListener('click', () => {
      if (busy) return;
      if (viewerOpen) closeCaseViewer();
      if (badgeZoomOpen) closeBadgeZoom();
      if (mode === 'hero') {
        void toCase(targetIdx);
      } else if (idx !== targetIdx) {
        void swapTo(targetIdx);
      }
    });
  });

  btnLogo.addEventListener('click', () => {
    if (busy) return;
    if (viewerOpen) closeCaseViewer();
    if (badgeZoomOpen) closeBadgeZoom();
    if (mode === 'case') void toHero();
  });

  screenHit.addEventListener('click', () => {
    if (busy || mode !== 'case') return;
    const c = CASES[idx];
    if (c && c.slices && c.slices.length) {
      openCaseViewer(idx);
    } else {
      nextCase();
    }
  });
  caseViewerClose.addEventListener('click', closeCaseViewer);
  btnPrev.addEventListener('click', prevCase);
  btnNext.addEventListener('click', nextCase);

  // Wheel
  window.addEventListener('wheel', e => {
    if (viewerOpen) return;
    e.preventDefault();
    if (badgeZoomOpen) {
      if (Math.abs(e.deltaY) >= 18) closeBadgeZoom();
      return;
    }
    if (Math.abs(e.deltaY) < 18) return;
    const now = performance.now();
    if (now < wheelLockUntil) return;
    wheelLockUntil = now + 900;
    if (e.deltaY > 0) {
      nextCase();
    } else {
      prevCase();
    }
  }, { passive: false });

  // Touch
  let tx = 0;
  let ty = 0;
  window.addEventListener('touchstart', e => {
    if (viewerOpen || badgeZoomOpen || draggingBadge) return;
    if (!e.touches.length) return;
    tx = e.touches[0].clientX;
    ty = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (viewerOpen || badgeZoomOpen || draggingBadge) return;
    e.preventDefault();
  }, { passive: false });

  window.addEventListener('touchend', e => {
    if (viewerOpen || badgeZoomOpen || draggingBadge) return;
    if (!e.changedTouches.length) return;
    const dx = e.changedTouches[0].clientX - tx;
    const dy = e.changedTouches[0].clientY - ty;

    if (mode === 'hero') {
      if (dy <= -40) void toCase();
      return;
    }

    if (Math.abs(dy) >= Math.abs(dx)) {
      if (dy <= -40) nextCase();
      else if (dy >= 40) prevCase();
    } else {
      if (dx <= -40) nextCase();
      else if (dx >= 40) prevCase();
    }
  }, { passive: true });

  // Keyboard
  window.addEventListener('keydown', e => {
    if (viewerOpen) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeCaseViewer();
      }
      return;
    }
    if (badgeZoomOpen) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeBadgeZoom();
      }
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      nextCase();
    } else if (e.key === 'ArrowRight') {
      if (mode === 'case') {
        e.preventDefault();
        nextCase();
      }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
      if (mode === 'case') {
        e.preventDefault();
        prevCase();
      }
    }
  });
}
