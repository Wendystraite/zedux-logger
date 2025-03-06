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

 ✓ tests/addZeduxLogger.bench.ts > addZeduxLogger 1995ms
     name                          hz      min      max     mean      p75      p99     p995     p999      rme  samples
   · basic zedux logger      1,123.52   0.3688  10.5369   0.8901   0.9022   3.4802   5.1641  10.5369   ±7.23%      562   fastest
   · zedux logger             45.6794  14.8655  52.9693  21.8917  22.1447  52.9693  52.9693  52.9693  ±17.19%       23   slowest
   · zedux logger one lines   49.4197  16.1319  24.9644  20.2348  21.5278  24.9644  24.9644  24.9644   ±4.99%       25

 BENCH  Summary

  basic zedux logger - tests/addZeduxLogger.bench.ts > addZeduxLogger
    22.73x faster than zedux logger one lines
    24.60x faster than zedux logger

*/

describe('addZeduxLogger', () => {
  bench('basic zedux logger', () => {
    const ecosystem = createEcosystem();
    addBasicZeduxLogger(ecosystem);
    runBench(ecosystem);
  });

  bench('zedux logger', () => {
    const ecosystem = createEcosystem();
    addZeduxLogger(ecosystem);
    runBench(ecosystem);
  });

  bench('zedux logger one lines', () => {
    const ecosystem = createEcosystem();
    addZeduxLogger(ecosystem, { oneLineLogs: true });
    runBench(ecosystem);
  });
});
