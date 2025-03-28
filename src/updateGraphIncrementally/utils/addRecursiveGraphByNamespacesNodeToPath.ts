import {
  type GraphByNamespaces,
  type GraphByNamespacesNode,
  isGraphByNamespacesNodeObject,
} from '../../generateGraph/generateGraphByNamespaces.js';

export function addRecursiveGraphByNamespacesNodeToPath<
  TLastValue extends GraphByNamespacesNode,
>(
  draft: GraphByNamespaces,
  groupNames: string[],
  lastValue: TLastValue,
): TLastValue {
  let currentPath = draft;
  for (
    let groupNameIndex = 0;
    groupNameIndex < groupNames.length;
    ++groupNameIndex
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const groupName = groupNames[groupNameIndex]!;

    const isLast = groupNameIndex === groupNames.length - 1;
    if (isLast) {
      if (currentPath[groupName] === undefined) {
        currentPath[groupName] = lastValue;
      } else if (
        typeof currentPath[groupName] === 'string' ||
        isGraphByNamespacesNodeObject(currentPath[groupName])
      ) {
        currentPath[groupName] = lastValue;
      } else {
        currentPath[groupName]._ = lastValue;
      }
    } else {
      if (currentPath[groupName] === undefined) {
        currentPath[groupName] = {};
      } else if (
        typeof currentPath[groupName] === 'string' ||
        isGraphByNamespacesNodeObject(currentPath[groupName])
      ) {
        currentPath[groupName] = { _: currentPath[groupName] };
      }
    }
    currentPath = currentPath[groupName] as GraphByNamespaces;
  }
  return lastValue;
}
