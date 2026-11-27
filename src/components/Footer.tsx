import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, UserCheck } from 'lucide-react';
import { useSite } from '../store/siteStore';

export const Footer: React.FC = () => {
  const { settings } = useSite();

  return (
    <footer className="bg-[#111111] text-white pt-12 sm:pt-16 pb-10 border-t border-black">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 pb-12 sm:pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/favicon.svg"
                alt={`${settings.brandName} Logo`}
                className="w-10 h-10 rounded-lg"
              />
              <div className="leading-[0.95] tracking-[-0.03em] font-bold text-[22px]">
                <span className="block">{settings.brandName}</span>
                <span className="block text-[11px] font-mono uppercase tracking-[0.14em] text-[#4C78FF] mt-1">
                  Wholesale LLC
                </span>
              </div>
            </div>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              {settings.footerNote}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2 space-y-3">
            <p className="eyebrow-mono text-neutral-500">Explore</p>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <Link to="/#equipment" className="hover:text-white transition-colors">
                  Equipment
                </Link>
              </li>
              <li>
                <Link to="/#programs" className="hover:text-white transition-colors">
                  Movement Programs
                </Link>
              </li>
              <li>
                <Link to="/#compare" className="hover:text-white transition-colors">
                  Compare Essentials
                </Link>
              </li>
              <li>
                <Link to="/contact#faqs" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact {settings.brandName}
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact Details (Editable via Admin Panel) */}
          <div className="md:col-span-4 space-y-3">
            <p className="eyebrow-mono text-neutral-500">Direct Contact</p>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="flex items-center gap-3">
                <UserCheck className="w-4 h-4 text-[#4C78FF] flex-shrink-0" />
                <span className="font-semibold text-white">{settings.ownerName}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#4C78FF] flex-shrink-0" />
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors font-medium"
                >
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#4C78FF] flex-shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-white transition-colors font-medium"
                >
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#4C78FF] flex-shrink-0 mt-0.5" />
                <span className="text-neutral-400">{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#4C78FF] flex-shrink-0" />
                <span className="text-neutral-400">{settings.hours}</span>
              </li>
            </ul>
          </div>

          {/* Wholesale Quote Quick Action (No public Admin Panel button!) */}
          <div className="md:col-span-2 space-y-3">
            <p className="eyebrow-mono text-neutral-500">Wholesale</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-[#002FA7] hover:bg-[#0038CC] px-4 py-2.5 transition-colors"
            >
              Get Quote
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Request bulk pricing, invoices, and wholesale catalog support.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} {settings.companyLegalName} · {settings.ownerName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>{settings.email}</span>
            <span>{settings.phone}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
