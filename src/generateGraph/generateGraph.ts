import { type Ecosystem, type GraphViewRecursive } from '@zedux/react';

import type { CompleteZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';
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
  options: CompleteZeduxLoggerOptions;
}): Graph | undefined {
  const {
    ecosystem,
    options: {
      console,
      showInDetails: { showGraph },
      graphOptions,
      graphOptions: {
        showTopDownGraph,
        showBottomUpGraph,
        showFlatGraph,
        showByNamespacesGraph,
        showExternalNodesInFlatGraph,
        showSignalsInFlatGraph,
      },
    },
  } = args;

  let newGraph: Graph | undefined;
  if (showGraph) {
    try {
      newGraph = { byNamespaces: {}, flat: {}, bottomUp: {}, topDown: {} };

      if (showFlatGraph || showByNamespacesGraph) {
        newGraph.flat = ecosystem.viewGraph('flat');
      }
      if (showByNamespacesGraph) {
        newGraph.byNamespaces = generateGraphByNamespaces({
          flat: newGraph.flat,
          getNode: (id) => ecosystem.n.get(id),
          options: graphOptions,
        });
      }
      if (showBottomUpGraph) {
        newGraph.bottomUp = ecosystem.viewGraph('bottom-up');
      }
      if (showTopDownGraph) {
        newGraph.topDown = ecosystem.viewGraph('top-down');
      }
    } catch (error) {
      console.warn('Failed to generate graph', error);
    }
  }

  if (
    (!showExternalNodesInFlatGraph || !showSignalsInFlatGraph) &&
    newGraph !== undefined
  ) {
    for (const [, node] of ecosystem.n) {
      if (shouldIgnoreNodeInFlatGraph(node, graphOptions)) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete newGraph.flat[node.id];
      }
    }
  }

  return newGraph;
}
