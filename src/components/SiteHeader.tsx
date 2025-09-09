'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Command, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import CommandPalette from './CommandPalette';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function SiteHeader() {
  const { t } = useLanguage();
  const { trackInteraction } = useAnalytics();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commandItems = [
    {
      id: 'home',
      title: t('commandItems.home.title'),
      description: t('commandItems.home.description'),
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    {
      id: 'about',
      title: t('commandItems.about.title'),
      description: t('commandItems.about.description'),
      action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: 'projects',
      title: t('commandItems.projects.title'),
      description: t('commandItems.projects.description'),
      action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: 'playground',
      title: t('commandItems.playground.title'),
      description: t('commandItems.playground.description'),
      action: () => document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: 'contact',
      title: t('commandItems.contact.title'),
      description: t('commandItems.contact.description'),
              action: () => window.open('mailto:chris@madsens.dev', '_blank')
    },
    {
      id: 'github',
      title: t('commandItems.github.title'),
      description: t('commandItems.github.description'),
      action: () => window.open('https://github.com/MadsenDev', '_blank')
    }
  ];

  const navItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#blog', label: 'Blog' },
    { href: '#playground', label: t('nav.playground') },
    { href: '#contact', label: t('nav.contact') }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl' 
            : 'bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-transparent backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center space-x-3 group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <Image 
                  src="/images/logo.svg" 
                  alt="Christoffer Madsen Logo" 
                  width={32}
                  height={32}
                  priority
                  className="w-full h-full object-contain transition-all duration-300"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                {t('brand.title')}
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5 group"
                  whileHover={{ y: -1 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Command Palette Button */}
              <motion.button
                onClick={() => {
                  setIsCommandPaletteOpen(true);
                  trackInteraction('navigation', 'command_palette_open');
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 border border-slate-600/50 rounded-lg hover:border-purple-500/50 hover:bg-purple-500/10 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Command size={16} />
                <span className="hidden sm:inline">⌘K</span>
              </motion.button>
              
              {/* Language Switcher */}
              <LanguageSwitcher />
              
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Social Links */}
              <div className="flex items-center space-x-2 ml-2">
                <motion.a
                  href="https://github.com/MadsenDev"
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5"
                  aria-label="GitHub"
                  whileHover={{ scale: 1.1, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={18} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/madsendev/"
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5"
                  aria-label="LinkedIn"
                  whileHover={{ scale: 1.1, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={18} />
                </motion.a>
                <motion.a
                  href="mailto:chris@madsens.dev"
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5"
                  aria-label="Email"
                  whileHover={{ scale: 1.1, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={18} />
                </motion.a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <motion.nav
            initial={false}
            animate={{ 
              height: isMenuOpen ? 'auto' : 0,
              opacity: isMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-slate-700/50"
          >
            <div className="py-6 space-y-3">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 rounded-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.a>
              ))}
              
              <div className="flex items-center justify-center space-x-4 pt-6 border-t border-slate-700/50">
                <motion.a
                  href="https://github.com/MadsenDev"
                  className="p-3 text-gray-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5"
                  aria-label="GitHub"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/madsendev/"
                  className="p-3 text-gray-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5"
                  aria-label="LinkedIn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a
                  href="mailto:chris@madsens.dev"
                  className="p-3 text-gray-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5"
                  aria-label="Email"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={20} />
                </motion.a>
              </div>
            </div>
          </motion.nav>
        </div>
      </motion.header>

      <CommandPalette
        items={commandItems}
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </>
  );
}
