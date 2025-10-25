'use client';

import { useMemo } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';
import type { Project } from '@/data/projects';
import type { ProjectShowcaseContent } from '@/data/projectPages';

import { ProjectShowcaseLabels } from './showcases/shared';
import { projectShowcaseComponents } from './showcases';
import type { ProjectShowcaseComponent } from './showcases/types';

interface ProjectShowcaseProps {
  project: Project;
  content: ProjectShowcaseContent;
}

export function ProjectShowcase({ project, content }: ProjectShowcaseProps) {
  const { t } = useLanguage();

  const labels: ProjectShowcaseLabels = useMemo(
    () => ({
      backToHome: t('projects.backToHome') ?? 'Back to home',
      viewDemo: t('projects.viewDemo') ?? 'View demo',
      viewCode: t('projects.viewCode') ?? 'View code',
      technologiesUsed: t('projects.technologiesUsed') ?? 'Technologies used'
    }),
    [t]
  );

  const ShowcaseComponent: ProjectShowcaseComponent =
    projectShowcaseComponents[project.id] ?? projectShowcaseComponents.generic;

  return <ShowcaseComponent project={project} content={content} labels={labels} />;
}
