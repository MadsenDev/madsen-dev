import type { ComponentType } from 'react';

import {
  ArrowLeft,
  Bell,
  Calendar,
  ExternalLink,
  Frame,
  Github,
  Globe2,
  Layers,
  LineChart,
  MapPin,
  MessageSquare,
  Palette as PaletteIcon,
  Pencil,
  Radar,
  Shield,
  Sparkles,
  Star,
  ToolCase,
  Users,
  Workflow,
  Bolt,
  LayoutDashboard,
  Bot,
  Cloud,
  Wand2
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
  users: Users,
  calendar: Calendar,
  bell: Bell,
  star: Star,
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
