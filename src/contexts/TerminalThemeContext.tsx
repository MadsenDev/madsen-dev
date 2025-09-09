'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type TerminalTheme = 'default' | 'matrix' | 'retro' | 'neon';

interface TerminalThemeContextType {
  theme: TerminalTheme;
  setTheme: (theme: TerminalTheme) => void;
  getThemeStyles: () => TerminalThemeStyles;
}

interface TerminalThemeStyles {
  background: string;
  text: string;
  border: string;
  accent: string;
  button: string;
  buttonHover: string;
  input: string;
  prompt: string;
  cursor: string;
  glow?: string;
}

const themeStyles: Record<TerminalTheme, TerminalThemeStyles> = {
  default: {
    background: 'bg-slate-900',
    text: 'text-white',
    border: 'border-slate-700',
    accent: 'text-purple-400',
    button: 'bg-slate-800 hover:bg-slate-700',
    buttonHover: 'hover:bg-slate-700',
    input: 'bg-slate-800/50 border-slate-600/50',
    prompt: 'text-green-400',
    cursor: 'text-white'
  },
  matrix: {
    background: 'bg-black',
    text: 'text-green-400',
    border: 'border-green-500/30',
    accent: 'text-green-300',
    button: 'bg-green-900/20 hover:bg-green-800/30 border border-green-500/30',
    buttonHover: 'hover:bg-green-800/30',
    input: 'bg-black border-green-500/50 text-green-400',
    prompt: 'text-green-400',
    cursor: 'text-green-400',
    glow: 'shadow-green-500/20'
  },
  retro: {
    background: 'bg-amber-50',
    text: 'text-amber-900',
    border: 'border-amber-600',
    accent: 'text-amber-700',
    button: 'bg-amber-100 hover:bg-amber-200 border border-amber-600',
    buttonHover: 'hover:bg-amber-200',
    input: 'bg-amber-50 border-amber-600 text-amber-900',
    prompt: 'text-amber-800',
    cursor: 'text-amber-900'
  },
  neon: {
    background: 'bg-slate-950',
    text: 'text-cyan-400',
    border: 'border-cyan-500/50',
    accent: 'text-pink-400',
    button: 'bg-cyan-900/20 hover:bg-cyan-800/30 border border-cyan-500/50',
    buttonHover: 'hover:bg-cyan-800/30',
    input: 'bg-slate-950 border-cyan-500/50 text-cyan-400',
    prompt: 'text-pink-400',
    cursor: 'text-cyan-400',
    glow: 'shadow-cyan-500/30'
  }
};

const TerminalThemeContext = createContext<TerminalThemeContextType | undefined>(undefined);

export function TerminalThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<TerminalTheme>('default');
  const [mounted, setMounted] = useState(false);

  // Get initial theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('terminal-theme') as TerminalTheme;
    if (storedTheme && Object.keys(themeStyles).includes(storedTheme)) {
      setTheme(storedTheme);
    }
    setMounted(true);
  }, []);

  // Update localStorage when theme changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('terminal-theme', theme);
    }
  }, [theme, mounted]);

  const getThemeStyles = (): TerminalThemeStyles => {
    return themeStyles[theme];
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return <div className="bg-slate-900">{children}</div>;
  }

  return (
    <TerminalThemeContext.Provider value={{ theme, setTheme, getThemeStyles }}>
      <div className={themeStyles[theme].background}>
        {children}
      </div>
    </TerminalThemeContext.Provider>
  );
}

export function useTerminalTheme() {
  const context = useContext(TerminalThemeContext);
  if (context === undefined) {
    // Return a default terminal theme context instead of throwing an error
    // This prevents hydration mismatches and allows graceful fallbacks
    return {
      theme: 'default' as TerminalTheme,
      setTheme: () => {},
      getThemeStyles: () => ({
        background: 'bg-slate-900',
        text: 'text-white',
        border: 'border-slate-700',
        accent: 'text-purple-400',
        button: 'bg-slate-800 hover:bg-slate-700',
        buttonHover: 'hover:bg-slate-700',
        input: 'bg-slate-800/50 border-slate-600/50',
        prompt: 'text-green-400',
        cursor: 'text-white'
      })
    };
  }
  return context;
}
