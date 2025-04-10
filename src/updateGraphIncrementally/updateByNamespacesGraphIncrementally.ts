import { type EcosystemEvents, type ZeduxNode } from '@zedux/react';

import type { Graph } from '../generateGraph/generateGraph.js';
import {
  type GraphByNamespacesNode,
  isGraphByNamespacesNodeObject,
} from '../generateGraph/generateGraphByNamespaces.js';
import type { CompleteZeduxLoggerGlobalOptions } from '../types/ZeduxLoggerGlobalOptions.js';
import { addRecursiveGraphByNamespacesNodeToPath } from './utils/addRecursiveGraphByNamespacesNodeToPath.js';
import { getDefaultByNamespacesGraphNode } from './utils/getDefaultByNamespacesGraphNode.js';
import { getRecursiveGraphByNamespacesNodeToPath } from './utils/getRecursiveGraphByNamespacesNodeToPath.js';
import { removeRecursiveGraphByNamespacesNodeToPath } from './utils/removeRecursiveGraphByNamespacesNodeToPath.js';

export function updateByNamespacesGraphIncrementally(args: {
  eventMap: Partial<EcosystemEvents>;
  byNamespacesGraph: NonNullable<Graph['byNamespaces']>;
  globalGraphOptions: CompleteZeduxLoggerGlobalOptions['graphOptions'];
  getNodeGroupNames(this: void, node: ZeduxNode): string[];
}): void {
  const {
    eventMap: { cycle, edge },
    byNamespacesGraph,
    globalGraphOptions,
    getNodeGroupNames,
  } = args;

  if (cycle === undefined && edge === undefined) {
    return;
  }

  if (cycle) {
    handleCycleEvent({
      cycle,
      draft: byNamespacesGraph,
      globalGraphOptions,
      getNodeGroupNames,
    });
  } else if (edge) {
    handleEdgeEvent({
      edge,
      draft: byNamespacesGraph,
      globalGraphOptions,
      getNodeGroupNames,
    });
  }
}

function handleCycleEvent(args: {
  cycle: NonNullable<EcosystemEvents['cycle']>;
  draft: NonNullable<Graph['byNamespaces']>;
  globalGraphOptions: CompleteZeduxLoggerGlobalOptions['graphOptions'];
  getNodeGroupNames(this: void, node: ZeduxNode): string[];
}): void {
  const {
    cycle: { oldStatus, newStatus, source },
    draft,
    globalGraphOptions,
    getNodeGroupNames,
  } = args;

  if (source !== undefined) {
    if (oldStatus === 'Initializing' && newStatus === 'Active') {
      const sourceGroupNames = getNodeGroupNames(source);

      // console.log(
      //   `[byNs] add the newly active "${source.id}" node to byNamespaces graph with group names: "${sourceGroupNames.join('/')}"`,
      // );

      addRecursiveGraphByNamespacesNodeToPath(
        draft,
        sourceGroupNames,
        getDefaultByNamespacesGraphNode(source, globalGraphOptions),
      );
    } else if (newStatus === 'Destroyed') {
      const sourceGroupNames = getNodeGroupNames(source);

      // console.log(
      //   `[byNs] remove the destroyed "${source.id}" node from byNamespaces graph with group names: "${sourceGroupNames.join('/')}"`,
      // );

      removeRecursiveGraphByNamespacesNodeToPath(draft, sourceGroupNames);
    }
  }
}

function handleEdgeEvent(args: {
  edge: NonNullable<EcosystemEvents['edge']>;
  draft: NonNullable<Graph['byNamespaces']>;
  globalGraphOptions: CompleteZeduxLoggerGlobalOptions['graphOptions'];
  getNodeGroupNames(this: void, node: ZeduxNode): string[];
}): void {
  const {
    edge: { action, source, observer },
    draft,
    globalGraphOptions,
    getNodeGroupNames,
  } = args;

  const sourceGroupNames = getNodeGroupNames(source);
  const observerGroupNames = getNodeGroupNames(observer);

  let sourceGraphNode: GraphByNamespacesNode | undefined =
    getRecursiveGraphByNamespacesNodeToPath(draft, sourceGroupNames);

  let observerGraphNode: GraphByNamespacesNode | undefined =
    getRecursiveGraphByNamespacesNodeToPath(draft, observerGroupNames);

  if (sourceGraphNode === undefined) {
    // console.log(
    //   `[byNs] create "${source.id}" node to byNamespaces graph with group names: "${sourceGroupNames.join('/')}"`,
    // );

    sourceGraphNode = addRecursiveGraphByNamespacesNodeToPath(
      draft,
      sourceGroupNames,
      getDefaultByNamespacesGraphNode(source, globalGraphOptions),
    );
  }

  if (observerGraphNode === undefined) {
    // console.log(
    //   `[byNs] create "${observer.id}" node to byNamespaces graph with group names: "${observerGroupNames.join('/')}"`,
    // );

    observerGraphNode = addRecursiveGraphByNamespacesNodeToPath(
      draft,
      observerGroupNames,
      getDefaultByNamespacesGraphNode(observer, globalGraphOptions),
    );
  }

  switch (action) {
    case 'add': {
      // console.log(
      //   `[byNs] add "${source.id}" as a new dependency to "${observer.id}"`,
      // );
      // console.log(
      //   `[byNs] add "${observer.id}" as a new dependent to "${source.id}"`,
      // );

      if (isGraphByNamespacesNodeObject(observerGraphNode)) {
        if (observerGraphNode.weight !== undefined) {
          observerGraphNode.weight += 1;
        }
        if (observerGraphNode.sources !== undefined) {
          observerGraphNode.sources.push({
            key: source.id,
            operation: observer.s.get(source)?.operation ?? '',
          });
        }
      }
      if (isGraphByNamespacesNodeObject(sourceGraphNode)) {
        if (sourceGraphNode.observers !== undefined) {
          sourceGraphNode.observers.push({
            key: observer.id,
            operation: source.o.get(observer)?.operation ?? '',
          });
        }
      }
      break;
    }
    case 'remove': {
      // console.log(
      //   `[byNs] remove "${source.id}" from the sources of "${observer.id}"`,
      // );
      // console.log(
      //   `[byNs] remove "${observer.id}" from the observers of "${source.id}"`,
      // );

      if (isGraphByNamespacesNodeObject(observerGraphNode)) {
        if (observerGraphNode.weight !== undefined) {
          observerGraphNode.weight -= 1;
        }
        if (observerGraphNode.sources !== undefined) {
          observerGraphNode.sources = observerGraphNode.sources.filter(
            (dep) => dep.key !== source.id,
          );
        }
      }
      if (isGraphByNamespacesNodeObject(sourceGraphNode)) {
        if (sourceGraphNode.observers !== undefined) {
          sourceGraphNode.observers = sourceGraphNode.observers.filter(
            (dep) => dep.key !== observer.id,
          );
        }
      }
      break;
    }
  }
}
