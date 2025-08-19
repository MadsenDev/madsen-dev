'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Section from '@/components/Section';
import ProjectCard from '@/components/ProjectCard';
import Timeline from '@/components/Timeline';
import Playground from '@/components/Playground';
import AnimatedAbout from '@/components/AnimatedAbout';
import AnimatedContact from '@/components/AnimatedContact';
import { projects } from '@/data/projects';

export default function TranslatedSections() {
  const { t } = useLanguage();

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

      {/* Projects Section */}
      <Section
        id="projects"
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
        className="bg-slate-950"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
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
      </Section>

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
