'use client';

import { useState, useEffect } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

export function AnalyticsConsent() {
  const { isEnabled, setConsent } = useAnalytics();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('analytics-consent');
    if (consent === null) {
      setShowBanner(true);
    }
  }, []);

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-slate-900 border border-slate-700 rounded-lg p-4 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-2">Privacy & Analytics</h3>
          <p className="text-gray-300 text-sm mb-4">
            We use privacy-friendly analytics to improve your experience. No personal data is collected or shared.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setConsent(true);
                setShowBanner(false);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Accept
            </button>
            <button
              onClick={() => {
                setConsent(false);
                setShowBanner(false);
              }}
              className="px-4 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-colors"
            >
              Decline
            </button>
          </div>
        </div>
        <button
          onClick={() => setShowBanner(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
    </div>
  );
}
