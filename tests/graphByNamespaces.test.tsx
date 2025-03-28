import { render } from '@testing-library/react';
import {
  type Ecosystem,
  EcosystemProvider,
  type ZeduxNode,
  atom,
  createEcosystem,
  inject,
  injectSignal,
  useAtomValue,
} from '@zedux/react';
import { createContext } from 'react';
import { describe, expect, test } from 'vitest';

import { DEFAULT_ZEDUX_LOGGER_GLOBAL_OPTIONS } from '../src/consts/default-zedux-logger-global-options.js';
import {
  GRAPH_BY_NAMESPACES_NODE_TYPE,
  type GraphByNamespaces,
  generateGraphByNamespaces,
} from '../src/generateGraph/generateGraphByNamespaces.js';
import type { ParsedBuiltInNodeId } from '../src/parseAtomId/parseBuiltInNodeId.js';
import { parseNodeId } from '../src/parseAtomId/parseNodeId.js';
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
    const signalNodeId = (parseNodeId(signalNode.S!.id) as ParsedBuiltInNodeId)
      .suffix;

    // Selectors
    const somethingAtom = atom('something', 0);
    function namedFnSelector({ get }: Ecosystem) {
      return get(somethingAtom);
    }
    const arrowFnSelector = ({ get }: Ecosystem) => get(somethingAtom);
    ecosystem.get(somethingAtom);

    const namedFnNode = ecosystem.getNode(namedFnSelector);
    const namedFnSelectorId = (
      parseNodeId(namedFnNode.id) as ParsedBuiltInNodeId
    ).suffix;

    const arrowFnNode = ecosystem.getNode(arrowFnSelector);
    const arrowFnSelectorId = (
      parseNodeId(arrowFnNode.id) as ParsedBuiltInNodeId
    ).suffix;

    // Components
    const componentId = ':r0:';
    function MyComponent() {
      useAtomValue(somethingAtom);
      return null;
    }
    render(
      <EcosystemProvider ecosystem={ecosystem}>
        <MyComponent />
      </EcosystemProvider>,
    );

    // Scopes
    const Context = createContext('scope value');
    const atomWithScope = atom('withScope', () => inject(Context));
    const scope = new Map([[Context, 'scope value']]);
    ecosystem.withScope(scope, () => ecosystem.getNode(atomWithScope));

    // Listeners
    signalNode.S?.on('change', () => {});
    const listenerNode = ecosystem.findAll('@listener')[0]!;
    const listenerNodeId = (parseNodeId(listenerNode.id) as ParsedBuiltInNodeId)
      .suffix;

    const createFakeNode = (id: string, v: unknown) => {
      return { id, v } as unknown as ZeduxNode; // mock
    };

    const graph = generateGraphByNamespaces({
      flat: ecosystem.viewGraph('flat'),
      getNode: (id: string) => {
        return createFakeNode(id, ecosystem.n.get(id)?.v);
      },
      globalGraphOptions: defaults(
        DEFAULT_ZEDUX_LOGGER_GLOBAL_OPTIONS.graphOptions,
        {
          showNodeDepsInGraphByNamespaces: true,
          showNodesInGraphByNamespaces: true,
          showNodeValueInGraphByNamespaces: true,
        },
      ),
    });

    expect(graph).toEqual({
      '@component': {
        MyComponent: {
          [componentId]: {
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            id: `@component(MyComponent)-${componentId}`,
            node: createFakeNode(
              `@component(MyComponent)-${componentId}`,
              undefined,
            ),
            value: undefined,
            sources: [
              {
                key: 'something',
                operation: 'useAtomValue',
              },
            ],
            observers: [],
            weight: 2,
          },
        },
      },
      '@selector': {
        arrowFnSelector: {
          [arrowFnSelectorId]: {
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            id: `@selector(arrowFnSelector)-${arrowFnSelectorId}`,
            node: createFakeNode(
              `@selector(arrowFnSelector)-${arrowFnSelectorId}`,
              0,
            ),
            value: 0,
            sources: [
              {
                key: 'something',
                operation: 'get',
              },
            ],
            observers: [],
            weight: 2,
          },
        },
        namedFnSelector: {
          [namedFnSelectorId]: {
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            id: `@selector(namedFnSelector)-${namedFnSelectorId}`,
            node: createFakeNode(
              `@selector(namedFnSelector)-${namedFnSelectorId}`,
              0,
            ),
            value: 0,
            sources: [
              {
                key: 'something',
                operation: 'get',
              },
            ],
            observers: [],
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
          sources: [],
          observers: [],
          weight: 1,
        },
        three: {
          _: {
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            id: 'nested/three',
            node: createFakeNode('nested/three', 0),
            value: 0,
            sources: [],
            observers: [],
            weight: 1,
          },
          four: {
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            id: 'nested/three/four',
            node: createFakeNode('nested/three/four', 0),
            value: 0,
            sources: [],
            observers: [],
            weight: 1,
          },
        },
        two: {
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          id: 'nested/two',
          node: createFakeNode('nested/two', 0),
          value: 0,
          sources: [],
          observers: [],
          weight: 1,
        },
      },
      simple: {
        type: GRAPH_BY_NAMESPACES_NODE_TYPE,
        id: 'simple',
        node: createFakeNode('simple', 0),
        value: 0,
        sources: [],
        observers: [],
        weight: 1,
      },
      something: {
        type: GRAPH_BY_NAMESPACES_NODE_TYPE,
        id: 'something',
        node: createFakeNode('something', 0),
        value: 0,
        sources: [],
        observers: [
          {
            key: `@selector(namedFnSelector)-${namedFnSelectorId}`,
            operation: 'get',
          },
          {
            key: `@selector(arrowFnSelector)-${arrowFnSelectorId}`,
            operation: 'get',
          },
          {
            key: `@component(MyComponent)-${componentId}`,
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
          sources: [
            {
              key: `@signal(withSignal)-${signalNodeId}`,
              operation: 'injectSignal',
            },
          ],
          observers: [],
          weight: 2,
        },
        [`@signal-${signalNodeId}`]: {
          [`@listener-${listenerNodeId}`]: {
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            id: `@listener(@signal(withSignal)-${signalNodeId})-${listenerNodeId}`,
            node: createFakeNode(
              `@listener(@signal(withSignal)-${signalNodeId})-${listenerNodeId}`,
              undefined,
            ),
            value: undefined,
            sources: [
              {
                key: `@signal(withSignal)-${signalNodeId}`,
                operation: 'on',
              },
            ],
            observers: [],
            weight: 2,
          },
          _: {
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            id: `@signal(withSignal)-${signalNodeId}`,
            node: createFakeNode(`@signal(withSignal)-${signalNodeId}`, 0),
            value: 0,
            sources: [],
            observers: [
              {
                key: 'withSignal',
                operation: 'injectSignal',
              },
              {
                key: `@listener(@signal(withSignal)-${signalNodeId})-${listenerNodeId}`,
                operation: 'on',
              },
            ],
            weight: 1,
          },
        },
      },
      withScope: {
        '@scope-"scope value"': {
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          id: 'withScope-@scope("scope value")',
          node: createFakeNode(
            'withScope-@scope("scope value")',
            'scope value',
          ),
          value: 'scope value',
          sources: [],
          observers: [],
          weight: 1,
        },
      },
    } satisfies GraphByNamespaces);
  });
});
