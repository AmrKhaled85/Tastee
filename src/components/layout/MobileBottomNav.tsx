import React from 'react';
import { Home, Compass, Tag, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

interface MobileBottomNavProps {
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onOpenTrackOrder: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenCart,
  onOpenAuth,
  onOpenTrackOrder,
}) => {
  const { totalItems } = useCart();

  const navItems = [
    { name: 'Home', icon: Home, active: true, href: '#home' },
    { name: 'Browse', icon: Compass, href: '#browse' },
    { name: 'Offers', icon: Tag, href: '#offers' },
    { name: 'Orders', icon: ShoppingBag, onClick: onOpenCart, badge: totalItems },
    { name: 'Profile', icon: User, onClick: onOpenAuth },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-gray-100 dark:border-slate-800 px-3 py-2 flex items-center justify-around shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.active;

        if (item.onClick) {
          return (
            <button
              key={item.name}
              onClick={item.onClick}
              className="flex flex-col items-center gap-1 relative py-1 px-3"
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-brand-600' : 'text-gray-400 dark:text-gray-500'}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] font-semibold ${isActive ? 'text-brand-600' : 'text-gray-500 dark:text-gray-400'}`}>
                {item.name}
              </span>
            </button>
          );
        }

        return (
          <a
            key={item.name}
            href={item.href}
            className="flex flex-col items-center gap-1 relative py-1 px-3"
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-brand-600' : 'text-gray-400 dark:text-gray-500'}`} />
            <span className={`text-[11px] font-semibold ${isActive ? 'text-brand-600' : 'text-gray-500 dark:text-gray-400'}`}>
              {item.name}
            </span>
          </a>
        );
      })}
    </div>
  );
};
