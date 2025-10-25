'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

import type { ProjectShowcaseComponentProps } from './types';
import { callToActionIcons, iconComponents } from './shared';

const { primary: PrimaryCTAIcon, secondary: SecondaryCTAIcon, external: ExternalIcon, github: GithubIcon } =
  callToActionIcons;

export function GenericProjectShowcase({ project, content, labels }: ProjectShowcaseComponentProps) {
  const accentColor = content.palette[1] ?? '#6366f1';

  const renderHeroMedia = () => {
    const baseClasses =
      'relative mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-4 shadow-[0_25px_80px_-30px_rgba(15,23,42,0.9)] backdrop-blur-xl';

    const image = (
      <Image
        src={content.hero.image}
        alt={content.hero.imageAlt}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
      />
    );

    switch (content.hero.imageStyle) {
      case 'device':
        return (
          <div className={`${baseClasses} aspect-[16/10] bg-gradient-to-br from-white/5 to-white/0`}>
            <div className="absolute inset-0 rounded-[24px] border border-white/10" />
            <div className="absolute inset-4 rounded-2xl bg-slate-950/40" />
            <div className="absolute left-1/2 top-3 flex -translate-x-1/2 gap-1">
              <span className="h-1.5 w-12 rounded-full bg-white/20" />
            </div>
            <div className="absolute inset-[1.75rem] rounded-xl overflow-hidden">{image}</div>
          </div>
        );
      case 'cards':
        return (
          <div className="relative">
            <div className={`${baseClasses} aspect-[4/3]`}>
              <div className="absolute inset-4 overflow-hidden rounded-2xl">{image}</div>
            </div>
            <div className="absolute -bottom-8 -left-8 hidden h-32 w-32 rounded-3xl bg-gradient-to-br from-white/10 to-white/0 blur-2xl md:block" />
            <div className="absolute -top-10 -right-12 hidden h-36 w-36 rounded-full bg-white/5 blur-xl md:block" />
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} aspect-[16/10]`}>
            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/10 to-transparent" />
            <div className="absolute inset-4 overflow-hidden rounded-2xl">{image}</div>
            <div className="absolute left-6 top-6 flex gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-400/70" />
              <span className="h-2 w-2 rounded-full bg-amber-400/70" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-24 pb-24">
      <Link href="/" className="group inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white">
        <SecondaryCTAIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {labels.backToHome}
      </Link>

      <section
        className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${content.hero.gradientFrom} ${content.hero.gradientTo} ${content.hero.backdrop} px-8 py-12 md:px-12`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_55%)]" />
        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="space-y-6">
            <span className={`inline-flex items-center rounded-full ${content.hero.accent} px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em]`}>{content.hero.eyebrow}</span>
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-white md:text-5xl"
              >
                {content.hero.title}
              </motion.h1>
              <p className="text-lg text-slate-100/80">{content.hero.subtitle}</p>
              <p className="text-base leading-relaxed text-slate-100/70">{content.hero.description}</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/20"
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
                  className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                >
                  <GithubIcon className="h-4 w-4" />
                  {labels.viewCode}
                </a>
              )}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
            {renderHeroMedia()}
          </motion.div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {content.stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.25em] text-white/50">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
            {stat.description && <p className="mt-3 text-sm text-white/70">{stat.description}</p>}
          </div>
        ))}
      </section>

      <section className="space-y-12">
        {content.sections.map((section) => (
          <div
            key={section.title}
            className={`rounded-3xl border px-8 py-10 backdrop-blur-md ${
              section.emphasis === 'dark'
                ? 'bg-slate-900/70 border-slate-700/60'
                : section.emphasis === 'accent'
                  ? 'border-white/20'
                  : 'bg-white/5 border-white/10'
            }`}
            style={
              section.emphasis === 'accent'
                ? {
                    backgroundImage: `linear-gradient(140deg, ${accentColor}22, rgba(15,23,42,0.8))`
                  }
                : undefined
            }
          >
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-white">{section.title}</h2>
                <p className="text-base leading-relaxed text-white/70">{section.description}</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {section.features.map((feature) => {
                  const Icon = iconComponents[feature.icon];
                  return (
                    <div
                      key={feature.title}
                      className="group rounded-2xl border border-white/10 bg-slate-950/40 p-5 transition hover:border-white/25 hover:bg-slate-950/60"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium text-white">{feature.title}</h3>
                      <p className="mt-2 text-sm text-white/60">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-10 rounded-3xl border border-white/10 bg-slate-950/60 p-10 backdrop-blur-xl lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            {content.experience.tagline}
          </span>
          <h2 className="text-3xl font-semibold text-white">{content.experience.title}</h2>
          <p className="text-base text-white/70">{content.experience.description}</p>
        </div>
        <ul className="space-y-4">
          {content.experience.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-sm text-white/70">
              <PrimaryCTAIcon className="mt-1 h-4 w-4 text-white/60" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-md">
        <h2 className="text-2xl font-semibold text-white">{labels.technologiesUsed}</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-full border border-white/10 bg-slate-950/40 px-4 py-2 text-sm text-white/70">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-5">
          {content.palette.map((color) => (
            <div key={color} className="rounded-2xl border border-white/10 p-4">
              <div className="h-16 w-full rounded-xl" style={{ backgroundColor: color }} />
              <p className="mt-3 text-xs font-mono text-white/60">{color}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-10 text-center backdrop-blur-xl">
        <h2 className="text-3xl font-semibold text-white">{content.callToAction.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/70">{content.callToAction.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:chris@madsens.dev?subject=${encodeURIComponent('Project inquiry: ' + project.title)}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900 shadow-lg shadow-slate-900/30 transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            <PrimaryCTAIcon className="h-4 w-4" />
            {content.callToAction.primaryLabel}
          </a>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-medium text-white transition hover:border-white/40"
          >
            <SecondaryCTAIcon className="h-4 w-4" />
            {content.callToAction.secondaryLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
