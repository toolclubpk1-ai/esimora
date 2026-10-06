import React, { useState } from 'react';
import { ESIMPlan, CurrencyConfig, Order } from '../types';
import { eSIMService } from '../services/eSIMService';
import { analytics } from '../services/analytics';
import confetti from 'canvas-confetti';
import { X, ShieldCheck, Check, Lock, CreditCard, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  plan: ESIMPlan | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (order: Order) => void;
  currentCurrency: CurrencyConfig;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  plan,
  isOpen,
  onClose,
  onSuccess,
  currentCurrency
}) => {
  if (!isOpen || !plan) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = plan.price;
  const finalPrice = Math.max(0, subtotal - discountAmount);

  const formatPrice = (usdAmount: number) => {
    return `${currentCurrency.symbol}${(usdAmount * currentCurrency.rate).toFixed(2)}`;
  };

  const handleApplyCoupon = () => {
    setCouponError(null);
    setCouponSuccess(null);
    if (!couponCode.trim()) return;

    const res = eSIMService.validateCoupon(couponCode, subtotal);
    if (res.valid) {
      setAppliedCoupon(couponCode.trim().toUpperCase());
      setDiscountAmount(res.discountAmount);
      setCouponSuccess(res.message || 'Coupon applied successfully!');
    } else {
      setCouponError(res.message || 'Invalid coupon code');
    }
  };

  const handleCompletePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;

    setIsProcessing(true);
    analytics.trackBeginCheckout(plan.id, plan.name, finalPrice);

    try {
      // Simulate secure tokenization with payment provider
      await new Promise(resolve => setTimeout(resolve, 900));

      const newOrder = await eSIMService.createOrder({
        customerName: fullName || 'Valued Traveler',
        customerEmail: email || 'traveler@example.com',
        customerPhone: phone || '+1 555-0100',
        planId: plan.id,
        couponCode: appliedCoupon || undefined,
        paymentMethod: paymentMethod === 'apple_pay' ? 'apple_pay' : paymentMethod === 'google_pay' ? 'google_pay' : 'card'
      });

      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 90,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore if canvas-confetti blocked
      }

      analytics.trackPurchase(newOrder.orderNumber, newOrder.amount, plan.name, plan.destinationName);
      setIsProcessing(false);
      onSuccess(newOrder);
    } catch (err) {
      console.error('Order creation error:', err);
      setIsProcessing(false);
      alert('Unable to process order. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              256-Bit Encrypted Checkout
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 pt-4 pb-2 flex items-center justify-between border-b border-slate-100 text-xs font-semibold">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#FF6B35] font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${step >= 1 ? 'border-[#FF6B35] bg-[#FFF0EB] text-[#FF6B35]' : 'border-slate-200'}`}>1</span>
            <span>Order Summary</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-200" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#FF6B35] font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${step >= 2 ? 'border-[#FF6B35] bg-[#FFF0EB] text-[#FF6B35]' : 'border-slate-200'}`}>2</span>
            <span>Delivery Details</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-200" />
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#FF6B35] font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${step >= 3 ? 'border-[#FF6B35] bg-[#FFF0EB] text-[#FF6B35]' : 'border-slate-200'}`}>3</span>
            <span>Payment</span>
          </div>
        </div>

        <form onSubmit={step === 3 ? handleCompletePurchase : (e) => { e.preventDefault(); setStep((prev) => (prev + 1) as any); }}>
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            
            {/* STEP 1: ORDER SUMMARY & PROMO */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in">
                {/* Plan summary card */}
                <div className="p-5 rounded-2xl bg-[#F0F4F8] border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{plan.countryFlag}</span>
                    <div>
                      <h4 className="text-base font-bold text-[#0B192C]">{plan.name}</h4>
                      <p className="text-xs text-slate-500">{plan.destinationName} · {plan.data} · {plan.validityDays} Days</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-extrabold text-[#0B192C] tabular-nums">
                      {formatPrice(plan.price)}
                    </div>
                    <div className="text-[10px] text-[#00B67A] font-semibold">Immediate digital delivery</div>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold text-slate-700">Promo / Coupon Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="e.g. WELCOME10 or TRAVEL5"
                      className="flex-1 px-3 py-2 text-xs uppercase bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3B82F6] font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>

                  {couponSuccess && (
                    <div className="text-xs text-[#00B67A] font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>{couponSuccess}</span>
                    </div>
                  )}

                  {couponError && (
                    <div className="text-xs text-[#FF6B35] font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{couponError}</span>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-400">
                    Try <strong>WELCOME10</strong> for 10% off your initial purchase.
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="space-y-2 text-xs pt-2">
                  <div className="flex justify-between text-slate-600">
                    <span>Package Price:</span>
                    <span className="tabular-nums font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#00B67A] font-bold">
                      <span>Promo Discount ({appliedCoupon}):</span>
                      <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Tax & Processing:</span>
                    <span className="tabular-nums">$0.00 (Included)</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-[#0B192C] pt-2 border-t border-slate-100">
                    <span>Total Due:</span>
                    <span className="text-[#FF6B35] text-lg tabular-nums">{formatPrice(finalPrice)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: CUSTOMER & DELIVERY INFO */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-900">
                  Your eSIM profile and QR code will be sent immediately to the email address entered below.
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (For instant QR Code delivery) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="traveler@example.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3B82F6] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3B82F6] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (Optional WhatsApp notification)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555-0199"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3B82F6] focus:bg-white"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT METHOD */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#3B82F6] bg-blue-50 text-[#3B82F6]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit / Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'apple_pay'
                        ? 'border-[#3B82F6] bg-blue-50 text-[#3B82F6]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('google_pay')}
                    className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      paymentMethod === 'google_pay'
                        ? 'border-[#3B82F6] bg-blue-50 text-[#3B82F6]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>Google Pay</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Expires (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="12/28"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-[#3B82F6]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">CVC / Security Code</label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="•••"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-[#3B82F6]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Terms agreement checkbox */}
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded text-[#FF6B35] focus:ring-[#FF6B35]"
                  />
                  <span>
                    I agree to the <strong>Terms & Conditions</strong>, <strong>Privacy Policy</strong>, and <strong>100% Refund Policy</strong>.
                  </span>
                </label>
              </div>
            )}

          </div>

          {/* Footer Navigation */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => (prev - 1) as any)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Back
              </button>
            ) : (
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#00B67A]" />
                <span>Zero Risk Guarantee</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              {step < 3 ? (
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#0B192C] hover:bg-[#182C48] rounded-full transition-all shadow-sm active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isProcessing || !agreeTerms}
                  className="px-8 py-3 text-xs sm:text-sm font-extrabold text-white bg-[#FF6B35] hover:bg-[#E8551E] disabled:opacity-50 rounded-full transition-all shadow-lg shadow-[#FF6B35]/30 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 whitespace-nowrap"
                >
                  {isProcessing ? (
                    <span>Provisioning eSIM...</span>
                  ) : (
                    <span>Complete Purchase ({formatPrice(finalPrice)})</span>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
