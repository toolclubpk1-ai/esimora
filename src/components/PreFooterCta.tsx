import React from 'react';
import { ArrowRight, Sparkles, Shield, Wifi, Plane } from 'lucide-react';

interface PreFooterCtaProps {
  onGetESIM: () => void;
}

export const PreFooterCta: React.FC<PreFooterCtaProps> = ({ onGetESIM }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#0B192C] text-white relative overflow-hidden">
      
      {/* Decorative ambient lights */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#3B82F6]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#FF6B35]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B35]/20 border border-[#FF6B35]/30 text-[#FF8A5C] text-xs font-black uppercase tracking-widest backdrop-blur-md">
          <Plane className="w-3.5 h-3.5 text-[#FF6B35]" />
          <span>INSTANT DIGITAL ACTIVATION</span>
        </div>

        {/* Large Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-['Space_Grotesk'] text-white">
          Ready to Travel <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#FF6B35]">
            Connected?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-gray-300 max-w-xl mx-auto font-medium">
          Get your eSIM before you take off. Scan upon arrival and enjoy uninterrupted unlimited 5G data wherever you land.
        </p>

        {/* Primary High-Converting CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onGetESIM}
            className="w-full sm:w-auto px-10 py-5 text-sm sm:text-base font-black text-white bg-[#FF6B35] hover:bg-[#E8551E] rounded-full shadow-2xl shadow-[#FF6B35]/35 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Get Your eSIM</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Perks Footer */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-gray-400 font-semibold border-t border-white/10 max-w-2xl mx-auto">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-[#00B67A]" />
            <span>100% Money-Back Guarantee</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-4 h-4 text-[#00B67A]" />
            <span>5G / 4G LTE Worldwide</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#3B82F6]" />
            <span>Dual SIM Compatible</span>
          </div>
        </div>

      </div>
    </section>
  );
};
