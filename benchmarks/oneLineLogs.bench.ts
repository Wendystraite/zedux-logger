import { describe } from 'vitest';

import { benchBasicLogger } from './utils/benchBasicLogger';
import { benchZeduxLogger } from './utils/benchZeduxLogger';
import { mockConsole } from './utils/mockConsole';

mockConsole();

describe('one line logs', () => {
  benchBasicLogger();

  const defaultOptions = {
    deobfuscateSingleLetters: false,
    showSnapshot: false,
    showGraph: false,
  };

  benchZeduxLogger('grouped logs', {
    ...defaultOptions,

    oneLineLogs: false,
  });

  benchZeduxLogger('one lines logs', {
    ...defaultOptions,

    oneLineLogs: true,
  });
});
