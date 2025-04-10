import type { EcosystemEvents, ZeduxNode } from '@zedux/react';
import { produce } from 'immer';

import type { Graph } from '../generateGraph/generateGraph.js';
import type { GraphByNamespaces } from '../generateGraph/generateGraphByNamespaces.js';
import type { CompleteZeduxLoggerGlobalOptions } from '../types/ZeduxLoggerGlobalOptions.js';
import { updateBottomUpGraphIncrementally } from './updateBottomUpGraphIncrementally.js';
import { updateByNamespacesGraphIncrementally } from './updateByNamespacesGraphIncrementally.js';
import { updateFlatGraphIncrementally } from './updateFlatGraphIncrementally.js';
import { updateTopDownGraphIncrementally } from './updateTopDownGraphIncrementally.js';

export function updateGraphIncrementally(args: {
  eventMap: Partial<EcosystemEvents>;
  graph: Graph;
  calculateFlatGraph: boolean;
  calculateTopDownGraph: boolean;
  calculateBottomUpGraph: boolean;
  calculateByNamespacesGraph: boolean;
  globalGraphOptions: CompleteZeduxLoggerGlobalOptions['graphOptions'];
  getNodeGroupNames(this: void, node: ZeduxNode): string[];
}): Graph {
  const {
    eventMap,
    graph,
    calculateBottomUpGraph,
    calculateByNamespacesGraph,
    calculateFlatGraph,
    calculateTopDownGraph,
    globalGraphOptions,
    getNodeGroupNames,
  } = args;
  return produce(graph, (draft) => {
    if (calculateFlatGraph) {
      updateFlatGraphIncrementally({
        eventMap,
        flatGraph: draft.flat,
        globalGraphOptions,
      });
    }
    if (calculateTopDownGraph) {
      updateTopDownGraphIncrementally({
        eventMap,
        topDownGraph: draft.topDown,
      });
    }
    if (calculateBottomUpGraph) {
      updateBottomUpGraphIncrementally({
        eventMap,
        bottomUpGraph: draft.bottomUp,
      });
    }
    if (calculateByNamespacesGraph) {
      updateByNamespacesGraphIncrementally({
        eventMap,
        byNamespacesGraph: draft.byNamespaces as GraphByNamespaces,
        globalGraphOptions,
        getNodeGroupNames,
      });
    }
  });
}
