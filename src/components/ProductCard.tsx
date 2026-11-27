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

  // Signature directional card-deal across 4 columns:
  // Outer left glides from left-diagonal, inner columns rise smoothly, outer right glides from right-diagonal
  const col = index % 4;
  const hiddenVariant =
    col === 0
      ? { opacity: 0, x: -64, y: 42, rotate: -4, scale: 0.92 }
      : col === 3
        ? { opacity: 0, x: 64, y: 42, rotate: 4, scale: 0.92 }
        : { opacity: 0, x: 0, y: 64, rotate: col === 1 ? -1.5 : 1.5, scale: 0.9 };

  // Luxury readable one-by-one stagger (clearly sequential, never rushed!)
  const enterDelay = Math.min(index * 0.17, 0.85);

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
      exit={{ opacity: 0, scale: 0.92, y: 18 }}
      transition={
        isRevealed
          ? {
              duration: 0.72,
              delay: enterDelay,
              ease: EASE_EDITORIAL,
            }
          : { duration: 0.16, delay: 0 }
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative border border-black/[0.08] bg-white flex flex-col justify-between overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-[#002FA7]/55 hover:shadow-[0_14px_34px_-16px_rgba(0,47,167,0.22)] will-change-transform"
    >
      {/* Subtle interactive specular spotlight following pointer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `radial-gradient(280px circle at ${mousePos.x}% ${mousePos.y}%, rgba(0, 47, 167, 0.055), transparent 65%)`,
        }}
      />

      {/* Compact Sculptural Dual-Image Stage + Smooth Cobalt Shutter Curtain */}
      <div className="relative aspect-[1/1] bg-[#F5F6F8] overflow-hidden">
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

        {/* Smooth Luxury Cobalt Shutter Wipe unveiling the studio photo */}
        <motion.div
          aria-hidden="true"
          initial={{ scaleY: 1 }}
          animate={isRevealed ? { scaleY: 0 } : { scaleY: 1 }}
          transition={
            isRevealed
              ? { duration: 0.68, delay: enterDelay + 0.16, ease: EASE_EDITORIAL }
              : { duration: 0.12, delay: 0 }
          }
          style={{ transformOrigin: '50% 0%' }}
          className="pointer-events-none absolute inset-0 bg-[#002FA7] z-30 will-change-transform"
        />

        {/* Top-Left Live View Indicator Pill */}
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 bg-white/95 px-2 py-0.5 border border-black/[0.07]">
          <span
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              showAlt ? 'bg-[#002FA7] live-dot text-[#002FA7]' : 'bg-neutral-400'
            }`}
          />
          <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-[#111111]">
            {showAlt ? '02 / DETAIL' : '01 / STUDIO'}
          </span>
        </div>

        {/* Touch-friendly Alternate View toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setTouchAlt((prev) => !prev);
          }}
          aria-label="Toggle alternate product image"
          title="Switch view"
          className="absolute top-2.5 right-2.5 z-20 inline-flex items-center gap-1 bg-white/95 hover:bg-[#002FA7] hover:text-white px-2 py-0.5 border border-black/[0.07] text-[9px] font-mono uppercase text-neutral-700 transition-colors"
        >
          <Eye className="w-3 h-3" />
        </button>

        {/* Slide-Up Quick Action Bar on Hover */}
        <div
          className={`absolute inset-x-2.5 bottom-2.5 z-20 flex items-center gap-1.5 transition-all duration-300 ${
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
            className="flex-1 bg-[#002FA7] hover:bg-[#00227A] text-white text-[10px] font-semibold py-2 px-2.5 flex items-center justify-center gap-1 shadow-md transition-colors"
          >
            <Plus className="w-3 h-3" />
            Quick Add · ${product.price}
          </motion.button>
          <Link
            to={`/product/${product.id}`}
            aria-label={`Inspect ${product.name}`}
            className="bg-white/95 hover:bg-[#111111] hover:text-white text-[#111111] p-2 border border-black/10 shadow-md transition-colors"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Compact Refined Product Info Body */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between relative z-10">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-[#002FA7]">
                {product.category}
              </p>
              <Link
                to={`/product/${product.id}`}
                className="text-[14px] font-bold mt-0.5 block text-[#111111] group-hover:text-[#002FA7] transition-colors truncate"
              >
                {product.name}
              </Link>
            </div>
            <span className="text-[14px] font-extrabold tabular-nums flex-shrink-0">
              ${product.price}
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 mt-1.5 leading-snug line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-3.5 pt-3 border-t border-black/[0.06] flex items-center justify-between gap-2">
          <Link
            to={`/product/${product.id}`}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#111111] group-hover:text-[#002FA7] transition-colors"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => onAddToCart(product)}
            className="bg-[#111111] group-hover:bg-[#002FA7] text-white text-[11px] font-semibold px-3 py-1.5 transition-colors duration-300"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>

      {/* Animated bottom cobalt hairline bar */}
      <div
        aria-hidden="true"
        className="h-[2px] bg-[#002FA7] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
      />
    </motion.article>
  );
};
