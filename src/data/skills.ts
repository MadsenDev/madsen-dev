export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'tools' | 'languages';
  icon?: string;
  description?: string;
}

export const skills: Skill[] = [
  // Frontend Skills
  {
    name: 'React',
    level: 95,
    category: 'frontend',
    description: 'Advanced React development with hooks, context, and modern patterns'
  },
  {
    name: 'Next.js',
    level: 90,
    category: 'frontend',
    description: 'Full-stack React framework with App Router and server components'
  },
  {
    name: 'TypeScript',
    level: 88,
    category: 'languages',
    description: 'Type-safe JavaScript development with advanced type features'
  },
  {
    name: 'Tailwind CSS',
    level: 92,
    category: 'frontend',
    description: 'Utility-first CSS framework for rapid UI development'
  },
  {
    name: 'Framer Motion',
    level: 85,
    category: 'frontend',
    description: 'Production-ready motion library for React animations'
  },
  {
    name: 'HTML/CSS',
    level: 95,
    category: 'frontend',
    description: 'Semantic HTML and modern CSS with flexbox and grid'
  },

  // Backend Skills
  {
    name: 'Node.js',
    level: 85,
    category: 'backend',
    description: 'Server-side JavaScript runtime for building scalable applications'
  },
  {
    name: 'Express.js',
    level: 80,
    category: 'backend',
    description: 'Fast, unopinionated web framework for Node.js'
  },
  {
    name: 'MySQL',
    level: 75,
    category: 'backend',
    description: 'Relational database management and query optimization'
  },
  {
    name: 'API Development',
    level: 88,
    category: 'backend',
    description: 'RESTful API design and implementation with proper error handling'
  },
  {
    name: 'Prisma',
    level: 35,
    category: 'backend',
    description: 'Next-generation ORM for TypeScript and Node.js'
  },

  // Tools & Technologies
  {
    name: 'Git',
    level: 90,
    category: 'tools',
    description: 'Version control and collaborative development workflows'
  },
  {
    name: 'Docker',
    level: 15,
    category: 'tools',
    description: 'Containerization and deployment automation'
  },
  {
    name: 'Vercel',
    level: 20,
    category: 'tools',
    description: 'Frontend cloud platform for static sites and serverless functions'
  },
  {
    name: 'VS Code',
    level: 95,
    category: 'tools',
    description: 'Advanced code editor with extensions and debugging'
  },
  {
    name: 'Figma',
    level: 20,
    category: 'tools',
    description: 'UI/UX design and prototyping tool'
  },

  // Languages
  {
    name: 'JavaScript',
    level: 95,
    category: 'languages',
    description: 'Modern JavaScript with ES6+ features and async programming'
  },
  {
    name: 'Python',
    level: 40,
    category: 'languages',
    description: 'Scripting and automation with basic web development'
  },
  {
    name: 'SQL',
    level: 80,
    category: 'languages',
    description: 'Database querying and data manipulation'
  }
];

export const getSkillsByCategory = (category: Skill['category']) => 
  skills.filter(skill => skill.category === category);

export const getTopSkills = (limit: number = 8) => 
  [...skills]
    .sort((a, b) => b.level - a.level)
    .slice(0, limit);

export const getSkillCategories = () => {
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return Object.entries(categories).map(([category, skills]) => ({
    category: category as Skill['category'],
    skills: skills.sort((a, b) => b.level - a.level)
  }));
};
