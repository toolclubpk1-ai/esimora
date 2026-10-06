import React, { useState } from 'react';
import { ReviewItem } from '../types';
import { Star, ShieldCheck, Sparkles } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  const [filterDest, setFilterDest] = useState<string>('All');

  const destinations = ['All', ...Array.from(new Set(reviews.map(r => r.destination)))];

  const filtered = filterDest === 'All'
    ? reviews
    : reviews.filter(r => r.destination === filterDest);

  // Background variants for card diversity
  const cardBgs = ['bg-white', 'bg-[#F0F4F8]/70', 'bg-white', 'bg-[#F0F4F8]/70', 'bg-white'];

  return (
    <section className="py-20 sm:py-28 bg-[#F0F4F8] border-t border-blue-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Rating Summary */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#FF6B35] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Stories</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0B192C] tracking-tight font-['Space_Grotesk']">
            Trusted by Travelers Worldwide
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Real feedback from international tourists, business executives, and remote adventurers.
          </p>

          {/* Holafly Trustpilot Rating Summary Box */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-4 px-7 py-4 rounded-full bg-white border border-slate-200/90 shadow-md">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[#00B67A] text-sm tracking-wider">★ Trustpilot</span>
              <div className="flex text-[#00B67A]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-base">★</span>
                ))}
              </div>
            </div>
            <div className="text-base font-black text-[#0B192C] tabular-nums">
              4.7 / 5.0
            </div>
            <div className="text-slate-300">·</div>
            <div className="text-xs text-slate-600 font-semibold">
              Loved by travelers across 140+ countries
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {destinations.map((dest) => (
            <button
              key={dest}
              onClick={() => setFilterDest(dest)}
              className={`px-5 py-2.5 text-xs font-bold rounded-full transition-all whitespace-nowrap cursor-pointer ${
                filterDest === dest
                  ? 'bg-[#0B192C] text-white shadow-md shadow-[#0B192C]/25'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-2xs'
              }`}
            >
              {dest}
            </button>
          ))}
        </div>

        {/* Review Cards Grid with Avatar Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((rev, index) => {
            const initials = rev.customerName
              .split(' ')
              .map(n => n[0])
              .join('')
              .slice(0, 2);

            const bgClass = cardBgs[index % cardBgs.length];

            return (
              <div
                key={rev.id}
                className={`${bgClass} rounded-[28px] p-7 border border-slate-200/90 shadow-md hover:shadow-xl hover:border-[#3B82F6]/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                <div>
                  {/* Rating stars & Destination */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-[#00B67A]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <span key={i} className="text-base">★</span>
                      ))}
                    </div>
                    <span className="text-[11px] font-extrabold text-[#FF6B35] bg-[#FFF0EB] px-3 py-1 rounded-full border border-[#FF6B35]/20">
                      {rev.destination}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>

                {/* Author Avatar & Country */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0B192C] to-[#3B82F6] text-white flex items-center justify-center font-black text-xs shadow-xs">
                      {initials}
                    </div>
                    <div>
                      <div className="font-extrabold text-[#0B192C] text-xs sm:text-sm">{rev.customerName}</div>
                      <div className="text-slate-400 text-[11px] font-medium">{rev.country} · {rev.date}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-[#00B67A] font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified Buyer</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
