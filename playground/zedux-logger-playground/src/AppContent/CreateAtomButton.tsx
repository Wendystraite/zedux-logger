import { useAtomInstance } from '@zedux/react';

import { atomTypeAtom } from '../atoms/atomTypeAtom';
import { genericAtomsAtom } from '../atoms/genericAtomsAtom';
import { Button } from '../ui/Button';

export function CreateAtomButton() {
  const atoms = useAtomInstance(genericAtomsAtom);
  const atomType = useAtomInstance(atomTypeAtom);
  return (
    <Button
      onClick={() => {
        atoms.exports.addAtom(atomType.getOnce());
      }}
    >
      create an atom
    </Button>
  );
}
