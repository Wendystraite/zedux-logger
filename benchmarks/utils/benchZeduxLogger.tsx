import { cleanup as testingLibraryCleanup } from '@testing-library/react';
import { type Ecosystem, createEcosystem } from '@zedux/react';
import { bench } from 'vitest';

import { addZeduxLogger } from '../../src/addZeduxLogger';
import type { ZeduxLoggerBuiltInTemplateKey } from '../../src/types/ZeduxLoggerBuiltInTemplateKey';
import { type ZeduxLoggerOptions } from '../../src/types/ZeduxLoggerOptions';
import { runBench } from '../runBench';
import { DEFAULT_BENCH_OPTIONS } from './defaultBenchOptions';

export function benchZeduxLogger(
  name: string,
  options: ZeduxLoggerOptions<ZeduxLoggerBuiltInTemplateKey>,
): void {
  let ecosystem: Ecosystem;

  bench(
    `zedux logger ${name}`,
    () => {
      addZeduxLogger(ecosystem, options);

      runBench(ecosystem);

      testingLibraryCleanup();
      ecosystem.reset({ hydration: true, listeners: true, overrides: true });
    },
    {
      ...DEFAULT_BENCH_OPTIONS,

      setup() {
        ecosystem = createEcosystem({ id: `bench[${name}]` });
      },

      teardown() {
        testingLibraryCleanup();
        ecosystem.reset({ hydration: true, listeners: true, overrides: true });
      },
    },
  );
}
