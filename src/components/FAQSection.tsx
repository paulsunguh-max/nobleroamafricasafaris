import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, Compass, Mail, ShieldAlert, Sparkles, MapPin } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    category: "Expedition Planning",
    question: "How do private aircraft transfers compare to overland road transfers?",
    answer: "Our 'Air Sovereign' methodology replaces bumpy, 5-to-8-hour dusty dirt-road traverses with smooth, 35-to-50-minute flight hops in twin-engine private aircraft (such as Cessna Skywagons or executive caravans). This preserves your energy and expands game-viewing hours dramatically."
  },
  {
    category: "Ecosystems & Lakes",
    question: "What makes Lake Nakuru and Lake Naivasha unique on the trail?",
    answer: "Lake Nakuru is a protected alkaline saline safehaven containing up to several million lesser flamingos at any given time, forming spectacular pink curtains against yellow fever-tree ridges. Lake Naivasha, a freshwater lake, hosts thousands of massive grazing hippopotamus pods, best surveyed under gold-cert guides in customized private boats."
  },
  {
    category: "Guiding Standards",
    question: "What does are 'Gold-Badge Guide (KPSGA)' certification mean?",
    answer: "The Kenya Professional Safari Guides Association (KPSGA) issues Bronze, Silver, and Gold badges. Gold is the highest, elite rank in Africa, earned by less than 5% of all active trackers. Noble Roam Africa Safaris LTD guarantees all signature journeys are directed exclusively by Gold-Badge naturalists."
  },
  {
    category: "Tailor-Made Design",
    question: "How does the 'Noble Roam Canvas (AI)' draft blueprints work?",
    answer: "The Noble Roam Canvas uses high-level, real-time natural language parameters to generate structural draft itineraries matching specific wildlife targets, dietary accommodations, and flight desires. Once formulated, senior directors refine and book the physical slots directly."
  },
  {
    category: "Reservations & Pricing",
    question: "Why are sovereign package rates provided solely upon request?",
    answer: "Because our signature trails are strictly private and tailored to specific aircraft routes, luxury tents, and customized helicopter hops, rates fluctuate depending on precise squad size, seasonal air slots, and customized experiences. Contact our Karen Desk directly for personalized quotes."
  },
  {
    category: "Safety & Medevac",
    question: "What safety systems are incorporated in remote wilderness lodges?",
    answer: "Every single client party is fully registered under the AMREF Flying Doctors emergency evacuation guarantee, ensuring absolute satellite linkage to trauma hubs if urgent treatment is required. Lodges feature 24/7 armed askaris to patrol compound borders of campsites."
  },
  {
    category: "Sustainable Wildlife Impact",
    question: "How do your bookings directly help East African conservation efforts?",
    answer: "A fixed 10% pledge of every custom quote is directed to the Ol Pejeta Rhino Sanctuary program and Maasai Mara conservancy rangers. Noble Roam Africa Safaris LTD supports anti-poaching programs, canine patrol teams, and water filtration for local native communities."
  },
  {
    category: "Luggage & Flights",
    question: "What are the baggage limit rules for private charter skycraft?",
    answer: "Due to strict flight balance requirements in light aircraft, guests are limited to 15 kg (33 lbs) of luggage, which must be packed inside soft duffel bags with no hard frames. Excessive luggage can be cached securely at our private Karen Road office headquarters."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");

  const categories = ["All Categories", ...Array.from(new Set(FAQ_DATA.map(item => item.category)))];

  const filteredFAQs = selectedCategory === "All Categories" 
    ? FAQ_DATA 
    : FAQ_DATA.filter(item => item.category === selectedCategory);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq-sanctuary-container" className="max-w-4xl mx-auto px-6 py-12 text-stone-800 dark:text-stone-300 space-y-12">
      
      {/* Visual Header */}
      <div className="text-center space-y-4">
        <span className="text-amber-600 dark:text-amber-500 font-mono text-xs uppercase tracking-widest px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full inline-flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
          The Sanctuary Ledger
        </span>
        <h2 className="font-serif-luxury text-3xl md:text-5xl font-semibold text-stone-900 dark:text-white tracking-tight">
          Frequently Answered Queries
        </h2>
        <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 font-sans font-light max-w-xl mx-auto leading-relaxed">
          Comprehensive tactical parameters regarding sovereign private flight corridors, gold-standard safety guides, and sustainable conservation trails.
        </p>
      </div>

      {/* Category selector pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            id={`faq-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setOpenIndex(null); // Reset when switching categories
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-amber-500/10 border-amber-400/60 text-amber-600 dark:text-amber-400 font-bold'
                : 'bg-stone-50 dark:bg-stone-900/60 border-stone-200 dark:border-stone-850 hover:border-stone-300 dark:hover:border-stone-750 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Interactive Accordion Stack */}
      <div className="space-y-4 text-left">
        {filteredFAQs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              id={`faq-item-${index}`}
              key={index}
              className="bg-white dark:bg-stone-900/40 border border-stone-250 dark:border-stone-850 hover:border-stone-300 dark:hover:border-stone-800 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm dark:shadow-none"
            >
              {/* Question Header */}
              <button
                id={`faq-question-btn-${index}`}
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer group"
              >
                <div className="space-y-1 pr-4">
                  <span className="text-[9px] font-mono text-stone-400 dark:text-stone-500 uppercase tracking-widest block">
                    {faq.category}
                  </span>
                  <span className="text-sm md:text-base font-sans font-semibold text-stone-850 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {faq.question}
                  </span>
                </div>
                <div className="shrink-0 p-1.5 rounded-lg bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-850 text-stone-500 dark:text-stone-400 group-hover:text-amber-550 group-hover:border-amber-400/30 transition-all">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Collapsible Answer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 pt-1 border-t border-stone-150 dark:border-stone-850/50 text-xs md:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed font-sans prose dark:prose-invert">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Final desk contact help CTA banner */}
      <div className="p-6 bg-stone-50 dark:bg-gradient-to-br dark:from-stone-900/50 dark:to-stone-950 border border-stone-200 dark:border-stone-850 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-sm dark:shadow-none">
        <div className="space-y-2">
          <span className="text-amber-600 dark:text-amber-400 font-mono text-[10px] uppercase font-semibold block tracking-widest flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Unresolved Ambiguities?
          </span>
          <h4 className="font-serif-luxury text-xl font-medium text-stone-900 dark:text-white tracking-tight">
            Our Elite Karen Desk is Accessible
          </h4>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed max-w-lg font-sans">
            Speak directly with a Gold Badge Safari Naturalist based in Nairobi to resolve specific visa coordinates, physical mobility plans, or bespoke flight routes.
          </p>
        </div>
        
        <div className="shrink-0 flex items-center gap-3">
          <a
            href="mailto:info@nobleroamafricasafaris.com,support@nobleroamafricasafaris.com"
            className="px-5 py-3 rounded-xl bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-850 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white text-xs font-mono uppercase tracking-wider transition-all shadow-sm"
          >
            Direct Inbound Mail
          </a>
        </div>
      </div>

    </div>
  );
}
