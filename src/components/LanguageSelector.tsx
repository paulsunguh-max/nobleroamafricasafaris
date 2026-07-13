import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronDown, Check, Sparkles, MapPin } from 'lucide-react';
import { Language, LANGUAGES, TRANSLATIONS } from '../data/translations';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  detectedByIP: boolean;
  countryName: string;
}

export default function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  detectedByIP,
  countryName
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeLangOption = LANGUAGES.find(l => l.code === currentLanguage) || LANGUAGES[0];
  const t = TRANSLATIONS[currentLanguage];

  return (
    <div id="zuri-language-selector-wrapper" ref={containerRef} className="relative z-50">
      <button
        id="language-selector-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-850 hover:border-amber-500/30 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-all duration-300 select-none text-xs"
      >
        <span className="text-sm shrink-0">{activeLangOption.flag}</span>
        <span className="font-mono text-[11px] font-medium tracking-wider uppercase">
          {activeLangOption.nativeName}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-500' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="language-selector-dropdown"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-64 bg-white dark:bg-stone-950/95 backdrop-blur-xl border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden p-2 space-y-1.5"
          >
            {/* Auto-detection header info banner */}
            <div className="px-3 py-2 bg-stone-50 dark:bg-stone-900/60 border border-stone-150 dark:border-stone-850 rounded-xl space-y-1 text-left">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-500 uppercase tracking-widest">
                <Sparkles className="w-3 h-3 animate-pulse" />
                <span>{t.ip_detected || 'Smart IP Location'}</span>
              </div>
              <p className="text-[10px] text-stone-400 font-sans leading-tight">
                {detectedByIP && countryName ? (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-500" />
                    <span>{countryName}</span>
                  </span>
                ) : (
                  <span>Checking IP routing server...</span>
                )}
              </p>
            </div>

            {/* Custom Divider */}
            <div className="h-px bg-stone-200 dark:bg-stone-850/60 my-1" />

            {/* Language Options list */}
            <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
              {LANGUAGES.map((option) => {
                const isSelected = option.code === currentLanguage;
                return (
                  <button
                    id={`lang-option-${option.code}`}
                    key={option.code}
                    onClick={() => {
                      onLanguageChange(option.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 text-left ${
                      isSelected
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-900/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base select-none">{option.flag}</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-sans font-medium">{option.nativeName}</span>
                        <span className="text-[9px] font-mono text-stone-500 uppercase tracking-wider">{option.name}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
