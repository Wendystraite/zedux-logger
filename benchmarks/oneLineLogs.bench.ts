import { describe } from 'vitest';

import type { ZeduxLoggerBuiltInTemplateKey } from '../src/types/ZeduxLoggerBuiltInTemplateKey';
import { benchBasicLogger } from './utils/benchBasicLogger';
import { benchZeduxLogger } from './utils/benchZeduxLogger';
import { mockConsole } from './utils/mockConsole';

mockConsole();

describe('one line logs', () => {
  benchBasicLogger();

  const defaultTemplates = [
    'no-snapshots',
    'no-deobfuscate',
    'no-graphs',
  ] satisfies ZeduxLoggerBuiltInTemplateKey[];

  benchZeduxLogger('grouped logs', {
    templates: [...defaultTemplates, 'grouped-logs'],
  });

  benchZeduxLogger('one lines logs', {
    templates: [...defaultTemplates, 'one-line-logs'],
  });
});
