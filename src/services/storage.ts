import { Destination, ESIMPlan, Order, Coupon, FAQItem, ReviewItem, SupportTicket } from '../types';
import { INITIAL_DESTINATIONS } from '../data/destinations';
import { INITIAL_PLANS } from '../data/plans';
import { INITIAL_FAQS } from '../data/faq';
import { COMPATIBLE_DEVICES, INITIAL_REVIEWS, INITIAL_COUPONS } from '../data/compatibility';

const STORAGE_KEYS = {
  DESTINATIONS: 'esimora_destinations_v1',
  PLANS: 'esimora_plans_v1',
  ORDERS: 'esimora_orders_v1',
  COUPONS: 'esimora_coupons_v1',
  FAQS: 'esimora_faqs_v1',
  REVIEWS: 'esimora_reviews_v1',
  TICKETS: 'esimora_support_tickets_v1',
  CURRENT_USER: 'esimora_user_session_v1',
  SETTINGS: 'esimora_system_settings_v1',
};

// Seed initial orders so "My eSIMs" and Admin dashboard look full and realistic out-of-the-box
const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ord-8831',
    orderNumber: 'ESM-2026-8831',
    customerId: 'cust-demo-1',
    customerName: 'Alex Morgan',
    customerEmail: 'alex.traveler@example.com',
    customerPhone: '+1 (555) 234-5678',
    planId: 'japan-5gb-30d',
    planName: 'Japan Popular 5GB',
    destinationName: 'Japan',
    countryFlag: '🇯🇵',
    data: '5 GB',
    validityDays: 30,
    amount: 14.50,
    currency: 'USD',
    discountAmount: 0,
    paymentMethod: 'apple_pay',
    paymentStatus: 'paid',
    orderStatus: 'activated',
    purchaseDate: '2026-09-28T14:32:00Z',
    iccid: '8984040000008831092',
    lpaActivationCode: 'LPA:1$smdp.esimora.io$ACT-JP-88319-K98',
    activatedAt: '2026-10-01T08:15:00Z',
    dataUsedGB: 2.1,
    totalDataGB: 5.0,
    notes: 'In use in Tokyo'
  },
  {
    id: 'ord-9104',
    orderNumber: 'ESM-2026-9104',
    customerId: 'cust-demo-1',
    customerName: 'Alex Morgan',
    customerEmail: 'alex.traveler@example.com',
    customerPhone: '+1 (555) 234-5678',
    planId: 'regional-europe-10gb-30d',
    planName: 'Europe All-Inclusive 10GB',
    destinationName: 'Europe (35+ Countries)',
    countryFlag: '🇪🇺',
    data: '10 GB',
    validityDays: 30,
    amount: 22.50,
    currency: 'USD',
    discountAmount: 2.50,
    couponCode: 'WELCOME10',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    purchaseDate: '2026-10-04T19:10:00Z',
    iccid: '8984040000009104231',
    lpaActivationCode: 'LPA:1$smdp.esimora.io$ACT-EU-91042-M44',
    totalDataGB: 10.0,
    dataUsedGB: 0.0,
    notes: 'Ready to scan upon departure to London'
  }
];

