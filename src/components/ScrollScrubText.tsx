import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
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
  const prefersReduced = useReducedMotion();
  const accentSet = new Set(accentWords.map((w) => w.toUpperCase()));
  const lineWords = lines.map((line) => line.trim().split(/\s+/));
  const Tag = as;

  if (prefersReduced) {
    return (
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
    );
  }

  let globalIdx = 0;

  return (
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
                  whileInView={{ y: '0%', opacity: 1 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{
                    duration: 0.58,
                    delay: idx * 0.065,
                    ease: EASE_EDITORIAL,
                  }}
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
  );
};
