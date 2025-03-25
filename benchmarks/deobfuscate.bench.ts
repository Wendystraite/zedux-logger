import { describe } from 'vitest';

import { benchBasicLogger } from './utils/benchBasicLogger';
import { benchZeduxLogger } from './utils/benchZeduxLogger';
import { mockConsole } from './utils/mockConsole';

mockConsole();

describe('deobfuscate', () => {
  benchBasicLogger();

  benchZeduxLogger('no deobfuscate', {
    templates: ['no-deobfuscate'],
  });

  benchZeduxLogger('deobfuscate', {
    templates: ['deobfuscate'],
  });
});
