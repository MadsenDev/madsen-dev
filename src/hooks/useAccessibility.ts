'use client';

import { useEffect, useRef, useCallback } from 'react';

interface AccessibilityOptions {
  announceChanges?: boolean;
  skipToContent?: boolean;
  focusManagement?: boolean;
}

export function useAccessibility(options: AccessibilityOptions = {}) {
  const {
    announceChanges = true,
    skipToContent = true,
    focusManagement = true
  } = options;

  const announcerRef = useRef<HTMLDivElement>(null);
  const skipLinkRef = useRef<HTMLAnchorElement>(null);

  // Create live region for screen reader announcements
  useEffect(() => {
    if (announceChanges && !announcerRef.current) {
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      announcer.id = 'live-announcer';
      document.body.appendChild(announcer);
      announcerRef.current = announcer;
    }
  }, [announceChanges]);

  // Create skip link
  useEffect(() => {
    if (skipToContent && !skipLinkRef.current) {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.textContent = 'Skip to main content';
      skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-lg z-50';
      skipLink.setAttribute('tabindex', '1');
      document.body.insertBefore(skipLink, document.body.firstChild);
      skipLinkRef.current = skipLink;
    }
  }, [skipToContent]);

  const announce = useCallback((message: string) => {
    if (announcerRef.current) {
      announcerRef.current.textContent = message;
      // Clear after announcement
      setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = '';
        }
      }, 1000);
    }
  }, []);

  const trapFocus = useCallback((element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  }, []);

  const manageFocus = useCallback((element: HTMLElement, shouldFocus: boolean) => {
    if (focusManagement) {
      if (shouldFocus) {
        element.focus();
      } else {
        element.blur();
      }
    }
  }, [focusManagement]);

  return {
    announce,
    trapFocus,
    manageFocus
  };
}

// Keyboard navigation utilities
export const keyboardNavigation = {
  // Handle arrow key navigation for lists
  handleArrowKeys: (e: KeyboardEvent, items: HTMLElement[], currentIndex: number) => {
    let newIndex = currentIndex;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        newIndex = Math.min(currentIndex + 1, items.length - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        newIndex = Math.max(currentIndex - 1, 0);
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = items.length - 1;
        break;
    }
    
    if (newIndex !== currentIndex) {
      items[newIndex]?.focus();
      return newIndex;
    }
    
    return currentIndex;
  },

  // Handle escape key
  handleEscape: (e: KeyboardEvent, callback: () => void) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      callback();
    }
  },

  // Handle enter and space keys
  handleActivation: (e: KeyboardEvent, callback: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback();
    }
  }
};

// Screen reader utilities
export const screenReader = {
  // Hide element from screen readers
  hide: (element: HTMLElement) => {
    element.setAttribute('aria-hidden', 'true');
  },

  // Show element to screen readers
  show: (element: HTMLElement) => {
    element.removeAttribute('aria-hidden');
  },

  // Set element as live region
  setLiveRegion: (element: HTMLElement, politeness: 'polite' | 'assertive' = 'polite') => {
    element.setAttribute('aria-live', politeness);
    element.setAttribute('aria-atomic', 'true');
  },

  // Set element as landmark
  setLandmark: (element: HTMLElement, role: string, label?: string) => {
    element.setAttribute('role', role);
    if (label) {
      element.setAttribute('aria-label', label);
    }
  }
};
