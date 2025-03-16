import { describe } from 'vitest';

import { benchBasicLogger } from './utils/benchBasicLogger';
import { benchZeduxLogger } from './utils/benchZeduxLogger';
import { mockConsole } from './utils/mockConsole';

mockConsole();

describe('snapshots', () => {
  benchBasicLogger();

  const defaultOptions = {
    deobfuscateSingleLetters: false,
    showSnapshot: false,
    showGraph: false,
  };

  benchZeduxLogger('no snapshots', {
    ...defaultOptions,

    showSnapshot: false,
  });

  benchZeduxLogger('snapshots', {
    ...defaultOptions,

    showSnapshot: true,
  });
});
