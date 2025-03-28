import type { ZeduxNode } from '@zedux/react';

import {
  GRAPH_BY_NAMESPACES_NODE_TYPE,
  type GraphByNamespacesNode,
} from '../../generateGraph/generateGraphByNamespaces.js';
import type { CompleteZeduxLoggerGlobalOptions } from '../../types/ZeduxLoggerGlobalOptions.js';
import { getDefaultFlatGraphNode } from './getDefaultGraphNode.js';

export function getDefaultByNamespacesGraphNode(
  node: ZeduxNode,
  globalGraphOptions: CompleteZeduxLoggerGlobalOptions['graphOptions'],
): GraphByNamespacesNode {
  const {
    showNodeDepsInGraphByNamespaces,
    showNodeValueInGraphByNamespaces,
    showNodesInGraphByNamespaces,
  } = globalGraphOptions;

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
