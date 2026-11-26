import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  Sparkles,
} from 'lucide-react';
import { useSite } from '../store/siteStore';
import { Reveal } from '../components/Reveal';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, settings } = useSite();
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQty(1);
  }, [id]);

  if (!product) {
    return (
      <main className="max-w-[1360px] mx-auto px-6 md:px-10 py-24 text-center">
        <p className="eyebrow-mono text-[#002FA7]">404 — EQUIPMENT NOT FOUND</p>
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

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <main className="bg-white py-12 md:py-16">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Studio Gallery */}
          <div className="lg:col-span-6 bg-[#F5F6F8] border border-black/[0.06] aspect-square flex items-center justify-center p-10 overflow-hidden animate-fade-up">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right Product Specs & Actions */}
          <div className="lg:col-span-6 space-y-6 animate-fade-up-delay-1">
            <div>
              <p className="eyebrow-mono text-[#002FA7]">{product.category}</p>
              <h1 className="text-[38px] md:text-[48px] font-extrabold leading-[1.02] swiss-tracking mt-2">
                {product.name}
              </h1>
              <p className="text-2xl font-extrabold text-[#111111] mt-3">${product.price}</p>
            </div>

            <p className="text-[15px] text-neutral-600 leading-relaxed">{product.description}</p>

            {/* Technical Spec Table */}
            <div className="border-t border-b border-black/10 divide-y divide-black/[0.06] text-sm">
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-neutral-500 font-medium">Training Focus</span>
                <span className="font-semibold text-[#111111]">{product.trainingFocus}</span>
              </div>
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-neutral-500 font-medium">Weight / Spec</span>
                <span className="font-semibold text-[#111111] font-mono">{product.weightRange}</span>
              </div>
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-neutral-500 font-medium">Material</span>
                <span className="font-semibold text-[#111111]">{product.material}</span>
              </div>
              <div className="py-3.5 flex items-center justify-between">
                <span className="text-neutral-500 font-medium">Best For</span>
                <span className="font-semibold text-[#111111]">{product.bestFor}</span>
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="inline-flex items-center border border-black/20 h-[48px]">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 h-full hover:bg-[#F5F6F8] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 text-sm font-bold">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 h-full hover:bg-[#F5F6F8] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => addToCart(product, qty)}
                className="flex-1 min-w-[200px] h-[48px] bg-[#002FA7] hover:bg-[#00227A] text-white text-xs font-semibold tracking-wide transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Add to Studio Bag — ${product.price * qty}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Studio Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <div className="p-3.5 bg-[#F5F6F8] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#002FA7] flex-shrink-0 mt-0.5" />
                <span className="text-[11px] font-medium text-neutral-700">
                  5-Year Structural Studio Warranty
                </span>
              </div>
              <div className="p-3.5 bg-[#F5F6F8] flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#002FA7] flex-shrink-0 mt-0.5" />
                <span className="text-[11px] font-medium text-neutral-700">
                  KSA & GCC White-Glove Delivery
                </span>
              </div>
              <div className="p-3.5 bg-[#F5F6F8] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#002FA7] flex-shrink-0 mt-0.5" />
                <span className="text-[11px] font-medium text-neutral-700">
                  Precision Architectural Finish
                </span>
              </div>
            </div>

            {/* Direct Specialist Note */}
            <div className="p-4 border border-black/[0.08] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs text-neutral-600">
                <Check className="w-4 h-4 text-[#002FA7]" />
                <span>
                  Commercial studio pricing available via <strong className="text-black">{settings.ownerName}</strong>
                </span>
              </div>
              <Link
                to="/contact"
                className="text-xs font-semibold text-[#002FA7] hover:underline whitespace-nowrap"
              >
                Inquire →
              </Link>
            </div>
          </div>
        </div>

        {/* Related Equipment */}
        <Reveal className="mt-20 pt-14 border-t border-black/[0.08]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="eyebrow-mono text-neutral-500">PAIR WITH</p>
              <h2 className="text-2xl font-extrabold swiss-tracking mt-1">Related Studio Gear</h2>
            </div>
            <Link to="/#equipment" className="text-xs font-semibold text-[#002FA7] hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="group border border-black/[0.08] p-5 hover:border-[#002FA7]/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[16/10] bg-[#F5F6F8] mb-4 flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="eyebrow-mono text-[#002FA7]">{item.category}</p>
                <div className="flex items-center justify-between mt-1">
                  <h3 className="text-base font-bold group-hover:text-[#002FA7] transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-sm font-bold">${item.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </main>
  );
};
