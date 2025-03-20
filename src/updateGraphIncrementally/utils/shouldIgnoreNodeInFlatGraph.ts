import { ExternalNode, type ZeduxNode } from '@zedux/react';

import type { CompleteZeduxLoggerGlobalOptions } from '../../types/ZeduxLoggerGlobalOptions.js';

export function shouldIgnoreNodeInFlatGraph(
  node: ZeduxNode | undefined,
  globalGraphOptions: CompleteZeduxLoggerGlobalOptions['graphOptions'],
): boolean {
  if (
    !globalGraphOptions.showExternalNodesInFlatGraph &&
    node instanceof ExternalNode
  ) {
    return true;
  }

  if (
    !globalGraphOptions.showSignalsInFlatGraph &&
    node?.id.startsWith('@signal') === true
  ) {
    return true;
  }

  return false;
}
