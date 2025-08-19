'use client';

import { motion } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Calendar, MapPin, Code, Users, Zap } from 'lucide-react';

interface TimelineItem {
  id: string;
  period: string;
  title: string;
  company: string;
  location: string;
  description: string;
  skills: string[];
  icon: React.ReactNode;
  color: string;
}

export default function Timeline() {
  const { t } = useLanguage();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const timelineData: TimelineItem[] = [
    {
      id: 'elkjøp',
      period: t('timeline.elkjøp.period'),
      title: t('timeline.elkjøp.title'),
      company: t('timeline.elkjøp.company'),
      location: 'Halden, Norway',
      description: t('timeline.elkjøp.description'),
      skills: t('timeline.elkjøp.skills').split(', '),
      icon: <Users size={20} />,
      color: 'text-blue-400'
    },
    {
      id: 'gravstellerne',
      period: t('timeline.gravstellerne.period'),
      title: t('timeline.gravstellerne.title'),
      company: t('timeline.gravstellerne.company'),
      location: 'Norway',
      description: t('timeline.gravstellerne.description'),
      skills: t('timeline.gravstellerne.skills').split(', '),
      icon: <Code size={20} />,
      color: 'text-purple-400'
    },
    {
      id: 'freelance',
      period: t('timeline.freelance.period'),
      title: t('timeline.freelance.title'),
      company: t('timeline.freelance.company'),
      location: 'Remote',
      description: t('timeline.freelance.description'),
      skills: t('timeline.freelance.skills').split(', '),
      icon: <Zap size={20} />,
      color: 'text-green-400'
    }
  ];

  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-12"
      >
        <h3 className="text-2xl font-semibold text-white mb-4">{t('timeline.title')}</h3>
        <p className="text-gray-400">{t('timeline.journey')}</p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-700"></div>

        <div className="space-y-12">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
              className="relative flex items-start"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Timeline dot */}
              <div className="absolute left-6 w-4 h-4 bg-slate-700 rounded-full border-4 border-slate-900 z-10"></div>
              
              {/* Content */}
              <div className="ml-16 flex-1">
                <motion.div
                  className={`p-6 rounded-lg border transition-all duration-300 ${
                    hoveredItem === item.id
                      ? 'border-purple-500 bg-slate-800/50'
                      : 'border-slate-700 bg-slate-800/30'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-slate-700 ${item.color}`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                        <p className="text-purple-400 font-medium">{item.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <Calendar size={14} />
                        {item.period}
                      </p>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <MapPin size={14} />
                        {item.location}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: skillIndex * 0.1 }}
                        className="px-3 py-1 text-xs font-medium bg-purple-600/20 text-purple-400 rounded-full border border-purple-600/30"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
