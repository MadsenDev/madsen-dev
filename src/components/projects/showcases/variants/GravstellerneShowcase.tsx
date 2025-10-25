import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

import type { ProjectShowcaseComponentProps } from '../types';
import { callToActionIcons, iconComponents } from '../shared';

export function GravstellerneShowcase({ project, content, labels }: ProjectShowcaseComponentProps) {
  const { primary: PrimaryCTAIcon, secondary: SecondaryCTAIcon, external: ExternalIcon, github: GithubIcon } =
    callToActionIcons;

  return (
    <div className="space-y-20 pb-24">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="group inline-flex items-center gap-2 text-sm text-emerald-100/70 transition hover:text-emerald-100">
          <SecondaryCTAIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {labels.backToHome}
        </Link>
        <div className="flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-400/10"
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
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:bg-emerald-400/10"
            >
              <GithubIcon className="h-4 w-4" />
              {labels.viewCode}
            </a>
          )}
        </div>
      </div>

      <section className="relative overflow-hidden rounded-[40px] border border-emerald-400/20 bg-slate-950/80 p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.35),transparent_60%)]" />
        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="space-y-6">
            <span className={`inline-flex items-center rounded-full ${content.hero.accent} px-5 py-1 text-xs font-semibold uppercase tracking-[0.2em]`}>{content.hero.eyebrow}</span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-semibold text-white md:text-5xl"
            >
              {content.hero.title}
            </motion.h1>
            <p className="text-xl text-emerald-100/80">{content.hero.subtitle}</p>
            <p className="max-w-xl text-base leading-relaxed text-emerald-100/70">{content.hero.description}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:chris@madsens.dev?subject=${encodeURIComponent('Project inquiry: ' + project.title)}`}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400/90 px-6 py-3 text-sm font-medium text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-300"
              >
                <PrimaryCTAIcon className="h-4 w-4" />
                {content.callToAction.primaryLabel}
              </a>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-emerald-100/80 transition hover:border-white/30"
              >
                <SecondaryCTAIcon className="h-4 w-4" />
                {content.callToAction.secondaryLabel}
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-emerald-400/20 bg-slate-900/80 p-4">
              <div className="absolute inset-x-6 top-6 h-6 rounded-full bg-gradient-to-r from-emerald-500/40 to-transparent" />
              <div className="relative aspect-[16/10] overflow-hidden rounded-[20px]">
                <Image
                  src={content.hero.image}
                  alt={content.hero.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  priority
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-emerald-400/40 bg-slate-950/80 p-4 text-xs text-emerald-100/70">
                <p>Offline-first operations platform for cemetery staff, administrators, and families.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {content.stats.map((stat) => (
          <div key={stat.label} className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-slate-950/70 p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_70%)]" />
            <div className="relative space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-100/60">{stat.label}</p>
              <p className="text-3xl font-semibold text-white">{stat.value}</p>
              {stat.description && <p className="text-sm leading-relaxed text-emerald-100/70">{stat.description}</p>}
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6 rounded-3xl border border-emerald-400/20 bg-slate-950/70 p-8">
          <h2 className="text-2xl font-semibold text-white">Field-tested pillars</h2>
          <p className="text-base leading-relaxed text-emerald-100/70">
            Each capability was shaped with onsite feedback from cemetery staff, ensuring the product supports the logistical and
            emotional sides of grave care.
          </p>
          <ul className="space-y-4">
            {content.sections.map((section) => (
              <li key={section.title} className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-200/60">{section.title}</p>
                <p className="mt-3 text-sm text-emerald-100/70">{section.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          {content.sections.map((section) => (
            <div key={section.title} className="rounded-3xl border border-emerald-400/20 bg-slate-950/70 p-6">
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                <span className="text-xs uppercase tracking-[0.3em] text-emerald-100/60">Highlights</span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {section.features.map((feature) => {
                  const Icon = iconComponents[feature.icon];
                  return (
                    <div key={feature.title} className="group rounded-2xl border border-emerald-400/20 bg-slate-950/60 p-4 transition hover:border-emerald-400/40 hover:bg-slate-950/80">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-200">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="mt-3 text-sm font-medium text-white">{feature.title}</p>
                      <p className="mt-2 text-xs text-emerald-100/70">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 rounded-3xl border border-emerald-400/20 bg-slate-950/80 p-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-emerald-400/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100/80">
            {content.experience.tagline}
          </span>
          <h2 className="text-3xl font-semibold text-white">{content.experience.title}</h2>
          <p className="text-base leading-relaxed text-emerald-100/70">{content.experience.description}</p>
        </div>
        <ul className="space-y-4">
          {content.experience.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-sm text-emerald-100/80">
              <PrimaryCTAIcon className="mt-1 h-4 w-4 text-emerald-300" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-10 rounded-3xl border border-emerald-400/20 bg-slate-950/80 p-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">{labels.technologiesUsed}</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-full border border-emerald-400/20 bg-slate-950/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-emerald-100/70">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {content.palette.map((color) => (
            <div key={color} className="rounded-2xl border border-emerald-400/20 bg-slate-950/60 p-4">
              <div className="h-16 w-full rounded-xl" style={{ backgroundColor: color }} />
              <p className="mt-3 text-xs font-mono text-emerald-100/70">{color}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
