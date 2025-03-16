import { render } from '@testing-library/react';
import {
  type AtomTemplateRecursive,
  type Ecosystem,
  EcosystemProvider,
  atom,
  inject,
  injectCallback,
  injectEffect,
  injectMemo,
  injectRef,
  injectSignal,
  useAtomValue,
} from '@zedux/react';
import { injectStore } from '@zedux/stores';
import { type Context, act, createContext } from 'react';

export const LOTS_OF_ATOMS_IDS = [
  'atomNumber/0',
  'atomNumber/1',
  'atomNumber/2',
  'atomNumber/3',
  'atomNumber/4',
  'atomNumber/5',
  'atomNumber/6',
  'atomNumber/7',
  'atomNumber/8',
  'atomNumber/9',
  'simple atom',
  'nested/one',
  'nested/two',
  'nested/three',
  'nested/three/four',
  '@signal(withEverything)-1',
  'withEverything',
  '@signal(withEverything/withParams-[11])-4',
  'withEverything/withParams-[11]',
  '@signal(withEverything/withScope)-7',
  'withEverything/withScope-@scope("simple-context-value")',
  '@signal(withEverything/withParamsAndScope-[22])-10',
  'withEverything/withParamsAndScope-[22]',
  '@signal()-13',
  '@signal()-14',
  '1',
  'withScope-@scope(1)',
  '@component(MyComponent)-:r0:',
  'simple/atom/with/params-[21]',
  '@component(MyComponent)-:r1:',
  'simple/atom/with/scope-@scope("some context value")',
  '@component(MyComponent)-:r2:',
  'simple/atom/with/params/and/scope-[42]-@scope("some context value")',
  '@component(MyComponent)-:r3:',
  '@component(MyComponent)-:r4:',
  '@signal(withEverything/withParams-[21])-16',
  'withEverything/withParams-[21]',
  '@component(MyComponent)-:r5:',
  '@signal(withEverything/withScope)-19',
  'withEverything/withScope-@scope("some context value")',
  '@component(MyComponent)-:r6:',
  '@signal(withEverything/withParamsAndScope-[42])-22',
  'withEverything/withParamsAndScope-[42]',
  '@component(MyComponent)-:r7:',
  '@signal(with/signal)-25',
  'with/signal',
  '@listener(@signal(with/signal)-25)-26',
  'something',
  '@selector(namedFnSelector)-27',
  '@selector(unknown)-28',
  '@selector(otherNamedFnSelector)-29',
  '@signal(with/signal/2)-30',
  'with/signal/2',
];

export function addLotsOfAtomsInEcosystem(
  ecosystem: Ecosystem,
  options?: {
    triggerSomeChanges?: boolean;
  },
): void {
  const { triggerSomeChanges = false } = options ?? {};

  // Lot of atoms
  for (let i = 0; i < 10; i++) {
    ecosystem.getNode(atom(`atomNumber/${i}`, i));
  }

  // Contexts

  const NbContext = createContext(0);
  NbContext.displayName = 'NbContext';
  const StrContext = createContext('');
  StrContext.displayName = 'StrContext';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SCOPES = new Map<Context<any>, any>([
    [NbContext, 1],
    [StrContext, 'simple-context-value'],
  ]);

  // Simple atoms
  const simpleAtom = ecosystem.getNode(atom('simple atom', 0));
  const simpleAtomWithParams = atom(
    'simple/atom/with/params',
    (param: number) => param,
  );
  const simpleAtomWithScope = atom('simple/atom/with/scope', () => {
    return inject(StrContext);
  });
  const simpleAtomWithParamsAndScope = atom(
    'simple/atom/with/params/and/scope',
    (param: number) => {
      return inject(StrContext) + param.toString();
    },
  );

  // Nested atoms
  ecosystem.getNode(atom('nested/one', 0));
  ecosystem.getNode(atom('nested/two', 0));
  ecosystem.getNode(atom('nested/three', 0));
  ecosystem.getNode(atom('nested/three/four', 0));

  // All
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

  // Raw signals
  const signal1 = ecosystem.signal(1);
  const signal2 = ecosystem.signal(2);
  ecosystem.getNode(
    atom('1', () => {
      const val2 = signal2.get();

      const memoVal = injectMemo(() => {
        const val = signal1.get();
        return val;
      });

      return val2 + memoVal;
    }),
  );

  // scope
  const atomWithScope = atom('withScope', () => inject(NbContext));
  ecosystem.withScope(SCOPES, () => ecosystem.getNode(atomWithScope));

  // @component
  function MyComponent() {
    useAtomValue(simpleAtom);
    useAtomValue(simpleAtomWithParams, [21]);
    useAtomValue(simpleAtomWithScope);
    useAtomValue(simpleAtomWithParamsAndScope, [42]);

    useAtomValue(atomWithEverything);
    useAtomValue(atomWithEverythingWithParams, [21]);
    useAtomValue(atomWithEverythingWithScope);
    useAtomValue(atomWithEverythingWithParamsAndScope, [42]);
    return null;
  }
  render(
    <StrContext value="some context value">
      <NbContext value={42}>
        <EcosystemProvider ecosystem={ecosystem}>
          <MyComponent />
        </EcosystemProvider>
      </NbContext>
    </StrContext>,
  );

  // @listener
  const signalNode = ecosystem.getNode(
    atom('with/signal', () => injectSignal(0)),
  );
  signalNode.S?.on('change', () => {
    // noop
  });
  signalNode.S?.on('change', function myListener() {
    // noop
  });

  // @selector
  const somethingAtom = atom('something', 0);
  ecosystem.getNode(function namedFnSelector({ get }: Ecosystem) {
    return get(somethingAtom);
  });
  ecosystem.getNode(({ get }: Ecosystem) => get(somethingAtom));
  ecosystem.withScope(SCOPES, () => {
    ecosystem.getNode(function otherNamedFnSelector({ get }: Ecosystem) {
      get(atomWithEverything);
      get(atomWithEverythingWithParamsAndScope, [42]);
    });
  });

  // @signal
  ecosystem.getNode(atom('with/signal/2', () => injectSignal(0)));

  if (triggerSomeChanges) {
    act(() => {
      signal1.set(11);
      signal2.set(22);

      for (let i = 0; i < 10; i++) {
        simpleAtom.set(i);
        signalNode.S?.set(2);
      }
    });
  }
}
