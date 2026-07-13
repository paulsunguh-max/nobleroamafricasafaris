import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Search, Maximize2, Sparkles, Calendar, MapPin, User, X, SlidersHorizontal, Eye } from 'lucide-react';
import { MASTERPIECES_DATA } from '../data/masterpiecesData';
import { NatureMasterpiece } from '../types';

export default function MasterpiecesGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Artworks");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeMasterpiece, setActiveMasterpiece] = useState<NatureMasterpiece | null>(null);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);

  // Categories include All + unique items
  const categories = ["All Artworks", "Big Cats", "Giants of the Soil", "Avian Skies", "Rift & Rivers", "Vistas & Horizons"];

  // Filter and Search logic
  const filteredMasterpieces = useMemo(() => {
    return MASTERPIECES_DATA.filter((item) => {
      const matchesCategory = selectedCategory === "All Artworks" || item.category === selectedCategory;
      const matchesSearch = searchQuery.trim() === "" || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.photographer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const togglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPinnedIds(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  return (
    <div id="sovereign-masterpieces-container" className="space-y-10">
      
      {/* Search & Filter Header Control Deck */}
      <div id="masterpiece-control-deck" className="p-6 bg-stone-50 dark:bg-stone-900/30 border border-stone-200 dark:border-stone-850 rounded-2xl space-y-4 text-left shadow-sm dark:shadow-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-3.5 flex items-center text-stone-400 dark:text-stone-500">
              <Search className="w-4 h-4 text-stone-400 dark:text-stone-500" />
            </span>
            <input
              id="masterpiece-search-input"
              type="text"
              placeholder="Search by species, photographer, or sanctuary location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-stone-950/80 border border-stone-250 dark:border-stone-850 hover:border-stone-350 dark:hover:border-stone-750 focus:border-amber-500/50 rounded-xl text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-600 text-xs font-sans transition-all focus:outline-none focus:ring-1 focus:ring-amber-500/20"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-3 flex items-center text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 bg-none border-none cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-stone-600 dark:text-stone-400 text-xs font-mono font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
            <span>Showing {filteredMasterpieces.length} of 40 Registered Archives</span>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-3.5 border-t border-stone-200 dark:border-stone-900">
          {categories.map((cat) => (
            <button
              id={`filter-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400 font-semibold ring-1 ring-amber-500/10'
                  : 'bg-white dark:bg-stone-950/40 border-stone-200 dark:border-stone-850 hover:border-stone-300 dark:hover:border-stone-750 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 shadow-sm dark:shadow-none'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout of 40 Pieces */}
      <div id="masterpieces-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredMasterpieces.map((item, index) => {
            const isPinned = pinnedIds.includes(item.id);
            return (
              <motion.div
                id={`masterpiece-card-${item.id}`}
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                onClick={() => setActiveMasterpiece(item)}
                className="group relative h-72 rounded-2xl overflow-hidden border border-stone-900 bg-stone-950 shadow-lg hover:shadow-2xl cursor-pointer"
              >
                {/* Visual Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Ambient overlay shadows */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent opacity-80 z-10" />

                {/* Top Action Ribbon */}
                <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between">
                  <span className="text-[8px] bg-stone-950/80 border border-stone-850 text-amber-400 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                    {item.category}
                  </span>
                  
                  {/* Pin feature indicator */}
                  <button
                    onClick={(e) => togglePin(item.id, e)}
                    className="p-1.5 rounded-lg bg-stone-950/80 hover:bg-stone-900 border border-stone-850/60 text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isPinned ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>

                {/* Bottom Curatorial Card label */}
                <div className="absolute bottom-4 left-4 right-4 z-20 space-y-1.5 text-left">
                  <div className="flex items-center gap-1.5 text-stone-500 font-mono text-[9px]">
                    <MapPin className="w-3 h-3 text-amber-500" />
                    <span>{item.location}</span>
                  </div>
                  <h4 className="font-sans font-medium text-stone-100 text-sm tracking-tight leading-tight group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between pt-1 text-[9px] font-mono text-stone-400 border-t border-stone-800/60">
                    <span className="truncate max-w-[120px]">{item.photographer}</span>
                    <span className="text-[8px] text-stone-500">{item.aperture}</span>
                  </div>
                </div>

                {/* Hover Maximize Eye Hint */}
                <div className="absolute inset-0 z-15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/30">
                  <span className="p-3 bg-stone-900/90 border border-stone-850 rounded-full text-amber-400 shadow-xl flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider">
                    <Eye className="w-4 h-4" />
                    <span>Survey Plate</span>
                  </span>
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredMasterpieces.length === 0 && (
          <div className="col-span-full py-16 text-center space-y-3 bg-stone-900/10 border border-dashed border-stone-850 rounded-2xl">
            <Camera className="w-8 h-8 text-stone-600 mx-auto" strokeWidth={1} />
            <p className="text-sm font-sans text-stone-500">No archival masterpieces matched your current filters or query.</p>
            <button
              onClick={() => { setSelectedCategory("All Artworks"); setSearchQuery(""); }}
              className="text-xs text-amber-400 hover:text-amber-300 font-mono uppercase bg-transparent border-none cursor-pointer"
            >
              Reset Search Parameters
            </button>
          </div>
        )}
      </div>

      {/* Luxury Curatorial Lightbox Modal */}
      <AnimatePresence>
        {activeMasterpiece && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/95 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-5xl bg-stone-900 border border-stone-850 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] md:h-auto max-h-[90vh]"
            >
              
              {/* Left Picture Bay */}
              <div className="flex-1 bg-stone-950 relative overflow-hidden h-1/2 md:h-auto flex items-center justify-center">
                <img
                  src={activeMasterpiece.imageUrl}
                  alt={activeMasterpiece.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover md:object-contain max-h-[60vh] md:max-h-[80vh] mx-auto"
                />
                
                {/* Ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 to-transparent pointer-events-none" />
              </div>

              {/* Right Ledger Bay */}
              <div className="w-full md:w-[400px] p-6 md:p-8 bg-stone-900 text-stone-300 border-t md:border-t-0 md:border-l border-stone-850 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-6 text-left">
                  
                  {/* Category Card Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded bg-amber-500/5 uppercase tracking-widest">
                      {activeMasterpiece.category}
                    </span>
                    <button
                      onClick={() => setActiveMasterpiece(null)}
                      className="p-1.5 rounded-lg bg-stone-950/80 hover:bg-stone-950 border border-stone-850 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title & Location details */}
                  <div className="space-y-2">
                    <h3 className="font-serif-luxury text-xl md:text-2xl font-semibold text-white tracking-tight">
                      {activeMasterpiece.title}
                    </h3>
                    <div className="flex items-center gap-2 text-stone-400 text-xs font-mono">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      <span>{activeMasterpiece.location}</span>
                    </div>
                  </div>

                  {/* Curatorial Description */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] uppercase font-mono tracking-widest text-stone-500 font-semibold">Narrative Blueprint</h4>
                    <p className="text-xs md:text-sm text-stone-450 leading-relaxed font-sans font-light">
                      {activeMasterpiece.description}
                    </p>
                  </div>

                  {/* Scientific & Photographic Telemetry */}
                  <div className="space-y-3 pt-4 border-t border-stone-850">
                    <h4 className="text-[10px] uppercase font-mono tracking-widest text-stone-500 font-semibold">Metadata Registry</h4>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-2.5 bg-stone-950/40 border border-stone-850/50 rounded-xl space-y-1">
                        <span className="text-[8px] text-stone-600 block uppercase font-mono">Photographer</span>
                        <span className="text-stone-300 tracking-tight flex items-center gap-1">
                          <User className="w-3 h-3 text-amber-500" />
                          {activeMasterpiece.photographer}
                        </span>
                      </div>
                      
                      <div className="p-2.5 bg-stone-950/40 border border-stone-850/50 rounded-xl space-y-1">
                        <span className="text-[8px] text-stone-600 block uppercase font-mono">Telemetry (Camera)</span>
                        <span className="text-stone-300 tracking-tight flex items-center gap-1">
                          <Camera className="w-3 h-3 text-amber-500" />
                          {activeMasterpiece.aperture}
                        </span>
                      </div>

                      <div className="p-2.5 bg-stone-950/40 border border-stone-850/50 rounded-xl space-y-1 col-span-2">
                        <span className="text-[8px] text-stone-600 block uppercase font-mono">Archival Registration</span>
                        <span className="text-stone-300 tracking-tight flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-500" />
                          <span>Registered {activeMasterpiece.dateTaken}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Pin to custom blueprints action */}
                <div className="pt-6 border-t border-stone-850/60 mt-6 space-y-3">
                  <button
                    id="lightbox-pin-btn"
                    onClick={(e) => {
                      togglePin(activeMasterpiece.id, e);
                    }}
                    className={`w-full py-3 px-4 rounded-xl text-xs uppercase font-mono tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer outline-none border ${
                      pinnedIds.includes(activeMasterpiece.id)
                        ? 'bg-amber-500 text-stone-950 border-amber-400'
                        : 'bg-stone-950 hover:bg-stone-900 border-stone-800 text-amber-400 hover:text-amber-300'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {pinnedIds.includes(activeMasterpiece.id) 
                        ? 'Masterpiece Pinned to Profile' 
                        : 'Pin to Blueprint Board'}
                    </span>
                  </button>

                  <p className="text-[9px] text-center text-stone-500 font-sans leading-relaxed">
                    Pinning saves this artwork parameters directly into your custom Zuri Canvas briefing profile for the Nairobi designers to review.
                  </p>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
