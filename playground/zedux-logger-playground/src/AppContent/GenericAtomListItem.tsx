import { TrashIcon } from '@heroicons/react/24/solid';
import {
  type AnyAtomInstance,
  type ExportsOf,
  useAtomInstance,
  useAtomValue,
} from '@zedux/react';
import { memo } from 'react';

import {
  type GenericAtom,
  type NumberGenericAtom,
  type TextGenericAtom,
  genericAtomsAtom,
} from '../atoms/genericAtomsAtom';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import { Input } from '../ui/Input';

export const GenericAtomListItem = memo(function GenericAtomListItem({
  atom,
}: {
  atom: GenericAtom;
}) {
  const genericAtoms = useAtomInstance(genericAtomsAtom);
  const instance = useAtomInstance(atom.template, []) as AnyAtomInstance;
  const value = useAtomValue(instance) as unknown;
  return (
    <li className="flex flex-col border-b-gray-500 border-dashed border-2 p-2 gap-1">
      <h2>{instance.id}</h2>
      <p>
        value: <span className="text-gray-500">{String(value)}</span>
      </p>
      {atom.type === 'number' && (
        <div className="flex flex-row gap-1">
          <Button
            onClick={
              (instance.exports as ExportsOf<NumberGenericAtom['template']>)
                .decrement
            }
          >
            -
          </Button>
          <Button
            onClick={
              (instance.exports as ExportsOf<NumberGenericAtom['template']>)
                .increment
            }
          >
            +
          </Button>
        </div>
      )}
      {atom.type === 'text' && (
        <Input
          value={value as string}
          onChange={(value) => {
            (
              instance.exports as ExportsOf<TextGenericAtom['template']>
            ).setText(value);
          }}
        />
      )}
      <IconButton
        className="size-8 bg-red-500 hover:bg-red-600"
        onClick={() => {
          genericAtoms.exports.removeAtom(atom.id);
        }}
      >
        <TrashIcon />
      </IconButton>
    </li>
  );
});
