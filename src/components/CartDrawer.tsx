import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, CheckCircle2 } from 'lucide-react';
import { useSite } from '../store/siteStore';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateCartQty, removeFromCart, placeOrder } = useSite();
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmedId, setConfirmedId] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    const order = placeOrder({ name, email, phone });
    setConfirmedId(order.id);
    setCheckoutMode(false);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-[2px]">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
        <div className="px-6 py-5 border-b border-black/10 flex items-center justify-between">
          <h2 className="text-base font-bold tracking-tight">Your Studio Bag</h2>
          <button
            type="button"
            onClick={() => {
              setIsCartOpen(false);
              setConfirmedId(null);
            }}
            className="p-1 text-neutral-500 hover:text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {confirmedId ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#002FA7] mx-auto" />
              <h3 className="text-lg font-bold">Order Received</h3>
              <p className="text-sm text-neutral-600">
                Reference <span className="font-mono font-semibold text-black">{confirmedId}</span> has been logged in the Admin Panel.
              </p>
              <button
                type="button"
                onClick={() => {
                  setConfirmedId(null);
                  setIsCartOpen(false);
                }}
                className="mt-4 bg-[#002FA7] text-white text-xs font-semibold px-6 py-3 hover:bg-[#00227A]"
              >
                Continue Exploring
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 text-sm">
              Your studio bag is currently empty.
            </div>
          ) : checkoutMode ? (
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
              <p className="eyebrow-mono text-[#002FA7]">Studio Checkout</p>
              <div>
                <label className="block text-xs font-medium mb-1">Full Name *</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-[#002FA7]"
                  placeholder="Alex Morgan"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Email *</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-[#002FA7]"
                  placeholder="you@domain.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-[#002FA7]"
                  placeholder="+966 5X XXX XXXX"
                />
              </div>
            </form>
          ) : (
            cart.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 pb-4 border-b border-black/[0.06]">
                <div className="w-20 h-20 bg-[#F5F6F8] flex-shrink-0 flex items-center justify-center p-2">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold truncate">{product.name}</h4>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="text-neutral-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">{product.material}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center border border-black/15">
                      <button
                        type="button"
                        onClick={() => updateCartQty(product.id, -1)}
                        className="p-1.5 hover:bg-neutral-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-medium">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQty(product.id, 1)}
                        className="p-1.5 hover:bg-neutral-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-sm font-semibold">${product.price * quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && !confirmedId && (
          <div className="p-6 border-t border-black/10 bg-[#F5F6F8] space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">Subtotal</span>
              <span className="text-base font-bold">${subtotal}</span>
            </div>
            {checkoutMode ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutMode(false)}
                  className="w-1/3 border border-black/20 bg-white py-3 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-2/3 bg-[#002FA7] text-white py-3 text-xs font-semibold hover:bg-[#00227A]"
                >
                  Confirm Order
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setCheckoutMode(true)}
                className="w-full bg-[#002FA7] text-white py-3.5 text-xs font-semibold tracking-wide hover:bg-[#00227A] transition-colors"
              >
                Proceed to Checkout →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
