import type { ComponentType } from 'react';

import {
  ArrowLeft,
  ExternalLink,
  Github,
  Sparkles,
  Bolt,
  Layers,
  MapPin,
  MessageSquare,
  Shield,
  Palette as PaletteIcon,
  Workflow,
  LineChart,
  ToolCase,
  LayoutDashboard,
  Bot,
  Cloud,
  Wand2,
  Pencil,
  Radar,
  Frame,
  Globe2
} from 'lucide-react';

import type { ShowcaseIcon } from '@/data/projectPages';

export interface ProjectShowcaseLabels {
  backToHome: string;
  viewDemo: string;
  viewCode: string;
  technologiesUsed: string;
}

export const iconComponents: Record<ShowcaseIcon, ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  bolt: Bolt,
  layers: Layers,
  map: MapPin,
  messages: MessageSquare,
  shield: Shield,
  palette: PaletteIcon,
  workflow: Workflow,
  chart: LineChart,
  toolbox: ToolCase,
  widgets: LayoutDashboard,
  automation: Bot,
  cloud: Cloud,
  magic: Wand2,
  pencil: Pencil,
  radar: Radar,
  frame: Frame,
  globe: Globe2
};

export const callToActionIcons = {
  primary: Sparkles,
  secondary: ArrowLeft,
  external: ExternalLink,
  github: Github
};
