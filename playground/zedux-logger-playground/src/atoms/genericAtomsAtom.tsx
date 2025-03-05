import { type AnyAtomTemplate, api, atom, injectSignal } from '@zedux/react';

export interface NumberGenericAtom {
  id: string;
  type: 'number';
  template: AnyAtomTemplate<{
    State: number;
    Params: [];
    Exports: { decrement(): void; increment(): void };
  }>;
}

export interface TextGenericAtom {
  id: string;
  type: 'text';
  template: AnyAtomTemplate<{
    State: string;
    Params: [];
    Exports: { setText(value: string): void };
  }>;
}

export type GenericAtom = NumberGenericAtom | TextGenericAtom;

let genericAtomId = 0;

export const genericAtomsAtom = atom('genericAtoms', () => {
  const atomTemplatesSignal = injectSignal([] as GenericAtom[]);
  return api(atomTemplatesSignal).setExports({
    addAtom(type: GenericAtom['type']) {
      const id = (++genericAtomId).toString();
      atomTemplatesSignal.set((old) => {
        let genericAtom: GenericAtom;
        switch (type) {
          case 'number':
            genericAtom = {
              id: id,
              type: 'number',
              template: atom(
                `genericAtoms/${id}`,
                () => {
                  const nbSignal = injectSignal(0);
                  return api(nbSignal).setExports({
                    decrement() {
                      nbSignal.set((old) => old - 1);
                    },
                    increment() {
                      nbSignal.set((old) => old + 1);
                    },
                  });
                },
                { ttl: 0 },
              ),
            };
            break;
          case 'text':
            genericAtom = {
              id: id,
              type: 'text',
              template: atom(
                `genericAtoms/${id}`,
                () => {
                  const textSignal = injectSignal('');
                  return api(textSignal).setExports({
                    setText(value: string) {
                      textSignal.set(value);
                    },
                  });
                },
                { ttl: 0 },
              ),
            };
            break;
          default:
            throw new Error('Invalid atom type');
        }
        return [...old, genericAtom];
      });
    },
    removeAtom(id: string) {
      atomTemplatesSignal.set((old) => old.filter((atom) => atom.id !== id));
    },
  });
});
