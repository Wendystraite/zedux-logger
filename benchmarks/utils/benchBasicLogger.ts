import { cleanup as testingLibraryCleanup } from '@testing-library/react';
import { type Ecosystem, createEcosystem } from '@zedux/react';
import { bench } from 'vitest';

import { addBasicZeduxLogger } from '../../src/addBasicZeduxLogger';
import { runBench } from '../runBench';
import { DEFAULT_BENCH_OPTIONS } from './defaultBenchOptions';

export function benchBasicLogger(): void {
  let ecosystem: Ecosystem;

  bench(
    'basic zedux logger',
    () => {
      addBasicZeduxLogger(ecosystem);

      runBench(ecosystem);

      testingLibraryCleanup();
      ecosystem.reset({ hydration: true, listeners: true, overrides: true });
    },
    {
      ...DEFAULT_BENCH_OPTIONS,

      setup() {
        ecosystem = createEcosystem({ id: `bench[basic zedux logger]` });
      },

      teardown() {
        testingLibraryCleanup();
        ecosystem.reset({ hydration: true, listeners: true, overrides: true });
      },
    },
  );
}
