import { useAtomInstance } from '@zedux/react';

import type { PromiseGenericAtom } from '../../atoms/genericAtomsAtom';
import { Button } from '../../ui/Button';
import withSuspense from '../../utils/withSuspense';
import { useGenericAtomContext } from './GenericAtomContext';

export const PromiseGenericAtomContent = withSuspense(
  function PromiseGenericAtomContent() {
    const genericAtom = useGenericAtomContext() as PromiseGenericAtom;
    const {
      exports: { reset },
    } = useAtomInstance(genericAtom.template);
    return <Button onClick={reset}>Reset promise</Button>;
  },
);
