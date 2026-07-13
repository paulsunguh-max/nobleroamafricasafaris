import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import {
  Sparkles,
  Luggage,
  Calendar,
  Compass,
  Tent,
  Coffee,
  Check,
  Plane,
  Coins,
  ChevronRight,
  ChevronLeft,
  Printer,
  FileText,
  Clock,
  Send,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ItineraryResponse {
  itinerary: string;
  success: boolean;
  error?: string;
}

interface SavedItinerary {
  id: string;
  title: string;
  createdDate: string;
  destinations: string[];
  travelers: number;
  durationDays: number;
  departureMonth: string;
  lodgingStyle: string;
  pacing: string;
  customWishes: string;
  itinerary: string;
}

const POPULAR_DESTINATIONS = [
  { id: 'mara', name: 'Maasai Mara Reserve', region: 'Rift Valley Corridor', desc: 'Host to the Great Migration & Big Cat kingdoms.' },
  { id: 'amboseli', name: 'Amboseli National Park', region: 'Southern Plains', desc: 'Majestic elephant herds under Mount Kilimanjaro.' },
  { id: 'samburu', name: 'Samburu Arid Reserve', region: 'Northern Frontier', desc: 'Dry landscape home of Reticulated Giraffe & Gerenuk.' },
  { id: 'lewa', name: 'Lewa Wildlife Conservancy', region: 'Laikipia Plateau', desc: 'Sovereign private reserve protecting endangered Rhinos.' },
  { id: 'serengeti', name: 'Serengeti Basin Edge', region: 'East Africa Plains', desc: 'Vast endless savannah grazing patterns.' },
  { id: 'gorilla', name: 'Rwanda Gorilla Wilderness', region: 'Alps of Africa', desc: 'Primal jungle misty treks to see mountain gorillas.' },
  { id: 'victoria', name: 'Lake Victoria Basin', region: 'Great Lakes Region', desc: 'Lakeside wilderness, pristine islands & rich ornithology.' },
  { id: 'ruma', name: 'Ruma National Park', region: 'Lambwe Valley Corridor', desc: 'Last stand of the magnificent and endangered Roan Antelope.' },
  { id: 'watamu', name: 'Watamu Marine Coast', region: 'Indian Ocean Shore', desc: 'Wet sandy beaches, coral reefs & sea turtle sanctuaries.' },
  { id: 'tarangire', name: 'Tarangire National Park', region: 'Tanzania Savannah', desc: 'Colossal ancient baobabs & massive gathering elephant herds.' }
];

const LODGING_STYLES = [
  { id: 'ultra-luxe', name: 'Ultra-Luxury Lodges', desc: 'Glass-walled clifftop villas with private pools (e.g., Angama Mara, Segera)' },
  { id: 'tented-elite', name: 'Elite Wilderness Canvas', desc: 'Hemingway-style canopy tent camps with master fabrics & en-suite cedar showers' },
  { id: 'classic-luxury', name: 'Classic Luxury Blend', desc: 'Authentic stone ranch houses, legacy cottages, and hand-carved furnishings' },
];

const PACING_TIPS = [
  { id: 'relaxed', name: 'Leisurely & Relaxed', desc: 'Late morning rise, multiple nights per luxury lodge, deep massage sessions' },
  { id: 'balanced', name: 'Balanced Explorer', desc: 'Classic double daily game drives (dawn & dusk), diverse regional transfers' },
  { id: 'active', name: 'Active & Adventure-Dense', desc: 'Sunrise balloon rides, dense hiking safaris, camel riding, and night safaris' },
];

export default function AITailorPlanner() {
  const [step, setStep] = useState(1);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  const [customDestInput, setCustomDestInput] = useState('');
  const [customDestinations, setCustomDestinations] = useState<string[]>([]);

  const [travelers, setTravelers] = useState<number>(2);
  const [duration, setDuration] = useState<number>(9);
  const [departureMonth, setDepartureMonth] = useState<string>('August');
  const [lodgingStyle, setLodgingStyle] = useState<string>('ultra-luxe');
  const [pacing, setPacing] = useState<string>('balanced');
  const [wishes, setWishes] = useState<string>('');

  // Saved Itineraries States (client-side only, stored in user's browser)
  const [savedItineraries, setSavedItineraries] = useState<SavedItinerary[]>([]);
  const [currentView, setCurrentView] = useState<'designer' | 'saved'>('designer');
  const [selectedSavedId, setSelectedSavedId] = useState<string | null>(null);

  useEffect(() => {
    const loaded = localStorage.getItem('zuri_saved_itineraries');
    if (loaded) {
      try {
        setSavedItineraries(JSON.parse(loaded));
      } catch (e) {
        console.error('Error loading saved itineraries:', e);
      }
    }
  }, []);

  // AI Generation States
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [itineraryResult, setItineraryResult] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleDestination = (id: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleAddCustomDestination = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customDestInput.trim();
    if (!trimmed) return;

    if (!customDestinations.includes(trimmed)) {
      setCustomDestinations((prev) => [...prev, trimmed]);
    }
    if (!selectedDestinations.includes(trimmed)) {
      setSelectedDestinations((prev) => [...prev, trimmed]);
    }
    setCustomDestInput('');
  };

  const handleRemoveCustomDestination = (name: string) => {
    setCustomDestinations((prev) => prev.filter((d) => d !== name));
    setSelectedDestinations((prev) => prev.filter((d) => d !== name));
  };

  const nextStep = () => setStep((p) => Math.min(p + 1, 4));
  const prevStep = () => setStep((p) => Math.max(p - 1, 1));

  const handleComposeSafari = async () => {
    setLoading(true);
    setItineraryResult(null);
    setErrorMsg(null);

    const stages = [
      'Plotting sovereign flight hops across the Rift Valley...',
      'Inquiring exclusive tent reservations in the Mara...',
      'Mapping predator migration corridors for high-prob spotting...',
      'Fleshing out gourmet candlelit bush dinners under the acacias...',
      'Synthesizing day-by-day luxury trail documentation...',
    ];

    let currentStage = 0;
    setLoadingText(stages[0]);

    const stageInterval = setInterval(() => {
      currentStage = (currentStage + 1) * 1;
      if (currentStage < stages.length) {
        setLoadingText(stages[currentStage]);
      }
    }, 2800);

    try {
      const response = await fetch('/api/tailor-safari', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destinations: selectedDestinations.map(
            (id) => POPULAR_DESTINATIONS.find((d) => d.id === id)?.name || id
          ),
          travelers,
          durationDays: duration,
          departureMonth,
          lodgingStyle: LODGING_STYLES.find((l) => l.id === lodgingStyle)?.name || lodgingStyle,
          pacing: PACING_TIPS.find((p) => p.id === pacing)?.name || pacing,
          customWishesByGuest: wishes,
        }),
      });

      const data: ItineraryResponse = await response.json();
      clearInterval(stageInterval);

      if (data.success && data.itinerary) {
        setItineraryResult(data.itinerary);
        setStep(5); // Show result page

        // Auto-save this newly generated itinerary inside the browser's localStorage
        const match = data.itinerary.match(/^#\s+(.+)$/m);
        const defaultTitle = match && match[1] ? match[1].trim() : `Bespoke Safari (${duration} Days)`;
        const newSaved: SavedItinerary = {
          id: 'saved_' + Date.now(),
          title: defaultTitle,
          createdDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          destinations: selectedDestinations.map(
            (id) => POPULAR_DESTINATIONS.find((d) => d.id === id)?.name || id
          ),
          travelers,
          durationDays: duration,
          departureMonth,
          lodgingStyle: LODGING_STYLES.find((l) => l.id === lodgingStyle)?.name || lodgingStyle,
          pacing: PACING_TIPS.find((p) => p.id === pacing)?.name || pacing,
          customWishes: wishes,
          itinerary: data.itinerary
        };
        const updated = [newSaved, ...savedItineraries];
        setSavedItineraries(updated);
        localStorage.setItem('zuri_saved_itineraries', JSON.stringify(updated));
      } else {
        setErrorMsg(data.error || 'The air communications encountered atmospheric interference. Please try composing again.');
      }
    } catch (err) {
      clearInterval(stageInterval);
      setErrorMsg('The regional satellite radio appears temporarily quiet. Please confirm your internet connection and try compiling again.');
    } finally {
      setLoading(false);
    }
  };

  // Printable layout helper
  const triggerPrint = () => {
    const printContent = document.getElementById('itinerary-print-area');
    if (printContent) {
      const originalContent = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload(); // Refresh state post-print
    }
  };

  return (
    <div id="ai-planner-wrapper" className="max-w-4xl mx-auto px-6 py-12 text-stone-800 dark:text-stone-300">
      
      {/* Title block */}
      <div className="text-center space-y-4 mb-8">
        <span className="px-3.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-400/20 text-xs font-mono rounded-full uppercase tracking-widest inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          The Noble Roam Canvas
        </span>
        <h2 className="text-3xl md:text-5xl font-sans font-medium text-stone-900 dark:text-white tracking-tight leading-none">
          Custom AI Safari Designer
        </h2>
        <p className="text-stone-600 dark:text-stone-400 max-w-xl mx-auto text-sm md:text-base font-sans font-light leading-relaxed">
          Inspired by Micato and Abercrombie & Kent. Answer our master advisors' core planning questions, and our intelligence system will build a dedicated flight and lodge proposal.
        </p>
      </div>

      {/* Sub-tab Switcher */}
      <div className="flex justify-center mb-8">
        <div className="bg-stone-100 dark:bg-stone-900/60 p-1 border border-stone-200 dark:border-stone-850 rounded-xl inline-flex">
          <button
            id="subtab-designer"
            onClick={() => {
              setCurrentView('designer');
            }}
            className={`px-6 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer relative ${
              currentView === 'designer'
                ? 'text-amber-605 dark:text-amber-400 bg-white dark:bg-stone-950/80 border border-stone-200 dark:border-stone-800 font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Design New Safari
            {currentView === 'designer' && (
              <motion.div
                layoutId="designerTabActive"
                className="absolute -bottom-1 left-4 right-4 h-0.5 bg-amber-400 rounded"
              />
            )}
          </button>
          
          <button
            id="subtab-saved"
            onClick={() => {
              setCurrentView('saved');
              setSelectedSavedId(null);
            }}
            className={`px-6 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer relative ${
              currentView === 'saved'
                ? 'text-amber-605 dark:text-amber-400 bg-white dark:bg-stone-950/80 border border-stone-200 dark:border-stone-800 font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            My Saved Blueprints ({savedItineraries.length})
            {currentView === 'saved' && (
              <motion.div
                layoutId="designerTabActive"
                className="absolute -bottom-1 left-4 right-4 h-0.5 bg-amber-400 rounded"
              />
            )}
          </button>
        </div>
      </div>

      {currentView === 'designer' ? (
        <>
          {/* Progress Path Indicator */}
          {step <= 4 && (
        <div id="planner-progress" className="flex items-center justify-between mb-10 max-w-md mx-auto relative px-2">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-200 dark:bg-stone-850 -translate-y-1/2 -z-10" />
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs transition-all duration-300 border ${
                s === step
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold scale-115 shadow-lg shadow-amber-500/20'
                  : s < step
                  ? 'bg-amber-50/80 dark:bg-stone-900 text-amber-600 dark:text-amber-400 border-amber-450/40 dark:border-amber-400/50'
                  : 'bg-stone-100 dark:bg-stone-900 text-stone-400 dark:text-stone-500 border-stone-250 dark:border-stone-800'
              }`}
            >
              0{s}
            </div>
          ))}
        </div>
      )}

      {/* STEP FORMS */}
      <div className="bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-850 rounded-2xl p-6 md:p-10 shadow-xl backdrop-blur-lg min-h-[400px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Destinations */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-sans font-medium text-stone-900 dark:text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-400" />
                  Select Your Wilderness Sanctuaries
                </h3>
                <p className="text-xs text-stone-500 mt-1 font-sans">
                  Choose multiple regions. We bridge them via light aircraft hops.
                </p>
              </div>

              {/* Standard Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {POPULAR_DESTINATIONS.slice(0, 6).map((dest) => {
                  const isChecked = selectedDestinations.includes(dest.id);
                  return (
                    <div
                      id={`destination-tile-${dest.id}`}
                      key={dest.id}
                      onClick={() => toggleDestination(dest.id)}
                      className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer text-left flex items-start gap-3.5 select-none ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-400/65 shadow-md shadow-amber-500/5'
                          : 'bg-stone-50/50 dark:bg-stone-950/40 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                      }`}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                        isChecked ? 'bg-amber-400 border-amber-400 text-stone-950' : 'border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 group-hover:border-stone-400 dark:group-hover:border-stone-550'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="flex-1 space-y-0.5">
                        <div className="font-sans font-medium text-stone-800 dark:text-stone-200 text-sm flex items-center justify-between">
                          <span>{dest.name}</span>
                          <span className="text-[9px] font-mono text-amber-400/70 uppercase tracking-widest">{dest.region}</span>
                        </div>
                        <p className="text-xs font-sans text-stone-600 dark:text-stone-400 font-light leading-relaxed">{dest.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Collapsible secondary list of destinations (extender) */}
              <AnimatePresence>
                {showAllDestinations && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden space-y-4"
                  >
                    <div className="border-t border-stone-200 dark:border-stone-800 my-4"></div>
                    <h4 className="text-xs font-mono uppercase text-stone-400 tracking-wider">Additional Wilderness Sanctuaries</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {POPULAR_DESTINATIONS.slice(6).map((dest) => {
                        const isChecked = selectedDestinations.includes(dest.id);
                        return (
                          <div
                            id={`destination-tile-${dest.id}`}
                            key={dest.id}
                            onClick={() => toggleDestination(dest.id)}
                            className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer text-left flex items-start gap-3.5 select-none ${
                              isChecked
                                ? 'bg-amber-500/10 border-amber-400/65 shadow-md shadow-amber-500/5'
                                : 'bg-stone-50/50 dark:bg-stone-950/40 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                            }`}
                          >
                            <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                              isChecked ? 'bg-amber-400 border-amber-400 text-stone-950' : 'border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 group-hover:border-stone-400 dark:group-hover:border-stone-550'
                            }`}>
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>

                            <div className="flex-1 space-y-0.5">
                              <div className="font-sans font-medium text-stone-800 dark:text-stone-200 text-sm flex items-center justify-between">
                                <span>{dest.name}</span>
                                <span className="text-[9px] font-mono text-amber-400/70 uppercase tracking-widest">{dest.region}</span>
                              </div>
                              <p className="text-xs font-sans text-stone-600 dark:text-stone-400 font-light leading-relaxed">{dest.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Show more/less button (Extender) */}
              <div className="flex justify-center">
                <button
                  type="button"
                  id="btn-toggle-extender"
                  onClick={() => setShowAllDestinations(!showAllDestinations)}
                  className="px-4 py-2 rounded-xl border border-stone-250 dark:border-stone-850 bg-stone-50 hover:bg-stone-100 dark:bg-stone-950/40 dark:hover:bg-stone-950 text-xs font-sans font-medium text-stone-700 dark:text-stone-300 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  {showAllDestinations ? (
                    <>
                      <span>Hide Additional Sanctuaries</span>
                      <ChevronUp className="w-3.5 h-3.5 text-amber-500" />
                    </>
                  ) : (
                    <>
                      <span>Show More Wilderness Sanctuaries ({POPULAR_DESTINATIONS.length - 6} more)</span>
                      <ChevronDown className="w-3.5 h-3.5 text-amber-500" />
                    </>
                  )}
                </button>
              </div>

              {/* Write your own custom destination section */}
              <div className="mt-8 border-t border-stone-100 dark:border-stone-850 pt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-sans font-semibold text-stone-900 dark:text-stone-200 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-amber-500" />
                    Bespoke Destination Request
                  </h4>
                  <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                    Would you like to include an unlisted national park, reserve, private conservancy, or remote camp? Write it below:
                  </p>
                </div>

                <form onSubmit={handleAddCustomDestination} className="flex gap-2 max-w-lg">
                  <input
                    id="custom-dest-input"
                    type="text"
                    value={customDestInput}
                    onChange={(e) => setCustomDestInput(e.target.value)}
                    placeholder="Enter custom place (e.g. Tsavo National Park, Diani Beach, Mount Kenya)..."
                    className="flex-1 bg-white dark:bg-stone-950/40 border border-stone-250 dark:border-stone-800 rounded-xl px-4 py-2 text-stone-800 dark:text-stone-200 text-xs focus:outline-none focus:border-amber-450 dark:focus:border-amber-400 font-sans placeholder-stone-400 dark:placeholder-stone-600 focus:ring-1 focus:ring-amber-500/20"
                  />
                  <button
                    id="btn-add-custom-dest"
                    type="submit"
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 hover:text-black font-semibold rounded-xl text-xs font-sans transition-all flex items-center gap-1 shrink-0 cursor-pointer shadow-sm"
                  >
                    <span>Request</span>
                  </button>
                </form>

                {/* Render Selected Custom Destinations */}
                {customDestinations.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center pt-1.5">
                    <span className="text-[10px] font-mono text-stone-500 uppercase">Requested:</span>
                    {customDestinations.map((name) => (
                      <div
                        id={`custom-dest-badge-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        key={name}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-400/25 text-[11px] font-sans font-medium rounded-full"
                      >
                        <span>{name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomDestination(name)}
                          className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors p-0.5 cursor-pointer rounded-full"
                        >
                          <X className="w-3 h-3 stroke-[2.5]" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Travelers, Month & Duration */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-sans font-medium text-stone-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  Timeframe & Party Dynamics
                </h3>
                <p className="text-xs text-stone-500 mt-1 font-sans">
                  Our private flights cater directly to your private party sizing.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Travelers Count */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider block">Traveler Cohort</label>
                  <div className="flex items-center gap-3 bg-stone-50 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 rounded-xl p-2.5">
                    <button
                      id="btn-sub-traveler"
                      onClick={() => setTravelers((t) => Math.max(t - 1, 1))}
                      className="w-10 h-10 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center text-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-850 dark:text-stone-200 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-mono font-bold text-stone-850 dark:text-stone-200 text-lg">
                      {travelers} {travelers === 1 ? 'Guest' : 'Guests'}
                    </span>
                    <button
                      id="btn-add-traveler"
                      onClick={() => setTravelers((t) => Math.min(t + 1, 12))}
                      className="w-10 h-10 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center text-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-850 dark:text-stone-200 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider block">Duration of Trek</label>
                  <div className="flex items-center gap-3 bg-stone-50 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 rounded-xl p-2.5">
                    <button
                      id="btn-sub-duration"
                      onClick={() => setDuration((d) => Math.max(d - 1, 4))}
                      className="w-10 h-10 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center text-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-850 dark:text-stone-200 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-mono font-bold text-stone-850 dark:text-stone-200 text-lg">
                      {duration} Days
                    </span>
                    <button
                      id="btn-add-duration"
                      onClick={() => setDuration((d) => Math.min(d + 1, 21))}
                      className="w-10 h-10 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-center text-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-850 dark:text-stone-200 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Departure Month */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider block">Departure Month</label>
                  <select
                    id="month-select"
                    value={departureMonth}
                    onChange={(e) => setDepartureMonth(e.target.value)}
                    className="w-full bg-white dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 rounded-xl p-3.5 text-stone-850 dark:text-stone-200 font-sans focus:outline-none focus:border-amber-450 dark:focus:border-amber-400 text-sm h-[58px]"
                  >
                    {[
                      'January (Dry - Great birding)',
                      'February (Warm - Breeding season)',
                      'March (Spring breeze)',
                      'April (Green lush season)',
                      'May (Vibrant delta)',
                      'June (Migration begins)',
                      'July (High Migration)',
                      'August (Peak Crossing)',
                      'September (Premium wildlife density)',
                      'October (Calm dry weather)',
                      'November (Short warm showers)',
                      'December (Holiday festive)',
                    ].map((m) => (
                      <option key={m} value={m.split(' ')[0]} className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200">
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Lodging Styles & Pace */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-sans font-medium text-stone-900 dark:text-white flex items-center gap-2">
                  <Tent className="w-5 h-5 text-amber-400" />
                  Your Preferred Canopy & Cadence
                </h3>
                <p className="text-xs text-stone-500 mt-1 font-sans">
                  Tell our concierges where you wish to wake and how you desire your days spaced.
                </p>
              </div>

              <div className="space-y-5 pt-2">
                {/* Lodging Row */}
                <div className="space-y-2.5">
                  <span className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-widest block font-medium">1. Luxury Lodging Presentation</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {LODGING_STYLES.map((style) => (
                      <div
                        id={`lodging-option-${style.id}`}
                        key={style.id}
                        onClick={() => setLodgingStyle(style.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          lodgingStyle === style.id
                            ? 'bg-amber-500/10 border-amber-400/60 shadow-md'
                            : 'bg-stone-50 dark:bg-stone-950/40 border-stone-200 dark:border-stone-850 hover:border-stone-300 dark:hover:border-stone-800'
                        }`}
                      >
                        <h4 className="font-sans font-semibold text-sm text-stone-900 dark:text-stone-100">{style.name}</h4>
                        <p className="text-xs text-stone-600 dark:text-stone-400 font-light mt-1.5 leading-normal">{style.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pacing Row */}
                <div className="space-y-2.5">
                  <span className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase tracking-widest block font-medium">2. Exploration Velocity</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {PACING_TIPS.map((p) => (
                      <div
                        id={`pacing-option-${p.id}`}
                        key={p.id}
                        onClick={() => setPacing(p.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          pacing === p.id
                            ? 'bg-amber-500/10 border-amber-400/60 shadow-md'
                            : 'bg-stone-50 dark:bg-stone-950/40 border-stone-200 dark:border-stone-850 hover:border-stone-300 dark:hover:border-stone-800'
                        }`}
                      >
                        <h4 className="font-sans font-semibold text-sm text-stone-900 dark:text-stone-100">{p.name}</h4>
                        <p className="text-xs text-stone-600 dark:text-stone-400 font-light mt-1.5 leading-normal">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Wishes & Prompts */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-sans font-medium text-stone-900 dark:text-white flex items-center gap-2">
                  <Luggage className="w-5 h-5 text-amber-400" />
                  Your Custom Wishes
                </h3>
                <p className="text-xs text-stone-500 mt-1 font-sans">
                  Are you celebrating a marriage, hunting rare species, or requiring specific wheelchair access? Let your desires be heard.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <textarea
                  id="custom-wishes-text"
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  placeholder="Examples: 
- Celebrating our 20th Wedding Anniversary.
- Love rare visual photography: would love high-end lense accessories in vehicle and custom spotting of leopards.
- Wish to include one private dawn hot air balloon ride followed by wild champagne setup."
                  rows={6}
                  className="w-full bg-white dark:bg-stone-950/40 border border-stone-250 dark:border-stone-800 rounded-xl p-4 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:border-amber-450 dark:focus:border-amber-400 leading-relaxed font-sans placeholder-stone-400 dark:placeholder-stone-600 focus:ring-1 focus:ring-amber-500/20"
                />
              </div>

              {selectedDestinations.length === 0 && (
                <div className="p-3 bg-amber-500/10 border border-amber-400/20 rounded-lg flex items-center gap-2 text-xs text-amber-400">
                  <Compass className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Note: You have not selected any destinations yet. Our intelligent AI curator will auto-select the most fitting regions matching your custom parameters.</span>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 5: Results Display (No longer part of step loop unless done) */}
          {step === 5 && itineraryResult && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] bg-stone-950 border border-stone-850 text-amber-400 px-2.5 py-0.5 font-mono rounded-full uppercase tracking-wider">
                    Official Sovereign Dossier
                  </span>
                  <h3 className="text-2xl font-sans text-stone-900 dark:text-white font-medium">Your Bespoke Journey Proposal</h3>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    id="btn-print-dossier"
                    onClick={triggerPrint}
                    className="p-2 w-10 h-10 rounded-lg border border-stone-800 text-stone-400 hover:text-stone-200 bg-stone-950 hover:bg-stone-850 flex items-center justify-center cursor-pointer transition-colors"
                    title="Print Program"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    id="btn-restart-planner"
                    onClick={() => {
                      setStep(1);
                      setItineraryResult(null);
                    }}
                    className="px-4 py-2 text-xs font-mono font-medium rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-300 transition-colors cursor-pointer"
                  >
                    Design New Safari
                  </button>
                </div>
              </div>

              {/* Printable Body containing Dossier details */}
              <div
                id="itinerary-print-area"
                className="p-6 md:p-8 bg-stone-950/60 border border-stone-850 rounded-xl space-y-6 text-stone-300 font-sans print:bg-white print:text-black print:p-10"
              >
                {/* Vintage Header for Printout */}
                <div className="border-b-2 border-amber-500/20 pb-4 flex justify-between items-end">
                  <div className="space-y-0.5">
                    <span className="text-xs uppercase font-mono tracking-widest text-amber-500">Noble Roam Africa</span>
                    <h2 className="text-lg font-bold tracking-tight text-stone-100 print:text-stone-950">ROYAL FLIGHT SPECIAL</h2>
                  </div>
                  <div className="text-right text-xs font-mono text-stone-500">
                    <span>Date Issued: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>

                {/* Markdown Styled Core Content */}
                <div className="space-y-4 text-sm md:text-base leading-relaxed font-light font-sans text-stone-300 print:text-stone-900 markdown-body prose prose-invert print:prose-stone">
                  <Markdown>{itineraryResult}</Markdown>
                </div>

                {/* Printable Footer */}
                <div className="border-t border-stone-850 pt-5 text-center text-xs text-stone-500 space-y-1">
                  <p>Designed bespoke by the Noble Roam Tailor-Made Board of Wilderness Advisors.</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest">Nairobi • Maasai Mara • Samburu • Lewa</p>
                </div>
              </div>

              <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/10 flex items-start gap-4 text-stone-400 text-xs">
                <FileText className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Our wilderness concierges have reserved tentative aircraft capacity matching your travel month parameters. Press the **Reservations** tab or click general contact triggers to secure final lodging pricing. This dynamic dossier is copy/printable.
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* STEP BUTTONS */}
        {step <= 4 && (
          <div className="flex items-center justify-between border-t border-stone-200 dark:border-stone-850 pt-8 mt-10">
            <button
              id="planner-back-btn"
              onClick={prevStep}
              disabled={step === 1 || loading}
              className={`inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-lg border text-sm transition-all cursor-pointer ${
                step === 1 || loading
                  ? 'border-stone-200 dark:border-stone-850 text-stone-400 dark:text-stone-600 cursor-not-allowed opacity-50'
                  : 'border-stone-250 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 bg-stone-100 dark:bg-stone-950 hover:bg-stone-200 dark:hover:bg-stone-850'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {step < 4 ? (
              <button
                id="planner-next-btn"
                onClick={nextStep}
                className="group inline-flex items-center gap-1.5 px-5.5 py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-900 dark:hover:bg-stone-850 border border-stone-800 text-stone-200 hover:text-white font-sans text-sm rounded-lg transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                id="planner-submit-btn"
                onClick={handleComposeSafari}
                disabled={loading}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 hover:scale-[1.02] font-semibold text-sm rounded-lg shadow-lg hover:shadow-amber-500/5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>Weaver of Dreams: Compose Safari</span>
              </button>
            )}
          </div>
        )}
      </div>
        </>
      ) : (
        <div className="bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-850 rounded-2xl p-6 md:p-10 shadow-xl backdrop-blur-lg min-h-[400px]">
          {selectedSavedId === null ? (
            <div className="space-y-6">
              {/* Saved blueprints layout */}

              {savedItineraries.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-950 flex items-center justify-center mx-auto text-stone-400">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h4 className="font-sans font-medium text-sm text-stone-700 dark:text-stone-300">No blueprints saved yet</h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                    Generate a bespoke safari using our Custom AI Safari Designer, and it will be saved here automatically for future reference!
                  </p>
                  <button
                    onClick={() => setCurrentView('designer')}
                    className="mt-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-xs rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    Start Designing
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedItineraries.map((saved) => (
                    <div
                      key={saved.id}
                      className="p-5 bg-stone-50 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-850 rounded-xl hover:border-amber-400/50 transition-all text-left flex flex-col justify-between group h-64 shadow-sm"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full">
                            {saved.durationDays} Days • {saved.departureMonth}
                          </span>
                          <span className="text-[10px] font-mono text-stone-400">{saved.createdDate}</span>
                        </div>
                        <h4 className="font-sans font-bold text-stone-900 dark:text-stone-100 text-sm line-clamp-2 leading-snug">
                          {saved.title}
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 font-sans line-clamp-3 leading-relaxed">
                          <strong>Destinations:</strong> {saved.destinations.join(', ')}
                          {saved.customWishes && <><br /><strong>Wishes:</strong> {saved.customWishes}</>}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-stone-200 dark:border-stone-850 pt-3 mt-4">
                        <button
                          onClick={() => {
                            const updated = savedItineraries.filter(s => s.id !== saved.id);
                            setSavedItineraries(updated);
                            localStorage.setItem('zuri_saved_itineraries', JSON.stringify(updated));
                          }}
                          className="text-[10px] font-mono text-stone-400 hover:text-red-500 transition-colors uppercase cursor-pointer"
                        >
                          Delete
                        </button>

                        <button
                          onClick={() => setSelectedSavedId(saved.id)}
                          className="px-3 py-1.5 bg-stone-900 hover:bg-stone-850 dark:bg-stone-900 dark:hover:bg-stone-850 border border-stone-800 text-stone-200 hover:text-white rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <span>Open dossier</span>
                          <ChevronRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            (() => {
              const savedItem = savedItineraries.find(s => s.id === selectedSavedId);
              if (!savedItem) return null;
              return (
                <div className="space-y-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
                    <button
                      onClick={() => setSelectedSavedId(null)}
                      className="inline-flex items-center gap-1 text-xs font-mono text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors uppercase cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 text-amber-500" />
                      <span>Back to Vault</span>
                    </button>

                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => {
                          const printContent = document.getElementById('saved-itinerary-print-area');
                          if (printContent) {
                            const originalContent = document.body.innerHTML;
                            document.body.innerHTML = printContent.innerHTML;
                            window.print();
                            document.body.innerHTML = originalContent;
                            window.location.reload();
                          }
                        }}
                        className="p-2 w-10 h-10 rounded-lg border border-stone-200 dark:border-stone-850 hover:bg-stone-50 dark:hover:bg-stone-850 flex items-center justify-center cursor-pointer transition-colors text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"
                        title="Print Program"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div
                    id="saved-itinerary-print-area"
                    className="p-6 md:p-8 bg-stone-50 dark:bg-stone-950/30 border border-stone-200 dark:border-stone-850 rounded-xl space-y-6 text-stone-800 dark:text-stone-300 font-sans print:bg-white print:text-black print:p-10 text-left"
                  >
                    <div className="border-b-2 border-amber-500/20 pb-4 flex justify-between items-end">
                      <div className="space-y-0.5 text-left">
                        <span className="text-xs uppercase font-mono tracking-widest text-amber-600 dark:text-amber-500">Noble Roam Africa</span>
                        <h2 className="text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100 print:text-stone-950">ROYAL FLIGHT SPECIAL</h2>
                      </div>
                      <div className="text-right text-xs font-mono text-stone-500">
                        <span>Created: {savedItem.createdDate}</span>
                      </div>
                    </div>

                    <div className="space-y-4 text-sm md:text-base leading-relaxed text-left font-light font-sans text-stone-700 dark:text-stone-300 print:text-stone-900 markdown-body prose prose-stone dark:prose-invert">
                      <Markdown>{savedItem.itinerary}</Markdown>
                    </div>

                    <div className="border-t border-stone-200 dark:border-stone-850 pt-5 text-center text-xs text-stone-500 space-y-1">
                      <p>Designed bespoke by the Noble Roam Tailor-Made Board of Wilderness Advisors.</p>
                      <p className="font-mono text-[9px] uppercase tracking-widest">Nairobi • Maasai Mara • Samburu • Lewa</p>
                    </div>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      )}

      {/* Action error feedback */}
      <AnimatePresence>
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="mt-6 p-4 bg-red-500/10 border border-red-500/25 rounded-xl flex items-center gap-3 text-xs text-red-400"
          >
            <Compass className="w-5 h-5 stroke-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Canvas overlay screen */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-6 text-stone-300 text-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full py-12 px-8 bg-stone-900 border border-stone-850 rounded-2xl relative space-y-6 shadow-2xl"
          >
            <div className="relative w-20 h-20 mx-auto">
              {/* Rotating compass outer spacer */}
              <div className="absolute inset-0 border-2 border-stone-850 rounded-full" />
              <div className="absolute inset-0 border-t-2 border-r-2 border-amber-500 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Plane className="w-8 h-8 text-amber-400 transform -rotate-45 animate-pulse" />
              </div>
            </div>

            <h4 className="font-sans font-medium text-lg text-white">Composing Sovereign Blueprint</h4>
            
            <motion.p
              key={loadingText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="font-mono text-amber-400 text-xs tracking-wider"
            >
              {loadingText}
            </motion.p>

            <span className="text-[11px] text-stone-500 leading-normal block">
              Our AI travel coordinators are cross-referencing Maasai Mara seasonal migrations, Amboseli weather fronts, and luxury Cessna single-engine flight times...
            </span>
          </motion.div>
        </div>
      )}
    </div>
  );
}
