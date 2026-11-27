import React, { useRef, useState } from 'react';
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

interface ServiceItem {
  number: string;
  titleTop: string;
  titleBottom: string;
  description: string;
  capabilities: string[];
  bgColor: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    titleTop: 'STUDIO',
    titleBottom: 'CURATION',
    description:
      'We engineer and curate architectural objects that bring quiet precision to modern living.',
    capabilities: ['Acoustic hardware', 'Architectural lighting', 'Machined objects'],
    bgColor: '#eadfca',
  },
  {
    number: '02',
    titleTop: 'COMMERCIAL',
    titleBottom: 'OUTFITTING',
    description:
      'We equip executive studios, private lounges, and architectural workspaces across the GCC.',
    capabilities: ['Space curation', 'Volume sourcing', 'On-site installation'],
    bgColor: '#dbe4e9',
  },
  {
    number: '03',
    titleTop: 'BESPOKE',
    titleBottom: 'EDITIONS',
    description:
      'We craft custom anodized finishes and tailored commissions built for lasting recognition.',
    capabilities: ['Cobalt anodizing', 'Laser engraving', 'Corporate gifting'],
    bgColor: '#d9ded1',
  },
  {
    number: '04',
    titleTop: 'CONCIERGE',
    titleBottom: '& DELIVERY',
    description:
      'We handle insured white-glove delivery and dedicated long-term care for every studio order.',
    capabilities: ['GCC express freight', '5-year warranty', 'Direct specialist care'],
    bgColor: '#e4d8d2',
  },
];

