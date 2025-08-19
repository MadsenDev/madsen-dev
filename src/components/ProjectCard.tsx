'use client';

import { motion } from 'motion/react';
import { ExternalLink, Github, Calendar, Code } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectCardProps {
  title: string;
  descriptionKey: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  category?: 'work' | 'personal' | 'freelance';
}

export default function ProjectCard({
  title,
  descriptionKey,
  technologies,
  image,
  liveUrl,
  githubUrl,
  category = 'personal'
}: ProjectCardProps) {
  const { t } = useLanguage();
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'work': return 'text-blue-400';
      case 'freelance': return 'text-green-400';
      case 'personal': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'work': return <Calendar size={14} />;
      case 'freelance': return <Code size={14} />;
      case 'personal': return <Code size={14} />;
      default: return <Code size={14} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="group relative overflow-hidden rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/80 transition-all duration-300 hover:bg-slate-800/50 h-80"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image || '/images/no_image.png'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-slate-900/20" />
      </div>

              {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className={`flex items-center gap-1 px-2 py-1 text-xs font-medium bg-slate-900/80 backdrop-blur-sm rounded-full border border-slate-700/50 ${getCategoryColor(category)}`}>
            {getCategoryIcon(category)}
            {t(`projects.categories.${category}`)}
          </div>
        </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
            {title}
          </h3>
          
                       <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
               {t(descriptionKey)}
             </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-1">
            {technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-slate-800/80 backdrop-blur-sm text-slate-300 rounded-md border border-slate-700/50"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <div className="relative group/tech">
                <span className="px-2 py-1 text-xs font-medium bg-slate-800/60 backdrop-blur-sm text-slate-400 rounded-md cursor-help hover:bg-slate-700/60 transition-colors duration-200">
                  +{technologies.length - 3}
                </span>
                {/* Tooltip */}
                <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-xl opacity-0 invisible group-hover/tech:opacity-100 group-hover/tech:visible transition-all duration-200 z-20 min-w-max">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {technologies.slice(3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-slate-800/80 backdrop-blur-sm text-slate-300 rounded-md border border-slate-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/95"></div>
                </div>
              </div>
            )}
          </div>
          
          {/* Links */}
          <div className="flex gap-2 pt-2">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-gray-300 hover:text-white transition-colors duration-300 hover:bg-slate-800/50 px-2 py-1 rounded-md backdrop-blur-sm"
              >
                <ExternalLink size={12} />
                {t('projects.viewDemo')}
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-gray-300 hover:text-white transition-colors duration-300 hover:bg-slate-800/50 px-2 py-1 rounded-md backdrop-blur-sm"
              >
                <Github size={12} />
                {t('projects.viewCode')}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
