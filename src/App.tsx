import React, { useState } from 'react';
import { CartProvider, useCart } from './hooks/useCart';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { DishesPage } from './pages/DishesPage';
import { CartDrawer } from './components/modals/CartDrawer';
import { LocationModal } from './components/modals/LocationModal';
import { AuthModal } from './components/modals/AuthModal';
import { FoodDetailModal } from './components/modals/FoodDetailModal';
import { TrackOrderModal } from './components/modals/TrackOrderModal';
import { AboutUsModal } from './components/modals/AboutUsModal';
import { DishOrderCheckoutModal } from './components/modals/DishOrderCheckoutModal';
import { FoodItem, Restaurant } from './types';
import { CatalogFoodItem } from './data/dishes';

const MainContent: React.FC = () => {
  const { setIsCartOpen } = useCart();
  const [activeView, setActiveView] = useState<'home' | 'dishes'>('home');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTrackOrderModalOpen, setIsTrackOrderModalOpen] = useState(false);
  const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('New Cairo, Egypt');

  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const [selectedDishToOrder, setSelectedDishToOrder] = useState<CatalogFoodItem | null>(null);

  const handleOpenFoodModal = (food: FoodItem, restaurant: Restaurant) => {
    setSelectedFood(food);
    setSelectedRestaurant(restaurant);
  };

  const handleCloseFoodModal = () => {
    setSelectedFood(null);
    setSelectedRestaurant(null);
  };

  const handleSearch = (query: string) => {
    setActiveView('dishes');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] dark:bg-[#0D1512] text-[#1C1E21] dark:text-slate-100 transition-colors duration-300">
      <Navbar
        activeView={activeView}
        onSelectView={(view) => setActiveView(view)}
        onOpenLocation={() => setIsLocationModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onSearchClick={() => handleSearch('')}
        onOpenTrackOrder={() => setIsTrackOrderModalOpen(true)}
        onOpenAboutUs={() => setIsAboutUsModalOpen(true)}
      />

      <main className="flex-1 pb-16 md:pb-0">
        {activeView === 'home' ? (
          <HomePage
            onSearch={handleSearch}
            onSelectCategory={(catId) => handleSearch(catId)}
            onSelectFood={handleOpenFoodModal}
            onViewAllClick={() => setActiveView('dishes')}
          />
        ) : (
          <DishesPage
            onSelectDishToOrder={(dish) => setSelectedDishToOrder(dish)}
          />
        )}
      </main>

      <Footer />

      <MobileBottomNav
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderModalOpen(true)}
      />

      <ScrollToTop />

      {/* Global Modals */}
      <CartDrawer />

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={currentLocation}
        onSelectLocation={(loc) => setCurrentLocation(loc)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <FoodDetailModal
        food={selectedFood}
        restaurant={selectedRestaurant}
        onClose={handleCloseFoodModal}
      />

      <DishOrderCheckoutModal
        dish={selectedDishToOrder}
        onClose={() => setSelectedDishToOrder(null)}
        onTrackOrderClick={(orderId) => {
          setSelectedDishToOrder(null);
          setIsTrackOrderModalOpen(true);
        }}
      />

      <TrackOrderModal
        isOpen={isTrackOrderModalOpen}
        onClose={() => setIsTrackOrderModalOpen(false)}
      />

      <AboutUsModal
        isOpen={isAboutUsModalOpen}
        onClose={() => setIsAboutUsModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
};

export default App;
