import { Language } from '@/lib/translations';

/**
 * Generate a language-specific URL
 * @param pathname - The current pathname
 * @param language - The target language
 * @param currentParams - Current search parameters (optional)
 * @returns URL with language parameter
 */
export function getLanguageUrl(pathname: string, language: Language, currentParams?: URLSearchParams): string {
  const params = currentParams ? new URLSearchParams(currentParams.toString()) : new URLSearchParams();
  
  if (language === 'en') {
    // Remove lang param for English (default)
    params.delete('lang');
  } else {
    params.set('lang', language);
  }
  
  return params.toString() ? `${pathname}?${params.toString()}` : pathname;
}

/**
 * Get language from URL search parameters
 * @param searchParams - URL search parameters
 * @returns Language code or null if not found/invalid
 */
export function getLanguageFromUrl(searchParams: URLSearchParams): Language | null {
  const lang = searchParams.get('lang') as Language;
  if (lang && ['en', 'no', 'es', 'fr', 'de'].includes(lang)) {
    return lang;
  }
  return null;
}

/**
 * Get language metadata for SEO
 * @param language - The language code
 * @returns Object with language metadata
 */
export function getLanguageMetadata(language: Language) {
  const metadata = {
    en: { name: 'English', code: 'en', hreflang: 'en-US' },
    no: { name: 'Norsk', code: 'no', hreflang: 'nb-NO' },
    es: { name: 'Español', code: 'es', hreflang: 'es-ES' },
    fr: { name: 'Français', code: 'fr', hreflang: 'fr-FR' },
    de: { name: 'Deutsch', code: 'de', hreflang: 'de-DE' },
  };
  
  return metadata[language];
}

/**
 * Get all available languages with metadata
 * @returns Array of language objects with metadata
 */
export function getAvailableLanguages() {
  return [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸', hreflang: 'en-US' },
    { code: 'no' as Language, name: 'Norsk', flag: '🇳🇴', hreflang: 'nb-NO' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸', hreflang: 'es-ES' },
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷', hreflang: 'fr-FR' },
    { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪', hreflang: 'de-DE' },
  ];
}
