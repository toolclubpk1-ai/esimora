import React from 'react';
import { Compass, ShoppingBag, QrCode, Wifi, ArrowRight, Sparkles } from 'lucide-react';

interface HowItWorksProps {
  onGetStarted: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onGetStarted }) => {
  const steps = [
    {
      step: '01',
      title: 'Choose Your Destination',
      description: 'Select from 200+ countries or choose a regional/global plan for multiple borders.',
      icon: Compass,
      accent: 'from-[#0B192C] to-[#3B82F6]'
    },
    {
      step: '02',
      title: 'Select Your Plan',
      description: 'Pick the right gigabytes or unlimited package for your trip duration and checkout in seconds.',
      icon: ShoppingBag,
      accent: 'from-[#00B67A] to-[#009E69]'
    },
    {
      step: '03',
      title: 'Scan Your QR Code',
      description: 'Receive your activation code instantly via email and scan it in your phone cellular settings.',
      icon: QrCode,
      accent: 'from-[#3B82F6] to-[#2563EB]'
    },
    {
      step: '04',
      title: 'Connect & Travel',
      description: 'Land at your destination, turn on data roaming, and enjoy high-speed 5G immediately.',
      icon: Wifi,
      accent: 'from-[#FF6B35] to-[#E8551E]'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#F0F4F8] border-t border-blue-100/80 relative overflow-hidden">
      
      {/* Decorative background travel route curve */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#FF6B35] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>4 Simple Steps</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B192C] tracking-tight font-['Space_Grotesk']">
            How ESIMORA Works
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto">
            Get connected in under 2 minutes. No plastic cards, no airport kiosks, no surprise roaming charges.
          </p>
        </div>

        {/* 4 Large Steps Connected with Flight Line */}
        <div className="relative">
          
          {/* Curved flight dotted line on desktop */}
          <div className="hidden lg:block absolute top-1/3 left-12 right-12 h-1 border-t-2 border-dashed border-blue-200 -z-0 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="relative bg-white rounded-[28px] p-7 border border-slate-200/90 shadow-md hover:shadow-xl hover:border-[#3B82F6]/40 transition-all duration-300 hover:-translate-y-2 group flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Colorful Icon & Step Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.accent} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-4xl font-black text-slate-200 group-hover:text-[#FF6B35] transition-colors font-['Space_Grotesk']">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-[#0B192C] mb-2 font-['Space_Grotesk']">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>Phase 0{idx + 1}</span>
                    <span className="text-[#FF6B35] font-extrabold">&rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Setup Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#0B192C] to-[#182C48] rounded-[32px] p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl border border-slate-800 relative overflow-hidden">
          
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#3B82F6]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 text-center sm:text-left relative z-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6B35]">
              PRO TRAVELER TIP
            </span>
            <h4 className="text-2xl font-black font-['Space_Grotesk']">
              Install Before You Board Your Flight
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              Scan your QR code on airport Wi-Fi before departure. The validity period only begins when your phone connects to the overseas network!
            </p>
          </div>

          <button
            onClick={onGetStarted}
            className="px-8 py-4 text-xs sm:text-sm font-extrabold text-white bg-[#FF6B35] hover:bg-[#E8551E] rounded-full transition-all shadow-lg shadow-[#FF6B35]/30 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer flex items-center gap-2 relative z-10"
          >
            <span>Get Your eSIM Now</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>
    </section>
  );
};
