import { render } from '@testing-library/react';
import {
  type Ecosystem,
  EcosystemProvider,
  atom,
  inject,
  injectSignal,
  useAtomValue,
} from '@zedux/react';
import { createContext } from 'react';

export function runBench(ecosystem: Ecosystem) {
  // Lot of atoms
  for (let i = 0; i < 10; i++) {
    ecosystem.getNode(atom(`atomNumber/${i}`, i));
  }

  // Simple atoms
  const simpleAtom = ecosystem.getNode(atom('simple atom', 0));

  // Nested atoms
  ecosystem.getNode(atom('nested/one', 0));
  ecosystem.getNode(atom('nested/two', 0));
  ecosystem.getNode(atom('nested/three', 0));
  ecosystem.getNode(atom('nested/three/four', 0));

  // Atoms with signals
  const signalNode = ecosystem.getNode(
    atom('withSignal', () => injectSignal(0)),
  );

  // Selectors
  const somethingAtom = atom('something', 0);
  ecosystem.getNode(function namedFnSelector({ get }: Ecosystem) {
    return get(somethingAtom);
  });
  ecosystem.getNode(({ get }: Ecosystem) => get(somethingAtom));

  // Scopes
  const Context = createContext('scope value');
  const atomWithScope = atom('withScope', () => inject(Context));
  const scope = new Map([[Context, 'scope value']]);
  ecosystem.withScope(scope, () => ecosystem.getNode(atomWithScope));

  // Listeners
  signalNode.S?.on('change', () => {
    // noop
  });

  // Components
  function Component() {
    useAtomValue(somethingAtom);
    return null;
  }

  render(
    <EcosystemProvider ecosystem={ecosystem}>
      <Component />
    </EcosystemProvider>,
  );

  // Trigger some changes
  for (let i = 0; i < 10; i++) {
    simpleAtom.set(i);
    signalNode.S?.set(2);
  }

  // Cleanup
  ecosystem.reset();
}
