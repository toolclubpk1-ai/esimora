import React, { useState, useRef, useEffect } from 'react';
import { Search, CheckCircle2, ArrowRight, Wifi, Shield, Zap, Sparkles, MapPin, Star } from 'lucide-react';
import { Destination } from '../types';
import { LandmarkArtwork } from './LandmarkArtwork';

interface HeroProps {
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  onHowItWorksClick: () => void;
  onViewAllDestinations: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  destinations,
  onSelectDestination,
  onHowItWorksClick,
  onViewAllDestinations
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedHeroCountryId, setSelectedHeroCountryId] = useState('japan');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeHeroDest = destinations.find(d => d.id === selectedHeroCountryId) ||
    destinations.find(d => d.id === 'japan') ||
    destinations[0];

  const filtered = searchQuery.trim()
    ? destinations.filter(
        d =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.region.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : destinations.filter(d => d.popular).slice(0, 6);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (dest: Destination) => {
    setIsFocused(false);
    setSearchQuery('');
    onSelectDestination(dest);
  };

  const popularPicks = ['United States', 'Japan', 'United Kingdom', 'France', 'UAE', 'Thailand'];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-[#F0F4F8] text-[#0B192C] border-b border-blue-100/80">
      {/* Background ambient lighting effects in Electric Blue and Vibrant Coral */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#3B82F6]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#FF6B35]/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Zone */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Trustpilot Rating Badge */}
            <div className="inline-flex items-center gap-2.5 text-xs font-bold text-gray-800 bg-white border border-gray-200/90 rounded-full px-4 py-1.5 shadow-xs">
              <span className="flex items-center gap-1">
                <span className="font-extrabold text-[#00B67A] tracking-wider text-xs">★ Trustpilot</span>
                <span className="flex text-[#00B67A]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xs">★</span>
                  ))}
                </span>
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 font-semibold">Excellent <strong>4.7 / 5.0</strong></span>
              <span className="hidden sm:inline text-gray-400 text-[11px]">(45,000+ reviews)</span>
            </div>

            {/* Large Bold Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B192C] tracking-tight leading-[1.12] font-['Space_Grotesk'] text-balance">
              Stay Connected <br />
              <span className="text-[#FF6B35]">
                Wherever You Go
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed text-balance">
              Instant mobile data in 200+ destinations worldwide. No physical SIM, no roaming charges. Just scan, activate, and enjoy seamless internet.
            </p>

            {/* Floating Search Card */}
            <div className="relative max-w-xl mx-auto lg:mx-0 pt-2" ref={dropdownRef}>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 text-left pl-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Where are you traveling?</span>
              </div>

              <div className="relative flex items-center bg-white rounded-2xl sm:rounded-full p-2 shadow-xl shadow-slate-900/5 border border-slate-200 transition-all focus-within:ring-4 focus-within:ring-[#3B82F6]/20 focus-within:border-[#3B82F6]">
                <div className="pl-3 sm:pl-4 pr-2 text-[#3B82F6]">
                  <Search className="w-5 h-5 text-[#3B82F6]" />
                </div>
                
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  placeholder="Search a country or destination (e.g. Japan, USA)..."
                  className="w-full py-2 px-1 text-sm sm:text-base text-[#0B192C] placeholder:text-slate-400 focus:outline-none bg-transparent"
                />

                <button
                  onClick={() => {
                    if (filtered.length > 0) {
                      handleSelect(filtered[0]);
                    } else {
                      onViewAllDestinations();
                    }
                  }}
                  className="px-7 py-3.5 text-xs sm:text-sm font-extrabold text-white bg-[#FF6B35] hover:bg-[#E8551E] rounded-xl sm:rounded-full transition-all shadow-md shadow-[#FF6B35]/30 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
                >
                  Find My eSIM
                </button>
              </div>

              {/* Autocomplete Dropdown */}
              {isFocused && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2.5 z-50 animate-in fade-in zoom-in-95 max-h-80 overflow-y-auto text-gray-900">
                  <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                    {searchQuery.trim() ? 'Matching Destinations' : 'Popular Traveler Destinations'}
                  </div>
                  {filtered.length === 0 ? (
                    <div className="px-4 py-4 text-center text-sm text-gray-500">
                      No matching destinations found for "{searchQuery}".
                    </div>
                  ) : (
                    filtered.map((dest) => (
                      <button
                        key={dest.id}
                        onClick={() => handleSelect(dest)}
                        onMouseEnter={() => setSelectedHeroCountryId(dest.id)}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-50/70 transition-colors text-left cursor-pointer border-b border-gray-50 last:border-none"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-9 rounded-xl overflow-hidden relative shrink-0 shadow-xs border border-gray-200">
                            <LandmarkArtwork destinationId={dest.id} />
                            <div className="absolute inset-0 bg-black/20" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                              <span>{dest.flag}</span>
                              <span>{dest.name}</span>
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              {dest.landmarkName ? (
                                <>
                                  <MapPin className="w-2.5 h-2.5 text-[#FF6B35] shrink-0" />
                                  <span className="truncate max-w-[200px]">{dest.landmarkName}</span>
                                </>
                              ) : (
                                <span>{dest.region} · {dest.networks[0]}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-gray-400">from</div>
                          <div className="text-sm font-extrabold text-[#FF6B35] tabular-nums">
                            ${dest.startingPrice.toFixed(2)}
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}

              {/* Quick destination tags */}
              <div className="flex flex-wrap items-center gap-2 mt-3.5 text-xs">
                <span className="text-gray-500 font-medium mr-1">Popular:</span>
                {popularPicks.map((countryName) => {
                  const dest = destinations.find(d => d.name === countryName);
                  if (!dest) return null;
                  const isSelected = selectedHeroCountryId === dest.id;
                  return (
                    <button
                      key={dest.id}
                      onClick={() => {
                        setSelectedHeroCountryId(dest.id);
                        handleSelect(dest);
                      }}
                      onMouseEnter={() => setSelectedHeroCountryId(dest.id)}
                      className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95 shadow-2xs border ${
                        isSelected
                          ? 'bg-[#FF6B35] text-white border-[#FF6B35] shadow-md shadow-[#FF6B35]/25'
                          : 'bg-white hover:bg-orange-50 border-gray-200 hover:border-[#FF6B35]/40 text-gray-700'
                      }`}
                    >
                      <span>{dest.flag}</span>
                      <span>{dest.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onViewAllDestinations}
                className="px-8 py-4 text-sm font-extrabold text-white bg-[#FF6B35] hover:bg-[#E8551E] rounded-full shadow-lg shadow-[#FF6B35]/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Find Your eSIM</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={onHowItWorksClick}
                className="px-7 py-4 text-sm font-bold text-[#0B192C] hover:text-[#3B82F6] bg-white hover:bg-slate-50 border border-slate-200 rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
              >
                How It Works
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#00B67A] shrink-0" />
                <span>Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#00B67A] shrink-0" />
                <span>No Physical SIM</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0" />
                <span>Unlimited 5G Data</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#00B67A] shrink-0" />
                <span>24/7 Support</span>
              </div>
            </div>

          </div>

          {/* Right Visual Zone: Smartphone Preview with Deep Navy, Electric Blue & Vibrant Coral */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer decorative glow ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#0B192C] via-[#3B82F6] to-[#FF6B35] rounded-[40px] blur-xl opacity-25 animate-pulse" />

              {/* Main device card */}
              <div className="relative bg-white rounded-[36px] p-6 sm:p-7 shadow-2xl border border-slate-200 overflow-hidden text-[#0B192C]">
                
                {/* Smartphone Device Frame Preview */}
                <div className="relative bg-[#0B192C] rounded-3xl p-5 border border-slate-800 shadow-inner space-y-4 text-white">
                  
                  {/* Phone Top Notch & Status */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                    <span className="font-mono font-bold text-white text-[11px]">9:41 AM</span>
                    <div className="w-16 h-3 bg-black/60 rounded-full mx-auto" />
                    <div className="flex items-center gap-1.5 text-white font-mono text-[11px]">
                      <span className="text-[#3B82F6] font-bold">5G</span>
                      <Wifi className="w-3.5 h-3.5 text-[#3B82F6]" />
                    </div>
                  </div>

                  {/* Live Destination & Famous Place Landmark Showcase Card */}
                  <div
                    onClick={() => onSelectDestination(activeHeroDest)}
                    className="relative h-32 rounded-2xl overflow-hidden cursor-pointer group/card border border-white/10 p-3.5 flex flex-col justify-between shadow-lg"
                  >
                    <div className="absolute inset-0 z-0 group-hover/card:scale-105 transition-transform duration-500">
                      <LandmarkArtwork destinationId={activeHeroDest.id} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/50 to-black/20" />
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl filter drop-shadow-md">{activeHeroDest.flag}</span>
                        <div>
                          <span className="text-xs font-black text-white block">{activeHeroDest.name}</span>
                          <span className="text-[10px] text-slate-300 font-semibold">{activeHeroDest.region}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#FF6B35] text-white text-[9px] font-black uppercase tracking-wider shadow-xs">
                        5G Active
                      </span>
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      {activeHeroDest.landmarkName && (
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-orange-200 text-[10px] font-bold shadow-xs truncate max-w-[200px]">
                          <MapPin className="w-2.5 h-2.5 text-[#FF6B35] shrink-0" />
                          <span className="truncate">{activeHeroDest.landmarkName}</span>
                        </div>
                      )}
                      <span className="text-xs font-black text-[#3B82F6]">Unlimited</span>
                    </div>
                  </div>

                  {/* Quick Landmark Switcher within Phone */}
                  <div className="flex items-center justify-between bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-[11px]">
                    {[
                      { id: 'japan', flag: '🇯🇵', name: 'Japan' },
                      { id: 'usa', flag: '🇺🇸', name: 'USA' },
                      { id: 'france', flag: '🇫🇷', name: 'France' },
                      { id: 'uk', flag: '🇬🇧', name: 'UK' },
                      { id: 'uae', flag: '🇦🇪', name: 'UAE' },
                      { id: 'thailand', flag: '🇹🇭', name: 'Thai' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedHeroCountryId(item.id)}
                        className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          selectedHeroCountryId === item.id
                            ? 'bg-[#3B82F6] text-white shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>{item.flag}</span>
                        <span className="hidden sm:inline text-[10px]">{item.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Active eSIM Carrier Chip Card */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#0B192C] via-[#182C48] to-[#1E3A8A] border border-[#3B82F6]/30 text-white shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 border border-[#3B82F6]/40 text-[#3B82F6] flex items-center justify-center font-black">
                        <Zap className="w-5 h-5 text-[#3B82F6]" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-blue-200">Carrier Network</div>
                        <div className="text-sm font-black text-white">{activeHeroDest.networks[0] || 'ESIMORA Global 5G'}</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-white text-[#0B192C] text-[10px] font-black rounded-full shadow-xs">
                      CONNECTED
                    </span>
                  </div>

                  {/* Unlimited Data Pill */}
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#3B82F6] animate-ping" />
                      <span className="text-xs font-bold text-slate-200">Data Status</span>
                    </div>
                    <span className="px-3 py-1 bg-[#3B82F6]/20 border border-[#3B82F6]/40 text-[#3B82F6] text-xs font-black rounded-full">
                      UNLIMITED DATA
                    </span>
                  </div>

                  {/* World Route Pins */}
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Instant Data Roaming</span>
                      <span className="text-[#00B67A] font-bold">$0.00 Roaming Fee</span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xl">🇺🇸</span>
                        <span>JFK</span>
                      </div>
                      <div className="flex-1 px-3 flex flex-col items-center">
                        <span className="text-[10px] font-mono text-[#3B82F6]">5G ULTRA HIGH SPEED</span>
                        <div className="w-full h-0.5 bg-gradient-to-r from-slate-600 via-[#3B82F6] to-[#FF6B35] relative">
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#FF6B35] ring-4 ring-[#FF6B35]/40" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xl">🇯🇵</span>
                        <span>HND</span>
                      </div>
                    </div>
                  </div>

                  {/* Speeds & Hotspot */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Average Speed</span>
                      <div className="text-base font-extrabold text-white tabular-nums">
                        520 <span className="text-[10px] font-medium text-slate-400">Mbps</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Hotspot Tethering</span>
                      <div className="text-base font-extrabold text-[#00B67A]">
                        Enabled
                      </div>
                    </div>
                  </div>

                  {/* QR Code Scan Tag */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#3B82F6]" />
                      <span className="font-semibold text-slate-300">Instant QR Delivery</span>
                    </div>
                    <span className="text-[10px] text-[#3B82F6] font-bold font-mono">READY IN 1 MIN</span>
                  </div>

                </div>

                {/* Floating Guarantee Badge */}
                <div className="absolute -bottom-2 -right-1 bg-gradient-to-r from-[#0B192C] via-[#1E3A8A] to-[#3B82F6] rounded-2xl px-4 py-2.5 shadow-xl shadow-[#3B82F6]/30 border border-white flex items-center gap-2.5 text-xs text-white">
                  <Shield className="w-4 h-4 text-[#FF6B35] shrink-0" />
                  <div>
                    <div className="font-black text-white text-[11px]">100% Money-Back</div>
                    <div className="text-[9px] text-blue-100">Guaranteed activation</div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

