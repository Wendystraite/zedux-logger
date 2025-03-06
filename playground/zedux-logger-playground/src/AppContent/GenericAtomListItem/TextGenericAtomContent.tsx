import { useAtomState } from '@zedux/react';

import type { TextGenericAtom } from '../../atoms/genericAtomsAtom';
import { Input } from '../../ui/Input';
import { useGenericAtomContext } from './GenericAtomContext';

export function TextGenericAtomContent() {
  const genericAtom = useGenericAtomContext() as TextGenericAtom;
  const [value, { setText }] = useAtomState(genericAtom.template);
  return <Input value={value} onChange={setText} />;
}
