import { useAtomInstance } from '@zedux/react';

import type { NumberGenericAtom } from '../../atoms/genericAtomsAtom';
import { Button } from '../../ui/Button';
import { useGenericAtomContext } from './GenericAtomContext';

export function NumberGenericAtomContent() {
  const genericAtom = useGenericAtomContext() as NumberGenericAtom;
  const {
    exports: { decrement, increment },
  } = useAtomInstance(genericAtom.template);
  return (
    <div className="flex flex-row gap-1">
      <Button onClick={decrement}>-</Button>
      <Button onClick={increment}>+</Button>
    </div>
  );
}
