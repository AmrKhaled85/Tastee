import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Star, Clock, ShoppingBag, Flame } from 'lucide-react';
import { FoodItem, Restaurant } from '../../types';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../ui/Button';

interface FoodDetailModalProps {
  food: FoodItem | null;
  restaurant: Restaurant | null;
  onClose: () => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  food,
  restaurant,
  onClose,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!food || !restaurant) return null;

  const handleAdd = () => {
    addToCart(food, restaurant, quantity);
    onClose();
  };

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
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl z-10 border border-gray-100 dark:border-slate-800 scrollbar-none"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Banner */}
          <div className="relative h-48 sm:h-60 w-full">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-300 bg-brand-900/60 px-2.5 py-1 rounded-full backdrop-blur-md">
                  {restaurant.name}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1.5">{food.name}</h3>
              </div>
            </div>
          </div>

          {/* Body Info */}
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                {food.calories && (
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-amber-500" />
                    <span>{food.calories} kcal</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-brand-600" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{restaurant.rating}</span>
                </div>
              </div>
              <span className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">
                {formatCurrency(food.price * quantity)}
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {food.description}
            </p>

            {/* Quantity Selector & Add CTA */}
            <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center gap-4">
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-slate-800 px-3 py-2 rounded-2xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-gray-600 hover:text-brand-600 dark:text-gray-300 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-gray-900 dark:text-white text-base w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-gray-600 hover:text-brand-600 dark:text-gray-300 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                onClick={handleAdd}
                className="flex-1 py-3.5 flex items-center justify-center gap-2 text-base"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart ({formatCurrency(food.price * quantity)})</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
