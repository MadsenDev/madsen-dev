'use client';

import { motion } from 'motion/react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAvailableLanguages } from '@/lib/utils/language';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const languages = getAvailableLanguages();

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative group">
      <motion.button
        className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Language switcher"
      >
        <Globe size={16} />
        <span className="text-sm font-medium">{currentLanguage?.flag}</span>
      </motion.button>

      {/* Dropdown */}
      <div className="absolute top-full right-0 mt-2 bg-slate-900 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[120px]">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-200 ${
              language === lang.code
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-slate-800'
            }`}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-base">{lang.flag}</span>
            <span>{lang.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
