import React, { useState } from 'react';
import { COMPATIBLE_DEVICES } from '../data/compatibility';
import { Smartphone, CheckCircle, Search, HelpCircle, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';

export const CompatibilityChecker: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState(COMPATIBLE_DEVICES[0].brand);
  const [modelSearch, setModelSearch] = useState('');

  const currentBrandData = COMPATIBLE_DEVICES.find(b => b.brand === selectedBrand) || COMPATIBLE_DEVICES[0];

  // Search across all models
  const matchingModels = modelSearch.trim()
    ? COMPATIBLE_DEVICES.flatMap(b =>
        b.popularModels
          .filter(m => m.toLowerCase().includes(modelSearch.toLowerCase()))
          .map(m => ({ brand: b.brand, model: m, instructions: b.instructions }))
      )
    : [];

  return (
    <section id="compatibility" className="py-20 sm:py-28 bg-[#F0F4F8] border-t border-blue-100/80 relative overflow-hidden">
      {/* Decorative ambient curves */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#FF6B35]/8 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#FF6B35] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Hardware Check</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B192C] tracking-tight font-['Space_Grotesk']">
            Is Your Device eSIM Ready?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Most smartphones produced from 2018 onwards support eSIM technology. Search your exact model or select your brand below.
          </p>
        </div>

        {/* Quick model search */}
        <div className="max-w-md mx-auto mb-10 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <input
            type="text"
            value={modelSearch}
            onChange={(e) => setModelSearch(e.target.value)}
            placeholder="Type your phone model (e.g. iPhone 15, S24, Pixel 8)..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-full text-sm text-[#0B192C] placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all shadow-md"
          />
        </div>

        {/* Search Results Display if user searched */}
        {modelSearch.trim() ? (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl mb-10 animate-in fade-in">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
              Search Results for "{modelSearch}"
            </h4>
            {matchingModels.length === 0 ? (
              <div className="py-6 text-center text-sm text-slate-600">
                <AlertCircle className="w-7 h-7 text-amber-500 mx-auto mb-2" />
                <p className="font-bold text-slate-800">We couldn't immediately identify "{modelSearch}".</p>
                <p className="text-xs text-slate-500 mt-1">
                  You can verify instantly: dial <strong className="text-[#FF6B35] font-mono">*#06#</strong> on your keypad. If a 32-digit EID number appears, your phone has eSIM hardware!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {matchingModels.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 shadow-xs">
                    <CheckCircle className="w-5 h-5 text-[#00B67A] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-[#0B192C]">
                        {item.model} ({item.brand})
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {item.instructions}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}

        {/* Brand Selector Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {COMPATIBLE_DEVICES.map((dev) => (
            <button
              key={dev.brand}
              onClick={() => setSelectedBrand(dev.brand)}
              className={`px-6 py-2.5 text-xs font-extrabold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                selectedBrand === dev.brand
                  ? 'bg-[#0B192C] text-white shadow-lg shadow-[#0B192C]/25 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
              }`}
            >
              {dev.brand}
            </button>
          ))}
        </div>

        {/* Selected Brand Models Card */}
        <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0B192C] to-[#3B82F6] text-white flex items-center justify-center font-bold shadow-md shadow-[#3B82F6]/25">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0B192C] font-['Space_Grotesk']">
                  Supported {currentBrandData.brand} Devices
                </h3>
                <p className="text-xs text-slate-500">
                  Must be carrier unlocked and running current system software.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full">
              <ShieldCheck className="w-4 h-4 text-[#00B67A]" />
              <span>Certified Compatible</span>
            </div>
          </div>

          {/* Models list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            {currentBrandData.popularModels.map((model, i) => (
              <div key={i} className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 font-semibold hover:border-[#3B82F6]/40 transition-colors">
                <CheckCircle className="w-4 h-4 text-[#00B67A] shrink-0" />
                <span className="truncate">{model}</span>
              </div>
            ))}
          </div>

          {/* Quick verification instructions */}
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-slate-900 space-y-1.5">
            <div className="font-extrabold flex items-center gap-2 text-[#3B82F6] text-sm">
              <HelpCircle className="w-4 h-4 text-[#3B82F6]" />
              <span>How to verify on your device:</span>
            </div>
            <p className="text-slate-700 pl-6 leading-relaxed">
              {currentBrandData.instructions}
            </p>
          </div>

          {/* Universal EID Test */}
          <div className="p-5 rounded-2xl bg-[#0B192C] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold text-[#FF6B35] uppercase tracking-wider block">Universal Dial Check</span>
              <div className="text-base font-bold">Dial *#06# on your device keypad</div>
              <div className="text-xs text-slate-300">If an "EID" 32-digit barcode or number appears, your phone has an eSIM hardware module installed!</div>
            </div>
            <div className="bg-white/10 border border-white/20 px-5 py-2.5 rounded-xl text-center font-mono font-black text-[#00B67A] text-base shrink-0">
              *#06#
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