interface StackedServiceCardProps {
  service: ServiceItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const StackedServiceCard: React.FC<StackedServiceCardProps> = ({
  service,
  index,
  total,
  progress,
}) => {
  const maxStep = total - 1;

  // Compute relative position d = index - (progress * 3)
  // d === 0 -> active centered card (flat, full scale, opacity 1)
  // d === 1 -> upcoming card peeking from below (+70vh, tilted +8deg, scale 0.96)
  // d === -1 -> exiting card rising upward (-78vh, tilted -6deg, shrunk 8% -> 0.92, faded out)
  const y = useTransform(progress, (p) => {
    const d = index - p * maxStep;
    if (d >= 0) {
      if (d <= 1) {
        return `${d * 76}vh`;
      }
      return `${76 + (d - 1) * 52}vh`;
    }
    return `${d * 78}vh`;
  });

  const rotate = useTransform(progress, (p) => {
    const d = index - p * maxStep;
    if (d >= 0) {
      return Math.min(12, d * 8);
    }
    return Math.max(-8, d * 6);
  });

  const scale = useTransform(progress, (p) => {
    const d = index - p * maxStep;
    if (d >= 0) {
      return Math.max(0.92, 1 - d * 0.04);
    }
    return Math.max(0.9, 1 + d * 0.08);
  });

  const opacity = useTransform(progress, (p) => {
    const d = index - p * maxStep;
    if (d > 1.35) return 0;
    if (d > 1.05) return Math.max(0, 1 - (d - 1.05) / 0.3);
    if (d >= -0.35) return 1;
    if (d <= -0.92) return 0;
    return Math.max(0, 1 - (-d - 0.35) / 0.57);
  });

  const translateZ = useTransform(progress, (p) => {
    const d = index - p * maxStep;
    return d < 0 ? d * 60 : -d * 25;
  });

  return (
    <motion.article
      style={{
        y,
        z: translateZ,
        rotate,
        scale,
        opacity,
        backgroundColor: service.bgColor,
        boxShadow: '0 10px 28px rgba(25, 30, 33, 0.09)',
        zIndex: 10 + index,
      }}
      className="absolute w-[70vw] h-[min(70vw,44vh)] sm:w-[min(46vw,380px)] sm:h-[min(45vw,370px)] lg:w-[min(30vw,430px)] lg:h-[min(29vw,410px)] rounded-none border-0 p-5 sm:p-7 lg:p-9 flex flex-col justify-between will-change-transform select-none"
    >
      {/* Top Editorial Block: Two-Line Heading + Short Description */}
      <div>
        <h3 className="text-[22px] sm:text-[30px] lg:text-[38px] font-black uppercase leading-[0.92] tracking-[-0.045em] text-[#14171a]">
          <span className="block">{service.titleTop}</span>
          <span className="block">{service.titleBottom}</span>
        </h3>
        <p className="mt-2.5 sm:mt-3.5 text-[11.5px] sm:text-[13px] lg:text-[14px] leading-[1.45] font-medium text-[#1e2328]/80 max-w-[32ch]">
          {service.description}
        </p>
      </div>

      {/* Bottom Row: Service List (Left) + Oversized Two-Digit Number (Right) */}
      <div className="flex items-end justify-between gap-4 pt-3">
        <ul className="space-y-0.5 sm:space-y-1 text-[11px] sm:text-[12px] lg:text-[13px] font-semibold tracking-[-0.01em] text-[#14171a]/85">
          {service.capabilities.map((cap) => (
            <li key={cap}>{cap}</li>
          ))}
        </ul>

        <span
          aria-hidden="true"
          className="text-[44px] sm:text-[58px] lg:text-[76px] font-black leading-[0.76] tracking-[-0.06em] text-[#14171a] tabular-nums"
        >
          {service.number}
        </span>
      </div>
    </motion.article>
  );
};

export const ServicesScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Gentle fluid interpolation without bounce or snap
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.45,
    restDelta: 0.0005,
  });

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const idx = Math.min(SERVICES.length - 1, Math.max(0, Math.round(latest * (SERVICES.length - 1))));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  // Subtle upward drift + opposing horizontal parallax on the 3 huge blurred background lines
  const bgY = useTransform(smoothProgress, [0, 1], ['6vh', '-10vh']);
  const line1X = useTransform(smoothProgress, [0, 1], ['-5vw', '3vw']);
  const line2X = useTransform(smoothProgress, [0, 1], ['5vw', '-4vw']);
  const line3X = useTransform(smoothProgress, [0, 1], ['-3vw', '5vw']);

  // Reduced-Motion Accessible Fallback
  if (prefersReduced) {
    return (
      <section
        id="services"
        aria-label="What We Do"
        className="w-full bg-[#f8f8f7] py-16 px-4 sm:px-8"
      >
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-[40px] sm:text-[56px] font-black uppercase tracking-[-0.05em] text-[#14171a] mb-10">
            WHAT WE DO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <article
                key={service.number}
                style={{
                  backgroundColor: service.bgColor,
                  boxShadow: '0 10px 28px rgba(25, 30, 33, 0.09)',
                }}
                className="p-8 sm:p-10 rounded-none border-0 flex flex-col justify-between min-h-[320px]"
              >
                <div>
                  <h3 className="text-[32px] font-black uppercase leading-[0.94] tracking-[-0.045em] text-[#14171a]">
                    <span className="block">{service.titleTop}</span>
                    <span className="block">{service.titleBottom}</span>
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed font-medium text-[#1e2328]/80 max-w-[34ch]">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-end justify-between pt-8">
                  <ul className="space-y-1 text-sm font-semibold text-[#14171a]/85">
                    {service.capabilities.map((cap) => (
                      <li key={cap}>{cap}</li>
                    ))}
                  </ul>
                  <span
                    aria-hidden="true"
                    className="text-[64px] font-black leading-[0.78] tracking-[-0.06em] text-[#14171a]"
                  >
                    {service.number}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="What We Do — Sjdurallc Studio Services"
      className="relative w-full h-[430vh] bg-[#f8f8f7] overflow-x-clip m-0 p-0 border-0"
    >
      {/* Full-Screen 100vh Edge-to-Edge Sticky Stage */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#f8f8f7] flex items-center justify-center">
        {/* Huge Staggered Blurred Background Typography */}
        <motion.div
          aria-hidden="true"
          style={{ y: bgY }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center select-none z-0 overflow-hidden"
        >
          <motion.span
            style={{
              x: line1X,
              filter: 'blur(clamp(5px, 0.65vw, 10px))',
            }}
            className="block whitespace-nowrap text-[clamp(88px,19vw,260px)] font-black uppercase leading-[0.84] tracking-[-0.065em] text-[#0c0e10]/[0.58] will-change-transform"
          >
            WHAT
          </motion.span>
          <motion.span
            style={{
              x: line2X,
              filter: 'blur(clamp(6px, 0.75vw, 11px))',
            }}
            className="block whitespace-nowrap text-[clamp(88px,19vw,260px)] font-black uppercase leading-[0.84] tracking-[-0.065em] text-[#0c0e10]/[0.58] will-change-transform"
          >
            WE
          </motion.span>
          <motion.span
            style={{
              x: line3X,
              filter: 'blur(clamp(5px, 0.65vw, 10px))',
            }}
            className="block whitespace-nowrap text-[clamp(88px,19vw,260px)] font-black uppercase leading-[0.84] tracking-[-0.065em] text-[#0c0e10]/[0.58] will-change-transform"
          >
            DO
          </motion.span>
        </motion.div>

        {/* 3D Perspective Card Stack Stage */}
        <div
          style={{ perspective: '1100px' }}
          className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none"
        >
          {SERVICES.map((service, index) => (
            <StackedServiceCard
              key={service.number}
              service={service}
              index={index}
              total={SERVICES.length}
              progress={smoothProgress}
            />
          ))}
        </div>

        {/* Right-Edge Flush Vertical Red Label (Above background text, separate from cards) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-[#d92626] text-white px-2 py-3.5 sm:px-2.5 sm:py-4 flex flex-col items-center gap-2.5 shadow-sm"
        >
          <span className="w-1.5 h-1.5 bg-white rotate-45 block" />
          <span
            style={{ writingMode: 'vertical-rl' }}
            className="rotate-180 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] leading-none"
          >
            SJDURALLC · STUDIO
          </span>
        </div>

        {/* Bottom-Right Compact Scroll Progress Indicator (01 — 04) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 right-5 sm:bottom-8 sm:right-10 z-30 flex items-center gap-3 font-mono text-[11px] sm:text-[12px] font-bold tracking-[0.08em] text-[#14171a] tabular-nums"
        >
          <span>{SERVICES[activeIndex]?.number ?? '01'}</span>
          <span className="relative block w-16 sm:w-24 h-[1.5px] bg-[#14171a]/20 overflow-hidden">
            <motion.span
              style={{ scaleX: smoothProgress, transformOrigin: '0% 50%' }}
              className="absolute inset-0 bg-[#14171a] will-change-transform"
            />
          </span>
          <span className="text-[#14171a]/55">0{SERVICES.length}</span>
        </div>
      </div>
    </section>
  );
};
