import { useAtomValue } from '@zedux/react';

import { Skeleton } from '../../ui/Skeleton';
import withSuspense from '../../utils/withSuspense';
import { useGenericAtomContext } from './GenericAtomContext';

export const GenericAtomValue = withSuspense(
  function GenericAtomValue() {
    const genericAtom = useGenericAtomContext();
    const value = useAtomValue(genericAtom.template);
    return <span className="text-gray-500">{String(value)}</span>;
  },
  <Skeleton as="span" className="inline-block align-text-bottom w-12 h-5" />,
);
