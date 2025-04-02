import { describe } from 'vitest';

import type { ZeduxLoggerBuiltInTemplateKey } from '../src/types/ZeduxLoggerBuiltInTemplateKey';
import { benchBasicLogger } from './utils/benchBasicLogger';
import { benchZeduxLogger } from './utils/benchZeduxLogger';
import { mockConsole } from './utils/mockConsole';

mockConsole();

describe('snapshots', () => {
  benchBasicLogger();

  const defaultTemplates = [
    'no-snapshots',
    'no-deobfuscate',
    'no-graphs',
  ] satisfies ZeduxLoggerBuiltInTemplateKey[];

  benchZeduxLogger('no snapshots', {
    templates: [...defaultTemplates, 'no-snapshots'],
  });

  benchZeduxLogger('snapshots', {
    templates: [...defaultTemplates, 'snapshots'],
  });
});
