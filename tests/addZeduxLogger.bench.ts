import { type Ecosystem, atom, createEcosystem } from '@zedux/react';
import {
  entries,
  filter,
  forEach,
  isNonNullish,
  map,
  pipe,
  values,
} from 'remeda';
import { bench, describe, vi } from 'vitest';

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

 ✓ tests/addZeduxLogger.bench.ts > addZeduxLogger 1285ms
     name                      hz      min      max     mean      p75      p99     p995     p999      rme  samples
   · simple console.log  1,615.27   0.3226   6.4830   0.6191   0.5758   2.4223   3.5346   6.4830   ±5.47%      808   fastest
   · zedux logger         74.3548  10.5002  35.8879  13.4490  13.5125  35.8879  35.8879  35.8879  ±11.64%       38

 BENCH  Summary

  simple console.log - tests/addZeduxLogger.bench.ts > addZeduxLogger
    21.72x faster than zedux logger

*/

describe('addZeduxLogger', () => {
  bench('simple console.log', () => {
    const ecosystem = createEcosystem();
    ecosystem.on((eventMap) => {
      const { type, event } = pipe(
        eventMap,
        entries(),
        map(([type, event]) => ({ type, event })),
        filter(({ event }) => isNonNullish(event)),
        (events) => events[0] ?? { type: 'unknown', event: undefined },
      );

      if (typeof event === 'object') {
        // eslint-disable-next-line no-console
        console.log(type, ':', event);
      }
    });
    runBench(ecosystem);
  });

  bench('zedux logger', () => {
    const ecosystem = createEcosystem();
    addZeduxLogger(ecosystem);
    runBench(ecosystem);
  });
});
