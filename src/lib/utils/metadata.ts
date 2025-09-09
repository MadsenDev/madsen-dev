import { Language } from '@/lib/translations';

export interface LanguageMetadata {
  title: string;
  description: string;
  keywords: string[];
}

export const getLanguageMetadata = (language: Language): LanguageMetadata => {
  const metadata: Record<Language, LanguageMetadata> = {
    en: {
      title: "Christoffer Madsen - Full-Stack Developer & Problem Solver",
      description: "Full-stack developer specializing in React, Next.js, and modern web technologies. From tech support at Elkjøp to building applications at Gravstellerne, now freelancing to create custom solutions.",
      keywords: [
        "Christoffer Madsen",
        "full-stack developer", 
        "React developer",
        "Next.js developer",
        "TypeScript developer",
        "web development",
        "freelance developer",
        "Norway developer",
        "Elkjøp",
        "Gravstellerne"
      ]
    },
    no: {
      title: "Christoffer Madsen - Full-Stack Utvikler & Problemløser",
      description: "Full-stack utvikler som spesialiserer seg på React, Next.js og moderne webteknologier. Fra teknisk støtte på Elkjøp til å bygge applikasjoner på Gravstellerne, nå frilanser for å lage tilpassede løsninger.",
      keywords: [
        "Christoffer Madsen",
        "full-stack utvikler",
        "React utvikler", 
        "Next.js utvikler",
        "TypeScript utvikler",
        "web utvikling",
        "frilans utvikler",
        "norsk utvikler",
        "Elkjøp",
        "Gravstellerne"
      ]
    },
    es: {
      title: "Christoffer Madsen - Desarrollador Full-Stack y Solucionador de Problemas",
      description: "Desarrollador full-stack especializado en React, Next.js y tecnologías web modernas. Desde soporte técnico en Elkjøp hasta construir aplicaciones en Gravstellerne, ahora freelance para crear soluciones personalizadas.",
      keywords: [
        "Christoffer Madsen",
        "desarrollador full-stack",
        "desarrollador React",
        "desarrollador Next.js", 
        "desarrollador TypeScript",
        "desarrollo web",
        "desarrollador freelance",
        "desarrollador Noruega",
        "Elkjøp",
        "Gravstellerne"
      ]
    },
    fr: {
      title: "Christoffer Madsen - Développeur Full-Stack et Résolveur de Problèmes",
      description: "Développeur full-stack spécialisé dans React, Next.js et les technologies web modernes. Du support technique chez Elkjøp à la construction d'applications chez Gravstellerne, maintenant freelance pour créer des solutions personnalisées.",
      keywords: [
        "Christoffer Madsen",
        "développeur full-stack",
        "développeur React",
        "développeur Next.js",
        "développeur TypeScript", 
        "développement web",
        "développeur freelance",
        "développeur Norvège",
        "Elkjøp",
        "Gravstellerne"
      ]
    },
    de: {
      title: "Christoffer Madsen - Full-Stack Entwickler und Problemlöser",
      description: "Full-Stack Entwickler spezialisiert auf React, Next.js und moderne Webtechnologien. Vom technischen Support bei Elkjøp bis zum Aufbau von Anwendungen bei Gravstellerne, jetzt freiberuflich tätig für maßgeschneiderte Lösungen.",
      keywords: [
        "Christoffer Madsen",
        "Full-Stack Entwickler",
        "React Entwickler",
        "Next.js Entwickler",
        "TypeScript Entwickler",
        "Webentwicklung",
        "Freelance Entwickler", 
        "Norwegen Entwickler",
        "Elkjøp",
        "Gravstellerne"
      ]
    }
  };

  return metadata[language];
};

export const generateStructuredData = (language: Language) => {
  const meta = getLanguageMetadata(language);
  
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Christoffer Madsen",
    "jobTitle": language === 'no' ? "Full-Stack Utvikler" : 
                language === 'es' ? "Desarrollador Full-Stack" :
                language === 'fr' ? "Développeur Full-Stack" :
                language === 'de' ? "Full-Stack Entwickler" :
                "Full-Stack Developer",
    "description": meta.description,
    "url": "https://madsens.dev",
    "image": "https://madsens.dev/images/madsen-dev.png",
    "sameAs": [
      "https://github.com/MadsenDev",
      "https://www.linkedin.com/in/madsendev/"
    ],
    "worksFor": [
      {
        "@type": "Organization",
        "name": "Gravstellerne AS",
        "url": "https://gravstellerne.no"
      },
      {
        "@type": "Organization", 
        "name": "Elkjøp Halden"
      }
    ],
    "alumniOf": "Elkjøp Halden",
    "knowsAbout": [
      "React",
      "Next.js", 
      "TypeScript",
      "Node.js",
      "Web Development",
      "Full-Stack Development"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NO"
    }
  };
};
