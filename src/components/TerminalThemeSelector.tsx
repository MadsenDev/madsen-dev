'use client';

import { motion } from 'motion/react';
import { Palette, Monitor, Zap, Gamepad2, Sparkles } from 'lucide-react';
import { useTerminalTheme, TerminalTheme } from '@/contexts/TerminalThemeContext';

const themes = [
  {
    key: 'default' as TerminalTheme,
    name: 'Default',
    icon: Monitor,
    description: 'Clean and professional',
    preview: 'bg-slate-900 border-slate-700'
  },
  {
    key: 'matrix' as TerminalTheme,
    name: 'Matrix',
    icon: Zap,
    description: 'Green on black hacker style',
    preview: 'bg-black border-green-500/30'
  },
  {
    key: 'retro' as TerminalTheme,
    name: 'Retro',
    icon: Gamepad2,
    description: 'Classic amber terminal',
    preview: 'bg-amber-50 border-amber-600'
  },
  {
    key: 'neon' as TerminalTheme,
    name: 'Neon',
    icon: Sparkles,
    description: 'Cyberpunk neon colors',
    preview: 'bg-slate-950 border-cyan-500/50'
  }
];

export default function TerminalThemeSelector() {
  const { theme, setTheme, getThemeStyles } = useTerminalTheme();
  const styles = getThemeStyles();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Palette className={styles.accent} size={20} />
        <h3 className={`text-lg font-semibold ${styles.text}`}>
          Terminal Theme
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          const isSelected = theme === themeOption.key;
          
          return (
            <motion.button
              key={themeOption.key}
              onClick={() => setTheme(themeOption.key)}
              className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
                isSelected 
                  ? `${styles.border} ${styles.button} border-opacity-100` 
                  : `${styles.border} ${styles.buttonHover} border-opacity-50`
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Theme Preview */}
              <div className={`w-full h-8 rounded mb-3 border ${themeOption.preview}`} />
              
              {/* Theme Info */}
              <div className="flex items-center gap-2 mb-1">
                <Icon size={16} className={styles.accent} />
                <span className={`text-sm font-medium ${styles.text}`}>
                  {themeOption.name}
                </span>
              </div>
              
              <p className={`text-xs ${styles.text} opacity-70`}>
                {themeOption.description}
              </p>
              
              {/* Selected Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute top-2 right-2 w-3 h-3 rounded-full ${styles.accent.replace('text-', 'bg-')}`}
                />
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Theme Preview */}
      <div className={`p-4 rounded-lg border ${styles.border} ${styles.background}`}>
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-2 h-2 rounded-full ${styles.accent.replace('text-', 'bg-')}`} />
          <span className={`text-sm ${styles.text} font-mono`}>
            user@terminal:~$
          </span>
        </div>
        <div className={`text-sm ${styles.text} font-mono`}>
          <span className={styles.prompt}>$</span> echo "Hello, World!"
        </div>
        <div className={`text-sm ${styles.text} font-mono mt-1`}>
          Hello, World!
        </div>
      </div>
    </div>
  );
}
