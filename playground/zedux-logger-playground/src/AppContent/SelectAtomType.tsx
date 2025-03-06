import { useAtomState } from '@zedux/react';
import { entries } from 'remeda';

import { atomTypeAtom } from '../atoms/atomTypeAtom';
import type { GenericAtom } from '../atoms/genericAtomsAtom';
import { Select } from '../ui/Select';

const GENERIC_ATOM_LABEL_BY_TYPE: Record<GenericAtom['type'], string> = {
  number: 'Number',
  text: 'Text',
  promise: 'Promise',
};

const options = entries(GENERIC_ATOM_LABEL_BY_TYPE).map(([type, label]) => ({
  value: type,
  label,
}));

export function SelectAtomType() {
  const [type, { setType }] = useAtomState(atomTypeAtom);
  return <Select value={type} onChange={setType} options={options} />;
}
