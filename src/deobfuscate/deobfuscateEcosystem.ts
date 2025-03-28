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

    deobfuscate('C', 'eventCounts'),
    deobfuscate('L', 'eventListeners'),
    deobfuscate('S', 'getScopeValue'),
    deobfuscate('T', 'Type'),
    deobfuscate('b', 'baseKeys'),
    deobfuscate('cf', 'current finishBuffer'),
    deobfuscate('ch', 'current handleStateChange'),
    deobfuscate('cs', 'current startBuffer'),
    deobfuscate('n', 'nodes'),
    deobfuscate('s', 'scopesByAtom'),
    deobfuscate('w', 'why'),
    deobfuscate('wt', 'why tail'),
    deobfuscate('j', 'job'),
    deobfuscate('u', 'updateSelectorRef'),
  );
}
