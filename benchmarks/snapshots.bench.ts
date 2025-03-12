import { describe } from 'vitest';

import { benchBasicLogger } from './utils/benchBasicLogger';
import { benchZeduxLogger } from './utils/benchZeduxLogger';
import { mockConsole } from './utils/mockConsole';

mockConsole();

describe('snapshots', () => {
  benchBasicLogger();

  benchZeduxLogger('no snapshots', { showSnapshot: true, showGraph: false });

  benchZeduxLogger('snapshots', { showSnapshot: true, showGraph: false });
});
