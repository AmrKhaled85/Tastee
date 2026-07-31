import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, CheckCircle, Star } from 'lucide-react';

export const AppDownloadSection: React.FC = () => {
  const benefits = [
    'Real-time GPS order tracking',
    'Exclusive app-only discounts & rewards',
    'Faster 1-click reordering from favorites',
    '24/7 Priority customer care support',
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-br from-brand-50 via-emerald-50/50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-4xl p-8 sm:p-14 border border-brand-100 dark:border-slate-800 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Headline & Download CTA */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold">
            <Smartphone className="w-4 h-4 text-brand-600" />
            <span>Mobile App Available</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Seamless Food Ordering <br />
            <span className="text-brand-600 dark:text-brand-400">Right on Your Smartphone</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
            Download the Tastee mobile application to enjoy seamless online ordering, live courier map tracking, and instant push notifications.
          </p>

          <ul className="space-y-3 pt-2">
            {benefits.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-3 text-sm font-semibold text-gray-800 dark:text-gray-200"
              >
                <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          {/* App Store & Play Store Badges */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4">
            <a
              href="#"
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gray-900 hover:bg-black text-white flex items-center justify-center sm:justify-start gap-3 transition-transform hover:scale-105 shadow-md"
            >
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.54c.67-.82 1.13-1.97.99-3.12-1 .04-2.22.67-2.91 1.48-.61.72-1.15 1.89-.99 3.01 1.12.09 2.24-.55 2.91-1.37z"/>
              </svg>
              <div className="text-left">
                <span className="block text-[10px] uppercase font-bold text-gray-400">Download on the</span>
                <span className="text-sm font-black leading-tight">App Store</span>
              </div>
            </a>

            <a
              href="#"
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gray-900 hover:bg-black text-white flex items-center justify-center sm:justify-start gap-3 transition-transform hover:scale-105 shadow-md"
            >
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M3.6 1.83C3.25 2.2 3 2.76 3 3.49v17.02c0 .73.25 1.29.6 1.66l.09.08L13.14 12.8v-.22L3.69 1.75l-.09.08zm12.3 8.16l-3.05-3.05L3.92 1.76c.4-.24.94-.28 1.5-.02l10.48 5.99zM3.92 22.24l8.93-5.18 3.05-3.05L5.42 22.26c-.56.26-1.1.22-1.5-.02zm12.98-7.79l3.52-2.01c1-.57 1-1.5 0-2.07l-3.52-2.01-3.21 3.21 3.21 3.88z"/>
              </svg>
              <div className="text-left">
                <span className="block text-[10px] uppercase font-bold text-gray-400">GET IT ON</span>
                <span className="text-sm font-black leading-tight">Google Play</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Phone Screen Mockup */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="relative w-64 sm:w-72 bg-slate-900 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800"
          >
            {/* Camera notch */}
            <div className="w-24 h-4 bg-slate-800 rounded-b-xl mx-auto mb-3" />

            {/* Screen UI preview matching right side smartphone design */}
            <div className="bg-white dark:bg-slate-950 rounded-[32px] overflow-hidden p-3 space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-gray-100 dark:border-slate-800 pb-2">
                <span className="font-extrabold text-brand-600">Tastee App</span>
                <div className="flex items-center gap-1 text-amber-500 text-[10px]">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>4.9 Rating</span>
                </div>
              </div>

              <div className="bg-brand-50 dark:bg-slate-900 p-2.5 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-brand-700 dark:text-brand-300">Deliver to</span>
                <p className="text-xs font-black text-gray-900 dark:text-white truncate">New Cairo, Egypt</p>
              </div>

              <div className="h-28 rounded-xl bg-gray-100 dark:bg-slate-800 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"
                  alt="App Preview"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 text-[9px] font-extrabold bg-brand-600 text-white px-2 py-0.5 rounded-full">
                  FAST 30 MIN
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded-full w-3/4" />
                <div className="h-3 bg-gray-100 dark:bg-slate-900 rounded-full w-1/2" />
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
