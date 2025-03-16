import { type EcosystemEvents } from '@zedux/react';

import type { Graph } from '../generateGraph/generateGraph.js';
import type { CompleteZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';
import { getDefaultFlatGraphNode } from './utils/getDefaultGraphNode.js';
import { shouldIgnoreNodeInFlatGraph } from './utils/shouldIgnoreNodeInFlatGraph.js';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-dynamic-delete */

export function updateFlatGraphIncrementally({
  eventMap,
  flatGraph,
  options,
}: {
  eventMap: Partial<EcosystemEvents>;
  flatGraph: Graph['flat'];
  options: Pick<
    CompleteZeduxLoggerOptions['graphOptions'],
    'showExternalNodesInFlatGraph' | 'showSignalsInFlatGraph'
  >;
}): void {
  const { cycle, edge } = eventMap;
  if (cycle === undefined && edge === undefined) {
    return;
  }

  const shouldIgnoreSourceNode = shouldIgnoreNodeInFlatGraph(
    (cycle ?? edge)!.source,
    options,
  );

  if (cycle) {
    handleCycleEvent({ cycle, draft: flatGraph, shouldIgnoreSourceNode });
  } else if (edge) {
    handleEdgeEvent({ edge, draft: flatGraph, shouldIgnoreSourceNode });
  }
}

function handleCycleEvent({
  cycle,
  draft,
  shouldIgnoreSourceNode,
}: {
  cycle: NonNullable<EcosystemEvents['cycle']>;
  draft: Graph['flat'];
  shouldIgnoreSourceNode: boolean;
}): void {
  const { oldStatus, newStatus, source } = cycle;
  if (source !== undefined && !shouldIgnoreSourceNode) {
    if (oldStatus === 'Initializing' && newStatus === 'Active') {
      // console.log(
      //   `[flat] add the newly active "${source.id}" node to flat graph`,
      // );

      draft[source.id] ??= getDefaultFlatGraphNode();
    } else if (newStatus === 'Destroyed') {
      // console.log(
      //   `[flat] remove the destroyed "${source.id}" node from flat graph`,
      // );

      delete draft[source.id];
    }
  }
}

function handleEdgeEvent({
  edge,
  draft,
  shouldIgnoreSourceNode,
}: {
  edge: NonNullable<EcosystemEvents['edge']>;
  draft: Graph['flat'];
  shouldIgnoreSourceNode: boolean;
}): void {
  const { source, observer } = edge;

  if (!shouldIgnoreSourceNode) {
    draft[source.id] ??= getDefaultFlatGraphNode();
  }
  draft[observer.id] ??= getDefaultFlatGraphNode();

  const sourceGraphNode = draft[source.id]!;
  const observerGraphNode = draft[observer.id]!;

  switch (edge.action) {
    case 'add': {
      // console.log(
      //   `[flat] add "${source.id}" as a new dependency to "${observer.id}"`,
      // );
      // console.log(
      //   `[flat] add "${observer.id}" as a new dependent to "${source.id}"`,
      // );

      observerGraphNode.weight += 1;
      observerGraphNode.sources.push({
        key: source.id,
        operation: observer.s.get(source)?.operation ?? '',
      });
      if (!shouldIgnoreSourceNode) {
        sourceGraphNode.observers.push({
          key: observer.id,
          operation: source.o.get(observer)?.operation ?? '',
        });
      }
      break;
    }
    case 'remove': {
      // console.log(
      //   `[flat] remove "${source.id}" from the sources of "${observer.id}"`,
      // );
      // console.log(
      //   `[flat] remove "${observer.id}" from the observers of "${source.id}"`,
      // );

      observerGraphNode.weight -= 1;
      observerGraphNode.sources = observerGraphNode.sources.filter(
        (dep) => dep.key !== source.id,
      );
      if (!shouldIgnoreSourceNode) {
        sourceGraphNode.observers = sourceGraphNode.observers.filter(
          (dep) => dep.key !== observer.id,
        );
      }
      break;
    }
  }
}
