import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Users, Phone, FileText, User, Sparkles, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { ReservationDetails } from '../types';

export default function ReservationsTab() {
  const [formData, setFormData] = useState<ReservationDetails>({
    date: '2026-05-21',
    time: '19:30',
    guests: 2,
    phone: '',
    name: '',
    specialRequests: '',
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showWineCellar, setShowWineCellar] = useState(false);

  const timeslots = [
    '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) || 2 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage('Please provide a name for the reservation holding.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please provide a secure contact phone number.');
      return;
    }

    setErrorMessage('');
    // Generate a beautiful, authentic French luxury reservation code
    const uniqueRef = `LECHELLE-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(uniqueRef);
    setBookingSuccess(true);
  };

  const resetForm = () => {
    setFormData({
      date: '2026-05-21',
      time: '19:30',
      guests: 2,
      phone: '',
      name: '',
      specialRequests: '',
    });
    setBookingSuccess(false);
  };

  return (
    <div className="pt-24 pb-16 bg-[#050505] text-[#f9f9f9] relative z-10">
      
      {/* Header */}
      <section className="text-center py-10 px-6">
        <span className="text-[10px] md:text-sm font-semibold tracking-[0.3em] text-indigo-400 uppercase block mb-3">
          Secure Your Experience
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-white mb-4">
          Tables for the Discerning
        </h1>
        <div className="w-16 h-[2px] bg-gradient-to-r from-indigo-500 to-emerald-400 mx-auto mt-6"></div>
      </section>

      {/* Main Grid split */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4 mb-24">
        
        {/* Reservation Form (7-cols) */}
        <div className="lg:col-span-7 bg-[#0c0c0e]/60 backdrop-blur-md border border-white/5 p-6 md:p-10 rounded-2xl">
          <h2 className="text-lg font-serif font-semibold text-white tracking-wide border-b border-white/5 pb-4 mb-6">
            Reservations Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="text-[10px] font-bold tracking-[0.15em] text-zinc-400 uppercase block mb-2">
                Reservation Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Monsieur Julien Durand"
                  className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 focus:border-indigo-500 focus:bg-white/[0.05] rounded-lg py-3 pl-10 pr-4 text-sm text-[#f9f9f9] focus:outline-none transition-all placeholder:text-zinc-650 font-sans"
                />
              </div>
            </div>

            {/* Date and Time Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="text-[10px] font-bold tracking-[0.15em] text-zinc-400 uppercase block mb-2">
                  Preferred Date
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min="2026-05-20"
                    className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 focus:border-indigo-500 focus:bg-white/[0.05] rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="time" className="text-[10px] font-bold tracking-[0.15em] text-zinc-400 uppercase block mb-2">
                  Seating Time
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                    <Clock className="w-4 h-4" />
                  </span>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 focus:border-indigo-500 focus:bg-white/[0.05] rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-all font-sans appearance-none"
                  >
                    {timeslots.map(t => (
                      <option key={t} value={t} className="bg-[#0c0c0e] text-white">{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Guests and Phone Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="guests" className="text-[10px] font-bold tracking-[0.15em] text-zinc-400 uppercase block mb-2">
                  Number of Guests
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                    <Users className="w-4 h-4" />
                  </span>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 focus:border-indigo-500 focus:bg-white/[0.05] rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-all font-sans appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(g => (
                      <option key={g} value={g} className="bg-[#0c0c0e] text-white">
                        {g} {g === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="text-[10px] font-bold tracking-[0.15em] text-zinc-400 uppercase block mb-2">
                  Contact Phone
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 focus:border-indigo-500 focus:bg-white/[0.05] rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-all placeholder:text-zinc-650 font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Special Request Area */}
            <div>
              <label htmlFor="specialRequests" className="text-[10px] font-bold tracking-[0.15em] text-zinc-400 uppercase block mb-2">
                Special Requests
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-zinc-500">
                  <FileText className="w-4 h-4" />
                </span>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Dietary requirements, anniversaries, or seating preferences..."
                  className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 focus:border-indigo-500 focus:bg-white/[0.05] rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none transition-all placeholder:text-zinc-650 font-sans resize-none"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-950/40 border border-red-900/30 text-red-300 text-xs rounded-lg p-3 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 text-xs tracking-[0.15em] uppercase rounded-lg transition-all duration-300 transform hover:scale-[1.01] cursor-pointer shadow-lg shadow-indigo-600/15"
            >
              CONFIRM AVAILABILITY
            </button>

          </form>
        </div>

        {/* Info & Atmosphere Side Display (5-cols) */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          
          {/* Dinner atmosphere photo banner */}
          <div className="group overflow-hidden border border-white/5 rounded-2xl bg-[#0c0c0e]/60 max-h-[220px]">
            <img
              src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1000&auto=format&fit=crop&q=80"
              alt="L'Échelle Grand Dining Atmosphere"
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-48 object-cover transition-transform duration-[2000ms] group-hover:scale-108"
            />
          </div>

          {/* Guidelines */}
          <div className="space-y-6">
            
            {/* Dress code */}
            <div className="p-5 border border-white/5 bg-[#0c0c0e]/30 backdrop-blur-sm rounded-2xl">
              <div className="flex items-center space-x-3 mb-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <h3 className="text-xs font-bold tracking-[0.12em] text-[#f9f9f9] uppercase">
                  Dress Code
                </h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                To maintain the atmosphere of <span className="italic font-serif text-indigo-400">L&apos;Échelle Gastronomy</span>, we kindly request that guests adhere to an <strong className="font-semibold text-white">Elegant or Formal</strong> dress code. Men are encouraged to wear blazers; athletic wear, shorts, and flip-flops are strictly prohibited.
              </p>
            </div>

            {/* Booking Policy */}
            <div className="p-5 border border-white/5 bg-[#0c0c0e]/30 backdrop-blur-sm rounded-2xl">
              <div className="flex items-center space-x-3 mb-3">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                <h3 className="text-xs font-bold tracking-[0.12em] text-[#f9f9f9] uppercase">
                  Booking Policy
                </h3>
              </div>
              <ul className="space-y-3.5 text-xs text-zinc-400 leading-relaxed font-sans">
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-400 select-none text-xs leading-none">•</span>
                  <span>Tables are held for 15 minutes past the reservation session.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-400 select-none text-xs leading-none">•</span>
                  <span>Cancellations/amendments within 24 hours incur a $50 per guest fee.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-indigo-400 select-none text-xs leading-none">•</span>
                  <span>For larger parties over 8 guests, kindly message our concierge desk directly at <a href="mailto:concierge@lechelle.com" className="text-indigo-400 hover:underline font-mono">concierge@lechelle.com</a>.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </section>

      {/* Wine Cellar Section Block */}
      <section className="bg-transparent border-t border-white/5 py-16 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <span className="text-[10px] tracking-[0.2em] font-semibold text-indigo-400 uppercase font-mono block">
            Experience the Extraordinary
          </span>
          <p className="text-sm font-serif italic text-zinc-350 leading-relaxed max-w-2xl mx-auto">
            &ldquo;Culinary excellence is not a destination, but a journey of the senses that begins with a single seat at our table.&rdquo;
          </p>
          <div className="pt-2">
            <button
              onClick={() => setShowWineCellar(true)}
              className="px-6 py-3 border border-white/10 text-emerald-450 hover:text-white hover:bg-emerald-600/30 hover:border-emerald-500 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer"
            >
              EXPLORE THE WINE CELLAR
            </button>
          </div>
        </div>
      </section>

      {/* Success Receipt Modal */}
      <AnimatePresence>
        {bookingSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050505]/95 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.9, y: 20 }}
               className="bg-[#0c0c0e] border border-white/10 max-w-md w-full rounded-2xl p-6 md:p-8 relative shadow-2xl text-center space-y-6 my-8"
            >
              
              {/* Receipt top decorative circles */}
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-400/30 animate-bounce">
                  <CheckCircle className="w-6 h-6 text-indigo-400" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.25em] text-indigo-455 font-mono uppercase block font-semibold">
                  Reservation Secured
                </span>
                <h3 className="text-2xl font-serif text-white">
                  Table Confirmed
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed px-4">
                  We look forward to welcoming you to L&apos;Échelle. A luxury receipt and dress code confirmation has been dispatched.
                </p>
              </div>

              {/* Receipt Table Details */}
              <div className="border border-white/5 bg-white/[0.01]/70 rounded-xl p-5 text-left text-xs font-sans space-y-3.5">
                <div className="flex justify-between items-center text-zinc-550 font-mono text-[9px] tracking-wider pb-2 border-b border-white/5">
                  <span>BOOKING REFERENCE</span>
                  <span className="text-indigo-400 font-bold font-sans text-sm">{bookingRef}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">Guest Name</span>
                  <span className="font-semibold text-white">{formData.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">Party Size</span>
                  <span className="font-semibold text-white">{formData.guests} Guests</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">Date &amp; Time</span>
                  <span className="font-semibold text-white">{formData.date} at {formData.time}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">Contact</span>
                  <span className="font-semibold font-mono text-white">{formData.phone}</span>
                </div>

                {formData.specialRequests && (
                  <div className="pt-2.5 border-t border-white/5 flex flex-col space-y-1">
                    <span className="text-zinc-500 text-[9px] uppercase tracking-wider font-mono">Special Directives</span>
                    <p className="italic text-zinc-400 leading-relaxed bg-white/[0.01] p-2 border border-white/5 rounded-lg">
                      &ldquo;{formData.specialRequests}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Dismiss controls */}
              <div className="space-y-3">
                <button
                  onClick={resetForm}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 text-xs tracking-[0.1em] uppercase rounded-lg transition-all duration-200 cursor-pointer shadow-lg shadow-indigo-600/15"
                >
                  DISMISS RECEIPT
                </button>
                <button
                  onClick={() => window.print()}
                  className="w-full bg-transparent text-zinc-350 hover:text-white border border-white/10 hover:border-white/25 font-semibold py-3 text-xs tracking-[0.1em] uppercase rounded-lg transition-all duration-200 cursor-pointer"
                >
                  PRINT RESERVATION CARD
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern custom Wine Cellar Menu Dialog to avoid window.alert */}
      <AnimatePresence>
        {showWineCellar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050505]/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="bg-[#0b0b0e] border border-white/10 max-w-lg w-full rounded-2xl p-6 md:p-8 relative shadow-2xl text-center space-y-6"
            >
              <div>
                <span className="text-[10px] tracking-[0.25em] text-emerald-400 font-mono uppercase font-semibold block mb-2">
                  La Grand Cave Privée
                </span>
                <h3 className="text-2xl font-serif text-white italic">
                  The Sommelier&apos;s Reserve
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mt-2 max-w-md mx-auto">
                  Our curated cellar contains exceptionally rare vintages sourced directly from the chateaux of France and Piedmont.
                </p>
              </div>

              <div className="space-y-3.5 text-left text-xs text-zinc-300">
                
                {/* Vintage item 1 */}
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02]/80 transition-colors flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-white">Château Lafite Rothschild</h4>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Pauillac, Bordeaux • Vintage 1996</p>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">$1,450</span>
                </div>

                {/* Vintage item 2 */}
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02]/80 transition-colors flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-white">Domaine de la Romanée-Conti</h4>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Vosne-Romanée, Grand Cru • Vintage 2012</p>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">$4,800</span>
                </div>

                {/* Vintage item 3 */}
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02]/80 transition-colors flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-white">Krug Clos d&apos;Ambonnay</h4>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Champagne, Brut • Vintage 2000</p>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">$2,100</span>
                </div>

              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowWineCellar(false)}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 text-xs tracking-[0.1em] uppercase rounded-lg transition-all cursor-pointer"
                >
                  CLOSE CELLAR DOOR
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
