export type ShowcaseIcon =
  | 'sparkles'
  | 'bolt'
  | 'layers'
  | 'map'
  | 'users'
  | 'calendar'
  | 'bell'
  | 'star'
  | 'messages'
  | 'shield'
  | 'palette'
  | 'workflow'
  | 'chart'
  | 'toolbox'
  | 'widgets'
  | 'automation'
  | 'cloud'
  | 'magic'
  | 'pencil'
  | 'radar'
  | 'frame'
  | 'globe';

export interface ShowcaseStat {
  label: string;
  value: string;
  description?: string;
}

export interface ShowcaseFeature {
  title: string;
  description: string;
  icon: ShowcaseIcon;
}

export interface ShowcaseSection {
  title: string;
  description: string;
  features: ShowcaseFeature[];
  emphasis?: 'light' | 'dark' | 'accent';
}

export interface ProjectShowcaseContent {
  id: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    imageAlt: string;
    imageStyle: 'device' | 'window' | 'cards';
    gradientFrom: string;
    gradientTo: string;
    accent: string;
    backdrop: string;
  };
  stats: ShowcaseStat[];
  sections: ShowcaseSection[];
  experience: {
    title: string;
    tagline: string;
    description: string;
    bullets: string[];
  };
  palette: string[];
  callToAction: {
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
}

