import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { FaqSection } from '../components/FaqSection';

export const ContactPage: React.FC = () => {
  return (
    <main className="bg-white min-h-[75vh]">
      <ContactSection isHeadingH1 />
      <FaqSection />
    </main>
  );
};
