import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight,
  Volume2,
  VolumeX,
  Star,
  Sliders,
  ShoppingCart,
} from 'lucide-react';
import { useSite } from '../store/siteStore';
import { CategoryKey } from '../types';
import { Reveal } from '../components/Reveal';
import { ProductCard } from '../components/ProductCard';
import { StudioMarquee } from '../components/StudioMarquee';
import { HangingGallerySection } from '../components/HangingGallerySection';
import { ClientReviewsSection } from '../components/ClientReviewsSection';
import { ScrollScrubText } from '../components/ScrollScrubText';
import { FaqSection } from '../components/FaqSection';
import { ContactSection } from '../components/ContactSection';
import { EASE_EDITORIAL, SPRING_CRISP } from '../lib/motion';

const CATEGORY_ORDER: CategoryKey[] = [
  'Audio & Tech',
  'Home & Desk',
  'Drinkware',
  'Strength',
  'Lifestyle',
];

const HERO_PILLARS = [
  {
    Icon: Volume2,
    title: 'PREMIUM SOUND',
    desc: 'Rich, detailed audio designed for immersive everyday listening.',
  },
  {
    Icon: Star,
    title: 'BUILT FOR COMFORT',
    desc: 'Lightweight, ergonomic design made for effortless all-day wear.',
  },
  {
    Icon: Sliders,
    title: 'SMART PERFORMANCE',
    desc: 'Advanced engineering for intuitive control and crystal clarity.',
  },
  {
    Icon: ShoppingCart,
    title: 'FREE SHIPPING',
    desc: 'Enjoy fast, complimentary delivery across KSA & GCC.',
  },
];

const MOVEMENTS = [
  { num: '01', title: 'Hinge', desc: 'Controlled foundation & posture alignment.', image: '/images/move-hinge.jpg' },
  { num: '02', title: 'Drive', desc: 'Kinetic transfer & balanced momentum.', image: '/images/move-drive.jpg' },
  { num: '03', title: 'Press', desc: 'Full overhead structural extension.', image: '/images/move-press.jpg' },
];

