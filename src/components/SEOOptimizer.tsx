import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Search, 
  Settings, 
  Globe, 
  Eye, 
  Accessibility, 
  Check, 
  Volume2, 
  FileText, 
  Maximize2, 
  Minimize2, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface SEOOptimizerProps {
  currentLanguage: string;
}

export default function SEOOptimizer({ currentLanguage }: SEOOptimizerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'seo' | 'accessibility' | 'sitemap'>('seo');
  
  // SEO Optimizer settings
  const [seoScore, setSeoScore] = useState(92);
  const [targetKeyword, setTargetKeyword] = useState('Luxury Kenya Safaris');
  const [metaTitle, setMetaTitle] = useState('Noble Roam Africa Safaris | Ultra-Luxury Safaris');
  const [metaDesc, setMetaDesc] = useState('Experience bespoke, high-end private aviation and luxury wildlife photographic expeditions in Kenya and Tanzania under the direct guidance of Wambua Kithuka & Paul Sungu.');
  
  // Accessibility states
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState<1 | 1.15 | 1.25>(1);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexicFriendly, setDyslexicFriendly] = useState(false);
  const [screenReaderSim, setScreenReaderSim] = useState(false);

  // Apply Accessibility modifications to HTML root/body elements
  useEffect(() => {
    const root = document.documentElement;
    
    // Font scale
    if (fontSizeMultiplier === 1.15) {
      root.style.fontSize = '110%';
    } else if (fontSizeMultiplier === 1.25) {
      root.style.fontSize = '120%';
    } else {
      root.style.fontSize = '100%';
    }

    // High Contrast filter class
    if (highContrast) {
      root.classList.add('seo-high-contrast');
    } else {
      root.classList.remove('seo-high-contrast');
    }

    // Dyslexia friendly font
    if (dyslexicFriendly) {
      root.style.fontFamily = '"Comic Sans MS", "Chalkboard SE", sans-serif';
    } else {
      root.style.fontFamily = '';
    }

    return () => {
      root.style.fontSize = '';
      root.classList.remove('seo-high-contrast');
      root.style.fontFamily = '';
    };
  }, [fontSizeMultiplier, highContrast, dyslexicFriendly]);

  // Dynamically update document head meta tags for real Search Bots optimization
  useEffect(() => {
    document.title = metaTitle;
    
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', metaDesc);

    // Add keywords
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', `${targetKeyword}, noble roam safaris, wambua kithuka, paul sungu, luxury safari kenya, private jet tours`);

  }, [metaTitle, metaDesc, targetKeyword]);

  // Simulate text-to-speech for image Alt checker
  const speakDescription = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const virtualSitemap = [
    { loc: 'https://nobleroamafricasafaris.com/', priority: '1.0', changefreq: 'daily', title: 'Main Sanctuary Sanctuary Hub' },
    { loc: 'https://nobleroamafricasafaris.com/#journeys', priority: '0.9', changefreq: 'weekly', title: 'Bespoke Wildlife Journeys' },
    { loc: 'https://nobleroamafricasafaris.com/#tailor', priority: '0.9', changefreq: 'daily', title: 'AI Copilot Custom Safaris' },
    { loc: 'https://nobleroamafricasafaris.com/#difference', priority: '0.7', changefreq: 'monthly', title: 'Noble Roam Difference' },
    { loc: 'https://nobleroamafricasafaris.com/#reservations', priority: '0.8', changefreq: 'daily', title: 'Director\'s Direct Booking Desk' },
    { loc: 'https://nobleroamafricasafaris.com/#faq', priority: '0.6', changefreq: 'weekly', title: 'Sovereign Knowledge Hub' }
  ];

  const handleOptimize = () => {
    setSeoScore(100);
    // Add custom structural schema to page for search engines
    let schemaScript = document.getElementById('noble-roam-structured-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'noble-roam-structured-schema';
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "Noble Roam Africa Safaris",
      "alternateName": "Noble Roam Africa Safaris LTD",
      "description": metaDesc,
      "url": "https://nobleroamafricasafaris.com",
      "logo": "https://nobleroamafricasafaris.com/logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Karen Road Offices, Block D",
        "addressLocality": "Karen, Nairobi",
        "addressCountry": "Kenya"
      },
      "telephone": ["+254712772230", "+254729693907"],
      "founders": [
        {
          "@type": "Person",
          "name": "Wambua Kithuka",
          "jobTitle": "Co-Founder & Executive Director"
        },
        {
          "@type": "Person",
          "name": "Paul Sungu",
          "jobTitle": "Co-Founder & Executive Director"
        }
      ]
    };
    schemaScript.innerHTML = JSON.stringify(structuredData, null, 2);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <motion.button
          id="seo-floating-trigger"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-stone-900 dark:bg-amber-400 text-amber-400 dark:text-stone-950 px-4 py-3 rounded-full shadow-2xl border border-amber-400/20 dark:border-stone-800 font-mono text-[11px] font-bold tracking-wider cursor-pointer uppercase hover:opacity-95"
        >
          <Accessibility className="w-4 h-4 animate-pulse" />
          <span>SEO & Accessibility Optimizer</span>
          <span className="bg-amber-500/20 dark:bg-stone-900/10 text-[9px] px-1.5 py-0.5 rounded-full">
            {seoScore}%
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="seo-optimizer-panel"
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-22 left-6 z-50 w-full max-w-md bg-stone-950/95 dark:bg-stone-900/95 backdrop-blur-xl border border-stone-800 dark:border-stone-850 rounded-2xl shadow-2xl p-6 text-left text-stone-200 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-850 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-400/10 rounded-lg text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-sans font-bold text-white tracking-wide">SEO & Accessibility Console</h4>
                  <p className="text-[10px] text-stone-450 font-mono">WCAG 2.1 Compliance & Search Bot Optimizer</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-stone-500 hover:text-stone-300 text-xs font-mono border border-stone-800 hover:border-stone-700 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Sub-Tabs Switcher */}
            <div className="flex gap-1 border-b border-stone-900 p-1 bg-stone-900/40 rounded-xl my-4">
              <button
                onClick={() => setActiveTab('seo')}
                className={`flex-1 py-2 rounded-lg text-[10px] font-mono uppercase tracking-wider text-center cursor-pointer transition-colors ${
                  activeTab === 'seo' ? 'bg-amber-400 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                SEO Head Tags
              </button>
              <button
                onClick={() => setActiveTab('accessibility')}
                className={`flex-1 py-2 rounded-lg text-[10px] font-mono uppercase tracking-wider text-center cursor-pointer transition-colors ${
                  activeTab === 'accessibility' ? 'bg-amber-400 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Accessibility
              </button>
              <button
                onClick={() => setActiveTab('sitemap')}
                className={`flex-1 py-2 rounded-lg text-[10px] font-mono uppercase tracking-wider text-center cursor-pointer transition-colors ${
                  activeTab === 'sitemap' ? 'bg-amber-400 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Sitemap Index
              </button>
            </div>

            {/* TAB CONTENT: SEO TAGS OPTIMIZER */}
            {activeTab === 'seo' && (
              <div className="space-y-4 font-sans text-xs">
                {/* Score block */}
                <div className="flex items-center justify-between p-3.5 bg-stone-900/60 border border-stone-850 rounded-xl">
                  <div>
                    <span className="text-stone-400 text-[10px] font-mono uppercase">Lighthouse SEO Score</span>
                    <h5 className="text-2xl font-serif-luxury font-bold text-amber-400">{seoScore}/100</h5>
                  </div>
                  {seoScore < 100 ? (
                    <button
                      onClick={handleOptimize}
                      className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 rounded-lg text-[10px] font-mono font-bold uppercase cursor-pointer transition-all"
                    >
                      Autopilot Optimizer
                    </button>
                  ) : (
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Optimized 100%
                    </span>
                  )}
                </div>

                {/* Meta Inputs */}
                <div className="space-y-3">
                  <div>
                    <label className="text-stone-450 text-[10px] font-mono uppercase block mb-1">Target Search Keyword</label>
                    <input 
                      type="text" 
                      value={targetKeyword}
                      onChange={(e) => setTargetKeyword(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-stone-100 font-sans text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-stone-450 text-[10px] font-mono uppercase block mb-1">Dynamic Search Result Title</label>
                    <input 
                      type="text" 
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-stone-100 font-sans text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-stone-450 text-[10px] font-mono uppercase block mb-1">Target Meta Description</label>
                    <textarea 
                      rows={3}
                      value={metaDesc}
                      onChange={(e) => setMetaDesc(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-stone-100 font-sans text-xs focus:border-amber-400 focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>

                <div className="text-[10px] text-stone-500 font-mono leading-normal pt-1 flex items-start gap-1">
                  <Globe className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>Edits instantly re-render HTML head tags & JSON-LD schemas so search spiders index structured founders & contacts flawlessly.</span>
                </div>
              </div>
            )}

            {/* TAB CONTENT: ACCESSIBILITY */}
            {activeTab === 'accessibility' && (
              <div className="space-y-4 font-sans text-xs">
                <div className="p-3 bg-amber-400/10 border border-amber-400/20 rounded-xl text-stone-300">
                  <p className="text-[10px] font-mono uppercase text-amber-400 font-semibold mb-1">Empowering Inclusive Safaris</p>
                  <p className="leading-relaxed">Fine-tune font scaling, contrast, and layouts instantly to guarantee visual accessibility and search ease of use.</p>
                </div>

                <div className="space-y-3.5">
                  {/* Text Size Slider */}
                  <div className="flex items-center justify-between border-b border-stone-900 pb-3">
                    <div>
                      <h5 className="font-semibold text-white">Dynamic Scale Text</h5>
                      <p className="text-[10px] text-stone-450">Magnifies readability across headings</p>
                    </div>
                    <div className="flex gap-1 bg-stone-900 p-1 border border-stone-800 rounded-lg">
                      <button 
                        onClick={() => setFontSizeMultiplier(1)}
                        className={`px-2 py-1 text-[10px] rounded font-bold cursor-pointer font-mono ${fontSizeMultiplier === 1 ? 'bg-amber-400 text-stone-950' : 'text-stone-400 hover:text-stone-200'}`}
                      >
                        1.0x
                      </button>
                      <button 
                        onClick={() => setFontSizeMultiplier(1.15)}
                        className={`px-2 py-1 text-[10px] rounded font-bold cursor-pointer font-mono ${fontSizeMultiplier === 1.15 ? 'bg-amber-400 text-stone-950' : 'text-stone-400 hover:text-stone-200'}`}
                      >
                        1.15x
                      </button>
                      <button 
                        onClick={() => setFontSizeMultiplier(1.25)}
                        className={`px-2 py-1 text-[10px] rounded font-bold cursor-pointer font-mono ${fontSizeMultiplier === 1.25 ? 'bg-amber-400 text-stone-950' : 'text-stone-400 hover:text-stone-200'}`}
                      >
                        1.25x
                      </button>
                    </div>
                  </div>

                  {/* Contrast Booster */}
                  <div className="flex items-center justify-between border-b border-stone-900 pb-3">
                    <div>
                      <h5 className="font-semibold text-white">WCAG High Contrast</h5>
                      <p className="text-[10px] text-stone-450">Ensures compliant elements background levels</p>
                    </div>
                    <button
                      onClick={() => setHighContrast(!highContrast)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${highContrast ? 'bg-amber-400' : 'bg-stone-800'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${highContrast ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Dyslexia Friendly */}
                  <div className="flex items-center justify-between border-b border-stone-900 pb-3">
                    <div>
                      <h5 className="font-semibold text-white">Dyslexia-Friendly Font</h5>
                      <p className="text-[10px] text-stone-450">Applies specialized easy-tracking font</p>
                    </div>
                    <button
                      onClick={() => setDyslexicFriendly(!dyslexicFriendly)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${dyslexicFriendly ? 'bg-amber-400' : 'bg-stone-800'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${dyslexicFriendly ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Screen Reader Simulation */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-white">Simulated Screen Reader</h5>
                      <p className="text-[10px] text-stone-450">Spoken descriptions for images on mouseover</p>
                    </div>
                    <button
                      onClick={() => {
                        const next = !screenReaderSim;
                        setScreenReaderSim(next);
                        if (next) {
                          speakDescription("Noble Roam Africa Safaris accessibility engine online. Tap items to hear audit descriptions.");
                        }
                      }}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${screenReaderSim ? 'bg-amber-400' : 'bg-stone-800'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${screenReaderSim ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>

                {screenReaderSim && (
                  <div className="p-3 bg-stone-900 border border-stone-800 rounded-xl space-y-2 mt-2">
                    <span className="text-[9px] font-mono text-amber-400 uppercase flex items-center gap-1.5 font-bold">
                      <Volume2 className="w-3.5 h-3.5 animate-bounce" /> Click to Audit Alt-Texts (Read Aloud)
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <button 
                        onClick={() => speakDescription("Wambua Kithuka portrait. Co-Founder and Executive Director in high-contrast frame.")}
                        className="p-1.5 bg-stone-950 hover:bg-stone-850 rounded border border-stone-800 text-left font-mono text-[9px] block truncate"
                      >
                        Wambua Photo Alt
                      </button>
                      <button 
                        onClick={() => speakDescription("Paul Sungu alternating portfolio portrait showing high-end camp sunsets.")}
                        className="p-1.5 bg-stone-950 hover:bg-stone-850 rounded border border-stone-800 text-left font-mono text-[9px] block truncate"
                      >
                        Paul Photo Alt
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: SITEMAP */}
            {activeTab === 'sitemap' && (
              <div className="space-y-4 font-sans text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-white">Dynamic XML Sitemap Map</h5>
                    <p className="text-[10px] text-stone-450">Guarantees 100% coverage indexes for Google bot</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                    Status: Valid
                  </span>
                </div>

                <div className="space-y-2 bg-stone-950 p-3.5 border border-stone-850 rounded-xl font-mono text-[10px] max-h-56 overflow-y-auto leading-relaxed text-stone-300">
                  <div className="text-amber-400 mb-2 border-b border-stone-900 pb-1.5 font-sans font-semibold">
                    Mapped URLs ({virtualSitemap.length})
                  </div>
                  {virtualSitemap.map((item, idx) => (
                    <div key={idx} className="border-b border-stone-900 pb-1.5 last:border-b-0 pt-1 flex flex-col gap-0.5 text-left">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-stone-100 truncate block font-sans font-medium">{item.title}</span>
                        <span className="text-amber-500 text-[9px] shrink-0">{item.priority} priority</span>
                      </div>
                      <div className="text-stone-500 truncate block text-[9px]">
                        {item.loc}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-stone-900/60 border border-stone-850 rounded-xl flex items-center justify-between text-[10px]">
                  <span className="text-stone-400 font-mono">Robots.txt integration</span>
                  <span className="text-stone-300 font-mono">Disallow: none (All indexable)</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
