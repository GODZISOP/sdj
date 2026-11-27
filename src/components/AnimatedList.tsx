import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { EASE_EDITORIAL } from '../lib/motion';

export type AnimationPhase = 'idle' | 'forming' | 'scrolling' | 'resetting';

interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
  stackGap?: number;
  columnGap?: number;
  scaleFactor?: number;
  scrollDownDuration?: number;
  formationDuration?: number;
  paused?: boolean;
  onPhaseChange?: (phase: AnimationPhase) => void;
}

export const AnimatedList: React.FC<AnimatedListProps> = ({
  children,
  className = '',
  stackGap = 18,
  columnGap = 114,
  scaleFactor = 0.045,
  scrollDownDuration = 3.6,
  formationDuration = 0.48,
  paused = false,
  onPhaseChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.08 });
  const items = React.Children.toArray(children);
  const count = items.length;
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState<AnimationPhase>('idle');

  // Reset immediately when scrolled out of view so it ALWAYS replays fresh on scroll!
  useEffect(() => {
    if (!isInView) {
      setPhase('idle');
    }
  }, [isInView]);

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [phase, onPhaseChange]);

  useEffect(() => {
    if (prefersReduced || paused || !isInView || count <= 1) return;

    let timer: number;
    if (phase === 'idle') {
      // Quick stacked beat before unfurling
      timer = window.setTimeout(() => setPhase('forming'), 300);
    } else if (phase === 'forming') {
      // Start gliding immediately as soon as the column unfurls (zero dead pause!)
      timer = window.setTimeout(() => setPhase('scrolling'), formationDuration * 1000);
    } else if (phase === 'scrolling') {
      // Immediately fold back once scroll finishes
      timer = window.setTimeout(() => setPhase('resetting'), scrollDownDuration * 1000 + 80);
    } else if (phase === 'resetting') {
      timer = window.setTimeout(() => setPhase('idle'), 480);
    }

    return () => window.clearTimeout(timer);
  }, [phase, paused, isInView, prefersReduced, count, formationDuration, scrollDownDuration]);

  // Smooth full travel through the column
  const scrollTravel = Math.max(0, (count - 2.6) * columnGap);

  if (prefersReduced) {
    return (
      <div className={`space-y-3 overflow-y-auto h-full px-3 py-4 ${className}`}>
        {items.map((child, idx) => (
          <div key={idx} className="w-full flex justify-center">
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Top & Bottom Soft Studio Gradient Masks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-[#F5F7FB] to-transparent z-20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#F5F7FB] to-transparent z-20"
      />

      {/* Entire Column Container that glides immediately during Phase 3 with linear flow (zero sluggish lead-in!) */}
      <motion.div
        animate={{
          y: phase === 'scrolling' ? -scrollTravel : 0,
        }}
        transition={
          phase === 'scrolling'
            ? { duration: scrollDownDuration, ease: 'linear' }
            : { duration: 0.45, ease: EASE_EDITORIAL }
        }
        className="relative w-full pt-7"
      >
        {items.map((child, index) => {
          const isStacked = phase === 'idle' || phase === 'resetting';
          const visibleStackDepth = Math.min(index, 4);

          const targetY = isStacked ? visibleStackDepth * stackGap : index * columnGap;
          const targetScale = isStacked ? Math.max(0.76, 1 - visibleStackDepth * scaleFactor) : 1;
          const targetOpacity = isStacked
            ? index > 4
              ? 0
              : Math.max(0.28, 1 - visibleStackDepth * 0.17)
            : 1;

          return (
            <motion.div
              key={index}
              initial={false}
              animate={{
                y: targetY,
                scale: targetScale,
                opacity: targetOpacity,
              }}
              transition={{
                duration: isStacked ? 0.45 : formationDuration,
                delay: isStacked ? 0 : index * 0.025,
                ease: EASE_EDITORIAL,
              }}
              style={{
                zIndex: isStacked ? count - index : index + 1,
                transformOrigin: '50% 0%',
              }}
              className="absolute top-0 left-0 right-0 flex justify-center px-3 sm:px-5 will-change-transform"
            >
              {child}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
