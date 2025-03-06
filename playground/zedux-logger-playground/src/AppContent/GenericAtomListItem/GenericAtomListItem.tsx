import { type ComponentType, memo } from 'react';

import { type GenericAtom } from '../../atoms/genericAtomsAtom';
import withSuspense from '../../utils/withSuspense';
import { GenericAtomContext } from './GenericAtomContext';
import { GenericAtomRemoveIconButton } from './GenericAtomRemoveIconButton';
import { GenericAtomValue } from './GenericAtomValue';
import { NumberGenericAtomContent } from './NumberGenericAtomContent';
import { PromiseGenericAtomContent } from './PromiseGenericAtomContent';
import { TextGenericAtomContent } from './TextGenericAtomContent';

const GENERIC_ATOM_CONTENT_BY_TYPE: Record<GenericAtom['type'], ComponentType> =
  {
    number: NumberGenericAtomContent,
    text: TextGenericAtomContent,
    promise: PromiseGenericAtomContent,
  };

export const GenericAtomListItem = memo(
  withSuspense(function GenericAtomListItem({ atom }: { atom: GenericAtom }) {
    const Content = GENERIC_ATOM_CONTENT_BY_TYPE[atom.type];
    return (
      <GenericAtomContext value={atom}>
        <li className="flex flex-col border-b-gray-500 border-dashed border-2 p-2 gap-1">
          <h2>{atom.id}</h2>
          <p>
            value: <GenericAtomValue />
          </p>
          <Content />
          <GenericAtomRemoveIconButton />
        </li>
      </GenericAtomContext>
    );
  }),
);
