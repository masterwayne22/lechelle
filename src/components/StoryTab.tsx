import { motion } from 'motion/react';
import { Award, ShieldCheck, GlassWater, Landmark } from 'lucide-react';

export default function StoryTab() {
  const storyKeypoints = [
    {
      year: '1924',
      title: 'Our Genesis in Lyon',
      desc: 'Founded by chef Émile L\'Échelle, starting as a small brick eatery on the banks of the Rhône dedicated to pure Provencal flavors.',
      icon: Landmark
    },
    {
      year: '1958',
      title: 'The Golden Stars',
      desc: 'Awarded our initial Michelin accolades, cementing our reputation for French culinary mastery and revolutionary sauces.',
      icon: Award
    },
    {
      year: '1992',
      title: 'A Global Renaissance',
      desc: 'Expanding our gastronomy to synthesize classic Italian techniques and organic Continental sourcing standardizations.',
      icon: ShieldCheck
    },
    {
      year: 'Today',
      title: 'The Art of the Table',
      desc: 'An immersive fine-dining experience celebrating heritage, meticulous sensory curation, and quiet, persistent luxury.',
      icon: GlassWater
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-[#050505] text-[#f9f9f9] relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <section className="text-center py-10">
          <span className="text-[10px] md:text-sm font-semibold tracking-[0.3em] text-indigo-400 uppercase block mb-3 font-semibold">
            Since Est. 1924
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold italic tracking-tight text-white mb-4">
            Our Story &amp; Philosophy
          </h1>
          <div className="w-16 h-[2px] bg-gradient-to-r from-indigo-500 to-emerald-400 mx-auto mt-6 font-semibold"></div>
        </section>

        {/* Narrative / Image spread (Row 1) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 border-b border-white/5">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] tracking-[0.2em] font-semibold text-indigo-400 uppercase font-mono block">
              The Pursuit of Gastronomy
            </span>
            <h2 className="text-2xl md:text-4xl font-serif text-white tracking-tight leading-snug">
              A relentless ascent towards culinary perfection.
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-sans">
              The name <span className="italic font-serif text-indigo-400">L&apos;Échelle</span> (&ldquo;The Ladder&rdquo;) represents our founding philosophy: a systematic, step-by-step climb toward absolute flavor purity. Every dish is a canvas; every ingredient is curated based on hyper-local seasonal availability.
            </p>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-sans opacity-80">
              We work in direct collaboration with organic lavender micro-farms in Provence, seafood trawlers in Brittany, and white truffle foragers in Alba to bring uncompromised heritage ingredients directly to your tabletop.
            </p>
          </div>

          <div className="lg:col-span-6 relative group overflow-hidden border border-white/5 rounded-2xl bg-[#0c0c0e]">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=80"
                alt="Executive Chef Crafting Platings"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
              />
            </div>
          </div>

        </section>

        {/* Pride Figures Statistics Grid (Metrics) */}
        <section className="py-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/5 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-serif text-indigo-400 font-bold">102+</div>
            <div className="text-[9px] font-mono tracking-widest text-zinc-550 uppercase mt-2">Years of Heritage</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-serif text-indigo-400 font-bold">3</div>
            <div className="text-[9px] font-mono tracking-widest text-zinc-550 uppercase mt-2">Michelin Stars</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-serif text-indigo-400 font-bold">45,000+</div>
            <div className="text-[9px] font-mono tracking-widest text-zinc-550 uppercase mt-2">Reserve Cellar</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-serif text-indigo-400 font-bold">100%</div>
            <div className="text-[9px] font-mono tracking-widest text-zinc-550 uppercase mt-2">Organic Sourced</div>
          </div>
        </section>

        {/* Elegant Timeline Rows */}
        <section className="py-16">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.2em] font-semibold text-indigo-400 uppercase font-mono">Our Journey</span>
            <h2 className="text-2xl md:text-3xl font-serif text-white tracking-tight mt-1">Timeline of Milestones</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {storyKeypoints.map((pt, idx) => {
              const IconComp = pt.icon;
              return (
                <motion.div
                  key={pt.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="p-6 border border-white/5 bg-[#0c0c0e]/40 backdrop-blur-md rounded-2xl relative group hover:border-[#818cf8]/30 transition-all flex space-x-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#050505] border border-white/10 group-hover:border-indigo-400/50 transition-colors flex items-center justify-center shrink-0">
                    <IconComp className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-baseline space-x-2">
                      <span className="font-mono text-xs font-bold text-indigo-400">{pt.year}</span>
                      <span className="w-1.5 h-[1px] bg-indigo-500/50"></span>
                      <h3 className="text-sm font-serif font-bold text-white">{pt.title}</h3>
                    </div>
                    <p className="text-[11px] text-zinc-450 leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Master Signature Plate Quote */}
        <section className="bg-[#0c0c0e]/50 border border-white/5 backdrop-blur-md rounded-2xl py-16 px-6 text-center max-w-4xl mx-auto mt-12 mb-16 space-y-4 relative">
          <span className="w-2 h-2 bg-indigo-500 rounded-full mx-auto block mb-2 animate-ping"></span>
          <p className="text-lg md:text-xl font-serif italic text-white max-w-2xl mx-auto leading-relaxed">
            &ldquo;Gastronomy is not simply about raw feeding; it is the absolute convergence of memory, architectural detail, and sensory romance.&rdquo;
          </p>
          <div className="pt-4">
            <span className="block text-xs font-semibold tracking-[0.2em] text-indigo-400 uppercase">
              Monsieur Émile L&apos;Échelle
            </span>
            <span className="block text-[10px] text-zinc-500 font-mono tracking-wider mt-1">
              FOUNDING EXECUTIVE CHEF • EST. 1924, LYON
            </span>
          </div>
        </section>

      </div>
    </div>
  );
}