export const projectShowcases: Record<string, ProjectShowcaseContent> = {
  'gravstellerne-platform': {
    id: 'gravstellerne-platform',
    hero: {
      eyebrow: 'Grave CMS Platform',
      title: 'Comprehensive cemetery management at scale',
      subtitle: 'Grave care coordination, customer portals, and operational oversight in one system',
      description:
        'A unified platform for cemetery administrators, field crews, and families that streamlines grave care operations from work order creation to customer satisfaction. Built with offline-first architecture, real-time notifications, and comprehensive customer portals.',
      image: '/images/grave-cms.png',
      imageAlt: 'Grave CMS platform screens',
      imageStyle: 'device',
      gradientFrom: 'from-emerald-500/30',
      gradientTo: 'to-slate-900/80',
      accent: 'bg-emerald-400/80 text-slate-950',
      backdrop: 'bg-[radial-gradient(circle_at_top,#10b98133,transparent_60%)]'
    },
    stats: [
      { label: 'Active users', value: '25+', description: 'Administrators and field crews across multiple cemeteries' },
      { label: 'Grave records', value: '12k+', description: 'Comprehensive database with photos, coordinates, and care history' },
      { label: 'Customer satisfaction', value: '+42%', description: 'Families receive transparent updates and can track care progress' }
    ],
    sections: [
      {
        title: 'Field operations management',
        description: 'Streamlined work order system with GPS coordinates, photo documentation, and real-time status updates for cemetery maintenance crews.',
        emphasis: 'dark',
        features: [
          { title: 'Work order automation', description: 'Automatic work order generation based on special days and maintenance schedules.', icon: 'workflow' },
          { title: 'GPS integration', description: 'Precise grave location mapping with Google Maps integration for efficient routing.', icon: 'map' },
          { title: 'Photo documentation', description: 'Before/after photo capture with automatic organization and customer sharing.', icon: 'frame' }
        ]
      },
      {
        title: 'Administrative oversight',
        description: 'Comprehensive dashboard for cemetery managers to track operations, manage customer relationships, and ensure quality care delivery.',
        emphasis: 'light',
        features: [
          { title: 'Customer management', description: 'Complete customer profiles with grave ownership, contact history, and service preferences.', icon: 'users' },
          { title: 'Visit tracking', description: 'Detailed visit logs with photos, comments, and quality ratings from families.', icon: 'calendar' },
          { title: 'Analytics dashboard', description: 'Performance metrics, completion rates, and customer satisfaction tracking.', icon: 'chart' }
        ]
      },
      {
        title: 'Family engagement',
        description: 'Dedicated customer portals where families can view grave care history, receive updates, and provide feedback on services.',
        emphasis: 'accent',
        features: [
          { title: 'Personal portals', description: 'Secure family access to grave care history, photos, and upcoming maintenance.', icon: 'shield' },
          { title: 'Automated notifications', description: 'Email and SMS updates for completed work, special day reminders, and care schedules.', icon: 'bell' },
          { title: 'Feedback system', description: 'Quality rating system with photo documentation and follow-up workflows.', icon: 'star' }
        ]
      }
    ],
    experience: {
      title: 'A platform designed for the unique needs of cemetery operations',
      tagline: 'From grave care workflows to family satisfaction',
      description:
        'I developed this comprehensive cemetery management system after extensive research into cemetery operations, family expectations, and administrative workflows. The platform balances operational efficiency with emotional sensitivity.',
      bullets: [
        'Designed intuitive interfaces for both technical field crews and non-technical family members.',
        'Implemented robust notification system with BullMQ for reliable email/SMS delivery.',
        'Built comprehensive customer portal with secure access controls and family-friendly navigation.'
      ]
    },
    palette: ['#0f172a', '#10b981', '#34d399', '#d1fae5', '#f5f5f4'],
    callToAction: {
      title: 'Transform cemetery operations with technology',
      description: 'Let\'s build the tools that honor families while streamlining cemetery management.',
      primaryLabel: 'Start a project conversation',
      secondaryLabel: 'Back to portfolio'
    }
  },
  'madsens-dev': {
    id: 'madsens-dev',
    hero: {
      eyebrow: 'madsens.dev',
      title: 'An interactive portfolio that feels like an app',
      subtitle: 'Motion-rich storytelling, command palette navigation, and playful experiments',
      description:
        'This site showcases my approach to developer experience—responsive layouts, ambient animations, and thoughtful language support packed into a lightning-fast Next.js build.',
      image: '/images/madsen-dev.png',
      imageAlt: 'madsens.dev portfolio screens',
      imageStyle: 'window',
      gradientFrom: 'from-purple-500/30',
      gradientTo: 'to-slate-900/80',
      accent: 'bg-purple-400/80 text-slate-950',
      backdrop: 'bg-[radial-gradient(circle_at_bottom,#7c3aed22,transparent_60%)]'
    },
    stats: [
      { label: 'Page speed', value: '100', description: 'Lighthouse performance score on desktop' },
      { label: 'Locales', value: '5', description: 'Full translations with URL aware language switching' },
      { label: 'Interactive demos', value: '12+', description: 'Terminal, palette, and motion experiments' }
    ],
    sections: [
      {
        title: 'A hero that reacts to every scroll',
        description: 'Framer Motion orchestrates layered lighting, a faux terminal, and ambient particles that react as you explore.',
        emphasis: 'dark',
        features: [
          { title: 'Motion-first layout', description: 'Hero orchestrations tuned for GPU-friendly transforms.', icon: 'bolt' },
          { title: 'Command palette', description: 'Quick fuzzy navigation and contextual shortcuts.', icon: 'magic' },
          { title: 'Responsive canvases', description: 'Mobile-friendly adjustments without losing personality.', icon: 'layers' }
        ]
      },
      {
        title: 'Internationalization without friction',
        description: 'Language preference flows from URL to local storage with graceful fallbacks so people can explore comfortably.',
        emphasis: 'light',
        features: [
          { title: 'Five full translations', description: 'Norwegian, Spanish, French, German, English.', icon: 'globe' },
          { title: 'Context aware copy', description: 'Section components pull description keys for clarity.', icon: 'pencil' },
          { title: 'SEO-friendly hreflang', description: 'Metadata and alternate links update per locale.', icon: 'sparkles' }
        ]
      },
      {
        title: 'Delightful detail throughout',
        description: 'From subtle gradients to interactive analytics consent, every small interaction reinforces craft.',
        emphasis: 'accent',
        features: [
          { title: 'Dynamic theming', description: 'Terminal and site theme providers stay in sync.', icon: 'palette' },
          { title: 'Microcopy touches', description: 'Custom tooltips, language toggles, and friendly CTAs.', icon: 'messages' },
          { title: 'Performance budgets', description: 'Only ship dependencies that earn their keep.', icon: 'shield' }
        ]
      }
    ],
    experience: {
      title: 'Treating personal work like a production product',
      tagline: 'Design system thinking applied to a portfolio',
      description:
        'Building my own site is an excuse to stress-test new ideas before rolling them into client projects. Every page component is reusable, well-typed, and animated with restraint.',
      bullets: [
        'Set up robust linting, formatting, and type safety to catch regressions early.',
        'Kept FCP blazing fast with strategic suspense boundaries and streaming data.',
        'Experimented with novel interactions that still respect accessibility standards.'
      ]
    },
    palette: ['#020617', '#7c3aed', '#a855f7', '#c4b5fd', '#f5f3ff'],
    callToAction: {
      title: 'Let’s craft an experience with personality',
      description: 'I partner with teams who want their product to feel as good as it functions.',
      primaryLabel: 'Discuss a collaboration',
      secondaryLabel: 'Back to portfolio'
    }
  },
  'tech-support-tools': {
    id: 'tech-support-tools',
    hero: {
      eyebrow: 'Tech Support Tools',
      title: 'Desktop utilities that keep retail tech teams calm',
      subtitle: 'Electron-based toolkit built for rapid troubleshooting at Elkjøp',
      description:
        'A collection of desktop applications that diagnose PCs, trigger cleanups, and generate customer-ready reports in seconds. Built to respect enterprise restrictions while making support staff faster and more confident.',
      image: '/images/support-cleaner.png',
      imageAlt: 'Tech support tools interface',
      imageStyle: 'window',
      gradientFrom: 'from-blue-500/20',
      gradientTo: 'to-slate-900/80',
      accent: 'bg-blue-400/80 text-slate-950',
      backdrop: 'bg-[radial-gradient(circle_at_top_right,#38bdf833,transparent_60%)]'
    },
    stats: [
      { label: 'Service time saved', value: '15 min', description: 'Average reduction per ticket' },
      { label: 'Diagnostics run', value: '3k+', description: 'Automations executed across stores' },
      { label: 'Script errors', value: '-72%', description: 'Guided flows remove manual command entry' }
    ],
    sections: [
      {
        title: 'Guided troubleshooting flows',
        description: 'Support agents can launch a preconfigured flow that collects logs, cleans caches, and reboots services without command-line anxiety.',
        emphasis: 'dark',
        features: [
          { title: 'Process automation', description: 'Electron orchestrates PowerShell scripts with real feedback.', icon: 'automation' },
          { title: 'Permission aware', description: 'Detects blocked operations and suggests alternatives.', icon: 'shield' },
          { title: 'Customer-ready exports', description: 'Auto-generates PDF reports branded for Elkjøp.', icon: 'frame' }
        ]
      },
      {
        title: 'Built for busy retail counters',
        description: 'The interface mirrors Elkjøp’s brand with bold greens, big CTA buttons, and keyboard-first navigation.',
        emphasis: 'light',
        features: [
          { title: 'Large tap targets', description: 'Optimized for touch-enabled kiosks and gloves.', icon: 'widgets' },
          { title: 'Status dashboards', description: 'Real-time checks highlight blockers instantly.', icon: 'radar' },
          { title: 'Access controls', description: 'Role-based modules for frontline vs. tech experts.', icon: 'shield' }
        ]
      },
      {
        title: 'Enterprise-ready foundations',
        description: 'Auto-update channels, environment checks, and guardrails keep the toolkit easy to deploy across hundreds of devices.',
        emphasis: 'accent',
        features: [
          { title: 'Self-updating binaries', description: 'Code-signed releases delivered through internal CDN.', icon: 'cloud' },
          { title: 'Safety nets', description: 'Rollback commands and log uploads for deeper diagnosis.', icon: 'toolbox' },
          { title: 'Observability hooks', description: 'Anonymous telemetry spots failing stations early.', icon: 'chart' }
        ]
      }
    ],
    experience: {
      title: 'Making support teams look like superheroes',
      tagline: 'Small touches with outsized morale impact',
      description:
        'Every utility was co-created with frontline staff, iterated in-store, and tuned for restricted corporate networks. The result: calmer support calls and faster turnarounds.',
      bullets: [
        'Converted undocumented scripts into discoverable modules.',
        'Ensured compatibility with Windows group policies and antivirus.',
        'Created documentation and onboarding for dozens of agents.'
      ]
    },
    palette: ['#0f172a', '#3b82f6', '#0ea5e9', '#38bdf8', '#dbeafe'],
    callToAction: {
      title: 'Need internal tools your team actually loves?',
      description: 'Let’s build something that melts away toil and gives support teams superpowers.',
      primaryLabel: 'Plan an internal tool',
      secondaryLabel: 'Back to portfolio'
    }
  },
  'startpage': {
    id: 'startpage',
    hero: {
      eyebrow: 'Startpage',
      title: 'A customizable browser home with personality',
      subtitle: 'Realtime weather, quick actions, and playlists in a playful dashboard',
      description:
        'Built as a daily driver for browsers, Startpage blends productivity widgets with expressive gradients and glassmorphism to keep mornings inspired.',
      image: '/images/startpage.png',
      imageAlt: 'Startpage application preview',
      imageStyle: 'cards',
      gradientFrom: 'from-cyan-400/20',
      gradientTo: 'to-slate-900/80',
      accent: 'bg-cyan-300/80 text-slate-900',
      backdrop: 'bg-[radial-gradient(circle_at_center,#22d3ee22,transparent_60%)]'
    },
    stats: [
      { label: 'Widgets available', value: '18', description: 'Weather, notes, media, search, and more' },
      { label: 'Theme presets', value: '6', description: 'From minimal glass to neon synthwave' },
      { label: 'Open-source contributors', value: '120+', description: 'Stars and forks combined on GitHub' }
    ],
    sections: [
      {
        title: 'Everything you need at launch',
        description: 'A modular layout with draggable panels that snap into place and remember preferences.',
        emphasis: 'dark',
        features: [
          { title: 'Smart search', description: 'Jump to sites or run commands in milliseconds.', icon: 'bolt' },
          { title: 'Live weather', description: 'Color palettes respond to real-world conditions.', icon: 'radar' },
          { title: 'Ambient playlists', description: 'Spotify integration sets the tone for the day.', icon: 'sparkles' }
        ]
      },
      {
        title: 'Express yourself',
        description: 'Pick from curated palettes or craft your own with real-time preview and instant export.',
        emphasis: 'light',
        features: [
          { title: 'Theme builder', description: 'Blend gradients, blurs, and accent typography.', icon: 'palette' },
          { title: 'Layout presets', description: 'Focus, productivity, or entertainment in one click.', icon: 'layers' },
          { title: 'Shortcut collections', description: 'Organize your go-to destinations visually.', icon: 'widgets' }
        ]
      },
      {
        title: 'Built for sharing',
        description: 'The community swaps layouts and colorways through JSON exports that import seamlessly.',
        emphasis: 'accent',
        features: [
          { title: 'One-click duplicate', description: 'Generate shareable links for any setup.', icon: 'magic' },
          { title: 'State persistence', description: 'Local storage snapshots survive restarts.', icon: 'shield' },
          { title: 'Keyboard navigation', description: 'Everything accessible without touching the mouse.', icon: 'workflow' }
        ]
      }
    ],
    experience: {
      title: 'A playground for experimentation',
      tagline: 'Shipping features quickly with Vite + Zustand',
      description:
        'Startpage doubles as a lab for UI animations, state persistence patterns, and rapid release cadences. Every module ships behind feature flags to keep the main experience stable.',
      bullets: [
        'Adopted Zustand for ergonomic widget state management.',
        'Leveraged Framer Motion for buttery panel transitions.',
        'Published a theme specification so the community can remix easily.'
      ]
    },
    palette: ['#0f172a', '#22d3ee', '#06b6d4', '#cffafe', '#ecfeff'],
    callToAction: {
      title: 'Ready to energize your next user ritual?',
      description: 'I love building experiences that people start their day with—let’s create yours.',
      primaryLabel: 'Chat about a dashboard',
      secondaryLabel: 'Back to portfolio'
    }
  },
  'elkjop-report-app': {
    id: 'elkjop-report-app',
    hero: {
      eyebrow: 'Elkjøp Report App',
      title: 'Reporting that delights managers and technicians alike',
      subtitle: 'Turn messy service logs into beautiful PDF stories',
      description:
        'A reporting companion for Elkjøp that pulls from diagnostics, inventory, and CRM data to craft polished summaries ready for management and customers.',
      image: '/images/elkjop-report-app.png',
      imageAlt: 'Elkjøp report builder UI',
      imageStyle: 'window',
      gradientFrom: 'from-green-500/20',
      gradientTo: 'to-slate-900/80',
      accent: 'bg-green-400/80 text-slate-950',
      backdrop: 'bg-[radial-gradient(circle_at_top,#22c55e22,transparent_60%)]'
    },
    stats: [
      { label: 'Reports generated', value: '5k+', description: 'Automated PDF exports across stores' },
      { label: 'Time saved', value: '12 min', description: 'Per technician when creating closing documents' },
      { label: 'Data sources', value: '4', description: 'Diagnostics, CRM, warranty, and store inventory' }
    ],
    sections: [
      {
        title: 'Drag-and-drop story builder',
        description: 'Technicians curate sections, reorder timelines, and add annotations without leaving the workspace.',
        emphasis: 'dark',
        features: [
          { title: 'Live previews', description: 'Material-inspired canvas mirrors the PDF output.', icon: 'frame' },
          { title: 'Smart placeholders', description: 'Auto-fills serials, warranty info, and customer notes.', icon: 'automation' },
          { title: 'One-click export', description: 'Generates branded PDFs with localized content.', icon: 'sparkles' }
        ]
      },
      {
        title: 'Analytics for managers',
        description: 'Store leads can see throughput, conversion rates, and attachment sales opportunities instantly.',
        emphasis: 'light',
        features: [
          { title: 'Dashboard widgets', description: 'Chart.js visualizations tuned for quick scanning.', icon: 'chart' },
          { title: 'Team insights', description: 'Compare technician output with smart filters.', icon: 'radar' },
          { title: 'Follow-up nudges', description: 'Trigger actions when metrics dip below thresholds.', icon: 'messages' }
        ]
      },
      {
        title: 'Collaboration in context',
        description: 'Comments, approvals, and PDF history are embedded directly in each project.',
        emphasis: 'accent',
        features: [
          { title: 'Role aware workflows', description: 'Approvals unlock final exports to customers.', icon: 'workflow' },
          { title: 'Activity timeline', description: 'Every change logged with friendly diffs.', icon: 'bolt' },
          { title: 'Secure distribution', description: 'Share links expire after delivery confirmation.', icon: 'shield' }
        ]
      }
    ],
    experience: {
      title: 'Turning data overload into narrative clarity',
      tagline: 'Designing a calm workspace around dense data',
      description:
        'I collaborated with Elkjøp store leads to replace ad-hoc spreadsheets with an app that celebrates clarity. The interface balances enterprise controls with a writing environment that feels inviting.',
      bullets: [
        'Shipped offline-capable PDF generation with React PDF.',
        'Created custom charts tuned for in-store screens and tablets.',
        'Integrated with IndexedDB for reliable drafts during outages.'
      ]
    },
    palette: ['#0f172a', '#22c55e', '#16a34a', '#bbf7d0', '#f7fee7'],
    callToAction: {
      title: 'Have data that deserves a better story?',
      description: 'Let’s craft a reporting experience that impresses leadership and customers.',
      primaryLabel: 'Design a reporting tool',
      secondaryLabel: 'Back to portfolio'
    }
  },
  'dream-pixel-editor': {
    id: 'dream-pixel-editor',
    hero: {
      eyebrow: 'Dream Pixel Editor',
      title: 'Retro creation suite for pixel-perfect art',
      subtitle: 'Sprite animation workflow powered by modern web tech',
      description:
        'Dream Pixel Editor embraces the nostalgia of pixel art while packing pro-grade tooling—layers, onion skinning, color pickers, and export pipelines for games.',
      image: '/images/dream-pixel.png',
      imageAlt: 'Dream Pixel Editor interface',
      imageStyle: 'window',
      gradientFrom: 'from-amber-400/25',
      gradientTo: 'to-slate-900/85',
      accent: 'bg-amber-300/80 text-slate-900',
      backdrop: 'bg-[radial-gradient(circle_at_top_left,#fbbf2422,transparent_60%)]'
    },
    stats: [
      { label: 'Frames rendered', value: '50k+', description: 'Across exported sprite sheets' },
      { label: 'Brush presets', value: '24', description: 'Pixel-perfect tools built for keyboards' },
      { label: 'Artists onboarded', value: '8', description: 'Used in indie game pipelines' }
    ],
    sections: [
      {
        title: 'Built for flow state',
        description: 'Keyboard shortcuts, minimal UI chrome, and lightning-fast canvases keep artists immersed.',
        emphasis: 'dark',
        features: [
          { title: 'Onion skinning', description: 'Preview previous/next frames for buttery motion.', icon: 'frame' },
          { title: 'Palette swapping', description: 'Experiment with themes instantly via color tokens.', icon: 'palette' },
          { title: 'Timeline scrubbing', description: 'Scrub animations with WASD-style controls.', icon: 'workflow' }
        ]
      },
      {
        title: 'Modern web foundation',
        description: 'React + Vite + Tailwind deliver desktop-class performance while staying portable.',
        emphasis: 'light',
        features: [
          { title: 'WebAssembly brushes', description: 'PNG.js handles high-performance pixel buffers.', icon: 'bolt' },
          { title: 'State snapshots', description: 'Time-travel undo and checkpointing for safety.', icon: 'shield' },
          { title: 'Export pipelines', description: 'Spit out GIFs, sprite sheets, or layered PNGs.', icon: 'toolbox' }
        ]
      },
      {
        title: 'Community friendly',
        description: 'Share palettes, import Itch.io assets, and collaborate asynchronously.',
        emphasis: 'accent',
        features: [
          { title: 'Palette library', description: 'Curated retro palettes like DawnBringer and Arne16.', icon: 'sparkles' },
          { title: 'Asset importer', description: 'Drag ZIPs, auto-slice tiles, and organize scenes.', icon: 'layers' },
          { title: 'Feedback mode', description: 'Comment on frames with timestamped notes.', icon: 'messages' }
        ]
      }
    ],
    experience: {
      title: 'A love letter to pixel art tooling',
      tagline: 'Designing delightful creation loops',
      description:
        'The editor marries playful aesthetics with uncompromising keyboard ergonomics. It is deliberately opinionated so artists can focus on the craft instead of settings.',
      bullets: [
        'Crafted custom shaders for CRT-inspired preview modes.',
        'Implemented high-frequency autosave with IndexedDB.',
        'Researched classic tools like Aseprite to match beloved workflows.'
      ]
    },
    palette: ['#0f172a', '#fbbf24', '#f97316', '#fed7aa', '#fffbeb'],
    callToAction: {
      title: 'Want to build a creation tool?',
      description: 'Let’s create software that sparks joy for artists, editors, and makers.',
      primaryLabel: 'Pitch a creative app',
      secondaryLabel: 'Back to portfolio'
    }
  },
  'secret-informant': {
    id: 'secret-informant',
    hero: {
      eyebrow: 'Secret Informant',
      title: 'Anonymous SMS with accountability baked in',
      subtitle: 'Twilio-powered messaging for sensitive whistleblower tips',
      description:
        'Secret Informant balances anonymity with guardrails. It empowers employees to share concerns while preventing abuse with rate limits, sentiment checks, and audit trails.',
      image: '/images/secret-informant.png',
      imageAlt: 'Secret Informant UI',
      imageStyle: 'cards',
      gradientFrom: 'from-rose-500/20',
      gradientTo: 'to-slate-900/80',
      accent: 'bg-rose-400/80 text-slate-950',
      backdrop: 'bg-[radial-gradient(circle_at_center,#fb718522,transparent_60%)]'
    },
    stats: [
      { label: 'Messages processed', value: '9k+', description: 'Across anonymous inboxes' },
      { label: 'False positives', value: '-54%', description: 'Thanks to contextual sentiment analysis' },
      { label: 'Response SLA', value: '< 1 hr', description: 'Alerts route to the right responders instantly' }
    ],
    sections: [
      {
        title: 'Psychological safety first',
        description: 'Carefully worded flows guide whistleblowers through a calm, private experience that still feels trustworthy.',
        emphasis: 'dark',
        features: [
          { title: 'One-way anonymity', description: 'Reporters stay unknown, reviewers can still reply.', icon: 'messages' },
          { title: 'Multi-channel alerts', description: 'Escalations reach SMS, email, and Slack.', icon: 'bolt' },
          { title: 'Reassuring UI', description: 'Soft gradients, reassuring copy, and progress cues.', icon: 'sparkles' }
        ]
      },
      {
        title: 'Guardrails against abuse',
        description: 'Advanced rate limiting, phone fingerprinting, and NLP filters ensure the system stays healthy.',
        emphasis: 'light',
        features: [
          { title: 'Twilio moderation', description: 'Screen out spam and malicious patterns automatically.', icon: 'shield' },
          { title: 'Duplicate detection', description: 'Catch repeated submissions with fuzzy matching.', icon: 'radar' },
          { title: 'Audit logging', description: 'Tamper-proof ledger with hashed entries.', icon: 'workflow' }
        ]
      },
      {
        title: 'Operations dashboards',
        description: 'Admins triage cases, assign reviewers, and track resolution progress in real time.',
        emphasis: 'accent',
        features: [
          { title: 'Case timeline', description: 'Timeline view organizes all replies and notes.', icon: 'layers' },
          { title: 'Role-based views', description: 'Ensure confidentiality between departments.', icon: 'toolbox' },
          { title: 'Analytics pulse', description: 'Trends highlight hotspots before they escalate.', icon: 'chart' }
        ]
      }
    ],
    experience: {
      title: 'Building trust through thoughtful UX copy',
      tagline: 'Working closely with HR and legal teams',
      description:
        'The project required translating compliance requirements into an empathetic flow. Every prompt, status, and confirmation was co-written with HR to reinforce safety.',
      bullets: [
        'Implemented Twilio Verify to validate contact methods without breaking anonymity.',
        'Crafted retention policies and GDPR-compliant data handling.',
        'Conducted tabletop exercises to test crisis escalation paths.'
      ]
    },
    palette: ['#0f172a', '#fb7185', '#f43f5e', '#fecdd3', '#fff1f2'],
    callToAction: {
      title: 'Have a sensitive workflow to design?',
      description: 'Let’s build a secure, human-centered experience that people trust.',
      primaryLabel: 'Design a trust workflow',
      secondaryLabel: 'Back to portfolio'
    }
  },
  'knowledge-base': {
    id: 'knowledge-base',
    hero: {
      eyebrow: 'Knowledge Base',
      title: 'Internal knowledge sharing with AI-powered workflows',
      subtitle: 'Real-time documentation that keeps support teams aligned',
      description:
        'This platform combines collaborative editing, AI-assisted drafts, and proactive notifications so knowledge never gets stale and agents always have the latest answer.',
      image: '/images/knowledge-base.png',
      imageAlt: 'Knowledge base interface',
      imageStyle: 'window',
      gradientFrom: 'from-indigo-500/20',
      gradientTo: 'to-slate-900/80',
      accent: 'bg-indigo-400/80 text-slate-950',
      backdrop: 'bg-[radial-gradient(circle_at_top,#6366f133,transparent_60%)]'
    },
    stats: [
      { label: 'Articles published', value: '1.8k', description: 'Curated with review workflows' },
      { label: 'Agent adoption', value: '92%', description: 'Monthly active support teammates' },
      { label: 'Resolution time', value: '-26%', description: 'Faster answers thanks to contextual search' }
    ],
    sections: [
      {
        title: 'Create together',
        description: 'Socket.IO powers multiplayer editing while AI drafts give writers a running start.',
        emphasis: 'dark',
        features: [
          { title: 'Live presence', description: 'See cursors, comments, and edits in real time.', icon: 'messages' },
          { title: 'AI assisted', description: 'Kickstart drafts with OpenAI suggestions.', icon: 'magic' },
          { title: 'Review gates', description: 'Approval workflows keep content trustworthy.', icon: 'shield' }
        ]
      },
      {
        title: 'Find answers instantly',
        description: 'Semantic search, filters, and collections get teammates to the right content without friction.',
        emphasis: 'light',
        features: [
          { title: 'Context search', description: 'Vector search understands intent, not just keywords.', icon: 'globe' },
          { title: 'Personalized feeds', description: 'Agents see updates relevant to their teams.', icon: 'radar' },
          { title: 'Offline kits', description: 'Export packs for stores with restricted access.', icon: 'toolbox' }
        ]
      },
      {
        title: 'Keep knowledge fresh',
        description: 'Automation ensures stale content gets refreshed before it causes problems.',
        emphasis: 'accent',
        features: [
          { title: 'Lifecycle reminders', description: 'Owners receive prompts when articles age out.', icon: 'automation' },
          { title: 'Health dashboards', description: 'Track coverage gaps and document engagement.', icon: 'chart' },
          { title: 'Incident mode', description: 'Broadcast urgent updates across channels instantly.', icon: 'bolt' }
        ]
      }
    ],
    experience: {
      title: 'Knowledge that stays alive',
      tagline: 'Designing resilient documentation habits',
      description:
        'Beyond code, this project was about culture change—making documentation collaborative, measurable, and energizing. The platform celebrates updates instead of treating docs as chores.',
      bullets: [
        'Designed cross-platform desktop and web clients in tandem.',
        'Implemented granular permissions tied to HRIS roles.',
        'Set up automated quality scoring with weekly digests.'
      ]
    },
    palette: ['#0f172a', '#6366f1', '#4f46e5', '#c7d2fe', '#eef2ff'],
    callToAction: {
      title: 'Let’s supercharge your knowledge ops',
      description: 'If your documentation feels stale, we can build the tools and rituals to fix it.',
      primaryLabel: 'Start a knowledge project',
      secondaryLabel: 'Back to portfolio'
    }
  }
};

export const getProjectShowcase = (id: string) => projectShowcases[id];
