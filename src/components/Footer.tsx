import { Globe, Share2, Mail } from 'lucide-react';
import { ViewTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ViewTab) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const handleNavClick = (tabId: ViewTab) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-[#050505] border-t border-white/5 py-16 px-6 md:px-12 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-8">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('menu')}
          className="text-2xl font-serif tracking-[0.2em] text-[#f9f9f9] hover:text-indigo-400 transition-colors cursor-pointer"
        >
          L&apos;ÉCHELLE
        </button>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs tracking-wider text-zinc-500">
          <a href="#privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
          <a href="#press" className="hover:text-indigo-400 transition-colors">Press Inquiries</a>
          <a href="#accessibility" className="hover:text-indigo-400 transition-colors">Accessibility</a>
        </div>

        {/* Copyright */}
        <p className="text-[11px] font-sans tracking-wide text-zinc-650 text-center uppercase tracking-[0.1em]">
          © {currentYear} L&apos;Échelle Gastronomy • Lyon &amp; Gastrome Labs
        </p>

        {/* Social / Action Utilities */}
        <div className="flex items-center space-x-6 text-zinc-600">
          <a href="#globe" className="hover:text-indigo-400 transition-all transform hover:scale-110" aria-label="Global Options">
            <Globe className="w-4 h-4" />
          </a>
          <button className="hover:text-indigo-400 transition-all transform hover:scale-110 cursor-pointer text-zinc-600 hover:scale-110" aria-label="Share App">
            <Share2 className="w-4 h-4" />
          </button>
          <a href="mailto:concierge@lechelle.com" className="hover:text-indigo-400 transition-all transform hover:scale-110" aria-label="Concierge Email">
            <Mail className="w-4 h-4" />
          </a>
        </div>

      </div>
    </footer>
  );
}
