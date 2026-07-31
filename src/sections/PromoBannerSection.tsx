import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, Check } from 'lucide-react';
import { PROMO_DATA } from '../data/promos';

export const PromoBannerSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(PROMO_DATA.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="offers" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl sm:rounded-4xl bg-gradient-to-r from-[#032017] via-[#073827] to-[#004D37] text-white p-6 sm:p-12 shadow-2xl">
        {/* Background Line Art Doodles */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 800 300" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="400" cy="150" r="120" strokeDasharray="6 6" />
            <path d="M100 50 Q 150 150 200 80 T 300 200" />
            <path d="M600 80 Q 650 200 700 120" />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Left 3D Wallet Illustration */}
          <div className="lg:col-span-3 flex justify-center lg:justify-start">
            <motion.div
              initial={{ scale: 0.8, rotate: -6 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-32 h-32 sm:w-44 sm:h-44 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-3xl p-3 sm:p-4 shadow-2xl flex flex-col items-center justify-center text-slate-900 border-4 border-amber-300 transform hover:scale-105 transition-transform"
            >
              <span className="text-3xl sm:text-5xl">👛</span>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider mt-2 bg-slate-900 text-white px-2 py-0.5 rounded-full">
                20% DISCOUNT
              </span>
            </motion.div>
          </div>

          {/* Center Discount Copy & Code */}
          <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-1"
            >
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Get 20% OFF
              </h2>
              <p className="text-emerald-200 text-sm sm:text-base font-medium">
                {PROMO_DATA.description}
              </p>
            </motion.div>

            {/* Promo Code Badge & Copy */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20">
                <span className="text-xs text-emerald-200 font-medium">Use code:</span>
                <span className="font-mono font-black text-amber-300 text-sm sm:text-base tracking-wider">
                  {PROMO_DATA.code}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors text-white"
                  title="Copy Code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a
                href="#browse"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-brand-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Spaghetti Dish Presentation */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-40 h-40 sm:w-60 sm:h-60 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
                alt="Spaghetti Pasta Dish"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
