import { describe } from 'vitest';

import { benchBasicLogger } from './utils/benchBasicLogger';
import { benchZeduxLogger } from './utils/benchZeduxLogger';
import { mockConsole } from './utils/mockConsole';

mockConsole();

describe('snapshots', () => {
  benchBasicLogger();

  benchZeduxLogger('no snapshots', {
    templates: ['no-snapshots'],
  });

  benchZeduxLogger('snapshots', {
    templates: ['snapshots'],
  });
});
