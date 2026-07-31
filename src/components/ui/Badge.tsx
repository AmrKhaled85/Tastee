import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'time';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className,
}) => {
  const variants = {
    primary: 'bg-brand-600 text-white',
    secondary: 'bg-brand-50 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300',
    accent: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300',
    outline: 'border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-300',
    time: 'bg-brand-600 text-white font-medium shadow-sm',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-colors',
          variants[variant],
          className
        )
      )}
    >
      {children}
    </span>
  );
};
