import { type EcosystemEvents } from '@zedux/react';

import type { Graph } from '../generateGraph/generateGraph.js';
import {
  type GraphByNamespacesNode,
  isGraphByNamespacesNodeObject,
} from '../generateGraph/generateGraphByNamespaces.js';
import { parseAtomGroupNames } from '../parseAtomName/parseAtomGroupNames.js';
import type { CompleteZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';
import { addRecursiveGraphByNamespacesNodeToPath } from './utils/addRecursiveGraphByNamespacesNodeToPath.js';
import { getDefaultByNamespacesGraphNode } from './utils/getDefaultByNamespacesGraphNode.js';
import { getRecursiveGraphByNamespacesNodeToPath } from './utils/getRecursiveGraphByNamespacesNodeToPath.js';
import { removeRecursiveGraphByNamespacesNodeToPath } from './utils/removeRecursiveGraphByNamespacesNodeToPath.js';

export function updateByNamespacesGraphIncrementally({
  eventMap,
  byNamespacesGraph,
  options,
}: {
  eventMap: Partial<EcosystemEvents>;
  byNamespacesGraph: NonNullable<Graph['byNamespaces']>;
  options: Pick<
    CompleteZeduxLoggerOptions['graphOptions'],
    | 'showNodeDepsInGraphByNamespaces'
    | 'showNodeValueInGraphByNamespaces'
    | 'showNodesInGraphByNamespaces'
  >;
}): void {
  const { cycle, edge } = eventMap;
  if (cycle === undefined && edge === undefined) {
    return;
  }

  if (cycle) {
    handleCycleEvent({ cycle, draft: byNamespacesGraph, options });
  } else if (edge) {
    handleEdgeEvent({ edge, draft: byNamespacesGraph, options });
  }
}

function handleCycleEvent({
  cycle,
  draft,
  options,
}: {
  cycle: NonNullable<EcosystemEvents['cycle']>;
  draft: NonNullable<Graph['byNamespaces']>;
  options: Pick<
    CompleteZeduxLoggerOptions['graphOptions'],
    | 'showNodeDepsInGraphByNamespaces'
    | 'showNodeValueInGraphByNamespaces'
    | 'showNodesInGraphByNamespaces'
  >;
}): void {
  const { oldStatus, newStatus, source } = cycle;
  if (source !== undefined) {
    if (oldStatus === 'Initializing' && newStatus === 'Active') {
      const sourceGroupNames = parseAtomGroupNames(source.id);

      // console.log(
      //   `[byNs] add the newly active "${source.id}" node to byNamespaces graph with group names: "${sourceGroupNames.join('/')}"`,
      // );

      addRecursiveGraphByNamespacesNodeToPath(
        draft,
        sourceGroupNames,
        getDefaultByNamespacesGraphNode(source, options),
      );
    } else if (newStatus === 'Destroyed') {
      const sourceGroupNames = parseAtomGroupNames(source.id);

      // console.log(
      //   `[byNs] remove the destroyed "${source.id}" node from byNamespaces graph with group names: "${sourceGroupNames.join('/')}"`,
      // );

      removeRecursiveGraphByNamespacesNodeToPath(draft, sourceGroupNames);
    }
  }
}

function handleEdgeEvent({
  edge,
  draft,
  options,
}: {
  edge: NonNullable<EcosystemEvents['edge']>;
  draft: NonNullable<Graph['byNamespaces']>;
  options: Pick<
    CompleteZeduxLoggerOptions['graphOptions'],
    | 'showNodeDepsInGraphByNamespaces'
    | 'showNodeValueInGraphByNamespaces'
    | 'showNodesInGraphByNamespaces'
  >;
}): void {
  const { source, observer } = edge;

  const sourceGroupNames = parseAtomGroupNames(source.id);
  const observerGroupNames = parseAtomGroupNames(observer.id);

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
      getDefaultByNamespacesGraphNode(source, options),
    );
  }

  if (observerGraphNode === undefined) {
    // console.log(
    //   `[byNs] create "${observer.id}" node to byNamespaces graph with group names: "${observerGroupNames.join('/')}"`,
    // );

    observerGraphNode = addRecursiveGraphByNamespacesNodeToPath(
      draft,
      observerGroupNames,
      getDefaultByNamespacesGraphNode(observer, options),
    );
  }

  switch (edge.action) {
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
        if (observerGraphNode.dependencies !== undefined) {
          observerGraphNode.dependencies.push({
            key: source.id,
            operation: observer.s.get(source)?.operation ?? '',
          });
        }
      }
      if (isGraphByNamespacesNodeObject(sourceGraphNode)) {
        if (sourceGraphNode.dependents !== undefined) {
          sourceGraphNode.dependents.push({
            key: observer.id,
            operation: source.o.get(observer)?.operation ?? '',
          });
        }
      }
      break;
    }
    case 'remove': {
      // console.log(
      //   `[byNs] remove "${source.id}" from the dependencies of "${observer.id}"`,
      // );
      // console.log(
      //   `[byNs] remove "${observer.id}" from the dependents of "${source.id}"`,
      // );

      if (isGraphByNamespacesNodeObject(observerGraphNode)) {
        if (observerGraphNode.weight !== undefined) {
          observerGraphNode.weight -= 1;
        }
        if (observerGraphNode.dependencies !== undefined) {
          observerGraphNode.dependencies =
            observerGraphNode.dependencies.filter(
              (dep) => dep.key !== source.id,
            );
        }
      }
      if (isGraphByNamespacesNodeObject(sourceGraphNode)) {
        if (sourceGraphNode.dependents !== undefined) {
          sourceGraphNode.dependents = sourceGraphNode.dependents.filter(
            (dep) => dep.key !== observer.id,
          );
        }
      }
      break;
    }
  }
}
