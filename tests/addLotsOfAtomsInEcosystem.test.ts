import { createEcosystem } from '@zedux/react';
import { describe, expect, it } from 'vitest';

import {
  LOTS_OF_ATOMS_IDS,
  addLotsOfAtomsInEcosystem,
} from './addLotsOfAtomsInEcosystem';

describe('addLotsOfAtomsInEcosystem', () => {
  it('should add a lot of atoms in the ecosystem', () => {
    const ecosystem = createEcosystem();
    addLotsOfAtomsInEcosystem(ecosystem);
    expect(Array.from(ecosystem.n.keys())).toEqual(LOTS_OF_ATOMS_IDS);
  });
});
