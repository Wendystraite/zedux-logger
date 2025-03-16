import { describe } from 'vitest';

import { benchBasicLogger } from './utils/benchBasicLogger';
import { benchZeduxLogger } from './utils/benchZeduxLogger';
import { mockConsole } from './utils/mockConsole';

mockConsole();

describe('deobfuscate', () => {
  benchBasicLogger();

  const defaultOptions = {
    deobfuscateSingleLetters: false,
    showSnapshot: false,
    showGraph: false,
  };

  benchZeduxLogger('no deobfuscate', {
    ...defaultOptions,

    deobfuscateSingleLetters: false,
  });

  benchZeduxLogger('deobfuscate', {
    ...defaultOptions,

    deobfuscateSingleLetters: true,
  });
});
