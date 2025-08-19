'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// Characters for the flipping animation
const flipCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export default function Hero() {
  const { t, translations } = useLanguage();
  const [currentRole, setCurrentRole] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const roles = [
    translations.hero.roles.fullstack,
    translations.hero.roles.techSupport,
    translations.hero.roles.problemSolver,
    translations.hero.roles.toolBuilder
  ];

  // Animated character component
  const AnimatedChar = ({ char, index }: { char: string; index: number }) => {
    const [displayChar, setDisplayChar] = useState(char);
    const [isFlipping, setIsFlipping] = useState(false);

    // Don't animate spaces
    const shouldAnimate = char !== ' ' && char.trim() !== '';

    useEffect(() => {
      if (isAnimating && shouldAnimate) {
        setIsFlipping(true);
        let flipCount = 0;
        const maxFlips = 6 + Math.floor(Math.random() * 4); // 6-9 flips
        const flipInterval = setInterval(() => {
          if (flipCount < maxFlips) {
            setDisplayChar(flipCharacters[Math.floor(Math.random() * flipCharacters.length)]);
            flipCount++;
          } else {
            setDisplayChar(char);
            setIsFlipping(false);
            clearInterval(flipInterval);
          }
        }, 60 + (index * 8)); // Stagger the animation based on character position

        return () => clearInterval(flipInterval);
      }
    }, [char, isAnimating, index, shouldAnimate]);

    // For spaces, render them with explicit width
    if (!shouldAnimate) {
      return (
        <span 
          className="inline-block bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent" 
          style={{ 
            width: char === ' ' ? '0.25em' : 'auto',
            whiteSpace: 'pre'
          }}
        >
          {char}
        </span>
      );
    }

    return (
      <motion.span
        key={`${char}-${index}-${isAnimating}`}
        initial={{ rotateX: 0 }}
        animate={{ 
          rotateX: isFlipping ? [0, 90, 0] : 0,
          scale: isFlipping ? [1, 1.1, 1] : 1
        }}
        transition={{ 
          duration: isFlipping ? 0.08 : 0.3,
          ease: "easeInOut"
        }}
        className="inline-block bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"
        style={{ 
          transformStyle: 'preserve-3d',
          transformOrigin: 'center bottom',
          whiteSpace: 'pre'
        }}
      >
        {displayChar}
      </motion.span>
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length);
          setIsAnimating(false);
        }, 800); // Wait for animation to complete
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length, isAnimating]);

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950">
        {/* Animated Radial Gradients */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.15),transparent_50%)]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.1),transparent_50%)]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.08),transparent_50%)]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Animated Noise Texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:20px_20px]" />
      </div>

      {/* Animated Grid Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${15 + (i * 11) % 70}%`,
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              background: i % 3 === 0 
                ? 'linear-gradient(45deg, #a855f7, #ec4899)' 
                : i % 3 === 1 
                ? 'linear-gradient(45deg, #ec4899, #3b82f6)' 
                : 'linear-gradient(45deg, #3b82f6, #a855f7)',
            }}
            animate={{
              y: [0, -40 - (i * 2), 0],
              x: [0, (i % 2 === 0 ? 10 : -10), 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + (i % 3) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Subtle Wave Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/5 to-purple-500/5 rounded-full"
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
            delay: 10,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-lg md:text-xl text-purple-300 font-medium tracking-wide">
              {t('hero.welcome')}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                {t('hero.greeting')}
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                Christoffer
              </span>
            </h1>
          </motion.div>

          {/* Role Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <motion.div 
              className="text-xl md:text-2xl text-gray-300 font-medium h-10 flex items-center justify-center"
              layout
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                minWidth: 'fit-content',
                padding: '0 1rem'
              }}
            >
                          <div className="flex items-center justify-center">
              {roles[currentRole].split('').map((char, index) => (
                <AnimatedChar key={`${currentRole}-${index}`} char={char} index={index} />
              ))}
            </div>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl -z-10" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center space-x-6"
          >
            {[
              { href: "https://github.com/MadsenDev", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/madsendev/", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:chris@madsens.dev", icon: Mail, label: "Email" }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="group p-3 text-gray-400 hover:text-white transition-all duration-300 rounded-full hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <motion.button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-purple-500/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{t('hero.viewProjects')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
            
            <motion.button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-6 py-3 border-2 border-purple-500/50 text-purple-300 font-semibold rounded-xl transition-all duration-300 hover:border-purple-400 hover:text-purple-200 hover:bg-purple-500/10 backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.getInTouch')}
            </motion.button>
          </motion.div>
        </motion.div>
        
      </div>

      {/* Scroll Indicator - Positioned outside main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-1 text-gray-400"
        >
          <span className="text-xs font-medium">{t('hero.scrollToExplore')}</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
