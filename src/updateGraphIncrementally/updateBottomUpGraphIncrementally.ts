import { type EcosystemEvents } from '@zedux/react';

import type { Graph } from '../generateGraph/generateGraph.js';
import { deletePath } from '../utils/deletePath.js';
import { addRecursiveGraphNodeToPath } from './utils/addRecursiveGraphNodeToPath.js';

export function updateBottomUpGraphIncrementally({
  eventMap,
  bottomUpGraph,
}: {
  eventMap: Partial<EcosystemEvents>;
  bottomUpGraph: Graph['bottomUp'];
}): void {
  const { cycle, edge } = eventMap;
  if (cycle === undefined && edge === undefined) {
    return;
  }

  if (cycle) {
    handleCycleEvent({ cycle, draft: bottomUpGraph });
  } else if (edge) {
    handleEdgeEvent({ edge, draft: bottomUpGraph });
  }
}

function handleCycleEvent({
  cycle,
  draft,
}: {
  cycle: NonNullable<EcosystemEvents['cycle']>;
  draft: Graph['bottomUp'];
}): void {
  const { oldStatus, newStatus, source } = cycle;
  if (source !== undefined) {
    if (oldStatus === 'Initializing' && newStatus === 'Active') {
      if (source.o.size <= 0) {
        // console.log(
        //   `[botUp] add "${source.id}" to graph's root since it has no observers`,
        // );

        addRecursiveGraphNodeToPath(draft, [source.id]);
      } else {
        source.o.forEach((_, sourceNode) => {
          // console.log(
          //   `[botUp] add to "${sourceNode.id}.${source.id}" since "${sourceNode.id}" is an observer of "${source.id}"`,
          // );

          const path = [sourceNode.id, source.id];
          addRecursiveGraphNodeToPath(draft, path);
        });
      }
    } else if (newStatus === 'Destroyed') {
      if (source.o.size <= 0) {
        // console.log(
        //   `[botUp] remove "${source.id}" from graph's root since it has no observers`,
        // );

        deletePath(draft, [source.id]);
      } else {
        source.o.forEach((_, sourceNode) => {
          // console.log(
          //   `[botUp] remove "${sourceNode.id}.${source.id}" since "${sourceNode.id}" was an observer of "${source.id}"`,
          // );

          const path = [sourceNode.id, source.id];
          deletePath(draft, path);
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
  draft: Graph['bottomUp'];
}): void {
  const { source, observer } = edge;

  switch (edge.action) {
    case 'add': {
      if (draft[source.id] !== undefined) {
        // console.log(
        //   `[botUp] remove previous leaf edge "${source.id}" from graph's root since it has now an observer`,
        // );

        deletePath(draft, [source.id]);
      }

      // console.log(`[botUp] add new edge to "${observer.id}.${source.id}"`);

      addRecursiveGraphNodeToPath(draft, [observer.id, source.id]);
      break;
    }
    case 'remove': {
      // console.log(`[botUp] remove edge "${observer.id}.${source.id}"`);

      deletePath(draft, [observer.id, source.id]);

      if (source.o.size <= 0) {
        // console.log(
        //   `[botUp] add newly leaf edge "${source.id}" to graph's root since it has no more observers`,
        // );

        addRecursiveGraphNodeToPath(draft, [source.id]);
      }
      break;
    }
  }
}
