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

 ✓ tests/addZeduxLogger.bench.ts > addZeduxLogger 1305ms
     name                      hz      min      max     mean      p75      p99     p995     p999     rme  samples
   · basic zedux logger  1,808.97   0.2940   5.0787   0.5528   0.5254   1.9800   2.5519   5.0787  ±4.53%      905   fastest
   · zedux logger         78.7171  10.8497  21.3964  12.7037  13.3945  21.3964  21.3964  21.3964  ±4.67%       40

 BENCH  Summary

  basic zedux logger - tests/addZeduxLogger.bench.ts > addZeduxLogger
    22.98x faster than zedux logger

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
});
