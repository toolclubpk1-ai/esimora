import React, { useState } from 'react';
import { Destination, Region, CurrencyConfig } from '../types';
import { ArrowRight, Signal, Search, Sparkles, Flame, Star, TrendingUp, MapPin } from 'lucide-react';
import { LandmarkArtwork } from './LandmarkArtwork';

interface DestinationGridProps {
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  currentCurrency: CurrencyConfig;
}

const REGION_TABS: (Region | 'All' | 'Popular')[] = [
  'All',
  'Popular',
  'Europe',
  'Asia',
  'North America',
  'Middle East',
  'Latin America',
  'Oceania',
  'Africa',
  'Global'
];

export const DestinationGrid: React.FC<DestinationGridProps> = ({
  destinations,
  onSelectDestination,
  currentCurrency
}) => {
  const [activeTab, setActiveTab] = useState<Region | 'All' | 'Popular'>('Popular');
  const [filterSearch, setFilterSearch] = useState('');
  const [showAllLimit, setShowAllLimit] = useState(12);

  const filtered = destinations.filter((dest) => {
    if (filterSearch.trim()) {
      const matchName = dest.name.toLowerCase().includes(filterSearch.toLowerCase());
      const matchCode = dest.code.toLowerCase().includes(filterSearch.toLowerCase());
      const matchRegion = dest.region.toLowerCase().includes(filterSearch.toLowerCase());
      if (!matchName && !matchCode && !matchRegion) return false;
    }

    if (activeTab === 'All') return true;
    if (activeTab === 'Popular') return dest.popular;
    if (activeTab === 'Global') return dest.region === 'Global';
    return dest.region === activeTab;
  });

  const displayed = filtered.slice(0, showAllLimit);

  // Curated Popular Destinations for the Highlighted Carousel/Grid (Section 6)
  const highlightedDestinations = destinations.filter(d =>
    ['usa', 'regional-europe', 'japan', 'uk', 'uae', 'thailand'].includes(d.id)
  );

  const formatPrice = (usdAmount: number) => {
    const converted = usdAmount * currentCurrency.rate;
    return `${currentCurrency.symbol}${converted.toFixed(2)}`;
  };

  return (
    <section id="destinations" className="py-20 sm:py-24 bg-[#F0F4F8] relative overflow-hidden">
      
      {/* Decorative background curves */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6B35]/8 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION 6: HIGHLIGHTED POPULAR DESTINATIONS */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#FF6B35] mb-1.5">
                <Flame className="w-4 h-4 fill-[#FF6B35]" />
                <span>Most Traveled Destinations</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight font-['Space_Grotesk']">
                Trending Destinations
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Top picks loved by thousands of travelers with instant 5G activation.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('All')}
              className="text-xs font-bold text-[#3B82F6] hover:text-[#2563EB] flex items-center gap-1 cursor-pointer self-start sm:self-auto hover:underline"
            >
              <span>Explore All Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Highlighted Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlightedDestinations.map((dest) => (
              <div
                key={dest.id}
                onClick={() => onSelectDestination(dest)}
                className="group relative bg-white rounded-[28px] overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-[#3B82F6]/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
              >
                {/* Visual Header Banner with Famous Place Artwork */}
                <div className="h-44 relative overflow-hidden flex flex-col justify-between p-5">
                  {/* Famous Place Landmark Artwork Background */}
                  <div className="absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-500">
                    <LandmarkArtwork destinationId={dest.id} />
                    {/* Atmospheric Dark & Color Gradient Overlay for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/40 to-black/20" />
                  </div>

                  <div className="relative flex items-center justify-between z-10">
                    <span className="text-4xl filter drop-shadow-lg group-hover:scale-110 transition-transform">
                      {dest.flag}
                    </span>
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider rounded-full border border-white/20 shadow-xs">
                      {dest.tag || 'Unlimited Data'}
                    </span>
                  </div>

                  <div className="relative z-10">
                    {dest.landmarkName && (
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-orange-200 text-[10px] font-bold mb-1 shadow-xs">
                        <MapPin className="w-3 h-3 text-[#FF6B35]" />
                        <span>{dest.landmarkName}</span>
                      </div>
                    )}
                    <h3 className="text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight drop-shadow-md">
                      {dest.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#3B82F6] text-[11px] font-extrabold border border-blue-200">
                      ● Unlimited 5G Data
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-semibold">{dest.code}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                    <Signal className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                    <span className="truncate font-medium">{dest.networks.join(' · ')}</span>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">from</span>
                      <span className="text-xl font-black text-[#0B192C] tabular-nums">
                        {formatPrice(dest.startingPrice)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDestination(dest);
                      }}
                      className="px-5 py-2.5 text-xs font-extrabold text-white bg-[#FF6B35] hover:bg-[#E8551E] rounded-full shadow-md shadow-[#FF6B35]/25 group-hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View Plans</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: COMPLETE DESTINATION DISCOVERY SECTION */}
        <div>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#3B82F6] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore The Globe</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight font-['Space_Grotesk']">
              Where are you going next?
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Select your destination and find the ideal data package for your trip.
            </p>
          </div>

          {/* Filter Bar & Search */}
          <div className="space-y-4 mb-8">
            
            {/* Search Input */}
            <div className="max-w-md mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <input
                type="text"
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                placeholder="Filter by country or region..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-full text-sm text-[#0B192C] placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all shadow-xs"
              />
              {filterSearch && (
                <button
                  onClick={() => setFilterSearch('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-semibold text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Region Tabs */}
            <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {REGION_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setShowAllLimit(12);
                  }}
                  className={`px-5 py-2.5 text-xs font-bold rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab
                      ? 'bg-[#0B192C] text-white shadow-md shadow-[#0B192C]/25 scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-2xs'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

          </div>

          {/* Destination Cards Grid */}
          {displayed.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-500 text-sm">No destinations found matching your search.</p>
              <button
                onClick={() => {
                  setFilterSearch('');
                  setActiveTab('All');
                }}
                className="mt-3 text-xs font-bold text-[#3B82F6] hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {displayed.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => onSelectDestination(dest)}
                  className="group relative bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 hover:border-[#3B82F6]/50 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Header Banner with Famous Place Artwork */}
                    <div className="h-32 relative overflow-hidden rounded-2xl mb-3 flex flex-col justify-between p-3 group-hover:shadow-md transition-all">
                      <div className="absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-500">
                        <LandmarkArtwork destinationId={dest.id} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/90 via-[#0B192C]/40 to-black/10" />
                      </div>

                      <div className="relative flex items-center justify-between z-10">
                        <span className="text-3xl filter drop-shadow-md transform group-hover:scale-110 transition-transform">
                          {dest.flag}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20">
                          {dest.region}
                        </span>
                      </div>

                      <div className="relative z-10">
                        {dest.landmarkName && (
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-orange-200 text-[10px] font-bold shadow-xs truncate max-w-full">
                            <MapPin className="w-2.5 h-2.5 text-[#FF6B35] shrink-0" />
                            <span className="truncate">{dest.landmarkName}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Name */}
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-black text-[#0B192C] group-hover:text-[#3B82F6] transition-colors line-clamp-1 font-['Space_Grotesk']">
                        {dest.name}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">{dest.code}</span>
                    </div>

                    {/* Description */}
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {dest.description}
                    </p>

                    {/* Unlimited Badge */}
                    <div className="mt-2.5">
                      <span className="inline-block text-[10px] font-extrabold text-[#3B82F6] bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-full">
                        Unlimited 5G Data
                      </span>
                    </div>

                    {/* Network info */}
                    <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Signal className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                      <span className="truncate">{dest.networks.join(' · ')}</span>
                    </div>
                  </div>

                  {/* Bottom: Price + Button */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">from</span>
                      <span className="text-base font-extrabold text-[#0B192C] tabular-nums">
                        {formatPrice(dest.startingPrice)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDestination(dest);
                      }}
                      className="flex items-center gap-1 px-4 py-1.5 text-xs font-extrabold text-white bg-[#FF6B35] hover:bg-[#E8551E] rounded-full transition-all cursor-pointer shadow-xs"
                    >
                      <span>Plans</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View All Expander */}
          {filtered.length > displayed.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setShowAllLimit((prev) => prev + 12)}
                className="px-8 py-3.5 text-xs sm:text-sm font-extrabold text-gray-800 bg-white hover:bg-gray-100 border border-gray-200 rounded-full transition-all shadow-xs cursor-pointer active:scale-95"
              >
                View All Destinations ({filtered.length - displayed.length} more)
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
