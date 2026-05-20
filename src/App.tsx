import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, ShoppingBag, Sparkles } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MenuTab from './components/MenuTab';
import ReservationsTab from './components/ReservationsTab';
import OrderingTab from './components/OrderingTab';
import StoryTab from './components/StoryTab';
import { MenuItem, CartItem, ViewTab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('menu');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [alertToast, setAlertToast] = useState<{ show: boolean; text: string }>({ show: false, text: '' });

  // Monitor Scroll for Back-to-Top Button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddItem = (item: MenuItem) => {
    setCart(prev => {
      const exists = prev.find(i => i.menuItem.id === item.id);
      if (exists) {
        return prev.map(i => i.menuItem.id === item.id 
          ? { ...i, quantity: i.quantity + 1 } 
          : i
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });

    // Trigger sweet toast prompt
    setAlertToast({ show: true, text: `"${item.name}" added to selections.` });
    setTimeout(() => {
      setAlertToast(prev => (prev.text === `"${item.name}" added to selections.` ? { show: false, text: '' } : prev));
    }, 3000);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart(prev => prev.map(it => it.menuItem.id === itemId 
      ? { ...it, quantity: newQty } 
      : it
    ));
  };

  const handleRemoveItem = (itemId: string) => {
    setCart(prev => prev.filter(it => it.menuItem.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col font-sans selection:bg-[#6366f1] selection:text-white text-[#f9f9f9] antialiased relative overflow-hidden">
      
      {/* Dynamic Background Ambient Glowing Nodes */}
      <div className="glow-purple w-[700px] h-[700px] -top-96 -left-96 opacity-60"></div>
      <div className="glow-emerald w-[600px] h-[600px] top-[30%] -right-96 opacity-30"></div>
      <div className="glow-purple w-[800px] h-[800px] bottom-[-200px] left-[20%] opacity-40"></div>

      {/* Decorative top ambient bar - Indigo to Emerald */}
      <div className="h-[3px] bg-gradient-to-r from-[#6366f1] via-[#818cf8] to-[#34d399] w-full z-50 fixed top-0" />

      {/* Global Header Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} cartCount={cartCount} />

      {/* Primary Display switching area with beautiful animations */}
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {activeTab === 'menu' && (
              <MenuTab onAddToSelection={handleAddItem} setActiveTab={setActiveTab} />
            )}
            
            {activeTab === 'reservations' && (
              <ReservationsTab />
            )}
            
            {activeTab === 'ordering' && (
              <OrderingTab
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                onAddItem={handleAddItem}
              />
            )}
            
            {activeTab === 'story' && (
              <StoryTab />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Regulatory & Corporate Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Floating Micro-Notification Toast */}
      <AnimatePresence>
        {alertToast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50 bg-[#0c0c0e]/90 backdrop-blur-md border border-white/10 text-white font-sans text-xs py-3.5 px-5 rounded-xl shadow-2xl flex items-center space-x-3.5"
          >
            <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-400/30">
              <Sparkles className="w-3 h-3 text-indigo-400 animate-pulse" />
            </div>
            <span>{alertToast.text}</span>
            <button
              onClick={() => setActiveTab('ordering')}
              className="text-indigo-450 hover:text-indigo-300 font-bold tracking-wider uppercase text-[10px] pl-2 cursor-pointer border-l border-white/5"
            >
              Order Desk
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#0c0c0e]/80 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-indigo-400 hover:border-indigo-400/40 shadow-xl transition-all hover:scale-110 cursor-pointer"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
