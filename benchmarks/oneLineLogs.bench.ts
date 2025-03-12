import { describe } from 'vitest';

import { benchBasicLogger } from './utils/benchBasicLogger';
import { benchZeduxLogger } from './utils/benchZeduxLogger';
import { mockConsole } from './utils/mockConsole';

mockConsole();

describe('one line logs', () => {
  benchBasicLogger();

  benchZeduxLogger('grouped logs', { oneLineLogs: false });

  benchZeduxLogger('one lines logs', { oneLineLogs: true });
});
