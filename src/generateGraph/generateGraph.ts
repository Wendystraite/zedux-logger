import {
  type Ecosystem,
  ExternalNode,
  type GraphViewRecursive,
} from '@zedux/react';
import type { RefObject } from 'react';

import type { ZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';
import type { EventMap } from '../types/EventMap.js';
import {
  type GraphByNamespaces,
  graphByNamespaces,
} from './graphByNamespaces.js';

export interface Graph {
  byNamespaces: GraphByNamespaces | undefined;
  flat: Record<
    string,
    {
      dependencies: Array<{ key: string; operation: string }>;
      dependents: Array<{ key: string; operation: string }>;
      weight: number;
    }
  >;
  bottomUp: GraphViewRecursive;
  topDown: GraphViewRecursive;
}

export function generateGraph({
  ecosystem,
  eventMap,
  options,
  oldGraphRef,
}: {
  ecosystem: Ecosystem;
  eventMap: EventMap;
  options: ZeduxLoggerOptions;
  oldGraphRef: RefObject<Graph | undefined>;
}): Graph | undefined {
  let canGraph = false;
  if (options.showGraph) {
    if (eventMap.edge !== undefined) {
      canGraph = true;
    } else if (
      eventMap.cycle?.oldStatus === 'Initializing' &&
      eventMap.cycle.newStatus === 'Active'
    ) {
      canGraph = true;
    } else if (eventMap.cycle?.newStatus === 'Destroyed') {
      canGraph = true;
    }
  }

  let newGraph: Graph | undefined;
  if (canGraph) {
    try {
      const flat = ecosystem.viewGraph('flat');

      newGraph = {
        byNamespaces: options.showGraphByNamespaces
          ? graphByNamespaces({
              flat,
              getNode: (id) => ecosystem.n.get(id),
            })
          : undefined,
        flat,
        bottomUp: ecosystem.viewGraph('bottom-up'),
        topDown: ecosystem.viewGraph('top-down'),
      };
      oldGraphRef.current = newGraph;
    } catch (error) {
      options.console.warn('Failed to generate graph', error);
    }
  }

  if (
    (options.hideExternalNodesFromFlatGraph ||
      options.hideSignalsFromFlatGraph) &&
    newGraph !== undefined
  ) {
    for (const [, node] of ecosystem.n) {
      if (
        options.hideExternalNodesFromFlatGraph &&
        node instanceof ExternalNode
      ) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete newGraph.flat[node.id];
      } else if (
        options.hideSignalsFromFlatGraph &&
        node.id.startsWith('@signal')
      ) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete newGraph.flat[node.id];
      }
    }
  }

  return newGraph;
}
