import { useEffect, useRef, useState } from 'react';
import HoloCard from './HoloCard';

interface PhotoItem {
  id: string;
  categoryId: string;
  categoryLabel: string;
  title: string;
  src: string;
  width: number;
  aspectRatio: number;
  zoomScale: number;
  foilColor: string;
}

const PHOTOS: PhotoItem[] = [
  {
    id: 'sunset-palms',
    categoryId: 'scenery',
    categoryLabel: '风景',
    title: '滨海日落',
    src: './images/life/sunset_palms.jpg',
    width: 360,
    aspectRatio: 1284 / 909,
    zoomScale: 1.46,
    foilColor: '#f3d4a6'
  },
  {
    id: 'ocean-waves',
    categoryId: 'scenery',
    categoryLabel: '风景',
    title: '海浪潮汐',
    src: './images/life/ocean_waves.jpg',
    width: 350,
    aspectRatio: 1707 / 1280,
    zoomScale: 1.46,
    foilColor: '#cfe4f2'
  },
  {
    id: 'forest-light',
    categoryId: 'scenery',
    categoryLabel: '风景',
    title: '林影微光',
    src: './images/life/forest_light.jpg',
    width: 276,
    aspectRatio: 1,
    zoomScale: 1.44,
    foilColor: '#d4e8c8'
  },
  {
    id: 'garden-walk',
    categoryId: 'portrait',
    categoryLabel: '人物',
    title: '园中漫步',
    src: './images/life/garden_walk.jpg',
    width: 174,
    aspectRatio: 1279 / 2275,
    zoomScale: 1.42,
    foilColor: '#dce6db'
  },
  {
    id: 'black-cat',
    categoryId: 'pet',
    categoryLabel: '萌宠',
    title: '黑猫日常',
    src: './images/life/black_cat.jpg',
    width: 228,
    aspectRatio: 960 / 1276,
    zoomScale: 1.44,
    foilColor: '#edd7b8'
  }
];

const PRELOAD_SRCS = PHOTOS.map(p => p.src);

