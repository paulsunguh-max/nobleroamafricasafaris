import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  MapPin,
  Calendar,
  Sparkles,
  Phone,
  ArrowRight,
  Star,
  Instagram,
  Quote,
  CheckCircle,
  Menu,
  X,
  ShieldCheck,
  Plane,
  Camera,
  Sun,
  Moon
} from 'lucide-react';

import { SAFARI_PACKAGES, CLIENT_REVIEWS } from './data/safariData';
import { SafariPackage } from './types';

// Importing Custom Sub-components
import HeroSlider from './components/HeroSlider';
import SafariCard from './components/SafariCard';
import ItineraryModal from './components/ItineraryModal';
import AITailorPlanner from './components/AITailorPlanner';
import ZuriDifference from './components/ZuriDifference';
import BookingForm from './components/BookingForm';
import FAQSection from './components/FAQSection';
import MasterpiecesGallery from './components/MasterpiecesGallery';
import NobleRoamLogo from './components/NobleRoamLogo';

// Import translation engine elements
import { Language, TRANSLATIONS } from './data/translations';
import LanguageSelector from './components/LanguageSelector';
import MediaWall from './components/MediaWall';
import SafariMap from './components/SafariMap';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'journeys' | 'tailor' | 'difference' | 'reservations' | 'faq'>('home');
  const [selectedSafari, setSelectedSafari] = useState<SafariPackage | null>(null);
  const [bookingSelectorName, setBookingSelectorName] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dark & Light Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('zuri_theme');
    return (savedTheme as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('zuri_theme', theme);
  }, [theme]);

  // Localization and Geolocation states
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [detectedByIP, setDetectedByIP] = useState(false);
  const [countryName, setCountryName] = useState('');

  useEffect(() => {
    // 1. First check localStorage for a user preference override
    const savedLang = localStorage.getItem('zuri_language');
    const allSupportedLangs = ['en', 'sw', 'fr', 'de', 'es', 'zh', 'ar', 'it', 'pt', 'ja', 'ru', 'ko', 'nl', 'tr'];
    if (savedLang && allSupportedLangs.includes(savedLang)) {
      setCurrentLanguage(savedLang as Language);
      return;
    }

    // 2. Query geo IP detection server
    const detectIPLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
          const data = await response.json();
          const countryCode = data.country_code?.toUpperCase();
          const detectedCountry = data.country_name;

          if (detectedCountry) setCountryName(detectedCountry);

          let matchedLang: Language = 'en';
          if (['KE', 'TZ', 'UG', 'RW', 'BI', 'SO'].includes(countryCode)) {
            matchedLang = 'en'; // Default to English for East African countries as requested
          } else if (['FR', 'BE', 'CH', 'CA', 'CD', 'CG', 'CI', 'SN', 'ML', 'NE', 'TG', 'BJ', 'MC'].includes(countryCode)) {
            matchedLang = 'fr'; // French
          } else if (['DE', 'AT', 'CH', 'LI', 'LU'].includes(countryCode)) {
            matchedLang = 'de'; // German
          } else if (['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'UY', 'PY'].includes(countryCode)) {
            matchedLang = 'es'; // Spanish
          } else if (['CN', 'TW', 'HK', 'SG', 'MY'].includes(countryCode)) {
            matchedLang = 'zh'; // Chinese
          } else if (['SA', 'AE', 'QA', 'BH', 'OM', 'KW', 'EG', 'JO', 'LB', 'YE', 'IQ', 'DZ', 'MA', 'TN', 'LY', 'SD'].includes(countryCode)) {
            matchedLang = 'ar'; // Arabic
          } else if (['IT', 'SM', 'VA'].includes(countryCode)) {
            matchedLang = 'it'; // Italian
          } else if (['PT', 'BR', 'AO', 'MZ', 'CV', 'GW', 'ST'].includes(countryCode)) {
            matchedLang = 'pt'; // Portuguese
          } else if (['JP'].includes(countryCode)) {
            matchedLang = 'ja'; // Japanese
          } else if (['RU', 'BY', 'KZ', 'KG', 'AM', 'AZ', 'TJ', 'UZ'].includes(countryCode)) {
            matchedLang = 'ru'; // Russian
          } else if (['KR', 'KP'].includes(countryCode)) {
            matchedLang = 'ko'; // Korean
          } else if (['NL', 'SR'].includes(countryCode)) {
            matchedLang = 'nl'; // Dutch
          } else if (['TR'].includes(countryCode)) {
            matchedLang = 'tr'; // Turkish
          }

          setCurrentLanguage(matchedLang);
          setDetectedByIP(true);
          console.log(`[Noble Roam Africa] IP Detected Location: ${detectedCountry} (${countryCode}). Setting language context to: ${matchedLang}`);
          return;
        }
      } catch (err) {
        console.warn('[Noble Roam Africa] Geolocation server unavailable, resorting to browser preference.');
      }

      // 3. Fallback to Browser Language Context
      try {
        const browserPrefix = navigator.language?.split('-')[0]?.toLowerCase();
        const allSupportedLangs = ['en', 'sw', 'fr', 'de', 'es', 'zh', 'ar', 'it', 'pt', 'ja', 'ru', 'ko', 'nl', 'tr'];
        if (allSupportedLangs.includes(browserPrefix)) {
          setCurrentLanguage(browserPrefix as Language);
        }
      } catch (e) {
        // Safe fallback
      }
    };

    detectIPLocation();
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setCurrentLanguage(newLang);
    localStorage.setItem('zuri_language', newLang);
  };

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  // Tab switching animations helper
  const tabVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as any } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } },
  };

  const handleInquireFromItinerary = (packageName: string) => {
    setBookingSelectorName(packageName);
    setSelectedSafari(null);
    setActiveTab('reservations');
  };

  return (
    <div id="zuri-root-app" className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-200 antialiased font-sans selection:bg-amber-500 selection:text-white dark:selection:text-stone-950 flex flex-col justify-between transition-colors duration-300">
      
      {/* 1. Header / Top Luxury Elegant Navbar */}
      <header className="sticky top-0 z-40 bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-900 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          {/* Logo Brand Brandmark */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="p-1.5 bg-amber-500/5 border border-amber-400/25 rounded-xl group-hover:border-amber-400/70 group-hover:bg-amber-500/10 transition-all duration-300">
              <NobleRoamLogo size={38} className="transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div>
              <span className="font-serif-luxury text-lg md:text-xl font-bold tracking-tight text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                NOBLE ROAM
              </span>
              <span className="block text-[8px] font-mono tracking-widest text-stone-500 dark:text-stone-400 uppercase leading-none mt-0.5">
                AFRICA SAFARIS LTD
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 font-sans font-semibold text-xs uppercase tracking-wider">
            {[
              { id: 'home', label: t.nav_sanctuary || 'The Sanctuary' },
              { id: 'journeys', label: t.nav_journeys || 'Our Journeys' },
              { id: 'tailor', label: t.nav_canvas || 'Zuri Canvas (AI)' },
              { id: 'difference', label: t.nav_difference || 'The Difference' },
              { id: 'reservations', label: t.nav_contacts || 'Contacts' },
              { id: 'faq', label: t.nav_faq || 'FAQ' },
            ].map((tab) => (
              <button
                id={`nav-${tab.id}`}
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setBookingSelectorName('');
                }}
                className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 relative ${
                  activeTab === tab.id
                    ? 'text-amber-700 dark:text-amber-400 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm font-bold'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100/60 dark:hover:bg-stone-900/40 border border-transparent'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute bottom-0.5 left-4 right-4 h-0.5 bg-amber-500 dark:bg-amber-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Callouts with Theme Switcher and Language Selector */}
          <div className="flex items-center gap-3">
            {/* Dark & Light Theme Switcher */}
            <button
              id="theme-toggle-btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl bg-stone-100 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-850 hover:border-amber-500/30 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-all duration-300"
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>

            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
              detectedByIP={detectedByIP}
              countryName={countryName}
            />

            {/* Mobile Menu Hamburger Trigger */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-900 overflow-hidden"
            >
              <div className="px-6 py-6 space-y-2 flex flex-col text-left font-sans text-xs uppercase tracking-wider">
                {[
                  { id: 'home', label: t.nav_sanctuary || 'The Sanctuary' },
                  { id: 'journeys', label: t.nav_journeys || 'Our Journeys' },
                  { id: 'tailor', label: t.nav_canvas || 'Zuri Canvas (AI)' },
                  { id: 'difference', label: t.nav_difference || 'The Difference' },
                  { id: 'reservations', label: t.nav_contacts || 'Contacts' },
                  { id: 'faq', label: t.nav_faq || 'FAQ' },
                ].map((tab) => (
                  <button
                    id={`mobile-nav-${tab.id}`}
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setBookingSelectorName('');
                      setMobileMenuOpen(false);
                    }}
                    className={`p-3 text-left rounded-lg transition-all duration-200 cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-stone-100 dark:bg-stone-900 text-amber-700 dark:text-amber-400 font-bold border-l-4 border-amber-500 pl-2 shadow-sm'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100/50 dark:hover:bg-stone-900/40'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. MAIN ACTIVE TAB SECTION CONTAINER */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          
          {/* TAB: HOME / SANCTUARY */}
          {activeTab === 'home' && (
            <motion.div
              key="tab-home"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-20 pb-20"
            >
              {/* Dynamic cross-fade slider */}
              <HeroSlider
                onPlanCustomClick={() => setActiveTab('tailor')}
                onExploreJourneysClick={() => setActiveTab('journeys')}
                currentLanguage={currentLanguage}
              />

              {/* High End Trust Pillars Block */}
              <section id="trust-pillars" className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 md:p-8 bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-850 rounded-2xl text-left space-y-3 shadow-sm dark:shadow-none">
                  <span className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-450/20 text-amber-700 dark:text-amber-400 flex items-center justify-center font-mono text-xs font-bold">01</span>
                  <h3 className="font-serif-luxury text-xl font-medium text-stone-900 dark:text-white tracking-tight">The Air Sovereign Plan</h3>
                  <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                    Avoid dusty safari roadways. We leap direct between wilderness parks using executive light aircraft, carving days off transfers.
                  </p>
                </div>
                <div className="p-6 md:p-8 bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-850 rounded-2xl text-left space-y-3 shadow-sm dark:shadow-none">
                  <span className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-450/20 text-amber-700 dark:text-amber-400 flex items-center justify-center font-mono text-xs font-bold">02</span>
                  <h3 className="font-serif-luxury text-xl font-medium text-stone-900 dark:text-white tracking-tight">Gold-Cert Naturalists</h3>
                  <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                    Our Senior Safari Directors possess unparalleled tracking records and cultural lineages to offer deeply educational, respectful trails.
                  </p>
                </div>
                <div className="p-6 md:p-8 bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-850 rounded-2xl text-left space-y-3 shadow-sm dark:shadow-none">
                  <span className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-450/20 text-amber-700 dark:text-amber-400 flex items-center justify-center font-mono text-xs font-bold">03</span>
                  <h3 className="font-serif-luxury text-xl font-medium text-stone-900 dark:text-white tracking-tight">Uncompromising Shelters</h3>
                  <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                    From glass escarpments at Angama Mara to Moroccan oasis pools at Sasaab, wake surrounded solely by supreme comforts and raw vistas.
                  </p>
                </div>
              </section>

              {/* Interactive Curated Safari Lineup Panel */}
              <section id="popular-journeys" className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 dark:border-stone-900 pb-5 text-left">
                  <div className="space-y-2">
                    <span className="text-amber-600 dark:text-amber-500 font-mono text-xs uppercase tracking-wider block font-medium">Bespoke Lineups</span>
                    <h2 className="font-serif-luxury text-3xl md:text-5xl font-medium text-stone-900 dark:text-white tracking-tight leading-none">
                      Curated Masterpiece Safaris
                    </h2>
                  </div>
                  <button
                    id="btn-all-journeys"
                    onClick={() => setActiveTab('journeys')}
                    className="group inline-flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-mono uppercase tracking-wider cursor-pointer"
                  >
                    <span>Browse All Experiences</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {SAFARI_PACKAGES.slice(0, 3).map((safari) => (
                    <SafariCard
                      key={safari.id}
                      safari={safari}
                      onSelect={(s) => setSelectedSafari(s)}
                    />
                  ))}
                </div>
              </section>

              {/* Interactive Flight Paths, Coordinative Tracking, & Satellite Safari Map Section */}
              <section id="safari-tracking-map" className="max-w-7xl mx-auto px-6 md:px-12 space-y-6">
                <div className="text-left space-y-2">
                  <span className="text-amber-600 dark:text-amber-500 font-mono text-xs uppercase tracking-wider block font-semibold">Active Expedition Maps & Geofence Logs</span>
                  <h2 className="font-serif-luxury text-3xl md:text-5xl font-medium text-stone-900 dark:text-white tracking-tight leading-none">
                    Interactive Safari Map Space
                  </h2>
                  <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 font-sans font-light max-w-2xl leading-relaxed">
                    Click coordinates or hotspot regions below to trigger visual zooms, read ecological summaries, check conservation logs, and highlight active wildlife spotted across Amboseli or Maasai Mara.
                  </p>
                </div>
                <SafariMap theme={theme} />
              </section>

              {/* Immersive Client Quote / Confidence Deck */}
              <section id="client-stories" className="bg-stone-100 dark:bg-stone-900/25 border-y border-stone-200 dark:border-stone-900 py-16 text-left transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column 5 */}
                  <div className="lg:col-span-5 space-y-4">
                    <span className="font-mono text-amber-600 dark:text-amber-500 text-xs tracking-wider uppercase block font-medium">Gold Guest Ledger</span>
                    <h2 className="font-serif-luxury text-3xl md:text-5xl font-medium text-stone-900 dark:text-white tracking-tight leading-tight">
                      Sovereign Word of Mouth
                    </h2>
                    <p className="text-sm md:text-base text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                      Earning consistent accolades from international researchers, wildlife photographers, and multi-generational families.
                    </p>
                    <div className="flex items-center gap-1 pt-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                      ))}
                      <span className="text-xs font-mono text-stone-500 dark:text-stone-400 ml-2">5.0 Star Rated (KPSGA Board verified)</span>
                    </div>
                  </div>

                  {/* Right Column 7 reviews stack */}
                  <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {CLIENT_REVIEWS.slice(0, 2).map((rev) => (
                      <div
                        id={`review-summary-${rev.id}`}
                        key={rev.id}
                        className="p-6 bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-850 rounded-2xl flex flex-col justify-between space-y-4 shadow-sm dark:shadow-none"
                      >
                        <div className="space-y-3">
                          <Quote className="w-8 h-8 text-amber-500/25 stroke-[1.5]" />
                          <p className="text-xs md:text-sm text-stone-700 dark:text-stone-300 font-sans font-light leading-relaxed italic">
                            "{rev.quote}"
                          </p>
                        </div>

                        <div className="flex items-center gap-3 pt-3 border-t border-stone-100 dark:border-stone-850">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-stone-200 dark:border-stone-800">
                            <img src={rev.image} alt={rev.clientName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                          </div>
                          <div className="text-xs">
                            <h4 className="font-sans font-medium text-stone-800 dark:text-stone-200">{rev.clientName}</h4>
                            <span className="text-[10px] text-stone-500 block font-mono">{rev.residence} | {rev.safariTaken}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* Interactive Curated Safari "Sovereign Media Wall" (Core Image switching requirement) */}
              <section id="media-wall shadow-inner" className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
                <div className="text-center space-y-2">
                  <span className="text-amber-600 dark:text-amber-550 font-mono text-xs tracking-wider uppercase inline-flex items-center gap-2 font-semibold">
                    <Camera className="w-3.5 h-3.5" />
                    {t.media_live_feed}
                  </span>
                  <h3 className="font-serif-luxury text-2xl md:text-4xl font-semibold text-stone-900 dark:text-white tracking-tight leading-none italic">{t.media_title}</h3>
                  <p className="text-xs font-sans text-stone-500 max-w-md mx-auto">
                    {t.media_desc}
                  </p>
                </div>

                <MediaWall currentLanguage={currentLanguage} />
              </section>

            </motion.div>
          )}

          {/* TAB: OUR JOURNEYS FILTERABLE GRID */}
          {activeTab === 'journeys' && (
            <motion.div
              key="tab-journeys"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-16"
            >
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <span className="font-mono text-amber-600 dark:text-amber-550 text-xs px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full uppercase tracking-widest inline-block font-semibold">
                  Curated Catalogues
                </span>
                <h2 className="font-serif-luxury text-3xl md:text-5xl font-medium text-stone-900 dark:text-white tracking-tight leading-none">
                  Sovereign Expedition Masterpieces
                </h2>
                <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-sans font-light">
                  Each structural layout has been crafted by hand to capture perfect atmospheric conditions, high-density river maneuvers, and pristine forest shade valleys. Explore our master rosters.
                </p>
              </div>

              {/* SECTION I: Curated Blueprints */}
              <div className="space-y-6">
                <div className="border-b border-stone-200 dark:border-stone-850 pb-3 flex items-center justify-between text-left">
                  <h3 className="text-base font-serif-luxury text-amber-600 dark:text-amber-550 font-medium uppercase tracking-wider font-semibold">I. Signature Fly-In Blueprints</h3>
                  <span className="text-[10px] text-stone-500 font-mono uppercase">6 Bespoke Multi-day Tracks</span>
                </div>
                {/* Dynamic Safari Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {SAFARI_PACKAGES.map((safari) => (
                    <SafariCard
                      key={safari.id}
                      safari={safari}
                      onSelect={(s) => setSelectedSafari(s)}
                    />
                  ))}
                </div>
              </div>

              {/* SECTION II: 40 Masterpieces Gallery Stack */}
              <div className="space-y-8 pt-4">
                <div className="border-b border-stone-200 dark:border-stone-850 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-3 text-left">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-serif-luxury text-amber-600 dark:text-amber-550 font-medium uppercase tracking-wider font-semibold">II. Sovereign Expedition Masterpieces</h3>
                    <p className="text-xs text-stone-500 font-sans font-light leading-relaxed">
                      A pristine, filterable digital collection of forty wildlife and raw landscape photographs captured on high-precision camera sensors by Nairobi's Gold Guide tracking naturalists.
                    </p>
                  </div>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 font-mono uppercase shrink-0">40 Archival Masterworks</span>
                </div>

                {/* Highly advanced 40 photos grid & filter panel */}
                <MasterpiecesGallery />
              </div>

              {/* Prompt Customization Drawer Callout */}
              <div className="p-8 bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-850 rounded-2xl flex flex-col md:flex-row gap-6 items-center justify-between text-left shadow-sm dark:shadow-none">
                <div className="space-y-1.5 max-w-xl">
                  <h4 className="font-serif-luxury text-xl font-medium text-stone-900 dark:text-white">None of these alignments fit perfectly?</h4>
                  <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 leading-normal font-sans font-light">
                    Our master advisors can synthesize completely unique structures, arranging helicopter drops on Mount Kenya or exclusive canopy flights to gorilla mist valleys. Consult our AI designer.
                  </p>
                </div>
                <button
                  id="btn-trigger-ai-planner"
                  onClick={() => setActiveTab('tailor')}
                  className="px-5.5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs uppercase font-mono tracking-wider font-semibold shadow-lg hover:shadow-amber-500/5 transition-all outline-none cursor-pointer"
                >
                  Launch Custom Planner
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB: TAILOR-MADE PLANNER */}
          {activeTab === 'tailor' && (
            <motion.div
              key="tab-tailor"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AITailorPlanner />
            </motion.div>
          )}

          {/* TAB: OUR DIFFERENCE */}
          {activeTab === 'difference' && (
            <motion.div
              key="tab-difference"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-7xl mx-auto px-6 md:px-12"
            >
              <ZuriDifference currentLanguage={currentLanguage} />
            </motion.div>
          )}

          {/* TAB: RESERVATIONS BOOKING FORM */}
          {activeTab === 'reservations' && (
            <motion.div
              key="tab-reservations"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <BookingForm 
                initialProgramName={bookingSelectorName} 
              />
            </motion.div>
          )}

          {/* TAB: FAQ SANCTUARY */}
          {activeTab === 'faq' && (
            <motion.div
              key="tab-faq"
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <FAQSection />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 3. PERSISTENT GLOBAL FOOTER */}
      <footer className="bg-stone-950 border-t border-stone-900 pt-16 pb-12 mt-20 text-stone-450 border-stone-900 text-left text-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 font-sans font-light text-stone-400">
          
          {/* Logo & Vision detail */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <NobleRoamLogo size={28} />
              <span className="font-serif-luxury text-lg font-bold text-white uppercase tracking-wider">Noble Roam</span>
            </div>
            <p className="text-xs leading-relaxed text-stone-500">
              Elite, sustainable, and custom-tailored luxury Kenya & East Africa Safaris, inspired by the gold standard of nature conservation guiding.
            </p>
            <div className="flex items-center gap-3 text-stone-500">
              <Instagram className="w-4 h-4 hover:text-amber-400 cursor-pointer" />
              <Quote className="w-4 h-4 hover:text-amber-400 cursor-pointer" />
              <Star className="w-4 h-4 hover:text-amber-400 cursor-pointer" />
            </div>
          </div>

          {/* Core Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-white uppercase text-xs tracking-widest">Master Directories</h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button id="foot-nav-home" onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  The Sanctuary (Home)
                </button>
              </li>
              <li>
                <button id="foot-nav-journeys" onClick={() => setActiveTab('journeys')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Our Curated Journeys
                </button>
              </li>
              <li>
                <button id="foot-nav-canvas" onClick={() => setActiveTab('tailor')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Noble Roam Canvas (AI Tailoring)
                </button>
              </li>
              <li>
                <button id="foot-nav-diff" onClick={() => setActiveTab('difference')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  The Gold-Badge Difference
                </button>
              </li>
              <li>
                <button id="foot-nav-faq" onClick={() => setActiveTab('faq')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Frequently Answered Questions (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Destination links */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-white uppercase text-xs tracking-widest font-mono">Sanctuaries Checked</h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li className="hover:text-amber-400 transition-colors">Maasai Mara Escarpment</li>
              <li className="hover:text-amber-400 transition-colors">Lake Victoria Wetland Basins</li>
              <li className="hover:text-stone-300 transition-colors">Amboseli Elephant Corridor</li>
              <li className="hover:text-stone-300 transition-colors">Laikipia Rhinoceros Reserves</li>
            </ul>
          </div>

          {/* Operational office details */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-white uppercase text-xs tracking-widest font-mono">Operational Hub</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Karen Road Offices, Block D<br />
              Nairobi, Republic of Kenya
            </p>
            <div className="pt-2 border-t border-stone-800 leading-relaxed text-xs text-stone-400 space-y-2">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-stone-500">Call Support Desk:</span>
                <a href="tel:+254729693907" className="text-stone-200 font-mono hover:text-amber-400 transition-colors">+254 729 693 907</a>
                <a href="tel:+254712772230" className="text-stone-200 font-mono hover:text-amber-400 transition-colors">+254 712 772 230</a>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-stone-500">WhatsApp Chat Desk:</span>
                <div className="flex items-center gap-2">
                  <a href="https://wa.me/254729693907" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-mono hover:underline">Chat 1</a>
                  <span className="text-stone-700">|</span>
                  <a href="https://wa.me/254712772230" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-mono hover:underline">Chat 2</a>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono text-stone-500">Corporate Emails:</span>
                <a href="mailto:info@nobleroamafricasafaris.com" className="text-stone-200 font-mono hover:text-amber-400 transition-colors text-[11px] truncate">info@nobleroamafricasafaris.com</a>
                <a href="mailto:support@nobleroamafricasafaris.com" className="text-stone-200 font-mono hover:text-amber-400 transition-colors text-[11px] truncate">support@nobleroamafricasafaris.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Real Bottom License bar */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-stone-900 mt-12 pt-6 flex flex-wrap justify-between items-center text-[10px] text-stone-600 font-mono">
          <p>© {new Date().getFullYear()} NOBLE ROAM AFRICA SAFARIS LTD. All sovereign conservation links protected under statutory directives.</p>
          <div className="flex items-center gap-4">
            <span>KPSGA Certified Member #4409</span>
            <span>Sustainable Kenya Alliance</span>
          </div>
        </div>
      </footer>

      {/* 4. EXPANDABLE ITINERARY DETAILS MODAL SCREEN OVERLAY */}
      <AnimatePresence>
        {selectedSafari && (
          <ItineraryModal
            safari={selectedSafari}
            onClose={() => setSelectedSafari(null)}
            onBookThis={handleInquireFromItinerary}
          />
        )}      </AnimatePresence>

    </div>
  );
}
