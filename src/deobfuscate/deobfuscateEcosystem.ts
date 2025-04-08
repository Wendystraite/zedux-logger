import { Ecosystem } from '@zedux/react';

import { deobfuscate } from './deobfuscate.js';

const deobfuscatesEcosystem = [
  deobfuscate<Ecosystem>('C', 'eventCounts'),
  deobfuscate<Ecosystem>('L', 'eventListeners'),
  deobfuscate<Ecosystem>('S', 'getScopeValue'),
  deobfuscate<Ecosystem>('T', 'Type'),
  deobfuscate<Ecosystem>('b', 'baseKeys'),
  deobfuscate<Ecosystem>('cf', 'current finishBuffer'),
  deobfuscate<Ecosystem>('ch', 'current handleStateChange'),
  deobfuscate<Ecosystem>('cs', 'current startBuffer'),
  deobfuscate<Ecosystem>('n', 'nodes'),
  deobfuscate<Ecosystem>('s', 'scopesByAtom'),
  deobfuscate<Ecosystem>('u', 'updateSelectorRef'),
];

export function deobfuscateEcosystem(original: Ecosystem): Ecosystem {
  // eslint-disable-next-line @typescript-eslint/no-misused-spread
  const deobfuscated = { ...original } as Ecosystem;

  (deobfuscated as unknown as Record<'__original', unknown>).__original =
    original;

  for (const deobfuscateEcosystem of deobfuscatesEcosystem) {
    deobfuscateEcosystem(deobfuscated);
  }

  return deobfuscated;
}
