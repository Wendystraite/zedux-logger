import type { EcosystemEvents } from '@zedux/react';
import { produce } from 'immer';

import type { Graph } from '../generateGraph/generateGraph.js';
import type { GraphByNamespaces } from '../generateGraph/generateGraphByNamespaces.js';
import type { CompleteZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';
import { updateBottomUpGraphIncrementally } from './updateBottomUpGraphIncrementally.js';
import { updateByNamespacesGraphIncrementally } from './updateByNamespacesGraphIncrementally.js';
import { updateFlatGraphIncrementally } from './updateFlatGraphIncrementally.js';
import { updateTopDownGraphIncrementally } from './updateTopDownGraphIncrementally.js';

export function updateGraphIncrementally(
  eventMap: Partial<EcosystemEvents>,
  graph: Graph,
  options: Pick<
    CompleteZeduxLoggerOptions['graphOptions'],
    | 'showExternalNodesInFlatGraph'
    | 'showSignalsInFlatGraph'
    | 'showByNamespacesGraph'
    | 'showTopDownGraph'
    | 'showBottomUpGraph'
    | 'showFlatGraph'
    | 'showNodeDepsInGraphByNamespaces'
    | 'showNodeValueInGraphByNamespaces'
    | 'showNodesInGraphByNamespaces'
  >,
): Graph {
  const {
    showTopDownGraph,
    showBottomUpGraph,
    showFlatGraph,
    showByNamespacesGraph,
  } = options;
  return produce(graph, (draft) => {
    if (showFlatGraph) {
      updateFlatGraphIncrementally({
        eventMap,
        flatGraph: draft.flat,
        options,
      });
    }
    if (showTopDownGraph) {
      updateTopDownGraphIncrementally({
        eventMap,
        topDownGraph: draft.topDown,
      });
    }
    if (showBottomUpGraph) {
      updateBottomUpGraphIncrementally({
        eventMap,
        bottomUpGraph: draft.bottomUp,
      });
    }
    if (showByNamespacesGraph) {
      updateByNamespacesGraphIncrementally({
        eventMap,
        byNamespacesGraph: draft.byNamespaces as GraphByNamespaces,
        options,
      });
    }
  });
}
