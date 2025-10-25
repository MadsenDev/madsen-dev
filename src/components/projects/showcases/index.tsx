import { GenericProjectShowcase } from './GenericProjectShowcase';
import { GravstellerneShowcase } from './variants/GravstellerneShowcase';
import { MadsensDevShowcase } from './variants/MadsensDevShowcase';
import { TechSupportToolsShowcase } from './variants/TechSupportToolsShowcase';
import { StartpageShowcase } from './variants/StartpageShowcase';
import { ElkjopReportShowcase } from './variants/ElkjopReportShowcase';
import { DreamPixelShowcase } from './variants/DreamPixelShowcase';
import { SecretInformantShowcase } from './variants/SecretInformantShowcase';
import { KnowledgeBaseShowcase } from './variants/KnowledgeBaseShowcase';
import type { ProjectShowcaseComponent } from './types';

export const projectShowcaseComponents: Record<string, ProjectShowcaseComponent> & {
  generic: ProjectShowcaseComponent;
} = {
  generic: GenericProjectShowcase,
  'gravstellerne-platform': GravstellerneShowcase,
  'madsens-dev': MadsensDevShowcase,
  'tech-support-tools': TechSupportToolsShowcase,
  startpage: StartpageShowcase,
  'elkjop-report-app': ElkjopReportShowcase,
  'dream-pixel-editor': DreamPixelShowcase,
  'secret-informant': SecretInformantShowcase,
  'knowledge-base': KnowledgeBaseShowcase
};
