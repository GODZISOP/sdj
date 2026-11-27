import React from 'react';

const ITEMS = [
  'ARCHITECTURAL PRECISION',
  'CNC MACHINED ALUMINUM',
  'SJDURALLC STUDIO RIYADH',
  'ACOUSTIC CLARITY',
  'GCC WHITE-GLOVE DELIVERY',
  'DESIGNED FOR LONGEVITY',
  'TACTILE COBALT FINISH',
];

export const StudioMarquee: React.FC = () => {
  return (
    <div
      aria-label="Studio highlights"
      className="border-t border-b border-black/[0.08] bg-[#111111] text-white py-3 overflow-hidden select-none"
    >
      <div className="marquee-track flex items-center gap-10 whitespace-nowrap">
        {[...ITEMS, ...ITEMS].map((text, idx) => (
          <div key={idx} className="inline-flex items-center gap-10">
            <span className="eyebrow-mono text-[11px] tracking-[0.18em] text-neutral-200">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4C78FF] flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
