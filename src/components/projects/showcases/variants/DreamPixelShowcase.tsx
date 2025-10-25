import Image from 'next/image';
import Link from 'next/link';

import type { ProjectShowcaseComponentProps } from '../types';
import { callToActionIcons, iconComponents } from '../shared';

export function DreamPixelShowcase({ project, content, labels }: ProjectShowcaseComponentProps) {
  const { primary: PrimaryCTAIcon, secondary: SecondaryCTAIcon, external: ExternalIcon, github: GithubIcon } =
    callToActionIcons;

  return (
    <div className="space-y-16 pb-24">
      <Link href="/" className="group inline-flex items-center gap-2 text-sm text-amber-100/70 transition hover:text-amber-100">
        <SecondaryCTAIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {labels.backToHome}
      </Link>

      <section className="grid gap-8 rounded-[36px] border border-amber-400/20 bg-slate-950/85 p-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5">
          <span className={`inline-flex items-center rounded-full ${content.hero.accent} px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]`}>{content.hero.eyebrow}</span>
          <h1 className="text-4xl font-semibold text-white">{content.hero.title}</h1>
          <p className="text-lg text-amber-100/80">{content.hero.subtitle}</p>
          <p className="text-base leading-relaxed text-amber-100/70">{content.hero.description}</p>
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-amber-300/90 px-5 py-2 text-sm font-medium text-slate-900 shadow-lg shadow-amber-500/30 transition hover:-translate-y-0.5 hover:bg-amber-200"
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
                className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 px-5 py-2 text-sm font-medium text-amber-100/80 transition hover:border-amber-300"
              >
                <GithubIcon className="h-4 w-4" />
                {labels.viewCode}
              </a>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-[28px] border border-amber-400/30 bg-slate-950/70 p-4">
            <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-amber-400/25 blur-2xl" />
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
          <div className="grid gap-3 md:grid-cols-3">
            {content.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-amber-400/30 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-100/60">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                {stat.description && <p className="mt-2 text-xs text-amber-100/70">{stat.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        {content.sections.map((section) => (
          <div key={section.title} className="grid gap-6 rounded-3xl border border-amber-400/20 bg-slate-950/70 p-6 md:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
              <p className="mt-3 text-sm text-amber-100/70">{section.description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {section.features.map((feature) => {
                const Icon = iconComponents[feature.icon];
                return (
                  <div key={feature.title} className="rounded-2xl border border-amber-400/20 bg-slate-950/60 p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/20 text-amber-200">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="mt-3 text-sm font-medium text-white">{feature.title}</p>
                    <p className="mt-1 text-xs text-amber-100/70">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-amber-400/20 bg-slate-950/80 p-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-amber-400/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100/80">
              {content.experience.tagline}
            </span>
            <h2 className="text-3xl font-semibold text-white">{content.experience.title}</h2>
            <p className="text-base leading-relaxed text-amber-100/70">{content.experience.description}</p>
          </div>
          <ul className="space-y-3 text-sm text-amber-100/80">
            {content.experience.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <PrimaryCTAIcon className="mt-1 h-4 w-4 text-amber-300" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-amber-400/20 bg-slate-950/70 p-8">
        <h2 className="text-2xl font-semibold text-white">{labels.technologiesUsed}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-full border border-amber-400/20 bg-slate-950/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-amber-100/70">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {content.palette.map((color) => (
            <div key={color} className="rounded-2xl border border-amber-400/20 bg-slate-950/60 p-4">
              <div className="h-14 w-full rounded-xl" style={{ backgroundColor: color }} />
              <p className="mt-2 text-xs font-mono text-amber-100/70">{color}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[36px] border border-amber-400/30 bg-gradient-to-br from-white/10 to-transparent p-10 text-center">
        <h2 className="text-3xl font-semibold text-white">{content.callToAction.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-amber-100/70">{content.callToAction.description}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:chris@madsens.dev?subject=${encodeURIComponent('Project inquiry: ' + project.title)}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900 shadow-lg shadow-amber-500/30 transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            <PrimaryCTAIcon className="h-4 w-4" />
            {content.callToAction.primaryLabel}
          </a>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 px-6 py-3 text-sm font-medium text-amber-100/80 transition hover:border-amber-300"
          >
            <SecondaryCTAIcon className="h-4 w-4" />
            {content.callToAction.secondaryLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
