import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, ContactInquiry, FaqItem, OrderRecord, Product, SiteSettings } from '../types';

const STORAGE_KEYS = {
  PRODUCTS: 'sjdurallc_products_v7',
  SETTINGS: 'sjdurallc_settings_v7',
  INQUIRIES: 'sjdurallc_inquiries_v7',
  ORDERS: 'sjdurallc_orders_v7',
  CART: 'sjdurallc_cart_v7',
  FAQS: 'sjdurallc_faqs_v7',
};

export const DEFAULT_SETTINGS: SiteSettings = {
  brandName: 'Sjdurallc',
  companyLegalName: 'Sjdurallc Wholesale & Trading LLC',
  ownerName: 'Rana Javeed Akhter',
  tagline: 'Reliable wholesale supply, bulk orders, and quality products for stores and online sellers.',
  phone: '+966 53 097 8783',
  whatsapp: '+966 53 097 8783',
  email: 'info@sjdurallc.com',
  address: 'Riyadh Business District, Office 04, Kingdom of Saudi Arabia',
  hours: 'Sun – Thu: 09:00 – 19:00 AST',
  footerNote: 'Sjdurallc helps stores, resellers, and business buyers source quality products in bulk at fair wholesale prices with fast shipping.',
};

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Bulk Orders',
    question: 'How can I place a wholesale or bulk order?',
    answer:
      'Contact Rana Javeed Akhter at info@sjdurallc.com or +966 53 097 8783 with the products and quantity you need. We will send you clear wholesale pricing within 24 hours.',
  },
  {
    id: 'faq-2',
    category: 'Business Buyers',
    question: 'Do you supply retail shops and online sellers?',
    answer:
      'Yes. Sjdurallc works with retail stores, corporate buyers, and online sellers to provide steady stock, clean invoices, and honest wholesale rates.',
  },
  {
    id: 'faq-3',
    category: 'Shipping',
    question: 'How fast do you pack and deliver orders?',
    answer:
      'Every order is checked, safely packed, and shipped with full tracking across Saudi Arabia, GCC, and international locations.',
  },
  {
    id: 'faq-4',
    category: 'Product Quality',
    question: 'Are all products original and quality checked?',
    answer:
      'Yes. We source directly from trusted makers and check every batch before shipping so your customers receive reliable, ready-to-sell items.',
  },
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'aero-headphones',
    name: 'Aero One Headphones',
    category: 'Audio & Tech',
    price: 380,
    image: '/images/prod-headphones.jpg',
    hoverImage: '/images/prod-headphones-alt.jpg',
    trainingFocus: 'Noise Control · 45h Battery',
    weightRange: '265 g · Bulk Ready',
    material: 'Strong Aluminum & Soft Foam',
    bestFor: 'Retail & Online Stores',
    description: 'Clear sound, soft ear pads, and long battery life. Ready for single orders or bulk wholesale supply.',
    inCompare: true,
  },
  {
    id: 'kinetix-lamp',
    name: 'Kinetix LED Desk Lamp',
    category: 'Home & Desk',
    price: 280,
    image: '/images/prod-lamp.jpg',
    hoverImage: '/images/prod-lamp-alt.jpg',
    trainingFocus: 'Warm LED · Touch Control',
    weightRange: '1.8 kg · Box Packed',
    material: 'Brushed Stainless Steel',
    bestFor: 'Home & Office Buyers',
    description: 'Bright, warm desk light with easy touch dimming and a strong metal base built for everyday use.',
    inCompare: true,
  },
  {
    id: 'cobalt-speaker',
    name: 'Cobalt Wireless Speaker',
    category: 'Audio & Tech',
    price: 320,
    image: '/images/prod-speaker.jpg',
    hoverImage: '/images/prod-speaker-alt.jpg',
    trainingFocus: 'Clear Sound · 24h Play',
    weightRange: '1.2 kg · Bulk Ready',
    material: 'Strong Metal Body',
    bestFor: 'Electronics Retailers',
    description: 'Loud, clear wireless speaker with easy dial control and a strong compact body for home or travel.',
    inCompare: true,
  },
  {
    id: 'thermo-flask',
    name: 'Thermo Insulated Flask',
    category: 'Drinkware',
    price: 65,
    image: '/images/prod-tumbler.jpg',
    hoverImage: '/images/prod-tumbler-alt.jpg',
    trainingFocus: '24h Cold · 12h Hot',
    weightRange: '600 ml · Case Packs',
    material: 'Food-Grade Stainless Steel',
    bestFor: 'Daily Travel & Gifting',
    description: 'Double-wall stainless steel bottle that keeps drinks cold all day. Popular fast-moving wholesale item.',
    inCompare: false,
  },
  {
    id: 'monolith-keyboard',
    name: 'Monolith 75 Keyboard',
    category: 'Audio & Tech',
    price: 240,
    image: '/images/prod-keyboard.jpg',
    hoverImage: '/images/prod-keyboard-alt.jpg',
    trainingFocus: 'Wireless · Smooth Keys',
    weightRange: '1.45 kg · Box Packed',
    material: 'Solid Aluminum Frame',
    bestFor: 'Work & Gaming Shops',
    description: 'Strong metal wireless keyboard with smooth, quiet keys and an easy volume dial for daily work.',
    inCompare: false,
  },
  {
    id: 'vector-dumbbell',
    name: 'Vector Steel Dumbbell',
    category: 'Strength',
    price: 340,
    image: '/images/cat-dumbbell.jpg',
    hoverImage: '/images/hero-dumbbell.jpg',
    trainingFocus: 'Solid Grip · Rust Free',
    weightRange: '2 – 20 kg · Bulk Sets',
    material: 'Solid Machined Steel',
    bestFor: 'Fitness & Sports Stores',
    description: 'Heavy-duty solid steel dumbbell with a safe non-slip grip, great for home use and bulk gym supply.',
    inCompare: false,
  },
];

