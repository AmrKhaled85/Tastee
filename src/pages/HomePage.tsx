import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { FeatureCardsSection } from '../sections/FeatureCardsSection';
import { CategoriesSection } from '../sections/CategoriesSection';
import { RestaurantsSection } from '../sections/RestaurantsSection';
import { PromoBannerSection } from '../sections/PromoBannerSection';
import { FoodItem, Restaurant } from '../types';

interface HomePageProps {
  onSearch: (query: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onSelectFood: (food: FoodItem, restaurant: Restaurant) => void;
  onViewAllClick: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSearch,
  onSelectCategory,
  onSelectFood,
  onViewAllClick,
}) => {
  return (
    <div className="space-y-4">
      <HeroSection onSearch={onSearch} />
      <FeatureCardsSection />
      <CategoriesSection
        onSelectCategory={onSelectCategory}
        onViewAllClick={onViewAllClick}
      />
      <RestaurantsSection
        onSelectFood={onSelectFood}
        onViewAllClick={onViewAllClick}
      />
      <PromoBannerSection />
    </div>
  );
};
