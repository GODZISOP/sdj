import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, PanInfo, useInView } from 'motion/react';
import { ArrowRight, GripHorizontal, X, ShoppingBag, Eye, RotateCcw } from 'lucide-react';
import { useSite } from '../store/siteStore';
import { Product } from '../types';
import { EASE_EDITORIAL, SPRING_CRISP } from '../lib/motion';
import { ScrollScrubText } from './ScrollScrubText';

// Exact positions along quadratic Bezier wire: P0=(-20,26), P1=(720,152), P2=(1460,26)
// y(t) = 26 + 252 * t * (1 - t)
const SLOT_CONFIG = [
  { t: 0.11, baseRotate: 8, swayClass: 'sway-a', delay: '0s' },
  { t: 0.305, baseRotate: 4, swayClass: 'sway-b', delay: '-1.3s' },
  { t: 0.5, baseRotate: 0, swayClass: 'sway-a', delay: '-2.6s' },
  { t: 0.695, baseRotate: -4, swayClass: 'sway-b', delay: '-0.8s' },
  { t: 0.89, baseRotate: -8, swayClass: 'sway-a', delay: '-3.1s' },
];

export const HangingGallerySection: React.FC = () => {
  const { products, addToCart, settings } = useSite();
  const navigate = useNavigate();
  const wireStageRef = useRef<HTMLDivElement>(null);

  // Replays EVERY TIME you scroll into the wire stage (triggers early & fast!):
  // 0.00s -> 0.36s: Wire draws left to right FIRST
  // 0.20s -> 0.56s: Cards 1 -> 2 -> 3 -> 4 -> 5 snap onto the wire one by one!
  const isStageInView = useInView(wireStageRef, { once: false, amount: 0.05 });

  const hangingProducts = products.slice(0, 5);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [pullReadyId, setPullReadyId] = useState<string | null>(null);
  const [pulledProduct, setPulledProduct] = useState<Product | null>(null);
  const [modalAltView, setModalAltView] = useState(false);

  const handleDrag = (
    product: Product,
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const dist = Math.hypot(info.offset.x, info.offset.y);
    const ready = dist > 68 || info.offset.y > 48;
    const nextReadyId = ready ? product.id : null;
    // Only update React state if boolean actually changes -> ZERO per-frame re-render lag!
    setPullReadyId((prev) => (prev === nextReadyId ? prev : nextReadyId));
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

    if (pulledOut) {
      setModalAltView(false);
      setPulledProduct(product);
    }
  };

  return (
    <section
      aria-label="Interactive Hanging Collection"
      className="relative overflow-hidden py-16 sm:py-20 md:py-24 border-b border-black/[0.06]"
      style={{
        background:
          'radial-gradient(ellipse 65% 45% at 50% 0%, rgba(0,47,167,0.06) 0%, rgba(255,255,255,0) 70%), linear-gradient(180deg, #FFFFFF 0%, #F7F9FD 55%, #EEF3FF 100%)',
      }}
    >
      {/* Top Editorial Header with Word-by-Word Staggered Scroll Animation */}
      <div className="relative z-10 max-w-[960px] mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.3, ease: EASE_EDITORIAL }}
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
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.35, delay: 0.08, ease: EASE_EDITORIAL }}
          className="text-[14px] sm:text-[15px] text-neutral-600 mt-5 max-w-lg mx-auto leading-relaxed"
        >
          Grab and pull any hanging piece right off the studio line to inspect its details, or jump straight into its full specification page.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.35, delay: 0.14, ease: EASE_EDITORIAL }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#equipment"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#002FA7] hover:bg-[#00227A] text-white text-[13px] font-semibold px-7 py-3.5 shadow-md transition-transform hover:-translate-y-0.5"
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

      {/* DESKTOP / TABLET CHOREOGRAPHED HANGING WIRE STAGE (Butter-smooth 60fps) */}
      <div
        ref={wireStageRef}
        className="hidden md:block relative w-full max-w-[1440px] mx-auto mt-12 h-[390px] lg:h-[430px] select-none"
      >
        {/* STEP 1 ON SCROLL: Curved Studio Wire draws left-to-right FIRST (0.00s -> 0.58s) */}
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-[180px] pointer-events-none z-0"
        >
          <motion.path
            d="M -20 26 Q 720 152 1460 26"
            fill="none"
            stroke="#111111"
            strokeOpacity="0.42"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isStageInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={
              isStageInView
                ? { duration: 0.55, ease: EASE_EDITORIAL }
                : { duration: 0.12, delay: 0 }
            }
          />
        </svg>

        {/* STEP 2 ON SCROLL: Cards 1 -> 2 -> 3 -> 4 -> 5 clip & drop onto the wire ONE BY ONE (smooth editorial pace!) */}
        {hangingProducts.map((product, idx) => {
          const slot = SLOT_CONFIG[idx];
          if (!slot) return null;

          const topPx = 26 + 252 * slot.t * (1 - slot.t);
          const isHovered = hoveredId === product.id;
          const isDragging = draggingId === product.id;
          const isPullReady = pullReadyId === product.id;
          const isDetached = pulledProduct?.id === product.id;

          // Wire draws first (0 -> 0.55s), then each card clips in smoothly 0.13s apart
          const clipDelay = 0.28 + idx * 0.13;
          const cardDelay = 0.34 + idx * 0.13;

          return (
            <div
              key={product.id}
              style={{
                left: `${slot.t * 100}%`,
                top: `${topPx}px`,
              }}
              className={`absolute -translate-x-1/2 ${isDragging ? 'z-40' : isHovered ? 'z-30' : 'z-10'}`}
            >
              {/* Cobalt Clip snaps onto the drawn wire right before its card drops */}
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, scaleY: 0.2 }}
                animate={isStageInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0.2 }}
                transition={
                  isStageInView
                    ? { duration: 0.18, delay: clipDelay, ease: EASE_EDITORIAL }
                    : { duration: 0.1, delay: 0 }
                }
                style={{ transformOrigin: '50% 0%' }}
                className={`absolute -top-4 left-1/2 -translate-x-1/2 z-30 w-5 h-9 rounded-[5px] bg-[#002FA7] shadow flex flex-col items-center justify-between py-1.5 transition-colors duration-200 ${
                  isPullReady || isDetached ? 'bg-[#111111]' : ''
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-white" />
                <span className="w-2.5 h-[2px] rounded-full bg-white/40" />
              </motion.div>

              {/* Sequential One-by-One Drop-In Entrance Wrapper */}
              <motion.div
                initial={{ opacity: 0, y: -36, scale: 0.88 }}
                animate={
                  isStageInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: -36, scale: 0.88 }
                }
                transition={
                  isStageInView
                    ? { type: 'spring', stiffness: 360, damping: 24, delay: cardDelay }
                    : { duration: 0.1, delay: 0 }
                }
                style={{ transformOrigin: '50% 0%' }}
              >
                {/* Organic Breeze Pendulum Sway Wrapper */}
                <div
                  style={{ animationDelay: slot.delay }}
                  className={`${slot.swayClass} ${isHovered || isDragging || isDetached ? 'sway-paused' : ''}`}
                >
                  {/* Draggable Polaroid Card (Zero-lag pure GPU transform) */}
                  <motion.div
                    drag
                    dragSnapToOrigin
                    dragElastic={0.55}
                    dragTransition={{ bounceStiffness: 280, bounceDamping: 20 }}
                    onDragStart={() => setDraggingId(product.id)}
                    onDrag={(e, info) => handleDrag(product, e, info)}
                    onDragEnd={(e, info) => handleDragEnd(product, e, info)}
                    onMouseEnter={() => setHoveredId(product.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    animate={{
                      rotate: isDragging ? 0 : isHovered ? slot.baseRotate * 0.35 : slot.baseRotate,
                      scale: isDetached ? 0.88 : isDragging ? 1.06 : isHovered ? 1.03 : 1,
                      opacity: isDetached ? 0.25 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                    className="w-[184px] lg:w-[214px] rounded-[20px] bg-white p-2.5 pt-4 border border-black/[0.08] shadow-lg cursor-grab active:cursor-grabbing relative"
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

                    {/* Lightweight GPU Hover-Swap Image Container */}
                    <div className="relative aspect-[4/3] rounded-[14px] bg-[#F5F6F8] overflow-hidden pointer-events-none">
                      <img
                        src={product.image}
                        alt={product.name}
                        draggable={false}
                        decoding="async"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                          isHovered || isDragging ? 'opacity-0' : 'opacity-100'
                        }`}
                      />
                      <img
                        src={product.hoverImage || product.image}
                        alt={`${product.name} alternate view`}
                        draggable={false}
                        decoding="async"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                          isHovered || isDragging ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                      <span className="absolute bottom-2 right-2 bg-white/95 px-2 py-0.5 rounded-full text-[10px] font-bold text-[#111111] tabular-nums shadow-sm">
                        ${product.price}
                      </span>
                    </div>

                    {/* Polaroid Caption + Quick Actions */}
                    <div className="pt-2.5 px-1 pb-1">
                      <p className="text-[13px] font-extrabold text-[#111111] leading-tight truncate">
                        {product.name}
                      </p>
                      <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                        {product.material}
                      </p>

                      <div className="mt-2.5 pt-2 border-t border-black/[0.06] flex items-center justify-between gap-1">
                        <button
                          type="button"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={() => {
                            setModalAltView(false);
                            setPulledProduct(product);
                          }}
                          className="text-[10px] font-mono uppercase tracking-wider font-semibold text-[#002FA7] hover:underline inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          Pull Out
                        </button>
                        <button
                          type="button"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={() => navigate(`/product/${product.id}`)}
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
        })}
      </div>

      {/* MOBILE INTERACTIVE HORIZONTAL WIRE & SWINGING CAROUSEL */}
      <div className="md:hidden mt-10 px-4 relative">
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
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
          />
        </svg>

        <div className="flex gap-4 overflow-x-auto pb-6 pt-3 snap-x snap-mandatory -mx-4 px-4">
          {hangingProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: -28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.3 + idx * 0.12 }}
              className="snap-center flex-shrink-0 w-[230px] relative pt-3"
            >
              <div
                aria-hidden="true"
                className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-5 h-8 rounded-[5px] bg-[#002FA7] shadow flex items-start justify-center pt-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-white" />
              </div>

              <div
                style={{ animationDelay: `${idx * -0.9}s` }}
                className={`${idx % 2 === 0 ? 'sway-a' : 'sway-b'} rounded-[20px] bg-white p-2.5 pt-4 border border-black/[0.08] shadow-md`}
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
                    <img
                      src={product.image}
                      alt={product.name}
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 right-2 bg-white/95 px-2 py-0.5 rounded-full text-[10px] font-bold">
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
            transition={{ duration: 0.2 }}
            onClick={() => setPulledProduct(null)}
            className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={SPRING_CRISP}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-white rounded-[28px] overflow-hidden shadow-2xl border border-black/10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12">
                <div
                  onMouseEnter={() => setModalAltView(true)}
                  onMouseLeave={() => setModalAltView(false)}
                  className="sm:col-span-6 relative bg-[#F5F6F8] aspect-square sm:aspect-auto min-h-[260px] overflow-hidden"
                >
                  <img
                    src={pulledProduct.image}
                    alt={pulledProduct.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                      modalAltView ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <img
                    src={pulledProduct.hoverImage || pulledProduct.image}
                    alt={`${pulledProduct.name} detail`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                      modalAltView ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setModalAltView((v) => !v)}
                    className="absolute bottom-3 left-3 bg-white/95 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold text-[#111111] shadow-sm"
                  >
                    {modalAltView ? '02 / Detail View' : '01 / Studio View'} · Switch
                  </button>
                </div>

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
