import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, PackageCheck, CookingPot, Bike, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({ isOpen, onClose }) => {
  const [orderId, setOrderId] = useState('TST-948271');
  const [isSearching, setIsSearching] = useState(false);
  const [searchedOrder, setSearchedOrder] = useState<any>({
    id: 'TST-948271',
    status: 'In Transit',
    step: 3,
    restaurant: 'Burger King',
    items: ['Whopper Supreme Combo x2', 'Double Bacon King x1'],
    estimatedDelivery: '15-20 mins',
    driverName: 'Ahmed Hassan',
    driverPhone: '+20 101 555 7890',
  });

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchedOrder({
        id: orderId || 'TST-' + Math.floor(100000 + Math.random() * 900000),
        status: 'Preparing Food',
        step: 2,
        restaurant: 'Pizza House',
        items: ['Classic Pepperoni Pizza x1'],
        estimatedDelivery: '20-25 mins',
        driverName: 'Mahmoud Ali',
        driverPhone: '+20 102 444 1234',
      });
    }, 800);
  };

  const steps = [
    { title: 'Order Confirmed', icon: PackageCheck, desc: 'Restaurant accepted your order' },
    { title: 'Preparing Food', icon: CookingPot, desc: 'Chef is cooking your meal' },
    { title: 'On the Way', icon: Bike, desc: 'Driver is delivering your order' },
    { title: 'Delivered', icon: CheckCircle2, desc: 'Order arrived at your doorstep' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-gray-100 dark:border-slate-800 space-y-6 scrollbar-none"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">Track Your Order</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Enter your Order ID to view real-time delivery status
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Order ID (e.g. TST-948271)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 uppercase font-mono font-bold"
              />
            </div>
            <Button type="submit" isLoading={isSearching}>
              Track
            </Button>
          </form>

          {/* Order Details Status Timeline */}
          {searchedOrder && (
            <div className="space-y-6 pt-2">
              <div className="p-4 rounded-2xl bg-brand-50/80 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                    {searchedOrder.restaurant}
                  </span>
                  <h4 className="text-base font-black text-gray-900 dark:text-white">
                    Order {searchedOrder.id}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {searchedOrder.items.join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1 text-brand-600 font-bold text-xs bg-white dark:bg-slate-800 px-2.5 py-1 rounded-full shadow-sm">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{searchedOrder.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Progress timeline */}
              <div className="space-y-4">
                {steps.map((stepItem, idx) => {
                  const StepIcon = stepItem.icon;
                  const isCompleted = idx + 1 <= searchedOrder.step;
                  const isCurrent = idx + 1 === searchedOrder.step;

                  return (
                    <div key={stepItem.title} className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          isCompleted
                            ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                            : 'bg-gray-100 dark:bg-slate-800 text-gray-400'
                        }`}
                      >
                        <StepIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between">
                          <h5
                            className={`text-sm font-bold ${
                              isCurrent
                                ? 'text-brand-600 dark:text-brand-400 font-black'
                                : isCompleted
                                ? 'text-gray-900 dark:text-white'
                                : 'text-gray-400'
                            }`}
                          >
                            {stepItem.title}
                          </h5>
                          {isCurrent && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full animate-pulse">
                              In Progress
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {stepItem.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Courier info card */}
              <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-200 text-brand-800 font-bold flex items-center justify-center">
                    AH
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white">{searchedOrder.driverName}</span>
                    <span className="block text-[10px] text-gray-400">Delivery Courier</span>
                  </div>
                </div>
                <a
                  href={`tel:${searchedOrder.driverPhone}`}
                  className="px-3 py-1.5 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition-colors"
                >
                  Call Courier
                </a>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
