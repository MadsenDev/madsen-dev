'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { Code, Server, Wrench, Globe } from 'lucide-react';
import { skills, Skill, getSkillsByCategory, getTopSkills } from '@/data/skills';
import { useLanguage } from '@/contexts/LanguageContext';

type ViewMode = 'radar' | 'bars' | 'categories';

// Move SkillBar outside the main component to prevent recreation
const SkillBar = React.memo(({ 
  skill, 
  animatedLevel, 
  skillIndex, 
  levelColor
}: { 
  skill: Skill;
  animatedLevel: number;
  skillIndex: number;
  levelColor: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ left: number; top: number } | null>(null);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      left: rect.left + window.scrollX,
      top: rect.bottom + window.scrollY + 8,
    });
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <>
      <motion.div
        className="group relative"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: skillIndex * 0.1 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">{skill.name}</span>
          <span className="text-sm text-gray-400">{animatedLevel}%</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${levelColor} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${animatedLevel}%` }}
            transition={{ duration: 1, delay: skillIndex * 0.1, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {isHovered && tooltipPos && typeof window !== 'undefined' && createPortal(
        <div
          className="pointer-events-none fixed z-[99999] p-3 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl min-w-max"
          style={{ left: tooltipPos.left, top: tooltipPos.top }}
        >
          <div className="text-sm text-white font-medium mb-1">{skill.name}</div>
          <div className="text-xs text-gray-400 max-w-sm">{skill.description}</div>
          <div className="text-xs text-purple-400 mt-1">Level: {skill.level}%</div>
        </div>,
        document.body
      )}
    </>
  );
});

SkillBar.displayName = 'SkillBar';

export default function SkillsVisualization() {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const [animatedSkills, setAnimatedSkills] = useState<Record<string, number>>({});

  // Animate skill levels on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      skills.forEach((skill, index) => {
        setTimeout(() => {
          setAnimatedSkills(prev => ({
            ...prev,
            [skill.name]: skill.level
          }));
        }, index * 100);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getCategoryIcon = useCallback((category: string) => {
    switch (category) {
      case 'frontend': return <Globe size={20} />;
      case 'backend': return <Server size={20} />;
      case 'tools': return <Wrench size={20} />;
      case 'languages': return <Code size={20} />;
      default: return <Code size={20} />;
    }
  }, []);

  const getCategoryColor = useCallback((category: string) => {
    switch (category) {
      case 'frontend': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'backend': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'tools': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'languages': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  }, []);

  const getLevelColor = useCallback((level: number) => {
    if (level >= 90) return 'from-green-500 to-emerald-500';
    if (level >= 80) return 'from-blue-500 to-cyan-500';
    if (level >= 70) return 'from-purple-500 to-pink-500';
    if (level >= 60) return 'from-orange-500 to-yellow-500';
    return 'from-gray-500 to-gray-400';
  }, []);

  const CategoryView = useCallback(() => {
    const categories = ['frontend', 'backend', 'tools', 'languages'] as const;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const categorySkills = getSkillsByCategory(category);
          const categoryColor = getCategoryColor(category);
          const categoryIcon = getCategoryIcon(category);
          
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categories.indexOf(category) * 0.2 }}
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${categoryColor}`}>
                  {categoryIcon}
                </div>
                <h3 className="text-lg font-semibold text-white capitalize">
                  {category}
                </h3>
              </div>
              
              <div className="space-y-4">
                {categorySkills.map((skill, idx) => {
                  const animatedLevel = animatedSkills[skill.name] || 0;
                  const skillIndex = idx;
                  const levelColor = getLevelColor(skill.level);
                  
                  return (
                    <SkillBar 
                      key={skill.name} 
                      skill={skill}
                      animatedLevel={animatedLevel}
                      skillIndex={skillIndex}
                      levelColor={levelColor}
                    />
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }, [getCategoryColor, getCategoryIcon, getLevelColor, animatedSkills]);

  const BarsView = useCallback(() => {
    const topSkills = getTopSkills(12);
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topSkills.map((skill, idx) => {
          const animatedLevel = animatedSkills[skill.name] || 0;
          const skillIndex = idx;
          const levelColor = getLevelColor(skill.level);
          
          return (
            <SkillBar 
              key={skill.name} 
              skill={skill}
              animatedLevel={animatedLevel}
              skillIndex={skillIndex}
              levelColor={levelColor}
            />
          );
        })}
      </div>
    );
  }, [getLevelColor, animatedSkills]);

  const RadarView = useCallback(() => {
    const topSkills = getTopSkills(6);
    const centerX = 200;
    const centerY = 200;
    const radius = 150;
    
    return (
      <div className="flex justify-center">
        <div className="relative w-96 h-96">
          <svg width="400" height="400" className="absolute inset-0">
            {/* Grid circles */}
            {[0.2, 0.4, 0.6, 0.8, 1].map((scale, index) => (
              <circle
                key={index}
                cx={centerX}
                cy={centerY}
                r={radius * scale}
                fill="none"
                stroke="rgba(148, 163, 184, 0.2)"
                strokeWidth="1"
              />
            ))}
            
            {/* Grid lines */}
            {topSkills.map((_, index) => {
              const angle = (index * 2 * Math.PI) / topSkills.length - Math.PI / 2;
              const x = centerX + radius * Math.cos(angle);
              const y = centerY + radius * Math.sin(angle);
              return (
                <line
                  key={index}
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke="rgba(148, 163, 184, 0.2)"
                  strokeWidth="1"
                />
              );
            })}
            
            {/* Skill points and labels */}
            {topSkills.map((skill, index) => {
              const angle = (index * 2 * Math.PI) / topSkills.length - Math.PI / 2;
              const skillRadius = (radius * (animatedSkills[skill.name] || 0)) / 100;
              const x = centerX + skillRadius * Math.cos(angle);
              const y = centerY + skillRadius * Math.sin(angle);
              const labelX = centerX + (radius + 20) * Math.cos(angle);
              const labelY = centerY + (radius + 20) * Math.sin(angle);
              
              return (
                <g key={skill.name}>
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#a855f7"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  />
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs fill-gray-300"
                  >
                    {skill.name}
                  </text>
                </g>
              );
            })}
            
            {/* Skill area */}
            <motion.polygon
              points={topSkills.map((skill, index) => {
                const angle = (index * 2 * Math.PI) / topSkills.length - Math.PI / 2;
                const skillRadius = (radius * (animatedSkills[skill.name] || 0)) / 100;
                const x = centerX + skillRadius * Math.cos(angle);
                const y = centerY + skillRadius * Math.sin(angle);
                return `${x},${y}`;
              }).join(' ')}
              fill="rgba(168, 85, 247, 0.2)"
              stroke="#a855f7"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </svg>
        </div>
      </div>
    );
  }, [animatedSkills]);

  return (
    <div className="space-y-8">
      {/* View Mode Selector */}
      <div className="flex justify-center">
        <div className="flex bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
          {[
            { key: 'categories', label: t('skillsViz.modes.categories') },
            { key: 'bars', label: t('skillsViz.modes.bars') },
            { key: 'radar', label: t('skillsViz.modes.radar') }
          ].map((mode) => (
            <motion.button
              key={mode.key}
              onClick={() => setViewMode(mode.key as ViewMode)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                viewMode === mode.key
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {mode.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Skills Visualization */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {viewMode === 'categories' && <CategoryView />}
        {viewMode === 'bars' && <BarsView />}
        {viewMode === 'radar' && <RadarView />}
      </motion.div>

      {/* Skills Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {useMemo(() => [
            { label: t('skillsViz.stats.total'), value: skills.length },
            { label: t('skillsViz.stats.advanced'), value: skills.filter(s => s.level >= 90).length },
            { label: t('skillsViz.stats.proficient'), value: skills.filter(s => s.level >= 80).length },
            { label: t('skillsViz.stats.learning'), value: skills.filter(s => s.level < 70).length }
          ], [t]).map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4"
            >
              <div className="text-2xl font-bold text-purple-400 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
