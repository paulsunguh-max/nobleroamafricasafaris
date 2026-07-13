import React from 'react';
import { motion } from 'motion/react';
import { X, Calendar, MapPin, Sparkles, AlertCircle, Quote, Compass } from 'lucide-react';
import { SafariPackage } from '../types';

interface ItineraryModalProps {
  safari: SafariPackage;
  onClose: () => void;
  onBookThis: (packageName: string) => void;
}

export default function ItineraryModal({ safari, onClose, onBookThis }: ItineraryModalProps) {
  return (
    <div 
      id="itinerary-modal" 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-stone-950/85 backdrop-blur-md overflow-y-auto cursor-pointer"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl my-8 text-stone-200 cursor-default"
      >
        {/* Floating Close Button */}
        <button
          id="close-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-850 border border-stone-800 text-stone-400 hover:text-stone-100 backdrop-blur-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner inside Modal */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-stone-950/10 z-10" />
          <img
            src={safari.featuredImage}
            alt={safari.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-6 left-6 md:left-10 z-20 max-w-3xl">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono rounded-full uppercase tracking-wider mb-2 inline-block">
              {safari.experienceType}
            </span>
            <h2 className="text-2xl md:text-4xl font-sans font-medium text-white tracking-tight leading-tight">
              {safari.title}
            </h2>
          </div>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
          
          {/* Left Column: Program Inclusions & Disclaimer */}
          <div className="space-y-6">
            <div className="p-5 bg-stone-950/40 rounded-xl border border-stone-850 space-y-4">
              <h3 className="text-stone-300 font-mono text-xs uppercase tracking-widest border-b border-stone-800 pb-2">
                Program Inclusions
              </h3>
              
              <div className="space-y-3 font-sans text-sm">
                <div>
                  <span className="text-stone-500 block text-xs">Elite Lodgings Host</span>
                  <div className="mt-1 space-y-1">
                    {safari.lodges.map((l, index) => (
                      <span key={index} className="block text-stone-400 text-xs font-light">
                        • {l}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-stone-500 block text-xs">Aesthetic Valuation</span>
                  <span className="font-medium text-amber-400 block text-sm font-mono tracking-tight mt-0.5">
                    Premium Rates on Request
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 font-sans leading-normal">
              *The above programs are fully custom-adjustable. Your final day-by-day schedules are tailored exclusively for your travel parties by our master advisors.
            </p>
          </div>

          {/* Right Column: Highlights & Inquiry */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/10 space-y-3 flex-1">
              <span className="font-sans font-medium text-amber-400 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Expert Highlights
              </span>
              <ul className="space-y-2 text-xs text-stone-400 font-light leading-relaxed">
                {safari.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-amber-500">✦</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              id={`book-safari-${safari.id}`}
              onClick={() => onBookThis(safari.title)}
              className="w-full text-center px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-sans font-medium rounded-lg shadow-lg hover:shadow-amber-500/5 transition-all cursor-pointer"
            >
              Inquire About This Journey
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
