import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Pause, Play, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { AnimatedList, AnimationPhase } from './AnimatedList';
import { ScrollScrubText } from './ScrollScrubText';
import { Reveal } from './Reveal';

interface ProductReview {
  id: string;
  clientName: string;
  role: string;
  city: string;
  productId: string;
  productName: string;
  productImage: string;
  rating: number;
  comment: string;
  timeAgo: string;
}

const CLIENT_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    clientName: 'Faisal Al-Harbi',
    role: 'Creative Director',
    city: 'Riyadh',
    productId: 'aero-headphones',
    productName: 'Aero One Headphone',
    productImage: '/images/prod-headphones.jpg',
    rating: 5,
    comment: 'Studio-grade soundstage and zero ear fatigue even after 8-hour editing sessions.',
    timeAgo: '18m ago',
  },
  {
    id: 'rev-2',
    clientName: 'Noura Al-Qahtani',
    role: 'Interior Architect',
    city: 'Jeddah',
    productId: 'kinetix-lamp',
    productName: 'Kinetix Desk Lamp',
    productImage: '/images/prod-lamp.jpg',
    rating: 5,
    comment: 'The brushed steel weight and warm 3000K glow transformed our drafting studio.',
    timeAgo: '1h ago',
  },
  {
    id: 'rev-3',
    clientName: 'Omar Bin-Saeed',
    role: 'Founder, Craft Lab',
    city: 'Dubai',
    productId: 'cobalt-speaker',
    productName: 'Cobalt Acoustic Speaker',
    productImage: '/images/prod-speaker.jpg',
    rating: 5,
    comment: 'Ordered 12 units for client lounges — crystal clarity and the steel dial feels unreal.',
    timeAgo: '3h ago',
  },
  {
    id: 'rev-4',
    clientName: 'Layla Mansoor',
    role: 'Lead Product Engineer',
    city: 'Riyadh',
    productId: 'monolith-keyboard',
    productName: 'Monolith 75 Keyboard',
    productImage: '/images/prod-keyboard.jpg',
    rating: 5,
    comment: 'Solid CNC aluminum chassis with deep thocky acoustics and tactile cobalt knob.',
    timeAgo: '5h ago',
  },
  {
    id: 'rev-5',
    clientName: 'Khalid Al-Dosari',
    role: 'Wellness Studio Owner',
    city: 'Dammam',
    productId: 'vector-dumbbell',
    productName: 'Vector Dumbbell',
    productImage: '/images/cat-dumbbell.jpg',
    rating: 5,
    comment: 'Machined stainless steel finish looks like architectural sculpture in our suite.',
    timeAgo: '1d ago',
  },
  {
    id: 'rev-6',
    clientName: 'Sara Al-Zahrani',
    role: 'Brand Strategist',
    city: 'Riyadh',
    productId: 'thermo-flask',
    productName: 'Thermo Cobalt Flask',
    productImage: '/images/prod-tumbler.jpg',
    rating: 5,
    comment: 'Keeps ice solid all day in Riyadh heat — tactile matte cobalt never scratches.',
    timeAgo: '2d ago',
  },
  {
    id: 'rev-7',
    clientName: 'Zaid Al-Otaibi',
    role: 'Sound Designer',
    city: 'Abu Dhabi',
    productId: 'aero-headphones',
    productName: 'Aero One Headphone',
    productImage: '/images/prod-headphones.jpg',
    rating: 5,
    comment: 'Fast express delivery from Sjdurallc and the metallic earcup finish is flawless.',
    timeAgo: '3d ago',
  },
];

const PHASE_LABELS: Record<AnimationPhase, string> = {
  idle: '01 / STACKED',
  forming: '02 / UNFURLING',
  scrolling: '03 / STREAMING',
  resetting: '04 / RESETTING',
};

