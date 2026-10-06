import React from 'react';
import { ESIMPlan, CurrencyConfig } from '../types';
import { X, Check, ShieldCheck, Zap, Wifi, Signal, AlertCircle, ArrowRight, HelpCircle, MapPin } from 'lucide-react';
import { LandmarkArtwork } from './LandmarkArtwork';

interface PlanDetailModalProps {
  plan: ESIMPlan | null;
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: (plan: ESIMPlan) => void;
  currentCurrency: CurrencyConfig;
}

export const PlanDetailModal: React.FC<PlanDetailModalProps> = ({
  plan,
  isOpen,
  onClose,
  onProceedToCheckout,
  currentCurrency
}) => {
  if (!isOpen || !plan) return null;

  const convertedPrice = plan.price * currentCurrency.rate;
  const convertedOriginal = plan.originalPrice ? plan.originalPrice * currentCurrency.rate : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header Bar with Landmark Picture Artwork */}
        <div className="relative flex items-center justify-between px-6 py-5 bg-[#0B192C] text-white overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-35">
            <LandmarkArtwork destinationId={plan.destinationId} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C] via-[#0B192C]/85 to-[#0B192C]/60" />
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <span className="text-3xl filter drop-shadow-sm">{plan.countryFlag}</span>
            <div>
              <div className="text-xs font-bold text-[#FF6B35] uppercase tracking-wider">
                {plan.destinationName} eSIM Package
              </div>
              <h3 className="text-lg font-black text-white font-['Space_Grotesk']">{plan.name}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="relative z-10 p-1.5 text-slate-400 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors cursor-pointer border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Top highlight pricing card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-[#F0F4F8] border border-blue-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#3B82F6]">Data Allowance & Duration</span>
              <div className="text-3xl font-extrabold text-[#0B192C] font-['Space_Grotesk'] mt-0.5">
                {plan.data} <span className="text-sm font-medium text-slate-500">/ {plan.validityDays} Days</span>
              </div>
              <div className="text-xs text-[#00B67A] font-semibold mt-1">● High-speed uncapped network access</div>
            </div>

            <div className="mt-4 sm:mt-0 text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] tabular-nums">
                {currentCurrency.symbol}{convertedPrice.toFixed(2)}
              </div>
              {convertedOriginal && (
                <div className="text-xs font-semibold text-slate-400 line-through tabular-nums">
                  Regular {currentCurrency.symbol}{convertedOriginal.toFixed(2)}
                </div>
              )}
              <div className="text-[11px] text-slate-400">All taxes & fees included</div>
            </div>
          </div>

          {/* Section: What's Included */}
          <div>
            <h4 className="text-sm font-bold text-[#0B192C] uppercase tracking-wider mb-3 font-['Space_Grotesk']">
              What's Included?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Check className="w-4 h-4 text-[#00B67A] shrink-0" />
                <span>Mobile data ({plan.data})</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Check className="w-4 h-4 text-[#00B67A] shrink-0" />
                <span>4G/5G speeds where available</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Check className="w-4 h-4 text-[#00B67A] shrink-0" />
                <span>Instant QR delivery to your email</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Check className="w-4 h-4 text-[#00B67A] shrink-0" />
                <span>No physical SIM card or shipping</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Check className="w-4 h-4 text-[#00B67A] shrink-0" />
                <span>Easy 60-second camera activation</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Check className="w-4 h-4 text-[#00B67A] shrink-0" />
                <span>24/7 dedicated travel support</span>
              </div>
            </div>
          </div>

          {/* Section: Network Information */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-sm font-bold text-[#0B192C] uppercase tracking-wider font-['Space_Grotesk']">
              Network Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Supported Carriers</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <Signal className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                  {plan.networkInfo}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Network Speed</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                  {plan.speed}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Hotspot / Tethering</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5 text-[#00B67A] shrink-0" />
                  {plan.hotspot ? 'Supported & Enabled' : 'Data-only tethering restricted'}
                </span>
              </div>
            </div>
          </div>

          {/* Section: Important Information */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Important Travel Information</span>
            </div>
            <ul className="text-xs text-amber-950/80 space-y-1 pl-6 list-disc">
              <li>Requires an eSIM-compatible smartphone or tablet (iPhone XR+, Galaxy S20+, Pixel 3+).</li>
              <li>Your device must be carrier-unlocked to connect to international networks.</li>
              <li>Plan validity begins upon connection to destination cellular network.</li>
              <li>Data-only plan. You can keep using WhatsApp, Telegram, iMessage, and FaceTime.</li>
            </ul>
          </div>

        </div>

        {/* Footer Contiguous Purchase Module */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#00B67A]" />
            <span>Guaranteed activation or 100% money back</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-[#0B192C] bg-white border border-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => onProceedToCheckout(plan)}
              className="flex-1 sm:flex-initial px-8 py-3 text-xs sm:text-sm font-extrabold text-white bg-[#FF6B35] hover:bg-[#E8551E] rounded-full shadow-lg shadow-[#FF6B35]/30 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <span>Buy This eSIM ({currentCurrency.symbol}{convertedPrice.toFixed(2)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
