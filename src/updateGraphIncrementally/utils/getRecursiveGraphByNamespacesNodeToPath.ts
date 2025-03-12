import type { GraphNode } from '@zedux/react';

import {
  type GraphByNamespaces,
  type GraphByNamespacesNodeObject,
  isGraphByNamespacesNodeObject,
} from '../../generateGraph/generateGraphByNamespaces.js';

export function getRecursiveGraphByNamespacesNodeToPath(
  graph: GraphByNamespaces,
  groupNames: string[],
): GraphNode['id'] | GraphByNamespacesNodeObject | undefined {
  let currentPath: GraphByNamespaces = graph;

  for (
    let groupNameIndex = 0;
    groupNameIndex < groupNames.length;
    groupNameIndex++
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const groupName = groupNames[groupNameIndex]!;

    const isLast = groupNameIndex === groupNames.length - 1;

    if (isLast) {
      if (
        typeof currentPath[groupName] === 'string' ||
        isGraphByNamespacesNodeObject(currentPath[groupName])
      ) {
        return currentPath[groupName];
      }
      if (
        typeof currentPath[groupName]?._ === 'string' ||
        isGraphByNamespacesNodeObject(currentPath[groupName]?._)
      ) {
        return currentPath[groupName]._;
      }
    }

    if (
      currentPath[groupName] === undefined ||
      typeof currentPath[groupName] === 'string' ||
      isGraphByNamespacesNodeObject(currentPath[groupName])
    ) {
      return undefined;
    }

    currentPath = currentPath[groupName];
  }
}
