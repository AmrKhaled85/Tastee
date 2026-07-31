import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Flame, Clock, Star, ShoppingBag } from 'lucide-react';
import { ALL_DISHES_DATA, CatalogFoodItem } from '../data/dishes';
import { formatCurrency } from '../utils/formatters';

interface DishesPageProps {
  onSelectDishToOrder: (dish: CatalogFoodItem) => void;
}

export const DishesPage: React.FC<DishesPageProps> = ({ onSelectDishToOrder }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');

  const categories = ['All', 'Burger', 'Pizza', 'Shawarma', 'Sushi', 'Healthy', 'Desserts', 'Drinks'];

  const filteredDishes = ALL_DISHES_DATA.filter((dish) => {
    const matchesCategory = selectedCategory === 'All' || dish.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesQuery = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dish.restaurantName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
  });

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-emerald-600 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-md">
            Full Menu Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Explore All Fresh Meals & Dishes 🍔🍕
          </h1>
          <p className="text-sm text-brand-100 font-medium leading-relaxed">
            Select your favorite meal, view the exact price instantly, choose whether to order, and complete your payment with fast delivery.
          </p>
        </div>
      </div>

      {/* Search & Filters Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search food or restaurant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
          />
        </div>

        {/* Categories Horizontal Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <select
          value={sortBy}
          onChange={(e: any) => setSortBy(e.target.value)}
          className="w-full md:w-auto px-3.5 py-2.5 text-xs font-bold rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 focus:outline-none"
        >
          <option value="popular">Most Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Dishes Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {filteredDishes.map((dish, idx) => (
          <motion.div
            key={dish.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Dish Image Banner */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                {dish.restaurantName}
              </span>
              <span className="absolute top-3 right-3 bg-brand-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                {formatCurrency(dish.price)}
              </span>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1 font-medium">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{dish.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-brand-600" />{dish.prepTime}</span>
                    {dish.calories && <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-amber-500" />{dish.calories} kcal</span>}
                  </div>
                </div>

                <h3 className="font-extrabold text-gray-900 dark:text-white text-base group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
                  {dish.name}
                </h3>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                  {dish.description}
                </p>
              </div>

              {/* Price & Order Button */}
              <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-400">Price</span>
                  <span className="text-xl font-black text-brand-600 dark:text-brand-400">
                    {formatCurrency(dish.price)}
                  </span>
                </div>

                <button
                  onClick={() => onSelectDishToOrder(dish)}
                  className="px-4 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-brand-600/20 active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order & Pay</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
