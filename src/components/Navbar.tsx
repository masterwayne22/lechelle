import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { ViewTab } from '../types';

interface NavbarProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  cartCount: number;
}

export default function Navbar({ activeTab, setActiveTab, cartCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'The Menu', value: 'menu' as ViewTab },
    { label: 'Reservations', value: 'reservations' as ViewTab },
    { label: 'Online Ordering', value: 'ordering' as ViewTab },
    { label: 'Our Story', value: 'story' as ViewTab },
  ];

  const handleNavClick = (tabId: ViewTab) => {
    setActiveTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('menu')}
          className="text-2xl font-serif font-bold tracking-[0.12em] text-[#f9f9f9] hover:text-indigo-400 transition-colors cursor-pointer"
        >
          L&apos;ÉCHELLE
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className={`text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 relative py-1 cursor-pointer ${
                activeTab === item.value
                  ? 'text-indigo-400'
                  : 'text-zinc-400 hover:text-[#f9f9f9]'
              }`}
            >
              {item.label}
              {activeTab === item.value && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-indigo-500 to-emerald-400 transition-transform duration-300" />
              )}
            </button>
          ))}
        </div>

        {/* Desktop CTA / Cart Badge */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Cart Indicator */}
          <button
            onClick={() => handleNavClick('ordering')}
            className="relative p-2 text-zinc-400 hover:text-indigo-400 transition-colors cursor-pointer"
            aria-label="View Order Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('reservations')}
            className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 rounded-lg tracking-[0.1em] uppercase transition-all duration-300 cursor-pointer shadow-lg shadow-indigo-600/15 hover:scale-[1.03]"
          >
            Book A Table
          </button>
        </div>

        {/* Mobile Hamburger / Cart Toggle button */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={() => handleNavClick('ordering')}
            className="relative p-2 text-zinc-400 hover:text-indigo-400"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#f9f9f9] hover:text-indigo-400 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[60px] bg-[#050505]/95 backdrop-blur-lg z-40 flex flex-col justify-between p-8 md:hidden border-t border-white/5 overflow-y-auto">
          <div className="flex flex-col space-y-8 pt-6">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`text-lg font-serif tracking-[0.1em] text-left border-b border-white/5 pb-3 block ${
                  activeTab === item.value ? 'text-indigo-400' : 'text-[#f9f9f9]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-8 pb-12 flex flex-col space-y-4">
            <button
              onClick={() => handleNavClick('reservations')}
              className="w-full text-center text-sm font-semibold text-white bg-indigo-600 py-4 rounded-lg tracking-[0.1em] uppercase shadow-lg shadow-indigo-500/10"
            >
              Book A Table
            </button>
            <div className="text-center text-[10px] text-zinc-500 font-mono tracking-wider pt-4">
              L&apos;ÉCHELLE • EST. 1924 • LYON &amp; GASTROME
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
