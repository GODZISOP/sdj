import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { EASE_EDITORIAL } from '../lib/motion';

interface ScrollScrubTextProps {
  lines: string[];
  accentWords?: string[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export const ScrollScrubText: React.FC<ScrollScrubTextProps> = ({
  lines,
  accentWords = [],
  className = '',
  as = 'h2',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // once: false replays the staggered word reveal every time you scroll into view
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });
  const prefersReduced = useReducedMotion();

  const accentSet = new Set(accentWords.map((w) => w.toUpperCase()));
  const lineWords = lines.map((line) => line.trim().split(/\s+/));
  const Tag = as;

  if (prefersReduced) {
    return (
      <div ref={containerRef}>
        <Tag className={className}>
          {lineWords.map((words, lIdx) => (
            <span key={lIdx} className="block">
              {words.map((word, wIdx) => {
                const clean = word.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
                const isAccent = accentSet.has(clean) || accentSet.has(word.toUpperCase());
                return (
                  <span
                    key={wIdx}
                    className={`inline-block mr-[0.26em] last:mr-0 ${isAccent ? 'text-[#002FA7]' : ''}`}
                  >
                    {word}
                  </span>
                );
              })}
            </span>
          ))}
        </Tag>
      </div>
    );
  }

  let globalIdx = 0;

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        {lineWords.map((words, lIdx) => (
          <span key={lIdx} className="block">
            {words.map((word, wIdx) => {
              const idx = globalIdx++;
              const clean = word.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
              const isAccent = accentSet.has(clean) || accentSet.has(word.toUpperCase());

              return (
                <span
                  key={`${lIdx}-${wIdx}-${word}`}
                  className="inline-block overflow-hidden align-bottom mr-[0.26em] last:mr-0 pb-[0.06em]"
                >
                  <motion.span
                    initial={{ y: '105%', opacity: 0 }}
                    animate={isInView ? { y: '0%', opacity: 1 } : { y: '105%', opacity: 0 }}
                    transition={
                      isInView
                        ? {
                            duration: 0.56,
                            delay: idx * 0.065,
                            ease: EASE_EDITORIAL,
                          }
                        : { duration: 0.15, delay: 0 }
                    }
                    className={`inline-block will-change-transform ${isAccent ? 'text-[#002FA7]' : ''}`}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </span>
        ))}
      </Tag>
    </div>
  );
};
