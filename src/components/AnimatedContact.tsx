'use client';

import { motion } from "motion/react";
import { useLanguage } from '@/contexts/LanguageContext';

export default function AnimatedContact() {
  const { t } = useLanguage();
  return (
    <div className="max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-6"
      >
        <p className="text-lg text-gray-300">
          {t('contact.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
                            href="mailto:chris@madsens.dev"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
          >
            {t('contact.emailMe')}
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
          >
            View GitHub
          </a>
        </div>
      </motion.div>
    </div>
  );
}
