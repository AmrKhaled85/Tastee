import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../ui/Button';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const deliveryFee = subtotal > 0 ? (subtotal > 25 ? 0 : 2.99) : 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'TASTEE20') {
      setDiscount(subtotal * 0.2);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "TASTEE20"');
    }
  };

  const handleCheckout = () => {
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      setOrderSuccess(true);
      setTimeout(() => {
        setOrderSuccess(false);
        clearCart();
        setIsCartOpen(false);
      }, 2500);
    }, 1500);
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-brand-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Order</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{cart.length} items selected</p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            {orderSuccess ? (
              <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-4"
                >
                  <CheckCircle2 className="w-12 h-12" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Confirmed!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  Your meal is being prepared with care and will arrive in 20-30 minutes.
                </p>
                <span className="text-xs font-semibold px-3 py-1 bg-brand-50 text-brand-700 rounded-full">
                  Tracking ID: #TST-{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <ShoppingBag className="w-12 h-12" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Your cart is empty</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Explore delicious meals from top restaurants and add them here.
                </p>
                <Button onClick={() => setIsCartOpen(false)} variant="primary">
                  Browse Restaurants
                </Button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      className="flex gap-4 p-3 bg-gray-50 dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-800"
                    >
                      <img
                        src={item.food.image}
                        alt={item.food.name}
                        className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">
                              {item.food.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.food.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.restaurantName}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-brand-600 dark:text-brand-400 text-sm">
                            {formatCurrency(item.food.price * item.quantity)}
                          </span>
                          <div className="flex items-center gap-2 bg-white dark:bg-slate-700 px-2 py-1 rounded-lg border border-gray-200 dark:border-slate-600 shadow-sm">
                            <button
                              onClick={() => updateQuantity(item.food.id, -1)}
                              className="p-1 text-gray-600 hover:text-brand-600 dark:text-gray-300"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold text-gray-900 dark:text-white w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.food.id, 1)}
                              className="p-1 text-gray-600 hover:text-brand-600 dark:text-gray-300"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer / Summary */}
                <div className="p-6 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                  {/* Promo Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. TASTEE20)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 uppercase"
                    />
                    <Button type="submit" variant="secondary" size="sm" disabled={promoApplied}>
                      {promoApplied ? 'Applied' : 'Apply'}
                    </Button>
                  </form>

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between text-brand-600 dark:text-brand-400">
                        <span>Promo Discount (20%)</span>
                        <span>-{formatCurrency(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>{deliveryFee === 0 ? <span className="text-brand-600 font-bold">FREE</span> : formatCurrency(deliveryFee)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-slate-800">
                      <span>Total</span>
                      <span className="text-brand-600 dark:text-brand-400 text-base">{formatCurrency(total)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    isLoading={isOrdering}
                    className="w-full py-3.5 text-base flex items-center justify-center gap-2"
                  >
                    <span>Checkout Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
