import React, { useState, useEffect } from 'react';
import { Destination, ESIMPlan, Order, CurrencyConfig } from './types';
import { AppStorage } from './services/storage';
import { analytics } from './services/analytics';
import { Header, CURRENCIES } from './components/Header';
import { Hero } from './components/Hero';
import { DestinationGrid } from './components/DestinationGrid';
import { PlanCard } from './components/PlanCard';
import { PlanDetailModal } from './components/PlanDetailModal';
import { PlanComparison } from './components/PlanComparison';
import { HowItWorks } from './components/HowItWorks';
import { CompatibilityChecker } from './components/CompatibilityChecker';
import { WhyEsimora } from './components/WhyEsimora';
import { RegionalGlobalPlans } from './components/RegionalGlobalPlans';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { SupportSection } from './components/SupportSection';
import { PreFooterCta } from './components/PreFooterCta';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessView } from './components/OrderSuccessView';
import { MyESIMsView } from './components/MyESIMsView';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { DestinationSearchModal } from './components/DestinationSearchModal';
import { DestinationPlansModal } from './components/DestinationPlansModal';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function App() {
  // Global Data State
  const [destinations, setDestinations] = useState<Destination[]>(AppStorage.getDestinations());
  const [plans, setPlans] = useState<ESIMPlan[]>(AppStorage.getPlans());
  const [orders, setOrders] = useState<Order[]>(AppStorage.getOrders());
  const [faqs, setFaqs] = useState(AppStorage.getFaqs());
  const [reviews, setReviews] = useState(AppStorage.getReviews());

  // UI & Currency State
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyConfig>(CURRENCIES[0]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedPlanForDetails, setSelectedPlanForDetails] = useState<ESIMPlan | null>(null);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<ESIMPlan | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [myESIMsModalOpen, setMyESIMsModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  // Sync state when storage changes (e.g. from admin updates)
  const refreshStorageData = () => {
    setDestinations(AppStorage.getDestinations());
    setPlans(AppStorage.getPlans());
    setOrders(AppStorage.getOrders());
    setFaqs(AppStorage.getFaqs());
    setReviews(AppStorage.getReviews());
  };

  useEffect(() => {
    const handleStorageChange = () => {
      refreshStorageData();
    };
    window.addEventListener('esimora_storage_change', handleStorageChange);
    analytics.trackPageView('ESIMORA Global Marketplace', window.location.pathname);
    return () => window.removeEventListener('esimora_storage_change', handleStorageChange);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    analytics.track('ViewContent', { destination: dest.name, code: dest.code });
  };

  const handleSelectPlan = (plan: ESIMPlan) => {
    setSelectedPlanForCheckout(plan);
    analytics.trackAddToCart(plan.id, plan.name, plan.destinationName, plan.price);
  };

  const handleViewPlanDetails = (plan: ESIMPlan) => {
    setSelectedPlanForDetails(plan);
    analytics.trackViewContent(plan.id, plan.name, plan.destinationName, plan.price);
  };

  const handleCheckoutSuccess = (newOrder: Order) => {
    setSelectedPlanForCheckout(null);
    setOrders(AppStorage.getOrders());
    setCompletedOrder(newOrder);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#0B192C] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. STICKY RESPONSIVE HEADER */}
      <Header
        currentCurrency={currentCurrency}
        onSelectCurrency={setCurrentCurrency}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenMyESIMs={() => setMyESIMsModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenSupport={() => setSupportModalOpen(true)}
        onSelectNav={handleNavClick}
        myESIMsCount={orders.filter(o => o.orderStatus === 'activated' || o.orderStatus === 'delivered').length}
      />

      {/* SUCCESS ORDER FULL VIEW (if recently completed) */}
      {completedOrder ? (
        <OrderSuccessView
          order={completedOrder}
          onGoToMyESIMs={() => {
            setCompletedOrder(null);
            setMyESIMsModalOpen(true);
          }}
          onDone={() => setCompletedOrder(null)}
          currentCurrency={currentCurrency}
        />
      ) : (
        <main className="flex-1">
          
          {/* 2. HERO SECTION */}
          <Hero
            destinations={destinations}
            onSelectDestination={handleSelectDestination}
            onHowItWorksClick={() => handleNavClick('how-it-works')}
            onViewAllDestinations={() => handleNavClick('destinations')}
          />

          {/* 3 & 10. DESTINATION SEARCH & DISCOVERY GRID */}
          <DestinationGrid
            destinations={destinations}
            onSelectDestination={handleSelectDestination}
            currentCurrency={currentCurrency}
          />

          {/* 4. FEATURED POPULAR ESIM PLANS CATALOG */}
          <section id="plans" className="py-20 sm:py-24 bg-white/70 border-t border-blue-100/80 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl pointer-events-none -z-0" />
            <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#FF6B35]/5 rounded-full blur-3xl pointer-events-none -z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#FF6B35] mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Instant Digital Connectivity</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B192C] tracking-tight font-['Space_Grotesk']">
                    Featured eSIM Packages
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-slate-600">
                    Pre-configured high-speed 5G plans for our most requested travel destinations.
                  </p>
                </div>

                <button
                  onClick={() => handleNavClick('destinations')}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-[#3B82F6] bg-white hover:bg-blue-50 border border-blue-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-auto transition-all shadow-xs"
                >
                  <span>Explore all 200+ countries</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {plans.slice(0, 6).map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    currentCurrency={currentCurrency}
                    onSelectPlan={handleSelectPlan}
                    onViewDetails={handleViewPlanDetails}
                  />
                ))}
              </div>

            </div>
          </section>

          {/* 11 & 12. REGIONAL & GLOBAL ESIM PLANS */}
          <RegionalGlobalPlans
            plans={plans}
            onSelectPlan={handleSelectPlan}
            currentCurrency={currentCurrency}
          />

          {/* 6. PLAN COMPARISON SECTION */}
          <PlanComparison
            plans={plans}
            onSelectPlan={handleSelectPlan}
            currentCurrency={currentCurrency}
          />

          {/* 7. HOW IT WORKS */}
          <HowItWorks
            onGetStarted={() => handleNavClick('destinations')}
          />

          {/* 8. DEVICE COMPATIBILITY */}
          <CompatibilityChecker />

          {/* 9. WHY ESIMORA TRUST SECTION */}
          <WhyEsimora />

          {/* 13. CUSTOMER REVIEWS */}
          <ReviewsSection reviews={reviews} />

          {/* 14. FAQ SECTION */}
          <FaqSection
            faqs={faqs}
            onOpenSupport={() => setSupportModalOpen(true)}
          />

          {/* 15. PRE-FOOTER CONVERSION CTA SECTION */}
          <PreFooterCta
            onGetESIM={() => handleNavClick('destinations')}
          />

        </main>
      )}

      {/* 20. FOOTER */}
      <Footer
        onSelectNav={handleNavClick}
        onOpenSupport={() => setSupportModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* 31. MOBILE STICKY CTA BAR */}
      <MobileStickyBar
        onGetESIM={() => handleNavClick('destinations')}
        destinationCount={destinations.length}
      />

      {/* MODAL: Destination Search */}
      <DestinationSearchModal
        destinations={destinations}
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectDestination={handleSelectDestination}
        currentCurrency={currentCurrency}
      />

      {/* MODAL: Destination Plans */}
      <DestinationPlansModal
        destination={selectedDestination}
        plans={plans}
        isOpen={Boolean(selectedDestination)}
        onClose={() => setSelectedDestination(null)}
        onSelectPlan={handleSelectPlan}
        onViewDetails={handleViewPlanDetails}
        currentCurrency={currentCurrency}
      />

      {/* MODAL: Plan Detail Page / PDP */}
      <PlanDetailModal
        plan={selectedPlanForDetails}
        isOpen={Boolean(selectedPlanForDetails)}
        onClose={() => setSelectedPlanForDetails(null)}
        onProceedToCheckout={(plan) => {
          setSelectedPlanForDetails(null);
          setSelectedPlanForCheckout(plan);
        }}
        currentCurrency={currentCurrency}
      />

      {/* MODAL: Checkout */}
      <CheckoutModal
        plan={selectedPlanForCheckout}
        isOpen={Boolean(selectedPlanForCheckout)}
        onClose={() => setSelectedPlanForCheckout(null)}
        onSuccess={handleCheckoutSuccess}
        currentCurrency={currentCurrency}
      />

      {/* MODAL: My eSIMs Dashboard */}
      {myESIMsModalOpen && (
        <MyESIMsView
          orders={orders}
          onClose={() => setMyESIMsModalOpen(false)}
          onBrowsePlans={() => {
            setMyESIMsModalOpen(false);
            handleNavClick('destinations');
          }}
          currentCurrency={currentCurrency}
        />
      )}

      {/* MODAL: Admin Dashboard */}
      <AdminDashboard
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onDataChanged={refreshStorageData}
      />

      {/* MODAL: Support Center */}
      <SupportSection
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />

    </div>
  );
}
