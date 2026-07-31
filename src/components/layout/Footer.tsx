import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, ArrowRight } from 'lucide-react';
import { APP_CONFIG } from '../../constants/theme';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 text-gray-700 dark:text-gray-300 pt-16 pb-24 md:pb-12 border-t border-gray-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-gray-100 dark:border-slate-800">
          {/* Column 1: Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-md">
                <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 2a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5V11a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.5c1.2-.7 2-2 2-3.5a4 4 0 0 0-4-4z" />
                  <path d="M4 11a8 8 0 0 0 16 0H4z" />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-black text-gray-900 dark:text-white">Tastee</span>
                <span className="block text-[10px] font-semibold text-gray-400 uppercase -mt-1 tracking-wider">
                  Delicious. Delivered.
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
              Discover top-rated local restaurants and order fresh, delicious meals delivered fast straight to your doorstep.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-brand-600 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-brand-600 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-brand-600 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-brand-600 hover:text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#home" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Home</a></li>
              <li><a href="#browse" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Browse Restaurants</a></li>
              <li><a href="#categories" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Food Categories</a></li>
              <li><a href="#offers" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Special Offers</a></li>
              <li><a href="#track" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Track Order</a></li>
            </ul>
          </div>

          {/* Column 3: Top Categories */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-4">Top Categories</h4>
            <ul className="space-y-2.5 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#categories" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Italian Pizza</a></li>
              <li><a href="#categories" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Gourmet Burgers</a></li>
              <li><a href="#categories" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Syrian Shawarma</a></li>
              <li><a href="#categories" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Japanese Sushi</a></li>
              <li><a href="#categories" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Healthy Salad Bowls</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-4">Stay Connected</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              Subscribe for exclusive promos and 20% off coupon.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to newsletter!'); }} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  className="w-full pl-3 pr-9 py-2 text-xs rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button type="submit" className="absolute right-1 top-1 p-1.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700">
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
            <div className="mt-4 space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-600" />
                <span>{APP_CONFIG.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-600" />
                <span>{APP_CONFIG.supportEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 dark:text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Tastee Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
