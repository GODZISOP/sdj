import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export const DEFAULT_EDITORIAL_IMAGES: string[] = [
  'https://images.pexels.com/photos/35205573/pexels-photo-35205573.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
  'https://images.pexels.com/photos/30758844/pexels-photo-30758844.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
  'https://images.pexels.com/photos/8973446/pexels-photo-8973446.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
  'https://images.pexels.com/photos/32983812/pexels-photo-32983812.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
  'https://images.pexels.com/photos/31781941/pexels-photo-31781941.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
  'https://images.pexels.com/photos/34099824/pexels-photo-34099824.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
  'https://images.pexels.com/photos/35003442/pexels-photo-35003442.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
  'https://images.pexels.com/photos/29613981/pexels-photo-29613981.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
  'https://images.pexels.com/photos/32940211/pexels-photo-32940211.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop',
];

export interface EditorialWallSectionProps {
  id?: string;
  mode?: 'page' | 'embedded';
  images?: string[];
  brandMark?: string;
  categoryLabel?: string;
  headline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  footerLabel?: string;
  sectionOne?: {
    label: string;
    heading: string;
    description: string;
  };
  sectionTwo?: {
    label: string;
    heading: string;
    buttonLabel: string;
    buttonHref: string;
  };
  showFollowingSections?: boolean;
}

interface ScrubWordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const ScrubHeadlineWord: React.FC<ScrubWordProps> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [26, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block mr-[0.25em] last:mr-0 will-change-transform"
    >
      {word}
    </motion.span>
  );
};

