/**
 * Analytics integration layer for ESIMORA
 * Supports Google Analytics 4, Google Tag Manager, and Meta Pixel.
 * IDs are configurable via environment variables or admin settings.
 */

export type AnalyticsEventType =
  | 'PageView'
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'BeginCheckout'
  | 'Purchase';

export interface AnalyticsPayload {
  [key: string]: any;
}

class AnalyticsManager {
  private gaId: string = import.meta.env.VITE_GA_TRACKING_ID || '';
  private pixelId: string = import.meta.env.VITE_META_PIXEL_ID || '';

  constructor() {
    this.initProviders();
  }

  private initProviders() {
    // Graceful initialization hook
    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
    }
  }

  track(event: AnalyticsEventType, data?: AnalyticsPayload) {
    if (typeof window === 'undefined') return;

    // Push to Google Tag Manager dataLayer
    const dataLayer = (window as any).dataLayer;
    if (dataLayer) {
      dataLayer.push({
        event,
        ...data,
        timestamp: new Date().toISOString()
      });
    }

    // Console logging in dev for clear verification
    if (import.meta.env.DEV) {
      console.log(`[Analytics Event: ${event}]`, data);
    }
  }

  trackPageView(pageName: string, path: string) {
    this.track('PageView', { page_title: pageName, page_location: path });
  }

  trackSearch(query: string, resultCount: number) {
    this.track('Search', { search_term: query, results: resultCount });
  }

  trackViewContent(planId: string, planName: string, destination: string, price: number) {
    this.track('ViewContent', {
      content_ids: [planId],
      content_name: planName,
      content_category: destination,
      value: price,
      currency: 'USD'
    });
  }

  trackAddToCart(planId: string, planName: string, destination: string, price: number) {
    this.track('AddToCart', {
      content_ids: [planId],
      content_name: planName,
      content_category: destination,
      value: price,
      currency: 'USD'
    });
  }

  trackBeginCheckout(planId: string, planName: string, price: number) {
    this.track('BeginCheckout', {
      content_ids: [planId],
      content_name: planName,
      value: price,
      currency: 'USD'
    });
  }

  trackPurchase(orderNumber: string, amount: number, planName: string, destination: string) {
    this.track('Purchase', {
      transaction_id: orderNumber,
      value: amount,
      currency: 'USD',
      items: [
        {
          item_name: planName,
          item_category: destination,
          price: amount,
          quantity: 1
        }
      ]
    });
  }
}

export const analytics = new AnalyticsManager();
