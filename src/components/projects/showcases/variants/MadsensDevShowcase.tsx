import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

import type { ProjectShowcaseComponentProps } from '../types';
import { callToActionIcons, iconComponents } from '../shared';

export function MadsensDevShowcase({ project, content, labels }: ProjectShowcaseComponentProps) {
  const { primary: PrimaryCTAIcon, secondary: SecondaryCTAIcon, external: ExternalIcon, github: GithubIcon } =
    callToActionIcons;

  return (
    <div className="space-y-24 pb-24">
      <Link href="/" className="group inline-flex items-center gap-2 text-sm text-purple-100/80 transition hover:text-purple-100">
        <SecondaryCTAIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {labels.backToHome}
      </Link>

      <section className="relative overflow-hidden rounded-[48px] border border-purple-400/20 bg-gradient-to-br from-slate-950 via-[#130022] to-slate-950 p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(147,51,234,0.35),transparent_65%)]" />
        <div className="absolute -left-20 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-purple-500/20 blur-3xl md:block" />
        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-purple-100/80">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              {content.hero.eyebrow}
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
              <h1 className="text-5xl font-semibold text-white md:text-6xl">{content.hero.title}</h1>
              <p className="text-lg text-purple-100/80">{content.hero.subtitle}</p>
              <p className="max-w-xl text-base leading-relaxed text-purple-100/70">{content.hero.description}</p>
            </motion.div>
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-sm font-medium text-slate-900 shadow-lg shadow-purple-500/30 transition hover:-translate-y-0.5 hover:bg-white"
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
                  className="inline-flex items-center gap-2 rounded-full border border-purple-300/50 px-5 py-2 text-sm font-medium text-purple-100/80 transition hover:border-purple-200/80"
                >
                  <GithubIcon className="h-4 w-4" />
                  {labels.viewCode}
                </a>
              )}
              <a
                href={`mailto:chris@madsens.dev?subject=${encodeURIComponent('Project inquiry: ' + project.title)}`}
                className="inline-flex items-center gap-2 rounded-full bg-purple-500/80 px-5 py-2 text-sm font-medium text-white shadow-md shadow-purple-800/40 transition hover:-translate-y-0.5 hover:bg-purple-400"
              >
                <PrimaryCTAIcon className="h-4 w-4" />
                {content.callToAction.primaryLabel}
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-purple-500/20 via-transparent to-slate-900/60" />
            <div className="relative overflow-hidden rounded-[32px] border border-purple-400/30 bg-slate-950/70 p-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
                <Image
                  src={content.hero.image}
                  alt={content.hero.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 600px"
                  priority
                />
              </div>
              <div className="mt-5 grid gap-3 text-xs text-purple-100/70 md:grid-cols-2">
                <div className="rounded-2xl border border-purple-400/30 bg-slate-950/70 p-3">
                  <p className="font-semibold text-purple-100/90">12+ playful demos</p>
                  <p>Command palette, terminal experiments, and interactive analytics consent.</p>
                </div>
                <div className="rounded-2xl border border-purple-400/30 bg-slate-950/70 p-3">
                  <p className="font-semibold text-purple-100/90">Five locales</p>
                  <p>Translations flow from routing to metadata with zero flashing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 rounded-[36px] border border-purple-400/20 bg-slate-950/70 p-10 md:grid-cols-3">
        {content.stats.map((stat) => (
          <div key={stat.label} className="space-y-3 rounded-3xl border border-purple-400/20 bg-gradient-to-br from-purple-500/10 via-transparent to-slate-950/70 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-purple-100/60">{stat.label}</p>
            <p className="text-3xl font-semibold text-white">{stat.value}</p>
            {stat.description && <p className="text-sm text-purple-100/70">{stat.description}</p>}
          </div>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          {content.sections.map((section, index) => (
            <div key={section.title} className="grid gap-6 rounded-[32px] border border-purple-400/20 bg-slate-950/70 p-8 md:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-purple-400/40 text-xs font-semibold text-purple-100/70">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-2xl font-semibold text-white">{section.title}</h3>
                <p className="text-base leading-relaxed text-purple-100/70">{section.description}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {section.features.map((feature) => {
                  const Icon = iconComponents[feature.icon];
                  return (
                    <div key={feature.title} className="rounded-2xl border border-purple-400/20 bg-slate-950/60 p-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-400/20 text-purple-200">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="mt-3 text-sm font-medium text-white">{feature.title}</p>
                      <p className="mt-2 text-xs text-purple-100/70">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <aside className="flex h-full flex-col gap-6 rounded-[32px] border border-purple-400/20 bg-slate-950/70 p-8">
          <h2 className="text-xl font-semibold text-white">Experience highlights</h2>
          <p className="text-sm text-purple-100/70">{content.experience.description}</p>
          <ul className="space-y-3 text-sm text-purple-100/80">
            {content.experience.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <PrimaryCTAIcon className="mt-1 h-4 w-4 text-purple-300" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-4">
            <h3 className="text-sm uppercase tracking-[0.3em] text-purple-100/60">Palette</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.palette.map((color) => (
                <div key={color} className="rounded-2xl border border-purple-400/30 bg-slate-950/60 p-4">
                  <div className="h-14 w-full rounded-xl" style={{ backgroundColor: color }} />
                  <p className="mt-2 text-xs font-mono text-purple-100/70">{color}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="rounded-[36px] border border-purple-400/20 bg-slate-950/70 p-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-semibold text-white">{labels.technologiesUsed}</h2>
            <p className="text-sm text-purple-100/70">The stack balances expressive UI tooling with performance-first constraints.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-full border border-purple-400/20 bg-slate-950/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-purple-100/70">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[36px] border border-purple-400/30 bg-gradient-to-br from-white/10 via-transparent to-slate-950/60 p-10 text-center">
        <h2 className="text-3xl font-semibold text-white">{content.callToAction.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-purple-100/70">{content.callToAction.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:chris@madsens.dev?subject=${encodeURIComponent('Project inquiry: ' + project.title)}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900 shadow-lg shadow-purple-500/30 transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            <PrimaryCTAIcon className="h-4 w-4" />
            {content.callToAction.primaryLabel}
          </a>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 px-6 py-3 text-sm font-medium text-purple-100/80 transition hover:border-purple-300/80"
          >
            <SecondaryCTAIcon className="h-4 w-4" />
            {content.callToAction.secondaryLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
