'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Section from '@/components/Section';
import ProjectCard from '@/components/ProjectCard';
import ProjectFilter from '@/components/ProjectFilter';
import BlogSection from '@/components/BlogSection';
import Timeline from '@/components/Timeline';
import AnimatedAbout from '@/components/AnimatedAbout';
import AnimatedContact from '@/components/AnimatedContact';
import { projects, Project } from '@/data/projects';
import TvashtarSection from '@/components/TvashtarSection';
import dynamic from 'next/dynamic';

// Lazy load the Playground component since it's below the fold
const Playground = dynamic(() => import('@/components/Playground'), {
  loading: () => (
    <div className="py-16 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-8 bg-slate-800 rounded-lg mb-4 animate-pulse max-w-md mx-auto"></div>
          <div className="h-4 bg-slate-800 rounded-lg mb-8 animate-pulse max-w-2xl mx-auto"></div>
        </div>
        <div className="flex justify-center mb-8 gap-4">
          <div className="h-10 bg-slate-800 rounded-lg animate-pulse w-24"></div>
          <div className="h-10 bg-slate-800 rounded-lg animate-pulse w-24"></div>
          <div className="h-10 bg-slate-800 rounded-lg animate-pulse w-24"></div>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 rounded-lg p-4 mb-6 h-32 animate-pulse"></div>
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 h-96 animate-pulse"></div>
        </div>
      </div>
    </div>
  ),
  ssr: false
});

export default function TranslatedSections() {
  const { t } = useLanguage();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  return (
    <>
      {/* About Section */}
      <Section
        id="about"
        title={t('about.title')}
        subtitle={t('about.subtitle')}
        className="bg-slate-900"
      >
        <AnimatedAbout />
        
        {/* Timeline */}
        <Timeline />
      </Section>

      <div id="tvashtar">
        <TvashtarSection />
      </div>

      {/* Projects Section */}
      <Section
        id="projects"
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
        className="bg-slate-950"
      >
        <ProjectFilter onFilteredProjects={setFilteredProjects} />
        
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                descriptionKey={project.descriptionKey}
                technologies={project.technologies}
                image={project.image}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
                category={project.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No projects found</div>
            <div className="text-gray-500 text-sm">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </Section>

      {/* Blog Section (temporarily hidden) */}
      {false && (
        <div id="blog">
          <BlogSection />
        </div>
      )}

      {/* Playground Section */}
      <div id="playground">
        <Playground />
      </div>

      {/* Contact Section */}
      <Section
        id="contact"
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
        className="bg-slate-900"
      >
        <AnimatedContact />
      </Section>
    </>
  );
}
