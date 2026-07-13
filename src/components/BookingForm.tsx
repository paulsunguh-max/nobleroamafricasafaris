import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  CheckCircle, 
  Calendar, 
  Sparkles, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Compass, 
  Check, 
  FileText, 
  ChevronRight, 
  Bookmark, 
  Image as ImageIcon 
} from 'lucide-react';

interface BookingFormProps {
  initialProgramName?: string;
  onSuccess?: () => void;
}

interface SubmittedRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  startDate: string;
  guests: number;
  program: string;
  dietary: string;
  mobilityOption: string;
  notes: string;
  submittedAt: string;
}

const LAKES_GALLERY = [
  {
    url: "https://res.cloudinary.com/ddjuftfy2/image/upload/f_webp,c_fill,q_auto,w_1300/memphis/xlarge/546201882_Lake%20Nakuru%20National%20Park.jpg",
    title: "Lake Nakuru National Park",
    desc: "Pink-hued shores filled with millions of lesser flamingos."
  },
  {
    url: "https://media.istockphoto.com/id/593297314/photo/hippos-in-lake-naivasha.jpg?s=612x612&w=0&k=20&c=5iDHnsu-qNjn_bXL4hFbWVzIA1LdbmvrU-19M_gdlA4=",
    title: "Lake Naivasha Oasis",
    desc: "Colossal hippo pods cooling beneath volcanic shadows."
  },
  {
    url: "/src/assets/images/rift_valley_natron_1783143354386.jpg",
    title: "Great Rift Valley Waterways",
    desc: "Ancient salt-lake ecosystems nestled under volcanic ridges."
  },
  {
    url: "https://live.staticflickr.com/455/31251680154_1cd205251b_o.jpg",
    title: "Amboseli Swamplands",
    desc: "Glacial melting currents providing life streams below Kilimanjaro."
  }
];

