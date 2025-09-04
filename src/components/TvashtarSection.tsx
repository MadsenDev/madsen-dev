'use client';

import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Mail, Beaker, Shield, Activity } from 'lucide-react';

const logoSrc = '/images/tvashtar-logo.svg';
const bannerSrc = '/images/tvashtar-banner.png';

export default function TvashtarSection() {
  // subtle randomized Ken Burns path so it feels alive
  const kb = useMemo(() => {
    const x = Math.random() > 0.5 ? [0, 2, 0] : [0, -2, 0];
    const y = Math.random() > 0.5 ? [0, -1.5, 0] : [0, 1.5, 0];
    return { x, y };
  }, []);

  // prefill a helpful email (edit if you want)
  const mailto = [
    'mailto:chris@madsens.dev',
    '?subject=Request%20Beta%20Access%20%E2%80%94%20Tvashtar%20Editor',
    '&body=Hi%20Chris%2C%0A%0AI%27d%20like%20to%20join%20the%20Tvashtar%20Editor%20beta.%0A%0A',
    'Platform%3A%20(Linux%20%2F%20Windows%20%2F%20macOS)%0A',
    'Experience%20level%3A%20(Beginner%20%2F%20Intermediate%20%2F%20Advanced)%0A',
    'What%20I%27d%20like%20to%20test%3A%20%0A%0A',
    'Thanks!'
  ].join('');

  return (
    <section id="tvashtar" className="relative overflow-hidden">
      {/* Tvashtar background */}
      <div className="absolute inset-0 bg-[#0b0f1a]" />
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-32 -left-24 w-[44rem] h-[44rem] rounded-full"
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(34,211,238,0.18) 0%, rgba(99,102,241,0.14) 45%, rgba(236,72,153,0.08) 70%, rgba(11,15,26,0) 80%)' }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.65, 0.95, 0.65] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-28 -right-24 w-[46rem] h-[46rem] rounded-full"
          style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(236,72,153,0.12) 0%, rgba(99,102,241,0.10) 50%, rgba(11,15,26,0) 75%)' }}
          animate={{ scale: [1.05, 1, 1.05], opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 md:py-28">
        <div className="grid items-center gap-10 lg:gap-16 md:grid-cols-2">
          {/* Left: brand + copy + single CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-7"
          >
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
                <img src={logoSrc} alt="Tvashtar Editor" className="w-7 h-7 object-contain" />
              </div>
              <div className="flex items-center flex-wrap gap-2">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Tvashtar Editor</h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 text-amber-300 px-2.5 py-1 text-[11px] font-semibold ring-1 ring-amber-400/30">
                  <Beaker size={14} /> Beta
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 text-white/70 px-2.5 py-1 text-[11px] ring-1 ring-white/10">
                  <Shield size={14} /> License-gated
                </span>
              </div>
            </div>

            <p className="text-sm md:text-base text-white/75 leading-relaxed max-w-prose">
              A focused editor for building React + Tailwind UIs with a live canvas, device previews,
              and pluggable libraries. The beta is invite-only so I can keep feedback loops tight and
              ship fast. If it fits your workflow, I’ll mint you a license and get you set up.
            </p>

            {/* Two quick columns that set expectations */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-white/80 text-sm font-medium mb-2">
                  <Activity size={16} /> What you’ll test
                </div>
                <ul className="space-y-1.5 text-sm text-white/75">
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-cyan-400" /> Canvas editing flow</li>
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-indigo-400" /> Presets & snippets</li>
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-pink-400" /> Library toggles</li>
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-emerald-400" /> Save/open .tsc</li>
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-white/80 text-sm font-medium mb-2">
                  <Shield size={16} /> What I need
                </div>
                <ul className="space-y-1.5 text-sm text-white/75">
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-cyan-400" /> Short feedback notes</li>
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-indigo-400" /> Repro steps if bugs</li>
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-pink-400" /> Your platform + version</li>
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-amber-400" /> A few sample projects</li>
                </ul>
              </div>
            </div>

            {/* Single CTA: email only */}
            <div className="pt-1">
              <a
                href={mailto}
                className="group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white
                           bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500
                           hover:from-cyan-400 hover:via-indigo-400 hover:to-pink-400
                           shadow-lg shadow-indigo-900/25"
              >
                <Mail size={18} />
                Request Beta Access
              </a>
              <p className="mt-2 text-xs text-white/55">
                No public downloads. Licenses are issued manually during beta.
              </p>
            </div>
          </motion.div>

          {/* Right: editor-style card with Ken Burns + aurora (no progress bar) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/40 bg-white/5 backdrop-blur-sm perspective-1000 group">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-black/30">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-pink-500/80" />
                  <span className="size-2.5 rounded-full bg-amber-400/80" />
                  <span className="size-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="ml-2 flex items-center gap-2 text-xs text-white/70">
                  <img src={logoSrc} alt="logo" className="w-3.5 h-3.5 object-contain" />
                  <span className="font-medium">Tvashtar Editor</span>
                  <span className="mx-1 text-white/20">•</span>
                  <span className="text-white/50">Invite-only Beta</span>
                </div>
              </div>

              {/* Canvas */}
              <motion.div
                className="relative aspect-[16/10] overflow-hidden will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ rotateX: -2, rotateY: 3, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14 }}
              >
                {/* Ken Burns image */}
                <motion.img
                  src={bannerSrc}
                  alt="Tvashtar banner"
                  className="absolute inset-0 h-full w-full object-cover"
                  animate={{ scale: [1.03, 1.08, 1.03], x: kb.x, y: kb.y }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Aurora sweep */}
                <motion.div
                  className="pointer-events-none absolute -inset-[20%]"
                  style={{
                    background:
                      'conic-gradient(from 180deg at 50% 50%, rgba(34,211,238,0.0) 0deg, rgba(34,211,238,0.25) 60deg, rgba(99,102,241,0.25) 140deg, rgba(236,72,153,0.22) 220deg, rgba(34,211,238,0.0) 360deg)',
                    filter: 'blur(24px)',
                    mixBlendMode: 'screen',
                  }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                />

                {/* Readability edge */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/45 to-transparent" />
              </motion.div>
            </div>

            {/* Outer glow */}
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-pink-500/10 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}