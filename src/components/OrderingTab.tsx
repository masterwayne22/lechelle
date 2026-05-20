import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ShoppingCart, Plus, Minus, Trash2, Check, Clock, MapPin, ClipboardList, TrendingUp, DollarSign } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { MENU_ITEMS } from '../data/menu';

interface OrderingTabProps {
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onAddItem: (item: MenuItem) => void;
}

export default function OrderingTab({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddItem
}: OrderingTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'chef-specials' | 'italian' | 'french' | 'continental'>('all');
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');
  const [pickupTime, setPickupTime] = useState('19:45');
  const [orderProgressStep, setOrderProgressStep] = useState(1);

  const filteredItems = selectedCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(it => it.category === selectedCategory);

  // Cart Calculations
  const subtotal = cart.reduce((acc, cr) => acc + (cr.menuItem.price * cr.quantity), 0);
  const tax = Math.round(subtotal * 0.08 * 100) / 100; // 8% VAT
  const conciergeFee = subtotal > 0 ? 15 : 0; // Concierge Surcharge
  const grandTotal = Math.round((subtotal + tax + conciergeFee) * 100) / 100;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Create unique high-end order trace code
    const trace = `ORD-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getMinutes()}`;
    setOrderNumber(trace);
    setOrderSubmitted(true);
    setOrderProgressStep(1);

    // Dynamic Tracking Progress Simulator (extremely premium)
    const interval = setInterval(() => {
      setOrderProgressStep(prev => {
        if (prev >= 3) {
          clearInterval(interval);
          return 3;
        }
        return prev + 1;
      });
    }, 4500);
  };

  const categories = [
    { label: 'All Creations', value: 'all' as const },
    { label: "Chef's Specials", value: 'chef-specials' as const },
    { label: 'Italian', value: 'italian' as const },
    { label: 'French', value: 'french' as const },
    { label: 'Continental', value: 'continental' as const },
  ];

  return (
    <div className="pt-24 pb-16 bg-[#050505] text-[#f9f9f9] relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <section className="text-center py-8">
          <span className="text-[10px] md:text-sm font-semibold tracking-[0.3em] text-indigo-400 uppercase block mb-3">
            In-Suite &amp; Collection Ordering
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-white mb-4">
            Curated Gastronomy
          </h1>
          <div className="w-16 h-[2px] bg-gradient-to-r from-indigo-500 to-emerald-400 mx-auto mt-6"></div>
        </section>

        <AnimatePresence mode="wait">
          {!orderSubmitted ? (
            <motion.div 
              id="order-panel-layout"
              key="checkout-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10"
            >
              
              {/* Product Sourcing Grid (7-cols) */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Visual sub-category tabs */}
                <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-4">
                  {categories.map(cat => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`text-[10px] font-bold tracking-widest uppercase px-4 py-2 rounded-full border transition-all cursor-pointer ${
                        selectedCategory === cat.value
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/10'
                          : 'bg-transparent text-zinc-450 border-white/10 hover:border-zinc-400 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Items loop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredItems.map(item => {
                    const existingInCart = cart.find(ci => ci.menuItem.id === item.id);
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        className="group flex flex-col justify-between overflow-hidden border border-white/5 rounded-2xl bg-[#0c0c0e]/40 backdrop-blur-md hover:border-indigo-500/30 transition-all p-4"
                      >
                        <div>
                          <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-4 border border-white/5">
                            <img
                              src={item.image}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                            />
                            {item.signature && (
                              <span className="absolute top-2 left-2 bg-indigo-600 text-white text-[8px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                                Signature
                              </span>
                            )}
                          </div>

                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-serif font-bold text-white group-hover:text-indigo-400 transition-colors pr-2">
                              {item.name}
                            </h3>
                            <span className="text-xs font-mono font-semibold text-emerald-400 shrink-0">${item.price}</span>
                          </div>
                          
                          <p className="text-[11px] text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        {/* Interactive Add controls */}
                        <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                          {existingInCart ? (
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center space-x-2 bg-zinc-950/40 border border-white/10 p-1 rounded-lg">
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(item.id, existingInCart.quantity - 1)}
                                  className="p-1 hover:text-indigo-400 transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-mono px-2 text-white">{existingInCart.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(item.id, existingInCart.quantity + 1)}
                                  className="p-1 hover:text-indigo-400 transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              
                              <button
                                type="button"
                                onClick={() => onRemoveItem(item.id)}
                                className="text-red-400/80 hover:text-red-400 p-1 cursor-pointer"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => onAddItem(item)}
                              className="w-full text-center text-[10px] font-bold text-zinc-300 hover:text-white bg-white/[0.01] hover:bg-indigo-600 border border-white/5 hover:border-indigo-500 py-2 rounded-lg tracking-[0.1em] uppercase transition-all duration-300 cursor-pointer"
                            >
                              + Add to Order
                            </button>
                          )}
                        </div>

                      </motion.div>
                    );
                  })}
                </div>

              </div>

              {/* Selections Order Panel / Cart (5-cols) */}
              <div className="lg:col-span-5 bg-[#0c0c0e]/70 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 h-fit space-y-6">
                
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="w-4 h-4 text-indigo-400" />
                    <h2 className="text-sm font-serif font-semibold uppercase tracking-wider text-white">
                      Order Summary
                    </h2>
                  </div>
                  {cart.length > 0 && (
                    <button
                      type="button"
                      onClick={onClearCart}
                      className="text-[10px] font-bold tracking-wider text-red-400/80 hover:text-red-400 uppercase cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <AnimatePresence mode="popLayout">
                  {cart.length === 0 ? (
                    <motion.div 
                      key="empty-cart-view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-12 text-center text-zinc-500 space-y-3"
                    >
                      <ShoppingCart className="w-10 h-10 mx-auto opacity-20" />
                      <p className="text-xs font-medium uppercase tracking-widest font-sans">
                        No selections made yet
                      </p>
                      <p className="text-[10px] leading-relaxed max-w-[200px] mx-auto opacity-70">
                        Select elegant dishes from our menu page or tabs to initiate cooking.
                      </p>
                    </motion.div>
                  ) : (
                    <div key="filled-cart-view" className="space-y-6">
                      
                      {/* Items list */}
                      <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3 divide-y divide-white/5">
                        {cart.map(it => (
                          <div key={it.menuItem.id} className="flex justify-between items-start pt-3 first:pt-0">
                            <div>
                              <h4 className="text-xs font-serif font-bold text-white pr-2">
                                {it.menuItem.name}
                              </h4>
                              <span className="text-[10px] text-zinc-500">
                                {it.quantity} &times; ${it.menuItem.price} Each
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-xs font-mono font-semibold text-emerald-450">
                                ${it.menuItem.price * it.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onRemoveItem(it.menuItem.id)}
                                className="text-zinc-500 hover:text-red-400 cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Delivery Mode selector */}
                      <div className="pt-4 border-t border-white/5 space-y-4">
                        <span className="text-[9px] font-bold tracking-widest text-zinc-550 uppercase block font-mono">
                          Order Hand-Off Method
                        </span>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setDeliveryType('delivery')}
                            className={`py-2.5 rounded-lg text-center text-xs font-semibold tracking-wider border cursor-pointer transition-all ${
                              deliveryType === 'delivery'
                                ? 'bg-indigo-650/15 text-indigo-400 border-indigo-500/50'
                                : 'bg-transparent text-zinc-400 border-white/5 hover:border-white/10'
                            }`}
                          >
                            In-Suite Delivery
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeliveryType('pickup')}
                            className={`py-2.5 rounded-lg text-center text-xs font-semibold tracking-wider border cursor-pointer transition-all ${
                              deliveryType === 'pickup'
                                ? 'bg-indigo-650/15 text-indigo-400 border-indigo-500/50'
                                : 'bg-transparent text-zinc-400 border-white/5 hover:border-white/10'
                            }`}
                          >
                            Table Collection
                          </button>
                        </div>
                      </div>

                      <form onSubmit={handleCheckout} className="space-y-4">
                        {deliveryType === 'delivery' ? (
                          <div>
                            <label htmlFor="address_suite" className="text-[9px] font-bold tracking-wider text-zinc-500 uppercase font-mono block mb-1.5">
                              Deliver To (Room / Suite No. / Address)
                            </label>
                            <input
                              type="text"
                              id="address_suite"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              required
                              placeholder="e.g. Master Penthouse Suite 704"
                              className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 focus:border-indigo-500 rounded-lg py-2.5 px-3 text-xs text-white focus:outline-none transition-all placeholder:text-zinc-650 font-sans"
                            />
                          </div>
                        ) : (
                          <div>
                            <label htmlFor="pickup_time" className="text-[9px] font-bold tracking-wider text-zinc-500 uppercase font-mono block mb-1.5">
                              Pickup Collection Time
                            </label>
                            <select
                              id="pickup_time"
                              value={pickupTime}
                              onChange={(e) => setPickupTime(e.target.value)}
                              className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 focus:border-indigo-500 rounded-lg py-2.5 px-3 text-xs text-white focus:outline-none transition-all font-sans appearance-none"
                            >
                              {['11:45', '12:30', '13:15', '18:00', '19:00', '19:45', '20:30', '21:15'].map(tim => (
                                <option key={tim} value={tim} className="bg-[#0c0c0e] text-white">{tim}</option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* Cost Stack Recipiet */}
                        <div className="pt-4 border-t border-white/5 text-xs space-y-2 font-sans text-zinc-450">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-mono text-white">${subtotal}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Gastronomy Tax (8%)</span>
                            <span className="font-mono text-white">${tax}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Concierge Surcharge Sourcing</span>
                            <span className="font-mono text-white">${conciergeFee}</span>
                          </div>
                          
                          <div className="flex justify-between pt-3 border-t border-white/5 text-sm font-semibold text-white">
                            <span className="font-serif text-indigo-400">Grand Total</span>
                            <span className="font-mono text-emerald-400 text-base font-bold">${grandTotal}</span>
                          </div>
                        </div>

                        {/* Submit Order card */}
                        <button
                          type="submit"
                          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 text-xs tracking-[0.15em] uppercase rounded-lg transition-all duration-300 cursor-pointer text-center shadow-lg shadow-indigo-600/15"
                        >
                          SUBMIT GOURMET ORDER
                        </button>
                      </form>

                    </div>
                  )}
                </AnimatePresence>

              </div>

            </motion.div>
          ) : (
            // Immersive Production Order Tracker (extremely high-end SaaS flavor)
            <motion.div
              layoutId="order-tracker-layout"
              key="order-submitted-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-6 md:p-10 text-center my-10 space-y-8 shadow-2xl relative z-10"
            >
              
              <div className="space-y-2">
                <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-400/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <Check className="w-6 h-6 text-indigo-400" />
                </div>
                <span className="text-[10px] tracking-[0.3em] text-indigo-400 font-mono uppercase block pt-2 font-semibold">
                  Artisanal Cooking Confirmed
                </span>
                <h2 className="text-3xl font-serif text-white">
                  Order In Preparation
                </h2>
                <div className="font-mono text-xs text-zinc-500 pt-1">
                  ORDER SIGNATURE ID: <span className="text-indigo-400 font-semibold">{orderNumber}</span>
                </div>
              </div>

              {/* Progress Steps UI */}
              <div className="py-6 border-t border-b border-white/5 space-y-6">
                
                {/* Visual Line */}
                <div className="relative flex items-center justify-between max-w-md mx-auto">
                  <div className="absolute left-0 right-0 h-[2px] bg-white/5 z-0"></div>
                  <div className="absolute left-0 h-[2px] bg-indigo-500 transition-all duration-1000 z-0 animate-pulse" style={{ width: `${(orderProgressStep - 1) * 50}%` }}></div>

                  {/* Dot 1 */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold border transition-all duration-300 ${
                      orderProgressStep >= 1 ? 'bg-indigo-650 text-white border-indigo-500 shadow-lg shadow-indigo-600/20Scale' : 'bg-zinc-900 text-zinc-600 border-white/5'
                    }`}>
                      1
                    </div>
                    <span className="text-[9px] font-bold tracking-wider uppercase mt-2 text-white block">Sourcing</span>
                  </div>

                  {/* Dot 2 */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold border transition-all duration-300 ${
                      orderProgressStep >= 2 ? 'bg-indigo-650 text-white border-indigo-500 shadow-lg shadow-indigo-600/20Scale' : 'bg-zinc-900 text-zinc-600 border-white/5'
                    }`}>
                      2
                    </div>
                    <span className="text-[9px] font-bold tracking-wider uppercase mt-2 text-white block">Plating</span>
                  </div>

                  {/* Dot 3 */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold border transition-all duration-300 ${
                      orderProgressStep >= 3 ? 'bg-indigo-650 text-white border-indigo-500 shadow-lg shadow-indigo-600/20Scale' : 'bg-zinc-900 text-zinc-600 border-white/5'
                    }`}>
                      3
                    </div>
                    <span className="text-[9px] font-bold tracking-wider uppercase mt-2 text-white block">Dispatch</span>
                  </div>
                </div>

                {/* Subtext description according to step */}
                <div className="text-xs transition-all duration-300 h-10 flex items-center justify-center">
                  {orderProgressStep === 1 && (
                    <p className="text-zinc-400 italic">
                      &ldquo;Executive Chef is currently sourcing fresh herbs, organic proteins, and micro-supplements for your selections.&rdquo;
                    </p>
                  )}
                  {orderProgressStep === 2 && (
                    <p className="text-indigo-300 italic">
                      &ldquo;Warm pan-searing and signature plating processes are underway in the Main Kitchen. Saffron rice is glazing.&rdquo;
                    </p>
                  )}
                  {orderProgressStep === 3 && (
                    <p className="text-emerald-400 italic font-semibold">
                      &ldquo;Plating complete. Your gourmet tray has been sealed with thermal cloches and is en route with our steward.&rdquo;
                    </p>
                  )}
                </div>

              </div>

              {/* Summary Items Table */}
              <div className="bg-[#050505]/40 border border-white/5 rounded-xl p-5 text-left text-xs font-sans space-y-2.5">
                <span className="text-[9px] font-bold tracking-wider text-zinc-550 font-mono block mb-2">DELIVERY DETAILS</span>
                <div className="flex justify-between">
                  <span className="text-zinc-450">Handoff Mode</span>
                  <span className="text-white font-medium capitalize">{deliveryType === 'delivery' ? 'Suite Delivery' : 'Table Pickup'}</span>
                </div>
                {deliveryType === 'delivery' ? (
                  <div className="flex justify-between">
                    <span className="text-zinc-450">Target Location</span>
                    <span className="text-white font-medium">{address || 'Penthouse Suite'}</span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-zinc-450">Pickup Target</span>
                    <span className="text-white font-medium">{pickupTime}</span>
                  </div>
                )}
                
                <div className="pt-3 border-t border-white/5 flex justify-between font-serif text-indigo-400">
                  <span>Amount Paid</span>
                  <span className="font-mono text-emerald-400 font-bold">${grandTotal}</span>
                </div>
              </div>

              {/* Tracker Buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setOrderSubmitted(false);
                    onClearCart();
                  }}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 text-xs tracking-[0.1em] uppercase rounded-lg transition-all cursor-pointer shadow-lg shadow-indigo-600/15"
                >
                  NEW ORDER
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto bg-transparent border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 font-semibold py-3 px-8 text-xs tracking-[0.1em] uppercase rounded-lg transition-all cursor-pointer"
                >
                  DOWNLOAD RECEIPT
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
