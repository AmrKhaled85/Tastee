import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Heart, Star } from 'lucide-react';
import { RESTAURANTS_DATA } from '../data/restaurants';
import { Restaurant, FoodItem } from '../types';
import { useFavorites } from '../hooks/useFavorites';
import { Badge } from '../components/ui/Badge';

interface RestaurantsSectionProps {
  onSelectFood: (food: FoodItem, restaurant: Restaurant) => void;
  onViewAllClick?: () => void;
}

export const RestaurantsSection: React.FC<RestaurantsSectionProps> = ({
  onSelectFood,
  onViewAllClick,
}) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterTabs = ['All', 'Burgers', 'Pizza', 'Shawarma', 'Sushi', 'Healthy'];

  const filteredRestaurants = RESTAURANTS_DATA.filter((rest) => {
    if (selectedFilter === 'All') return true;
    return rest.cuisine.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  const handleCardClick = () => {
    if (onViewAllClick) {
      onViewAllClick();
    }
  };

  return (
    <section id="browse" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Popular Restaurants
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

      {/* Cuisine Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedFilter(tab)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedFilter === tab
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-300 border border-gray-200/80 dark:border-slate-800 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Restaurant Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 sm:gap-6">
        {filteredRestaurants.map((restaurant, idx) => {
          const favorite = isFavorite(restaurant.id);

          return (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              onClick={handleCardClick}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Delivery Time Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant="time" className="bg-brand-600 text-white font-bold text-[11px] px-3 py-1 shadow-md">
                    {restaurant.deliveryTime}
                  </Badge>
                </div>

                {/* Favorite Heart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(restaurant.id);
                  }}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors shadow-sm"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      favorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'
                    }`}
                  />
                </button>
              </div>

              {/* Card Body (Matches 89436.png) */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-base group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {restaurant.name}
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-0.5">
                    {restaurant.cuisine}
                  </p>
                </div>

                {/* Bottom info row: Rating, Price Level, Free Delivery */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{restaurant.rating}</span>
                    </div>
                    <span className="text-gray-400 font-semibold">{restaurant.priceLevel}</span>
                  </div>

                  {restaurant.isFreeDelivery && (
                    <span className="font-bold text-brand-600 dark:text-brand-400 text-[11px]">
                      Free delivery
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
