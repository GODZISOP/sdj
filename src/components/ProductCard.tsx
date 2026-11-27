import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight, Plus, Eye } from 'lucide-react';
import { Product } from '../types';
import { EASE_EDITORIAL, EASE_TACTILE } from '../lib/motion';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  index?: number;
  gridInView?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  index = 0,
  gridInView,
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const selfInView = useInView(cardRef, { once: false, amount: 0.08 });
  const isRevealed = gridInView !== undefined ? gridInView : selfInView;

  const [isHovered, setIsHovered] = useState(false);
  const [touchAlt, setTouchAlt] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const showAlt = isHovered || touchAlt;
  const altImage = product.hoverImage || product.image;

  // Directional 3-column card-deal signature (left-angled, center-rise, right-angled)
  const col = index % 3;
  const hiddenVariant =
    col === 0
      ? { opacity: 0, x: -72, y: 48, rotate: -5, scale: 0.9 }
      : col === 1
        ? { opacity: 0, x: 0, y: 74, rotate: 0, scale: 0.88 }
        : { opacity: 0, x: 72, y: 48, rotate: 5, scale: 0.9 };

  // Crisp unmistakable one-by-one stagger (never all at once!)
  const enterDelay = Math.min(index * 0.11, 0.55);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={hiddenVariant}
      animate={isRevealed ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 } : hiddenVariant}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={
        isRevealed
          ? {
              type: 'spring',
              stiffness: 290,
              damping: 24,
              mass: 0.78,
              delay: enterDelay,
            }
          : { duration: 0.14, delay: 0 }
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative border border-black/[0.08] bg-white flex flex-col justify-between overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-[#002FA7]/55 hover:shadow-[0_18px_40px_-20px_rgba(0,47,167,0.24)] will-change-transform"
    >
      {/* Subtle interactive specular spotlight following pointer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `radial-gradient(360px circle at ${mousePos.x}% ${mousePos.y}%, rgba(0, 47, 167, 0.055), transparent 65%)`,
        }}
      />

      {/* Interactive Dual-Image Stage with Architectural Cobalt Shutter Wipe */}
      <div className="relative aspect-[4/3] bg-[#F5F6F8] overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full relative">
          {/* Primary Studio Image */}
          <img
            src={product.image}
            alt={product.name}
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
              showAlt ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          />

          {/* Alternate Hover Image */}
          <img
            src={altImage}
            alt={`${product.name} — alternate studio view`}
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
              showAlt ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          />
        </Link>

        {/* Architectural Cobalt Shutter Curtain that sweeps up right as each card deals in */}
        <motion.div
          aria-hidden="true"
          initial={{ scaleY: 1 }}
          animate={isRevealed ? { scaleY: 0 } : { scaleY: 1 }}
          transition={
            isRevealed
              ? { duration: 0.42, delay: enterDelay + 0.08, ease: EASE_EDITORIAL }
              : { duration: 0.1, delay: 0 }
          }
          style={{ transformOrigin: '50% 0%' }}
          className="pointer-events-none absolute inset-0 bg-[#002FA7] z-30 will-change-transform"
        />

        {/* Top-Left Live View Indicator Pill */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-white/95 px-2.5 py-1 border border-black/[0.07]">
          <span
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              showAlt ? 'bg-[#002FA7] live-dot text-[#002FA7]' : 'bg-neutral-400'
            }`}
          />
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#111111]">
            {showAlt ? '02 / DETAIL' : '01 / STUDIO'}
          </span>
        </div>

        {/* Touch-friendly Alternate View toggle button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setTouchAlt((prev) => !prev);
          }}
          aria-label="Toggle alternate product image"
          title="Switch view"
          className="absolute top-3 right-3 z-20 inline-flex items-center gap-1 bg-white/95 hover:bg-[#002FA7] hover:text-white px-2.5 py-1 border border-black/[0.07] text-[10px] font-mono uppercase tracking-wider text-neutral-700 transition-colors duration-200"
        >
          <Eye className="w-3 h-3" />
          <span className="sm:hidden">{showAlt ? '1/2' : '2/2'}</span>
        </button>

        {/* Slide-Up Quick Action Bar on Hover */}
        <div
          className={`absolute inset-x-3 bottom-3 z-20 flex items-center gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
          style={{ transitionTimingFunction: `cubic-bezier(${EASE_TACTILE.join(',')})` }}
        >
          <motion.button
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product);
            }}
            className="flex-1 bg-[#002FA7] hover:bg-[#00227A] text-white text-[11px] font-semibold py-2.5 px-3 flex items-center justify-center gap-1.5 shadow-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Quick Add — ${product.price}
          </motion.button>
          <Link
            to={`/product/${product.id}`}
            aria-label={`Inspect ${product.name}`}
            className="bg-white/95 hover:bg-[#111111] hover:text-white text-[#111111] p-2.5 border border-black/10 shadow-lg transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Product Info Body */}
      <div className="p-5 flex-1 flex flex-col justify-between relative z-10">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="eyebrow-mono text-[#002FA7]">{product.category}</p>
              <Link
                to={`/product/${product.id}`}
                className="text-base font-bold mt-1 block text-[#111111] group-hover:text-[#002FA7] transition-colors"
              >
                {product.name}
              </Link>
            </div>
            <span className="text-base font-bold tabular-nums">${product.price}</span>
          </div>
          <p className="text-xs text-neutral-600 mt-2 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-black/[0.06] flex items-center justify-between gap-2">
          <Link
            to={`/product/${product.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#111111] group-hover:text-[#002FA7] transition-colors"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => onAddToCart(product)}
            className="bg-[#111111] group-hover:bg-[#002FA7] text-white text-xs font-semibold px-4 py-2 transition-colors duration-300"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>

      {/* Animated bottom cobalt hairline bar */}
      <div
        aria-hidden="true"
        className="h-[2.5px] bg-[#002FA7] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
      />
    </motion.article>
  );
};
