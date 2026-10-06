import React from 'react';
import { ESIMPlan, CurrencyConfig } from '../types';
import { Check, Zap, Wifi, Clock, ArrowRight } from 'lucide-react';

interface PlanCardProps {
  plan: ESIMPlan;
  currentCurrency: CurrencyConfig;
  onSelectPlan: (plan: ESIMPlan) => void;
  onViewDetails: (plan: ESIMPlan) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  currentCurrency,
  onSelectPlan,
  onViewDetails
}) => {
  const convertedPrice = plan.price * currentCurrency.rate;
  const convertedOriginal = plan.originalPrice ? plan.originalPrice * currentCurrency.rate : null;

  return (
    <div className={`relative bg-white rounded-[28px] border transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 overflow-hidden ${
      plan.isPopular || plan.isBestValue
        ? 'border-2 border-[#FF6B35] shadow-xl shadow-[#FF6B35]/15 ring-4 ring-[#FF6B35]/10 -translate-y-1'
        : 'border-slate-200/90 hover:border-[#3B82F6]/50 shadow-md hover:shadow-xl hover:-translate-y-1'
    }`}>
      {/* Top Colored Accent Stripe */}
      <div className={`absolute top-0 left-0 right-0 h-2 ${
        plan.isPopular || plan.isBestValue ? 'bg-gradient-to-r from-[#FF6B35] via-[#3B82F6] to-[#0B192C]' : 'bg-gradient-to-r from-slate-200 to-slate-300'
      }`} />

      {/* Badge on Top Right */}
      {plan.isPopular && (
        <div className="absolute top-4 right-6 bg-[#FF6B35] text-white text-[10px] font-black px-3 py-1 rounded-full shadow-md shadow-[#FF6B35]/30 uppercase tracking-widest">
          Most Popular
        </div>
      )}
      {plan.isBestValue && !plan.isPopular && (
        <div className="absolute top-4 right-6 bg-[#3B82F6] text-white text-[10px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-widest">
          Best Value
        </div>
      )}

      <div>
        {/* Header: Destination & Flag */}
        <div className="flex items-center gap-2.5 mb-5 mt-1">
          <span className="text-3xl filter drop-shadow-xs">{plan.countryFlag}</span>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {plan.destinationName}
            </span>
            <h4 className="text-sm font-extrabold text-[#0B192C] line-clamp-1">{plan.name}</h4>
          </div>
        </div>

        {/* Data Allowance Display */}
        <div className="p-4 rounded-2xl bg-[#F0F4F8] border border-blue-100 mb-5">
          <div className="flex items-baseline justify-between">
            <div className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight font-['Space_Grotesk']">
              {plan.data}
            </div>
            {plan.originalPrice && (
              <span className="text-[11px] font-extrabold text-[#FF6B35] bg-[#FFF0EB] px-2.5 py-0.5 rounded-full border border-[#FF6B35]/20">
                Save {Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold mt-1">
            <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Valid for {plan.validityDays} Days</span>
          </div>
        </div>

        {/* Price display */}
        <div className="mb-5 flex items-baseline gap-2">
          <span className="text-3xl font-black text-[#0B192C] tabular-nums font-['Space_Grotesk']">
            {currentCurrency.symbol}{convertedPrice.toFixed(2)}
          </span>
          {convertedOriginal && (
            <span className="text-sm font-semibold text-slate-400 line-through tabular-nums">
              {currentCurrency.symbol}{convertedOriginal.toFixed(2)}
            </span>
          )}
          <span className="text-[11px] text-slate-400 font-medium">/ package</span>
        </div>

        {/* Specs highlights */}
        <div className="space-y-2.5 py-4 border-t border-b border-slate-100 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
            <span><strong>Speed:</strong> {plan.speed}</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="w-3.5 h-3.5 text-[#00B67A] shrink-0" />
            <span><strong>Hotspot:</strong> {plan.hotspot ? 'Supported' : 'Restricted'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-[#00B67A] shrink-0" />
            <span className="truncate"><strong>Network:</strong> {plan.networkInfo}</span>
          </div>
        </div>

        {/* Feature bullets */}
        <div className="mt-4 space-y-2 text-xs text-slate-600">
          {plan.features.slice(0, 3).map((feat, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[#00B67A] font-black text-sm">✓</span>
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
        <button
          onClick={() => onSelectPlan(plan)}
          className={`w-full py-3.5 px-5 text-xs font-black rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
            plan.isPopular || plan.isBestValue
              ? 'bg-[#FF6B35] hover:bg-[#E8551E] text-white shadow-[#FF6B35]/30 hover:scale-105'
              : 'bg-[#0B192C] hover:bg-[#182C48] text-white hover:scale-105 shadow-md shadow-[#0B192C]/20'
          }`}
        >
          <span>Get this eSIM</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => onViewDetails(plan)}
          className="w-full py-2 text-xs font-bold text-slate-500 hover:text-[#3B82F6] transition-colors cursor-pointer"
        >
          View Plan Details
        </button>
      </div>
    </div>
  );
};
