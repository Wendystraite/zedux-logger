import { type Cleanup, type Ecosystem, createEcosystem } from '@zedux/react';
import { bench } from 'vitest';

import { addBasicZeduxLogger } from '../../src/addBasicZeduxLogger';
import { runBench } from '../runBench';
import { DEFAULT_BENCH_OPTIONS } from './defaultBenchOptions';

export function benchBasicLogger(): void {
  let ecosystem: Ecosystem;
  let cleanup: Cleanup;

  bench(
    'basic zedux logger',
    () => {
      runBench(ecosystem);
    },
    {
      ...DEFAULT_BENCH_OPTIONS,

      setup() {
        ecosystem = createEcosystem({ id: `bench[basic zedux logger]` });
        cleanup = addBasicZeduxLogger(ecosystem);
      },

      teardown() {
        cleanup();
        ecosystem.destroy(true);
      },
    },
  );
}
