import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  Award,
} from 'lucide-react';
import { useSite } from '../store/siteStore';
import { Reveal } from '../components/Reveal';
import { ProductCard } from '../components/ProductCard';
import { EASE_EDITORIAL } from '../lib/motion';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, settings } = useSite();
  const [qty, setQty] = useState(1);
  const [selectedView, setSelectedView] = useState<0 | 1>(0);
  const [stageHovered, setStageHovered] = useState(false);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQty(1);
    setSelectedView(0);
  }, [id]);

  if (!product) {
    return (
      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 py-24 text-center">
        <p className="eyebrow-mono text-[#002FA7]">404 — OBJECT NOT FOUND</p>
        <h1 className="text-3xl font-extrabold mt-2">Product not found</h1>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 bg-[#002FA7] text-white text-xs font-semibold px-6 py-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collection
        </Link>
      </main>
    );
  }

  const gallery = [
    { label: '01 / Studio View', src: product.image },
    { label: '02 / Alternate Detail', src: product.hoverImage || product.image },
  ];

  // Hovering the main photo previews the opposite view smoothly
  const displayedIndex: 0 | 1 = stageHovered ? (selectedView === 0 ? 1 : 0) : selectedView;
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <main className="bg-white py-10 sm:py-14 md:py-16">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10">
        {/* Breadcrumb */}
        <div className="mb-8 animate-fade-up">
          <Link
            to="/#equipment"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-[#002FA7] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {settings.brandName} Collection
          </Link>
        </div>

        {/* Main Product Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Interactive Dual-View Gallery */}
          <div className="lg:col-span-6 space-y-3 animate-fade-up">
            <div
              onMouseEnter={() => setStageHovered(true)}
              onMouseLeave={() => setStageHovered(false)}
              className="relative bg-[#F5F6F8] border border-black/[0.06] aspect-square overflow-hidden cursor-crosshair"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={gallery[displayedIndex].src + displayedIndex}
                  src={gallery[displayedIndex].src}
                  alt={`${product.name} — ${gallery[displayedIndex].label}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 border border-black/[0.08] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#002FA7] live-dot text-[#002FA7]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#111111]">
                  {gallery[displayedIndex].label}
                </span>
              </div>

              <div className="absolute bottom-4 right-4 bg-black/75 text-white px-3 py-1 text-[10px] font-mono uppercase tracking-wider">
                Hover image to peek alternate view
              </div>
            </div>

            {/* Thumbnail Switcher */}
            <div className="grid grid-cols-2 gap-3">
              {gallery.map((item, idx) => {
                const isSelected = selectedView === idx;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setSelectedView(idx as 0 | 1)}
                    className={`flex items-center gap-3 p-2.5 border text-left transition-all ${
                      isSelected
                        ? 'border-[#002FA7] bg-[#F5F6F8]'
                        : 'border-black/10 hover:border-black/30 bg-white'
                    }`}
                  >
                    <img src={item.src} alt={item.label} className="w-14 h-14 object-cover bg-white flex-shrink-0" />
                    <div>
                      <span className="eyebrow-mono text-[#002FA7] block">{item.label.split(' / ')[0]}</span>
                      <span className="text-xs font-semibold text-[#111111]">{item.label.split(' / ')[1]}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Product Specs & Actions */}
          <div className="lg:col-span-6 space-y-6 animate-fade-up-delay-1">
            <div>
              <p className="eyebrow-mono text-[#002FA7]">{product.category}</p>
              <h1 className="text-[32px] sm:text-[42px] lg:text-[48px] font-extrabold leading-[1.02] swiss-tracking mt-2">
                {product.name}
              </h1>
              <p className="text-2xl font-extrabold text-[#111111] mt-3 tabular-nums">${product.price}</p>
            </div>

            <p className="text-[15px] text-neutral-600 leading-relaxed">{product.description}</p>

            {/* Technical Spec Table */}
            <div className="border-t border-b border-black/10 divide-y divide-black/[0.06] text-sm">
              <div className="py-3.5 flex items-center justify-between gap-4">
                <span className="text-neutral-500 font-medium">Key Feature</span>
                <span className="font-semibold text-[#111111] text-right">{product.trainingFocus}</span>
              </div>
              <div className="py-3.5 flex items-center justify-between gap-4">
                <span className="text-neutral-500 font-medium">Weight / Spec</span>
                <span className="font-semibold text-[#111111] font-mono text-right">{product.weightRange}</span>
              </div>
              <div className="py-3.5 flex items-center justify-between gap-4">
                <span className="text-neutral-500 font-medium">Material</span>
                <span className="font-semibold text-[#111111] text-right">{product.material}</span>
              </div>
              <div className="py-3.5 flex items-center justify-between gap-4">
                <span className="text-neutral-500 font-medium">Best For</span>
                <span className="font-semibold text-[#111111] text-right">{product.bestFor}</span>
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <div className="inline-flex items-center justify-between border border-black/20 h-[48px]">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 h-full hover:bg-[#F5F6F8] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 text-sm font-bold tabular-nums">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 h-full hover:bg-[#F5F6F8] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => addToCart(product, qty)}
                className="flex-1 h-[48px] bg-[#002FA7] hover:bg-[#00227A] text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2"
              >
                Add to Studio Bag — ${product.price * qty}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Wholesale Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <div className="p-3.5 bg-[#F5F6F8] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#002FA7] flex-shrink-0 mt-0.5" />
                <span className="text-[11px] font-medium text-neutral-700">
                  Quality Checked & Covered
                </span>
              </div>
              <div className="p-3.5 bg-[#F5F6F8] flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#002FA7] flex-shrink-0 mt-0.5" />
                <span className="text-[11px] font-medium text-neutral-700">
                  Fast KSA & GCC Delivery
                </span>
              </div>
              <div className="p-3.5 bg-[#F5F6F8] flex items-start gap-2.5">
                <Award className="w-4 h-4 text-[#002FA7] flex-shrink-0 mt-0.5" />
                <span className="text-[11px] font-medium text-neutral-700">
                  Single & Bulk Ready
                </span>
              </div>
            </div>

            {/* Direct Specialist Note */}
            <div className="p-4 border border-black/[0.08] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs text-neutral-600">
                <Check className="w-4 h-4 text-[#002FA7] flex-shrink-0" />
                <span>
                  Bulk wholesale prices available from <strong className="text-black">{settings.ownerName}</strong>
                </span>
              </div>
              <Link
                to="/contact"
                className="text-xs font-semibold text-[#002FA7] hover:underline whitespace-nowrap"
              >
                Get Quote →
              </Link>
            </div>
          </div>
        </div>

        {/* Related Objects with Hover-Swap ProductCard */}
        <Reveal className="mt-20 pt-14 border-t border-black/[0.08]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="eyebrow-mono text-neutral-500">PAIR WITH</p>
              <h2 className="text-2xl font-extrabold swiss-tracking mt-1">Related Studio Objects</h2>
            </div>
            <Link to="/#equipment" className="text-xs font-semibold text-[#002FA7] hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((item, idx) => (
              <ProductCard
                key={item.id}
                product={item}
                onAddToCart={(p) => addToCart(p)}
                index={idx}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </main>
  );
};
