import {
  type AtomTemplateRecursive,
  type Ecosystem,
  atom,
  inject,
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

  ecosystem.getNode(atom('simple atom', 0));

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

  ecosystem.getNode(atomWithEverything);
  ecosystem.getNode(atomWithEverythingWithParams, [11]);
  ecosystem.withScope(SCOPES, () => {
    ecosystem.getNode(atomWithEverythingWithScope);
    ecosystem.getNode(atomWithEverythingWithParamsAndScope, [22]);
  });
}
