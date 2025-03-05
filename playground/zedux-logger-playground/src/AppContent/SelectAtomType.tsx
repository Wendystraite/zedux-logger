import { useAtomState } from '@zedux/react';

import { atomTypeAtom } from '../atoms/atomTypeAtom';
import { Select } from '../ui/Select';

export function SelectAtomType() {
  const [type, { setType }] = useAtomState(atomTypeAtom);
  return (
    <Select
      value={type}
      onChange={setType}
      options={[
        { value: 'number', label: 'Number' },
        { value: 'text', label: 'Text' },
      ]}
    />
  );
}