export default function BookingForm({ 
  initialProgramName = '', 
  onSuccess
}: BookingFormProps) {
  const [subTab, setSubTab] = useState<'inquire' | 'contacts' | 'management'>('contacts'); // Default to contacts as requested
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [program, setProgram] = useState(initialProgramName || 'Sovereign Crown of East Africa');
  const [dietary, setDietary] = useState('');
  const [mobilityOption, setMobilityOption] = useState('with-intl-flights');
  const [otherMobility, setOtherMobility] = useState('');
  const [notes, setNotes] = useState('');
  const [copiedInfo, setCopiedInfo] = useState(false);
  const [copiedSupport, setCopiedSupport] = useState(false);
  const [copiedWambua, setCopiedWambua] = useState(false);
  const [copiedSungu, setCopiedSungu] = useState(false);

  // Alternating profile pictures state for Paul Sungu
  const [paulImage, setPaulImage] = useState<string>('/src/assets/images/p1.jpeg');

  useEffect(() => {
    const interval = setInterval(() => {
      setPaulImage(prev => prev === '/src/assets/images/p1.jpeg' ? '/src/assets/images/p2.jpeg' : '/src/assets/images/p1.jpeg');
    }, 6000); // alternating after 6 seconds
    return () => clearInterval(interval);
  }, []);

  // Wildlife slideshow
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Local storage submitted requests history list to simulate complete transaction loop
  const [submittedRequests, setSubmittedRequests] = useState<SubmittedRequest[]>([]);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    const loaded = localStorage.getItem('zuri_safari_requests');
    if (loaded) {
      try {
        const parsed = JSON.parse(loaded);
        // Normalize loaded requests if they contain old flightOption field
        const normalized = parsed.map((req: any) => ({
          ...req,
          mobilityOption: req.mobilityOption || req.flightOption || 'Source Private Aviation'
        }));
        setSubmittedRequests(normalized);
      } catch (err) {
        console.error('Failed to parse logs', err);
      }
    }
  }, []);

  useEffect(() => {
    if (initialProgramName) {
      setProgram(initialProgramName);
      setSubTab('inquire'); // auto-switch when a program is specifically chosen
    }
  }, [initialProgramName]);

  // Rotate wildlife lake images safely
  useEffect(() => {
    const interval = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % LAKES_GALLERY.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const getMobilityString = () => {
    if (mobilityOption === 'other') {
      return otherMobility ? `Other: ${otherMobility}` : 'Other Custom Preference';
    }
    if (mobilityOption === 'with-intl-flights') {
      return 'Source Private Aviation';
    }
    if (mobilityOption === 'ground-only') {
      return 'Local Air hops Only';
    }
    if (mobilityOption === 'driving') {
      return 'Driving (Overland Cruiser)';
    }
    return mobilityOption;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !phone || !startDate) {
      alert('Kindly fill in all required operational contact details.');
      return;
    }

    const newRequest: SubmittedRequest = {
      id: "req_" + Math.random().toString(36).substr(2, 9),
      fullName,
      email,
      phone,
      startDate,
      guests,
      program,
      dietary,
      mobilityOption: getMobilityString(),
      notes,
      submittedAt: new Date().toLocaleString(),
    };

    const updated = [newRequest, ...submittedRequests];
    localStorage.setItem('zuri_safari_requests', JSON.stringify(updated));
    setSubmittedRequests(updated);
    setSubmittedSuccess(true);

    if (onSuccess) {
      onSuccess();
    }
  };

  const handleClearHistory = () => {
    localStorage.removeItem('zuri_safari_requests');
    setSubmittedRequests([]);
  };

  const copyInfoEmail = () => {
    navigator.clipboard.writeText('info@nobleroamafricasafaris.com');
    setCopiedInfo(true);
    setTimeout(() => setCopiedInfo(false), 2000);
  };

  const copySupportEmail = () => {
    navigator.clipboard.writeText('support@nobleroamafricasafaris.com');
    setCopiedSupport(true);
    setTimeout(() => setCopiedSupport(false), 2000);
  };

  const getMailtoLink = () => {
    const to = "info@nobleroamafricasafaris.com,support@nobleroamafricasafaris.com";
    const subject = encodeURIComponent(`Bespoke Safari Reservation: ${fullName}`);
    const bodyText = `Dear Noble Roam Africa Safaris,

I would like to submit my custom safari reservation request.

Here are my details:
- Full Name: ${fullName}
- Email: ${email}
- Phone: ${phone}
- Target Landing Date: ${startDate}
- Private Cohort Size: ${guests}
- Selected Safari Program: ${program}
- Mobility Preferences: ${getMobilityString()}
- Dietary & Health specs: ${dietary || 'None'}
- Additional Expedition Requests: ${notes || 'None'}

Thank you!`;
    const body = encodeURIComponent(bodyText);
    return `mailto:${to}?subject=${subject}&body=${body}`;
  };

  const getWhatsappLink = () => {
    const text = `Dear Noble Roam Africa Safaris,

I would like to submit my custom safari reservation request.

Here are my details:
- Full Name: ${fullName}
- Email: ${email}
- Phone: ${phone}
- Target Landing Date: ${startDate}
- Private Cohort Size: ${guests}
- Selected Safari Program: ${program}
- Mobility Preferences: ${getMobilityString()}
- Dietary & Health specs: ${dietary || 'None'}
- Additional Expedition Requests: ${notes || 'None'}

Please review my reservation request. Thank you!`;
    return `https://wa.me/254729693907?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="booking-form-wrapper" className="max-w-5xl mx-auto px-6 py-12 text-stone-800 dark:text-stone-300 space-y-8">
      
      {/* Dynamic Sub-tab Switcher with elegant micro animations */}
      <div className="flex justify-center">
        <div className="bg-stone-100 dark:bg-stone-900/60 p-1 border border-stone-200 dark:border-stone-850 rounded-xl inline-flex flex-wrap justify-center gap-1">
          <button
            id="subtab-contacts"
            onClick={() => setSubTab('contacts')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer relative ${
              subTab === 'contacts'
                ? 'text-amber-605 dark:text-amber-400 bg-white dark:bg-stone-950/80 border border-stone-200 dark:border-stone-800 font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Direct Contacts Desk
            {subTab === 'contacts' && (
              <motion.div
                layoutId="miniTabActive"
                className="absolute -bottom-1 left-4 right-4 h-0.5 bg-amber-400 rounded"
              />
            )}
          </button>
          
          <button
            id="subtab-inquire"
            onClick={() => setSubTab('inquire')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer relative ${
              subTab === 'inquire'
                ? 'text-amber-605 dark:text-amber-400 bg-white dark:bg-stone-950/80 border border-stone-200 dark:border-stone-800 font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Secure Reservation Form
            {subTab === 'inquire' && (
              <motion.div
                layoutId="miniTabActive"
                className="absolute -bottom-1 left-4 right-4 h-0.5 bg-amber-400 rounded"
              />
            )}
          </button>

          <button
            id="subtab-management"
            onClick={() => setSubTab('management')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer relative ${
              subTab === 'management'
                ? 'text-amber-605 dark:text-amber-400 bg-white dark:bg-stone-950/80 border border-stone-200 dark:border-stone-800 font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Corporate Management
            {subTab === 'management' && (
              <motion.div
                layoutId="miniTabActive"
                className="absolute -bottom-1 left-4 right-4 h-0.5 bg-amber-400 rounded"
              />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* SUBTAB: DIRECT CONTACTS DESK */}
        {subTab === 'contacts' && (
          <motion.div
            key="contacts-subview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
          >
            {/* Left Block: Corporate Info and Communications Cards (Cols 6) */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div className="p-6 md:p-8 bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-850 rounded-2xl text-left space-y-6 shadow-sm dark:shadow-none">
                
                <div className="border-b border-stone-150 dark:border-stone-850 pb-4">
                  <span className="text-amber-600 dark:text-amber-500 font-mono text-[10px] tracking-widest uppercase block font-semibold mb-1">Interactive Command Link</span>
                  <h3 className="text-xl md:text-2xl font-serif-luxury font-medium text-stone-900 dark:text-white tracking-tight">
                    Noble Roam Operational Headquarters
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-450 mt-1 font-sans">
                    Seamless secure luxury links straight into Karen, Nairobi. Dedicated 24/7 client desk.
                  </p>
                </div>

                {/* Secure Links Directory */}
                <div className="space-y-4">



                  {/* Card: Email Address */}
                  <div className="p-4 bg-stone-50 dark:bg-stone-950/50 border border-stone-200 dark:border-stone-800 hover:border-amber-450/50 dark:hover:border-amber-400/50 rounded-xl transition-all duration-300 space-y-3.5 shadow-sm">
                    <div className="flex items-center gap-3.5 border-b border-stone-150 dark:border-stone-900 pb-2">
                      <div className="p-2.5 bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 rounded-lg text-amber-600 dark:text-amber-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono text-stone-500 tracking-wider font-semibold">Premium Concierge Desk</span>
                        <h4 className="text-sm font-semibold text-stone-900 dark:text-white font-sans">Official Communications Channels</h4>
                      </div>
                    </div>

                    <div className="space-y-3 pl-1">
                      {/* Email 1: info@nobleroamafricasafaris.com */}
                      <div className="flex items-center justify-between gap-3 text-xs">
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase font-mono text-stone-450 block">General Information Desk</span>
                          <a href="mailto:info@nobleroamafricasafaris.com" className="font-mono text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors truncate block">
                            info@nobleroamafricasafaris.com
                          </a>
                        </div>
                        <button
                          id="copy-info-email-btn"
                          onClick={copyInfoEmail}
                          className="px-2.5 py-1.5 shrink-0 rounded border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-[9px] text-stone-600 dark:text-stone-450 font-mono uppercase transition-colors cursor-pointer shadow-sm"
                        >
                          {copiedInfo ? <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold"><Check className="w-2.5 h-2.5" /> Copied</span> : "Copy"}
                        </button>
                      </div>

                      {/* Email 2: support@nobleroamafricasafaris.com */}
                      <div className="flex items-center justify-between gap-3 text-xs border-t border-stone-100 dark:border-stone-900/60 pt-2.5">
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase font-mono text-stone-450 block">Customer Support Desk</span>
                          <a href="mailto:support@nobleroamafricasafaris.com" className="font-mono text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors truncate block font-mono">
                            support@nobleroamafricasafaris.com
                          </a>
                        </div>
                        <button
                          id="copy-support-email-btn"
                          onClick={copySupportEmail}
                          className="px-2.5 py-1.5 shrink-0 rounded border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-[9px] text-stone-600 dark:text-stone-450 font-mono uppercase transition-colors cursor-pointer shadow-sm"
                        >
                          {copiedSupport ? <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold"><Check className="w-2.5 h-2.5" /> Copied</span> : "Copy"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card: Telephone Support */}
                  <div className="p-4 bg-stone-50 dark:bg-stone-950/50 border border-stone-200 dark:border-stone-800 hover:border-amber-450/50 dark:hover:border-amber-400/50 rounded-xl transition-all duration-300 space-y-3.5 shadow-sm">
                    <div className="flex items-center gap-3.5 border-b border-stone-150 dark:border-stone-900 pb-2">
                      <div className="p-2.5 bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 rounded-lg text-amber-600 dark:text-amber-400">
                        <Phone className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono text-stone-500 tracking-wider font-semibold">Sovereign Voice Link</span>
                        <h4 className="text-sm font-semibold text-stone-900 dark:text-white font-sans">24/7 Operations Call Center</h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-1">
                      {/* Phone 1 */}
                      <a 
                        href="tel:+254729693907" 
                        className="p-2 bg-white dark:bg-stone-900 hover:border-amber-500/30 border border-stone-200 dark:border-stone-850 rounded-lg flex items-center gap-2 text-stone-800 dark:text-stone-200 transition-all hover:shadow-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                        <span className="text-xs font-mono font-medium">+254 729 693 907</span>
                      </a>
                      {/* Phone 2 */}
                      <a 
                        href="tel:+254712772230" 
                        className="p-2 bg-white dark:bg-stone-900 hover:border-amber-500/30 border border-stone-200 dark:border-stone-850 rounded-lg flex items-center gap-2 text-stone-800 dark:text-stone-200 transition-all hover:shadow-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                        <span className="text-xs font-mono font-medium">+254 712 772 230</span>
                      </a>
                    </div>
                  </div>

                  {/* Card: WhatsApp Support */}
                  <div className="p-4 bg-stone-50 dark:bg-stone-950/50 border border-stone-200 dark:border-stone-800 hover:border-emerald-550/30 dark:hover:border-emerald-500/30 rounded-xl transition-all duration-300 space-y-3.5 shadow-sm">
                    <div className="flex items-center gap-3.5 border-b border-stone-150 dark:border-stone-900 pb-2">
                      <div className="p-2.5 bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12.012 2C6.5 2 2.012 6.5 2.012 12c0 2.1.65 4.1 1.75 5.85L2 22l4.35-1.15c1.7.9 3.65 1.4 5.65 1.4 5.5 0 10-4.5 10-10S17.512 2 12.012 2zm0 1.65c4.6 0 8.35 3.75 8.35 8.35s-3.75 8.35-8.35 8.35c-2 0-3.8-.7-5.25-1.9l-.4-.25-2.55.65.7-2.5-.25-.4c-1.3-1.4-2-3.2-2-5.1 0-4.6 3.75-8.35 8.35-8.35zm-3.6 3.6c-.2 0-.4 0-.6.1-.2.1-.4.3-.5.4-.1.1-.3.3-.4.6-.2.4-.3.9-.1 1.4.1.3.3.6.5.9.6.8 1.4 1.5 2.2 2.1.6.4 1.2.8 1.9 1 .4.1.8.2 1.2.1.4-.1.8-.3 1-.6.2-.3.3-.6.3-.9l-.1-.4-.4-.2c-.2-.1-.9-.4-1-.5-.1-.1-.3-.1-.4 0-.1.1-.3.4-.4.5-.1.1-.2.2-.4.1-.2-.1-.7-.3-1.3-.9-.5-.4-.8-.9-.9-1.1-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.4l.2-.3c.1-.1.1-.3 0-.4L10.3 8c-.1-.2-.3-.2-.5-.2zm0 0" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono text-emerald-500 tracking-wider font-semibold">Instant Dispatch Desk</span>
                        <h4 className="text-sm font-semibold text-stone-900 dark:text-white font-sans">Contact & Chat on WhatsApp</h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-1">
                      {/* WhatsApp 1 */}
                      <a 
                        href="https://wa.me/254729693907" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white dark:bg-stone-900 hover:border-emerald-500/30 border border-stone-200 dark:border-stone-850 rounded-lg flex items-center justify-between text-stone-800 dark:text-stone-200 transition-all hover:shadow-sm group"
                      >
                        <span className="text-xs font-mono font-medium text-stone-700 dark:text-stone-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">+254 729 693 907</span>
                        <span className="text-[9px] font-sans font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Chat</span>
                      </a>
                      {/* WhatsApp 2 */}
                      <a 
                        href="https://wa.me/254712772230" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white dark:bg-stone-900 hover:border-emerald-500/30 border border-stone-200 dark:border-stone-850 rounded-lg flex items-center justify-between text-stone-800 dark:text-stone-200 transition-all hover:shadow-sm group"
                      >
                        <span className="text-xs font-mono font-medium text-stone-700 dark:text-stone-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">+254 712 772 230</span>
                        <span className="text-[9px] font-sans font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Chat</span>
                      </a>
                    </div>
                  </div>

                  {/* Card: Headquarters Physical Location */}
                  <div className="p-4 bg-stone-50 dark:bg-stone-950/50 border border-stone-200 dark:border-stone-800 rounded-xl transition-all duration-300 flex items-start gap-3.5 shadow-sm">
                    <div className="p-2.5 bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 rounded-lg text-amber-600 dark:text-amber-400 shrink-0 mt-1">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] uppercase font-mono text-stone-500 tracking-wider block">Physical Presence Landmark</span>
                      <strong className="text-sm font-medium text-stone-800 dark:text-stone-200 block mt-0.5">Karen Road Offices, Block D</strong>
                      <span className="text-xs text-stone-600 dark:text-stone-450 leading-relaxed font-light block mt-0.5">
                        Karen Area, Nairobi, Republic of Kenya
                      </span>
                    </div>
                  </div>

                  {/* Card: Operating Hours */}
                  <div className="p-4 bg-stone-50 dark:bg-stone-950/50 border border-stone-200 dark:border-stone-800 rounded-xl flex items-start gap-3.5 shadow-sm">
                    <div className="p-2.5 bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 rounded-lg text-amber-600 dark:text-amber-400 shrink-0 mt-1">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] uppercase font-mono text-stone-500 tracking-wider block">Availability Parameters</span>
                      <strong className="text-sm font-medium text-stone-800 dark:text-stone-200 block mt-0.5">Always Accessible</strong>
                      <span className="text-xs text-stone-600 dark:text-stone-450 leading-relaxed font-light block mt-0.5 font-mono">
                        Nairobi Desk: 07:00 – 21:00 EAT | Urgent Ops: 24/7/365
                      </span>
                    </div>
                  </div>

                </div>



              </div>
            </div>

            {/* Right Block: Pure High-Quality Lakes & Wildlife Photo Showcase (No People) (Cols 6) */}
            <div className="lg:col-span-6 bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-850 rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-6 shadow-sm dark:shadow-none">
              <div className="text-left space-y-4">
                <div className="flex items-center gap-2 text-stone-500 dark:text-stone-450">
                  <ImageIcon className="w-4 h-4 text-amber-500" />
                  <span className="font-mono text-xs uppercase tracking-wider block font-medium">Capture of Lakes & Landscapes</span>
                </div>
                <h3 className="text-lg md:text-xl font-sans text-stone-900 dark:text-stone-100 font-medium">
                  Rift Valley Basin & Wild Sanctuaries
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                  Noble Roam Africa Safaris LTD specializes in mapping journeys around pristine alkaline and fresh lakes. Observe pink lines representing billions of lesser flamingos on Lake Nakuru, or listen to the echoing calling of fish eagles directly over the serene waters of Naivasha.
                </p>
              </div>

              {/* Seamless Animated Slideshow of Lakes & Swamps (emanimation) */}
              <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-xl border border-stone-800">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={galleryIndex}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent z-10" />
                    <img
                      src={LAKES_GALLERY[galleryIndex].url}
                      alt={LAKES_GALLERY[galleryIndex].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4 z-20 text-left">
                      <span className="inline-block px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/35 text-[9px] font-mono text-amber-400 uppercase tracking-widest leading-none mb-1">
                        Active Ecosystem
                      </span>
                      <h4 className="text-sm font-sans font-medium text-stone-900 dark:text-white leading-tight">
                        {LAKES_GALLERY[galleryIndex].title}
                      </h4>
                      <p className="text-[11px] text-stone-750 dark:text-stone-350 font-sans font-light mt-0.5">
                        {LAKES_GALLERY[galleryIndex].desc}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Bullet indicator dots */}
                <div className="absolute bottom-4 right-4 z-30 flex items-center gap-1.5">
                  {LAKES_GALLERY.map((_, i) => (
                    <button
                      id={`indicator-${i}`}
                      key={i}
                      onClick={() => setGalleryIndex(i)}
                      className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                        galleryIndex === i ? 'bg-amber-400 scale-125' : 'bg-stone-600 hover:bg-stone-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Action Prompt */}
              <div className="p-4 bg-stone-50 dark:bg-stone-950/40 rounded-xl border border-stone-200 dark:border-stone-850 text-left flex items-center justify-between gap-4 shadow-sm">
                <div className="space-y-0.5">
                  <span className="text-stone-950 dark:text-white text-xs font-sans font-semibold">Ready to specify criteria?</span>
                  <p className="text-[10px] text-stone-500 dark:text-stone-550">Generate draft blueprints instantly with our reservation desk builder.</p>
                </div>
                <button
                  id="switch-to-form-btn"
                  onClick={() => setSubTab('inquire')}
                  className="px-4 py-2 bg-white dark:bg-stone-900 border border-stone-250 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 text-[10px] font-mono uppercase tracking-wider rounded-lg hover:bg-stone-50 dark:hover:bg-stone-850 cursor-pointer shadow-sm"
                >
                  Reservations Form
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {/* SUBTAB: THE MANAGEMENT TEAM */}
        {subTab === 'management' && (
          <motion.div
            key="management-subview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-8 animate-fade-in"
          >
            {/* Header intro card */}
            <div className="p-6 md:p-8 bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-850 rounded-2xl text-left space-y-4 shadow-sm dark:shadow-none">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-150 dark:border-stone-850 pb-4">
                <div>
                  <span className="text-amber-600 dark:text-amber-500 font-mono text-[10px] tracking-widest uppercase block font-semibold mb-1">Corporate Leadership & Advisory</span>
                  <h3 className="text-xl md:text-2xl font-serif-luxury font-medium text-stone-900 dark:text-white tracking-tight">
                    Executive Board of Directors
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-450 mt-1 font-sans">
                    Guiding Noble Roam Africa Safaris with decades of conservation heritage, bespoke logistics mastery, and high-end client devotion.
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-center font-mono text-[10px] uppercase text-amber-700 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/5 px-3 py-1 rounded-full border border-amber-500/20 dark:border-amber-500/10 shrink-0">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-500" />
                  <span>Sovereign Leaders</span>
                </div>
              </div>

              {/* Two Directors Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
                
                {/* Director 1: Wambua Kithuka */}
                <div className="flex flex-col sm:flex-row gap-5 p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 hover:border-amber-500/20 transition-all duration-300">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-300 dark:border-stone-800 shadow-sm bg-stone-200 dark:bg-stone-900">
                    <img 
                      src="/src/assets/images/w.jpeg" 
                      alt="Wambua Kithuka" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover animate-fade-in"
                    />
                  </div>
                  <div className="flex-1 text-left space-y-3.5 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-serif-luxury font-semibold text-stone-900 dark:text-white tracking-tight leading-none">
                        Wambua Kithuka
                      </h4>
                      <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider block mt-1 font-semibold">
                        Executive Director & Co-Founder
                      </span>
                      <p className="text-[11px] text-stone-500 dark:text-stone-450 mt-1 leading-relaxed font-light">
                        Master strategist oversees wildlife mapping, local host alliances, and elite operations across East Africa.
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-1.5 border-t border-stone-200/60 dark:border-stone-900">
                      {/* Email */}
                      <div className="flex items-center justify-between text-xs gap-2">
                        <a 
                          href="mailto:wambuakithuka@nobleroamafricasafaris.com" 
                          className="font-mono text-[11px] text-stone-800 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors truncate block"
                          title="Email Wambua"
                        >
                          wambuakithuka@nobleroamafricasafaris.com
                        </a>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText('wambuakithuka@nobleroamafricasafaris.com');
                            setCopiedWambua(true);
                            setTimeout(() => setCopiedWambua(false), 2000);
                          }}
                          className="px-2 py-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 rounded text-[9px] font-mono uppercase text-stone-550 dark:text-stone-400 shadow-sm cursor-pointer shrink-0"
                        >
                          {copiedWambua ? <span className="text-emerald-500 font-bold">Copied</span> : "Copy"}
                        </button>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[9px] uppercase font-mono text-stone-450">Direct:</span>
                        <a 
                          href="tel:+254712772230" 
                          className="font-mono text-[11px] font-medium text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1.5"
                        >
                          <Phone className="w-3 h-3 text-amber-500" />
                          <span>+254 712 772230</span>
                        </a>
                        <span className="text-[9px] px-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-semibold">24/7 Hot</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Director 2: Paul Sungu */}
                <div className="flex flex-col sm:flex-row gap-5 p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 hover:border-amber-500/20 transition-all duration-300">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-300 dark:border-stone-800 shadow-sm bg-stone-200 dark:bg-stone-900">
                    <img 
                      src={paulImage} 
                      alt="Paul Sungu" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover animate-fade-in"
                    />
                  </div>
                  <div className="flex-1 text-left space-y-3.5 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-serif-luxury font-semibold text-stone-900 dark:text-white tracking-tight leading-none">
                        Paul Sungu
                      </h4>
                      <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider block mt-1 font-semibold">
                        Executive Director & Co-Founder
                      </span>
                      <p className="text-[11px] text-stone-500 dark:text-stone-450 mt-1 leading-relaxed font-light">
                        Pioneers global client guest relations, ultra-luxury lodging standards, and bespoke flight-charter orchestration.
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-1.5 border-t border-stone-200/60 dark:border-stone-900">
                      {/* Email */}
                      <div className="flex items-center justify-between text-xs gap-2">
                        <a 
                          href="mailto:paulsungu@nobleroamafricasafaris.com" 
                          className="font-mono text-[11px] text-stone-800 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors truncate block"
                          title="Email Paul"
                        >
                          paulsungu@nobleroamafricasafaris.com
                        </a>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText('paulsungu@nobleroamafricasafaris.com');
                            setCopiedSungu(true);
                            setTimeout(() => setCopiedSungu(false), 2000);
                          }}
                          className="px-2 py-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-850 rounded text-[9px] font-mono uppercase text-stone-550 dark:text-stone-400 shadow-sm cursor-pointer shrink-0"
                        >
                          {copiedSungu ? <span className="text-emerald-500 font-bold">Copied</span> : "Copy"}
                        </button>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[9px] uppercase font-mono text-stone-450">Direct:</span>
                        <a 
                          href="tel:+254729693907" 
                          className="font-mono text-[11px] font-medium text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1.5"
                        >
                          <Phone className="w-3 h-3 text-amber-500" />
                          <span>+254 729 693907</span>
                        </a>
                        <span className="text-[9px] px-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold">HQ Call</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Shared operational signature */}
              <div className="p-4 bg-stone-50 dark:bg-stone-950/40 rounded-xl border border-stone-200 dark:border-stone-850 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm pt-4 mt-2">
                <p className="text-[11px] text-stone-600 dark:text-stone-450 leading-relaxed max-w-xl font-light">
                  Our directors maintain personal supervision over every dynamic itinerary generated via our web planner, ensuring gold-standard luxury and safety.
                </p>
                <button
                  onClick={() => setSubTab('inquire')}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-[10px] font-mono uppercase tracking-wider rounded-lg font-bold transition-all shadow-sm cursor-pointer shrink-0"
                >
                  Initiate Secure Inquiry
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* SUBTAB: THE RESERVATION FORM */}
        {subTab === 'inquire' && (
          <motion.div
            key="inquire-subview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          >
            
            {/* Left Form Panel: Column 7 */}
            <div className="lg:col-span-7 bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-850 rounded-2xl p-6 md:p-8 shadow-xl shadow-sm dark:shadow-none">
              <AnimatePresence mode="wait">
                {!submittedSuccess ? (
                  <motion.form
                    key="booking-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 text-left"
                  >
                    <div className="border-b border-stone-200 dark:border-stone-850 pb-4">
                      <h3 className="text-xl font-sans font-medium text-stone-900 dark:text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-amber-500" />
                        Bespoke Sovereign Reservation
                      </h3>
                      <p className="text-xs text-stone-500 mt-1 font-sans">
                        Reserve elite pilots, gold-certified trackers, and customized safari cruisers.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-stone-550 dark:text-stone-400 uppercase tracking-wider block">Full Name *</label>
                        <input
                          id="input-fullname"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Lord Charles Althorp"
                          className="w-full bg-stone-50 dark:bg-stone-950/40 border border-stone-250 dark:border-stone-800 rounded-xl p-3 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:border-amber-450 dark:focus:border-amber-400 font-sans"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-stone-550 dark:text-stone-400 uppercase tracking-wider block">Email Address *</label>
                        <input
                          id="input-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="charles@althorpmarine.com"
                          className="w-full bg-stone-50 dark:bg-stone-950/40 border border-stone-250 dark:border-stone-800 rounded-xl p-3 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:border-amber-450 dark:focus:border-amber-400 font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-stone-550 dark:text-stone-400 uppercase tracking-wider block">Chauffeur Contact Phone *</label>
                        <input
                          id="input-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+44 7700 900077"
                          className="w-full bg-stone-50 dark:bg-stone-950/40 border border-stone-250 dark:border-stone-800 rounded-xl p-3 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:border-amber-450 dark:focus:border-amber-400 font-sans"
                        />
                      </div>

                      {/* Date */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-stone-550 dark:text-stone-400 uppercase tracking-wider block">Target Landing Date *</label>
                        <input
                          id="input-startdate"
                          type="date"
                          required
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full bg-stone-50 dark:bg-stone-950/40 border border-stone-250 dark:border-stone-800 rounded-xl p-3 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:border-amber-450 dark:focus:border-amber-400 font-sans h-[46px]"
                        />
                      </div>
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Selected Safari Blueprint */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-stone-550 dark:text-stone-400 uppercase tracking-wider block">Selected Safari blueprint *</label>
                        <input
                          id="input-program"
                          type="text"
                          required
                          value={program}
                          onChange={(e) => setProgram(e.target.value)}
                          placeholder="e.g. Sovereign Crown of East Africa"
                          className="w-full bg-stone-50 dark:bg-stone-950/40 border border-stone-250 dark:border-stone-800 rounded-xl p-3 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:border-amber-450 dark:focus:border-amber-400 font-sans h-[46px]"
                        />
                      </div>

                      {/* Guests */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-stone-550 dark:text-stone-400 uppercase tracking-wider block">Size of your private cohort</label>
                        <select
                          id="select-cohort"
                          value={guests}
                          onChange={(e) => setGuests(parseInt(e.target.value))}
                          className="w-full bg-stone-50 dark:bg-stone-950/40 border border-stone-250 dark:border-stone-800 rounded-xl p-3 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:border-amber-450 dark:focus:border-amber-400 font-sans h-[46px]"
                        >
                          <option value={1} className="bg-white dark:bg-stone-900 text-stone-850 dark:text-stone-200">Solo Explorer</option>
                          <option value={2} className="bg-white dark:bg-stone-900 text-stone-850 dark:text-stone-200">Couple (2 Guests)</option>
                          <option value={4} className="bg-white dark:bg-stone-900 text-stone-850 dark:text-stone-200">Family Cohort (4 Guests)</option>
                          <option value={6} className="bg-white dark:bg-stone-900 text-stone-850 dark:text-stone-200">Small Private Crew (6 Guests)</option>
                          <option value={8} className="bg-white dark:bg-stone-900 text-stone-850 dark:text-stone-200">Exclusive Charter (8+ Guests)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Mobility preferences */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-stone-550 dark:text-stone-400 uppercase tracking-wider block">Mobility Preferences</label>
                        <select
                          id="select-mobility"
                          value={mobilityOption}
                          onChange={(e) => setMobilityOption(e.target.value)}
                          className="w-full bg-stone-50 dark:bg-stone-950/40 border border-stone-250 dark:border-stone-800 rounded-xl p-3 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:border-amber-450 dark:focus:border-amber-400 font-sans h-[46px]"
                        >
                          <option value="with-intl-flights" className="bg-white dark:bg-stone-900 text-stone-850 dark:text-stone-200">Source Private Aviation</option>
                          <option value="ground-only" className="bg-white dark:bg-stone-900 text-stone-850 dark:text-stone-200">Local Air hops Only</option>
                          <option value="driving" className="bg-white dark:bg-stone-900 text-stone-850 dark:text-stone-200">Driving (Overland Cruiser)</option>
                          <option value="other" className="bg-white dark:bg-stone-900 text-stone-850 dark:text-stone-200">Other Custom Preference</option>
                        </select>

                        {mobilityOption === 'other' && (
                          <input
                            id="input-other-mobility"
                            type="text"
                            required
                            value={otherMobility}
                            onChange={(e) => setOtherMobility(e.target.value)}
                            placeholder="Type your mobility preferences..."
                            className="w-full mt-2 bg-stone-50 dark:bg-stone-950/40 border border-stone-250 dark:border-stone-800 rounded-xl p-3 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:border-amber-450 dark:focus:border-amber-400 font-sans"
                          />
                        )}
                      </div>

                      {/* Dietary Accommodations */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-stone-550 dark:text-stone-400 uppercase tracking-wider block">Dietary & Health specs</label>
                        <input
                          id="input-dietary"
                          type="text"
                          value={dietary}
                          onChange={(e) => setDietary(e.target.value)}
                          placeholder="e.g. Vegetarian, Gluten-Free, Organic herbs only"
                          className="w-full bg-stone-50 dark:bg-stone-950/40 border border-stone-250 dark:border-stone-800 rounded-xl p-3 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:border-amber-450 dark:focus:border-amber-400 font-sans h-[46px]"
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-stone-550 dark:text-stone-400 uppercase tracking-wider block">Additional Expedition Requests</label>
                      <textarea
                        id="input-notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Provide any specific details (e.g., anniversary celebration details, visual wildlife species target list, luggage excess arrangements)."
                        rows={4}
                        className="w-full bg-stone-50 dark:bg-stone-950/40 border border-stone-250 dark:border-stone-800 rounded-xl p-3.5 text-stone-800 dark:text-stone-200 text-sm focus:outline-none focus:border-amber-450 dark:focus:border-amber-400 leading-relaxed font-sans placeholder-stone-400 dark:placeholder-stone-600 focus:ring-1 focus:ring-amber-500/10"
                      />
                    </div>

                    <button
                      id="submit-reservation-btn"
                      type="submit"
                      className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-sans font-medium text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/5 transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-stone-950 animate-pulse" />
                      <span>Submit Custom Secure Reservation</span>
                      <ChevronRight className="w-4 h-4 translate-y-0.5" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="booking-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-emerald-400" />
                    </div>

                    <div className="p-5 bg-stone-50 dark:bg-stone-950 border border-stone-250 dark:border-stone-850 rounded-xl max-w-lg mx-auto space-y-4 text-center shadow-sm">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono text-amber-500 font-bold block tracking-wider">Operational Dispatch Queue</span>
                        <h4 className="text-xs font-semibold text-stone-800 dark:text-stone-200">How would you like to share this reservation with our directors?</h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {/* Option 1: Corporate Email */}
                        <a
                          id="transmit-email-success-btn"
                          href={getMailtoLink()}
                          className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-500/30 bg-white dark:bg-stone-900 text-left transition-all hover:shadow-sm flex flex-col justify-between group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600 dark:text-amber-400">
                              <Mail className="w-4 h-4" />
                            </div>
                            <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest font-bold">Standard</span>
                          </div>
                          <div className="mt-4">
                            <h5 className="text-xs font-semibold text-stone-800 dark:text-stone-200 group-hover:text-amber-500 transition-colors">Via Corporate Email</h5>
                            <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1 font-sans">Draft structured inbound email to both operations & support lines.</p>
                          </div>
                        </a>

                        {/* Option 2: WhatsApp Chat */}
                        <a
                          id="transmit-whatsapp-success-btn"
                          href={getWhatsappLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-emerald-500/30 bg-white dark:bg-stone-900 text-left transition-all hover:shadow-sm flex flex-col justify-between group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600 dark:text-emerald-400">
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12.012 2C6.5 2 2.012 6.5 2.012 12c0 2.1.65 4.1 1.75 5.85L2 22l4.35-1.15c1.7.9 3.65 1.4 5.65 1.4 5.5 0 10-4.5 10-10S17.512 2 12.012 2zm0 1.65c4.6 0 8.35 3.75 8.35 8.35s-3.75 8.35-8.35 8.35c-2 0-3.8-.7-5.25-1.9l-.4-.25-2.55.65.7-2.5-.25-.4c-1.3-1.4-2-3.2-2-5.1 0-4.6 3.75-8.35 8.35-8.35zm-3.6 3.6c-.2 0-.4 0-.6.1-.2.1-.4.3-.5.4-.1.1-.3.3-.4.6-.2.4-.3.9-.1 1.4.1.3.3.6.5.9.6.8 1.4 1.5 2.2 2.1.6.4 1.2.8 1.9 1 .4.1.8.2 1.2.1.4-.1.8-.3 1-.6.2-.3.3-.6.3-.9l-.1-.4-.4-.2c-.2-.1-.9-.4-1-.5-.1-.1-.3-.1-.4 0-.1.1-.3.4-.4.5-.1.1-.2.2-.4.1-.2-.1-.7-.3-1.3-.9-.5-.4-.8-.9-.9-1.1-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.4l.2-.3c.1-.1.1-.3 0-.4L10.3 8c-.1-.2-.3-.2-.5-.2zm0 0" />
                              </svg>
                            </div>
                            <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest font-bold">Priority</span>
                          </div>
                          <div className="mt-4">
                            <h5 className="text-xs font-semibold text-stone-800 dark:text-stone-200 group-hover:text-emerald-500 transition-colors">Via WhatsApp Dispatch</h5>
                            <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1 font-sans">Open high-priority instant chat link directly to our 24/7 Operations Desk.</p>
                          </div>
                        </a>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-center gap-4">
                      <button
                        id="switch-to-contacts-success"
                        onClick={() => {
                          setSubmittedSuccess(false);
                          setSubTab('contacts');
                        }}
                        className="px-5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs font-mono text-stone-600 dark:text-stone-300 transition-all cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-850"
                      >
                        View Concierge Desk
                      </button>
                      <button
                        id="btn-book-another"
                        onClick={() => {
                          setSubmittedSuccess(false);
                          setFullName('');
                          setEmail('');
                          setPhone('');
                          setStartDate('');
                          setDietary('');
                          setNotes('');
                        }}
                        className="px-5 py-2.5 rounded-lg border border-stone-250 dark:border-stone-850 bg-stone-100 dark:bg-stone-950 text-xs font-mono text-stone-600 dark:text-stone-300 transition-all cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-900"
                      >
                        Draft Another Reservation
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Info Sidebar Panel: Column 5 */}
            <div className="lg:col-span-5 space-y-6">
              {/* Trust Wrapper */}
              <div className="p-6 bg-stone-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-850 rounded-2xl text-left space-y-5 shadow-sm dark:shadow-none">
                <h4 className="font-sans font-semibold text-amber-600 dark:text-amber-400 text-sm uppercase tracking-wider">
                  Booking Guarantees
                </h4>
                
                <div className="space-y-4 text-xs font-sans text-stone-600 dark:text-stone-400 font-light">
                  <div className="flex gap-3 leading-relaxed">
                    <span className="text-lg text-amber-500">✦</span>
                    <p>
                      <strong className="text-stone-900 dark:text-stone-200 font-semibold font-sans block mb-0.5">Sovereign 100% Refund Protect</strong>
                      Cancel due to travel corridor atmospheric locks up to 30 days prior for an absolute voucher or cash repayment.
                    </p>
                  </div>
                  <div className="flex gap-3 leading-relaxed border-t border-stone-200 dark:border-stone-850 pt-3">
                    <span className="text-lg text-amber-500">✦</span>
                    <p>
                      <strong className="text-stone-900 dark:text-stone-200 font-semibold font-sans block mb-0.5">Private Guide Exclusivity</strong>
                      We guarantee private visual cruises. You will never share your cruiser with travelers outside your party.
                    </p>
                  </div>
                  <div className="flex gap-3 leading-relaxed border-t border-stone-200 dark:border-stone-850 pt-3">
                    <span className="text-lg text-amber-500">✦</span>
                    <p>
                      <strong className="text-stone-900 dark:text-stone-200 font-semibold font-sans block mb-0.5">Pristine Conservation Match</strong>
                      Every single booking facilitates funding for school uniforms or tracking devices inside African ranges.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submitted requests local history tab */}
              {submittedRequests.length > 0 && (
                <div className="p-6 bg-stone-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-850 rounded-2xl text-left space-y-4 shadow-sm dark:shadow-none">
                  <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-850 pb-2.5">
                    <span className="text-xs font-mono text-stone-600 dark:text-stone-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                      <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                      Your Reservation Logs ({submittedRequests.length})
                    </span>
                    <button
                      id="clear-logs-btn"
                      onClick={handleClearHistory}
                      className="text-[10px] font-mono hover:text-red-600 dark:hover:text-red-400 text-stone-500 dark:text-stone-400 uppercase cursor-pointer"
                    >
                      Clear Logs
                    </button>
                  </div>

                  <div className="max-h-56 overflow-y-auto space-y-3.5 pr-1">
                    {submittedRequests.map((req) => (
                      <div key={req.id} className="p-3 bg-white dark:bg-stone-950/60 rounded-xl border border-stone-200 dark:border-stone-850 space-y-2 text-xs font-sans font-light shadow-sm dark:shadow-none">
                        <div className="flex items-center justify-between text-stone-600 dark:text-stone-300">
                          <span className="font-semibold text-stone-900 dark:text-stone-100">{req.fullName}</span>
                          <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-medium">{req.startDate}</span>
                        </div>
                        <div className="text-stone-600 dark:text-stone-400 text-[11px]">
                          <span>Journey: <strong className="text-stone-800 dark:text-stone-300">{req.program}</strong></span>
                        </div>
                        <div className="text-stone-500 dark:text-stone-500 text-[10px] flex items-center justify-between">
                          <span>Submitted: {req.submittedAt}</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">Pending Review</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