const DEFAULT_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq-1',
    name: 'Tariq Al-Mansoor',
    email: 'tariq@retailhub.sa',
    phone: '+966 50 412 8890',
    subject: 'Wholesale Bulk Quote',
    message: 'Hi, we would like wholesale pricing for 50 Aero One Headphones and 40 Thermo Insulated Flasks for our Riyadh store.',
    createdAt: '2026-11-24T10:15:00Z',
    status: 'New',
  },
];

interface SiteContextValue {
  products: Product[];
  settings: SiteSettings;
  inquiries: ContactInquiry[];
  orders: OrderRecord[];
  faqs: FaqItem[];
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQty: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  placeOrder: (customer: { name: string; email: string; phone: string }) => OrderRecord;
  updateSettings: (next: SiteSettings) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  submitInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: ContactInquiry['status']) => void;
  deleteInquiry: (id: string) => void;
  updateOrderStatus: (id: string, status: OrderRecord['status']) => void;
  addFaq: (faq: Omit<FaqItem, 'id'>) => void;
  deleteFaq: (id: string) => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function sanitizeProducts(list: Product[]): Product[] {
  const defaultMap = new Map(DEFAULT_PRODUCTS.map((p) => [p.id, p]));
  const hasAero = list.some((p) => p.id === 'aero-headphones');
  const base = hasAero ? list : [DEFAULT_PRODUCTS[0], ...list];
  return base.map((p) => {
    const def = defaultMap.get(p.id);
    const hasDeadSvg = typeof p.image === 'string' && p.image.endsWith('.svg');
    const missingHover = !p.hoverImage || p.hoverImage.endsWith('.svg');
    if (def && (hasDeadSvg || missingHover)) {
      return {
        ...p,
        image: def.image,
        hoverImage: def.hoverImage,
      };
    }
    return p;
  });
}

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() =>
    sanitizeProducts(loadFromStorage(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS))
  );

  useEffect(() => {
    const needsHeal =
      !products.some((p) => p.id === 'aero-headphones') ||
      products.some(
        (p) =>
          (typeof p.image === 'string' && p.image.endsWith('.svg')) ||
          !p.hoverImage ||
          p.hoverImage.endsWith('.svg')
      );
    if (needsHeal) {
      setProducts((prev) => sanitizeProducts(prev));
    }
  }, [products]);

  const [settings, setSettings] = useState<SiteSettings>(() =>
    loadFromStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)
  );
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() =>
    loadFromStorage(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES)
  );
  const [orders, setOrders] = useState<OrderRecord[]>(() =>
    loadFromStorage(STORAGE_KEYS.ORDERS, [])
  );
  const [faqs, setFaqs] = useState<FaqItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.FAQS, DEFAULT_FAQS)
  );
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.CART, [])
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (customer: { name: string; email: string; phone: string }): OrderRecord => {
    const order: OrderRecord = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      items: cart.map((c) => ({
        name: c.product.name,
        quantity: c.quantity,
        price: c.product.price,
      })),
      total: cart.reduce((sum, c) => sum + c.product.price * c.quantity, 0),
      createdAt: new Date().toISOString(),
      status: 'Pending',
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    return order;
  };

  const updateSettings = (next: SiteSettings) => setSettings(next);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const submitInquiry = (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInq: ContactInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    setInquiries((prev) => [newInq, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: ContactInquiry['status']) => {
    setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)));
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  const updateOrderStatus = (id: string, status: OrderRecord['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const addFaq = (faq: Omit<FaqItem, 'id'>) => {
    setFaqs((prev) => [...prev, { ...faq, id: `faq-${Date.now()}` }]);
  };

  const deleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <SiteContext.Provider
      value={{
        products,
        settings,
        inquiries,
        orders,
        faqs,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        placeOrder,
        updateSettings,
        addProduct,
        updateProduct,
        deleteProduct,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        updateOrderStatus,
        addFaq,
        deleteFaq,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside SiteProvider');
  return ctx;
}
