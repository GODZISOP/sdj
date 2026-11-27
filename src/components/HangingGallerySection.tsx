import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  MotionValue,
  PanInfo,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowRight, GripHorizontal, X, ShoppingBag, Eye, RotateCcw } from 'lucide-react';
import { useSite } from '../store/siteStore';
import { Product } from '../types';
import { EASE_EDITORIAL, SPRING_CRISP } from '../lib/motion';
import { ScrollScrubText } from './ScrollScrubText';

// Exact positions along quadratic Bezier wire: P0=(-20,26), P1=(720,152), P2=(1460,26)
// y(t) = 26 + 252 * t * (1 - t)
const SLOT_CONFIG = [
  { t: 0.11, baseRotate: 9, swayClass: 'sway-a', delay: '0s', range: [0.28, 0.44] as [number, number] },
  { t: 0.305, baseRotate: 4.5, swayClass: 'sway-b', delay: '-1.3s', range: [0.41, 0.57] as [number, number] },
  { t: 0.5, baseRotate: 0, swayClass: 'sway-a', delay: '-2.6s', range: [0.54, 0.70] as [number, number] },
  { t: 0.695, baseRotate: -4.5, swayClass: 'sway-b', delay: '-0.8s', range: [0.67, 0.83] as [number, number] },
  { t: 0.89, baseRotate: -9, swayClass: 'sway-a', delay: '-3.1s', range: [0.80, 0.96] as [number, number] },
];

