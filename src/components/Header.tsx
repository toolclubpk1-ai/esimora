import React, { useState, useEffect } from 'react';
import { Globe, Search, Menu, X, Smartphone, ChevronDown, Lock } from 'lucide-react';
import { CurrencyConfig } from '../types';

export const CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', rate: 1.0 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'GBP', symbol: '£', rate: 0.78 },
  { code: 'AUD', symbol: 'A$', rate: 1.52 },
  { code: 'CAD', symbol: 'C$', rate: 1.36 },
  { code: 'JPY', symbol: '¥', rate: 154.0 }
];

export const LANGUAGES = [
  { code: 'EN', name: 'English' },
  { code: 'ES', name: 'Español' },
  { code: 'FR', name: 'Français' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'JA', name: '日本語' },
  { code: 'AR', name: 'العربية' }
];

interface HeaderProps {
  currentCurrency: CurrencyConfig;
  onSelectCurrency: (c: CurrencyConfig) => void;
  onOpenSearch: () => void;
  onOpenMyESIMs: () => void;
  onOpenAdmin: () => void;
  onOpenSupport: () => void;
  onSelectNav: (sectionId: string) => void;
  myESIMsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onSelectCurrency,
  onOpenSearch,
  onOpenMyESIMs,
  onOpenAdmin,
  onOpenSupport,
  onSelectNav,
  myESIMsCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onSelectNav(sectionId);
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/90 shadow-md shadow-gray-900/5 text-gray-900'
        : 'bg-white border-b border-gray-100 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
            aria-label="ESIMORA Home"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0B192C] via-[#1E3A8A] to-[#3B82F6] flex items-center justify-center text-white shadow-md shadow-[#3B82F6]/25 group-hover:scale-105 transition-transform border border-[#3B82F6]/30">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20h.01" />
                <path d="M7 20v-4" />
                <path d="M12 20v-8" />
                <path d="M17 20V8" />
                <path d="M22 20V4" stroke="#FF6B35" />
              </svg>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-[#0B192C] font-['Space_Grotesk']">
                ESIM<span className="text-[#FF6B35]">ORA</span>
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-gray-700">
          <button
            onClick={() => handleNavClick('destinations')}
            className="hover:text-[#3B82F6] transition-colors py-1 cursor-pointer"
          >
            Destinations
          </button>
          <button
            onClick={() => handleNavClick('plans')}
            className="hover:text-[#3B82F6] transition-colors py-1 cursor-pointer"
          >
            eSIM Plans
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="hover:text-[#3B82F6] transition-colors py-1 cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('compatibility')}
            className="hover:text-[#3B82F6] transition-colors py-1 cursor-pointer"
          >
            Compatibility
          </button>
          <button
            onClick={() => handleNavClick('faq')}
            className="hover:text-[#3B82F6] transition-colors py-1 cursor-pointer"
          >
            FAQ
          </button>
          <button
            onClick={onOpenSupport}
            className="hover:text-[#3B82F6] transition-colors py-1 cursor-pointer"
          >
            Support
          </button>
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-gray-600 hover:text-[#3B82F6] hover:bg-blue-50/80 rounded-xl transition-colors cursor-pointer"
            aria-label="Search destinations"
            title="Search destinations"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Currency Selector */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => {
                setCurrencyDropdownOpen(!currencyDropdownOpen);
                setLangDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100/80 hover:bg-gray-200/80 border border-gray-200 rounded-full transition-colors cursor-pointer"
            >
              <span>{currentCurrency.code}</span>
              <span className="text-gray-500">({currentCurrency.symbol})</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-50 animate-in fade-in zoom-in-95">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      onSelectCurrency(c);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold cursor-pointer ${
                      currentCurrency.code === c.code ? 'bg-[#EFF6FF] text-[#3B82F6] font-bold' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{c.code}</span>
                    <span className="text-gray-400">{c.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="relative hidden xl:block">
            <button
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setCurrencyDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100/80 hover:bg-gray-200/80 border border-gray-200 rounded-full transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-gray-500" />
              <span>{selectedLang.code}</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-50">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setSelectedLang(l);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold cursor-pointer ${
                      selectedLang.code === l.code ? 'bg-[#EFF6FF] text-[#3B82F6] font-bold' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* My eSIMs */}
          <button
            onClick={onOpenMyESIMs}
            className="relative flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 hover:text-gray-900 bg-gray-100/80 hover:bg-gray-200/80 border border-gray-200 rounded-full transition-colors cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-[#3B82F6]" />
            <span className="hidden sm:inline">My eSIMs</span>
            {myESIMsCount > 0 && (
              <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#FF6B35] rounded-full shadow-xs">
                {myESIMsCount}
              </span>
            )}
          </button>

          {/* Primary CTA: Vibrant Coral Pill */}
          <button
            onClick={() => handleNavClick('destinations')}
            className="hidden sm:flex items-center justify-center px-6 py-2.5 text-xs font-extrabold text-white bg-[#FF6B35] hover:bg-[#E8551E] rounded-full shadow-md shadow-[#FF6B35]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            Get an eSIM
          </button>

          {/* Admin discreet button */}
          <button
            onClick={onOpenAdmin}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            title="Admin Console"
            aria-label="Admin Console"
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-gray-900 rounded-xl focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-200 bg-white px-6 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200 text-gray-900 shadow-xl">
          <nav className="flex flex-col space-y-3 text-base font-bold text-gray-800">
            <button
              onClick={() => handleNavClick('destinations')}
              className="text-left py-2 border-b border-gray-100 hover:text-[#3B82F6]"
            >
              Destinations
            </button>
            <button
              onClick={() => handleNavClick('plans')}
              className="text-left py-2 border-b border-gray-100 hover:text-[#3B82F6]"
            >
              eSIM Plans
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-left py-2 border-b border-gray-100 hover:text-[#3B82F6]"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('compatibility')}
              className="text-left py-2 border-b border-gray-100 hover:text-[#3B82F6]"
            >
              Device Compatibility
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="text-left py-2 border-b border-gray-100 hover:text-[#3B82F6]"
            >
              FAQ
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSupport();
              }}
              className="text-left py-2 border-b border-gray-100 hover:text-[#3B82F6]"
            >
              Customer Support
            </button>
          </nav>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-semibold">Currency:</span>
              <select
                value={currentCurrency.code}
                onChange={(e) => {
                  const match = CURRENCIES.find(c => c.code === e.target.value);
                  if (match) onSelectCurrency(match);
                }}
                className="bg-gray-100 text-xs font-bold rounded-lg px-2.5 py-1.5 border border-gray-200 text-gray-800"
              >
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-xs font-semibold text-gray-500 hover:text-[#3B82F6] flex items-center gap-1"
            >
              <Lock className="w-3.5 h-3.5" /> Admin
            </button>
          </div>

          <button
            onClick={() => handleNavClick('destinations')}
            className="w-full py-3.5 text-center text-sm font-extrabold text-white bg-[#FF6B35] hover:bg-[#E8551E] rounded-full shadow-lg shadow-[#FF6B35]/30 transition-all cursor-pointer"
          >
            Get an eSIM
          </button>
        </div>
      )}
    </header>
  );
};
