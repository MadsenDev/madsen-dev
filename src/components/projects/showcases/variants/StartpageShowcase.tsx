import Image from 'next/image';
import Link from 'next/link';

import type { ProjectShowcaseComponentProps } from '../types';
import { callToActionIcons, iconComponents } from '../shared';

export function StartpageShowcase({ project, content, labels }: ProjectShowcaseComponentProps) {
  const { primary: PrimaryCTAIcon, secondary: SecondaryCTAIcon, external: ExternalIcon, github: GithubIcon } =
    callToActionIcons;

  return (
    <div className="space-y-16 pb-24">
      <Link href="/" className="group inline-flex items-center gap-2 text-sm text-cyan-100/70 transition hover:text-cyan-100">
        <SecondaryCTAIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {labels.backToHome}
      </Link>

      <section className="relative overflow-hidden rounded-[42px] border border-cyan-300/30 bg-slate-950/80 p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.3),transparent_65%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <span className={`inline-flex items-center rounded-full ${content.hero.accent} px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]`}>{content.hero.eyebrow}</span>
            <h1 className="text-4xl font-semibold text-white md:text-5xl">{content.hero.title}</h1>
            <p className="text-lg text-cyan-100/80">{content.hero.subtitle}</p>
            <p className="text-base leading-relaxed text-cyan-100/70">{content.hero.description}</p>
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-300/90 px-5 py-2 text-sm font-medium text-slate-900 shadow-lg shadow-cyan-400/30 transition hover:-translate-y-0.5 hover:bg-cyan-200"
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
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-300/50 px-5 py-2 text-sm font-medium text-cyan-100/80 transition hover:border-cyan-200"
                >
                  <GithubIcon className="h-4 w-4" />
                  {labels.viewCode}
                </a>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-[28px] border border-cyan-300/30 bg-slate-950/70 p-4">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl" />
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
            <div className="grid gap-4 md:grid-cols-3">
              {content.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-cyan-300/30 bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-100/60">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                  {stat.description && <p className="mt-2 text-xs text-cyan-100/70">{stat.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          {content.sections.map((section) => (
            <div key={section.title} className="rounded-3xl border border-cyan-300/30 bg-slate-950/70 p-6">
              <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
              <p className="mt-2 text-sm text-cyan-100/70">{section.description}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {section.features.map((feature) => {
                  const Icon = iconComponents[feature.icon];
                  return (
                    <div key={feature.title} className="rounded-2xl border border-cyan-300/30 bg-slate-950/60 p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-300/20 text-cyan-200">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="mt-3 text-sm font-medium text-white">{feature.title}</p>
                      <p className="mt-1 text-xs text-cyan-100/70">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <aside className="space-y-5 rounded-3xl border border-cyan-300/30 bg-slate-950/70 p-6">
          <span className="inline-flex rounded-full bg-cyan-300/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/80">
            {content.experience.tagline}
          </span>
          <h2 className="text-2xl font-semibold text-white">{content.experience.title}</h2>
          <p className="text-sm text-cyan-100/70">{content.experience.description}</p>
          <ul className="space-y-3 text-sm text-cyan-100/80">
            {content.experience.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <PrimaryCTAIcon className="mt-1 h-4 w-4 text-cyan-300" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="pt-4">
            <h3 className="text-xs uppercase tracking-[0.3em] text-cyan-100/60">Palette</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {content.palette.map((color) => (
                <div key={color} className="rounded-2xl border border-cyan-300/30 bg-slate-950/60 p-3">
                  <div className="h-12 w-full rounded-lg" style={{ backgroundColor: color }} />
                  <p className="mt-2 text-xs font-mono text-cyan-100/70">{color}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="rounded-3xl border border-cyan-300/30 bg-slate-950/80 p-8">
        <h2 className="text-2xl font-semibold text-white">{labels.technologiesUsed}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-full border border-cyan-300/30 bg-slate-950/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan-100/70">
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-[40px] border border-cyan-300/40 bg-gradient-to-br from-white/10 to-transparent p-10 text-center">
        <h2 className="text-3xl font-semibold text-white">{content.callToAction.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-cyan-100/70">{content.callToAction.description}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:chris@madsens.dev?subject=${encodeURIComponent('Project inquiry: ' + project.title)}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900 shadow-lg shadow-cyan-300/30 transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            <PrimaryCTAIcon className="h-4 w-4" />
            {content.callToAction.primaryLabel}
          </a>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 px-6 py-3 text-sm font-medium text-cyan-100/80 transition hover:border-cyan-200"
          >
            <SecondaryCTAIcon className="h-4 w-4" />
            {content.callToAction.secondaryLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
