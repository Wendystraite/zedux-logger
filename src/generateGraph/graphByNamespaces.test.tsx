import { render } from '@testing-library/react';
import {
  type Ecosystem,
  EcosystemProvider,
  type GraphNode,
  atom,
  createEcosystem,
  inject,
  injectSignal,
  useAtomValue,
} from '@zedux/react';
import { createContext } from 'react';
import { describe, expect, test } from 'vitest';

import {
  type ListenerAtomName,
  type SelectorAtomName,
  type SignalAtomName,
  parseAtomName,
} from '../parseAtomName/parseAtomName.js';
import { graphByNamespaces } from './graphByNamespaces.js';

describe('graphByNamespaces', () => {
  test('should create graph', () => {
    const ecosystem = createEcosystem();

    // Simple atoms
    ecosystem.get(atom('simple', 0));

    // Nested atoms
    ecosystem.get(atom('nested/one', 0));
    ecosystem.get(atom('nested/two', 0));
    ecosystem.get(atom('nested/three', 0));
    ecosystem.get(atom('nested/three/four', 0));

    // Atoms with signals
    const signalNode = ecosystem.getNode(
      atom('withSignal', () => injectSignal(0)),
    );
    const signalNodeId = (parseAtomName(signalNode.S!.id) as SignalAtomName)
      .signalUid;

    // Selectors
    const somethingAtom = atom('something', 0);
    function namedFnSelector({ get }: Ecosystem) {
      return get(somethingAtom);
    }
    const arrowFnSelector = ({ get }: Ecosystem) => get(somethingAtom);
    ecosystem.get(somethingAtom);

    const namedFnNode = ecosystem.getNode(namedFnSelector);
    const namedFnSelectorId = (
      parseAtomName(namedFnNode.id) as SelectorAtomName
    ).selectorUid;

    const arrowFnNode = ecosystem.getNode(arrowFnSelector);
    const arrowFnSelectorId = (
      parseAtomName(arrowFnNode.id) as SelectorAtomName
    ).selectorUid;

    // Components
    const componentId = 'r0';
    function Component() {
      useAtomValue(somethingAtom);
      return null;
    }
    render(
      <EcosystemProvider ecosystem={ecosystem}>
        <Component />
      </EcosystemProvider>,
    );

    // Scopes
    const Context = createContext('scope value');
    const atomWithScope = atom('withScope', () => inject(Context));
    const scope = new Map([[Context, 'scope value']]);
    ecosystem.withScope(scope, () => ecosystem.getNode(atomWithScope));

    // Listeners
    signalNode.S?.on('change', () => {});
    const listenerNode = Array.from(ecosystem.n.entries()).find(
      ([nodeName]) => parseAtomName(nodeName).type === 'listener',
    )![1];
    const listenerNodeId = (parseAtomName(listenerNode.id) as ListenerAtomName)
      .listenerUid;

    const graph = graphByNamespaces({
      flat: ecosystem.viewGraph('flat'),
      getNode: (id: string) => {
        return { id, v: ecosystem.n.get(id)?.v } as unknown as GraphNode; // mock
      },
    });

    expect(graph).toEqual({
      '@@listener': {
        [listenerNodeId]: {
          id: `no-${listenerNodeId}`,
          node: { id: `no-${listenerNodeId}`, v: undefined },
          value: undefined,
          dependencies: [
            {
              key: `@signal(withSignal)-${signalNodeId}`,
              operation: 'on',
            },
          ],
          dependents: [],
          weight: 2,
        },
      },
      '@@rc': {
        Component: {
          [componentId]: {
            id: `Component-:${componentId}:`,
            node: { id: `Component-:${componentId}:`, v: undefined },
            value: undefined,
            dependencies: [
              {
                key: 'something',
                operation: 'useAtomValue',
              },
            ],
            dependents: [],
            weight: 2,
          },
        },
      },
      '@@selector': {
        arrowFnSelector: {
          [arrowFnSelectorId]: {
            id: `@@selector-arrowFnSelector-${arrowFnSelectorId}`,
            node: {
              id: `@@selector-arrowFnSelector-${arrowFnSelectorId}`,
              v: 0,
            },
            value: 0,
            dependencies: [
              {
                key: 'something',
                operation: 'get',
              },
            ],
            dependents: [],
            weight: 2,
          },
        },
        namedFnSelector: {
          [namedFnSelectorId]: {
            id: `@@selector-namedFnSelector-${namedFnSelectorId}`,
            node: {
              id: `@@selector-namedFnSelector-${namedFnSelectorId}`,
              v: 0,
            },
            value: 0,
            dependencies: [
              {
                key: 'something',
                operation: 'get',
              },
            ],
            dependents: [],
            weight: 2,
          },
        },
      },
      nested: {
        one: {
          id: 'nested/one',
          node: { id: 'nested/one', v: 0 },
          value: 0,
          dependencies: [],
          dependents: [],
          weight: 1,
        },
        three: {
          _: {
            id: 'nested/three',
            node: { id: 'nested/three', v: 0 },
            value: 0,
            dependencies: [],
            dependents: [],
            weight: 1,
          },
          four: {
            id: 'nested/three/four',
            node: { id: 'nested/three/four', v: 0 },
            value: 0,
            dependencies: [],
            dependents: [],
            weight: 1,
          },
        },
        two: {
          id: 'nested/two',
          node: { id: 'nested/two', v: 0 },
          value: 0,
          dependencies: [],
          dependents: [],
          weight: 1,
        },
      },
      simple: {
        id: 'simple',
        node: { id: 'simple', v: 0 },
        value: 0,
        dependencies: [],
        dependents: [],
        weight: 1,
      },
      something: {
        id: 'something',
        node: { id: 'something', v: 0 },
        value: 0,
        dependencies: [],
        dependents: [
          {
            key: `@@selector-namedFnSelector-${namedFnSelectorId}`,
            operation: 'get',
          },
          {
            key: `@@selector-arrowFnSelector-${arrowFnSelectorId}`,
            operation: 'get',
          },
          {
            key: `Component-:${componentId}:`,
            operation: 'useAtomValue',
          },
        ],
        weight: 1,
      },
      withSignal: {
        _: {
          id: 'withSignal',
          node: { id: 'withSignal', v: 0 },
          value: 0,
          dependencies: [
            {
              key: `@signal(withSignal)-${signalNodeId}`,
              operation: 'injectSignal',
            },
          ],
          dependents: [],
          weight: 2,
        },
        [`@signal-${signalNodeId}`]: {
          id: `@signal(withSignal)-${signalNodeId}`,
          node: { id: `@signal(withSignal)-${signalNodeId}`, v: 0 },
          value: 0,
          dependencies: [],
          dependents: [
            {
              key: 'withSignal',
              operation: 'injectSignal',
            },
            {
              key: `no-${listenerNodeId}`,
              operation: 'on',
            },
          ],
          weight: 1,
        },
      },
      withScope: {
        '@@scope-"scope value"': {
          id: 'withScope-@scope("scope value")',
          node: { id: 'withScope-@scope("scope value")', v: 'scope value' },
          value: 'scope value',
          dependencies: [],
          dependents: [],
          weight: 1,
        },
      },
    });
  });
});
