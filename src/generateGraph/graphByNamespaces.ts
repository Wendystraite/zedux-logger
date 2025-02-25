import { GraphNode } from '@zedux/react';
import { entries, groupBy, map, pipe } from 'remeda';

import { parseAtomName } from '../parseAtomName/parseAtomName.js';

export type GraphByNamespaces = Record<
  string,
  {
    id: GraphNode['id'];
    value: unknown;
    node: GraphNode | undefined;
    dependencies: Array<{ key: string; operation: string }>;
    dependents: Array<{ key: string; operation: string }>;
    weight: number;
  }
>;

export function graphByNamespaces(args: {
  getNode(this: void, id: string): GraphNode | undefined;
  flat: Record<
    string,
    {
      dependencies: Array<{ key: string; operation: string }>;
      dependents: Array<{ key: string; operation: string }>;
      weight: number;
    }
  >;
}): GraphByNamespaces {
  const { getNode, flat } = args;
  const nodes = pipe(
    entries(flat),
    map(([id, deps]) => {
      const names = parseAtomName(id);
      let groupNames: string[];
      if (names.type === 'component') {
        groupNames = [`@@rc`, names.componentName, names.componentUid];
      } else if (names.type === 'selector') {
        groupNames = [`@@selector`, names.selectorName, names.selectorUid];
      } else if (names.type === 'listener') {
        groupNames = [`@@listener`, names.listenerUid];
      } else {
        const { namespaces, params } = names;
        groupNames = [...namespaces];
        if (params !== undefined) {
          groupNames.push(params);
        }
        if (names.type === 'signal') {
          groupNames.push(`@signal-${names.signalUid}`);
        } else if (names.scope !== undefined) {
          groupNames.push(`@@scope-${names.scope}`);
        }
      }
      const node = getNode(id);
      return {
        groupNames,
        data: {
          id,
          value: node?.v as unknown,
          node,
          ...deps,
        },
      };
    }),
  );
  return groupByNamespaces(nodes);
}

function groupByNamespaces<DATA>(
  nodes: Array<{
    groupNames: string[];
    data: DATA;
  }>,
): Record<string, DATA /** | Record<string, DATA> */> {
  const nodesWithLastNamespace: Array<{
    data: DATA;
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

  const resultingGroups: Record<string, DATA> = {};

  for (const [groupName, nodes] of entries(nodesGroupedByNamespace)) {
    resultingGroups[groupName] = groupByNamespaces(
      nodes.map(({ data, groupNames }) => {
        return { data, groupNames: groupNames.slice(1) };
      }),
    ) as DATA;
  }

  for (const node of nodesWithLastNamespace) {
    if (resultingGroups[node.namespace] === undefined) {
      resultingGroups[node.namespace] = node.data;
    } else {
      resultingGroups[node.namespace] = {
        _: node.data,
        ...resultingGroups[node.namespace],
      } as DATA;
    }
  }

  return resultingGroups;
}
