import React from 'react';
import { Zap, DollarSign, Globe2, QrCode, Headphones, ShieldCheck, Sparkles } from 'lucide-react';

export const WhyEsimora: React.FC = () => {
  const cards = [
    {
      title: 'Instant Delivery',
      description: 'Receive your eSIM QR code instantly via email and in-app after checkout. Ready to scan and activate in 60 seconds.',
      icon: Zap,
      gradient: 'from-[#0B192C] to-[#3B82F6]',
      bg: 'bg-white'
    },
    {
      title: 'Zero Roaming Fees',
      description: 'Say goodbye to unexpected carrier roaming bills. Pay once for transparent unlimited or fixed data with zero hidden fees.',
      icon: DollarSign,
      gradient: 'from-[#00B67A] to-[#009E69]',
      bg: 'bg-white'
    },
    {
      title: 'Global Coverage',
      description: 'Enjoy seamless mobile data across 200+ destinations worldwide powered by Tier-1 local carrier networks.',
      icon: Globe2,
      gradient: 'from-[#3B82F6] to-[#2563EB]',
      bg: 'bg-white'
    },
    {
      title: 'Keep Your WhatsApp',
      description: 'Retain your original phone number for WhatsApp and contacts. No need to inform friends of a new local number.',
      icon: QrCode,
      gradient: 'from-[#00B67A] to-[#00C853]',
      bg: 'bg-white'
    },
    {
      title: '24/7 Human WhatsApp Support',
      description: 'Get round-the-clock help from our multilingual human travel specialists via live chat and WhatsApp.',
      icon: Headphones,
      gradient: 'from-[#FF6B35] to-[#E8551E]',
      bg: 'bg-white'
    },
    {
      title: '100% Money-Back Guarantee',
      description: 'Full refund guarantee if your eSIM cannot be activated on a compatible device. Safe and bank-grade secure.',
      icon: ShieldCheck,
      gradient: 'from-[#00B67A] to-[#008955]',
      bg: 'bg-white'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F0F4F8] border-t border-blue-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#FF6B35] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The ESIMORA Difference</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B192C] tracking-tight font-['Space_Grotesk']">
            Why Travelers Love ESIMORA
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Engineered for modern travelers, digital nomads, and vacationers seeking effortless connectivity.
          </p>
        </div>

        {/* 6 Cards Grid with Alternating Surfaces */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`${item.bg} rounded-[28px] p-8 border border-slate-200/90 hover:border-[#3B82F6]/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group`}
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.gradient} text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-black text-[#0B192C] mb-2.5 font-['Space_Grotesk']">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
