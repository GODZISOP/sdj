import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, ContactInquiry, FaqItem, OrderRecord, Product, SiteSettings } from '../types';

const STORAGE_KEYS = {
  PRODUCTS: 'sjdurallc_products_v2',
  SETTINGS: 'sjdurallc_settings_v2',
  INQUIRIES: 'sjdurallc_inquiries_v2',
  ORDERS: 'sjdurallc_orders_v2',
  CART: 'sjdurallc_cart_v2',
  FAQS: 'sjdurallc_faqs_v2',
};

export const DEFAULT_SETTINGS: SiteSettings = {
  brandName: 'Sjdurallc',
  companyLegalName: 'Sjdurallc Fitness & Studio Equipment',
  ownerName: 'Rana Javeed Akhter',
  tagline: 'Sculptural, performance-driven gear for a stronger, more balanced you.',
  phone: '+966 53 097 8783',
  whatsapp: '+966 53 097 8783',
  email: 'info@sjdurallc.com',
  address: 'Riyadh Design District, Studio 04, Kingdom of Saudi Arabia',
  hours: 'Sun – Thu: 09:00 – 19:00 AST',
  footerNote: 'Sjdurallc — Precision-machined studio equipment engineered for longevity, balance, and architectural calm.',
};

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Orders & Delivery',
    question: 'Do you deliver across Saudi Arabia and GCC?',
    answer:
      'Yes. Sjdurallc ships studio equipment across Riyadh, Jeddah, Dammam, and all GCC countries with white-glove studio installation available for commercial orders.',
  },
  {
    id: 'faq-2',
    category: 'Commercial Studios',
    question: 'Can we request custom weights or studio outfitting?',
    answer:
      'Absolutely. Contact Rana Javeed Akhter and our team at info@sjdurallc.com or +966 53 097 8783 for tailored commercial gym packages, custom laser-engraved branding, and volume pricing.',
  },
  {
    id: 'faq-3',
    category: 'Materials & Warranty',
    question: 'What warranty covers Sjdurallc machined steel and cast iron gear?',
    answer:
      'All Vector Dumbbells and Core Kettlebells carry a 5-year structural warranty against manufacturing defects. Beechwood Flow Rings and mats include a 2-year studio warranty.',
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
    id: 'vector-dumbbell',
    name: 'Vector Dumbbell',
    category: 'Strength',
    price: 340,
    image: '/images/cat-dumbbell.jpg',
    trainingFocus: 'Strength',
    weightRange: '2 – 20 kg',
    material: 'Machined Steel',
    bestFor: 'Full-body Training',
    description: 'Precision-turned solid stainless steel dumbbell with micro-knurled ergonomic grip and architectural chamfered plates.',
    inCompare: true,
  },
  {
    id: 'core-kettlebell',
    name: 'Core Kettlebell',
    category: 'Conditioning',
    price: 220,
    image: '/images/cat-kettlebell.jpg',
    trainingFocus: 'Power & Conditioning',
    weightRange: '8 – 32 kg',
    material: 'Coated Cast Iron',
    bestFor: 'HIIT & Power',
    description: 'Single-pour cast iron kettlebell finished in matte cobalt tactile polymer for balanced swing dynamics.',
    inCompare: true,
  },
  {
    id: 'studio-mat',
    name: 'Studio Mobility Mat',
    category: 'Mobility',
    price: 145,
    image: '/images/cat-mat.jpg',
    trainingFocus: 'Mobility & Core',
    weightRange: '2.4 kg (6mm)',
    material: 'Natural Tree Rubber',
    bestFor: 'Floorwork & Recovery',
    description: 'High-density natural rubber mat with cobalt open-cell grip surface engineered for zero slip under load.',
    inCompare: false,
  },
  {
    id: 'flow-rings',
    name: 'Flow Rings',
    category: 'Bodyweight',
    price: 165,
    image: '/images/cat-rings.jpg',
    trainingFocus: 'Bodyweight & Control',
    weightRange: '—',
    material: 'FSC™ Beech Wood',
    bestFor: 'Strength & Mobility',
    description: 'Hand-sanded FSC-certified beechwood gymnastic rings paired with numbered cobalt tension straps.',
    inCompare: true,
  },
  {
    id: 'balance-dome',
    name: 'Axis Balance Dome',
    category: 'Recovery',
    price: 195,
    image: '/images/cat-dome.jpg',
    trainingFocus: 'Stability & Recovery',
    weightRange: '5.5 kg',
    material: 'Recycled Elastomer',
    bestFor: 'Joint Stability',
    description: 'Dual-density balance dome with machined cobalt base ring for proprioceptive conditioning and active recovery.',
    inCompare: false,
  },
];

const DEFAULT_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq-1',
    name: 'Tariq Al-Mansoor',
    email: 'tariq@studiofit.sa',
    phone: '+966 50 412 8890',
    subject: 'Commercial Studio Outfitting',
    message: 'Looking to outfit a boutique 12-station strength studio in Riyadh with Vector Dumbbells and Core Kettlebells.',
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

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() =>
    loadFromStorage(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS)
  );
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
