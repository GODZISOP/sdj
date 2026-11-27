import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, ContactInquiry, FaqItem, OrderRecord, Product, SiteSettings } from '../types';

const STORAGE_KEYS = {
  PRODUCTS: 'sjdurallc_products_v6',
  SETTINGS: 'sjdurallc_settings_v6',
  INQUIRIES: 'sjdurallc_inquiries_v6',
  ORDERS: 'sjdurallc_orders_v6',
  CART: 'sjdurallc_cart_v6',
  FAQS: 'sjdurallc_faqs_v6',
};

export const DEFAULT_SETTINGS: SiteSettings = {
  brandName: 'Sjdurallc',
  companyLegalName: 'Sjdurallc Trading & Studio LLC',
  ownerName: 'Rana Javeed Akhter',
  tagline: 'Immersive sound, architectural objects, and precision studio gear curated for everyday living.',
  phone: '+966 53 097 8783',
  whatsapp: '+966 53 097 8783',
  email: 'info@sjdurallc.com',
  address: 'Riyadh Design District, Studio 04, Kingdom of Saudi Arabia',
  hours: 'Sun – Thu: 09:00 – 19:00 AST',
  footerNote: 'Sjdurallc — Curated architectural objects, precision audio, and everyday studio essentials.',
};

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Orders & Delivery',
    question: 'Do you deliver across Saudi Arabia and GCC?',
    answer:
      'Yes. Sjdurallc ships all audio, tech, home, and studio products across Riyadh, Jeddah, Dammam, and all GCC countries with tracked express delivery.',
  },
  {
    id: 'faq-2',
    category: 'Bulk & Corporate',
    question: 'Can we order custom corporate gifts or bulk office setups?',
    answer:
      'Absolutely. Contact Rana Javeed Akhter and our team at info@sjdurallc.com or +966 53 097 8783 for custom corporate gifting, desk setups, and wholesale pricing.',
  },
  {
    id: 'faq-3',
    category: 'Materials & Warranty',
    question: 'What warranty covers Sjdurallc products?',
    answer:
      'All headphones, audio, desk lighting, and machined metal products carry a 2-year to 5-year structural warranty against manufacturing defects.',
  },
  {
    id: 'faq-4',
    category: 'Support',
    question: 'How quickly does Sjdurallc respond to inquiries?',
    answer:
      'Our specialists respond to all email and Contact page inquiries within 1 business day (Sun–Thu, 09:00–19:00 AST).',
  },
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'aero-headphones',
    name: 'Aero One Headphone',
    category: 'Audio & Tech',
    price: 380,
    image: '/images/prod-headphones.jpg',
    hoverImage: '/images/prod-headphones-alt.jpg',
    trainingFocus: 'Active ANC / 45h',
    weightRange: '265 g',
    material: 'Anodized Aluminum & Memory Foam',
    bestFor: 'Immersive Everyday Listening',
    description: 'Immersive spatial sound, lightweight sculptural comfort, and intuitive tactile earcup controls.',
    inCompare: true,
  },
  {
    id: 'kinetix-lamp',
    name: 'Kinetix Desk Lamp',
    category: 'Home & Desk',
    price: 280,
    image: '/images/prod-lamp.jpg',
    hoverImage: '/images/prod-lamp-alt.jpg',
    trainingFocus: 'Warm LED / 3000K',
    weightRange: '1.8 kg',
    material: 'Brushed Stainless Steel',
    bestFor: 'Architects & Workspaces',
    description: 'Precision-machined brushed steel task lamp with stepless touch dimming and knurled cobalt pivot joint.',
    inCompare: true,
  },
  {
    id: 'cobalt-speaker',
    name: 'Cobalt Acoustic Speaker',
    category: 'Audio & Tech',
    price: 320,
    image: '/images/prod-speaker.jpg',
    hoverImage: '/images/prod-speaker-alt.jpg',
    trainingFocus: 'Hi-Fi Wireless / 24h',
    weightRange: '1.2 kg',
    material: 'Anodized Aluminum',
    bestFor: 'Studio & Home Audio',
    description: 'Compact anodized cobalt aluminum wireless speaker with knurled steel volume dial and 360-degree studio acoustics.',
    inCompare: true,
  },
  {
    id: 'thermo-flask',
    name: 'Thermo Cobalt Flask',
    category: 'Drinkware',
    price: 65,
    image: '/images/prod-tumbler.jpg',
    hoverImage: '/images/prod-tumbler-alt.jpg',
    trainingFocus: '24h Cold / 12h Hot',
    weightRange: '600 ml',
    material: '18/8 Stainless Steel',
    bestFor: 'Travel & Daily Carry',
    description: 'Double-wall vacuum-insulated travel tumbler finished in tactile matte cobalt powder coat with machined cap.',
    inCompare: false,
  },
  {
    id: 'monolith-keyboard',
    name: 'Monolith 75 Keyboard',
    category: 'Audio & Tech',
    price: 240,
    image: '/images/prod-keyboard.jpg',
    hoverImage: '/images/prod-keyboard-alt.jpg',
    trainingFocus: 'Hot-Swap / Tri-Mode',
    weightRange: '1.45 kg',
    material: 'CNC Silver Aluminum',
    bestFor: 'Creators & Developers',
    description: 'Gasket-mounted CNC aluminum mechanical keyboard with cobalt accent keycaps and knurled anodized rotary knob.',
    inCompare: false,
  },
  {
    id: 'vector-dumbbell',
    name: 'Vector Dumbbell',
    category: 'Strength',
    price: 340,
    image: '/images/cat-dumbbell.jpg',
    hoverImage: '/images/hero-dumbbell.jpg',
    trainingFocus: 'Sculptural Strength',
    weightRange: '2 – 20 kg',
    material: 'Machined Steel',
    bestFor: 'Home & Studio',
    description: 'Precision-turned solid stainless steel dumbbell with micro-knurled ergonomic grip and chamfered plates.',
    inCompare: false,
  },
];

const DEFAULT_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq-1',
    name: 'Tariq Al-Mansoor',
    email: 'tariq@studiofit.sa',
    phone: '+966 50 412 8890',
    subject: 'Corporate & Studio Order',
    message: 'Looking to order 20 Aero One Headphones and Kinetix Desk Lamps for our new Riyadh office.',
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

  // Auto-heal stale HMR state
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
