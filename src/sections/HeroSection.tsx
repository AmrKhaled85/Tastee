import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Timer, ArrowRight } from 'lucide-react';
import { POPULAR_SEARCH_TAGS } from '../constants/theme';

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleTagClick = (tagName: string) => {
    const next = selectedTag === tagName ? '' : tagName;
    setSelectedTag(next);
    setQuery(next);
    onSearch(next);
  };

  return (
    <section id="home" className="relative pt-6 pb-16 lg:py-20 overflow-hidden hero-gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Headlines & Search */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.15]">
                Good Food, <br />
                <span className="text-brand-600 dark:text-brand-400 bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-emerald-500">
                  Great Mood!
                </span>
              </h1>
              
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
                Order your favorite meals from top restaurants and get them delivered fast to your doorstep.
              </p>
            </motion.div>

            {/* Rounded Search Bar */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="relative max-w-xl mx-auto lg:mx-0 bg-white dark:bg-slate-900 p-1.5 sm:p-2.5 rounded-full shadow-lg border border-gray-100 dark:border-slate-800 flex items-center gap-1.5 sm:gap-2"
            >
              <input
                type="text"
                placeholder="What are you craving?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 pl-3 sm:pl-6 py-2 text-xs sm:text-base text-gray-900 dark:text-white bg-transparent placeholder:text-gray-400 focus:outline-none min-w-0"
              />
              <button
                type="submit"
                className="px-4 sm:px-8 py-2.5 sm:py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-base shadow-md shadow-brand-600/30 flex items-center gap-1.5 sm:gap-2 transition-all hover:scale-[1.02] active:scale-95 flex-shrink-0"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Find Food</span>
              </button>
            </motion.form>

            {/* Category search chips/pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2"
            >
              {POPULAR_SEARCH_TAGS.map((tag) => {
                const isSelected = selectedTag === tag.name;
                return (
                  <button
                    key={tag.name}
                    onClick={() => handleTagClick(tag.name)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border border-gray-200/80 dark:border-slate-700 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400'
                    }`}
                  >
                    <span>{tag.icon}</span>
                    <span>{tag.name}</span>
                    {isSelected && <ArrowRight className="w-3 h-3 ml-0.5" />}
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Hero Food Bowl & Floating Elements */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Background Soft Green Circle Halo */}
            <div className="absolute w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] bg-brand-100/70 dark:bg-brand-900/30 rounded-full filter blur-3xl -z-10 animate-pulse" />

            <div className="relative w-full max-w-md sm:max-w-lg aspect-square flex items-center justify-center">
              {/* Main Food Bowl Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative z-10 w-full h-full p-4"
              >
                <div className="w-full h-full rounded-full overflow-hidden border-4 sm:border-8 border-white dark:border-slate-800 shadow-2xl relative">
                  <img
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=85"
                    alt="Delicious Healthy Bowl"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>

              {/* Floating Delivery Time Badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute top-2 left-2 sm:top-6 sm:left-4 z-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-full border-2 border-dashed border-brand-500 shadow-xl flex items-center gap-2 sm:gap-3 animate-float"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center flex-shrink-0">
                  <Timer className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="block text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    Fast Delivery
                  </span>
                  <span className="text-xs sm:text-base font-black text-gray-900 dark:text-white leading-tight">
                    30 MIN
                  </span>
                </div>
              </motion.div>

              {/* Floating Decorative Leaf 1 */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute top-0 right-8 text-3xl pointer-events-none z-20"
              >
                🌿
              </motion.div>

              {/* Floating Decorative Tomato 2 */}
              <motion.div
                animate={{ y: [0, 12, 0], rotate: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-6 right-2 text-3xl pointer-events-none z-20"
              >
                🍅
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
