import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, CreditCard, DollarSign, Smartphone, CheckCircle2, Clock, MapPin, Flame, ArrowRight, ArrowLeft } from 'lucide-react';
import { CatalogFoodItem } from '../../data/dishes';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../ui/Button';

interface DishOrderCheckoutModalProps {
  dish: CatalogFoodItem | null;
  onClose: () => void;
  onTrackOrderClick?: (orderId: string) => void;
}

export const DishOrderCheckoutModal: React.FC<DishOrderCheckoutModalProps> = ({
  dish,
  onClose,
  onTrackOrderClick,
}) => {
  const [step, setStep] = useState<'decision' | 'payment' | 'confirmed'>('decision');
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'wallet'>('card');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('New Cairo, Egypt');
  const [cardNumber, setCardNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!dish) return null;

  const unitPrice = dish.price;
  const subtotal = unitPrice * quantity;
  const deliveryFee = subtotal > 25 ? 0 : 2.50;
  const grandTotal = subtotal + deliveryFee;

  const handleClose = () => {
    setStep('decision');
    setQuantity(1);
    setIsProcessing(false);
    onClose();
  };

  const handleConfirmPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedId = 'TST-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmedOrderId(generatedId);
      setStep('confirmed');
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl z-10 border border-gray-100 dark:border-slate-800 scrollbar-none"
        >
          {/* Header Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* STEP 1: DECISION & DISH OVERVIEW */}
          {step === 'decision' && (
            <div className="space-y-0">
              {/* Dish Image Banner */}
              <div className="relative h-64 w-full">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-6">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-brand-300 bg-brand-950/80 px-3 py-1 rounded-full border border-brand-500/30">
                      {dish.restaurantName}
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1.5 leading-tight">
                      {dish.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Body Details */}
              <div className="p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {dish.calories && (
                      <div className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-amber-500" />
                        <span>{dish.calories} kcal</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-brand-600" />
                      <span>{dish.prepTime}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="block text-[10px] uppercase font-bold text-gray-400">Total Price</span>
                    <span className="text-2xl font-black text-brand-600 dark:text-brand-400">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-gray-100 dark:border-slate-800">
                  {dish.description}
                </p>

                {/* Portion Quantity selector */}
                <div className="flex items-center justify-between p-3.5 bg-brand-50/60 dark:bg-brand-950/30 rounded-2xl border border-brand-100 dark:border-brand-900/40">
                  <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Portion Quantity:</span>
                  <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 text-gray-600 hover:text-brand-600 dark:text-gray-300"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-extrabold text-gray-900 dark:text-white text-base w-6 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 text-gray-600 hover:text-brand-600 dark:text-gray-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Prompt Question & Dual Buttons */}
                <div className="pt-3 space-y-3">
                  <div className="text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Would you like to order this meal & pay now?
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleClose}
                      className="py-3.5 px-4 rounded-2xl border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 font-bold text-sm hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
                    >
                      No, Cancel
                    </button>
                    
                    <Button
                      onClick={() => setStep('payment')}
                      className="py-3.5 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30"
                    >
                      <span>Order & Pay ({formatCurrency(grandTotal)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT & CUSTOMER DETAILS */}
          {step === 'payment' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
                <button
                  onClick={() => setStep('decision')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Dish</span>
                </button>
                <span className="text-xs font-black uppercase text-gray-400">Step 2 of 2</span>
              </div>

              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white">Delivery & Payment Details</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Enter your delivery address and choose your payment method
                </p>
              </div>

              <form onSubmit={handleConfirmPurchase} className="space-y-4">
                {/* Delivery Address */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-brand-600" />
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                    />
                  </div>
                </div>

                {/* Customer Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+20 100 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                {/* Payment Methods Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    Payment Method
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${
                        paymentMethod === 'card'
                          ? 'border-brand-600 bg-brand-50/80 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 shadow-sm'
                          : 'border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-brand-600" />
                      <span>Credit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('wallet')}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${
                        paymentMethod === 'wallet'
                          ? 'border-brand-600 bg-brand-50/80 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 shadow-sm'
                          : 'border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 text-brand-600" />
                      <span>Digital Wallet</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${
                        paymentMethod === 'cod'
                          ? 'border-brand-600 bg-brand-50/80 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 shadow-sm'
                          : 'border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <DollarSign className="w-5 h-5 text-brand-600" />
                      <span>Cash on Delivery</span>
                    </button>
                  </div>
                </div>

                {/* Card input if card chosen */}
                {paymentMethod === 'card' && (
                  <div className="p-3.5 bg-gray-50 dark:bg-slate-800/80 rounded-2xl space-y-2 border border-gray-200/60 dark:border-slate-700">
                    <input
                      type="text"
                      placeholder="Card Number (4111 •••• •••• 1111)"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white font-mono"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}

                {/* Price summary */}
                <div className="p-3 bg-brand-50/50 dark:bg-slate-800/50 rounded-2xl text-xs space-y-1">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Meal ({quantity}x)</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-gray-900 dark:text-white pt-1 border-t border-gray-200 dark:border-slate-700">
                    <span>Grand Total</span>
                    <span className="text-brand-600 dark:text-brand-400">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  isLoading={isProcessing}
                  className="w-full py-4 rounded-2xl font-black text-base shadow-xl shadow-brand-600/30"
                >
                  Confirm Purchase & Pay ({formatCurrency(grandTotal)})
                </Button>
              </form>
            </div>
          )}

          {/* STEP 3: PURCHASE CONFIRMED SUCCESS */}
          {step === 'confirmed' && (
            <div className="p-8 text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 rounded-full flex items-center justify-center mx-auto shadow-lg"
              >
                <CheckCircle2 className="w-12 h-12" />
              </motion.div>

              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-3 py-1 rounded-full">
                  Order Successful!
                </span>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                  Purchase Confirmed 🎉
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Thank you! Your order is being prepared and will arrive in <strong className="text-brand-600">20-30 mins</strong>.
                </p>
              </div>

              {/* Receipt Box */}
              <div className="p-4 bg-gray-50 dark:bg-slate-800/60 rounded-2xl text-left border border-gray-100 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between border-b border-gray-200 dark:border-slate-700 pb-2">
                  <span className="text-gray-400">Order Receipt ID:</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-white">{confirmedOrderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Dish Name:</span>
                  <span className="font-bold text-gray-900 dark:text-white">{dish.name} (x{quantity})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment Status:</span>
                  <span className="font-bold text-brand-600 capitalize">{paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online'}</span>
                </div>
                <div className="flex justify-between text-sm font-black pt-1 text-gray-900 dark:text-white border-t border-gray-200 dark:border-slate-700">
                  <span>Total Amount Paid:</span>
                  <span className="text-brand-600">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleClose}
                  className="py-3 rounded-2xl bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 font-bold text-xs hover:bg-gray-200"
                >
                  Done
                </button>
                <Button
                  onClick={() => {
                    handleClose();
                    if (onTrackOrderClick) onTrackOrderClick(confirmedOrderId);
                  }}
                  className="py-3 rounded-2xl font-bold text-xs"
                >
                  Track Order Status
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
