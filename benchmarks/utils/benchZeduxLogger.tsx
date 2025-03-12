import { type Ecosystem, createEcosystem } from '@zedux/react';
import { bench } from 'vitest';

import { addZeduxLogger } from '../../src/addZeduxLogger';
import {
  ALL_ENABLED_ZEDUX_LOGGER_OPTIONS,
  type CompleteZeduxLoggerOptions,
  type ZeduxLoggerOptions,
} from '../../src/types/ZeduxLoggerOptions';
import { defaults } from '../../src/utils/defaults';
import { runBench } from '../runBench';
import { DEFAULT_BENCH_OPTIONS } from './defaultBenchOptions';

// All options without debug options
const DEFAULT_ZEDUX_LOGGER_BENCH_OPTIONS: CompleteZeduxLoggerOptions = defaults(
  ALL_ENABLED_ZEDUX_LOGGER_OPTIONS,
  {
    debugOptions: {
      checkIncrementalGraphConsistency: false,
      logOptions: false,
      useIncrementalGraph: false,
    } satisfies CompleteZeduxLoggerOptions['debugOptions'],
  },
);

export function benchZeduxLogger(
  name: string,
  options: Pick<ZeduxLoggerOptions, 'oneLineLogs'> &
    Pick<
      NonNullable<ZeduxLoggerOptions['showInDetails']>,
      'showGraph' | 'showSnapshot'
    > &
    Pick<
      NonNullable<ZeduxLoggerOptions['debugOptions']>,
      'useIncrementalGraph'
    > &
    Pick<
      NonNullable<ZeduxLoggerOptions['graphOptions']>,
      | 'showBottomUpGraph'
      | 'showFlatGraph'
      | 'showTopDownGraph'
      | 'showByNamespacesGraph'
    >,
): void {
  const {
    oneLineLogs = true,
    showBottomUpGraph = true,
    showByNamespacesGraph = true,
    showFlatGraph = true,
    showGraph = true,
    showSnapshot = true,
    showTopDownGraph = true,
    useIncrementalGraph = true,
  } = options;

  let ecosystem: Ecosystem;

  bench(
    `zedux logger ${name}`,
    () => {
      runBench(ecosystem);
    },
    {
      ...DEFAULT_BENCH_OPTIONS,

      setup() {
        ecosystem = createEcosystem({ id: `bench[${name}]` });

        addZeduxLogger(
          ecosystem,
          defaults(DEFAULT_ZEDUX_LOGGER_BENCH_OPTIONS, {
            oneLineLogs,
            showInDetails: { showGraph, showSnapshot },
            graphOptions: {
              showBottomUpGraph,
              showFlatGraph,
              showTopDownGraph,
              showByNamespacesGraph,
            },
            debugOptions: { useIncrementalGraph },
          }),
        );
      },

      teardown() {
        ecosystem.destroy(true);
      },
    },
  );
}
