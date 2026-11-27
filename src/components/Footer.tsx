import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { useSite } from '../store/siteStore';
import { EASE_EDITORIAL } from '../lib/motion';

export const Footer: React.FC = () => {
  const { settings, products } = useSite();
  const whatsappDigits = settings.whatsapp.replace(/[^0-9]/g, '');

  return (
    <footer
      className="relative w-full text-white overflow-hidden pt-28 sm:pt-36 md:pt-44 pb-0"
      style={{
        background:
          'linear-gradient(180deg, #FFFFFF 0%, #D9E5FF 10%, #2D62E8 28%, #002FA7 46%, #051646 68%, #030A1E 86%, #02050D 100%)',
      }}
    >
      {/* Top Content Area */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 pb-12 sm:pb-16">
          {/* Left Brand, Description, Quick Icons & Copyright */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-7">
            <div className="space-y-5">
              {/* Clean White Monogram + Brand */}
              <Link to="/" className="inline-flex items-center gap-3 group">
                <img
                  src="/favicon.svg"
                  alt={`${settings.brandName} Logo`}
                  className="w-9 h-9 rounded-lg ring-1 ring-white/30 shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <span className="text-lg font-extrabold tracking-[0.06em] uppercase text-white">
                  {settings.brandName}
                </span>
              </Link>

              <p className="text-[13px] sm:text-[14px] text-white/80 max-w-sm leading-relaxed">
                {settings.footerNote}
              </p>

              {/* Direct Quick Contact Icons Row (matching reference minimal icon row) */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  aria-label="Call Sjdurallc"
                  title={settings.phone}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#002FA7] border border-white/15 flex items-center justify-center text-white transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${settings.email}`}
                  aria-label="Email Sjdurallc"
                  title={settings.email}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#002FA7] border border-white/15 flex items-center justify-center text-white transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Mail className="w-4 h-4" />
                </a>
                {whatsappDigits && (
                  <a
                    href={`https://wa.me/${whatsappDigits}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp Sjdurallc"
                    title={`WhatsApp ${settings.whatsapp}`}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#002FA7] border border-white/15 flex items-center justify-center text-white transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )}
                <Link
                  to="/contact"
                  aria-label="Office Location & Contact"
                  title={settings.address}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#002FA7] border border-white/15 flex items-center justify-center text-white transition-all duration-200 hover:-translate-y-0.5"
                >
                  <MapPin className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <p className="text-[12px] font-semibold text-white/90">
                © {settings.brandName} {new Date().getFullYear()} — All Rights Reserved
              </p>
              <p className="text-[11px] text-white/60">
                {settings.companyLegalName} · {settings.ownerName}
              </p>
            </div>
          </div>

          {/* Right 3 Clean Link Columns (Matching exact reference structure) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {/* Column 1: Products */}
            <div className="space-y-4">
              <h3 className="text-[13px] font-bold text-white tracking-wide">Products</h3>
              <ul className="space-y-2.5 text-[12.5px] text-white/72">
                {products.slice(0, 6).map((p) => (
                  <li key={p.id}>
                    <Link
                      to={`/product/${p.id}`}
                      className="hover:text-white transition-colors"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Wholesale Services */}
            <div className="space-y-4">
              <h3 className="text-[13px] font-bold text-white tracking-wide">Services</h3>
              <ul className="space-y-2.5 text-[12.5px] text-white/72">
                <li>
                  <Link to="/#services" className="hover:text-white transition-colors">
                    Wholesale Supply
                  </Link>
                </li>
                <li>
                  <Link to="/#services" className="hover:text-white transition-colors">
                    Brand Partners
                  </Link>
                </li>
                <li>
                  <Link to="/#services" className="hover:text-white transition-colors">
                    Packing & Prep
                  </Link>
                </li>
                <li>
                  <Link to="/#reviews" className="hover:text-white transition-colors">
                    Buyer Reviews
                  </Link>
                </li>
                <li>
                  <Link to="/contact#faqs" className="hover:text-white transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Bulk Quotes
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Direct Contact Details */}
            <div className="col-span-2 sm:col-span-1 space-y-4">
              <h3 className="text-[13px] font-bold text-white tracking-wide">Contact</h3>
              <ul className="space-y-2.5 text-[12.5px] text-white/72">
                <li className="font-semibold text-white">{settings.ownerName}</li>
                <li>
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                    className="hover:text-white transition-colors"
                  >
                    {settings.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="hover:text-white transition-colors break-all"
                  >
                    {settings.email}
                  </a>
                </li>
                {whatsappDigits && (
                  <li>
                    <a
                      href={`https://wa.me/${whatsappDigits}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      WhatsApp Direct
                    </a>
                  </li>
                )}
                <li className="text-white/60 leading-snug">{settings.address}</li>
                <li className="text-white/60">{settings.hours}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Massive Bottom Watermark Wordmark (Matching iconic full-width reference footer) */}
      <div
        aria-hidden="true"
        className="relative w-full overflow-hidden pt-4 sm:pt-6 pb-2 flex justify-center select-none pointer-events-none"
      >
        <motion.span
          initial={{ y: 36, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
          className="block w-full text-center font-black lowercase tracking-[-0.055em] leading-[0.82] text-[clamp(64px,18vw,270px)] bg-gradient-to-b from-white/[0.14] via-white/[0.06] to-transparent bg-clip-text text-transparent will-change-transform"
        >
          {settings.brandName.toLowerCase()}
        </motion.span>
      </div>
    </footer>
  );
};
