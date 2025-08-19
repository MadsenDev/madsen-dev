'use client';

import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SiteFooter() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{t('footer.brand.title')}</h3>
            <p className="text-gray-400 mb-2 max-w-md">
              {t('footer.brand.description')}
            </p>
            <p className="text-gray-500 text-sm mb-4">
              {t('footer.brand.orgNumber')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/MadsenDev"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/madsendev/"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:chris@madsens.dev"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {t('nav.projects')}
                </a>
              </li>
              <li>
                <a
                  href="#playground"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {t('nav.playground')}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t('footer.getInTouch')}</h4>
            <div className="space-y-2 text-gray-400">
              <p>
                <a
                  href="mailto:chris@madsens.dev"
                  className="hover:text-white transition-colors duration-300"
                >
                  chris@madsens.dev
                </a>
              </p>
              <p>{t('footer.availableForFreelance')}</p>
              <p>{t('footer.openToOpportunities')}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Madsen Utvikling. {t('footer.copyright')}
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1 mt-2 md:mt-0">
            {t('footer.madeWith')} <Heart size={14} className="text-red-500" /> {t('common.using')} Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
