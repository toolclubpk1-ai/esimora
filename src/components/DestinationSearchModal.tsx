import React, { useState, useEffect, useRef } from 'react';
import { Destination, CurrencyConfig } from '../types';
import { Search, X, ArrowRight, Signal, MapPin } from 'lucide-react';
import { LandmarkArtwork } from './LandmarkArtwork';

interface DestinationSearchModalProps {
  destinations: Destination[];
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (dest: Destination) => void;
  currentCurrency: CurrencyConfig;
}

export const DestinationSearchModal: React.FC<DestinationSearchModalProps> = ({
  destinations,
  isOpen,
  onClose,
  onSelectDestination,
  currentCurrency
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = destinations.filter(d =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.code.toLowerCase().includes(query.toLowerCase()) ||
    d.region.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100">
          <Search className="w-5 h-5 text-[#3B82F6] mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country, destination, or region..."
            className="w-full text-base text-[#0B192C] placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500">
              No destinations found for "{query}".
            </div>
          ) : (
            filtered.map((dest) => (
              <button
                key={dest.id}
                onClick={() => {
                  onSelectDestination(dest);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-blue-50/70 transition-colors text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-11 rounded-xl overflow-hidden relative shrink-0 shadow-xs border border-slate-200">
                    <LandmarkArtwork destinationId={dest.id} />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0B192C] text-sm group-hover:text-[#3B82F6] transition-colors flex items-center gap-1.5">
                      <span>{dest.flag}</span>
                      <span>{dest.name}</span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      {dest.landmarkName ? (
                        <>
                          <MapPin className="w-2.5 h-2.5 text-[#FF6B35] shrink-0" />
                          <span className="truncate max-w-[200px]">{dest.landmarkName}</span>
                        </>
                      ) : (
                        <span>{dest.region} · {dest.code}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">from</span>
                    <span className="text-sm font-extrabold text-[#0B192C] group-hover:text-[#FF6B35] tabular-nums transition-colors">
                      {currentCurrency.symbol}{(dest.startingPrice * currentCurrency.rate).toFixed(2)}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#FF6B35] transition-colors" />
                </div>
              </button>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
