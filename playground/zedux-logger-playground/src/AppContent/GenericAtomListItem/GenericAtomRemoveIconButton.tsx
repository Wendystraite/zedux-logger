import { TrashIcon } from '@heroicons/react/24/solid';
import { useAtomInstance } from '@zedux/react';

import { genericAtomsAtom } from '../../atoms/genericAtomsAtom';
import { IconButton } from '../../ui/IconButton';
import withSuspense from '../../utils/withSuspense';
import { useGenericAtomContext } from './GenericAtomContext';

export const GenericAtomRemoveIconButton = withSuspense(
  function GenericAtomRemoveIconButton() {
    const genericAtom = useGenericAtomContext();
    const {
      exports: { removeAtom },
    } = useAtomInstance(genericAtomsAtom);
    return (
      <IconButton
        className="size-8 bg-red-500 hover:bg-red-600"
        onClick={() => {
          removeAtom(genericAtom.id);
        }}
      >
        <TrashIcon />
      </IconButton>
    );
  },
);
