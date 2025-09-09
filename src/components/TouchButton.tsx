'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { useTouchGestures, hapticFeedback } from '@/hooks/useTouchGestures';

interface TouchButtonProps {
  children: ReactNode;
  onClick?: () => void;
  onLongPress?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  haptic?: 'light' | 'medium' | 'heavy' | 'success' | 'error';
}

export default function TouchButton({
  children,
  onClick,
  onLongPress,
  className = '',
  disabled = false,
  variant = 'primary',
  size = 'md',
  haptic = 'light'
}: TouchButtonProps) {
  const { touchHandlers } = useTouchGestures({
    onTap: () => {
      if (!disabled && onClick) {
        onClick();
        hapticFeedback[haptic]();
      }
    },
    onLongPress: () => {
      if (!disabled && onLongPress) {
        onLongPress();
        hapticFeedback.medium();
      }
    }
  });

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-purple-600 hover:bg-purple-700 text-white border-purple-600';
      case 'secondary':
        return 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700';
      case 'ghost':
        return 'bg-transparent hover:bg-slate-800/50 text-gray-300 hover:text-white border-transparent';
      default:
        return 'bg-purple-600 hover:bg-purple-700 text-white border-purple-600';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 text-sm';
      case 'md':
        return 'px-4 py-3 text-base';
      case 'lg':
        return 'px-6 py-4 text-lg';
      default:
        return 'px-4 py-3 text-base';
    }
  };

  return (
    <motion.button
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        border rounded-lg font-medium transition-all duration-300
        active:scale-95 touch-manipulation select-none
        ${className}
      `}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      {...touchHandlers}
    >
      {children}
    </motion.button>
  );
}
