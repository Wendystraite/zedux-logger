import type { AtomInstance, ZeduxNode } from '@zedux/atoms';

export function getWaitingForNodes(node: ZeduxNode): ZeduxNode[] {
  const waitingNodes: ZeduxNode[] = [];
  addWaitingForNodes({ node, skipNode: true, waitingNodes });
  return waitingNodes;
}

function addWaitingForNodes(args: {
  node: ZeduxNode;
  skipNode: boolean;
  waitingNodes: ZeduxNode[];
}): void {
  const { node, skipNode, waitingNodes } = args;
  if (!skipNode) {
    if (
      'promiseStatus' in node &&
      (node as AtomInstance).promiseStatus === 'loading'
    ) {
      waitingNodes.push(node);
    }
  }
  for (const source of node.s.keys()) {
    addWaitingForNodes({ node: source, skipNode: false, waitingNodes });
  }
}
