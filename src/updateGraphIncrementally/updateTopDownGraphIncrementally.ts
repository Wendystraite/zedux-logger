import { type EcosystemEvents } from '@zedux/react';

import type { Graph } from '../generateGraph/generateGraph.js';
import { deletePath } from '../utils/deletePath.js';
import { addRecursiveGraphNodeToPath } from './utils/addRecursiveGraphNodeToPath.js';

export function updateTopDownGraphIncrementally({
  eventMap,
  topDownGraph,
}: {
  eventMap: Partial<EcosystemEvents>;
  topDownGraph: Graph['topDown'];
}): void {
  const { cycle, edge } = eventMap;
  if (cycle === undefined && edge === undefined) {
    return;
  }

  if (cycle) {
    handleCycleEvent({ cycle, draft: topDownGraph });
  } else if (edge) {
    handleEdgeEvent({ edge, draft: topDownGraph });
  }
}

function handleCycleEvent({
  cycle,
  draft,
}: {
  cycle: NonNullable<EcosystemEvents['cycle']>;
  draft: Graph['topDown'];
}): void {
  const { oldStatus, newStatus, source } = cycle;
  if (source !== undefined) {
    if (oldStatus === 'Initializing' && newStatus === 'Active') {
      if (source.s.size <= 0) {
        // console.log(
        //   `[topDn] add "${source.id}" to graph's root since it has no sources`,
        // );

        addRecursiveGraphNodeToPath(draft, [source.id]);
      } else {
        source.s.forEach((_, sourceNode) => {
          // console.log(
          //   `[topDn] add "${sourceNode.id}.${source.id}" since ${sourceNode.id} is a source of "${source.id}"`,
          // );

          addRecursiveGraphNodeToPath(draft, [sourceNode.id, source.id]);
        });
      }
    } else if (newStatus === 'Destroyed') {
      if (source.s.size <= 0) {
        // console.log(
        //   `[topDn] remove "${source.id}" from graph's root since it has no sources`,
        // );

        deletePath(draft, [source.id]);
      } else {
        source.s.forEach((_, sourceNode) => {
          // console.log(
          //   `[topDn] remove "${sourceNode.id}.${source.id}" since ${sourceNode.id} is a source of "${source.id}"`,
          // );

          deletePath(draft, [sourceNode.id, source.id]);
        });
      }
    }
  }
}

function handleEdgeEvent({
  edge,
  draft,
}: {
  edge: NonNullable<EcosystemEvents['edge']>;
  draft: Graph['topDown'];
}): void {
  const { source, observer } = edge;

  switch (edge.action) {
    case 'add': {
      // console.log(`[topDn] add edge "${source.id}.${observer.id}"`);

      addRecursiveGraphNodeToPath(draft, [source.id, observer.id]);
      break;
    }
    case 'remove': {
      // console.log(`[topDn] remove edge "${source.id}.${observer.id}"`);

      deletePath(draft, [source.id, observer.id]);
      break;
    }
  }
}
