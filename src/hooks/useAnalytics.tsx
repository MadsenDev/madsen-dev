'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface AnalyticsEvent {
  type: 'page_view' | 'interaction' | 'custom';
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

interface AnalyticsConfig {
  enabled: boolean;
  endpoint: string;
  sessionTimeout: number; // in milliseconds
  batchSize: number;
  flushInterval: number; // in milliseconds
}

class PrivacyFriendlyAnalytics {
  private config: AnalyticsConfig;
  private events: AnalyticsEvent[] = [];
  private sessionId: string;
  private lastActivity: number = Date.now();
  private flushTimer: NodeJS.Timeout | null = null;
  private isOnline: boolean = true;
  private listeners: {
    online: () => void;
    offline: () => void;
    visibilityChange: () => void;
    beforeUnload: (event: BeforeUnloadEvent) => void;
  } | null = null;

  constructor(config: AnalyticsConfig) {
    this.config = config;
    this.sessionId = this.generateSessionId();
    this.setupEventListeners();
    this.startFlushTimer();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupEventListeners() {
    this.listeners = {
      online: () => {
        this.isOnline = true;
        this.flushEvents();
      },
      offline: () => {
        this.isOnline = false;
      },
      visibilityChange: () => {
        if (document.hidden) {
          this.flushEvents();
        } else {
          this.lastActivity = Date.now();
        }
      },
      beforeUnload: () => {
        this.flushEvents(true); // Force sync flush
      },
    };

    window.addEventListener('online', this.listeners.online);
    window.addEventListener('offline', this.listeners.offline);
    document.addEventListener('visibilitychange', this.listeners.visibilityChange);
    window.addEventListener('beforeunload', this.listeners.beforeUnload);
  }

  private startFlushTimer() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }

    this.flushTimer = setInterval(() => {
      if (this.events.length > 0) {
        this.flushEvents();
      }
    }, this.config.flushInterval);
  }

  private async flushEvents(sync: boolean = false) {
    if (!this.isOnline || this.events.length === 0) {
      return;
    }

    const eventsToSend = [...this.events];
    this.events = [];

    try {
      const payload = {
        events: eventsToSend,
        userAgent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen: {
          width: screen.width,
          height: screen.height
        },
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      };

      if (sync) {
        // Use sendBeacon for synchronous requests (beforeunload)
        if (navigator.sendBeacon) {
          navigator.sendBeacon(
            this.config.endpoint,
            JSON.stringify(payload)
          );
        }
      } else {
        // Use fetch for asynchronous requests
        await fetch(this.config.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }
    } catch (error) {
      console.warn('Analytics flush failed:', error);
      // Re-add events to queue if they failed to send
      this.events.unshift(...eventsToSend);
    }
  }

  track(event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId'>) {
    if (!this.config.enabled) return;

    const analyticsEvent: AnalyticsEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.sessionId
    };

    this.events.push(analyticsEvent);
    this.lastActivity = Date.now();

    // Flush if batch size is reached
    if (this.events.length >= this.config.batchSize) {
      this.flushEvents();
    }
  }

  trackPageView(path: string, title?: string) {
    this.track({
      type: 'page_view',
      category: 'navigation',
      action: 'page_view',
      label: title ?? path,
      value: 1
    });
  }

  trackInteraction(category: string, action: string, label?: string, value?: number) {
    this.track({
      type: 'interaction',
      category,
      action,
      label,
      value
    });
  }

  trackCustomEvent(name: string, properties?: Record<string, unknown>) {
    this.track({
      type: 'custom',
      category: 'custom',
      action: name,
      label: JSON.stringify(properties)
    });
  }

  setUserId(userId: string) {
    // Update session with user ID
    this.events.forEach(event => {
      event.userId = userId;
    });
  }

  setEnabled(enabled: boolean) {
    this.config = { ...this.config, enabled };

    if (!enabled) {
      this.events = [];
    }
  }

  destroy() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }

    if (this.listeners) {
      window.removeEventListener('online', this.listeners.online);
      window.removeEventListener('offline', this.listeners.offline);
      document.removeEventListener('visibilitychange', this.listeners.visibilityChange);
      window.removeEventListener('beforeunload', this.listeners.beforeUnload);
      this.listeners = null;
    }
    this.flushEvents(true);
  }
}

// Global analytics instance
let analyticsInstance: PrivacyFriendlyAnalytics | null = null;

interface AnalyticsContextValue {
  isEnabled: boolean;
  trackPageView: (path: string, title?: string) => void;
  trackInteraction: (
    category: string,
    action: string,
    label?: string,
    value?: number
  ) => void;
  trackCustomEvent: (name: string, properties?: Record<string, unknown>) => void;
  setConsent: (consent: boolean) => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

const ANALYTICS_CONFIG: Omit<AnalyticsConfig, 'enabled'> = {
  endpoint: '/api/analytics',
  sessionTimeout: 30 * 60 * 1000,
  batchSize: 10,
  flushInterval: 30 * 1000,
};

function getOrCreateAnalytics(enabled: boolean) {
  if (!analyticsInstance) {
    analyticsInstance = new PrivacyFriendlyAnalytics({
      enabled,
      ...ANALYTICS_CONFIG,
    });
  } else {
    analyticsInstance.setEnabled(enabled);
  }

  return analyticsInstance;
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('analytics-consent') === 'true';
    setIsEnabled(consent);
    getOrCreateAnalytics(consent);

    return () => {
      if (analyticsInstance) {
        analyticsInstance.destroy();
        analyticsInstance = null;
      }
    };
  }, []);

  const trackPageView = useCallback((path: string, title?: string) => {
    analyticsInstance?.trackPageView(path, title);
  }, []);

  const trackInteraction = useCallback((
    category: string,
    action: string,
    label?: string,
    value?: number
  ) => {
    analyticsInstance?.trackInteraction(category, action, label, value);
  }, []);

  const trackCustomEvent = useCallback((name: string, properties?: Record<string, unknown>) => {
    analyticsInstance?.trackCustomEvent(name, properties);
  }, []);

  const setConsent = useCallback((consent: boolean) => {
    localStorage.setItem('analytics-consent', consent.toString());
    setIsEnabled(consent);
    getOrCreateAnalytics(consent);
  }, []);

  const value = useMemo<AnalyticsContextValue>(
    () => ({
      isEnabled,
      trackPageView,
      trackInteraction,
      trackCustomEvent,
      setConsent,
    }),
    [isEnabled, trackCustomEvent, trackInteraction, trackPageView, setConsent]
  );

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }

  return context;
}

