import type { GraphViewRecursive } from '@zedux/react';

export function addRecursiveGraphNodeToPath(
  graph: GraphViewRecursive,
  path: string[],
): GraphViewRecursive {
  let current = graph;
  for (const key of path) {
    current[key] ??= {};
    current = current[key];
  }
  return current;
}
