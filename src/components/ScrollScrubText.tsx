import React, { useRef } from 'react';
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react';

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  isAccent: boolean;
}

const ScrubWord: React.FC<WordProps> = ({ word, progress, range, isAccent }) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [28, 0]);
  const rotateX = useTransform(progress, range, [36, 0]);
  const scale = useTransform(progress, range, [0.94, 1]);

  return (
    <span
      className="inline-block overflow-visible mr-[0.26em] last:mr-0"
      style={{ perspective: '600px' }}
    >
      <motion.span
        style={{ opacity, y, rotateX, scale, transformOrigin: '50% 100%' }}
        className={`inline-block will-change-transform ${
          isAccent ? 'text-[#002FA7]' : ''
        }`}
      >
        {word}
      </motion.span>
    </span>
  );
};

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
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'center 46%'],
  });

  const accentSet = new Set(accentWords.map((w) => w.toUpperCase()));

  // Flatten all words across lines to compute exact staggered scroll windows
  const lineWords = lines.map((line) => line.trim().split(/\s+/));
  const totalWords = lineWords.reduce((sum, words) => sum + words.length, 0);

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
                    className={`inline-block mr-[0.26em] last:mr-0 ${
                      isAccent ? 'text-[#002FA7]' : ''
                    }`}
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
              // Overlap words slightly for fluid wave motion while keeping each clearly sequential
              const step = 1 / Math.max(totalWords + 1.4, 2);
              const start = Math.min(idx * step, 0.82);
              const end = Math.min(start + step * 2.2, 1);
              const clean = word.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
              const isAccent = accentSet.has(clean) || accentSet.has(word.toUpperCase());

              return (
                <ScrubWord
                  key={`${lIdx}-${wIdx}-${word}`}
                  word={word}
                  progress={scrollYProgress}
                  range={[start, end]}
                  isAccent={isAccent}
                />
              );
            })}
          </span>
        ))}
      </Tag>
    </div>
  );
};
