'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTouchGestures, hapticFeedback } from '@/hooks/useTouchGestures';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'playground', label: 'Playground' },
  { id: 'contact', label: 'Contact' }
];

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update current index based on scroll position
  useEffect(() => {
    const updateCurrentSection = () => {
      const sectionIds = ['home', 'about', 'projects', 'blog', 'playground', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setCurrentIndex(i);
          break;
        }
      }
    };

    updateCurrentSection();
    window.addEventListener('scroll', updateCurrentSection);
    return () => window.removeEventListener('scroll', updateCurrentSection);
  }, []);

  const handleSwipeLeft = () => {
    if (currentIndex < sections.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollToSection(sections[nextIndex].id);
      hapticFeedback.light();
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      scrollToSection(sections[prevIndex].id);
      hapticFeedback.light();
    }
  };

  const { touchHandlers } = useTouchGestures({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    threshold: 50
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      hapticFeedback.medium();
    }
    setIsOpen(false);
  };

  const currentSectionId = sections[currentIndex]?.id;

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          hapticFeedback.light();
        }}
        className="fixed top-4 right-4 z-50 p-3 bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg text-white lg:hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-slate-900/95 backdrop-blur-sm border-l border-slate-700/50 z-50 lg:hidden"
              {...touchHandlers}
            >
              <div className="p-6 pt-20">
                <h2 className="text-xl font-bold text-white mb-6">Navigation</h2>
                
                <nav className="space-y-2">
                  {sections.map((section, index) => (
                    <motion.button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                        currentSectionId === section.id
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-300 hover:bg-slate-800/50 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{section.label}</span>
                        {currentIndex === index && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </nav>

                {/* Swipe Navigation Hints */}
                <div className="mt-8 p-4 bg-slate-800/50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Swipe Navigation</h3>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <ChevronLeft size={16} />
                      <span>Previous</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Next</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Swipe Indicators */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 lg:hidden">
        <div className="flex items-center gap-2 bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2">
          {sections.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-purple-400' : 'bg-slate-600'
              }`}
              animate={{
                scale: index === currentIndex ? 1.2 : 1,
                opacity: index === currentIndex ? 1 : 0.5
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
