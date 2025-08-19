'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { Language, useTranslations } from '@/lib/translations/index';

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
  
  // Get initial language from URL params, localStorage, or browser preference
  const getInitialLanguage = (): Language => {
    // First, check URL params
    const urlLang = searchParams.get('lang') as Language;
    if (urlLang && ['en', 'no', 'es', 'fr', 'de'].includes(urlLang)) {
      return urlLang;
    }
    
    // Then, check localStorage
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('preferred-language') as Language;
      if (storedLang && ['en', 'no', 'es', 'fr', 'de'].includes(storedLang)) {
        return storedLang;
      }
    }
    
    // Finally, check browser language
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang.startsWith('no')) return 'no';
      if (browserLang.startsWith('es')) return 'es';
      if (browserLang.startsWith('fr')) return 'fr';
      if (browserLang.startsWith('de')) return 'de';
    }
    
    return 'en';
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const translations = useTranslations(language);

  // Update language when URL params change (but only if it's different)
  useEffect(() => {
    const urlLang = searchParams.get('lang') as Language;
    if (urlLang && ['en', 'no', 'es', 'fr', 'de'].includes(urlLang) && urlLang !== language) {
      // Only update if the URL language is different from current state
      setLanguage(urlLang);
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-language', urlLang);
      }
    }
  }, [searchParams]); // Remove language from dependencies to prevent loops

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        const englishTranslations = useTranslations('en');
        value = getNestedValue(englishTranslations, keys);
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const getNestedValue = (obj: any, keys: string[]): any => {
    let value = obj;
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return undefined;
      }
    }
    return value;
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