export const HomePage: React.FC = () => {
  const { products, addToCart, settings } = useSite();
  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'All'>('All');
  const [hoveredCat, setHoveredCat] = useState<CategoryKey | null>(null);
  const [hoveredMove, setHoveredMove] = useState<string | null>(null);
  const [hoveredCompareId, setHoveredCompareId] = useState<string | null>(null);
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  const [pillHovered, setPillHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const philosophyRef = useRef<HTMLElement>(null);

  const { scrollYProgress: philProgress } = useScroll({
    target: philosophyRef,
    offset: ['start end', 'end start'],
  });
  const philRingRotate = useTransform(philProgress, [0, 1], [-18, 28]);
  const philRingY = useTransform(philProgress, [0, 1], [24, -24]);

  const heroFeaturedList = products.slice(0, 3);
  const activeHeroProduct = heroFeaturedList[heroSlideIdx] || products[0];

  const compareProducts = products.filter((p) => p.inCompare).slice(0, 3);
  const filteredEquipment =
    activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory);

  const categoryCards = CATEGORY_ORDER.map((cat) => {
    const match = products.find((p) => p.category === cat) || products[0];
    return {
      key: cat,
      label: cat,
      image: match?.image || '/images/cat-dumbbell.jpg',
      hoverImage: match?.hoverImage || match?.image || '/images/hero-dumbbell.jpg',
    };
  });

  const toggleAudio = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <main className="bg-white">
      {/* 1. FULL-BLEED CINEMATIC VIDEO HERO WITH MULTI-DIRECTION TEXT ANIMATION */}
      <section
        className="relative w-full h-[80vh] min-h-[580px] max-h-[860px] overflow-hidden flex items-center justify-center"
        style={{
          background:
            'radial-gradient(ellipse 62% 78% at 50% 46%, #B8BCC2 0%, #A1A5AB 58%, #8F9399 100%)',
        }}
      >
        {/* Uncropped Studio Video (100% visible head + headphones, feathered seamlessly into backdrop) */}
        <video
          ref={videoRef}
          src="/videos/hero-headphones.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            WebkitMaskImage:
              'linear-gradient(90deg, transparent 0%, black 11%, black 89%, transparent 100%)',
            maskImage:
              'linear-gradient(90deg, transparent 0%, black 11%, black 89%, transparent 100%)',
          }}
          className="relative z-0 h-full w-full max-w-[1380px] object-contain object-center"
        />

        {/* Subtle Bottom Editorial Vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.05] via-transparent to-black/[0.18] z-10"
        />

        {/* MULTI-DIRECTION SLIDE TEXT OVERLAY (Left slides from Left, Right slides from Right — replays on scroll!) */}
        <div className="pointer-events-none absolute inset-0 z-10 max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between pt-8 md:pt-0 pb-36 md:pb-16">
          {/* LEFT FLANK — Slides IN from Left -> Right */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55, ease: EASE_EDITORIAL }}
            className="max-w-[290px] lg:max-w-[360px] space-y-2.5"
          >
            <div className="inline-flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full border border-white/90 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#002FA7] live-dot text-[#002FA7]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#111111] font-semibold">
                {settings.brandName} · Edition 01
              </span>
            </div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ x: -80, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.05, ease: EASE_EDITORIAL }}
                className="text-[38px] sm:text-[48px] lg:text-[64px] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#111111]"
              >
                SCULPTED
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ x: 60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.14, ease: EASE_EDITORIAL }}
                className="block text-[38px] sm:text-[48px] lg:text-[64px] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#002FA7]"
              >
                SOUND.
              </motion.span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.22, ease: EASE_EDITORIAL }}
              className="hidden sm:block text-[12px] lg:text-[13px] font-medium text-[#111111]/80 leading-relaxed pt-1"
            >
              Precision-engineered industrial acoustics & architectural objects crafted for clarity.
            </motion.p>
          </motion.div>

          {/* RIGHT FLANK — Slides IN from Right -> Left */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE_EDITORIAL }}
            className="hidden md:flex flex-col items-end text-right max-w-[290px] lg:max-w-[360px] space-y-2.5"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#111111]/75 bg-white/75 px-3 py-1 rounded-full border border-white/90">
              ACTIVE ANC · 45H BATTERY
            </span>

            <div className="overflow-hidden">
              <motion.span
                initial={{ x: 80, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.1, ease: EASE_EDITORIAL }}
                className="block text-[44px] lg:text-[62px] font-black uppercase leading-[0.9] tracking-[-0.04em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.14)]"
              >
                PURE
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ x: -60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.18, ease: EASE_EDITORIAL }}
                className="block text-[44px] lg:text-[62px] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#111111]"
              >
                FORM.
              </motion.span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.25, ease: EASE_EDITORIAL }}
              className="flex flex-col items-end gap-1 pt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#111111]/80"
            >
              <span>CNC ALUMINUM HOUSING</span>
              <span>RIYADH STUDIO · GCC DELIVERY</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Subtle Sound Toggle Button (Bottom-Right) */}
        <button
          type="button"
          onClick={toggleAudio}
          aria-label={isMuted ? 'Unmute hero video' : 'Mute hero video'}
          className="absolute top-5 right-5 sm:bottom-8 sm:top-auto sm:right-8 z-20 inline-flex items-center gap-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-md px-3.5 py-2 border border-white/90 text-[10px] font-mono uppercase tracking-[0.14em] text-[#111111] transition-all shadow-sm"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#002FA7]" />}
          <span className="hidden sm:inline">{isMuted ? 'Sound Off' : 'Sound On'}</span>
        </button>

        {/* Floating Frosted Glass Product Pill Card (Exact Reference Position & Look) */}
        {activeHeroProduct && (
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: EASE_EDITORIAL }}
            onMouseEnter={() => setPillHovered(true)}
            onMouseLeave={() => setPillHovered(false)}
            className="absolute bottom-7 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-[490px]"
          >
            <div className="rounded-[28px] bg-white/65 hover:bg-white/82 backdrop-blur-xl border border-white/80 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.22)] px-4 py-3.5 sm:px-5 sm:py-4 transition-all duration-300">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHeroProduct.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: EASE_EDITORIAL }}
                  className="flex items-center gap-3.5 sm:gap-4"
                >
                  {/* Rounded Product Thumbnail with Hover Image Swap */}
                  <Link
                    to={`/product/${activeHeroProduct.id}`}
                    className="relative w-14 h-14 sm:w-[68px] sm:h-[68px] rounded-2xl bg-white/95 p-1 flex-shrink-0 overflow-hidden shadow-sm border border-black/[0.05]"
                  >
                    <img
                      src={activeHeroProduct.image}
                      alt={activeHeroProduct.name}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                        pillHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                      }`}
                    />
                    <img
                      src={activeHeroProduct.hoverImage || activeHeroProduct.image}
                      alt={`${activeHeroProduct.name} detail`}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                        pillHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                      }`}
                    />
                  </Link>

                  {/* Product Title + Concise Description */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${activeHeroProduct.id}`}
                      className="block text-[12px] sm:text-[13px] font-extrabold tracking-[0.08em] uppercase text-[#111111] hover:text-[#002FA7] transition-colors truncate"
                    >
                      {activeHeroProduct.name}
                    </Link>
                    <p className="text-[11px] sm:text-[12px] text-neutral-700 leading-snug mt-0.5 line-clamp-2">
                      {activeHeroProduct.description}
                    </p>
                  </div>

                  {/* Pill SHOP Button */}
                  <Link
                    to={`/product/${activeHeroProduct.id}`}
                    className="flex-shrink-0 rounded-full bg-white hover:bg-[#111111] hover:text-white text-[#111111] text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase px-4 sm:px-5 py-2.5 shadow-sm border border-black/[0.06] transition-all duration-200"
                  >
                    Shop
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Minimal Slide Indicator Dashes inside Pill */}
              <div className="flex items-center justify-center gap-1.5 mt-2.5">
                {heroFeaturedList.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Preview ${item.name}`}
                    onClick={() => setHeroSlideIdx(idx)}
                    className={`h-[3px] rounded-full transition-all duration-300 ${
                      idx === heroSlideIdx
                        ? 'w-5 bg-[#111111]'
                        : 'w-2 bg-[#111111]/25 hover:bg-[#111111]/55'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* 1B. 4-COLUMN EDITORIAL FEATURE STRIP (Matching Reference Bottom Band) */}
      <section className="bg-white border-b border-black/[0.06] py-9 sm:py-11">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8">
            {HERO_PILLARS.map(({ Icon, title, desc }, idx) => (
              <Reveal key={title} delayMs={idx * 70}>
                <div className="flex items-start gap-3.5 group">
                  <div className="mt-0.5 text-[#111111] group-hover:text-[#002FA7] transition-colors flex-shrink-0">
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.65} />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-extrabold tracking-[0.12em] uppercase text-[#111111]">
                      {title}
                    </h3>
                    <p className="text-[12px] text-neutral-500 leading-relaxed mt-1">
                      {desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 1C. INTERACTIVE HANGING POLAROID GALLERY (Drag & Pull Cards Off Wire!) */}
      <HangingGallerySection />

      {/* 1D. ANIMATED CLIENT PRODUCT REVIEWS FEED (Eldora-style 4-Phase Stream) */}
      <ClientReviewsSection />

      {/* KINETIC EDITORIAL TICKER */}
      <StudioMarquee />

      {/* 2. SCROLL-LINKED PHILOSOPHY SPLIT SECTION */}
      <section ref={philosophyRef} id="philosophy" className="border-b border-black/[0.06] overflow-hidden">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 relative bg-[#EAECEF] min-h-[280px] sm:min-h-[360px] lg:min-h-[440px] overflow-hidden">
            <img
              src="/images/philosophy-stretch.jpg"
              alt="Minimalist sunlit studio lifestyle"
              className="w-full h-full object-cover object-center hover:scale-[1.04] transition-transform duration-700"
            />
            <motion.div
              aria-hidden="true"
              style={{ rotate: philRingRotate, y: philRingY }}
              className="pointer-events-none absolute right-[12%] top-1/2 -translate-y-1/2 w-[190px] h-[190px] sm:w-[260px] sm:h-[260px] rounded-full border border-[#002FA7]/55 border-dashed"
            />
          </div>

          <div className="lg:col-span-6 grid grid-cols-12">
            <Reveal className="col-span-12 sm:col-span-9 px-6 sm:px-10 md:px-14 py-12 sm:py-14 flex flex-col justify-center space-y-5">
              <p className="eyebrow-mono text-neutral-500">THE {settings.brandName.toUpperCase()} PHILOSOPHY</p>
              <ScrollScrubText
                as="h2"
                lines={['Built Better.', 'Live Calmer.', 'Last Longer.']}
                accentWords={['Last', 'Longer.']}
                className="text-[34px] sm:text-[38px] md:text-[46px] font-extrabold leading-[1.02] swiss-tracking text-[#111111]"
              />
              <p className="text-[14px] text-neutral-600 leading-relaxed max-w-sm">
                Thoughtfully engineered audio, lighting, drinkware, and studio objects crafted from honest materials.
              </p>
              <div className="pt-2">
                <a
                  href="#equipment"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#002FA7] hover:gap-3 transition-all"
                >
                  Explore Objects
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>

            <div className="hidden sm:block sm:col-span-3 bg-[#002FA7] relative overflow-hidden">
              <img
                src="/images/compare-kettlebell.jpg"
                alt="Cobalt tactile finish detail"
                className="w-full h-full object-cover opacity-85 mix-blend-multiply hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. 5-COLUMN INTERACTIVE CATEGORY STRIP + HOVER-SWAP COLLECTION GRID */}
      <section id="equipment" className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categoryCards.map((cat) => {
            const isSelected = activeCategory === cat.key;
            const isCatHovered = hoveredCat === cat.key;
            return (
              <motion.button
                key={cat.key}
                whileTap={{ scale: 0.98 }}
                type="button"
                onMouseEnter={() => setHoveredCat(cat.key)}
                onMouseLeave={() => setHoveredCat(null)}
                onClick={() => setActiveCategory(isSelected ? 'All' : cat.key)}
                className={`group text-left transition-all relative ${
                  isSelected ? 'ring-2 ring-[#002FA7]' : ''
                }`}
              >
                <div className="relative aspect-[4/3] bg-[#F5F6F8] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
                      isCatHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                    }`}
                  />
                  <img
                    src={cat.hoverImage}
                    alt={`${cat.label} detail`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
                      isCatHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                    }`}
                  />
                </div>
                <div className="pt-3 pb-1.5 px-1 flex items-center justify-between border-b border-black/[0.08]">
                  <span className="text-[13px] font-semibold text-[#111111] group-hover:text-[#002FA7] transition-colors">
                    {cat.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#002FA7] group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Interactive Collection Header + Sliding layoutId Filter Pills */}
        <div className="mt-12 pt-8 border-t border-black/[0.06]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
            <div>
              <p className="eyebrow-mono text-[#002FA7]">HOVER ANY PRODUCT FOR ALTERNATE VIEW</p>
              <ScrollScrubText
                as="h3"
                lines={[activeCategory === 'All' ? 'Curated Studio Collection' : `${activeCategory} Collection`]}
                accentWords={['Studio']}
                className="text-2xl sm:text-3xl font-extrabold swiss-tracking mt-1"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {(['All', ...CATEGORY_ORDER] as const).map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`relative px-3.5 py-2 text-xs font-semibold transition-colors ${
                      active ? 'text-white' : 'text-neutral-600 hover:text-[#111111]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="activeCategoryPill"
                        transition={SPRING_CRISP}
                        className="absolute inset-0 bg-[#002FA7] -z-0"
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredEquipment.map((item, idx) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onAddToCart={(p) => addToCart(p)}
                  index={idx}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 4. MOVEMENT / CRAFT IN FOCUS — INTERACTIVE SPOTLIGHT */}
      <Reveal>
        <section id="programs" className="border-t border-black/[0.06] py-16">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 space-y-4">
              <p className="eyebrow-mono text-neutral-500">MOVEMENT IN FOCUS</p>
              <ScrollScrubText
                as="h2"
                lines={['Train', 'with Intention.']}
                accentWords={['Intention.']}
                className="text-[34px] sm:text-[38px] md:text-[42px] font-extrabold leading-[1.04] swiss-tracking"
              />
              <p className="text-[14px] text-neutral-600 max-w-xs leading-relaxed">
                Hover each stage to inspect balanced technique and daily movement rituals.
              </p>
              <div className="pt-2">
                <a
                  href="#compare"
                  className="inline-flex items-center gap-2.5 bg-[#002FA7] hover:bg-[#00227A] text-white text-[13px] font-semibold px-6 py-3 transition-all hover:translate-x-0.5"
                >
                  Compare Essentials
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {MOVEMENTS.map((step) => {
                const isActive = hoveredMove === step.num;
                const isDimmed = hoveredMove !== null && !isActive;
                return (
                  <div
                    key={step.num}
                    onMouseEnter={() => setHoveredMove(step.num)}
                    onMouseLeave={() => setHoveredMove(null)}
                    className={`group cursor-pointer transition-all duration-300 ${
                      isDimmed ? 'opacity-55 scale-[0.985]' : 'opacity-100'
                    }`}
                  >
                    <div className="aspect-[3/4] bg-white border border-black/[0.08] group-hover:border-[#002FA7] flex items-center justify-center p-4 overflow-hidden relative transition-colors duration-300">
                      <img
                        src={step.image}
                        alt={`${step.num} ${step.title}`}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-[#002FA7] origin-left transition-transform duration-300 ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </div>
                    <div className="mt-3">
                      <span className="block text-[14px] font-bold text-[#002FA7] font-mono">
                        {step.num}
                      </span>
                      <span className="block text-[15px] font-bold text-[#111111]">{step.title}</span>
                      <span className="block text-xs text-neutral-500 mt-0.5">{step.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* 5. INTERACTIVE COMPARE ESSENTIALS */}
      <Reveal>
        <section id="compare" className="border-t border-black/[0.06] bg-white">
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4 bg-[#F5F6F8] min-h-[260px] overflow-hidden flex items-end relative">
              <img
                src="/images/compare-kettlebell.jpg"
                alt="Cobalt finish studio macro"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="lg:col-span-8 px-4 sm:px-6 md:px-12 py-10 sm:py-14">
              <div className="mb-8">
                <p className="eyebrow-mono text-neutral-500">FIND YOUR FIT</p>
                <ScrollScrubText
                  as="h2"
                  lines={['Compare', 'Our Essentials']}
                  accentWords={['Essentials']}
                  className="text-[28px] sm:text-[34px] md:text-[38px] font-extrabold leading-[1.06] swiss-tracking mt-1"
                />
              </div>

              {/* Mobile Stacked Compare Cards */}
              <div className="sm:hidden space-y-4">
                {compareProducts.map((p) => (
                  <div key={p.id} className="border border-black/10 p-4 bg-white space-y-3">
                    <Link to={`/product/${p.id}`} className="flex items-center gap-4">
                      <img src={p.image} alt={p.name} className="w-16 h-16 object-cover bg-[#F5F6F8]" />
                      <div>
                        <p className="eyebrow-mono text-[#002FA7]">{p.category}</p>
                        <h3 className="text-base font-bold">{p.name}</h3>
                        <span className="text-xs font-bold">${p.price}</span>
                      </div>
                    </Link>
                    <div className="grid grid-cols-2 gap-2 text-xs bg-[#F5F6F8] p-3">
                      <div>
                        <span className="text-neutral-500 block">Highlight</span>
                        <span className="font-semibold">{p.trainingFocus}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Weight / Spec</span>
                        <span className="font-semibold">{p.weightRange}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Material</span>
                        <span className="font-semibold">{p.material}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Best For</span>
                        <span className="font-semibold">{p.bestFor}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart(p)}
                      className="w-full bg-[#002FA7] hover:bg-[#00227A] text-white text-xs font-semibold py-2.5 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>

              {/* Desktop / Tablet Interactive Hover-Swap Compare Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full min-w-[580px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-black/10">
                      <th className="py-4 pr-4 w-1/4" />
                      {compareProducts.map((p) => {
                        const isColHovered = hoveredCompareId === p.id;
                        return (
                          <th
                            key={p.id}
                            onMouseEnter={() => setHoveredCompareId(p.id)}
                            onMouseLeave={() => setHoveredCompareId(null)}
                            className={`py-4 px-3 text-center align-bottom transition-colors duration-200 ${
                              isColHovered ? 'bg-[#002FA7]/[0.04]' : ''
                            }`}
                          >
                            <Link to={`/product/${p.id}`} className="group block">
                              <div className="relative h-20 w-24 mx-auto mb-2 overflow-hidden bg-[#F5F6F8]">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-400 ${
                                    isColHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                                  }`}
                                />
                                <img
                                  src={p.hoverImage || p.image}
                                  alt={`${p.name} detail`}
                                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-400 ${
                                    isColHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                                  }`}
                                />
                              </div>
                              <span className="text-[12px] font-bold text-[#111111] group-hover:text-[#002FA7] block">
                                {p.name}
                              </span>
                            </Link>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="text-[12px]">
                    <tr className="bg-[#F5F6F8]">
                      <td className="py-3 px-4 font-semibold text-neutral-700">Key Feature</td>
                      {compareProducts.map((p) => (
                        <td
                          key={p.id}
                          onMouseEnter={() => setHoveredCompareId(p.id)}
                          onMouseLeave={() => setHoveredCompareId(null)}
                          className={`py-3 px-3 text-center text-neutral-600 transition-colors ${
                            hoveredCompareId === p.id ? 'bg-[#002FA7]/[0.06] text-[#111111] font-medium' : ''
                          }`}
                        >
                          {p.trainingFocus}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-neutral-700">Weight / Spec</td>
                      {compareProducts.map((p) => (
                        <td
                          key={p.id}
                          onMouseEnter={() => setHoveredCompareId(p.id)}
                          onMouseLeave={() => setHoveredCompareId(null)}
                          className={`py-3 px-3 text-center text-neutral-600 transition-colors ${
                            hoveredCompareId === p.id ? 'bg-[#002FA7]/[0.04] text-[#111111] font-medium' : ''
                          }`}
                        >
                          {p.weightRange}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-[#F5F6F8]">
                      <td className="py-3 px-4 font-semibold text-neutral-700">Material</td>
                      {compareProducts.map((p) => (
                        <td
                          key={p.id}
                          onMouseEnter={() => setHoveredCompareId(p.id)}
                          onMouseLeave={() => setHoveredCompareId(null)}
                          className={`py-3 px-3 text-center text-neutral-600 transition-colors ${
                            hoveredCompareId === p.id ? 'bg-[#002FA7]/[0.06] text-[#111111] font-medium' : ''
                          }`}
                        >
                          {p.material}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-neutral-700">Best For</td>
                      {compareProducts.map((p) => (
                        <td
                          key={p.id}
                          onMouseEnter={() => setHoveredCompareId(p.id)}
                          onMouseLeave={() => setHoveredCompareId(null)}
                          className={`py-3 px-3 text-center text-neutral-600 transition-colors ${
                            hoveredCompareId === p.id ? 'bg-[#002FA7]/[0.04] text-[#111111] font-medium' : ''
                          }`}
                        >
                          {p.bestFor}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="pt-5 px-4" />
                      {compareProducts.map((p) => (
                        <td
                          key={p.id}
                          onMouseEnter={() => setHoveredCompareId(p.id)}
                          onMouseLeave={() => setHoveredCompareId(null)}
                          className="pt-5 px-3 text-center"
                        >
                          <motion.button
                            whileTap={{ scale: 0.96 }}
                            type="button"
                            onClick={() => addToCart(p)}
                            className="w-full bg-[#002FA7] hover:bg-[#00227A] text-white text-[11px] font-semibold py-2.5 px-4 transition-colors"
                          >
                            Add to Cart
                          </motion.button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* 6. FAQS SECTION ON HOME PAGE */}
      <FaqSection />

      {/* 7. CONTACT SECTION ON HOME PAGE */}
      <ContactSection />
    </main>
  );
};
