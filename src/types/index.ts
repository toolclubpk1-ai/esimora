export type Region =
  | 'North America'
  | 'Europe'
  | 'Asia'
  | 'Middle East'
  | 'Latin America'
  | 'Oceania'
  | 'Africa'
  | 'Global';

export interface Destination {
  id: string;
  name: string;
  slug: string;
  code: string;
  flag: string;
  region: Region;
  startingPrice: number;
  description: string;
  popular: boolean;
  featured: boolean;
  networks: string[];
  bannerColor?: string;
  iso2: string;
  tag?: 'Popular' | 'Best Seller' | 'Trending';
  imageUrl?: string;
  landmarkName?: string;
}

export interface ESIMPlan {
  id: string;
  destinationId: string;
  destinationName: string;
  countryFlag: string;
  name: string;
  data: string; // e.g. "5 GB", "Unlimited"
  validityDays: number;
  price: number;
  originalPrice?: number;
  currency: string;
  isUnlimited: boolean;
  speed: string; // "5G / 4G LTE"
  hotspot: boolean;
  networkInfo: string;
  activationPolicy: string;
  features: string[];
  status: 'active' | 'inactive';
  isPopular?: boolean;
  isBestValue?: boolean;
}

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'delivered'
  | 'activated'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  planId: string;
  planName: string;
  destinationName: string;
  countryFlag: string;
  data: string;
  validityDays: number;
  amount: number;
  currency: string;
  discountAmount: number;
  couponCode?: string;
  paymentMethod: 'card' | 'apple_pay' | 'google_pay' | 'paypal';
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  purchaseDate: string;
  iccid: string;
  lpaActivationCode: string;
  qrCodeSvgData?: string;
  activatedAt?: string;
  dataUsedGB?: number;
  totalDataGB?: number;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
  totalOrders: number;
  totalSpend: number;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number; // e.g., 10 for 10% or 5 for $5
  minOrder: number;
  expiryDate: string;
  usageLimit: number;
  timesUsed: number;
  isActive: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'installation' | 'compatibility' | 'billing' | 'troubleshooting';
  order: number;
}

export interface ReviewItem {
  id: string;
  customerName: string;
  country: string;
  destination: string;
  rating: number;
  text: string;
  date: string;
  published: boolean;
  verifiedTrip?: boolean;
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  orderNumber?: string;
  category: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
}

export interface CurrencyConfig {
  code: string;
  symbol: string;
  rate: number; // multiplier against USD
}

export interface CompatibleDevice {
  brand: string;
  popularModels: string[];
  instructions: string;
}
