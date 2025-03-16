import type { ZeduxNode } from '@zedux/react';

import {
  GRAPH_BY_NAMESPACES_NODE_TYPE,
  type GraphByNamespacesNode,
} from '../../generateGraph/generateGraphByNamespaces.js';
import type { CompleteZeduxLoggerOptions } from '../../types/ZeduxLoggerOptions.js';
import { getDefaultFlatGraphNode } from './getDefaultGraphNode.js';

export function getDefaultByNamespacesGraphNode(
  node: ZeduxNode,
  {
    showNodeDepsInGraphByNamespaces,
    showNodeValueInGraphByNamespaces,
    showNodesInGraphByNamespaces,
  }: Pick<
    CompleteZeduxLoggerOptions['graphOptions'],
    | 'showNodeDepsInGraphByNamespaces'
    | 'showNodeValueInGraphByNamespaces'
    | 'showNodesInGraphByNamespaces'
  >,
): GraphByNamespacesNode {
  const onlyShowId =
    !showNodesInGraphByNamespaces &&
    !showNodeValueInGraphByNamespaces &&
    !showNodeDepsInGraphByNamespaces;

  if (onlyShowId) {
    return node.id;
  }

  return {
    type: GRAPH_BY_NAMESPACES_NODE_TYPE,
    id: node.id,
    ...(showNodeValueInGraphByNamespaces ? { value: node.v as unknown } : {}),
    ...(showNodesInGraphByNamespaces ? { node: node } : {}),
    ...(showNodeDepsInGraphByNamespaces ? getDefaultFlatGraphNode() : {}),
  };
}
