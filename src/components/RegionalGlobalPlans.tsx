import React from 'react';
import { ESIMPlan, CurrencyConfig } from '../types';
import { Globe, ArrowRight, Check, Shield, MapPin, Zap } from 'lucide-react';

interface RegionalGlobalPlansProps {
  plans: ESIMPlan[];
  onSelectPlan: (plan: ESIMPlan) => void;
  currentCurrency: CurrencyConfig;
}

export const RegionalGlobalPlans: React.FC<RegionalGlobalPlansProps> = ({
  plans,
  onSelectPlan,
  currentCurrency
}) => {
  const globalPlan = plans.find(p => p.destinationId === 'global-140') || plans[0];
  const regionalPlans = plans.filter(p => p.destinationId.startsWith('regional-'));

  const formatPrice = (usdAmount: number) => {
    return `${currentCurrency.symbol}${(usdAmount * currentCurrency.rate).toFixed(2)}`;
  };

  return (
    <section className="py-24 sm:py-32 bg-[#0B192C] text-white relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3B82F6]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FF6B35]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 relative z-10">
        
        {/* SECTION 12: GLOBAL COVERAGE FEATURE (Major Visual Showcase) */}
        <div>
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B35]/20 border border-[#FF6B35]/30 text-[#FF8A5C] text-xs font-black uppercase tracking-widest">
              <Globe className="w-3.5 h-3.5" />
              <span>Global Freedom Pass</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-['Space_Grotesk'] text-white">
              One eSIM. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#FF6B35]">
                The World Is Yours.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
              Skip swapping SIMs at every border. Install a single profile on your device and enjoy non-stop coverage across 200+ destinations and 500+ global partner carriers.
            </p>
          </div>

          {/* Interactive World Map & Global Plan Showcase Card */}
          <div className="relative rounded-[36px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/15 p-8 sm:p-12 shadow-2xl overflow-hidden">
            
            {/* World Map Graphic with Glowing Location Pins */}
            <div className="relative h-64 sm:h-80 w-full mb-10 rounded-3xl bg-[#060E18] border border-white/10 flex items-center justify-center overflow-hidden">
              
              {/* World outline stylized grid */}
              <svg className="w-full h-full opacity-35 object-contain" viewBox="0 0 1000 500" fill="none">
                <path d="M150 150 Q220 100 300 130 T450 160 T600 120 T750 180 T900 150" stroke="#3B82F6" strokeWidth="2" strokeDasharray="6 6" />
                <path d="M180 280 Q320 250 480 300 T720 270 T880 320" stroke="#00B67A" strokeWidth="2" strokeDasharray="6 6" />
                <ellipse cx="250" cy="180" rx="90" ry="50" fill="#3B82F6" fillOpacity="0.1" />
                <ellipse cx="520" cy="160" rx="70" ry="40" fill="#3B82F6" fillOpacity="0.1" />
                <ellipse cx="780" cy="200" rx="100" ry="60" fill="#00B67A" fillOpacity="0.1" />
                <ellipse cx="800" cy="380" rx="70" ry="40" fill="#00B67A" fillOpacity="0.1" />
              </svg>

              {/* Glowing Location Pins */}
              {/* USA PIN */}
              <div className="absolute top-[32%] left-[24%] flex flex-col items-center group cursor-pointer animate-bounce duration-1000">
                <div className="px-2.5 py-1 bg-[#FF6B35] text-white text-[10px] font-extrabold rounded-full shadow-lg border border-white/40 mb-1 flex items-center gap-1">
                  <span>🇺🇸</span> USA
                </div>
                <div className="w-3.5 h-3.5 bg-[#FF6B35] rounded-full ring-4 ring-[#FF6B35]/40" />
              </div>

              {/* EUROPE PIN */}
              <div className="absolute top-[28%] left-[50%] flex flex-col items-center group cursor-pointer">
                <div className="px-2.5 py-1 bg-[#00B67A] text-white text-[10px] font-extrabold rounded-full shadow-lg border border-white/40 mb-1 flex items-center gap-1">
                  <span>🇪🇺</span> Europe (35+)
                </div>
                <div className="w-3.5 h-3.5 bg-emerald-400 rounded-full ring-4 ring-emerald-400/40 animate-ping" />
              </div>

              {/* MIDDLE EAST PIN */}
              <div className="absolute top-[42%] left-[60%] flex flex-col items-center group cursor-pointer">
                <div className="px-2.5 py-1 bg-[#3B82F6] text-white text-[10px] font-extrabold rounded-full shadow-lg border border-white/40 mb-1 flex items-center gap-1">
                  <span>🇦🇪</span> Middle East
                </div>
                <div className="w-3.5 h-3.5 bg-blue-400 rounded-full ring-4 ring-blue-400/40" />
              </div>

              {/* ASIA PIN */}
              <div className="absolute top-[35%] left-[78%] flex flex-col items-center group cursor-pointer">
                <div className="px-2.5 py-1 bg-[#00B67A] text-white text-[10px] font-extrabold rounded-full shadow-lg border border-white/40 mb-1 flex items-center gap-1">
                  <span>🇯🇵</span> Asia (18+)
                </div>
                <div className="w-3.5 h-3.5 bg-[#FF6B35] rounded-full ring-4 ring-[#FF6B35]/40" />
              </div>

              {/* AUSTRALIA PIN */}
              <div className="absolute top-[72%] left-[82%] flex flex-col items-center group cursor-pointer">
                <div className="px-2.5 py-1 bg-[#00B67A] text-white text-[10px] font-extrabold rounded-full shadow-lg border border-white/40 mb-1 flex items-center gap-1">
                  <span>🇦🇺</span> Oceania
                </div>
                <div className="w-3.5 h-3.5 bg-cyan-400 rounded-full ring-4 ring-cyan-400/40" />
              </div>

              {/* Central Map Overlay Badge */}
              <div className="absolute bottom-4 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00B67A] animate-pulse" />
                <span className="font-bold text-gray-200">500+ Partner Carrier Networks Active</span>
              </div>
            </div>

            {/* Bottom Row Details & Action */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="text-xl font-extrabold font-['Space_Grotesk'] text-white">
                  Global Explorer Package ({globalPlan.data} / {globalPlan.validityDays} Days)
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Automatic network switching across 140+ countries. Keep your domestic WhatsApp number and receive SMS while browsing abroad at full speed.
                </p>

                <div className="flex flex-wrap gap-4 text-xs text-gray-300 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#00B67A]" />
                    <span>Tethering / Hotspot Included</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#00B67A]" />
                    <span>Instant Camera Scan Delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#00B67A]" />
                    <span>24/7 Dedicated Concierge Support</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4">
                <div>
                  <span className="text-xs text-gray-400 uppercase font-semibold block">One-Time Fee</span>
                  <div className="text-3xl sm:text-4xl font-black text-white tabular-nums font-['Space_Grotesk']">
                    {formatPrice(globalPlan.price)}
                  </div>
                </div>

                <button
                  onClick={() => onSelectPlan(globalPlan)}
                  className="px-8 py-4 text-xs sm:text-sm font-extrabold text-white bg-[#FF6B35] hover:bg-[#E8551E] rounded-full transition-all shadow-xl shadow-[#FF6B35]/40 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer flex items-center gap-2"
                >
                  <span>Get Global eSIM</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 11: REGIONAL MULTI-COUNTRY BUNDLES */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6B35] block mb-1">
              CONTINENTAL VALUE PACKAGES
            </span>
            <h3 className="text-2xl sm:text-4xl font-black font-['Space_Grotesk'] text-white">
              Regional eSIM Plans
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-300">
              Visiting multiple cities in Europe or Asia? One eSIM covers your entire itinerary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionalPlans.map((rPlan) => (
              <div
                key={rPlan.id}
                className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-[28px] p-7 border border-white/15 hover:border-[#3B82F6]/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{rPlan.countryFlag}</span>
                    <span className="text-[11px] font-black uppercase tracking-wider text-blue-200 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
                      Multi-Country
                    </span>
                  </div>

                  <h4 className="text-xl font-black text-white font-['Space_Grotesk'] mb-1">
                    {rPlan.destinationName}
                  </h4>

                  <p className="text-xs text-gray-300 mb-5 leading-relaxed">
                    {rPlan.features[0] || 'Seamless cross-border roaming across partner countries.'}
                  </p>

                  <div className="space-y-2 py-4 border-t border-b border-white/10 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Data:</span>
                      <span className="font-bold text-white">{rPlan.data}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Validity:</span>
                      <span className="font-bold text-white">{rPlan.validityDays} Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Speed:</span>
                      <span className="font-bold text-white">{rPlan.speed}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">Price</span>
                    <span className="text-2xl font-black text-white tabular-nums">
                      {formatPrice(rPlan.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectPlan(rPlan)}
                    className="px-6 py-2.5 text-xs font-bold text-gray-900 bg-white hover:bg-blue-50 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
