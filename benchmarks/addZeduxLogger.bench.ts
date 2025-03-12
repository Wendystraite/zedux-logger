import { describe } from 'vitest';

import { benchBasicLogger } from './utils/benchBasicLogger';
import { benchZeduxLogger } from './utils/benchZeduxLogger';
import { mockConsole } from './utils/mockConsole';

mockConsole();

describe('addZeduxLogger', () => {
  benchBasicLogger();

  benchZeduxLogger('incremental graph', {
    useIncrementalGraph: true,
  });

  benchZeduxLogger('no incremental graph', {
    useIncrementalGraph: false,
  });
});
