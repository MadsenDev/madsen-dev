'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useSearchParams } from 'next/navigation';
import { getLanguageUrl, getAvailableLanguages } from '@/lib/utils/language';

export default function TestLanguagePage() {
  const { language, setLanguage } = useLanguage();
  const searchParams = useSearchParams();
  const languages = getAvailableLanguages();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Language URL Test</h1>
        
        <div className="space-y-6">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Current State</h2>
            <p><strong>Current Language:</strong> {language}</p>
            <p><strong>URL Search Params:</strong> {searchParams.toString() || 'none'}</p>
            <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'SSR'}</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Language URLs</h2>
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.code} className="flex items-center gap-4">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                  <code className="text-sm bg-slate-700 px-2 py-1 rounded">
                    {getLanguageUrl('/test-lang', lang.code, searchParams)}
                  </code>
                  <button
                    onClick={() => setLanguage(lang.code)}
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm transition-colors"
                  >
                    Switch
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Test Links</h2>
            <div className="space-y-2">
              <a 
                href="/test-lang" 
                className="block text-blue-400 hover:text-blue-300"
              >
                Default (English)
              </a>
              <a 
                href="/test-lang?lang=no" 
                className="block text-blue-400 hover:text-blue-300"
              >
                Norwegian
              </a>
              <a 
                href="/test-lang?lang=es" 
                className="block text-blue-400 hover:text-blue-300"
              >
                Spanish
              </a>
              <a 
                href="/test-lang?lang=fr" 
                className="block text-blue-400 hover:text-blue-300"
              >
                French
              </a>
              <a 
                href="/test-lang?lang=de" 
                className="block text-blue-400 hover:text-blue-300"
              >
                German
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
