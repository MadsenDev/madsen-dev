'use client';

import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Mail, Beaker, Shield, Activity } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

const logoSrc = '/images/tvashtar-logo.svg';
const bannerSrc = '/images/tvashtar-banner.png';

export default function TvashtarSection() {
  const { t } = useLanguage();
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
    <section id="tvashtar" className="relative overflow-hidden min-h-[100svh] w-full">
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

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 min-h-[100svh] flex items-center">
        <div className="grid items-center gap-12 lg:gap-20 md:grid-cols-2 w-full">
          {/* Left: brand + copy + single CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
                <Image src={logoSrc} alt={t('tvashtar.title')} width={28} height={28} className="w-7 h-7 object-contain" />
              </div>
              <div className="flex items-center flex-wrap gap-3">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Tvashtar Studio</h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 text-amber-300 px-2.5 py-1 text-[11px] font-semibold ring-1 ring-amber-400/30">
                  <Beaker size={14} /> {t('tvashtar.beta')}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 text-white/70 px-2.5 py-1 text-[11px] ring-1 ring-white/10">
                  <Shield size={14} /> {t('tvashtar.licenseGated')}
                </span>
              </div>
            </div>

            <p className="text-base md:text-xl text-white/80 leading-relaxed max-w-2xl">
              {t('tvashtar.description')}
            </p>

            {/* Two quick columns that set expectations */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-white/90 text-sm font-medium mb-2">
                  <Activity size={16} /> {t('tvashtar.test.title')}
                </div>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-cyan-400" /> {t('tvashtar.test.canvas')}</li>
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-indigo-400" /> {t('tvashtar.test.presets')}</li>
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-pink-400" /> {t('tvashtar.test.toggles')}</li>
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-emerald-400" /> {t('tvashtar.test.save')}</li>
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-white/90 text-sm font-medium mb-2">
                  <Shield size={16} /> {t('tvashtar.need.title')}
                </div>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-cyan-400" /> {t('tvashtar.need.feedback')}</li>
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-indigo-400" /> {t('tvashtar.need.repro')}</li>
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-pink-400" /> {t('tvashtar.need.platform')}</li>
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-amber-400" /> {t('tvashtar.need.samples')}</li>
                </ul>
              </div>
            </div>

            {/* Single CTA: email only */}
            <div className="pt-1">
              <a
                href={mailto}
                className="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white
                           bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500
                           hover:from-cyan-400 hover:via-indigo-400 hover:to-pink-400
                           shadow-lg shadow-indigo-900/25"
              >
                <Mail size={18} />
                {t('tvashtar.cta')}
              </a>
              <p className="mt-2 text-xs text-white/55">
                {t('tvashtar.disclaimer')}
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
                  <Image src={logoSrc} alt="logo" width={14} height={14} className="w-3.5 h-3.5 object-contain" />
                  <span className="font-medium">Tvashtar Editor</span>
                  <span className="mx-1 text-white/20">•</span>
                  <span className="text-white/50">{t('tvashtar.titlebar.inviteOnly')}</span>
                </div>
              </div>

              {/* Canvas */}
              <motion.div
                className="relative overflow-hidden will-change-transform h-[58svh] md:h-[64svh]"
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