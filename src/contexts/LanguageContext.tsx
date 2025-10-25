'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { Language, useTranslations } from '@/lib/translations/index';

const SUPPORTED_LANGUAGES: Language[] = ['en', 'no', 'es', 'fr', 'de'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translations: ReturnType<typeof useTranslations>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const urlLanguage = searchParams.get('lang') as Language | null;

  const detectLanguage = useCallback((): Language => {
    const urlLang = searchParams.get('lang') as Language | null;
    if (urlLang && SUPPORTED_LANGUAGES.includes(urlLang)) {
      return urlLang;
    }

    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('preferred-language') as Language | null;
      if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang)) {
        return storedLang;
      }

      const browserLang = navigator.language;
      if (browserLang.startsWith('no')) return 'no';
      if (browserLang.startsWith('es')) return 'es';
      if (browserLang.startsWith('fr')) return 'fr';
      if (browserLang.startsWith('de')) return 'de';
    }

    return 'en';
  }, [searchParams]);

  const [language, setLanguage] = useState<Language>(() => (
    urlLanguage && SUPPORTED_LANGUAGES.includes(urlLanguage) ? urlLanguage : 'en'
  ));
  const translations = useTranslations(language);

  useEffect(() => {
    const detectedLanguage = detectLanguage();
    setLanguage((prev) => {
      if (prev === detectedLanguage) {
        return prev;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-language', detectedLanguage);
      }

      return detectedLanguage;
    });
  }, [detectLanguage]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback to key if translation not found
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };



  // Update URL and localStorage when language changes
  const updateLanguage = (newLanguage: Language) => {
    // Don't update if it's the same language
    if (newLanguage === language) return;
    
    setLanguage(newLanguage);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', newLanguage);
    }
    
    // Update URL params using window.history to avoid React router conflicts
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(searchParams.toString());
      if (newLanguage === 'en') {
        // Remove lang param for English (default)
        params.delete('lang');
      } else {
        params.set('lang', newLanguage);
      }
      
      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      window.history.replaceState(null, '', newUrl);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
