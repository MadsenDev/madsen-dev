export interface Project {
  id: string;
  title: string;
  descriptionKey: string; // Key for translation instead of hardcoded description
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category: 'work' | 'personal' | 'freelance';
}

export const projects: Project[] = [
  {
    id: 'gravstellerne-platform',
    title: 'Gravstellerne Platform',
    descriptionKey: 'projectDescriptions.gravstellerne',
    technologies: ['React', 'TypeScript', 'Node.js', 'Fastify', 'Prisma', 'MySQL', 'Firebase', 'Google Maps API', 'PWA', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Query', 'Zustand'],
    image: '/images/gravstellerne.png',
    liveUrl: undefined,
    githubUrl: undefined,
    featured: true,
    category: 'work'
  },
  {
    id: 'madsens-dev',
    title: 'madsens.dev Portfolio',
    descriptionKey: 'projectDescriptions.portfolio',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Motion', 'Lucide React'],
    image: '/images/madsen-dev.png',
    liveUrl: 'https://madsens.dev',
    githubUrl: 'https://github.com/MadsenDev/madsen-dev',
    featured: true,
    category: 'personal'
  },
  {
    id: 'localhost-hub',
    title: 'Localhost Hub',
    descriptionKey: 'projectDescriptions.localhostHub',
    technologies: ['Electron', 'React', 'TypeScript', 'Vite', 'Node.js', 'IPC', 'Process Management', 'Git', 'File System'],
    image: '/images/localhost-hub.png',
    liveUrl: undefined,
    githubUrl: undefined,
    featured: true,
    category: 'personal'
  },
  {
    id: 'tech-support-tools',
    title: 'Tech Support Tools',
    descriptionKey: 'projectDescriptions.supportTools',
    technologies: ['Electron', 'React', 'TypeScript', 'Vite', 'Node.js', 'System APIs', 'File System', 'Process Management'],
    image: '/images/support-cleaner.png',
    liveUrl: undefined,
    githubUrl: undefined,
    featured: false,
    category: 'work'
  },

  // Newer public repositories
  {
    id: 'startpage',
    title: 'Startpage',
    descriptionKey: 'projectDescriptions.startpage',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'React Icons', 'React Colorful'],
    image: '/images/startpage.png',
    liveUrl: 'https://start.madsens.dev',
    githubUrl: 'https://github.com/MadsenDev/startpage',
    featured: false,
    category: 'personal'
  },
  {
    id: 'elkjop-report-app',
    title: 'Elkjøp Report App',
    descriptionKey: 'projectDescriptions.elkjopReport',
    technologies: ['Electron', 'React', 'TypeScript', 'Vite', 'Material-UI', 'Chart.js', 'React PDF', 'Zustand', 'IndexedDB'],
    image: '/images/elkjop-report-app.png',
    liveUrl: undefined,
    githubUrl: 'https://github.com/MadsenDev/elkjop-report-app',
    featured: false,
    category: 'personal'
  },
  {
    id: 'dream-pixel-editor',
    title: 'Dream Pixel Editor',
    descriptionKey: 'projectDescriptions.dreamPixel',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'PNG.js', 'React Icons'],
    image: '/images/dream-pixel.png',
    liveUrl: 'https://dream.madsens.dev',
    githubUrl: 'https://github.com/MadsenDev/dream-pixel-editor',
    featured: false,
    category: 'personal'
  },
  {
    id: 'secret-informant',
    title: 'Secret Informant',
    descriptionKey: 'projectDescriptions.secretInformant',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Express', 'Twilio', 'Rate Limiting', 'TypeScript'],
    image: '/images/secret-informant.png',
    liveUrl: undefined,
    githubUrl: undefined,
    featured: false,
    category: 'personal'
  },
  {
    id: 'knowledge-base',
    title: 'Knowledge Base',
    descriptionKey: 'projectDescriptions.knowledgeBase',
    technologies: ['React 19', 'Vite', 'Node.js', 'Express', 'MySQL', 'Sequelize', 'Socket.IO', 'OpenAI API', 'JWT', 'PDFKit', 'Sharp', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    image: '/images/knowledge-base.png',
    liveUrl: undefined,
    githubUrl: undefined,
    featured: false,
    category: 'personal'
  }
];

export const getFeaturedProjects = () => projects.filter(project => project.featured);

export const getProjectById = (id: string) => projects.find(project => project.id === id);

export const getProjectsByCategory = (category: 'work' | 'personal' | 'freelance') => 
  projects.filter(project => project.category === category);