export class AppStorage {
  private static getItem<T>(key: string, defaultValue: T): T {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
      return JSON.parse(stored) as T;
    } catch {
      return defaultValue;
    }
  }

  private static setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Dispatch storage event for real-time reactivity in current tab
      window.dispatchEvent(new CustomEvent('esimora_storage_change', { detail: { key } }));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  }

  // DESTINATIONS
  static getDestinations(): Destination[] {
    return this.getItem<Destination[]>(STORAGE_KEYS.DESTINATIONS, INITIAL_DESTINATIONS);
  }

  static saveDestinations(items: Destination[]): void {
    this.setItem(STORAGE_KEYS.DESTINATIONS, items);
  }

  static addDestination(dest: Destination): void {
    const list = this.getDestinations();
    list.unshift(dest);
    this.saveDestinations(list);
  }

  static updateDestination(dest: Destination): void {
    const list = this.getDestinations().map(d => (d.id === dest.id ? dest : d));
    this.saveDestinations(list);
  }

  static deleteDestination(id: string): void {
    const list = this.getDestinations().filter(d => d.id !== id);
    this.saveDestinations(list);
  }

  // PLANS
  static getPlans(): ESIMPlan[] {
    return this.getItem<ESIMPlan[]>(STORAGE_KEYS.PLANS, INITIAL_PLANS);
  }

  static savePlans(items: ESIMPlan[]): void {
    this.setItem(STORAGE_KEYS.PLANS, items);
  }

  static addPlan(plan: ESIMPlan): void {
    const list = this.getPlans();
    list.unshift(plan);
    this.savePlans(list);
  }

  static updatePlan(plan: ESIMPlan): void {
    const list = this.getPlans().map(p => (p.id === plan.id ? plan : p));
    this.savePlans(list);
  }

  static deletePlan(id: string): void {
    const list = this.getPlans().filter(p => p.id !== id);
    this.savePlans(list);
  }

  // ORDERS
  static getOrders(): Order[] {
    return this.getItem<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_DEMO_ORDERS);
  }

  static saveOrders(items: Order[]): void {
    this.setItem(STORAGE_KEYS.ORDERS, items);
  }

  static addOrder(order: Order): void {
    const list = this.getOrders();
    list.unshift(order);
    this.saveOrders(list);
  }

  static updateOrderStatus(orderId: string, status: Order['orderStatus']): void {
    const list = this.getOrders().map(o => (o.id === orderId ? { ...o, orderStatus: status } : o));
    this.saveOrders(list);
  }

  // COUPONS
  static getCoupons(): Coupon[] {
    return this.getItem<Coupon[]>(STORAGE_KEYS.COUPONS, INITIAL_COUPONS);
  }

  static saveCoupons(items: Coupon[]): void {
    this.setItem(STORAGE_KEYS.COUPONS, items);
  }

  static addCoupon(coupon: Coupon): void {
    const list = this.getCoupons();
    list.unshift(coupon);
    this.saveCoupons(list);
  }

  static updateCoupon(coupon: Coupon): void {
    const list = this.getCoupons().map(c => (c.id === coupon.id ? coupon : c));
    this.saveCoupons(list);
  }

  static deleteCoupon(id: string): void {
    const list = this.getCoupons().filter(c => c.id !== id);
    this.saveCoupons(list);
  }

  // FAQS
  static getFaqs(): FAQItem[] {
    return this.getItem<FAQItem[]>(STORAGE_KEYS.FAQS, INITIAL_FAQS);
  }

  static saveFaqs(items: FAQItem[]): void {
    this.setItem(STORAGE_KEYS.FAQS, items);
  }

  static addFaq(faq: FAQItem): void {
    const list = this.getFaqs();
    list.push(faq);
    this.saveFaqs(list);
  }

  static updateFaq(faq: FAQItem): void {
    const list = this.getFaqs().map(f => (f.id === faq.id ? faq : f));
    this.saveFaqs(list);
  }

  static deleteFaq(id: string): void {
    const list = this.getFaqs().filter(f => f.id !== id);
    this.saveFaqs(list);
  }

  // REVIEWS
  static getReviews(): ReviewItem[] {
    return this.getItem<ReviewItem[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
  }

  static saveReviews(items: ReviewItem[]): void {
    this.setItem(STORAGE_KEYS.REVIEWS, items);
  }

  static addReview(review: ReviewItem): void {
    const list = this.getReviews();
    list.unshift(review);
    this.saveReviews(list);
  }

  static updateReview(review: ReviewItem): void {
    const list = this.getReviews().map(r => (r.id === review.id ? review : r));
    this.saveReviews(list);
  }

  // SUPPORT TICKETS
  static getTickets(): SupportTicket[] {
    return this.getItem<SupportTicket[]>(STORAGE_KEYS.TICKETS, [
      {
        id: 'tkt-101',
        name: 'Carlos Mendez',
        email: 'carlos@example.com',
        orderNumber: 'ESM-2026-8831',
        category: 'Installation',
        message: 'Could you confirm if hotspot tethering is allowed in Kyoto for my iPad?',
        status: 'resolved',
        createdAt: '2026-10-02T11:20:00Z'
      }
    ]);
  }

  static addTicket(ticket: SupportTicket): void {
    const list = this.getTickets();
    list.unshift(ticket);
    this.setItem(STORAGE_KEYS.TICKETS, list);
  }

  static updateTicketStatus(id: string, status: SupportTicket['status']): void {
    const list = this.getTickets().map(t => (t.id === id ? { ...t, status } : t));
    this.setItem(STORAGE_KEYS.TICKETS, list);
  }
}
