import type { ComponentType, ReactNode } from 'react';

import type { Project } from '@/data/projects';
import type { ProjectShowcaseContent } from '@/data/projectPages';

import type { ProjectShowcaseLabels } from './shared';

export interface ProjectShowcaseComponentProps {
  project: Project;
  content: ProjectShowcaseContent;
  labels: ProjectShowcaseLabels;
}

export type ProjectShowcaseComponent = ComponentType<ProjectShowcaseComponentProps>;

export interface SectionRendererProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}
