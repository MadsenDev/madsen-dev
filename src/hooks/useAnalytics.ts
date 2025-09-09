'use client';

import { useEffect, useCallback, useState } from 'react';

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
    // Track online/offline status
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushEvents();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.flushEvents();
      } else {
        this.lastActivity = Date.now();
      }
    });

    // Track beforeunload to flush events
    window.addEventListener('beforeunload', () => {
      this.flushEvents(true); // Force sync flush
    });
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
      label: path,
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

  trackCustomEvent(name: string, properties?: Record<string, any>) {
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

  destroy() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.flushEvents(true);
  }
}

// Global analytics instance
let analyticsInstance: PrivacyFriendlyAnalytics | null = null;

export function useAnalytics() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Initialize analytics with user consent
    const consent = localStorage.getItem('analytics-consent');
    const enabled = consent === 'true';

    if (!analyticsInstance) {
      analyticsInstance = new PrivacyFriendlyAnalytics({
        enabled,
        endpoint: '/api/analytics', // You'll need to create this API endpoint
        sessionTimeout: 30 * 60 * 1000, // 30 minutes
        batchSize: 10,
        flushInterval: 30 * 1000 // 30 seconds
      });
    }

    setIsEnabled(enabled);

    return () => {
      // Cleanup on unmount
      if (analyticsInstance) {
        analyticsInstance.destroy();
        analyticsInstance = null;
      }
    };
  }, []);

  const trackPageView = useCallback((path: string, title?: string) => {
    if (analyticsInstance) {
      analyticsInstance.trackPageView(path, title);
    }
  }, []);

  const trackInteraction = useCallback((
    category: string,
    action: string,
    label?: string,
    value?: number
  ) => {
    if (analyticsInstance) {
      analyticsInstance.trackInteraction(category, action, label, value);
    }
  }, []);

  const trackCustomEvent = useCallback((name: string, properties?: Record<string, any>) => {
    if (analyticsInstance) {
      analyticsInstance.trackCustomEvent(name, properties);
    }
  }, []);

  const setConsent = useCallback((consent: boolean) => {
    localStorage.setItem('analytics-consent', consent.toString());
    setIsEnabled(consent);
    
    if (analyticsInstance) {
      // Reinitialize with new consent
      analyticsInstance.destroy();
      analyticsInstance = new PrivacyFriendlyAnalytics({
        enabled: consent,
        endpoint: '/api/analytics',
        sessionTimeout: 30 * 60 * 1000,
        batchSize: 10,
        flushInterval: 30 * 1000
      });
    }
  }, []);

  return {
    isEnabled,
    trackPageView,
    trackInteraction,
    trackCustomEvent,
    setConsent
  };
}

