import { api, atom, injectSignal } from '@zedux/react';

import type { GenericAtom } from './genericAtomsAtom';

export const atomTypeAtom = atom('atomType', () => {
  const typeSignal = injectSignal('number' as GenericAtom['type']);
  return api(typeSignal).setExports({
    setType(type: GenericAtom['type']) {
      typeSignal.set(type);
    },
  });
});
