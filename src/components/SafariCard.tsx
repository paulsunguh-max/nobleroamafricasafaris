import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Landmark, Compass, Clock, Map, Sparkles, User, ChevronRight } from 'lucide-react';
import { SafariPackage } from '../types';

interface SafariCardProps {
  safari: SafariPackage;
  onSelect: (safari: SafariPackage) => void;
}

export default function SafariCard({ safari, onSelect }: SafariCardProps) {
  const [activeImage, setActiveImage] = useState(safari.featuredImage);

  return (
    <motion.div
      id={`safari-card-${safari.id}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl overflow-hidden flex flex-col h-full shadow-sm dark:shadow-lg hover:shadow-xl dark:hover:shadow-amber-500/5 hover:border-amber-500/30 dark:hover:border-stone-750 transition-all duration-300"
    >
      {/* Primary Image Container */}
      <div 
        className="relative h-64 overflow-hidden bg-stone-950 cursor-pointer"
        onClick={() => onSelect(safari)}
      >
        <img
          src={activeImage}
          alt={safari.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Destination Chip */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1.5 max-w-[85%]">
          <span className="px-3 py-1 bg-stone-950/75 backdrop-blur-md text-stone-200 border border-stone-800 text-[10px] font-mono rounded-full uppercase tracking-wider">
            {safari.experienceType}
          </span>
        </div>

        {/* Thumbnail switcher gallery inside bottom image border */}
        {safari.gallery && safari.gallery.length > 0 && (
          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-center gap-1.5 bg-stone-950/40 backdrop-blur-xs p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {[safari.featuredImage, ...safari.gallery].slice(0, 4).map((url, i) => (
              <button
                id={`switch-thumb-${safari.id}-${i}`}
                key={i}
                onMouseEnter={() => setActiveImage(url)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(url);
                }}
                className={`w-10 h-8 rounded border overflow-hidden cursor-pointer transition-all ${
                  activeImage === url ? 'border-amber-400 scale-105' : 'border-stone-800 hover:border-stone-500'
                }`}
              >
                <img src={url} alt="thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Safari Content detail area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-stone-700 dark:text-stone-300">
        <div className="space-y-2">
          <h3 className="text-xl font-sans font-medium text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
            {safari.title}
          </h3>

          <p className="text-sm font-sans font-light text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
            {safari.tagline}
          </p>
        </div>

        {/* Highlights summary pills */}
        <div className="space-y-2 pt-2 border-t border-stone-155 dark:border-stone-850">
          <span className="text-[10px] font-mono text-stone-550 uppercase tracking-widest block">Featured Excursions:</span>
          <div className="flex flex-wrap gap-1.5">
            {safari.destinations.map((dest, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-950 font-sans font-light text-[11px] text-stone-700 dark:text-stone-400 border border-stone-200 dark:border-stone-850"
              >
                {dest}
              </span>
            ))}
          </div>
        </div>

        {/* Price Tag and Modal Button */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-155 dark:border-stone-850">
          <div>
            <span className="text-[10px] text-stone-550 block leading-none font-mono uppercase">Premium Rates</span>
            <span className="text-sm font-mono text-amber-600 dark:text-amber-500 font-medium tracking-wide">
              Rate on Request
            </span>
          </div>

          <button
            id={`open-blueprint-${safari.id}`}
            onClick={() => onSelect(safari)}
            className="group flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-mono tracking-wider uppercase cursor-pointer transition-colors"
          >
            <span>Itinerary</span>
            <ChevronRight className="w-4 h-4 text-amber-600 dark:text-amber-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
