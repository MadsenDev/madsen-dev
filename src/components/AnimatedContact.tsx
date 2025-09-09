'use client';

import { motion } from "motion/react";
import { Mail, MapPin, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import ContactForm from './ContactForm';

export default function AnimatedContact() {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-8"
      >
        <div>
          <h3 className="text-2xl font-semibold text-white mb-6">
            {t('contact.letsWorkTogether')}
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        {/* Contact Details */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-start gap-4"
          >
            <div className="p-3 bg-purple-600/20 rounded-lg">
              <Mail className="text-purple-400" size={20} />
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">{t('contact.labels.email')}</h4>
              <a 
                href="mailto:chris@madsens.dev" 
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
              >
                chris@madsens.dev
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-start gap-4"
          >
            <div className="p-3 bg-purple-600/20 rounded-lg">
              <MapPin className="text-purple-400" size={20} />
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">{t('contact.labels.location')}</h4>
              <p className="text-gray-400">Halden, Norway</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-start gap-4"
          >
            <div className="p-3 bg-purple-600/20 rounded-lg">
              <Clock className="text-purple-400" size={20} />
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">{t('contact.labels.responseTime')}</h4>
              <p className="text-gray-400">{t('contact.labels.usuallyWithin')}</p>
            </div>
          </motion.div>
        </div>

        {/* Availability Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-400" size={20} />
            <div>
              <div className="text-green-400 font-medium">{t('contact.availableFor')}</div>
              <div className="text-green-300 text-sm">{t('contact.openTo')}</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Contact Form (with overlay) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="relative">
          {/* Dimmed/blurred form beneath */}
          <div aria-hidden="true" className="pointer-events-none select-none blur-[1px] opacity-60">
            <ContactForm />
          </div>

          {/* Fancy overlay */}
          <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
            {/* Decorative glows */}
            <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl" />

            <div className="relative w-full max-w-xl">
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-yellow-500/40 via-purple-500/40 to-pink-500/40 blur opacity-70" />
              <div className="relative rounded-2xl border border-slate-700/70 bg-slate-900/70 backdrop-blur-xl p-6 shadow-2xl">
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-lg bg-yellow-500/15 p-3">
                    <AlertTriangle className="text-yellow-300" size={22} />
                  </div>
                  <div className="text-slate-200">
                    <h4 className="text-lg font-semibold mb-1">{t('contact.outOfOrder.title')}</h4>
                    <p className="text-sm text-gray-300 mb-4">
                      {t('contact.outOfOrder.description')}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href="mailto:chris@madsens.dev"
                        className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-white shadow-lg transition hover:from-purple-500 hover:to-pink-500"
                      >
                        <Mail size={18} />
                        <span>chris@madsens.dev</span>
                      </a>
                      <span className="text-xs text-gray-400">{t('contact.outOfOrder.replySLA')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
