import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Github, Terminal, Zap, Layers, Shield, Workflow, LineChart, Bot, Wand2, Bolt, Radar, Globe, Code2, GitBranch, Play, Square, RefreshCw, FolderOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Localhost Hub – The command center for your local development life',
  description: 'A single desktop app that discovers every project on your machine, tells you what\'s running, which ports are hot, which branches are clean, and gives you one-click controls to install, start, stop, or open anything—without leaving your keyboard.',
  openGraph: {
    title: 'Localhost Hub – Developer Command Center',
    description: 'Discover, organize, and run every project on your machine—instantly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Localhost Hub – Developer Command Center',
    description: 'Discover, organize, and run every project on your machine—instantly',
  }
};

export default function LocalhostHubPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-teal-500/20 bg-slate-950/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <Link 
            href="/#projects" 
            className="group inline-flex items-center gap-2 text-sm text-teal-100/70 transition hover:text-teal-100"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to portfolio
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.15),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full bg-teal-400/20 border border-teal-400/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">
                Localhost Hub
              </span>
              <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                The command center for your{' '}
                <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  local development life
                </span>
              </h1>
              <p className="text-xl leading-relaxed text-teal-100/80 md:text-2xl">
                Discover, organize, and run every project on your machine—instantly
              </p>
              <p className="text-base leading-relaxed text-teal-100/70">
                A single desktop app that discovers every project on your machine, tells you what's running, which ports are hot, which branches are clean, and gives you one-click controls to install, start, stop, or open anything—without leaving your keyboard.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <a
                  href="mailto:chris@madsens.dev?subject=Localhost Hub Inquiry"
                  className="inline-flex items-center gap-2 rounded-full bg-teal-400/90 px-6 py-3 text-sm font-medium text-slate-900 shadow-lg shadow-teal-500/30 transition hover:-translate-y-0.5 hover:bg-teal-300"
                >
                  <Terminal className="h-4 w-4" />
                  Get in touch
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-[32px] border border-teal-400/30 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-sm">
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-teal-400/20 blur-3xl" />
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-teal-400/20 bg-slate-950">
                  <Image
                    src="/images/localhost-hub.png"
                    alt="Localhost Hub desktop application interface"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-teal-500/20 bg-slate-900/30 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-400">50+</div>
              <div className="mt-2 text-sm uppercase tracking-[0.3em] text-teal-100/60">Projects discovered</div>
              <div className="mt-2 text-xs text-teal-100/50">Automatic scanning across configured roots</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-400">Real-time</div>
              <div className="mt-2 text-sm uppercase tracking-[0.3em] text-teal-100/60">Process monitoring</div>
              <div className="mt-2 text-xs text-teal-100/50">Live counts and status for all running scripts</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-400">100%</div>
              <div className="mt-2 text-sm uppercase tracking-[0.3em] text-teal-100/60">Zero context switching</div>
              <div className="mt-2 text-xs text-teal-100/50">Everything you need in one unified workspace</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-white md:text-5xl">Everything you need at launch</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-teal-100/70">
              A modular workspace that consolidates all your local development into a single, keyboard-first interface
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="group rounded-3xl border border-teal-500/30 bg-gradient-to-br from-teal-950/50 to-slate-950/70 p-8 backdrop-blur-sm transition hover:border-teal-400/50">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/20 text-teal-200">
                <Radar className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">All projects, one pane</h3>
              <p className="mb-6 text-sm leading-relaxed text-teal-100/70">
                A smart sidebar surfaces recent runs, live process counts, scan roots, and health checks. Search, filter, and jump straight into any repo—with tags, paths, and Git status at a glance.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-xl border border-teal-400/20 bg-slate-950/60 p-3">
                  <Radar className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                  <div>
                    <div className="text-sm font-medium text-white">Smart discovery</div>
                    <div className="mt-1 text-xs text-teal-100/70">Automatically scans configured directories and detects projects with package.json, git repos, and more.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-teal-400/20 bg-slate-950/60 p-3">
                  <Bolt className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                  <div>
                    <div className="text-sm font-medium text-white">Live process counts</div>
                    <div className="mt-1 text-xs text-teal-100/70">Real-time monitoring shows which projects are running and how many processes are active.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-teal-400/20 bg-slate-950/60 p-3">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                  <div>
                    <div className="text-sm font-medium text-white">Git awareness</div>
                    <div className="mt-1 text-xs text-teal-100/70">Branch names, cleanliness status, and quick refresh without leaving the interface.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-3xl border border-teal-400/30 bg-slate-950/70 p-8 backdrop-blur-sm transition hover:border-teal-400/50">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/20 text-teal-200">
                <Layers className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Operational dashboards</h3>
              <p className="mb-6 text-sm leading-relaxed text-teal-100/70">
                Tabbed views for scripts, real-time streaming logs with copy/clear/export, environment profiles, ports/processes, package managers, and git cleanliness. Know what's happening and act on it immediately.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-xl border border-teal-400/20 bg-slate-950/60 p-3">
                  <Terminal className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                  <div>
                    <div className="text-sm font-medium text-white">Streaming logs</div>
                    <div className="mt-1 text-xs text-teal-100/70">Real-time log output with auto-scroll, URL detection, and export capabilities.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-teal-400/20 bg-slate-950/60 p-3">
                  <Workflow className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                  <div>
                    <div className="text-sm font-medium text-white">Script management</div>
                    <div className="mt-1 text-xs text-teal-100/70">One-click install, start, stop, and restart with full command visibility.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-teal-400/20 bg-slate-950/60 p-3">
                  <LineChart className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                  <div>
                    <div className="text-sm font-medium text-white">Port & process tracking</div>
                    <div className="mt-1 text-xs text-teal-100/70">See which ports are in use, expected URLs, and running processes at a glance.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-3xl border border-teal-400/30 bg-gradient-to-br from-teal-900/30 to-slate-950/70 p-8 backdrop-blur-sm transition hover:border-teal-400/50">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/20 text-teal-200">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Zero friction workflow</h3>
              <p className="mb-6 text-sm leading-relaxed text-teal-100/70">
                Launch installs, restart scripts, open in browser or editor, refresh git status, or rescan roots in a click. Auto-scroll logs, detect URLs, and stay in flow.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-xl border border-teal-400/20 bg-slate-950/60 p-3">
                  <Bot className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                  <div>
                    <div className="text-sm font-medium text-white">Run history</div>
                    <div className="mt-1 text-xs text-teal-100/70">Persisted history and logs let you revisit what worked yesterday and restart exactly as before.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-teal-400/20 bg-slate-950/60 p-3">
                  <Wand2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                  <div>
                    <div className="text-sm font-medium text-white">Quick actions</div>
                    <div className="mt-1 text-xs text-teal-100/70">Open in browser, install dependencies, or launch your editor—all without context switching.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-teal-400/20 bg-slate-950/60 p-3">
                  <Bolt className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                  <div>
                    <div className="text-sm font-medium text-white">Vite-powered speed</div>
                    <div className="mt-1 text-xs text-teal-100/70">Live-reload across main, preload, and renderer processes for instant feedback.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="border-y border-teal-500/20 bg-gradient-to-br from-slate-950/90 to-teal-950/30 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <span className="inline-flex rounded-full bg-teal-400/15 border border-teal-400/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-teal-100/80">
                Eliminating context switching and guesswork
              </span>
              <h2 className="text-3xl font-bold text-white md:text-4xl">Building the developer cockpit I always wanted</h2>
              <p className="text-base leading-relaxed text-teal-100/70 md:text-lg">
                Localhost Hub was born from the frustration of juggling multiple terminals, forgetting which ports are in use, and losing track of running processes. It consolidates everything into a single, keyboard-first interface that respects developer workflows.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-xl border border-teal-400/20 bg-slate-950/60 p-4">
                <Code2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />
                <span className="text-sm text-teal-100/80">Architected Electron app with Vite for lightning-fast HMR across all processes.</span>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-teal-400/20 bg-slate-950/60 p-4">
                <Workflow className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />
                <span className="text-sm text-teal-100/80">Implemented IPC-based communication for secure, performant process management.</span>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-teal-400/20 bg-slate-950/60 p-4">
                <FolderOpen className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />
                <span className="text-sm text-teal-100/80">Built intelligent project discovery that respects .gitignore and workspace patterns.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Built with modern tools</h2>
            <p className="mx-auto mt-4 max-w-xl text-teal-100/70">
              Leveraging the best of Electron, React, and Vite for a seamless developer experience
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['Electron', 'React', 'TypeScript', 'Vite', 'Node.js', 'IPC', 'Process Management', 'Git', 'File System'].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-teal-400/30 bg-slate-950/60 px-5 py-2.5 text-sm font-medium uppercase tracking-[0.18em] text-teal-100/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-teal-500/20 bg-gradient-to-br from-teal-950/40 via-slate-950/80 to-slate-950/80 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">Need a unified command center for your projects?</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-teal-100/70">
            Let's build the developer tools that eliminate friction and keep you in flow.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:chris@madsens.dev?subject=Localhost Hub Inquiry"
              className="inline-flex items-center gap-2 rounded-full bg-teal-400/90 px-8 py-4 text-sm font-medium text-slate-900 shadow-lg shadow-teal-500/30 transition hover:-translate-y-0.5 hover:bg-teal-300"
            >
              <Terminal className="h-5 w-5" />
              Discuss a dev tool project
            </a>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 px-8 py-4 text-sm font-medium text-teal-100/80 transition hover:border-teal-300 hover:bg-teal-400/10"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

