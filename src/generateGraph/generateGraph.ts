import type { ZeduxNode } from '@zedux/atoms';
import { type Ecosystem, type GraphViewRecursive } from '@zedux/react';

import type { CompleteZeduxLoggerGlobalOptions } from '../types/ZeduxLoggerGlobalOptions.js';
import type { CompleteZeduxLoggerLocalOptions } from '../types/ZeduxLoggerLocalOptions.js';
import { shouldIgnoreNodeInFlatGraph } from '../updateGraphIncrementally/utils/shouldIgnoreNodeInFlatGraph.js';
import {
  type GraphByNamespaces,
  generateGraphByNamespaces,
} from './generateGraphByNamespaces.js';

export interface Graph {
  byNamespaces: GraphByNamespaces;
  flat: Record<
    string,
    {
      observers: Array<{ key: string; operation: string }>;
      sources: Array<{ key: string; operation: string }>;
      weight: number;
    }
  >;
  bottomUp: GraphViewRecursive;
  topDown: GraphViewRecursive;
}

export function generateGraph(args: {
  ecosystem: Ecosystem;
  calculateFlatGraph: boolean;
  calculateByNamespacesGraph: boolean;
  calculateBottomUpGraph: boolean;
  calculateTopDownGraph: boolean;
  calculateGraph: boolean;
  globalGraphOptions: CompleteZeduxLoggerGlobalOptions['graphOptions'];
  console: CompleteZeduxLoggerLocalOptions['console'];
  getNodeGroupNames(this: void, node: ZeduxNode): string[];
}): Graph | undefined {
  const {
    ecosystem,
    calculateBottomUpGraph,
    calculateByNamespacesGraph,
    calculateFlatGraph,
    calculateGraph,
    calculateTopDownGraph,
    globalGraphOptions,
    console,
    getNodeGroupNames,
  } = args;

  let newGraph: Graph | undefined;
  if (calculateGraph) {
    try {
      newGraph = { byNamespaces: {}, flat: {}, bottomUp: {}, topDown: {} };

      if (calculateFlatGraph || calculateByNamespacesGraph) {
        newGraph.flat = ecosystem.viewGraph('flat');
      }
      if (calculateByNamespacesGraph) {
        newGraph.byNamespaces = generateGraphByNamespaces({
          flat: newGraph.flat,
          getNode: (id) => ecosystem.n.get(id),
          globalGraphOptions,
          getNodeGroupNames,
        });
      }
      if (calculateBottomUpGraph) {
        newGraph.bottomUp = ecosystem.viewGraph('bottom-up');
      }
      if (calculateTopDownGraph) {
        newGraph.topDown = ecosystem.viewGraph('top-down');
      }
    } catch (error) {
      console.warn('Failed to generate graph', error);
    }
  }

  if (
    (!globalGraphOptions.showExternalNodesInFlatGraph ||
      !globalGraphOptions.showSignalsInFlatGraph) &&
    newGraph !== undefined
  ) {
    for (const [, node] of ecosystem.n) {
      if (shouldIgnoreNodeInFlatGraph(node, globalGraphOptions)) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete newGraph.flat[node.id];
      }
    }
  }

  return newGraph;
}
