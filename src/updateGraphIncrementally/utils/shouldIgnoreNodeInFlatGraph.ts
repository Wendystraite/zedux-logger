import { ExternalNode, type GraphNode } from '@zedux/react';

import type { CompleteZeduxLoggerOptions } from '../../types/ZeduxLoggerOptions.js';

export function shouldIgnoreNodeInFlatGraph(
  node: GraphNode | undefined,
  options: Pick<
    CompleteZeduxLoggerOptions['graphOptions'],
    'showExternalNodesInFlatGraph' | 'showSignalsInFlatGraph'
  >,
): boolean {
  if (!options.showExternalNodesInFlatGraph && node instanceof ExternalNode) {
    return true;
  }

  if (
    !options.showSignalsInFlatGraph &&
    node?.id.startsWith('@signal') === true
  ) {
    return true;
  }

  return false;
}