interface HangingCardSlotProps {
  product: Product;
  slot: (typeof SLOT_CONFIG)[number];
  progress: MotionValue<number>;
  prefersReduced: boolean;
  wireSag: number;
  isHovered: boolean;
  isDragging: boolean;
  isPullReady: boolean;
  isDetached: boolean;
  onHoverChange: (id: string | null) => void;
  onDragStart: (id: string) => void;
  onDrag: (product: Product, e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onDragEnd: (product: Product, e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onPullClick: (product: Product) => void;
  onDetailClick: (id: string) => void;
}

const HangingCardSlot: React.FC<HangingCardSlotProps> = ({
  product,
  slot,
  progress,
  prefersReduced,
  wireSag,
  isHovered,
  isDragging,
  isPullReady,
  isDetached,
  onHoverChange,
  onDragStart,
  onDrag,
  onDragEnd,
  onPullClick,
  onDetailClick,
}) => {
  const [start, end] = slot.range;
  const clipStart = Math.max(0.24, start - 0.05);
  const clipEnd = Math.min(1, start + 0.06);

  // Scroll-scrubbed sequential entrance: clip snaps onto wire, then Polaroid drops & swings into place
  const cardOpacity = useTransform(progress, [start, end], [0, 1]);
  const cardDropY = useTransform(progress, [start, end], [-68, 0]);
  const cardScale = useTransform(progress, [start, end], [0.78, 1]);
  const cardTiltIn = useTransform(progress, [start, end], [slot.baseRotate * 2.2 - 10, 0]);

  const clipOpacity = useTransform(progress, [clipStart, clipEnd], [0, 1]);
  const clipScaleY = useTransform(progress, [clipStart, clipEnd], [0.2, 1]);

  const topPx = 26 + 252 * slot.t * (1 - slot.t) + wireSag * (4 * slot.t * (1 - slot.t));

  return (
    <div
      style={{
        left: `${slot.t * 100}%`,
        top: `${topPx}px`,
      }}
      className={`absolute -translate-x-1/2 ${isDragging ? 'z-40' : isHovered ? 'z-30' : 'z-10'}`}
    >
      {/* Fixed Cobalt Clip snaps onto the drawn wire right before its card drops */}
      <motion.div
        aria-hidden="true"
        style={
          prefersReduced
            ? undefined
            : { opacity: clipOpacity, scaleY: clipScaleY, transformOrigin: '50% 0%' }
        }
        className={`absolute -top-4 left-1/2 -translate-x-1/2 z-30 w-5 h-9 rounded-[5px] bg-[#002FA7] shadow-md flex flex-col items-center justify-between py-1.5 transition-colors duration-200 ${
          isPullReady || isDetached ? 'scale-110 bg-[#111111]' : ''
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-white" />
        <span className="w-2.5 h-[2px] rounded-full bg-white/40" />
      </motion.div>

      {/* Scroll-scrubbed sequential drop wrapper */}
      <motion.div
        style={
          prefersReduced
            ? undefined
            : {
                opacity: cardOpacity,
                y: cardDropY,
                scale: cardScale,
                rotate: cardTiltIn,
                transformOrigin: '50% 0%',
              }
        }
      >
        {/* Swinging Pendulum Wrapper (alive breeze sway, paused while hovering/dragging) */}
        <div
          style={{ animationDelay: slot.delay }}
          className={`${slot.swayClass} ${isHovered || isDragging || isDetached ? 'sway-paused' : ''}`}
        >
          {/* Draggable Polaroid Card */}
          <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.65}
            dragTransition={{ bounceStiffness: 260, bounceDamping: 18 }}
            onDragStart={() => onDragStart(product.id)}
            onDrag={(e, info) => onDrag(product, e, info)}
            onDragEnd={(e, info) => onDragEnd(product, e, info)}
            onMouseEnter={() => onHoverChange(product.id)}
            onMouseLeave={() => onHoverChange(null)}
            animate={{
              rotate: isDragging ? 0 : isHovered ? slot.baseRotate * 0.35 : slot.baseRotate,
              scale: isDetached ? 0.88 : isDragging ? 1.07 : isHovered ? 1.04 : 1,
              opacity: isDetached ? 0.25 : 1,
              y: isHovered && !isDragging ? 6 : 0,
            }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="w-[184px] lg:w-[216px] rounded-[22px] bg-white p-2.5 pt-4 border border-black/[0.08] shadow-[0_22px_45px_-18px_rgba(0,0,0,0.2)] cursor-grab active:cursor-grabbing relative"
          >
            {/* Pull-Out Status Pill while Dragging */}
            <AnimatePresence>
              {isDragging && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold shadow-md ${
                    isPullReady ? 'bg-[#002FA7] text-white' : 'bg-[#111111] text-white'
                  }`}
                >
                  {isPullReady ? 'Release to Pull Out' : 'Keep Pulling ↓'}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product Photo with Hover Image Swap */}
            <div className="relative aspect-[4/3] rounded-[15px] bg-[#F5F6F8] overflow-hidden pointer-events-none">
              <img
                src={product.image}
                alt={product.name}
                draggable={false}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                  isHovered || isDragging ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                }`}
              />
              <img
                src={product.hoverImage || product.image}
                alt={`${product.name} alternate view`}
                draggable={false}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                  isHovered || isDragging ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                }`}
              />
              <span className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-[#111111] tabular-nums shadow-sm">
                ${product.price}
              </span>
            </div>

            {/* Polaroid Caption + Quick Inspect / Detail Link */}
            <div className="pt-2.5 px-1 pb-1">
              <p className="text-[13px] font-extrabold text-[#111111] leading-tight truncate">
                {product.name}
              </p>
              <p className="text-[11px] text-neutral-500 truncate mt-0.5">{product.material}</p>

              <div className="mt-2.5 pt-2 border-t border-black/[0.06] flex items-center justify-between gap-1">
                <button
                  type="button"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => onPullClick(product)}
                  className="text-[10px] font-mono uppercase tracking-wider font-semibold text-[#002FA7] hover:underline inline-flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  Pull Out
                </button>
                <button
                  type="button"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => onDetailClick(product.id)}
                  className="text-[10px] font-mono uppercase tracking-wider font-semibold text-neutral-600 hover:text-[#111111]"
                >
                  Details →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export const HangingGallerySection: React.FC = () => {
  const { products, addToCart, settings } = useSite();
  const navigate = useNavigate();
  const prefersReduced = !!useReducedMotion();
  const wireStageRef = useRef<HTMLDivElement>(null);

  const hangingProducts = products.slice(0, 5);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [pullReadyId, setPullReadyId] = useState<string | null>(null);
  const [wireSag, setWireSag] = useState(0);
  const [pulledProduct, setPulledProduct] = useState<Product | null>(null);
  const [modalAltView, setModalAltView] = useState(false);

  // Scroll-scrubbed progress for the wire stage:
  // 0.00 -> 0.30: Wire draws left to right FIRST
  // 0.28 -> 0.96: Cards 1 -> 2 -> 3 -> 4 -> 5 clip & drop onto the wire one by one!
  const { scrollYProgress: rawStageProgress } = useScroll({
    target: wireStageRef,
    offset: ['start 88%', 'end 74%'],
  });

  const smoothProgress = useSpring(rawStageProgress, {
    stiffness: 170,
    damping: 28,
    mass: 0.35,
  });

  const wirePathLength = useTransform(smoothProgress, [0, 0.32], [0, 1]);
  const wireGlowOpacity = useTransform(smoothProgress, [0, 0.08, 0.32], [0, 1, 0.35]);

  const handleDrag = (
    product: Product,
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const dist = Math.hypot(info.offset.x, info.offset.y);
    const ready = dist > 68 || info.offset.y > 48;
    setPullReadyId(ready ? product.id : null);
    setWireSag(Math.max(-10, Math.min(34, info.offset.y * 0.25)));
  };

  const handleDragEnd = (
    product: Product,
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const dist = Math.hypot(info.offset.x, info.offset.y);
    const pulledOut = dist > 68 || info.offset.y > 48;
    setDraggingId(null);
    setPullReadyId(null);
    setWireSag(0);

    if (pulledOut) {
      setModalAltView(false);
      setPulledProduct(product);
    }
  };

  const wireControlY = 152 + wireSag;

  return (
    <section
      aria-label="Interactive Hanging Collection"
      className="relative overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F7F9FD] to-[#EEF3FF]/70 py-16 sm:py-20 md:py-24 border-b border-black/[0.06]"
    >
      {/* Subtle Ambient Cobalt Studio Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[780px] h-[340px] rounded-full bg-[#002FA7]/[0.055] blur-3xl"
      />

      {/* Top Editorial Header with Scroll-Scrubbed Word-by-Word 3D Reveal */}
      <div className="relative z-10 max-w-[960px] mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 border border-black/[0.08] shadow-sm mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#002FA7] live-dot text-[#002FA7]" />
          <span className="text-[11px] font-semibold tracking-[0.06em] text-neutral-700">
            Interactive {settings.brandName} Archive — Drag Any Card Out
          </span>
        </motion.div>

        <ScrollScrubText
          as="h2"
          lines={['CURATED OBJECTS BUILT TO', 'MOVE AND INSPIRE', 'EVERY SPACE']}
          accentWords={['MOVE']}
          className="text-[36px] sm:text-[52px] md:text-[64px] font-black uppercase leading-[0.95] tracking-[-0.04em] text-[#111111]"
        />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, delay: 0.18, ease: EASE_EDITORIAL }}
          className="text-[14px] sm:text-[15px] text-neutral-600 mt-5 max-w-lg mx-auto leading-relaxed"
        >
          Grab and pull any hanging piece right off the studio line to inspect its details, or jump straight into its full specification page.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.28, ease: EASE_EDITORIAL }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#equipment"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#002FA7] hover:bg-[#00227A] text-white text-[13px] font-semibold px-7 py-3.5 shadow-[0_14px_30px_-10px_rgba(0,47,167,0.45)] transition-all hover:-translate-y-0.5"
          >
            Explore Collection
            <ArrowRight className="w-4 h-4" />
          </a>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.12em] text-neutral-500 px-3 py-2">
            <GripHorizontal className="w-4 h-4 text-[#002FA7]" />
            Grab & Pull Cards Below
          </span>
        </motion.div>
      </div>

      {/* DESKTOP / TABLET SCROLL-CHOREOGRAPHED HANGING WIRE STAGE */}
      <div
        ref={wireStageRef}
        className="hidden md:block relative w-full max-w-[1440px] mx-auto mt-12 h-[400px] lg:h-[440px] select-none"
      >
        {/* STEP 1 ON SCROLL: Curved Studio Wire draws left-to-right FIRST */}
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-[180px] pointer-events-none z-0"
        >
          {/* Soft cobalt tension trace under the cable */}
          <motion.path
            d={`M -20 26 Q 720 ${wireControlY} 1460 26`}
            fill="none"
            stroke="#002FA7"
            strokeWidth="4"
            strokeLinecap="round"
            style={
              prefersReduced
                ? { opacity: 0.14 }
                : { pathLength: wirePathLength, opacity: wireGlowOpacity }
            }
          />
          {/* Crisp metallic studio cable */}
          <motion.path
            d={`M -20 26 Q 720 ${wireControlY} 1460 26`}
            fill="none"
            stroke="#111111"
            strokeOpacity="0.45"
            strokeWidth="2.2"
            strokeLinecap="round"
            style={prefersReduced ? undefined : { pathLength: wirePathLength }}
          />
        </svg>

        {/* STEP 2 ON SCROLL: Cards 1 -> 2 -> 3 -> 4 -> 5 clip & drop onto the wire ONE BY ONE */}
        {hangingProducts.map((product, idx) => {
          const slot = SLOT_CONFIG[idx];
          if (!slot) return null;

          return (
            <HangingCardSlot
              key={product.id}
              product={product}
              slot={slot}
              progress={smoothProgress}
              prefersReduced={prefersReduced}
              wireSag={wireSag}
              isHovered={hoveredId === product.id}
              isDragging={draggingId === product.id}
              isPullReady={pullReadyId === product.id}
              isDetached={pulledProduct?.id === product.id}
              onHoverChange={setHoveredId}
              onDragStart={setDraggingId}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              onPullClick={(p) => {
                setModalAltView(false);
                setPulledProduct(p);
              }}
              onDetailClick={(id) => navigate(`/product/${id}`)}
            />
          );
        })}
      </div>

      {/* MOBILE INTERACTIVE HORIZONTAL WIRE & SWINGING CAROUSEL */}
      <div className="md:hidden mt-10 px-4 relative">
        {/* Mobile Wire Line */}
        <svg
          viewBox="0 0 400 28"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="w-full h-7 pointer-events-none -mb-5"
        >
          <motion.path
            d="M 0 8 Q 200 24 400 8"
            fill="none"
            stroke="#111111"
            strokeOpacity="0.4"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE_EDITORIAL }}
          />
        </svg>

        <div className="flex gap-4 overflow-x-auto pb-6 pt-3 snap-x snap-mandatory -mx-4 px-4">
          {hangingProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: -32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.3 + idx * 0.14 }}
              className="snap-center flex-shrink-0 w-[230px] relative pt-3"
            >
              {/* Cobalt Clip */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-5 h-8 rounded-[5px] bg-[#002FA7] shadow-md flex items-start justify-center pt-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-white" />
              </div>

              <div
                style={{ animationDelay: `${idx * -0.9}s` }}
                className={`${idx % 2 === 0 ? 'sway-a' : 'sway-b'} rounded-[20px] bg-white p-2.5 pt-4 border border-black/[0.08] shadow-lg`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setModalAltView(false);
                    setPulledProduct(product);
                  }}
                  className="block w-full text-left"
                >
                  <div className="aspect-[4/3] rounded-[14px] bg-[#F5F6F8] overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 right-2 bg-white/90 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      ${product.price}
                    </span>
                  </div>
                  <div className="pt-2.5 px-1">
                    <p className="text-sm font-extrabold text-[#111111] truncate">{product.name}</p>
                    <p className="text-[11px] text-neutral-500 truncate">{product.category}</p>
                  </div>
                </button>
                <div className="mt-2.5 pt-2 border-t border-black/[0.06] flex items-center justify-between px-1">
                  <button
                    type="button"
                    onClick={() => {
                      setModalAltView(false);
                      setPulledProduct(product);
                    }}
                    className="text-[10px] font-mono uppercase font-semibold text-[#002FA7]"
                  >
                    Pull Out
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-[10px] font-mono uppercase font-semibold text-neutral-700"
                  >
                    Detail Page →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PULLED-OUT DETACHED PRODUCT INSPECTION MODAL */}
      <AnimatePresence>
        {pulledProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setPulledProduct(null)}
            className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.86, y: 40, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -30 }}
              transition={SPRING_CRISP}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-white rounded-[28px] overflow-hidden shadow-2xl border border-black/10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12">
                {/* Left Detached Photo Stage with Hover/Click Alternate View */}
                <div
                  onMouseEnter={() => setModalAltView(true)}
                  onMouseLeave={() => setModalAltView(false)}
                  className="sm:col-span-6 relative bg-[#F5F6F8] aspect-square sm:aspect-auto min-h-[260px] overflow-hidden"
                >
                  <img
                    src={pulledProduct.image}
                    alt={pulledProduct.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      modalAltView ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                    }`}
                  />
                  <img
                    src={pulledProduct.hoverImage || pulledProduct.image}
                    alt={`${pulledProduct.name} detail`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      modalAltView ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setModalAltView((v) => !v)}
                    className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold text-[#111111] shadow-sm"
                  >
                    {modalAltView ? '02 / Detail View' : '01 / Studio View'} · Switch
                  </button>
                </div>

                {/* Right Detached Spec & Actions */}
                <div className="sm:col-span-6 p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="eyebrow-mono text-[#002FA7]">{pulledProduct.category}</span>
                        <h3 className="text-2xl font-extrabold swiss-tracking mt-1 text-[#111111]">
                          {pulledProduct.name}
                        </h3>
                      </div>
                      <button
                        type="button"
                        aria-label="Close pulled card"
                        onClick={() => setPulledProduct(null)}
                        className="p-1.5 rounded-full hover:bg-[#F5F6F8] text-neutral-500 hover:text-[#111111] transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xl font-extrabold text-[#111111] mt-2 tabular-nums">
                      ${pulledProduct.price}
                    </p>
                    <p className="text-xs text-neutral-600 leading-relaxed mt-3">
                      {pulledProduct.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-black/[0.08] space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Highlight</span>
                        <span className="font-semibold">{pulledProduct.trainingFocus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Material</span>
                        <span className="font-semibold">{pulledProduct.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Spec</span>
                        <span className="font-semibold font-mono">{pulledProduct.weightRange}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    <Link
                      to={`/product/${pulledProduct.id}`}
                      onClick={() => setPulledProduct(null)}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#002FA7] hover:bg-[#00227A] text-white text-xs font-semibold py-3 px-5 transition-colors"
                    >
                      Open Full Detail Page
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(pulledProduct);
                          setPulledProduct(null);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#111111] hover:bg-[#002FA7] text-white text-[11px] font-semibold py-2.5 px-3 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add to Bag
                      </button>
                      <button
                        type="button"
                        onClick={() => setPulledProduct(null)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-black/15 hover:border-black/40 text-neutral-700 text-[11px] font-semibold py-2.5 px-3 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Clip Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
