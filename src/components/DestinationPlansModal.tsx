import React, { useState } from 'react';
import { Destination, ESIMPlan, CurrencyConfig } from '../types';
import { PlanCard } from './PlanCard';
import { X, Signal, CheckCircle2, Shield, MapPin } from 'lucide-react';
import { LandmarkArtwork } from './LandmarkArtwork';

interface DestinationPlansModalProps {
  destination: Destination | null;
  plans: ESIMPlan[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: ESIMPlan) => void;
  onViewDetails: (plan: ESIMPlan) => void;
  currentCurrency: CurrencyConfig;
}

export const DestinationPlansModal: React.FC<DestinationPlansModalProps> = ({
  destination,
  plans,
  isOpen,
  onClose,
  onSelectPlan,
  onViewDetails,
  currentCurrency
}) => {
  if (!isOpen || !destination) return null;

  const [filterDuration, setFilterDuration] = useState<'all' | '7' | '15' | '30'>('all');

  const destinationPlans = plans.filter(p => p.destinationId === destination.id);

  const filteredPlans = destinationPlans.filter(p => {
    if (filterDuration === 'all') return true;
    return String(p.validityDays) === filterDuration;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header with Landmark Picture Artwork */}
        <div className="relative px-6 py-6 bg-[#0B192C] text-white flex items-center justify-between shrink-0 overflow-hidden">
          {/* Landmark Artwork Background */}
          <div className="absolute inset-0 z-0 opacity-40">
            <LandmarkArtwork destinationId={destination.id} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C] via-[#0B192C]/85 to-[#0B192C]/70" />
          </div>

          <div className="relative z-10 flex items-center gap-4">
            <span className="text-4xl filter drop-shadow-md">{destination.flag}</span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
                  {destination.name} eSIM Plans
                </h3>
                <span className="text-xs bg-[#3B82F6]/25 text-blue-200 border border-[#3B82F6]/40 px-2.5 py-0.5 rounded-full font-bold">
                  {destination.region}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap text-xs">
                {destination.landmarkName && (
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-orange-200 font-bold shadow-xs">
                    <MapPin className="w-3 h-3 text-[#FF6B35]" />
                    <span>{destination.landmarkName}</span>
                  </div>
                )}
                <p className="text-slate-300 flex items-center gap-1.5">
                  <Signal className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>Connected via {destination.networks.join(' & ')}</span>
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="relative z-10 p-2 text-slate-400 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="px-6 py-3 bg-[#F0F4F8] border-b border-blue-100 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-semibold">Filter Duration:</span>
            <div className="flex gap-1">
              <button
                onClick={() => setFilterDuration('all')}
                className={`px-3.5 py-1 rounded-full font-bold cursor-pointer transition-colors ${
                  filterDuration === 'all' ? 'bg-[#FF6B35] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All Packages
              </button>
              <button
                onClick={() => setFilterDuration('7')}
                className={`px-3.5 py-1 rounded-full font-bold cursor-pointer transition-colors ${
                  filterDuration === '7' ? 'bg-[#FF6B35] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setFilterDuration('15')}
                className={`px-3.5 py-1 rounded-full font-bold cursor-pointer transition-colors ${
                  filterDuration === '15' ? 'bg-[#FF6B35] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                15 Days
              </button>
              <button
                onClick={() => setFilterDuration('30')}
                className={`px-3.5 py-1 rounded-full font-bold cursor-pointer transition-colors ${
                  filterDuration === '30' ? 'bg-[#FF6B35] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                30 Days
              </button>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[#00B67A] font-semibold text-[11px]">
            <CheckCircle2 className="w-4 h-4 text-[#00B67A]" />
            <span>Instant delivery in &lt; 60 seconds</span>
          </div>
        </div>

        {/* Plans Grid Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {filteredPlans.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              No packages found matching this duration.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  currentCurrency={currentCurrency}
                  onSelectPlan={(p) => {
                    onClose();
                    onSelectPlan(p);
                  }}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Dual SIM compatible · Keep your existing WhatsApp number</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
