import {
  type AtomTemplateRecursive,
  type Ecosystem,
  api,
  atom,
  inject,
  injectAtomInstance,
  injectCallback,
  injectEffect,
  injectMemo,
  injectRef,
  injectSignal,
} from '@zedux/react';
import { injectStore } from '@zedux/stores';
import { type Context, createContext } from 'react';

export function addSomeFakeAtoms(ecosystem: Ecosystem) {
  // Contexts
  const StrContext = createContext('');
  StrContext.displayName = 'StrContext';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SCOPES = new Map<Context<any>, any>([
    [StrContext, 'simple-context-value'],
  ]);

  const simpleAtomNode = ecosystem.getNode(atom('simple atom', 0));

  ecosystem.getNode(
    atom('simple/atom/with/params', (param: number) => param),
    [21],
  );

  ecosystem.withScope(SCOPES, () =>
    ecosystem.getNode(
      atom('simple/atom/with/scope', () => {
        return inject(StrContext);
      }),
    ),
  );

  ecosystem.withScope(SCOPES, () =>
    ecosystem.getNode(
      atom('simple/atom/with/params/and/scope', (param: number) => {
        return inject(StrContext) + param.toString();
      }),
      [42],
    ),
  );

  const createAtomWithEverything = (name: string, cb?: () => void) => {
    return atom(name, () => {
      // signal
      const signal = injectSignal('a');

      // ref
      injectRef('ref value');

      // store
      injectStore('store value');

      // memo
      injectMemo(() => signal.get());
      injectMemo(() => signal.get(), []);
      injectMemo(() => signal.get(), [signal.get()]);

      // callback
      injectCallback(() => {
        signal.get();
      });
      injectCallback(() => {
        signal.get();
      }, []);
      injectCallback(() => {
        signal.get();
      }, [signal.get()]);

      // effect
      injectEffect(() => {
        signal.get();
      });
      injectEffect(() => {
        signal.get();
      }, []);
      injectEffect(() => {
        signal.get();
      }, [signal.get()]);

      // other
      cb?.();

      return signal;
    });
  };

  const atomWithEverything = createAtomWithEverything('withEverything');
  const atomWithEverythingWithParams = createAtomWithEverything(
    'withEverything/withParams',
  ) as unknown as AtomTemplateRecursive<{
    State: string;
    Params: [param: number];
    Events: object;
    Exports: Record<string, never>;
    Promise: undefined;
  }>;
  const atomWithEverythingWithScope = createAtomWithEverything(
    'withEverything/withScope',
    () => {
      inject(StrContext);
    },
  );
  const atomWithEverythingWithParamsAndScope = createAtomWithEverything(
    'withEverything/withParamsAndScope',
  ) as unknown as AtomTemplateRecursive<{
    State: string;
    Params: [param: number];
    Events: object;
    Exports: Record<string, never>;
    Promise: undefined;
  }>;

  const slowAtom = atom('slow atom', () => {
    for (let i = 0; i < 10; i++) {
      injectMemo(() => {
        for (let j = 0; j < 10000; j++) {
          // do nothing
        }
      });
    }
  });

  const atomWithPromise1 = atom('withPromise1', () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved');
      }, 1000);
    });
  });
  const atomWithPromise2 = atom('withPromise2', () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  });
  const atomWaitingForPromise = atom('waitingForPromise', () => {
    const atomWithPromise1Instance = injectAtomInstance(atomWithPromise1);
    const atomWithPromise2Instance = injectAtomInstance(atomWithPromise2);
    const promise = Promise.all([
      atomWithPromise1Instance.promise,
      atomWithPromise2Instance.promise,
    ]);
    return api().setPromise(promise);
  });

  const countAtom = atom('count', () => {
    const signal = injectSignal(0);
    return api(signal).setExports({
      increment() {
        signal.set(signal.get() + 1);
      },
    });
  });

  ecosystem.getNode(atomWithEverything);
  ecosystem.getNode(atomWithEverythingWithParams, [11]);
  ecosystem.withScope(SCOPES, () => {
    ecosystem.getNode(atomWithEverythingWithScope);
    ecosystem.getNode(atomWithEverythingWithParamsAndScope, [22]);
  });

  ecosystem.getNode(slowAtom);

  const countAtomNode = ecosystem.getNode(countAtom);
  ecosystem.getNode(atomWaitingForPromise);

  simpleAtomNode.destroy(true);

  countAtomNode.exports.increment();
  countAtomNode.exports.increment();
}