export default function LifeSlicesStage() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = (e: Event) => {
      const active = Boolean((e as CustomEvent<boolean>).detail);
      setIsActive(active);
      if (!active) setExpanded(false);
    };
    window.addEventListener('holo-case-active', sync);
    setIsActive(document.body.classList.contains('is-case') && document.body.classList.contains('is-holo'));
    return () => window.removeEventListener('holo-case-active', sync);
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        setExpanded(false);
      }
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [expanded]);

  const activePhoto = PHOTOS[photoIndex] || PHOTOS[0];
  const sameCategoryItems = PHOTOS.filter(item => item.categoryId === activePhoto.categoryId);
  const indexInCategory = Math.max(
    0,
    sameCategoryItems.findIndex(item => item.id === activePhoto.id)
  );

  const nudgeSlide = (dir: number) => {
    const el = slideRef.current;
    if (!el) return;
    el.getAnimations().forEach(a => a.cancel());
    el.animate(
      [
        { opacity: 0.72, transform: `translateX(${dir * 18}px) scale(0.98)` },
        { opacity: 1, transform: 'translateX(0px) scale(1)' }
      ],
      { duration: 190, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
    );
  };

  const stepPhoto = (delta: number) => {
    setPhotoIndex(prev => (prev + delta + PHOTOS.length) % PHOTOS.length);
    nudgeSlide(delta > 0 ? 1 : -1);
  };

  const selectById = (id: string) => {
    const nextIdx = PHOTOS.findIndex(item => item.id === id);
    if (nextIdx !== -1 && nextIdx !== photoIndex) {
      nudgeSlide(nextIdx > photoIndex ? 1 : -1);
      setPhotoIndex(nextIdx);
    }
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none flex flex-col justify-between px-9 py-6 text-white"
      style={{
        background:
          'radial-gradient(circle at 50% 52%, rgba(44, 52, 68, 0.42) 0%, rgba(16, 18, 22, 0.96) 62%, #0b0c0f 100%)'
      }}
    >
      {/* Oversized Display Headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 top-[44px] flex justify-center z-0"
      >
        <div
          className="font-black tracking-[0.04em] leading-none whitespace-nowrap"
          style={{
            fontSize: '124px',
            backgroundImage: 'linear-gradient(180deg, #e5ebf3 0%, #94a3b8 85%, #64748b 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          生活切片
        </div>
      </div>

      {/* Smooth Compositor Scrim for Enlarged Mode */}
      <div
        aria-hidden={!expanded}
        onClick={() => setExpanded(false)}
        className={`absolute inset-0 z-20 bg-black/80 transition-opacity duration-200 ${
          expanded ? 'opacity-100 pointer-events-auto cursor-zoom-out' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Top-left Return Control when Expanded */}
      <div
        className={`absolute left-7 top-5 z-40 flex items-center gap-3 transition-opacity duration-200 ${
          expanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="px-3.5 py-1.5 rounded-lg border border-white/25 bg-white/10 hover:bg-white/20 text-white text-[12px] font-medium tracking-[0.06em] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
        >
          返回
        </button>
        <span className="text-[12px] text-white/70 tracking-[0.06em] whitespace-nowrap tabular-nums">
          {activePhoto.categoryLabel} · {activePhoto.title}
        </span>
      </div>

      {/* Left & Right Screen Edge Navigation Arrows */}
      <button
        type="button"
        onClick={() => stepPhoto(-1)}
        aria-label="上一张照片"
        className="absolute left-5 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full border border-white/20 bg-black/35 hover:bg-white/15 hover:border-white/45 text-white/85 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => stepPhoto(1)}
        aria-label="下一张照片"
        className="absolute right-5 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full border border-white/20 bg-black/35 hover:bg-white/15 hover:border-white/45 text-white/85 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Single Persistent HoloCard Instance (GPU transform zoom + cached texture swap) */}
      <div className="relative z-30 flex-1 flex flex-col items-center justify-center pt-12 pointer-events-none">
        <div
          className="pointer-events-auto will-change-transform"
          style={{
            transform: expanded
              ? `translateY(-18px) scale(${activePhoto.zoomScale})`
              : 'translateY(0px) scale(1)',
            transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div ref={slideRef} className="will-change-transform">
            <HoloCard
              className={expanded ? 'is-zoomed' : ''}
              image={activePhoto.src}
              preloadImages={PRELOAD_SRCS}
              aspectRatio={activePhoto.aspectRatio}
              alt={`生活切片 · ${activePhoto.categoryLabel} · ${activePhoto.title}`}
              preset="glitter"
              intensity={0.12}
              scale={1}
              edgeSparkle={0.9}
              frame={6}
              glare={0.15}
              foilColor={activePhoto.foilColor}
              width={activePhoto.width}
              radius={14}
              tiltMax={expanded ? 10 : 14}
              hoverScale={expanded ? 1.01 : 1.04}
              idle={isActive && !expanded}
              shadow={true}
              onCardClick={() => setExpanded(prev => !prev)}
            />
          </div>
        </div>
      </div>

      {/* Bottom Row: Life Description + Same-Category Thumbnail Strip */}
      <div className="relative z-10 flex items-end justify-between gap-6">
        <div className="max-w-[270px]">
          <p className="m-0 text-[12.5px] leading-[1.6] text-white/85 font-normal">
            工作之余喜欢去旅游看看风景，
            <br />
            大多数照片为随手记录
          </p>
          <div className="mt-1.5 text-[11px] tracking-[0.06em] text-white/50 tabular-nums">
            {activePhoto.categoryLabel} · {activePhoto.title} · {indexInCategory + 1} / {sameCategoryItems.length}
          </div>
        </div>

        {/* Same-category thumbnail strip */}
        <div className="flex items-center gap-2">
          {sameCategoryItems.map(item => {
            const active = item.id === activePhoto.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectById(item.id)}
                aria-label={`查看 ${item.title}`}
                className={`relative w-10 h-10 rounded-md overflow-hidden p-0 border transition-all cursor-pointer shrink-0 ${
                  active
                    ? 'border-white ring-1 ring-white/60 scale-105 opacity-100'
                    : 'border-white/20 opacity-55 hover:opacity-90'
                }`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover block"
                  draggable={false}
                  referrerPolicy="no-referrer"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