export const EditorialWallSection: React.FC<EditorialWallSectionProps> = ({
  id = 'philosophy',
  mode = 'page',
  images = [],
  brandMark = 'NOIR/24',
  categoryLabel = 'Independent creative archive',
  headline = 'Culture moves fast. We capture the moments worth remembering.',
  ctaLabel = 'Enter the archive',
  ctaHref = '#equipment',
  footerLabel = 'Fashion, sound and youth culture',
  sectionOne = {
    label: 'Selected stories',
    heading: 'The New Energy',
    description:
      'An evolving collection of visual culture, creative people and ideas defining what comes next.',
  },
  sectionTwo = {
    label: 'New collaborations',
    heading: 'Make Something Iconic',
    buttonLabel: 'Start a project',
    buttonHref: '#contact',
  },
  showFollowingSections = true,
}) => {
  const embeddedContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  // Track responsive breakpoints cleanly on resize
  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener('resize', checkViewport, { passive: true });
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Always guarantee exactly 9 images by filling missing positions from defaults
  const resolvedImages = useMemo(() => {
    const merged: string[] = [];
    for (let i = 0; i < 9; i++) {
      merged.push(images[i] || DEFAULT_EDITORIAL_IMAGES[i]);
    }
    return merged;
  }, [images]);

  // Organize 9 images into 3 vertical columns × 3 portrait tiles
  const columns = useMemo(
    () => [
      [resolvedImages[0], resolvedImages[1], resolvedImages[2]],
      [resolvedImages[3], resolvedImages[4], resolvedImages[5]],
      [resolvedImages[6], resolvedImages[7], resolvedImages[8]],
    ],
    [resolvedImages]
  );

  const words = useMemo(() => headline.trim().split(/\s+/), [headline]);

  // Single master scroll progress value (supports both page mode and embedded scroll mode)
  const { scrollYProgress } = useScroll({
    container: mode === 'embedded' ? embeddedContainerRef : undefined,
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Smooth fluid interpolation (Lenis-like inertial scrub without lag or overshoot)
  const progress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 28,
    mass: 0.42,
    restDelta: 0.0005,
  });

  // 1. Massive 3×3 image wall shrinks smoothly from ~3x viewport until full 3x3 grid fits cleanly
  const wallScale = useTransform(progress, [0, 0.62], isMobile ? [1.05, 0.36] : [1.0, 0.355]);
  // 2. Counter-scale inner images so they stay visually composed & stable while outer grid shrinks
  const innerImgScale = useTransform(progress, [0, 0.62], [1.26, 1.0]);

  // 3. Oversized bottom-left brand mark scales down & rises to top-left
  const brandScale = useTransform(progress, [0, 0.56], isMobile ? [1.45, 0.62] : [2.4, 0.58]);
  const brandY = useTransform(progress, [0, 0.56], isMobile ? ['0svh', '-74svh'] : ['0svh', '-78svh']);

  // 4. Bottom editorial footer blurs, shrinks, and fades out early in scroll
  const footerOpacity = useTransform(progress, [0, 0.22], [1, 0]);
  const footerScale = useTransform(progress, [0, 0.22], [1, 0.86]);
  const footerBlur = useTransform(progress, [0, 0.22], ['blur(0px)', 'blur(10px)']);

  // 5. Category label reveals right ahead of headline words
  const categoryOpacity = useTransform(progress, [0.3, 0.42], [0, 1]);
  const categoryY = useTransform(progress, [0.3, 0.42], [18, 0]);

  // 6. Acid-lime CTA pill reveals after most of the headline has appeared
  const ctaOpacity = useTransform(progress, [0.66, 0.8], [0, 1]);
  const ctaY = useTransform(progress, [0.66, 0.8], [22, 0]);
  const ctaScale = useTransform(progress, [0.66, 0.8], [0.94, 1]);
  const ctaPointerEvents = useTransform(progress, (v) => (v > 0.64 ? 'auto' : 'none'));

  // 7 & 8. Near end of scroll: slight upward hero shift + gradual dark scrim overlay
  const heroShiftY = useTransform(progress, [0.82, 1], ['0svh', '-9svh']);
  const darkOverlayOpacity = useTransform(progress, [0.18, 0.58, 1], [0.18, 0.54, 0.84]);

  // Reduced-Motion Accessible Fallback
  if (prefersReduced) {
    const content = (
      <section id={id} aria-label={`${brandMark} editorial showcase`} className="w-full bg-[#0a0b0d] text-white">
        <div className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center">
          {/* Static final 3x3 wall */}
          <div
            aria-hidden="true"
            className="absolute inset-0 grid grid-cols-3 gap-2 sm:gap-3 p-2 sm:p-3 opacity-60"
          >
            {columns.map((col, cIdx) => (
              <div key={cIdx} className="grid grid-rows-3 gap-2 sm:gap-3 h-full">
                {col.map((src, rIdx) => (
                  <div key={rIdx} className="relative w-full h-full overflow-hidden bg-neutral-900">
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover saturate-[1.12] contrast-[1.06]"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-black/55" />

          {/* Top-left settled brand mark */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-10 z-20 font-black uppercase tracking-[-0.04em] text-xl sm:text-2xl text-white">
            {brandMark}
          </div>

          {/* Center headline & acid-lime CTA */}
          <div className="relative z-20 max-w-3xl mx-auto px-6 text-center space-y-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#d9ff43]">
              {categoryLabel}
            </p>
            <h2 className="text-[36px] sm:text-[54px] lg:text-[66px] font-black leading-[0.98] tracking-[-0.04em] text-white">
              {headline}
            </h2>
            <div className="pt-2">
              <a
                href={ctaHref}
                className="inline-flex items-center gap-3 rounded-full bg-[#d9ff43] text-[#0c0e10] pl-6 pr-2 py-2 text-xs sm:text-sm font-extrabold tracking-wide shadow-[0_12px_36px_-8px_rgba(217,255,67,0.5)]"
              >
                <span>{ctaLabel}</span>
                <span className="w-9 h-9 rounded-full bg-[#111315] text-[#d9ff43] flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {showFollowingSections && (
          <>
            <div
              className="min-h-[85svh] w-full flex items-center justify-center px-6 py-24 text-center relative overflow-hidden"
              style={{
                background:
                  'radial-gradient(circle at 50% 45%, rgba(217,255,67,0.14) 0%, rgba(20,25,17,0) 60%), #141911',
              }}
            >
              <div className="max-w-3xl space-y-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#d9ff43]">
                  {sectionOne.label}
                </p>
                <h2 className="text-[42px] sm:text-[64px] lg:text-[82px] font-black leading-[0.94] tracking-[-0.045em] text-white">
                  {sectionOne.heading}
                </h2>
                <p className="text-base sm:text-lg text-white/75 max-w-xl mx-auto leading-relaxed">
                  {sectionOne.description}
                </p>
              </div>
            </div>

            <div
              className="min-h-[80svh] w-full flex items-center justify-center px-6 py-24 text-center relative overflow-hidden"
              style={{
                background:
                  'radial-gradient(ellipse 65% 50% at 50% 100%, rgba(139,92,246,0.28) 0%, rgba(8,8,10,0) 68%), #08080a',
              }}
            >
              <div className="max-w-3xl space-y-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-purple-300">
                  {sectionTwo.label}
                </p>
                <h2 className="text-[42px] sm:text-[64px] lg:text-[80px] font-black leading-[0.95] tracking-[-0.045em] text-white">
                  {sectionTwo.heading}
                </h2>
                <div className="pt-2">
                  <a
                    href={sectionTwo.buttonHref}
                    className="inline-flex items-center gap-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition-colors"
                  >
                    <span>{sectionTwo.buttonLabel}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    );

    return mode === 'embedded' ? (
      <div className="h-[100svh] w-full overflow-y-auto">{content}</div>
    ) : (
      content
    );
  }

  const galleryExperience = (
    <section
      id={id}
      aria-label={`${brandMark} editorial gallery showcase`}
      className="relative w-full bg-[#0a0b0d] text-white overflow-x-clip m-0 p-0 border-0"
    >
      {/* PINNED SCROLL TRACK (380svh for rich scrubbed control) */}
      <div ref={trackRef} className="relative w-full h-[380svh]">
        <motion.div
          style={{ y: heroShiftY }}
          className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#0a0b0d] flex items-center justify-center"
        >
          {/* MASSIVE 3 × 3 EDITORIAL IMAGE WALL */}
          <motion.div
            style={{ scale: wallScale }}
            className={`relative z-0 flex-shrink-0 grid grid-cols-3 ${
              isMobile ? 'w-[310vw] h-[290svh] gap-2.5 p-2.5' : 'w-[285vw] h-[285svh] gap-5 p-5'
            } will-change-transform`}
          >
            {columns.map((col, colIdx) => (
              <div
                key={colIdx}
                className={`grid grid-rows-3 h-full ${isMobile ? 'gap-2.5' : 'gap-5'}`}
              >
                {col.map((src, rowIdx) => {
                  const flatIndex = colIdx * 3 + rowIdx;
                  // Center cross tiles load eagerly since they're visible at start of scroll
                  const isEager = flatIndex === 4 || flatIndex === 1 || flatIndex === 3 || flatIndex === 5;
                  return (
                    <div
                      key={flatIndex}
                      className="editorial-tile-shine relative w-full h-full overflow-hidden rounded-none bg-[#16181d]"
                    >
                      <motion.img
                        src={src}
                        alt=""
                        aria-hidden="true"
                        loading={isEager ? 'eager' : 'lazy'}
                        decoding="async"
                        style={{ scale: innerImgScale }}
                        className="w-full h-full object-cover saturate-[1.14] contrast-[1.06] will-change-transform"
                      />
                      {/* Subtle dark editorial gradient per photo */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/25"
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </motion.div>

          {/* Fine Editorial Film Grain Texture Overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.14] mix-blend-overlay"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            }}
          />

          {/* Progressive Dark Overlay for High Contrast & Transition Out */}
          <motion.div
            aria-hidden="true"
            style={{ opacity: darkOverlayOpacity }}
            className="pointer-events-none absolute inset-0 z-20 bg-[#07080a]"
          />

          {/* OVERSIZED BOTTOM-LEFT BRAND MARK (scales down & rises to top-left on scroll) */}
          <motion.div
            style={{
              scale: brandScale,
              y: brandY,
              transformOrigin: '0% 100%',
            }}
            className="pointer-events-none absolute bottom-14 sm:bottom-8 left-5 sm:left-10 z-30 font-black uppercase tracking-[-0.055em] leading-[0.88] text-[28px] sm:text-[38px] lg:text-[46px] text-white drop-shadow-[0_6px_28px_rgba(0,0,0,0.45)] will-change-transform select-none"
          >
            {brandMark}
          </motion.div>

          {/* BOTTOM-RIGHT EDITORIAL FOOTER LABEL (blurs, shrinks & fades out early) */}
          <motion.p
            style={{
              opacity: footerOpacity,
              scale: footerScale,
              filter: footerBlur,
            }}
            className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:bottom-8 md:right-10 z-30 text-center md:text-right font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/90 whitespace-nowrap drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] will-change-transform select-none"
          >
            {footerLabel}
          </motion.p>

          {/* CENTRAL EDITORIAL CONTENT (Category + Word-by-Word Scrubbed Headline + Acid-Lime Pill CTA) */}
          <div className="absolute inset-0 z-30 flex items-center justify-center px-5 sm:px-8 pointer-events-none">
            <div className="max-w-[820px] w-full text-center flex flex-col items-center">
              <motion.p
                style={{ opacity: categoryOpacity, y: categoryY }}
                className="font-mono text-[10px] sm:text-[12px] uppercase tracking-[0.24em] text-[#d9ff43] font-semibold mb-4 sm:mb-5 will-change-transform"
              >
                {categoryLabel}
              </motion.p>

              <h2 className="text-[32px] sm:text-[52px] lg:text-[68px] font-black leading-[0.98] tracking-[-0.045em] text-white max-w-[16ch] sm:max-w-[18ch] mx-auto drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                {words.map((word, idx) => {
                  const total = Math.max(words.length, 1);
                  const step = 0.34 / total;
                  const start = 0.36 + idx * step;
                  const end = Math.min(start + step * 2.1, 0.76);
                  return (
                    <ScrubHeadlineWord
                      key={`${word}-${idx}`}
                      word={word}
                      progress={progress}
                      range={[start, end]}
                    />
                  );
                })}
              </h2>

              {/* Acid-Lime Pill Call-to-Action Button (#d9ff43) */}
              <motion.div
                style={{
                  opacity: ctaOpacity,
                  y: ctaY,
                  scale: ctaScale,
                  pointerEvents: ctaPointerEvents,
                }}
                className="mt-7 sm:mt-9 will-change-transform"
              >
                <a
                  href={ctaHref}
                  style={{
                    boxShadow:
                      '0 14px 40px -6px rgba(217, 255, 67, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
                  }}
                  className="group inline-flex items-center gap-3.5 rounded-full bg-[#d9ff43] hover:bg-[#e4ff6b] text-[#0b0d0f] pl-6 pr-2 py-2 text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.1em] transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>{ctaLabel}</span>
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#111315] text-[#d9ff43] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FOLLOWING SECTION ONE — Deep Olive + Subtle Acid-Lime Radial Glow */}
      {showFollowingSections && (
        <>
          <div
            className="relative min-h-[82svh] w-full flex items-center justify-center px-5 sm:px-8 py-24 text-center overflow-hidden"
            style={{
              background:
                'radial-gradient(circle at 50% 42%, rgba(217, 255, 67, 0.16) 0%, rgba(20, 26, 17, 0) 58%), #141a11',
            }}
          >
            <div className="relative z-10 max-w-3xl mx-auto space-y-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#d9ff43]">
                {sectionOne.label}
              </p>
              <h2 className="text-[40px] sm:text-[64px] lg:text-[84px] font-black leading-[0.94] tracking-[-0.045em] text-white">
                {sectionOne.heading}
              </h2>
              <p className="text-[15px] sm:text-[18px] text-white/75 max-w-xl mx-auto leading-relaxed">
                {sectionOne.description}
              </p>
            </div>
          </div>

          {/* FOLLOWING SECTION TWO — Near-Black + Subtle Bottom Purple Glow + Glass CTA */}
          <div
            className="relative min-h-[76svh] w-full flex items-center justify-center px-5 sm:px-8 py-24 text-center overflow-hidden border-t border-white/[0.06]"
            style={{
              background:
                'radial-gradient(ellipse 68% 52% at 50% 100%, rgba(147, 51, 234, 0.30) 0%, rgba(8, 8, 10, 0) 68%), #08080a',
            }}
          >
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-purple-300">
                {sectionTwo.label}
              </p>
              <h2 className="text-[40px] sm:text-[64px] lg:text-[82px] font-black leading-[0.94] tracking-[-0.045em] text-white">
                {sectionTwo.heading}
              </h2>
              <div className="pt-3">
                <a
                  href={sectionTwo.buttonHref}
                  className="group inline-flex items-center gap-3 rounded-full bg-white/[0.08] hover:bg-white/[0.16] backdrop-blur-md border border-white/20 px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
                >
                  <span>{sectionTwo.buttonLabel}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );

  if (mode === 'embedded') {
    return (
      <div
        ref={embeddedContainerRef}
        className="relative h-[100svh] w-full overflow-y-auto overflow-x-clip bg-[#0a0b0d]"
      >
        {galleryExperience}
      </div>
    );
  }

  return galleryExperience;
};
