import { useAtomValue } from '@zedux/react';

import { genericAtomsAtom } from '../atoms/genericAtomsAtom';
import { GenericAtomListItem } from './GenericAtomListItem';

export function GenericAtomList() {
  const genericAtoms = useAtomValue(genericAtomsAtom);
  return genericAtoms.map((atom) => (
    <GenericAtomListItem key={atom.id} atom={atom} />
  ));
}
