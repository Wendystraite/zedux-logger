import { describe } from 'vitest';

import type { ZeduxLoggerBuiltInTemplateKey } from '../src/types/ZeduxLoggerBuiltInTemplateKey';
import { benchBasicLogger } from './utils/benchBasicLogger';
import { benchZeduxLogger } from './utils/benchZeduxLogger';
import { mockConsole } from './utils/mockConsole';

mockConsole();

describe('deobfuscate', () => {
  benchBasicLogger();

  const defaultTemplates = [
    'no-snapshots',
    'no-deobfuscate',
    'no-graphs',
  ] satisfies ZeduxLoggerBuiltInTemplateKey[];

  benchZeduxLogger('no deobfuscate', {
    templates: [...defaultTemplates, 'no-deobfuscate'],
  });

  benchZeduxLogger('deobfuscate', {
    templates: [...defaultTemplates, 'deobfuscate'],
  });
});
