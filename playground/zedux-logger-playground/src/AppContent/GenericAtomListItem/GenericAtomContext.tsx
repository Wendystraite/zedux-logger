import { createContext, useContext } from 'react';

import type { GenericAtom } from '../../atoms/genericAtomsAtom';

export const GenericAtomContext = createContext<GenericAtom | undefined>(
  undefined,
);

export function useGenericAtomContext() {
  const genericAtom = useContext(GenericAtomContext);
  if (genericAtom === undefined) {
    throw new Error('GenericAtomContext is not provided');
  }
  return genericAtom;
}
