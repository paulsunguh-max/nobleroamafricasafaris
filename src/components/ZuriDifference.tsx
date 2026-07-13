import React from 'react';
import { Shield, Sparkles, Crown, Plane, Camera, Compass, Heart, CheckCircle2 } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface ZuriDifferenceProps {
  currentLanguage: Language;
}

export default function ZuriDifference({ currentLanguage }: ZuriDifferenceProps) {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const REASONS = [
    {
      icon: <Crown className="w-5 h-5 text-amber-500" />,
      title: t.diff_reason1_title,
      desc: t.diff_reason1_desc
    },
    {
      icon: <Plane className="w-5 h-5 text-amber-500" />,
      title: t.diff_reason2_title,
      desc: t.diff_reason2_desc
    },
    {
      icon: <Camera className="w-5 h-5 text-amber-500" />,
      title: t.diff_reason3_title,
      desc: t.diff_reason3_desc
    },
    {
      icon: <Shield className="w-5 h-5 text-amber-500" />,
      title: t.diff_reason4_title,
      desc: t.diff_reason4_desc
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      title: t.diff_reason5_title,
      desc: t.diff_reason5_desc
    },
    {
      icon: <Heart className="w-5 h-5 text-amber-500" />,
      title: t.diff_reason6_title,
      desc: t.diff_reason6_desc
    }
  ];

  return (
    <div id="why-choose-us-section" className="space-y-16 py-12 text-stone-600 dark:text-stone-300">
      
      {/* Intro Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-amber-600 dark:text-amber-550 font-mono text-xs uppercase tracking-widest block font-medium px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full inline-block">
          {t.diff_badge}
        </span>
        <h2 className="text-3xl md:text-5xl font-serif-luxury font-semibold text-stone-900 dark:text-white tracking-tight">
          {t.diff_title}
        </h2>
        <p className="text-stone-500 dark:text-stone-400 text-xs md:text-sm font-sans font-light max-w-xl mx-auto leading-relaxed">
          {t.diff_desc}
        </p>
      </div>

      {/* Structured Core Grid of Reasons why clients choose us */}
      <div id="reasons-why-choose-us-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {REASONS.map((item, index) => (
          <div
            id={`reason-card-${index}`}
            key={index}
            className="group relative p-8 bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-850 hover:border-stone-300 dark:hover:border-stone-800 shadow-sm dark:shadow-none rounded-3xl space-y-5 hover:bg-stone-50 dark:hover:bg-stone-900/70 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4 text-left">
              {/* Icon Container */}
              <div className="p-3 bg-stone-50 dark:bg-stone-950/60 rounded-xl border border-stone-200 dark:border-stone-800 w-12 h-12 flex items-center justify-center group-hover:border-amber-500/30 transition-colors">
                {item.icon}
              </div>
              
              {/* Reason Title */}
              <h3 className="font-sans font-medium text-base text-stone-900 dark:text-white tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {item.title}
              </h3>
              
              {/* Detailed Compelling Text */}
              <p className="text-xs md:text-sm font-sans text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* Subtle verification badge at the bottom of card */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-850/40 flex items-center gap-2 text-[10px] font-mono text-stone-500 uppercase">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{t.diff_verified}</span>
            </div>
            
            {/* Top right subtle counter index */}
            <div className="absolute top-4 right-6 text-stone-300 dark:text-stone-800 text-xs font-mono font-bold select-none">
              0{index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Affirmative Banner */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <div className="p-6 bg-white dark:bg-gradient-to-r dark:from-stone-950 dark:to-stone-900/90 border border-stone-200 dark:border-stone-850 shadow-sm dark:shadow-none rounded-2xl flex flex-col md:flex-row items-center gap-6 justify-between text-left">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-amber-600 dark:text-amber-550 uppercase tracking-widest block font-semibold">{t.diff_standard}</span>
            <p className="text-xs text-stone-600 dark:text-stone-400 font-sans font-light max-w-xl leading-relaxed">
              {t.diff_standard_desc}
            </p>
          </div>
          <div className="shrink-0 font-mono text-amber-700 dark:text-amber-400 text-xs border border-amber-500/20 px-3.5 py-1.5 rounded-xl bg-amber-500/5 dark:bg-amber-500/5">
            {t.diff_approved}
          </div>
        </div>
      </div>

    </div>
  );
}

