import { describe } from 'vitest';

import { benchBasicLogger } from './utils/benchBasicLogger';
import { benchZeduxLogger } from './utils/benchZeduxLogger';
import { mockConsole } from './utils/mockConsole';

mockConsole();

describe('addZeduxLogger', () => {
  benchBasicLogger();

  benchZeduxLogger('all enabled with incremental graph', {
    templates: ['all-enabled'],
    options: {
      debugOptions: {
        useIncrementalGraph: true,
      },
    },
  });

  benchZeduxLogger('all enabled without incremental graph', {
    templates: ['all-enabled'],
    options: {
      debugOptions: {
        useIncrementalGraph: false,
      },
    },
  });
});
