import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Shield, Award, Users } from 'lucide-react';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutUsModal: React.FC<AboutUsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const highlights = [
    { title: 'Top Quality Food', desc: 'Partnering exclusively with verified top-tier local restaurants.', icon: Award },
    { title: 'Lightning Fast', desc: 'Average delivery speed of under 30 minutes in your city.', icon: Shield },
    { title: 'Customer First', desc: '24/7 dedicated customer care and instant order resolution.', icon: Heart },
    { title: '1M+ Happy Foodies', desc: 'Delivering over 1,000,000 fresh meals every year.', icon: Users },
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

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-md">
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M12 2a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5V11a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.5c1.2-.7 2-2 2-3.5a4 4 0 0 0-4-4z" />
                <path d="M4 11a8 8 0 0 0 16 0H4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">About Tastee</h3>
              <p className="text-xs text-brand-600 dark:text-brand-400 font-bold uppercase tracking-wider">
                Delicious. Delivered.
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Tastee is Egypt's premium food delivery platform connecting food lovers with top handpicked culinary destinations. We ensure every dish arrives hot, fresh, and on time.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl space-y-1">
                  <Icon className="w-5 h-5 text-brand-600" />
                  <h4 className="font-bold text-gray-900 dark:text-white text-xs">{item.title}</h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
