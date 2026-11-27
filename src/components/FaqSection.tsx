import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSite } from '../store/siteStore';
import { Reveal } from './Reveal';
import { ScrollScrubText } from './ScrollScrubText';

export const FaqSection: React.FC = () => {
  const { settings, faqs } = useSite();
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <Reveal>
      <section id="faqs" className="border-t border-black/[0.08] bg-white py-14 sm:py-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-3">
            <p className="eyebrow-mono text-[#002FA7]">FREQUENTLY ASKED QUESTIONS</p>
            <ScrollScrubText
              as="h2"
              lines={['Everything You', 'Need to Know.']}
              accentWords={['Know.']}
              className="text-[30px] sm:text-[34px] font-extrabold leading-[1.05] swiss-tracking"
            />
            <p className="text-sm text-neutral-600 leading-relaxed">
              Answers about {settings.brandName} shipping, custom studio outfitting, warranties, and support.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-3">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border transition-colors duration-300 ${
                    isOpen ? 'border-[#002FA7] bg-[#F5F6F8]/60' : 'border-black/10 bg-white'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left"
                  >
                    <div>
                      <span className="eyebrow-mono text-[#002FA7] block mb-1">{faq.category}</span>
                      <span className="text-[14px] sm:text-[15px] font-bold text-[#111111]">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#002FA7] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-5 text-sm text-neutral-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Reveal>
  );
};
