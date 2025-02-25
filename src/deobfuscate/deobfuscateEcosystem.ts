import type { Ecosystem } from '@zedux/react';
import { pipe } from 'remeda';

import { deobfuscate } from './deobfuscate.js';

export function deobfuscateEcosystem(ecosystem: Ecosystem): Ecosystem {
  return pipe(
    // eslint-disable-next-line @typescript-eslint/no-misused-spread
    { ...ecosystem } as Ecosystem,

    (deobfuscated) => {
      (deobfuscated as unknown as Record<'__original', unknown>).__original =
        ecosystem;
      return deobfuscated;
    },

    deobfuscate('b', 'baseKeys'),
    deobfuscate('n', 'nodes'),
  );
}
