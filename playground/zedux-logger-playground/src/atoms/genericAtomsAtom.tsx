import {
  type AnyAtomInstance,
  type AnyAtomTemplate,
  api,
  atom,
  injectEffect,
  injectSignal,
} from '@zedux/react';

export interface NumberGenericAtom {
  id: string;
  type: 'number';
  template: AnyAtomTemplate<{
    State: number;
    Params: [];
    Exports: { decrement(): void; increment(): void };
    Node: AnyAtomInstance<{
      State: number;
      Params: [];
      Exports: { decrement(): void; increment(): void };
    }>;
  }>;
}

export interface TextGenericAtom {
  id: string;
  type: 'text';
  template: AnyAtomTemplate<{
    State: string;
    Params: [];
    Exports: { setText(value: string): void };
    Node: AnyAtomInstance<{
      State: string;
      Params: [];
      Exports: { setText(value: string): void };
    }>;
  }>;
}

export interface PromiseGenericAtom {
  id: string;
  type: 'promise';
  template: AnyAtomTemplate<{
    State: string;
    Params: [];
    Exports: { reset(): void };
    Node: AnyAtomInstance<{
      State: string;
      Params: [];
      Exports: { reset(): void };
    }>;
  }>;
}

export type GenericAtom =
  | NumberGenericAtom
  | TextGenericAtom
  | PromiseGenericAtom;

export interface AnyGenericAtom {
  id: string;
  type: GenericAtom['type'];
  template: GenericAtom['template'];
}

let genericAtomId = 0;
function createGenericAtom(
  id: string,
  type: GenericAtom['type'],
): GenericAtom['template'] {
  const mapping: Record<GenericAtom['type'], () => GenericAtom['template']> = {
    number() {
      return atom(
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
      );
    },
    text() {
      return atom(
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
      );
    },
    promise() {
      return atom(
        `genericAtoms/${id}`,
        () => {
          const delay = (ms = 2000) =>
            new Promise((resolve) => setTimeout(resolve, ms));

          const data = injectSignal('pending');

          const promiseSignal = injectSignal(() => delay());

          const promise = promiseSignal.get();
          injectEffect(() => {
            promise
              .then(() => {
                data.set('resolved');
              })
              .catch(() => {
                data.set('error');
              });
          }, [promise]);

          return api(data)
            .setPromise(promise)
            .setExports({
              reset() {
                data.set('pending');
                promiseSignal.set(delay());
              },
            });
        },
        { ttl: 0 },
      );
    },
  };
  return mapping[type]();
}

export const genericAtomsAtom = atom('genericAtoms', () => {
  const atomTemplatesSignal = injectSignal([] as GenericAtom[]);
  return api(atomTemplatesSignal).setExports({
    addAtom(type: GenericAtom['type']) {
      const id = (++genericAtomId).toString();
      atomTemplatesSignal.set((old) => {
        const genericAtom: AnyGenericAtom = {
          id,
          type,
          template: createGenericAtom(id, type),
        };
        return [...old, genericAtom as GenericAtom];
      });
    },
    removeAtom(id: string) {
      atomTemplatesSignal.set((old) => old.filter((atom) => atom.id !== id));
    },
  });
});
