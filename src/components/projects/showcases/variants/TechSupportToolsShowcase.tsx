import Image from 'next/image';
import Link from 'next/link';

import type { ProjectShowcaseComponentProps } from '../types';
import { callToActionIcons, iconComponents } from '../shared';

export function TechSupportToolsShowcase({ project, content, labels }: ProjectShowcaseComponentProps) {
  const { primary: PrimaryCTAIcon, secondary: SecondaryCTAIcon, external: ExternalIcon, github: GithubIcon } =
    callToActionIcons;

  return (
    <div className="space-y-16 pb-24">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="group inline-flex items-center gap-2 text-sm text-sky-100/70 transition hover:text-sky-100">
          <SecondaryCTAIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {labels.backToHome}
        </Link>
        <div className="flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-sky-400/50 px-4 py-2 text-sm font-medium text-sky-100 transition hover:bg-sky-400/10"
            >
              <ExternalIcon className="h-4 w-4" />
              {labels.viewDemo}
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-sky-400/50 px-4 py-2 text-sm font-medium text-sky-100 transition hover:bg-sky-400/10"
            >
              <GithubIcon className="h-4 w-4" />
              {labels.viewCode}
            </a>
          )}
        </div>
      </div>

      <section className="rounded-3xl border border-sky-400/20 bg-slate-950/80 p-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <span className={`inline-flex items-center rounded-full ${content.hero.accent} px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]`}>{content.hero.eyebrow}</span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold text-white">{content.hero.title}</h1>
              <p className="text-lg text-sky-100/80">{content.hero.subtitle}</p>
              <p className="text-base leading-relaxed text-sky-100/70">{content.hero.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:chris@madsens.dev?subject=${encodeURIComponent('Project inquiry: ' + project.title)}`}
                className="inline-flex items-center gap-2 rounded-full bg-sky-400/80 px-5 py-3 text-sm font-medium text-slate-900 shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 hover:bg-sky-300"
              >
                <PrimaryCTAIcon className="h-4 w-4" />
                {content.callToAction.primaryLabel}
              </a>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-sky-100/70 transition hover:border-white/30"
              >
                <SecondaryCTAIcon className="h-4 w-4" />
                {content.callToAction.secondaryLabel}
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-[28px] border border-sky-400/20 bg-slate-950/80 p-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={content.hero.image}
                  alt={content.hero.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 550px"
                  priority
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {content.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-sky-400/20 bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-sky-100/60">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                  {stat.description && <p className="mt-2 text-xs text-sky-100/70">{stat.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {content.sections.map((section) => (
          <div key={section.title} className="rounded-3xl border border-sky-400/20 bg-slate-950/70 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <span className="text-xs uppercase tracking-[0.25em] text-sky-100/60">{section.emphasis?.toUpperCase()}</span>
            </div>
            <p className="mt-4 text-sm text-sky-100/70">{section.description}</p>
            <div className="mt-6 space-y-4">
              {section.features.map((feature) => {
                const Icon = iconComponents[feature.icon];
                return (
                  <div key={feature.title} className="flex gap-4 rounded-2xl border border-sky-400/20 bg-slate-950/60 p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-400/20 text-sky-200">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{feature.title}</p>
                      <p className="mt-1 text-xs text-sky-100/70">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-8 rounded-3xl border border-sky-400/20 bg-slate-950/80 p-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-sky-400/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100/80">
            {content.experience.tagline}
          </span>
          <h2 className="text-3xl font-semibold text-white">{content.experience.title}</h2>
          <p className="text-base leading-relaxed text-sky-100/70">{content.experience.description}</p>
        </div>
        <ul className="space-y-3">
          {content.experience.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-sm text-sky-100/80">
              <PrimaryCTAIcon className="mt-1 h-4 w-4 text-sky-300" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-sky-400/20 bg-slate-950/70 p-8">
        <h2 className="text-2xl font-semibold text-white">{labels.technologiesUsed}</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-full border border-sky-400/20 bg-slate-950/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-sky-100/70">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {content.palette.map((color) => (
            <div key={color} className="rounded-2xl border border-sky-400/20 bg-slate-950/60 p-4">
              <div className="h-14 w-full rounded-xl" style={{ backgroundColor: color }} />
              <p className="mt-2 text-xs font-mono text-sky-100/70">{color}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
