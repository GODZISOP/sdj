import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, X, Menu } from 'lucide-react';
import { useSite } from '../store/siteStore';
import { EASE_EDITORIAL, SPRING_CRISP } from '../lib/motion';

export const Navbar: React.FC = () => {
  const { cart, setIsCartOpen, products, addToCart, settings } = useSite();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isHomeTop = location.pathname === '/' && !scrolled && !searchOpen && !mobileMenuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isHomeTop
          ? 'bg-[#A6AAB0]/85 backdrop-blur-md border-b border-black/[0.06]'
          : scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-black/[0.08] shadow-[0_8px_30px_-18px_rgba(0,0,0,0.16)]'
            : 'bg-white/95 backdrop-blur-sm border-b border-black/[0.06]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 h-[64px] md:h-[68px] grid grid-cols-3 items-center">
        {/* Left Navigation Links (matching editorial reference) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-[11px] font-semibold tracking-[0.13em] uppercase text-[#111111]">
          <button
            type="button"
            onClick={() => scrollToSection('equipment')}
            className="hover:text-[#002FA7] transition-colors"
          >
            Shop
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('compare')}
            className="hover:text-[#002FA7] transition-colors"
          >
            Collection
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('philosophy')}
            className="hover:text-[#002FA7] transition-colors"
          >
            About
          </button>
          <Link to="/contact#faqs" className="hover:text-[#002FA7] transition-colors">
            FAQs
          </Link>
          <Link
            to="/contact"
            className={`hover:text-[#002FA7] transition-colors ${
              location.pathname === '/contact' ? 'text-[#002FA7]' : ''
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Left Hamburger */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            aria-label="Toggle Menu"
            onClick={() => {
              setMobileMenuOpen((prev) => !prev);
              setSearchOpen(false);
            }}
            className="text-[#111111] hover:text-[#002FA7] transition-colors p-1.5 -ml-1.5"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Center Editorial Brand Wordmark (matching reference center logo) */}
        <div className="flex justify-center">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center gap-2 group"
          >
            <img
              src="/favicon.svg"
              alt={`${settings.brandName} Logo`}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-md transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-[16px] sm:text-[18px] font-extrabold tracking-[0.14em] uppercase text-[#111111]">
              {settings.brandName}
            </span>
          </Link>
        </div>

        {/* Right Utility Controls */}
        <div className="flex items-center justify-end gap-4 sm:gap-6">
          <button
            type="button"
            aria-label="Search collection"
            onClick={() => {
              setSearchOpen((prev) => !prev);
              setMobileMenuOpen(false);
            }}
            className="text-[#111111] hover:text-[#002FA7] transition-colors p-1"
          >
            <Search className="w-[17px] h-[17px]" strokeWidth={1.75} />
          </button>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className={`hidden sm:inline-block text-[11px] font-semibold tracking-[0.13em] uppercase transition-colors ${
              location.pathname === '/admin' ? 'text-[#002FA7]' : 'text-[#111111] hover:text-[#002FA7]'
            }`}
          >
            Account
          </Link>
          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            aria-label="Open Cart"
            onClick={() => setIsCartOpen(true)}
            className="relative text-[#111111] hover:text-[#002FA7] transition-colors p-1"
          >
            <ShoppingBag className="w-[17px] h-[17px]" strokeWidth={1.75} />
            <motion.span
              key={totalItems}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={SPRING_CRISP}
              className="absolute -top-0.5 -right-1.5 min-w-[16px] h-[16px] px-1 rounded-full bg-[#111111] text-white text-[10px] font-semibold flex items-center justify-center"
            >
              {totalItems}
            </motion.span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_EDITORIAL }}
            className="md:hidden overflow-hidden border-t border-black/[0.06] bg-white px-4 py-4 space-y-1"
          >
            <button
              type="button"
              onClick={() => scrollToSection('equipment')}
              className="w-full text-left px-3 py-3 text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#F5F6F8] hover:text-[#002FA7] transition-colors"
            >
              Shop Collection
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('compare')}
              className="w-full text-left px-3 py-3 text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#F5F6F8] hover:text-[#002FA7] transition-colors"
            >
              Compare
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('philosophy')}
              className="w-full text-left px-3 py-3 text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#F5F6F8] hover:text-[#002FA7] transition-colors"
            >
              About
            </button>
            <Link
              to="/contact#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-3 text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#F5F6F8] hover:text-[#002FA7] transition-colors"
            >
              FAQs
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-3 text-xs font-semibold uppercase tracking-[0.12em] hover:bg-[#F5F6F8] hover:text-[#002FA7] transition-colors"
            >
              Contact ({settings.phone})
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#002FA7] bg-[#F5F6F8]"
            >
              Account / Admin Panel →
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Expandable Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_EDITORIAL }}
            className="overflow-hidden border-t border-black/[0.06] bg-white px-4 sm:px-6 md:px-10 py-4"
          >
            <div className="max-w-[1360px] mx-auto">
              <div className="flex items-center gap-3 border-b border-black/20 pb-2">
                <Search className="w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search headphones, lamps, speakers, flasks, keyboards..."
                  className="w-full text-sm outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setQuery('');
                  }}
                  className="text-neutral-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {query.trim() && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {filteredProducts.length === 0 ? (
                    <p className="text-xs text-neutral-500">No objects matched "{query}".</p>
                  ) : (
                    filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-2.5 bg-[#F5F6F8] border border-black/[0.05]"
                      >
                        <Link
                          to={`/product/${p.id}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-3 min-w-0"
                        >
                          <img src={p.image} alt={p.name} className="w-10 h-10 object-cover bg-white flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold truncate">{p.name}</p>
                            <p className="text-[11px] text-neutral-500">${p.price}</p>
                          </div>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(p);
                            setSearchOpen(false);
                          }}
                          className="text-[11px] font-medium bg-[#002FA7] text-white px-2.5 py-1 hover:bg-[#00227A] flex-shrink-0"
                        >
                          Add
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
