import { type Ecosystem } from '@zedux/react';

import { addLotsOfAtomsInEcosystem } from '../tests/addLotsOfAtomsInEcosystem';

export function runBench(ecosystem: Ecosystem) {
  addLotsOfAtomsInEcosystem(ecosystem, {
    triggerSomeChanges: true,
    noRenders: true, // Causes too much memory leaks
  });
}
