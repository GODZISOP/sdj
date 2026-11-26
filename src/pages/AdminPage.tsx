import React, { useState } from 'react';
import {
  Package,
  MessageSquare,
  Settings,
  ShoppingBag,
  Plus,
  Trash2,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { useSite } from '../store/siteStore';
import { CategoryKey } from '../types';

type TabKey = 'settings' | 'products' | 'inquiries' | 'orders';

export const AdminPage: React.FC = () => {
  const {
    products,
    settings,
    inquiries,
    orders,
    updateSettings,
    addProduct,
    deleteProduct,
    updateInquiryStatus,
    deleteInquiry,
    updateOrderStatus,
  } = useSite();

  const [tab, setTab] = useState<TabKey>('settings');
  const [formSettings, setFormSettings] = useState(settings);
  const [savedBanner, setSavedBanner] = useState(false);

  // New Product state
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'Strength' as CategoryKey,
    price: 250,
    image: '/images/cat-dumbbell.jpg',
    trainingFocus: 'Strength',
    weightRange: '4 – 24 kg',
    material: 'Machined Steel',
    bestFor: 'Full-body Training',
    description: '',
    inCompare: false,
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formSettings);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name.trim()) return;
    addProduct(newProd);
    setNewProd({
      name: '',
      category: 'Strength',
      price: 250,
      image: '/images/cat-dumbbell.jpg',
      trainingFocus: 'Strength',
      weightRange: '4 – 24 kg',
      material: 'Machined Steel',
      bestFor: 'Full-body Training',
      description: '',
      inCompare: false,
    });
  };

  return (
    <main className="bg-[#F5F6F8] min-h-[82vh] py-12">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-black/10">
          <div>
            <div className="inline-flex items-center gap-2 text-[#002FA7] eyebrow-mono mb-1">
              <ShieldCheck className="w-4 h-4" />
              ADMIN PANEL
            </div>
            <h1 className="text-3xl font-extrabold swiss-tracking">Studio Management Console</h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTab('settings')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                tab === 'settings'
                  ? 'bg-[#002FA7] text-white'
                  : 'bg-white text-neutral-700 border border-black/10 hover:border-black/30'
              }`}
            >
              <Settings className="w-4 h-4" />
              Contact & Footer
            </button>
            <button
              type="button"
              onClick={() => setTab('products')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                tab === 'products'
                  ? 'bg-[#002FA7] text-white'
                  : 'bg-white text-neutral-700 border border-black/10 hover:border-black/30'
              }`}
            >
              <Package className="w-4 h-4" />
              Products ({products.length})
            </button>
            <button
              type="button"
              onClick={() => setTab('inquiries')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                tab === 'inquiries'
                  ? 'bg-[#002FA7] text-white'
                  : 'bg-white text-neutral-700 border border-black/10 hover:border-black/30'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Inquiries ({inquiries.length})
            </button>
            <button
              type="button"
              onClick={() => setTab('orders')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                tab === 'orders'
                  ? 'bg-[#002FA7] text-white'
                  : 'bg-white text-neutral-700 border border-black/10 hover:border-black/30'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Orders ({orders.length})
            </button>
          </div>
        </div>

        {/* TAB 1: CONTACT & FOOTER SETTINGS */}
        {tab === 'settings' && (
          <div className="mt-8 bg-white border border-black/10 p-8 max-w-3xl">
            <h2 className="text-lg font-bold mb-1">Contact Page & Footer Configuration</h2>
            <p className="text-xs text-neutral-500 mb-6">
              Changes saved here update the website Footer and Contact page immediately.
            </p>

            {savedBanner && (
              <div className="mb-6 bg-[#002FA7]/10 border border-[#002FA7]/30 text-[#002FA7] px-4 py-3 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                Settings saved and applied live to Footer & Contact Page.
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Phone Number (Footer & Contact)</label>
                  <input
                    value={formSettings.phone}
                    onChange={(e) => setFormSettings({ ...formSettings, phone: e.target.value })}
                    className="w-full border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:border-[#002FA7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Contact Email (Footer & Contact)</label>
                  <input
                    type="email"
                    value={formSettings.email}
                    onChange={(e) => setFormSettings({ ...formSettings, email: e.target.value })}
                    className="w-full border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:border-[#002FA7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">Studio Address</label>
                <input
                  value={formSettings.address}
                  onChange={(e) => setFormSettings({ ...formSettings, address: e.target.value })}
                  className="w-full border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:border-[#002FA7]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">Business Hours</label>
                <input
                  value={formSettings.hours}
                  onChange={(e) => setFormSettings({ ...formSettings, hours: e.target.value })}
                  className="w-full border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:border-[#002FA7]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5">Footer Brand Note</label>
                <textarea
                  rows={3}
                  value={formSettings.footerNote}
                  onChange={(e) => setFormSettings({ ...formSettings, footerNote: e.target.value })}
                  className="w-full border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:border-[#002FA7]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#002FA7] hover:bg-[#00227A] text-white text-xs font-semibold px-6 py-3 transition-colors"
              >
                Save Contact & Footer Settings
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGER */}
        {tab === 'products' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white border border-black/10 p-6 h-fit">
              <h2 className="text-base font-bold mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#002FA7]" />
                Add New Equipment
              </h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Product Name *</label>
                  <input
                    required
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    placeholder="e.g. Precision Barbell"
                    className="w-full border border-black/15 px-3 py-2 text-sm outline-none focus:border-[#002FA7]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Category</label>
                    <select
                      value={newProd.category}
                      onChange={(e) =>
                        setNewProd({ ...newProd, category: e.target.value as CategoryKey })
                      }
                      className="w-full border border-black/15 px-3 py-2 text-sm bg-white outline-none focus:border-[#002FA7]"
                    >
                      <option value="Strength">Strength</option>
                      <option value="Conditioning">Conditioning</option>
                      <option value="Mobility">Mobility</option>
                      <option value="Bodyweight">Bodyweight</option>
                      <option value="Recovery">Recovery</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Price (USD)</label>
                    <input
                      type="number"
                      min={1}
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                      className="w-full border border-black/15 px-3 py-2 text-sm outline-none focus:border-[#002FA7]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Material</label>
                    <input
                      value={newProd.material}
                      onChange={(e) => setNewProd({ ...newProd, material: e.target.value })}
                      className="w-full border border-black/15 px-3 py-2 text-sm outline-none focus:border-[#002FA7]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Weight Range</label>
                    <input
                      value={newProd.weightRange}
                      onChange={(e) => setNewProd({ ...newProd, weightRange: e.target.value })}
                      className="w-full border border-black/15 px-3 py-2 text-sm outline-none focus:border-[#002FA7]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={newProd.description}
                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                    className="w-full border border-black/15 px-3 py-2 text-sm outline-none focus:border-[#002FA7]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#002FA7] hover:bg-[#00227A] text-white text-xs font-semibold py-2.5 transition-colors"
                >
                  Add Product to Catalog
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-black/10 p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 object-contain bg-[#F5F6F8] p-1.5"
                    />
                    <div>
                      <p className="eyebrow-mono text-[#002FA7]">{p.category}</p>
                      <h3 className="text-sm font-bold">{p.name}</h3>
                      <p className="text-xs text-neutral-500">
                        ${p.price} · {p.material} · {p.weightRange}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteProduct(p.id)}
                    className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT INQUIRIES INBOX */}
        {tab === 'inquiries' && (
          <div className="mt-8 space-y-4">
            {inquiries.length === 0 ? (
              <div className="bg-white border border-black/10 p-10 text-center text-sm text-neutral-500">
                No contact inquiries yet.
              </div>
            ) : (
              inquiries.map((inq) => (
                <div key={inq.id} className="bg-white border border-black/10 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <span className="eyebrow-mono text-[#002FA7]">{inq.subject}</span>
                      <h3 className="text-base font-bold mt-1">{inq.name}</h3>
                      <p className="text-xs text-neutral-500">
                        {inq.email} {inq.phone ? `· ${inq.phone}` : ''} ·{' '}
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          updateInquiryStatus(inq.id, e.target.value as typeof inq.status)
                        }
                        className="border border-black/15 px-2.5 py-1.5 text-xs font-medium bg-white"
                      >
                        <option value="New">New</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => deleteInquiry(inq.id)}
                        className="p-1.5 text-neutral-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-neutral-700 leading-relaxed bg-[#F5F6F8] p-4">
                    {inq.message}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: ORDERS */}
        {tab === 'orders' && (
          <div className="mt-8 space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white border border-black/10 p-10 text-center text-sm text-neutral-500">
                No orders placed yet. Add items to the Studio Bag to test checkout.
              </div>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="bg-white border border-black/10 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#002FA7]">{ord.id}</span>
                      <h3 className="text-base font-bold">{ord.customerName}</h3>
                      <p className="text-xs text-neutral-500">
                        {ord.customerEmail} {ord.customerPhone ? `· ${ord.customerPhone}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold">${ord.total}</span>
                      <select
                        value={ord.status}
                        onChange={(e) =>
                          updateOrderStatus(ord.id, e.target.value as typeof ord.status)
                        }
                        className="border border-black/15 px-2.5 py-1.5 text-xs font-medium bg-white"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                      </select>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1 text-xs text-neutral-600">
                    {ord.items.map((item, idx) => (
                      <li key={idx}>
                        {item.quantity} × {item.name} (${item.price} each)
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
};
