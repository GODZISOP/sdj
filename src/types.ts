export type CategoryKey = 'Strength' | 'Conditioning' | 'Mobility' | 'Bodyweight' | 'Recovery';

export interface Product {
  id: string;
  name: string;
  category: CategoryKey;
  price: number;
  image: string;
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

export interface SiteSettings {
  brandName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  footerNote: string;
}
