import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, X } from 'lucide-react';
import { useSite } from '../store/siteStore';

export const Navbar: React.FC = () => {
  const { cart, setIsCartOpen, products, addToCart, settings } = useSite();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const scrollToSection = (id: string) => {
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-black/[0.06]">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
        {/* Stacked Brand Wordmark */}
        <Link to="/" className="leading-[0.95] tracking-[-0.03em] font-bold text-[19px] text-[#111111]">
          <span className="block">{settings.brandName}</span>
          <span className="block text-[11px] font-mono uppercase tracking-[0.14em] text-[#002FA7] mt-0.5">
            Studio®
          </span>
        </Link>

        {/* Centered Navigation */}
        <nav className="hidden md:flex items-center gap-9 text-[13px] font-medium text-[#111111]">
          <button
            type="button"
            onClick={() => scrollToSection('equipment')}
            className="hover:text-[#002FA7] transition-colors"
          >
            Equipment
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('programs')}
            className="hover:text-[#002FA7] transition-colors"
          >
            Programs
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('compare')}
            className="hover:text-[#002FA7] transition-colors"
          >
            Compare
          </button>
          <Link
            to="/contact#faqs"
            className="hover:text-[#002FA7] transition-colors"
          >
            FAQs
          </Link>
          <Link
            to="/contact"
            className={`hover:text-[#002FA7] transition-colors ${
              location.pathname === '/contact' ? 'text-[#002FA7] font-semibold' : ''
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Utility Icons */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-label="Search equipment"
            onClick={() => setSearchOpen((prev) => !prev)}
            className="text-[#111111] hover:text-[#002FA7] transition-colors"
          >
            <Search className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </button>
          <Link
            to="/admin"
            aria-label="Admin Panel"
            title="Admin Panel"
            className={`transition-colors ${
              location.pathname === '/admin' ? 'text-[#002FA7]' : 'text-[#111111] hover:text-[#002FA7]'
            }`}
          >
            <User className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </Link>
          <button
            type="button"
            aria-label="Open Cart"
            onClick={() => setIsCartOpen(true)}
            className="relative text-[#111111] hover:text-[#002FA7] transition-colors"
          >
            <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.75} />
            <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-[#002FA7] text-white text-[10px] font-semibold flex items-center justify-center">
              {totalItems}
            </span>
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="border-t border-black/[0.06] bg-white px-6 md:px-10 py-4 animate-fade-up">
          <div className="max-w-[1360px] mx-auto">
            <div className="flex items-center gap-3 border-b border-black/20 pb-2">
              <Search className="w-4 h-4 text-neutral-400" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dumbbells, kettlebells, mobility mats..."
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
                  <p className="text-xs text-neutral-500">No equipment matched "{query}".</p>
                ) : (
                  filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-2.5 bg-[#F5F6F8] border border-black/[0.05]"
                    >
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-contain bg-white" />
                        <div>
                          <p className="text-xs font-semibold">{p.name}</p>
                          <p className="text-[11px] text-neutral-500">${p.price}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(p);
                          setSearchOpen(false);
                        }}
                        className="text-[11px] font-medium bg-[#002FA7] text-white px-2.5 py-1 hover:bg-[#00227A]"
                      >
                        Add
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
