import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Infinity as InfinityIcon, Leaf, Layers } from 'lucide-react';
import { useSite } from '../store/siteStore';
import { CategoryKey } from '../types';
import { Reveal } from '../components/Reveal';
import { FaqSection } from '../components/FaqSection';
import { ContactSection } from '../components/ContactSection';

const CATEGORIES: { key: CategoryKey; label: string; image: string }[] = [
  { key: 'Home & Desk', label: 'Home & Desk', image: '/images/prod-lamp.svg' },
  { key: 'Audio & Tech', label: 'Audio & Tech', image: '/images/prod-speaker.svg' },
  { key: 'Drinkware', label: 'Drinkware', image: '/images/prod-tumbler.svg' },
  { key: 'Strength', label: 'Strength', image: '/images/cat-dumbbell.jpg' },
  { key: 'Lifestyle', label: 'Lifestyle', image: '/images/cat-mat.jpg' },
];

const MOVEMENTS = [
  { num: '01', title: 'Hinge', image: '/images/move-hinge.jpg' },
  { num: '02', title: 'Drive', image: '/images/move-drive.jpg' },
  { num: '03', title: 'Press', image: '/images/move-press.jpg' },
];

export const HomePage: React.FC = () => {
  const { products, addToCart, settings } = useSite();
  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'All'>('All');

  const compareProducts = products.filter((p) => p.inCompare).slice(0, 3);
  const filteredEquipment =
    activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory);

  return (
    <main className="bg-white">
      {/* 1. HERO SECTION */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-14 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 animate-fade-up">
            <p className="eyebrow-mono text-neutral-500 text-[10px] sm:text-[11px]">
              {settings.brandName.toUpperCase()} &nbsp;/&nbsp; DESIGN &nbsp;/&nbsp; MOVEMENT &nbsp;/&nbsp; LONGEVITY
            </p>
            <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-extrabold leading-[0.96] swiss-tracking text-[#111111]">
              Curated
              <br />
              Objects
              <br />
              <span className="text-[#002FA7]">Reimagined.</span>
            </h1>
            <p className="text-[15px] sm:text-[16px] text-neutral-600 max-w-md leading-relaxed">
              {settings.tagline}
            </p>
            <div className="pt-1">
              <a
                href="#equipment"
                className="w-full sm:w-auto justify-center inline-flex items-center gap-3 bg-[#002FA7] hover:bg-[#00227A] text-white text-[13px] font-semibold px-7 py-3.5 transition-all hover:translate-x-0.5"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-6 sm:pt-8 grid grid-cols-3 gap-3 sm:gap-6 max-w-md border-t border-black/[0.06]">
              <div className="space-y-2">
                <InfinityIcon className="w-5 h-5 text-neutral-700" strokeWidth={1.5} />
                <p className="text-[11px] font-medium leading-tight text-neutral-700">
                  Studio-Grade
                  <br />
                  Performance
                </p>
              </div>
              <div className="space-y-2">
                <Leaf className="w-5 h-5 text-neutral-700" strokeWidth={1.5} />
                <p className="text-[11px] font-medium leading-tight text-neutral-700">
                  Sustainable
                  <br />
                  Materials
                </p>
              </div>
              <div className="space-y-2">
                <Layers className="w-5 h-5 text-neutral-700" strokeWidth={1.5} />
                <p className="text-[11px] font-medium leading-tight text-neutral-700">
                  Design-First
                  <br />
                  Aesthetics
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center lg:justify-end animate-fade-up-delay-1">
            <div className="relative w-full max-w-[580px] aspect-[4/3] overflow-hidden bg-white animate-float-slow">
              <img
                src="/images/hero-dumbbell.jpg"
                alt="Sjdurallc machined steel dumbbell on architectural stone block"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY SPLIT SECTION */}
      <Reveal>
        <section id="philosophy" className="border-t border-b border-black/[0.06]">
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6 relative bg-[#EAECEF] min-h-[360px] lg:min-h-[440px] overflow-hidden">
              <img
                src="/images/philosophy-stretch.jpg"
                alt="Athlete stretching in minimalist sunlit studio"
                className="w-full h-full object-cover object-center hover:scale-[1.03] transition-transform duration-700"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[14%] top-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full border border-[#002FA7]/45"
              />
            </div>

            <div className="lg:col-span-6 grid grid-cols-12">
              <div className="col-span-12 sm:col-span-9 px-8 md:px-14 py-14 flex flex-col justify-center space-y-5">
                <p className="eyebrow-mono text-neutral-500">THE {settings.brandName.toUpperCase()} PHILOSOPHY</p>
                <h2 className="text-[38px] md:text-[46px] font-extrabold leading-[1.02] swiss-tracking text-[#111111]">
                  Move
                  <br />
                  Stronger.
                  <br />
                  <span className="text-[#002FA7]">Live Longer.</span>
                </h2>
                <p className="text-[14px] text-neutral-600 leading-relaxed max-w-sm">
                  Thoughtfully engineered equipment that supports strength, mobility, and everyday well-being.
                </p>
                <div className="pt-2">
                  <a
                    href="#programs"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#002FA7] hover:gap-3 transition-all"
                  >
                    Our Approach
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="hidden sm:block sm:col-span-3 bg-[#002FA7] relative overflow-hidden">
                <img
                  src="/images/compare-kettlebell.jpg"
                  alt="Cobalt finish detail"
                  className="w-full h-full object-cover opacity-85 mix-blend-multiply"
                />
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* 3. 5-COLUMN CATEGORY STRIP + INTERACTIVE EQUIPMENT GRID */}
      <Reveal>
        <section id="equipment" className="max-w-[1360px] mx-auto px-6 md:px-10 py-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(isSelected ? 'All' : cat.key)}
                  className={`group text-left transition-all ${
                    isSelected ? 'ring-2 ring-[#002FA7]' : ''
                  }`}
                >
                  <div className="aspect-[4/3] bg-[#F5F6F8] flex items-center justify-center p-5 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="pt-3 pb-1 px-1 flex items-center justify-between border-b border-black/[0.08]">
                    <span className="text-[13px] font-semibold text-[#111111]">{cat.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#002FA7] group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-10 pt-8 border-t border-black/[0.06]">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <p className="eyebrow-mono text-neutral-500">COLLECTION</p>
                <h3 className="text-xl font-bold tracking-tight">
                  {activeCategory === 'All' ? 'All Studio Equipment' : `${activeCategory} Gear`}
                </h3>
              </div>
              {activeCategory !== 'All' && (
                <button
                  type="button"
                  onClick={() => setActiveCategory('All')}
                  className="text-xs font-semibold text-[#002FA7] hover:underline"
                >
                  Show All ({products.length})
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEquipment.map((item, idx) => (
                <Reveal key={item.id} delayMs={idx * 70}>
                  <div className="border border-black/[0.08] bg-white flex flex-col justify-between p-5 h-full hover:border-[#002FA7]/40 hover:-translate-y-1 transition-all duration-300">
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="block aspect-[16/10] bg-[#F5F6F8] mb-4 flex items-center justify-center p-4 overflow-hidden"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="eyebrow-mono text-[#002FA7]">{item.category}</p>
                          <Link
                            to={`/product/${item.id}`}
                            className="text-base font-bold mt-1 block hover:text-[#002FA7] transition-colors"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <span className="text-base font-bold">${item.price}</span>
                      </div>
                      <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-black/[0.06] flex items-center justify-between gap-2">
                      <Link
                        to={`/product/${item.id}`}
                        className="text-xs font-semibold text-[#111111] hover:text-[#002FA7] transition-colors"
                      >
                        View Details →
                      </Link>
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="bg-[#002FA7] hover:bg-[#00227A] text-white text-xs font-semibold px-4 py-2 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* 4. MOVEMENT IN FOCUS — TRAIN WITH INTENTION */}
      <Reveal>
        <section id="programs" className="border-t border-black/[0.06] py-16">
          <div className="max-w-[1360px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 space-y-4">
              <p className="eyebrow-mono text-neutral-500">MOVEMENT IN FOCUS</p>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.04] swiss-tracking">
                Train
                <br />
                with Intention.
              </h2>
              <p className="text-[14px] text-neutral-600 max-w-xs leading-relaxed">
                Expert-guided movements to help you get the most from your gear.
              </p>
              <div className="pt-2">
                <a
                  href="#compare"
                  className="inline-flex items-center gap-2.5 bg-[#002FA7] hover:bg-[#00227A] text-white text-[13px] font-semibold px-6 py-3 transition-colors"
                >
                  Browse Programs
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {MOVEMENTS.map((step, idx) => (
                <Reveal key={step.num} delayMs={idx * 100}>
                  <div className="group">
                    <div className="aspect-[3/4] bg-white border border-black/[0.06] flex items-center justify-center p-4 overflow-hidden relative">
                      <img
                        src={step.image}
                        alt={`${step.num} ${step.title}`}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="mt-3">
                      <span className="block text-[14px] font-bold text-[#002FA7] font-mono">
                        {step.num}
                      </span>
                      <span className="block text-[15px] font-bold text-[#111111]">{step.title}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* 5. COMPARE ESSENTIALS */}
      <Reveal>
        <section id="compare" className="border-t border-black/[0.06] bg-white">
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4 bg-[#F5F6F8] min-h-[280px] overflow-hidden flex items-end">
              <img
                src="/images/compare-kettlebell.jpg"
                alt="Cobalt cast iron kettlebell macro"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="lg:col-span-8 px-4 sm:px-6 md:px-12 py-10 sm:py-14">
              <div className="mb-8">
                <p className="eyebrow-mono text-neutral-500">FIND YOUR FIT</p>
                <h2 className="text-[28px] sm:text-[34px] md:text-[38px] font-extrabold leading-[1.06] swiss-tracking mt-1">
                  Compare
                  <br />
                  Our Essentials
                </h2>
              </div>

              {/* Mobile Stacked Compare Cards */}
              <div className="sm:hidden space-y-4">
                {compareProducts.map((p) => (
                  <div key={p.id} className="border border-black/10 p-4 bg-white space-y-3">
                    <Link to={`/product/${p.id}`} className="flex items-center gap-4">
                      <img src={p.image} alt={p.name} className="w-16 h-16 object-contain bg-[#F5F6F8] p-2" />
                      <div>
                        <p className="eyebrow-mono text-[#002FA7]">{p.category}</p>
                        <h3 className="text-base font-bold">{p.name}</h3>
                        <span className="text-xs font-bold">${p.price}</span>
                      </div>
                    </Link>
                    <div className="grid grid-cols-2 gap-2 text-xs bg-[#F5F6F8] p-3">
                      <div>
                        <span className="text-neutral-500 block">Focus</span>
                        <span className="font-semibold">{p.trainingFocus}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Weight</span>
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

              {/* Desktop / Tablet Compare Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full min-w-[580px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-black/10">
                      <th className="py-4 pr-4 w-1/4" />
                      {compareProducts.map((p) => (
                        <th key={p.id} className="py-4 px-3 text-center align-bottom">
                          <Link to={`/product/${p.id}`} className="group block">
                            <div className="h-16 flex items-center justify-center mb-2">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="max-h-14 object-contain group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <span className="text-[12px] font-bold text-[#111111] group-hover:text-[#002FA7] block">
                              {p.name}
                            </span>
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-[12px]">
                    <tr className="bg-[#F5F6F8]">
                      <td className="py-3 px-4 font-semibold text-neutral-700">Training Focus</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="py-3 px-3 text-center text-neutral-600">
                          {p.trainingFocus}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-neutral-700">Weight Range</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="py-3 px-3 text-center text-neutral-600">
                          {p.weightRange}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-[#F5F6F8]">
                      <td className="py-3 px-4 font-semibold text-neutral-700">Material</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="py-3 px-3 text-center text-neutral-600">
                          {p.material}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-neutral-700">Best For</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="py-3 px-3 text-center text-neutral-600">
                          {p.bestFor}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="pt-5 px-4" />
                      {compareProducts.map((p) => (
                        <td key={p.id} className="pt-5 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => addToCart(p)}
                            className="w-full bg-[#002FA7] hover:bg-[#00227A] text-white text-[11px] font-semibold py-2.5 px-4 transition-colors"
                          >
                            Add to Cart
                          </button>
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
