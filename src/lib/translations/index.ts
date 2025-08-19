import { en } from './en';
import { no } from './no';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';

export type Language = 'en' | 'no' | 'es' | 'fr' | 'de';

export interface Translations {
  nav: {
    home: string;
    about: string;
    projects: string;
    playground: string;
    contact: string;
  };
  
  hero: {
    welcome: string;
    greeting: string;
    roles: {
      fullstack: string;
      techSupport: string;
      problemSolver: string;
      toolBuilder: string;
    };
    description: string;
    viewProjects: string;
    getInTouch: string;
    scrollToExplore: string;
  };
  
  about: {
    title: string;
    subtitle: string;
    description: string;
    longDescription: string;
    skills: string;
    experience: string;
  };
  
  projects: {
    title: string;
    subtitle: string;
    viewDemo: string;
    viewCode: string;
    moreTechnologies: string;
    categories: {
      work: string;
      personal: string;
      freelance: string;
    };
  };
  
  playground: {
    title: string;
    subtitle: string;
    description: string;
    modes: {
      terminal: string;
      typing: string;
      colors: string;
    };
    terminal: {
      placeholder: string;
      help: string;
      commands: {
        about: string;
        projects: string;
        contact: string;
        help: string;
        clear: string;
        game: string;
        matrix: string;
        music: string;
        coffee: string;
        love: string;
        rocket: string;
        target: string;
        trophy: string;
        party: string;
        status: string;
      };
    };
  };
  
  contact: {
    title: string;
    subtitle: string;
    description: string;
    emailMe: string;
    availableFor: string;
    openTo: string;
  };
  
  footer: {
    brand: {
      title: string;
      description: string;
      orgNumber: string;
    };
    quickLinks: string;
    getInTouch: string;
    availableForFreelance: string;
    openToOpportunities: string;
    copyright: string;
    madeWith: string;
  };
  
  commandPalette: {
    placeholder: string;
    searchCommands: string;
    noCommandsFound: string;
  };
  
  projectDescriptions: {
    gravstellerne: string;
    portfolio: string;
    supportTools: string;
    secretInformant: string;
    knowledgeBase: string;
    startpage: string;
    elkjopReport: string;
    dreamPixel: string;
  };
  
  // Terminal & Commands
  terminal: {
    welcome: string;
    helpText: string;
    commandNotFound: string;
    quickCommands: string;
    status: {
      title: string;
      terminalStatus: string;
      commandsAvailable: string;
      allCommandsUnlocked: string;
    };
    game: {
      title: string;
      description: string;
      commands: string;
    };
    projects: {
      title: string;
      gravstellerne: {
        title: string;
        description: string;
        tech: string;
        status: string;
      };
      portfolio: {
        title: string;
        description: string;
        tech: string;
        status: string;
      };
      supportTools: {
        title: string;
        description: string;
        tech: string;
        status: string;
      };
      freelance: {
        title: string;
        description: string;
        tech: string;
        status: string;
      };
    };
    contact: {
      title: string;
      email: string;
      github: string;
      linkedin: string;
      available: string;
      openTo: string;
    };
  };
  
  // Command Palette Items
  commandItems: {
    home: {
      title: string;
      description: string;
    };
    about: {
      title: string;
      description: string;
    };
    projects: {
      title: string;
      description: string;
    };
    playground: {
      title: string;
      description: string;
    };
    contact: {
      title: string;
      description: string;
    };
    github: {
      title: string;
      description: string;
    };
  };
  
  // Skills & Technologies
  skills: {
    frontend: string;
    backend: string;
    react: string;
    nextjs: string;
    typescript: string;
    tailwind: string;
    nodejs: string;
    express: string;
    mysql: string;
    indexeddb: string;
    zustand: string;
    apiDevelopment: string;
  };
  
  // Timeline
  timeline: {
    title: string;
    elkjøp: {
      title: string;
      company: string;
      period: string;
      description: string;
      skills: string;
    };
    gravstellerne: {
      title: string;
      company: string;
      period: string;
      description: string;
      skills: string;
    };
    freelance: {
      title: string;
      company: string;
      period: string;
      description: string;
      skills: string;
    };
    journey: string;
  };
  
  // Brand
  brand: {
    title: string;
  };
  
  common: {
    loading: string;
    loadingDots: string;
    using: string;
  };
}

export const translations: Record<Language, Translations> = {
  en,
  no,
  es,
  fr,
  de,
};

// Hook for using translations
export function useTranslations(language: Language = 'en') {
  return translations[language];
}

// Utility function to get translation
export function t(language: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if translation not found
      const englishTranslations = translations['en'];
      value = getNestedValue(englishTranslations, keys);
      break;
    }
  }
  
  return typeof value === 'string' ? value : key;
}

function getNestedValue(obj: any, keys: string[]): any {
  let value = obj;
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return undefined;
    }
  }
  return value;
}
