import React, { useState } from 'react';
import { FAQItem } from '../types';
import { ChevronDown, Search, HelpCircle, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

interface FaqSectionProps {
  faqs: FAQItem[];
  onOpenSupport: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs, onOpenSupport }) => {
  const [openIds, setOpenIds] = useState<string[]>([faqs[0]?.id || 'faq-1']);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'general', label: 'General' },
    { id: 'installation', label: 'Setup' },
    { id: 'compatibility', label: 'Devices' },
    { id: 'billing', label: 'Billing' }
  ];

  const filtered = faqs.filter((faq) => {
    if (activeCategory !== 'all' && faq.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const matchQ = faq.question.toLowerCase().includes(searchQuery.toLowerCase());
      const matchA = faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchQ || matchA;
    }
    return true;
  });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#F0F4F8] border-t border-blue-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Large Heading & Assistance Card */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#FF6B35]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Questions & Answers</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#0B192C] tracking-tight font-['Space_Grotesk'] leading-[1.15]">
              Everything You <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#FF6B35]">
                Need To Know
              </span>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Find answers to the most common questions about buying, installing, and traveling with an international eSIM.
            </p>

            {/* Quick Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. hotspot, install)..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#0B192C] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/25 focus:border-[#3B82F6] shadow-xs"
              />
            </div>

            {/* Support Callout Box */}
            <div className="p-6 rounded-[28px] bg-white border border-slate-200/90 shadow-md space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#DBEAFE] text-[#3B82F6] flex items-center justify-center font-bold">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#0B192C]">Still have questions?</h4>
                  <p className="text-xs text-slate-500">Live human specialists ready 24/7</p>
                </div>
              </div>

              <button
                onClick={onOpenSupport}
                className="w-full py-3 px-4 text-xs font-extrabold text-white bg-[#0B192C] hover:bg-[#182C48] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#0B192C]/25 active:scale-95"
              >
                <span>Contact 24/7 Support</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Side: Modern Accordion Cards */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-4 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === c.id
                      ? 'bg-[#0B192C] text-white shadow-md shadow-[#0B192C]/25'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Questions list */}
            {filtered.length === 0 ? (
              <div className="py-12 text-center bg-white rounded-3xl border border-slate-200 p-6">
                <p className="text-sm text-slate-500">No questions found matching "{searchQuery}".</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="mt-2 text-xs font-bold text-[#3B82F6] hover:underline cursor-pointer"
                >
                  Clear search filter
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((item) => {
                  const isOpen = openIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`bg-white rounded-[22px] border transition-all duration-200 overflow-hidden shadow-xs ${
                        isOpen ? 'border-[#3B82F6] ring-2 ring-[#3B82F6]/15 shadow-md' : 'border-slate-200/90 hover:border-slate-300'
                      }`}
                    >
                      <button
                        onClick={() => toggleAccordion(item.id)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-blue-50/30 transition-colors cursor-pointer"
                      >
                        <span className={`text-sm sm:text-base font-extrabold transition-colors ${
                          isOpen ? 'text-[#3B82F6]' : 'text-[#0B192C]'
                        }`}>
                          {item.question}
                        </span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen ? 'bg-[#3B82F6] text-white rotate-180' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 whitespace-pre-line animate-in fade-in duration-150">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
