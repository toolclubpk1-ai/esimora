import React from 'react';
import { ArrowRight, Globe } from 'lucide-react';

interface MobileStickyBarProps {
  onGetESIM: () => void;
  destinationCount: number;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onGetESIM,
  destinationCount
}) => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 shadow-2xl text-gray-900">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Global eSIM</span>
          <span className="text-xs font-black text-gray-900 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-[#00B67A]" />
            <span>200+ Destinations</span>
          </span>
        </div>

        <button
          onClick={onGetESIM}
          className="px-6 py-2.5 text-xs font-extrabold text-white bg-[#FF6B35] hover:bg-[#E8551E] active:scale-95 rounded-full shadow-lg shadow-[#FF6B35]/30 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <span>Get an eSIM</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
