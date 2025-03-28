import {
  type GraphByNamespaces,
  isGraphByNamespacesNodeObject,
} from '../../generateGraph/generateGraphByNamespaces.js';

export function removeRecursiveGraphByNamespacesNodeToPath(
  draft: GraphByNamespaces,
  groupNames: string[],
): void {
  if (groupNames.length === 0) return;

  const lastGroupName = groupNames.pop();
  let parent: GraphByNamespaces = draft;
  let parentParent: GraphByNamespaces | undefined;
  for (const groupName of groupNames) {
    const child = parent[groupName];

    if (
      child === undefined ||
      typeof child === 'string' ||
      isGraphByNamespacesNodeObject(child)
    ) {
      return;
    }

    parentParent = parent;
    parent = child;
  }

  if (lastGroupName !== undefined && parent[lastGroupName] !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete parent[lastGroupName];

    const parentKeys = Object.keys(parent);

    if (parentKeys.length === 0) {
      removeRecursiveGraphByNamespacesNodeToPath(draft, groupNames);
    } else if (
      parentParent !== undefined &&
      parentKeys.length === 1 &&
      '_' in parent
    ) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      parentParent[groupNames[groupNames.length - 1]!] = parent._;
    }
  }
}
