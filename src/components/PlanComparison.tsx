import React from 'react';
import { ESIMPlan, CurrencyConfig } from '../types';
import { Check, X, ArrowRight, Zap, Wifi, Sparkles } from 'lucide-react';

interface PlanComparisonProps {
  plans: ESIMPlan[];
  onSelectPlan: (plan: ESIMPlan) => void;
  currentCurrency: CurrencyConfig;
}

export const PlanComparison: React.FC<PlanComparisonProps> = ({
  plans,
  onSelectPlan,
  currentCurrency
}) => {
  const comparisonPlans = plans.slice(0, 4);

  const formatPrice = (usdAmount: number) => {
    return `${currentCurrency.symbol}${(usdAmount * currentCurrency.rate).toFixed(2)}`;
  };

  return (
    <section className="py-20 sm:py-28 bg-[#F0F4F8] border-t border-b border-blue-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#FF6B35] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Honest & Clear</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B192C] tracking-tight font-['Space_Grotesk']">
            Compare Popular Plans
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Compare data limits, validity, speeds, and hotspot permissions side by side.
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-hidden rounded-[28px] bg-white border border-slate-200/90 shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-[#0B192C] text-white">
                <th className="py-5 px-6 text-xs font-black uppercase tracking-wider w-1/4">
                  Destination & Plan
                </th>
                <th className="py-5 px-4 text-xs font-black uppercase tracking-wider">
                  Data Allowance
                </th>
                <th className="py-5 px-4 text-xs font-black uppercase tracking-wider">
                  Validity
                </th>
                <th className="py-5 px-4 text-xs font-black uppercase tracking-wider">
                  Network Speed
                </th>
                <th className="py-5 px-4 text-xs font-black uppercase tracking-wider">
                  Hotspot
                </th>
                <th className="py-5 px-4 text-xs font-black uppercase tracking-wider">
                  Price
                </th>
                <th className="py-5 px-6 text-right text-xs font-black uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {comparisonPlans.map((plan) => (
                <tr key={plan.id} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{plan.countryFlag}</span>
                      <div>
                        <div className="font-extrabold text-[#0B192C] text-base">{plan.name}</div>
                        <div className="text-xs text-slate-500 font-medium">{plan.destinationName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-4 font-black text-[#0B192C] text-base font-['Space_Grotesk']">
                    {plan.data}
                  </td>
                  <td className="py-5 px-4 text-slate-700 font-semibold tabular-nums">
                    {plan.validityDays} Days
                  </td>
                  <td className="py-5 px-4 text-slate-700">
                    <span className="inline-flex items-center gap-1.5 font-bold text-xs">
                      <Zap className="w-4 h-4 text-[#3B82F6]" />
                      {plan.speed}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-slate-700">
                    {plan.hotspot ? (
                      <span className="inline-flex items-center gap-1 text-[#00B67A] font-extrabold text-xs">
                        <Check className="w-4 h-4" /> Supported
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-400 text-xs">
                        <X className="w-4 h-4" /> Restricted
                      </span>
                    )}
                  </td>
                  <td className="py-5 px-4 font-black text-[#0B192C] text-xl tabular-nums font-['Space_Grotesk']">
                    {formatPrice(plan.price)}
                  </td>
                  <td className="py-5 px-6 text-right">
                    <button
                      onClick={() => onSelectPlan(plan)}
                      className="px-6 py-2.5 text-xs font-extrabold text-white bg-[#FF6B35] hover:bg-[#E8551E] rounded-full shadow-md shadow-[#FF6B35]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                    >
                      Choose Plan
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Responsive Cards */}
        <div className="lg:hidden space-y-4">
          {comparisonPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-[24px] p-6 border border-slate-200 shadow-md space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">{plan.countryFlag}</span>
                  <div>
                    <h3 className="font-extrabold text-[#0B192C] text-base">{plan.name}</h3>
                    <p className="text-xs text-slate-500">{plan.destinationName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-[#0B192C] tabular-nums font-['Space_Grotesk']">
                    {formatPrice(plan.price)}
                  </div>
                  <div className="text-[11px] text-slate-400 font-semibold">{plan.validityDays} days</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs py-3 border-t border-b border-slate-100 text-center">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Data</div>
                  <div className="font-black text-[#0B192C] text-sm mt-0.5">{plan.data}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Speed</div>
                  <div className="font-bold text-[#0B192C] truncate mt-0.5">{plan.speed}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Hotspot</div>
                  <div className="font-bold text-[#0B192C] mt-0.5">{plan.hotspot ? 'Yes' : 'No'}</div>
                </div>
              </div>

              <button
                onClick={() => onSelectPlan(plan)}
                className="w-full py-3.5 text-xs font-extrabold text-white bg-[#FF6B35] hover:bg-[#E8551E] rounded-full transition-all shadow-md shadow-[#FF6B35]/30 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Choose {plan.data} Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
