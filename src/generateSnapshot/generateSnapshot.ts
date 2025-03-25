import type { Ecosystem } from '@zedux/react';

export function generateSnapshot(args: {
  ecosystem: Ecosystem;
}): Record<string, unknown> | undefined {
  const { ecosystem } = args;
  const newSnapshot: Record<string, unknown> | undefined = {};
  for (const [id, node] of ecosystem.n) {
    newSnapshot[id] = node.v;
  }
  return newSnapshot;
}
