import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { CATEGORIES_DATA } from '../data/categories';

interface CategoriesSectionProps {
  onSelectCategory: (categoryId: string) => void;
  onViewAllClick?: () => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
  onViewAllClick,
}) => {
  return (
    <section id="categories" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Popular Categories
          </h2>
        </div>
        <button
          onClick={onViewAllClick}
          className="inline-flex items-center text-sm font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400 gap-1 group"
        >
          <span>View all</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Categories Swiper Carousel / Grid */}
      <div className="hidden sm:block">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 8 },
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="pb-6"
        >
          {CATEGORIES_DATA.map((cat, idx) => (
            <SwiperSlide key={cat.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => onSelectCategory(cat.id)}
                className="group cursor-pointer bg-white dark:bg-slate-900 rounded-3xl p-4 text-center border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-between h-44"
              >
                {/* Image container with soft background */}
                <div className={`w-20 h-20 rounded-2xl ${cat.bgColor || 'bg-gray-50'} flex items-center justify-center overflow-hidden mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                    {cat.count}
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile view: Horizontal touch scrollable list */}
      <div className="flex sm:hidden overflow-x-auto gap-3 pb-2 pt-1 scrollbar-none snap-x snap-mandatory">
        {CATEGORIES_DATA.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="flex flex-col items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 text-center min-w-[90px] w-[90px] flex-shrink-0 snap-start active:scale-95 transition-transform"
          >
            <div className={`w-14 h-14 rounded-xl ${cat.bgColor || 'bg-gray-50'} flex items-center justify-center overflow-hidden mb-1.5`}>
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <span className="text-[11px] font-bold text-gray-900 dark:text-white truncate w-full">
              {cat.name}
            </span>
            <span className="text-[9px] text-gray-400 font-medium">
              {cat.count}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
