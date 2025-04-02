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
      runBench(ecosystem);

      ecosystem.reset({ hydration: true, listeners: false, overrides: true });
    },
    {
      ...DEFAULT_BENCH_OPTIONS,

      setup() {
        ecosystem = createEcosystem({ id: 'bench' });
        addBasicZeduxLogger(ecosystem);
      },

      teardown() {
        ecosystem.reset({ hydration: true, listeners: true, overrides: true });
      },
    },
  );
}
