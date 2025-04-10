import { type Ecosystem, type ZeduxNode, createEcosystem } from '@zedux/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEFAULT_ZEDUX_LOGGER_GLOBAL_OPTIONS } from '../src/consts/default-zedux-logger-global-options.js';
import {
  GRAPH_BY_NAMESPACES_NODE_TYPE,
  type GraphByNamespaces,
  generateGraphByNamespaces,
} from '../src/generateGraph/generateGraphByNamespaces.js';
import { parseNodeGroupNames } from '../src/parseAtomId/parseNodeGroupNames.js';
import { defaults } from '../src/utils/defaults.js';
import { addLotsOfAtomsInEcosystem } from './addLotsOfAtomsInEcosystem.js';

let ecosystem: Ecosystem;
beforeEach(() => {
  ecosystem = createEcosystem();
  addLotsOfAtomsInEcosystem(ecosystem);
});

describe('graphByNamespaces', () => {
  it('should create graph with details', () => {
    const createFakeNode = (id: string, v: unknown) => {
      return { id, v } as unknown as ZeduxNode; // mock
    };

    const graph = generateGraphByNamespaces({
      flat: ecosystem.viewGraph('flat'),
      getNode: (id: string) => {
        return createFakeNode(id, ecosystem.n.get(id)?.v);
      },
      getNodeGroupNames: (node) => parseNodeGroupNames(node.id),
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
      '1': {
        '@memo-15': {
          id: '@memo(1)-15',
          node: createFakeNode('@memo(1)-15', 1),
          observers: [
            {
              key: '1',
              operation: 'get',
            },
          ],
          sources: [
            {
              key: '@signal()-13',
              operation: 'get',
            },
          ],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 1,
          weight: 2,
        },
        _: {
          id: '1',
          node: createFakeNode('1', 3),
          observers: [],
          sources: [
            {
              key: '@signal()-14',
              operation: 'get',
            },
            {
              key: '@memo(1)-15',
              operation: 'get',
            },
          ],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 3,
          weight: 4,
        },
      },
      '@component': {
        MyComponent: {
          ':r0:': {
            id: '@component(MyComponent)-:r0:',
            node: createFakeNode('@component(MyComponent)-:r0:', undefined),
            observers: [],
            sources: [
              {
                key: 'simple atom',
                operation: 'useAtomValue',
              },
            ],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: undefined,
            weight: 2,
          },
          ':r1:': {
            id: '@component(MyComponent)-:r1:',
            node: createFakeNode('@component(MyComponent)-:r1:', undefined),
            observers: [],
            sources: [
              {
                key: 'simple/atom/with/params-[21]',
                operation: 'useAtomValue',
              },
            ],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: undefined,
            weight: 2,
          },
          ':r2:': {
            id: '@component(MyComponent)-:r2:',
            node: createFakeNode('@component(MyComponent)-:r2:', undefined),
            observers: [],
            sources: [
              {
                key: 'simple/atom/with/scope-@scope("some context value")',
                operation: 'useAtomValue',
              },
            ],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: undefined,
            weight: 2,
          },
          ':r3:': {
            id: '@component(MyComponent)-:r3:',
            node: createFakeNode('@component(MyComponent)-:r3:', undefined),
            observers: [],
            sources: [
              {
                key: 'simple/atom/with/params/and/scope-[42]-@scope("some context value")',
                operation: 'useAtomValue',
              },
            ],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: undefined,
            weight: 2,
          },
          ':r4:': {
            id: '@component(MyComponent)-:r4:',
            node: createFakeNode('@component(MyComponent)-:r4:', undefined),
            observers: [],
            sources: [
              {
                key: 'withEverything',
                operation: 'useAtomValue',
              },
            ],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: undefined,
            weight: 6,
          },
          ':r5:': {
            id: '@component(MyComponent)-:r5:',
            node: createFakeNode('@component(MyComponent)-:r5:', undefined),
            observers: [],
            sources: [
              {
                key: 'withEverything/withParams-[21]',
                operation: 'useAtomValue',
              },
            ],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: undefined,
            weight: 6,
          },
          ':r6:': {
            id: '@component(MyComponent)-:r6:',
            node: createFakeNode('@component(MyComponent)-:r6:', undefined),
            observers: [],
            sources: [
              {
                key: 'withEverything/withScope-@scope("some context value")',
                operation: 'useAtomValue',
              },
            ],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: undefined,
            weight: 6,
          },
          ':r7:': {
            id: '@component(MyComponent)-:r7:',
            node: createFakeNode('@component(MyComponent)-:r7:', undefined),
            observers: [],
            sources: [
              {
                key: 'withEverything/withParamsAndScope-[42]',
                operation: 'useAtomValue',
              },
            ],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: undefined,
            weight: 6,
          },
        },
      },
      '@selector': {
        namedFnSelector: {
          '27': {
            id: '@selector(namedFnSelector)-27',
            node: createFakeNode('@selector(namedFnSelector)-27', 0),
            observers: [],
            sources: [
              {
                key: 'something',
                operation: 'get',
              },
            ],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: 0,
            weight: 2,
          },
        },
        otherNamedFnSelector: {
          '29': {
            id: '@selector(otherNamedFnSelector)-29',
            node: createFakeNode(
              '@selector(otherNamedFnSelector)-29',
              undefined,
            ),
            observers: [],
            sources: [
              {
                key: 'withEverything',
                operation: 'get',
              },
              {
                key: 'withEverything/withParamsAndScope-[42]',
                operation: 'get',
              },
            ],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: undefined,
            weight: 11,
          },
        },
        unknown: {
          '28': {
            id: '@selector(unknown)-28',
            node: createFakeNode('@selector(unknown)-28', 0),
            observers: [],
            sources: [
              {
                key: 'something',
                operation: 'get',
              },
            ],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: 0,
            weight: 2,
          },
        },
      },
      '@signal': {
        '13': {
          id: '@signal()-13',
          node: createFakeNode('@signal()-13', 1),
          observers: [
            {
              key: '@memo(1)-15',
              operation: 'get',
            },
          ],
          sources: [],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 1,
          weight: 1,
        },
        '14': {
          id: '@signal()-14',
          node: createFakeNode('@signal()-14', 2),
          observers: [
            {
              key: '1',
              operation: 'get',
            },
          ],
          sources: [],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 2,
          weight: 1,
        },
      },
      atomNumber: {
        '0': {
          id: 'atomNumber/0',
          node: createFakeNode('atomNumber/0', 0),
          observers: [],
          sources: [],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 0,
          weight: 1,
        },
        '1': {
          id: 'atomNumber/1',
          node: createFakeNode('atomNumber/1', 1),
          observers: [],
          sources: [],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 1,
          weight: 1,
        },
        '2': {
          id: 'atomNumber/2',
          node: createFakeNode('atomNumber/2', 2),
          observers: [],
          sources: [],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 2,
          weight: 1,
        },
        '3': {
          id: 'atomNumber/3',
          node: createFakeNode('atomNumber/3', 3),
          observers: [],
          sources: [],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 3,
          weight: 1,
        },
        '4': {
          id: 'atomNumber/4',
          node: createFakeNode('atomNumber/4', 4),
          observers: [],
          sources: [],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 4,
          weight: 1,
        },
        '5': {
          id: 'atomNumber/5',
          node: createFakeNode('atomNumber/5', 5),
          observers: [],
          sources: [],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 5,
          weight: 1,
        },
        '6': {
          id: 'atomNumber/6',
          node: createFakeNode('atomNumber/6', 6),
          observers: [],
          sources: [],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 6,
          weight: 1,
        },
        '7': {
          id: 'atomNumber/7',
          node: createFakeNode('atomNumber/7', 7),
          observers: [],
          sources: [],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 7,
          weight: 1,
        },
        '8': {
          id: 'atomNumber/8',
          node: createFakeNode('atomNumber/8', 8),
          observers: [],
          sources: [],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 8,
          weight: 1,
        },
        '9': {
          id: 'atomNumber/9',
          node: createFakeNode('atomNumber/9', 9),
          observers: [],
          sources: [],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 9,
          weight: 1,
        },
      },
      nested: {
        one: {
          id: 'nested/one',
          node: createFakeNode('nested/one', 0),
          observers: [],
          sources: [],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 0,
          weight: 1,
        },
        three: {
          _: {
            id: 'nested/three',
            node: createFakeNode('nested/three', 0),
            observers: [],
            sources: [],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: 0,
            weight: 1,
          },
          four: {
            id: 'nested/three/four',
            node: createFakeNode('nested/three/four', 0),
            observers: [],
            sources: [],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: 0,
            weight: 1,
          },
        },
        two: {
          id: 'nested/two',
          node: createFakeNode('nested/two', 0),
          observers: [],
          sources: [],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 0,
          weight: 1,
        },
      },
      simple: {
        atom: {
          with: {
            params: {
              '[21]': {
                id: 'simple/atom/with/params-[21]',
                node: createFakeNode('simple/atom/with/params-[21]', 21),
                observers: [
                  {
                    key: '@component(MyComponent)-:r1:',
                    operation: 'useAtomValue',
                  },
                ],
                sources: [],
                type: GRAPH_BY_NAMESPACES_NODE_TYPE,
                value: 21,
                weight: 1,
              },
              and: {
                scope: {
                  '[42]': {
                    '@scope-"some context value"': {
                      id: 'simple/atom/with/params/and/scope-[42]-@scope("some context value")',
                      node: createFakeNode(
                        'simple/atom/with/params/and/scope-[42]-@scope("some context value")',
                        'some context value42',
                      ),
                      observers: [
                        {
                          key: '@component(MyComponent)-:r3:',
                          operation: 'useAtomValue',
                        },
                      ],
                      sources: [],
                      type: GRAPH_BY_NAMESPACES_NODE_TYPE,
                      value: 'some context value42',
                      weight: 1,
                    },
                  },
                },
              },
            },
            scope: {
              '@scope-"some context value"': {
                id: 'simple/atom/with/scope-@scope("some context value")',
                node: createFakeNode(
                  'simple/atom/with/scope-@scope("some context value")',
                  'some context value',
                ),
                observers: [
                  {
                    key: '@component(MyComponent)-:r2:',
                    operation: 'useAtomValue',
                  },
                ],
                sources: [],
                type: GRAPH_BY_NAMESPACES_NODE_TYPE,
                value: 'some context value',
                weight: 1,
              },
            },
          },
        },
      },
      'simple atom': {
        id: 'simple atom',
        node: createFakeNode('simple atom', 0),
        observers: [
          {
            key: '@component(MyComponent)-:r0:',
            operation: 'useAtomValue',
          },
        ],
        sources: [],
        type: GRAPH_BY_NAMESPACES_NODE_TYPE,
        value: 0,
        weight: 1,
      },
      something: {
        id: 'something',
        node: createFakeNode('something', 0),
        observers: [
          {
            key: '@selector(namedFnSelector)-27',
            operation: 'get',
          },
          {
            key: '@selector(unknown)-28',
            operation: 'get',
          },
        ],
        sources: [],
        type: GRAPH_BY_NAMESPACES_NODE_TYPE,
        value: 0,
        weight: 1,
      },
      with: {
        signal: {
          '2': {
            '@signal-30': {
              id: '@signal(with/signal/2)-30',
              node: createFakeNode('@signal(with/signal/2)-30', 0),
              observers: [
                {
                  key: 'with/signal/2',
                  operation: 'injectSignal',
                },
              ],
              sources: [],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: 0,
              weight: 1,
            },
            _: {
              id: 'with/signal/2',
              node: createFakeNode('with/signal/2', 0),
              observers: [],
              sources: [
                {
                  key: '@signal(with/signal/2)-30',
                  operation: 'injectSignal',
                },
              ],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: 0,
              weight: 2,
            },
          },
          '@signal-25': {
            '@listener-26': {
              id: '@listener(@signal(with/signal)-25)-26',
              node: createFakeNode(
                '@listener(@signal(with/signal)-25)-26',
                undefined,
              ),
              observers: [],
              sources: [
                {
                  key: '@signal(with/signal)-25',
                  operation: 'on',
                },
              ],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: undefined,
              weight: 2,
            },
            _: {
              id: '@signal(with/signal)-25',
              node: createFakeNode('@signal(with/signal)-25', 0),
              observers: [
                {
                  key: 'with/signal',
                  operation: 'injectSignal',
                },
                {
                  key: '@listener(@signal(with/signal)-25)-26',
                  operation: 'on',
                },
              ],
              sources: [],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: 0,
              weight: 1,
            },
          },
          _: {
            id: 'with/signal',
            node: createFakeNode('with/signal', 0),
            observers: [],
            sources: [
              {
                key: '@signal(with/signal)-25',
                operation: 'injectSignal',
              },
            ],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: 0,
            weight: 2,
          },
        },
      },
      withEverything: {
        '@memo-2': {
          id: '@memo(withEverything)-2',
          node: createFakeNode('@memo(withEverything)-2', 'a'),
          observers: [
            {
              key: 'withEverything',
              operation: 'get',
            },
          ],
          sources: [
            {
              key: '@signal(withEverything)-1',
              operation: 'get',
            },
          ],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 'a',
          weight: 2,
        },
        '@memo-3': {
          id: '@memo(withEverything)-3',
          node: createFakeNode('@memo(withEverything)-3', expect.any(Function)),
          observers: [
            {
              key: 'withEverything',
              operation: 'get',
            },
          ],
          sources: [],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: expect.any(Function),
          weight: 1,
        },
        '@signal-1': {
          id: '@signal(withEverything)-1',
          node: createFakeNode('@signal(withEverything)-1', 'a'),
          observers: [
            {
              key: '@memo(withEverything)-2',
              operation: 'get',
            },
            {
              key: 'withEverything',
              operation: 'injectSignal',
            },
          ],
          sources: [],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 'a',
          weight: 1,
        },
        _: {
          id: 'withEverything',
          node: createFakeNode('withEverything', 'a'),
          observers: [
            {
              key: '@component(MyComponent)-:r4:',
              operation: 'useAtomValue',
            },
            {
              key: '@selector(otherNamedFnSelector)-29',
              operation: 'get',
            },
          ],
          sources: [
            {
              key: '@signal(withEverything)-1',
              operation: 'injectSignal',
            },
            {
              key: '@memo(withEverything)-2',
              operation: 'get',
            },
            {
              key: '@memo(withEverything)-3',
              operation: 'get',
            },
          ],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 'a',
          weight: 5,
        },
        withParams: {
          '[11]': {
            '@memo-5': {
              id: '@memo(withEverything/withParams-[11])-5',
              node: createFakeNode(
                '@memo(withEverything/withParams-[11])-5',
                'a',
              ),
              observers: [
                {
                  key: 'withEverything/withParams-[11]',
                  operation: 'get',
                },
              ],
              sources: [
                {
                  key: '@signal(withEverything/withParams-[11])-4',
                  operation: 'get',
                },
              ],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: 'a',
              weight: 2,
            },
            '@memo-6': {
              id: '@memo(withEverything/withParams-[11])-6',
              node: createFakeNode(
                '@memo(withEverything/withParams-[11])-6',
                expect.any(Function),
              ),
              observers: [
                {
                  key: 'withEverything/withParams-[11]',
                  operation: 'get',
                },
              ],
              sources: [],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: expect.any(Function),
              weight: 1,
            },
            '@signal-4': {
              id: '@signal(withEverything/withParams-[11])-4',
              node: createFakeNode(
                '@signal(withEverything/withParams-[11])-4',
                'a',
              ),
              observers: [
                {
                  key: '@memo(withEverything/withParams-[11])-5',
                  operation: 'get',
                },
                {
                  key: 'withEverything/withParams-[11]',
                  operation: 'injectSignal',
                },
              ],
              sources: [],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: 'a',
              weight: 1,
            },
            _: {
              id: 'withEverything/withParams-[11]',
              node: createFakeNode('withEverything/withParams-[11]', 'a'),
              observers: [],
              sources: [
                {
                  key: '@signal(withEverything/withParams-[11])-4',
                  operation: 'injectSignal',
                },
                {
                  key: '@memo(withEverything/withParams-[11])-5',
                  operation: 'get',
                },
                {
                  key: '@memo(withEverything/withParams-[11])-6',
                  operation: 'get',
                },
              ],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: 'a',
              weight: 5,
            },
          },
          '[21]': {
            '@memo-17': {
              id: '@memo(withEverything/withParams-[21])-17',
              node: createFakeNode(
                '@memo(withEverything/withParams-[21])-17',
                'a',
              ),
              observers: [
                {
                  key: 'withEverything/withParams-[21]',
                  operation: 'get',
                },
              ],
              sources: [
                {
                  key: '@signal(withEverything/withParams-[21])-16',
                  operation: 'get',
                },
              ],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: 'a',
              weight: 2,
            },
            '@memo-18': {
              id: '@memo(withEverything/withParams-[21])-18',
              node: createFakeNode(
                '@memo(withEverything/withParams-[21])-18',
                expect.any(Function),
              ),
              observers: [
                {
                  key: 'withEverything/withParams-[21]',
                  operation: 'get',
                },
              ],
              sources: [],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: expect.any(Function),
              weight: 1,
            },
            '@signal-16': {
              id: '@signal(withEverything/withParams-[21])-16',
              node: createFakeNode(
                '@signal(withEverything/withParams-[21])-16',
                'a',
              ),
              observers: [
                {
                  key: '@memo(withEverything/withParams-[21])-17',
                  operation: 'get',
                },
                {
                  key: 'withEverything/withParams-[21]',
                  operation: 'injectSignal',
                },
              ],
              sources: [],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: 'a',
              weight: 1,
            },
            _: {
              id: 'withEverything/withParams-[21]',
              node: createFakeNode('withEverything/withParams-[21]', 'a'),
              observers: [
                {
                  key: '@component(MyComponent)-:r5:',
                  operation: 'useAtomValue',
                },
              ],
              sources: [
                {
                  key: '@signal(withEverything/withParams-[21])-16',
                  operation: 'injectSignal',
                },
                {
                  key: '@memo(withEverything/withParams-[21])-17',
                  operation: 'get',
                },
                {
                  key: '@memo(withEverything/withParams-[21])-18',
                  operation: 'get',
                },
              ],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: 'a',
              weight: 5,
            },
          },
        },
        withParamsAndScope: {
          '[22]': {
            '@memo-11': {
              id: '@memo(withEverything/withParamsAndScope-[22])-11',
              node: createFakeNode(
                '@memo(withEverything/withParamsAndScope-[22])-11',
                'a',
              ),
              observers: [
                {
                  key: 'withEverything/withParamsAndScope-[22]',
                  operation: 'get',
                },
              ],
              sources: [
                {
                  key: '@signal(withEverything/withParamsAndScope-[22])-10',
                  operation: 'get',
                },
              ],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: 'a',
              weight: 2,
            },
            '@memo-12': {
              id: '@memo(withEverything/withParamsAndScope-[22])-12',
              node: createFakeNode(
                '@memo(withEverything/withParamsAndScope-[22])-12',
                expect.any(Function),
              ),
              observers: [
                {
                  key: 'withEverything/withParamsAndScope-[22]',
                  operation: 'get',
                },
              ],
              sources: [],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: expect.any(Function),
              weight: 1,
            },
            '@signal-10': {
              id: '@signal(withEverything/withParamsAndScope-[22])-10',
              node: createFakeNode(
                '@signal(withEverything/withParamsAndScope-[22])-10',
                'a',
              ),
              observers: [
                {
                  key: '@memo(withEverything/withParamsAndScope-[22])-11',
                  operation: 'get',
                },
                {
                  key: 'withEverything/withParamsAndScope-[22]',
                  operation: 'injectSignal',
                },
              ],
              sources: [],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: 'a',
              weight: 1,
            },
            _: {
              id: 'withEverything/withParamsAndScope-[22]',
              node: createFakeNode(
                'withEverything/withParamsAndScope-[22]',
                'a',
              ),
              observers: [],
              sources: [
                {
                  key: '@signal(withEverything/withParamsAndScope-[22])-10',
                  operation: 'injectSignal',
                },
                {
                  key: '@memo(withEverything/withParamsAndScope-[22])-11',
                  operation: 'get',
                },
                {
                  key: '@memo(withEverything/withParamsAndScope-[22])-12',
                  operation: 'get',
                },
              ],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: 'a',
              weight: 5,
            },
          },
          '[42]': {
            '@memo-23': {
              id: '@memo(withEverything/withParamsAndScope-[42])-23',
              node: createFakeNode(
                '@memo(withEverything/withParamsAndScope-[42])-23',
                'a',
              ),
              observers: [
                {
                  key: 'withEverything/withParamsAndScope-[42]',
                  operation: 'get',
                },
              ],
              sources: [
                {
                  key: '@signal(withEverything/withParamsAndScope-[42])-22',
                  operation: 'get',
                },
              ],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: 'a',
              weight: 2,
            },
            '@memo-24': {
              id: '@memo(withEverything/withParamsAndScope-[42])-24',
              node: createFakeNode(
                '@memo(withEverything/withParamsAndScope-[42])-24',
                expect.any(Function),
              ),
              observers: [
                {
                  key: 'withEverything/withParamsAndScope-[42]',
                  operation: 'get',
                },
              ],
              sources: [],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: expect.any(Function),
              weight: 1,
            },
            '@signal-22': {
              id: '@signal(withEverything/withParamsAndScope-[42])-22',
              node: createFakeNode(
                '@signal(withEverything/withParamsAndScope-[42])-22',
                'a',
              ),
              observers: [
                {
                  key: '@memo(withEverything/withParamsAndScope-[42])-23',
                  operation: 'get',
                },
                {
                  key: 'withEverything/withParamsAndScope-[42]',
                  operation: 'injectSignal',
                },
              ],
              sources: [],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: 'a',
              weight: 1,
            },
            _: {
              id: 'withEverything/withParamsAndScope-[42]',
              node: createFakeNode(
                'withEverything/withParamsAndScope-[42]',
                'a',
              ),
              observers: [
                {
                  key: '@component(MyComponent)-:r7:',
                  operation: 'useAtomValue',
                },
                {
                  key: '@selector(otherNamedFnSelector)-29',
                  operation: 'get',
                },
              ],
              sources: [
                {
                  key: '@signal(withEverything/withParamsAndScope-[42])-22',
                  operation: 'injectSignal',
                },
                {
                  key: '@memo(withEverything/withParamsAndScope-[42])-23',
                  operation: 'get',
                },
                {
                  key: '@memo(withEverything/withParamsAndScope-[42])-24',
                  operation: 'get',
                },
              ],
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              value: 'a',
              weight: 5,
            },
          },
        },
        withScope: {
          '@memo-20': {
            id: '@memo(withEverything/withScope)-20',
            node: createFakeNode('@memo(withEverything/withScope)-20', 'a'),
            observers: [
              {
                key: 'withEverything/withScope-@scope("some context value")',
                operation: 'get',
              },
            ],
            sources: [
              {
                key: '@signal(withEverything/withScope)-19',
                operation: 'get',
              },
            ],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: 'a',
            weight: 2,
          },
          '@memo-21': {
            id: '@memo(withEverything/withScope)-21',
            node: createFakeNode(
              '@memo(withEverything/withScope)-21',
              expect.any(Function),
            ),
            observers: [
              {
                key: 'withEverything/withScope-@scope("some context value")',
                operation: 'get',
              },
            ],
            sources: [],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: expect.any(Function),
            weight: 1,
          },
          '@memo-8': {
            id: '@memo(withEverything/withScope)-8',
            node: createFakeNode('@memo(withEverything/withScope)-8', 'a'),
            observers: [
              {
                key: 'withEverything/withScope-@scope("simple-context-value")',
                operation: 'get',
              },
            ],
            sources: [
              {
                key: '@signal(withEverything/withScope)-7',
                operation: 'get',
              },
            ],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: 'a',
            weight: 2,
          },
          '@memo-9': {
            id: '@memo(withEverything/withScope)-9',
            node: createFakeNode(
              '@memo(withEverything/withScope)-9',
              expect.any(Function),
            ),
            observers: [
              {
                key: 'withEverything/withScope-@scope("simple-context-value")',
                operation: 'get',
              },
            ],
            sources: [],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: expect.any(Function),
            weight: 1,
          },
          '@scope-"simple-context-value"': {
            id: 'withEverything/withScope-@scope("simple-context-value")',
            node: createFakeNode(
              'withEverything/withScope-@scope("simple-context-value")',
              'a',
            ),
            observers: [],
            sources: [
              {
                key: '@signal(withEverything/withScope)-7',
                operation: 'injectSignal',
              },
              {
                key: '@memo(withEverything/withScope)-8',
                operation: 'get',
              },
              {
                key: '@memo(withEverything/withScope)-9',
                operation: 'get',
              },
            ],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: 'a',
            weight: 5,
          },
          '@scope-"some context value"': {
            id: 'withEverything/withScope-@scope("some context value")',
            node: createFakeNode(
              'withEverything/withScope-@scope("some context value")',
              'a',
            ),
            observers: [
              {
                key: '@component(MyComponent)-:r6:',
                operation: 'useAtomValue',
              },
            ],
            sources: [
              {
                key: '@signal(withEverything/withScope)-19',
                operation: 'injectSignal',
              },
              {
                key: '@memo(withEverything/withScope)-20',
                operation: 'get',
              },
              {
                key: '@memo(withEverything/withScope)-21',
                operation: 'get',
              },
            ],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: 'a',
            weight: 5,
          },
          '@signal-19': {
            id: '@signal(withEverything/withScope)-19',
            node: createFakeNode('@signal(withEverything/withScope)-19', 'a'),
            observers: [
              {
                key: '@memo(withEverything/withScope)-20',
                operation: 'get',
              },
              {
                key: 'withEverything/withScope-@scope("some context value")',
                operation: 'injectSignal',
              },
            ],
            sources: [],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: 'a',
            weight: 1,
          },
          '@signal-7': {
            id: '@signal(withEverything/withScope)-7',
            node: createFakeNode('@signal(withEverything/withScope)-7', 'a'),
            observers: [
              {
                key: '@memo(withEverything/withScope)-8',
                operation: 'get',
              },
              {
                key: 'withEverything/withScope-@scope("simple-context-value")',
                operation: 'injectSignal',
              },
            ],
            sources: [],
            type: GRAPH_BY_NAMESPACES_NODE_TYPE,
            value: 'a',
            weight: 1,
          },
        },
      },
      withScope: {
        '@scope-1': {
          id: 'withScope-@scope(1)',
          node: createFakeNode('withScope-@scope(1)', 1),
          observers: [],
          sources: [],
          type: GRAPH_BY_NAMESPACES_NODE_TYPE,
          value: 1,
          weight: 1,
        },
      },
    } satisfies GraphByNamespaces);
  });

  it('should create graph without details', () => {
    const graph = generateGraphByNamespaces({
      flat: ecosystem.viewGraph('flat'),
      getNode: (id: string) => ecosystem.n.get(id),
      getNodeGroupNames: (node) => parseNodeGroupNames(node.id),
      globalGraphOptions: defaults(
        DEFAULT_ZEDUX_LOGGER_GLOBAL_OPTIONS.graphOptions,
        {
          showNodeDepsInGraphByNamespaces: false,
          showNodesInGraphByNamespaces: false,
          showNodeValueInGraphByNamespaces: false,
        },
      ),
    });

    expect(graph).toEqual({
      '1': {
        '@memo-15': '@memo(1)-15',
        _: '1',
      },
      '@component': {
        MyComponent: {
          ':r8:': '@component(MyComponent)-:r8:',
          ':r9:': '@component(MyComponent)-:r9:',
          ':ra:': '@component(MyComponent)-:ra:',
          ':rb:': '@component(MyComponent)-:rb:',
          ':rc:': '@component(MyComponent)-:rc:',
          ':rd:': '@component(MyComponent)-:rd:',
          ':re:': '@component(MyComponent)-:re:',
          ':rf:': '@component(MyComponent)-:rf:',
        },
      },
      '@selector': {
        namedFnSelector: {
          '27': '@selector(namedFnSelector)-27',
        },
        otherNamedFnSelector: {
          '29': '@selector(otherNamedFnSelector)-29',
        },
        unknown: {
          '28': '@selector(unknown)-28',
        },
      },
      '@signal': {
        '13': '@signal()-13',
        '14': '@signal()-14',
      },
      atomNumber: {
        '0': 'atomNumber/0',
        '1': 'atomNumber/1',
        '2': 'atomNumber/2',
        '3': 'atomNumber/3',
        '4': 'atomNumber/4',
        '5': 'atomNumber/5',
        '6': 'atomNumber/6',
        '7': 'atomNumber/7',
        '8': 'atomNumber/8',
        '9': 'atomNumber/9',
      },
      nested: {
        one: 'nested/one',
        three: {
          _: 'nested/three',
          four: 'nested/three/four',
        },
        two: 'nested/two',
      },
      simple: {
        atom: {
          with: {
            params: {
              '[21]': 'simple/atom/with/params-[21]',
              and: {
                scope: {
                  '[42]': {
                    '@scope-"some context value"':
                      'simple/atom/with/params/and/scope-[42]-@scope("some context value")',
                  },
                },
              },
            },
            scope: {
              '@scope-"some context value"':
                'simple/atom/with/scope-@scope("some context value")',
            },
          },
        },
      },
      'simple atom': 'simple atom',
      something: 'something',
      with: {
        signal: {
          '2': {
            '@signal-30': '@signal(with/signal/2)-30',
            _: 'with/signal/2',
          },
          '@signal-25': {
            '@listener-26': '@listener(@signal(with/signal)-25)-26',
            _: '@signal(with/signal)-25',
          },
          _: 'with/signal',
        },
      },
      withEverything: {
        '@memo-2': '@memo(withEverything)-2',
        '@memo-3': '@memo(withEverything)-3',
        '@signal-1': '@signal(withEverything)-1',
        _: 'withEverything',
        withParams: {
          '[11]': {
            '@memo-5': '@memo(withEverything/withParams-[11])-5',
            '@memo-6': '@memo(withEverything/withParams-[11])-6',
            '@signal-4': '@signal(withEverything/withParams-[11])-4',
            _: 'withEverything/withParams-[11]',
          },
          '[21]': {
            '@memo-17': '@memo(withEverything/withParams-[21])-17',
            '@memo-18': '@memo(withEverything/withParams-[21])-18',
            '@signal-16': '@signal(withEverything/withParams-[21])-16',
            _: 'withEverything/withParams-[21]',
          },
        },
        withParamsAndScope: {
          '[22]': {
            '@memo-11': '@memo(withEverything/withParamsAndScope-[22])-11',
            '@memo-12': '@memo(withEverything/withParamsAndScope-[22])-12',
            '@signal-10': '@signal(withEverything/withParamsAndScope-[22])-10',
            _: 'withEverything/withParamsAndScope-[22]',
          },
          '[42]': {
            '@memo-23': '@memo(withEverything/withParamsAndScope-[42])-23',
            '@memo-24': '@memo(withEverything/withParamsAndScope-[42])-24',
            '@signal-22': '@signal(withEverything/withParamsAndScope-[42])-22',
            _: 'withEverything/withParamsAndScope-[42]',
          },
        },
        withScope: {
          '@memo-20': '@memo(withEverything/withScope)-20',
          '@memo-21': '@memo(withEverything/withScope)-21',
          '@memo-8': '@memo(withEverything/withScope)-8',
          '@memo-9': '@memo(withEverything/withScope)-9',
          '@scope-"simple-context-value"':
            'withEverything/withScope-@scope("simple-context-value")',
          '@scope-"some context value"':
            'withEverything/withScope-@scope("some context value")',
          '@signal-19': '@signal(withEverything/withScope)-19',
          '@signal-7': '@signal(withEverything/withScope)-7',
        },
      },
      withScope: {
        '@scope-1': 'withScope-@scope(1)',
      },
    } satisfies GraphByNamespaces);
  });
});