export const ClientReviewsSection: React.FC = () => {
  const [hoverPaused, setHoverPaused] = useState(false);
  const [manualPaused, setManualPaused] = useState(false);
  const [phase, setPhase] = useState<AnimationPhase>('idle');

  const isPaused = hoverPaused || manualPaused;

  return (
    <section
      id="reviews"
      className="border-t border-b border-black/[0.06] bg-white py-16 sm:py-20 overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Editorial Summary & Live Phase Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F5F6F8] border border-black/[0.06]">
            <span className="w-2 h-2 rounded-full bg-[#002FA7] live-dot text-[#002FA7]" />
            <span className="eyebrow-mono text-[10px] text-[#111111]">
              VERIFIED CLIENT FEEDBACK
            </span>
          </div>

          <ScrollScrubText
            as="h2"
            lines={['What Clients', 'Say About', 'Our Objects.']}
            accentWords={['Clients', 'Objects.']}
            className="text-[36px] sm:text-[44px] md:text-[50px] font-extrabold leading-[1.0] swiss-tracking text-[#111111]"
          />

          <p className="text-[14px] sm:text-[15px] text-neutral-600 leading-relaxed max-w-md">
            Real reviews from architects, founders, and creators across Riyadh, Jeddah, Dammam, and Dubai. Hover any review card to pause or click to inspect the product.
          </p>

          {/* Rating & Trust Stats */}
          <Reveal className="grid grid-cols-3 gap-4 pt-4 border-t border-black/[0.08]">
            <div>
              <div className="flex items-center gap-1 text-[#002FA7]">
                <span className="text-2xl font-extrabold text-[#111111] tabular-nums">4.9</span>
                <Star className="w-4 h-4 fill-[#002FA7] text-[#002FA7]" />
              </div>
              <p className="text-[11px] text-neutral-500 mt-0.5">Average Rating</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#111111] tabular-nums">240+</p>
              <p className="text-[11px] text-neutral-500 mt-0.5">Verified Orders</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#002FA7] tabular-nums">100%</p>
              <p className="text-[11px] text-neutral-500 mt-0.5">GCC Insured</p>
            </div>
          </Reveal>

          {/* Live Stream Status & Pause/Play Control */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setManualPaused((p) => !p)}
              className="inline-flex items-center gap-2 rounded-full bg-[#111111] hover:bg-[#002FA7] text-white text-[11px] font-semibold px-4 py-2 transition-colors"
            >
              {manualPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              {manualPaused ? 'Resume Stream' : 'Pause Stream'}
            </button>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500 bg-[#F5F6F8] px-3 py-2 border border-black/[0.06]">
              {isPaused ? 'PAUSED' : PHASE_LABELS[phase]}
            </span>
          </div>
        </div>

        {/* Right Eldora-Style Animated Review Feed Stage */}
        <div
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
          className="lg:col-span-7"
        >
          <div className="relative h-[440px] sm:h-[480px] w-full rounded-[26px] border border-black/[0.08] bg-[#F5F7FB] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] overflow-hidden">
            <AnimatedList
              stackGap={20}
              columnGap={114}
              scaleFactor={0.045}
              scrollDownDuration={6.2}
              formationDuration={0.95}
              paused={isPaused}
              onPhaseChange={setPhase}
            >
              {CLIENT_REVIEWS.map((review) => (
                <Link
                  key={review.id}
                  to={`/product/${review.productId}`}
                  className="group flex w-full max-w-[490px] items-center gap-3.5 sm:gap-4 rounded-2xl border border-black/[0.07] bg-white p-3.5 sm:p-4 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.14)] hover:border-[#002FA7]/50 transition-colors"
                >
                  {/* Reviewed Product Mini Studio Thumbnail */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#F5F6F8] flex-shrink-0 overflow-hidden border border-black/[0.05]">
                    <img
                      src={review.productImage}
                      alt={review.productName}
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Review Body */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[13px] font-bold text-[#111111] truncate">
                          {review.clientName}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#002FA7] flex-shrink-0" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 flex-shrink-0">
                        {review.timeAgo}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-2.5 h-2.5 fill-[#002FA7] text-[#002FA7]"
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#002FA7] truncate">
                        {review.productName} · {review.city}
                      </span>
                    </div>

                    <p className="text-[12px] text-neutral-600 leading-snug mt-1 line-clamp-2">
                      "{review.comment}"
                    </p>
                  </div>

                  {/* Hover Jump Arrow */}
                  <div className="hidden sm:flex w-8 h-8 rounded-full bg-[#F5F6F8] group-hover:bg-[#002FA7] group-hover:text-white text-neutral-500 items-center justify-center flex-shrink-0 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </AnimatedList>
          </div>
        </div>
      </div>
    </section>
  );
};
