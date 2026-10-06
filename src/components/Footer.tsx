import React from 'react';
import { ShieldCheck, Heart, Mail, Phone, Globe, Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';

interface FooterProps {
  onSelectNav: (sectionId: string) => void;
  onOpenSupport: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectNav,
  onOpenSupport,
  onOpenAdmin
}) => {
  return (
    <footer className="bg-[#0B192C] text-slate-300 pt-16 pb-24 sm:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0B192C] via-[#1E3A8A] to-[#3B82F6] flex items-center justify-center text-white font-bold shadow-md shadow-[#3B82F6]/30 border border-[#3B82F6]/30">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 20h.01" />
                  <path d="M7 20v-4" />
                  <path d="M12 20v-8" />
                  <path d="M17 20V8" />
                  <path d="M22 20V4" stroke="#FF6B35" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-['Space_Grotesk']">
                ESIM<span className="text-[#FF6B35]">ORA</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Premium international eSIM connectivity across 200+ destinations worldwide. Scan once and browse with high-speed unlimited 5G local networks and transparent flat-rate pricing.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#00B67A] font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#00B67A]" />
              <span>100% Money-Back Guarantee on Unactivated Profiles</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#3B82F6] flex items-center justify-center text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#3B82F6] flex items-center justify-center text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#3B82F6] flex items-center justify-center text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#3B82F6] flex items-center justify-center text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Popular Destinations Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Destinations
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => onSelectNav('destinations')} className="hover:text-[#3B82F6] transition-colors cursor-pointer">USA eSIM (T-Mobile & Verizon)</button></li>
              <li><button onClick={() => onSelectNav('destinations')} className="hover:text-[#3B82F6] transition-colors cursor-pointer">Japan eSIM (Docomo 5G)</button></li>
              <li><button onClick={() => onSelectNav('destinations')} className="hover:text-[#3B82F6] transition-colors cursor-pointer">United Kingdom eSIM (EE)</button></li>
              <li><button onClick={() => onSelectNav('destinations')} className="hover:text-[#3B82F6] transition-colors cursor-pointer">France eSIM (Orange 5G)</button></li>
              <li><button onClick={() => onSelectNav('destinations')} className="hover:text-[#3B82F6] transition-colors cursor-pointer">UAE eSIM (Etisalat 5G)</button></li>
              <li><button onClick={() => onSelectNav('destinations')} className="hover:text-[#3B82F6] transition-colors cursor-pointer">Thailand eSIM (AIS 5G)</button></li>
            </ul>
          </div>

          {/* Regional & Global Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              eSIM Plans
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => onSelectNav('plans')} className="hover:text-[#3B82F6] transition-colors cursor-pointer">Europe (35+ Countries)</button></li>
              <li><button onClick={() => onSelectNav('plans')} className="hover:text-[#3B82F6] transition-colors cursor-pointer">Asia (18 Countries)</button></li>
              <li><button onClick={() => onSelectNav('plans')} className="hover:text-[#3B82F6] transition-colors cursor-pointer">Global Pass (140+ Countries)</button></li>
              <li><button onClick={() => onSelectNav('compatibility')} className="hover:text-[#3B82F6] transition-colors cursor-pointer">Device Compatibility</button></li>
              <li><button onClick={() => onSelectNav('how-it-works')} className="hover:text-[#3B82F6] transition-colors cursor-pointer">How It Works</button></li>
            </ul>
          </div>

          {/* Support & Legal Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Support & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={onOpenSupport} className="hover:text-[#3B82F6] transition-colors cursor-pointer">24/7 Travel Support</button></li>
              <li><button onClick={() => onSelectNav('faq')} className="hover:text-[#3B82F6] transition-colors cursor-pointer">Frequently Asked Questions</button></li>
              <li><button onClick={onOpenAdmin} className="hover:text-white transition-colors cursor-pointer text-slate-500">Admin Console</button></li>
              <li><span className="text-slate-500">Terms & Conditions</span></li>
              <li><span className="text-slate-500">Privacy Policy</span></li>
              <li><span className="text-slate-500">Refund Policy</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} ESIMORA. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Bank-Grade 256-Bit SSL</span>
            <span>·</span>
            <span>GSMA eSIM Certified</span>
            <span>·</span>
            <span className="text-[#00B67A] font-semibold">Zero Roaming Surcharges</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
