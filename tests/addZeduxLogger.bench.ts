import { type Ecosystem, atom, createEcosystem } from '@zedux/react';
import { forEach, values } from 'remeda';
import { bench, describe, vi } from 'vitest';

import { addBasicZeduxLogger } from '../src/addBasicZeduxLogger';
import { addZeduxLogger } from '../src/addZeduxLogger';
import type { ZeduxLoggerOptions } from '../src/types/ZeduxLoggerOptions';

const TO_MOCK: {
  [K in keyof NonNullable<ZeduxLoggerOptions['console']>]: K;
} = {
  log: 'log',
  warn: 'warn',
  group: 'group',
  groupCollapsed: 'groupCollapsed',
  groupEnd: 'groupEnd',
};

forEach(values(TO_MOCK), (method) => {
  vi.spyOn(console, method).mockImplementation(() => undefined);
});

function runBench(ecosystem: Ecosystem) {
  for (let i = 0; i < 100; i++) {
    const nbAtom = atom(`atom${i}`, i);
    ecosystem.get(nbAtom);
  }
}

/*

 ✓ tests/addZeduxLogger.bench.ts > addZeduxLogger 6193ms
     name                                    hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · basic zedux logger                1,325.14   0.3636   6.4895   0.7546   0.7178   3.5537   3.8694   6.4895  ±6.16%      664   fastest
   · zedux logger                       44.9748  15.3198  47.5096  22.2347  23.6917  42.8014  47.5096  47.5096  ±4.11%      100
   · zedux logger one lines             44.2411  12.1256  69.6589  22.6034  25.2088  66.1401  69.6589  69.6589  ±8.60%      100   slowest
   · zedux logger no graph & snapshot    180.63   2.7927  11.5419   5.5361   7.2246  10.9144  11.5419  11.5419  ±8.36%      100

 BENCH  Summary

  basic zedux logger - tests/addZeduxLogger.bench.ts > addZeduxLogger
    7.34x faster than zedux logger no graph & snapshot
    29.46x faster than zedux logger
    29.95x faster than zedux logger one lines

*/

const benchOptions = { iterations: 100 };

describe('addZeduxLogger', () => {
  bench(
    'basic zedux logger',
    () => {
      const ecosystem = createEcosystem();
      addBasicZeduxLogger(ecosystem);
      runBench(ecosystem);
    },
    benchOptions,
  );

  bench(
    'zedux logger',
    () => {
      const ecosystem = createEcosystem();
      addZeduxLogger(ecosystem);
      runBench(ecosystem);
    },
    benchOptions,
  );

  bench(
    'zedux logger one lines',
    () => {
      const ecosystem = createEcosystem();
      addZeduxLogger(ecosystem, { oneLineLogs: true });
      runBench(ecosystem);
    },
    benchOptions,
  );

  bench(
    'zedux logger no graph & snapshot',
    () => {
      const ecosystem = createEcosystem();
      addZeduxLogger(ecosystem, {
        showInDetails: { showGraph: false, showSnapshot: false },
      });
      runBench(ecosystem);
    },
    benchOptions,
  );
});
