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
  GRAPH_BY_NAMESPACES_NODE_TYPE,
  type GraphByNamespaces,
  generateGraphByNamespaces,
} from '../src/generateGraph/generateGraphByNamespaces.js';
import {
  type ListenerAtomName,
  type SelectorAtomName,
  type SignalAtomName,
  parseAtomName,
} from '../src/parseAtomName/parseAtomName.js';
import { DEFAULT_ZEDUX_LOGGER_OPTIONS } from '../src/types/ZeduxLoggerOptions.js';
import { defaults } from '../src/utils/defaults.js';

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

    const createFakeNode = (id: string, v: unknown) => {
      return { id, v } as unknown as GraphNode; // mock
    };

    const graph = generateGraphByNamespaces({
      flat: ecosystem.viewGraph('flat'),
      getNode: (id: string) => {
        return createFakeNode(id, ecosystem.n.get(id)?.v);
      },
      options: defaults(DEFAULT_ZEDUX_LOGGER_OPTIONS.graphOptions, {
        showByNamespacesGraph: true,
        showNodeDepsInGraphByNamespaces: true,
        showNodesInGraphByNamespaces: true,
        showNodeValueInGraphByNamespaces: true,
      }),
    });

    expect(graph).toEqual({
      '@@listener': {
        [listenerNodeId]: {
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          id: `no-${listenerNodeId}`,
          node: createFakeNode(`no-${listenerNodeId}`, undefined),
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
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            id: `Component-:${componentId}:`,
            node: createFakeNode(`Component-:${componentId}:`, undefined),
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
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            id: `@@selector-arrowFnSelector-${arrowFnSelectorId}`,
            node: createFakeNode(
              `@@selector-arrowFnSelector-${arrowFnSelectorId}`,
              0,
            ),
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
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            id: `@@selector-namedFnSelector-${namedFnSelectorId}`,
            node: createFakeNode(
              `@@selector-namedFnSelector-${namedFnSelectorId}`,
              0,
            ),
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
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          id: 'nested/one',
          node: createFakeNode('nested/one', 0),
          value: 0,
          dependencies: [],
          dependents: [],
          weight: 1,
        },
        three: {
          _: {
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            id: 'nested/three',
            node: createFakeNode('nested/three', 0),
            value: 0,
            dependencies: [],
            dependents: [],
            weight: 1,
          },
          four: {
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            id: 'nested/three/four',
            node: createFakeNode('nested/three/four', 0),
            value: 0,
            dependencies: [],
            dependents: [],
            weight: 1,
          },
        },
        two: {
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          id: 'nested/two',
          node: createFakeNode('nested/two', 0),
          value: 0,
          dependencies: [],
          dependents: [],
          weight: 1,
        },
      },
      simple: {
        type: GRAPH_BY_NAMESPACES_NODE_TYPE,
        id: 'simple',
        node: createFakeNode('simple', 0),
        value: 0,
        dependencies: [],
        dependents: [],
        weight: 1,
      },
      something: {
        type: GRAPH_BY_NAMESPACES_NODE_TYPE,
        id: 'something',
        node: createFakeNode('something', 0),
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
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          id: 'withSignal',
          node: createFakeNode('withSignal', 0),
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
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          id: `@signal(withSignal)-${signalNodeId}`,
          node: createFakeNode(`@signal(withSignal)-${signalNodeId}`, 0),
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
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          id: 'withScope-@scope("scope value")',
          node: createFakeNode(
            'withScope-@scope("scope value")',
            'scope value',
          ),
          value: 'scope value',
          dependencies: [],
          dependents: [],
          weight: 1,
        },
      },
    } satisfies GraphByNamespaces);
  });
});
