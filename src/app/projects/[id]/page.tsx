import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProjectById, projects } from '@/data/projects';
import { getProjectShowcase } from '@/data/projectPages';
import { ProjectShowcase } from '@/components/projects/ProjectShowcase';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  const showcase = getProjectShowcase(id);

  if (!project || !showcase) {
    return {};
  }

  const title = `${project.title} – Case Study`;
  const description = showcase.hero.subtitle;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: project.image
        ? [
            {
              url: `https://madsens.dev${project.image}`,
              width: 1200,
              height: 630,
              alt: `${project.title} preview`
            }
          ]
        : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: project.image ? [`https://madsens.dev${project.image}`] : undefined
    }
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);
  const showcase = getProjectShowcase(id);

  if (!project || !showcase) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-6 pt-32">
      <ProjectShowcase project={project} content={showcase} />
    </main>
  );
}
