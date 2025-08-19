'use client';

import { motion } from "motion/react";
import { useLanguage } from '@/contexts/LanguageContext';

export default function AnimatedAbout() {
  const { t } = useLanguage();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h3 className="text-2xl font-semibold text-white mb-6">
          {t('hero.roles.problemSolver')} & {t('hero.roles.toolBuilder')}
        </h3>
        <div className="space-y-4 text-gray-300">
          <p className="whitespace-pre-line">
            {t('about.longDescription')}
          </p>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-6"
      >
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">{t('about.skills')} & Technologies</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h5 className="text-purple-400 font-medium">{t('skills.frontend')}</h5>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>{t('skills.react')}</li>
                <li>{t('skills.typescript')}</li>
                <li>{t('skills.tailwind')}</li>
                <li>Framer Motion</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h5 className="text-purple-400 font-medium">{t('skills.backend')}</h5>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>{t('skills.nodejs')}</li>
                <li>{t('skills.mysql')}</li>
                <li>{t('skills.zustand')}</li>
                <li>{t('skills.apiDevelopment')}</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
