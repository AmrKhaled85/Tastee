import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, ShoppingBag, ChevronDown, Sun, Moon, Menu, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useDarkMode } from '../../hooks/useDarkMode';

interface NavbarProps {
  activeView: 'home' | 'dishes';
  onSelectView: (view: 'home' | 'dishes') => void;
  onOpenLocation: () => void;
  onOpenAuth: () => void;
  onSearchClick: () => void;
  onOpenTrackOrder: () => void;
  onOpenAboutUs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onSelectView,
  onOpenLocation,
  onOpenAuth,
  onSearchClick,
  onOpenTrackOrder,
  onOpenAboutUs,
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { isDark, toggleDarkMode } = useDarkMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLocation] = useState('New Cairo, Egypt');

  const handleHomeClick = () => {
    onSelectView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-gray-100/60 dark:border-slate-800/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <button onClick={handleHomeClick} className="flex items-center gap-2 sm:gap-2.5 group text-left focus:outline-none flex-shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-600/30 group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5V11a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.5c1.2-.7 2-2 2-3.5a4 4 0 0 0-4-4z" />
              <path d="M4 11a8 8 0 0 0 16 0H4z" />
              <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2" />
            </svg>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white font-sans flex items-center">
              Tastee
            </span>
            <span className="hidden xs:block text-[9px] sm:text-[10px] font-semibold text-gray-500 dark:text-gray-400 tracking-wide uppercase -mt-1">
              Delicious. Delivered.
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links (Only Home, Browse, Track Order, About Us) */}
        <nav className="hidden lg:flex items-center gap-7">
          <button
            onClick={handleHomeClick}
            className={`text-sm font-semibold transition-colors py-1 ${
              activeView === 'home'
                ? 'text-brand-600 dark:text-brand-400 font-bold border-b-2 border-brand-600'
                : 'text-gray-700 hover:text-brand-600 dark:text-gray-300'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onSelectView('dishes')}
            className={`text-sm font-semibold transition-colors py-1 ${
              activeView === 'dishes'
                ? 'text-brand-600 dark:text-brand-400 font-bold border-b-2 border-brand-600'
                : 'text-gray-700 hover:text-brand-600 dark:text-gray-300'
            }`}
          >
            Browse
          </button>

          <button
            onClick={onOpenTrackOrder}
            className="text-sm font-semibold text-gray-700 hover:text-brand-600 dark:text-gray-300 transition-colors py-1"
          >
            Track Order
          </button>

          <button
            onClick={onOpenAboutUs}
            className="text-sm font-semibold text-gray-700 hover:text-brand-600 dark:text-gray-300 transition-colors py-1"
          >
            About Us
          </button>
        </nav>

        {/* Right Action Icons & Buttons */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Location Selector Button */}
          <button
            onClick={onOpenLocation}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-gray-200/80 dark:border-slate-700 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors"
          >
            <MapPin className="w-4 h-4 text-brand-600 fill-brand-600/10" />
            <span className="text-gray-500 dark:text-gray-400 font-normal">Deliver to</span>
            <span className="font-bold text-gray-900 dark:text-white max-w-[120px] lg:max-w-[140px] truncate">
              {currentLocation}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {/* Search Action Icon */}
          <button
            onClick={() => {
              onSelectView('dishes');
              onSearchClick();
            }}
            className="p-2 sm:p-2.5 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 sm:p-2.5 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Shopping Cart Button with Animated Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 sm:p-2.5 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-brand-600 text-white text-[11px] font-bold flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm"
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          {/* Sign In CTA Button */}
          <button
            onClick={onOpenAuth}
            className="hidden sm:inline-flex items-center justify-center px-5 sm:px-6 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-600/20 active:scale-95 transition-all"
          >
            Sign In
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 py-4 space-y-3"
        >
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenLocation();
            }}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-slate-800 text-xs font-semibold text-gray-700 dark:text-gray-200"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-600" />
              <span>Deliver to: <strong className="text-gray-900 dark:text-white">{currentLocation}</strong></span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleHomeClick();
              }}
              className="p-2.5 rounded-xl text-center text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-slate-800"
            >
              Home
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectView('dishes');
              }}
              className="p-2.5 rounded-xl text-center text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-slate-800"
            >
              Browse
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrackOrder();
              }}
              className="p-2.5 rounded-xl text-center text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-slate-800"
            >
              Track Order
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAboutUs();
              }}
              className="p-2.5 rounded-xl text-center text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-slate-800"
            >
              About Us
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAuth();
            }}
            className="w-full py-3 rounded-2xl bg-brand-600 text-white font-bold text-center text-sm"
          >
            Sign In / Register
          </button>
        </motion.div>
      )}
    </header>
  );
};
