import React from 'react';
import { motion } from 'framer-motion';
import { Bike, UtensilsCrossed, ShieldCheck, Headphones } from 'lucide-react';
import { FEATURES_DATA } from '../data/features';

export const FeatureCardsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bike':
        return <Bike className="w-6 h-6 text-brand-600 dark:text-brand-400" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-6 h-6 text-brand-600 dark:text-brand-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-brand-600 dark:text-brand-400" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-brand-600 dark:text-brand-400" />;
      default:
        return <Bike className="w-6 h-6 text-brand-600 dark:text-brand-400" />;
    }
  };

  return (
    <section className="relative z-20 -mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {FEATURES_DATA.map((feature, idx) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-4 p-2 sm:p-3 rounded-2xl bg-gray-50/50 dark:bg-slate-800/40 border border-gray-100/80 dark:border-slate-800/60"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/50 flex items-center justify-center flex-shrink-0 border border-brand-100 dark:border-brand-900/40">
              {getIcon(feature.icon)}
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base leading-snug">
                {feature.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
