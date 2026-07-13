import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Compass, ArrowRight, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data/safariData';
import { Language, TRANSLATIONS } from '../data/translations';

interface HeroSliderProps {
  onPlanCustomClick: () => void;
  onExploreJourneysClick: () => void;
  currentLanguage: Language;
}

export default function HeroSlider({ onPlanCustomClick, onExploreJourneysClick, currentLanguage }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 1.2, ease: 'easeInOut' as any },
        scale: { duration: 6, ease: 'easeOut' as any }, // elegant panning effect
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 1.2, ease: 'easeInOut' as any },
    },
  };

  const activeSlide = HERO_SLIDES[current];
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const getLocalizedSlide = () => {
    let location = activeSlide.location;
    let title = activeSlide.title;
    let tagline = activeSlide.tagline;

    if (current === 0) { // Rift Valley
      location = t.hero_location_rift || location;
      title = t.hero_title_rift || title;
      tagline = t.hero_tagline_rift || tagline;
    } else if (current === 1) { // Maasai Mara Airspace
      location = t.hero_location_mara || location;
      title = t.hero_title_mara || title;
      tagline = t.hero_tagline_mara || tagline;
    } else if (current === 3) { // Amboseli
      location = t.hero_location_amboseli || location;
      title = t.hero_title_amboseli || title;
      tagline = t.hero_tagline_amboseli || tagline;
    }

    return { location, title, tagline };
  };

  const { location, title, tagline } = getLocalizedSlide();

  return (
    <div id="hero-slider" className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden bg-stone-950">
      {/* Background Images with AnimatePresence */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/40 z-10" />
            <img
              src={activeSlide.image}
              alt={title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Content Overlay */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-16 md:pb-24 pt-32 h-full">
          <div className="max-w-3xl space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-400 text-xs font-mono uppercase tracking-widest"
            >
              <Compass className="w-3.5 h-3.5 animate-spin-slow text-amber-400" />
              <span>{location}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-7xl font-sans font-medium text-stone-100 tracking-tight leading-none"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg md:text-xl text-stone-300 font-sans font-light max-w-2xl leading-relaxed"
            >
              {tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-wrap items-center gap-4 pt-4 md:pt-6"
            >
              <button
                id="hero-book-btn"
                onClick={onPlanCustomClick}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-sans font-medium hover:scale-[1.02] shadow-xl hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>{t.hero_tailor || "Tailor-Made Planner"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-btn"
                onClick={onExploreJourneysClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-stone-900 bg-opacity-70 backdrop-blur-md hover:bg-stone-850 text-stone-200 hover:text-white border border-stone-800 font-sans transition-all duration-300 cursor-pointer"
              >
                <span>{t.hero_explore || "Curated Journeys"}</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Carousel Left/Right Buttons */}
      <div className="absolute bottom-6 right-6 md:right-12 z-30 flex items-center gap-3">
        <button
          id="btn-prev-slide"
          aria-label="Previous slide"
          onClick={handlePrev}
          className="p-3.5 rounded-full border border-stone-800 text-stone-400 hover:text-stone-100 bg-stone-900 bg-opacity-60 hover:bg-stone-800/80 backdrop-blur transition-all duration-300 hover:scale-105"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          id="btn-next-slide"
          aria-label="Next slide"
          onClick={handleNext}
          className="p-3.5 rounded-full border border-stone-800 text-stone-400 hover:text-stone-100 bg-stone-900 bg-opacity-60 hover:bg-stone-800/80 backdrop-blur transition-all duration-300 hover:scale-105"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-8 left-6 md:left-12 z-30 flex items-center gap-2.5">
        {HERO_SLIDES.map((_, i) => (
          <button
            id={`slide-dot-${i}`}
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
              i === current ? 'w-8 bg-amber-400' : 'w-2 bg-stone-700 hover:bg-stone-500'
            }`}
          />
        ))}
        <span className="ml-2.5 text-xs text-stone-500 font-mono tracking-wider">
          0{current + 1} / 0{HERO_SLIDES.length}
        </span>
      </div>
    </div>
  );
}
