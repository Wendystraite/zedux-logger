import { ZeduxNode } from '@zedux/react';
import { entries, groupBy, map, pipe } from 'remeda';

import { parseNodeGroupNames } from '../parseAtomId/parseNodeGroupNames.js';
import type { CompleteZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';

export const GRAPH_BY_NAMESPACES_NODE_TYPE: unique symbol = Symbol('nsNode');
export type GraphByNamespacesNodeType = typeof GRAPH_BY_NAMESPACES_NODE_TYPE;

export interface GraphByNamespaces {
  [key: string]: GraphByNamespacesNode;
}

export type GraphByNamespacesNode =
  | GraphByNamespaces
  | ZeduxNode['id']
  | GraphByNamespacesNodeObject;

export interface GraphByNamespacesNodeObject {
  type: GraphByNamespacesNodeType;
  id: ZeduxNode['id'];
  value?: unknown;
  node?: ZeduxNode | undefined;
  sources?: Array<{ key: string; operation: string }>;
  observers?: Array<{ key: string; operation: string }>;
  weight?: number;
}

export function isGraphByNamespacesNodeObject(
  node: unknown,
): node is GraphByNamespacesNodeObject {
  return (
    typeof node === 'object' &&
    node !== null &&
    'type' in node &&
    node.type === GRAPH_BY_NAMESPACES_NODE_TYPE
  );
}

export function generateGraphByNamespaces(args: {
  getNode(this: void, id: string): ZeduxNode | undefined;
  flat: Record<
    string,
    {
      observers: Array<{ key: string; operation: string }>;
      sources: Array<{ key: string; operation: string }>;
      weight: number;
    }
  >;
  options: Pick<
    CompleteZeduxLoggerOptions['graphOptions'],
    | 'showNodesInGraphByNamespaces'
    | 'showNodeValueInGraphByNamespaces'
    | 'showNodeDepsInGraphByNamespaces'
  >;
}): GraphByNamespaces {
  const {
    getNode,
    flat,
    options: {
      showNodesInGraphByNamespaces,
      showNodeValueInGraphByNamespaces,
      showNodeDepsInGraphByNamespaces,
    },
  } = args;
  const onlyShowId =
    !showNodesInGraphByNamespaces &&
    !showNodeValueInGraphByNamespaces &&
    !showNodeDepsInGraphByNamespaces;
  const nodes = pipe(
    entries(flat),
    map(([id, deps]): { groupNames: string[]; data: GraphByNamespacesNode } => {
      const groupNames = parseNodeGroupNames(id);
      const node = getNode(id);
      return {
        groupNames,
        data: onlyShowId
          ? id
          : {
              type: GRAPH_BY_NAMESPACES_NODE_TYPE,
              id,
              ...(showNodeValueInGraphByNamespaces
                ? { value: node?.v as unknown }
                : {}),
              ...(showNodesInGraphByNamespaces ? { node } : {}),
              ...(showNodeDepsInGraphByNamespaces ? deps : {}),
            },
      };
    }),
  );
  return groupByNamespaces(nodes);
}

function groupByNamespaces(
  nodes: Array<{
    groupNames: string[];
    data: GraphByNamespacesNode;
  }>,
): GraphByNamespaces {
  const nodesWithLastNamespace: Array<{
    data: GraphByNamespacesNode;
    namespace: string;
  }> = [];

  const nodesGroupedByNamespace = groupBy(nodes, ({ data, groupNames }) => {
    if (groupNames.length === 0 || groupNames[0] === undefined) {
      return undefined;
    }

    if (groupNames.length === 1) {
      nodesWithLastNamespace.push({
        data,
        namespace: groupNames[0],
      });
      return undefined;
    }

    return groupNames[0];
  });

  const resultingGroups: GraphByNamespaces = {};

  for (const [groupName, nodes] of entries(nodesGroupedByNamespace)) {
    resultingGroups[groupName] = groupByNamespaces(
      nodes.map(({ data, groupNames }) => {
        return { data, groupNames: groupNames.slice(1) };
      }),
    );
  }

  for (const node of nodesWithLastNamespace) {
    if (resultingGroups[node.namespace] === undefined) {
      resultingGroups[node.namespace] = node.data;
    } else {
      resultingGroups[node.namespace] = {
        _: node.data,
        ...(resultingGroups[node.namespace] as GraphByNamespaces),
      };
    }
  }

  return resultingGroups;
}
