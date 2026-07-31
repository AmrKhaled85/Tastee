import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Navigation, Check } from 'lucide-react';
import { LOCATIONS } from '../../constants/theme';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onSelectLocation: (loc: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}) => {
  if (!isOpen) return null;

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
          className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl z-10 border border-gray-100 dark:border-slate-800 scrollbar-none"
        >
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 dark:bg-brand-900/40 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Choose Delivery Address</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Select where you want your food delivered</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 space-y-2 max-h-72 overflow-y-auto">
            <button
              onClick={() => {
                onSelectLocation('New Cairo, Egypt');
                onClose();
              }}
              className="w-full p-3 rounded-2xl border border-brand-200 bg-brand-50/50 dark:bg-brand-950/20 text-brand-700 dark:text-brand-300 font-semibold flex items-center justify-between hover:bg-brand-100 transition-colors mb-3 text-sm"
            >
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-brand-600" />
                <span>Use Current Location</span>
              </div>
              <span className="text-xs font-bold bg-brand-600 text-white px-2 py-0.5 rounded-full">GPS</span>
            </button>

            {LOCATIONS.map((loc) => {
              const isSelected = loc === currentLocation;
              return (
                <button
                  key={loc}
                  onClick={() => {
                    onSelectLocation(loc);
                    onClose();
                  }}
                  className={`w-full p-3.5 rounded-2xl flex items-center justify-between text-left transition-all text-sm font-medium ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                      : 'bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                    <span>{loc}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
