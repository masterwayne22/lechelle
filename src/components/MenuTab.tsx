import { motion } from 'motion/react';
import { Star, Flame, Award, ArrowRight } from 'lucide-react';
import { MenuItem, ViewTab } from '../types';
import { MENU_ITEMS } from '../data/menu';

interface MenuTabProps {
  onAddToSelection: (item: MenuItem) => void;
  setActiveTab: (tab: ViewTab) => void;
}

export default function MenuTab({ onAddToSelection, setActiveTab }: MenuTabProps) {
  // Filter items by category
  const chefsSpecials = MENU_ITEMS.filter(item => item.category === 'chef-specials');
  const italianItems = MENU_ITEMS.filter(item => item.category === 'italian');
  const frenchItems = MENU_ITEMS.filter(item => item.category === 'french' && item.id !== 'fren-4');
  const butchersSelection = MENU_ITEMS.find(item => item.id === 'fren-4') || MENU_ITEMS[5];
  const continentalItems = MENU_ITEMS.filter(item => item.category === 'continental');

  return (
    <div className="pt-24 pb-16 bg-[#050505] text-[#f9f9f9] overflow-hidden relative z-10">
      
      {/* Hero Header */}
      <section className="text-center py-12 px-6 relative">
        <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-indigo-450 uppercase block mb-3">
          Gastronomy Redefined
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold italic tracking-tight text-white mb-4">
          The Seasonal Menu
        </h1>
        <div className="w-16 h-[2px] bg-gradient-to-r from-indigo-500 to-emerald-400 mx-auto mt-6"></div>
      </section>

      {/* 1. Chef's Specials */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="flex items-center space-x-2.5 mb-8">
          <Star className="w-4 h-4 text-emerald-400 fill-emerald-400/30" />
          <h2 className="text-xs font-semibold tracking-[0.15em] text-indigo-400 uppercase">
            Chef&apos;s Specials
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Special (Osso Buco) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 relative group overflow-hidden border border-white/5 rounded-2xl bg-[#0c0c0e]/60 backdrop-blur-md flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={chefsSpecials[0].image}
                alt={chefsSpecials[0].name}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent"></div>
              
              {/* Floating "Signature" badge */}
              <span className="absolute top-4 left-4 bg-indigo-600 text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
                Signature
              </span>
            </div>
            
            <div className="p-6 md:p-8 pt-4">
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {chefsSpecials[0].name}
                </h3>
                <span className="text-lg font-mono text-emerald-400 ml-4 font-semibold">${chefsSpecials[0].price}</span>
              </div>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-2xl mb-6">
                {chefsSpecials[0].description}
              </p>
              
              <button 
                onClick={() => onAddToSelection(chefsSpecials[0])}
                className="text-xs font-semibold tracking-[0.1em] text-indigo-400 hover:text-indigo-300 flex items-center gap-2 group/btn cursor-pointer"
              >
                ADD TO SELECTION 
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Side Specials (Scallops & Dessert) */}
          <div className="flex flex-col space-y-8">
            {chefsSpecials.slice(1).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group flex flex-col justify-between p-4 border border-white/5 rounded-2xl bg-[#0c0c0e]/30 hover:bg-[#0c0c0e]/70 transition-all backdrop-blur-sm"
              >
                <div className="flex space-x-4 mb-4">
                  <div className="w-24 h-24 shrink-0 overflow-hidden relative border border-white/5 rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="text-sm font-semibold font-mono text-emerald-400">${item.price}</span>
                  <button
                    onClick={() => onAddToSelection(item)}
                    className="text-[10px] font-bold tracking-[0.15em] text-zinc-400 hover:text-indigo-400 cursor-pointer"
                  >
                    ADD SELECTION
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. Italian Section */}
      <section className="bg-[#0c0c0e]/40 py-24 border-y border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-baseline mb-16">
            <div className="lg:col-span-1">
              <span className="text-[10px] tracking-[0.2em] font-semibold text-indigo-400 uppercase font-mono">
                Cucina D&apos;Autore
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-white font-semibold mt-2">
                Italian
              </h2>
            </div>
            <div className="lg:col-span-2">
              <p className="text-sm text-zinc-400 leading-relaxed font-sans max-w-xl">
                A tribute to regional heritage, reimagined through contemporary techniques and the finest Mediterranean imports.
              </p>
              <span className="block text-[11px] italic text-zinc-550 font-serif mt-2">
                Est. 1924
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {italianItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col sm:flex-row items-stretch justify-between p-5 border border-white/5 bg-[#0c0c0e]/30 backdrop-blur-sm rounded-2xl hover:border-indigo-505/30 transition-all gap-5"
              >
                {/* Text Side */}
                <div className="flex-1 flex flex-col justify-between order-2 sm:order-1">
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-lg font-serif font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-sm font-mono font-semibold text-emerald-400 block ml-3">${item.price}</span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-4 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Decorative Tags & Action */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                    <div className="flex space-x-2">
                      {item.tags?.map(t => (
                        <span key={t} className="text-[8px] font-mono font-bold tracking-widest text-[#a1a1aa] uppercase bg-white/[0.03] px-2 py-0.5 rounded-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => onAddToSelection(item)}
                      className="text-[10px] font-bold tracking-[0.15em] text-indigo-400 hover:text-white cursor-pointer"
                    >
                      + ADD SELECTION
                    </button>
                  </div>
                </div>

                {/* Picture Side */}
                <div className="w-full sm:w-28 h-36 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-white/5 order-1 sm:order-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. French Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Classic French Menu List (Left: 7-cols) */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <span className="text-[10px] tracking-[0.2em] font-semibold text-indigo-400 uppercase font-mono">
                L&apos;Art De Vivre
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-white font-semibold mt-2 mb-8">
                French
              </h2>
            </div>

            <div className="space-y-8">
              {frenchItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="group flex flex-col sm:flex-row items-stretch justify-between p-5 border border-white/5 bg-[#0c0c0e]/30 backdrop-blur-sm rounded-2xl hover:border-indigo-500/30 transition-all gap-5"
                >
                  <div className="flex-1 flex flex-col justify-between order-2 sm:order-1">
                    <div>
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-base md:text-lg font-serif font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-sm font-mono font-semibold text-emerald-400 shrink-0 ml-3">${item.price}</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5">
                      <span className="text-[9px] font-mono text-zinc-550 tracking-wider">
                        {item.tags?.join(' • ')}
                      </span>
                      <button
                        onClick={() => onAddToSelection(item)}
                        className="text-[10px] font-bold tracking-[0.15em] text-indigo-450 hover:text-white cursor-pointer"
                      >
                        + ADD SELECTION
                      </button>
                    </div>
                  </div>

                  <div className="w-full sm:w-28 h-36 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-white/5 order-1 sm:order-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dynamic "The Butcher's Selection" Card (Right: 5-cols) */}
          <div className="lg:col-span-5 relative group overflow-hidden border border-white/5 rounded-2xl bg-[#0c0c0e]/60 backdrop-blur-md">
            <div className="aspect-[4/5] overflow-hidden relative">
              <img
                src={butchersSelection.image}
                alt={butchersSelection.name}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/20 to-transparent"></div>
              
              {/* Gold Box Highlight -> Indigo Gradient */}
              <div className="absolute bottom-0 left-0 right-0 bg-indigo-950/90 backdrop-blur-sm text-white p-6 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 border-t border-white/10">
                <span className="text-[9px] tracking-[0.25em] font-bold uppercase block mb-1 text-emerald-300">
                  Direct From Lyon
                </span>
                <span className="text-base font-serif font-semibold block">
                  The Butcher&apos;s Selection
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-lg font-serif font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {butchersSelection.name}
                </h3>
                <span className="text-base font-mono text-emerald-400 font-semibold">${butchersSelection.price}</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                {butchersSelection.description}
              </p>
              <button
                onClick={() => onAddToSelection(butchersSelection)}
                className="w-full text-center text-[10px] font-semibold text-white hover:text-white py-2 border border-white/10 hover:border-indigo-500 bg-indigo-600/35 hover:bg-indigo-600 transition-all rounded-lg cursor-pointer"
              >
                SELECT THIS CUT
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Continental Section */}
      <section className="bg-[#050505] py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          
          <div className="mb-16">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-indigo-400 uppercase font-mono">
              The European Crossing
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-white font-semibold mt-2">
              Continental
            </h2>
            <div className="w-12 h-[2px] bg-gradient-to-r from-indigo-500 to-emerald-400 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {continentalItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group flex flex-col justify-between overflow-hidden border border-white/5 rounded-2xl bg-[#0c0c0e]/40 backdrop-blur-md hover:border-indigo-500/40 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Food Image */}
                <div className="relative aspect-[4/3] overflow-hidden border-b border-white/5">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  
                  {/* Flat Blur Price tag */}
                  <div className="absolute bottom-3 right-3 bg-[#0c0c0e]/85 backdrop-blur-md border border-white/10 py-1.5 px-3 rounded-md">
                    <span className="text-xs font-mono font-semibold text-emerald-400">${item.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-base md:text-lg font-serif font-bold text-white group-hover:text-indigo-400 transition-colors mb-2 text-left">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed text-left line-clamp-3 mb-6">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => onAddToSelection(item)}
                    className="w-full text-center text-[10px] font-semibold text-white hover:text-white bg-indigo-650/40 hover:bg-indigo-600 border border-white/5 hover:border-indigo-500 py-3 rounded-lg tracking-[0.1em] uppercase transition-all cursor-pointer"
                  >
                    Add to Selection
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Elegant Bottom Call to Action */}
      <section className="bg-[#050505] py-24 border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <span className="text-[10px] tracking-[0.3em] font-semibold text-indigo-400 uppercase font-mono block">
            Secure Your Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
            Secure Your Experience
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto">
            We invite you to experience the art of the table. Reservations are highly recommended for evening service.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('reservations')}
              className="w-full sm:w-auto text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.03] duration-200 px-10 py-4 rounded-lg tracking-[0.12em] uppercase transition-all cursor-pointer shadow-lg shadow-indigo-600/15"
            >
              BOOK NOW
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className="w-full sm:w-auto text-xs font-semibold text-zinc-350 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20 px-10 py-4 rounded-lg tracking-[0.12em] uppercase transition-all cursor-pointer"
            >
              OUR LEGACY STORY
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
