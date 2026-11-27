export type CategoryKey =
  | 'Home & Desk'
  | 'Audio & Tech'
  | 'Drinkware'
  | 'Strength'
  | 'Lifestyle';

export interface Product {
  id: string;
  name: string;
  category: CategoryKey;
  price: number;
  image: string;
  hoverImage: string;
  trainingFocus: string;
  weightRange: string;
  material: string;
  bestFor: string;
  description: string;
  inCompare?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Reviewed' | 'Resolved';
}

export interface OrderRecord {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  createdAt: string;
  status: 'Pending' | 'Confirmed' | 'Shipped';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SiteSettings {
  brandName: string;
  companyLegalName: string;
  ownerName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  footerNote: string;
}
