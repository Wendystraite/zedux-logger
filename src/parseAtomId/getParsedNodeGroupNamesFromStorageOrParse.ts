import type { ZeduxNode } from '@zedux/atoms';

import type { ZeduxLoggerEcosystemStorage } from '../types/ZeduxLoggerEcosystemStorage.js';
import { getParsedNodeIdFromStorageOrParse } from './getParsedNodeIdFromStorageOrParse.js';
import { getParsedNodeIdGroupNames } from './parseNodeGroupNames.js';

export function getParsedNodeGroupNamesFromStorageOrParse(
  node: ZeduxNode,
  storage: ZeduxLoggerEcosystemStorage,
): string[] {
  if (storage.parsedNodeGroupNamesMapping.has(node)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return storage.parsedNodeGroupNamesMapping.get(node)!;
  } else {
    const parsedNodeId = getParsedNodeIdFromStorageOrParse(node, storage);
    const parsed = getParsedNodeIdGroupNames(parsedNodeId);
    storage.parsedNodeGroupNamesMapping.set(node, parsed);
    return parsed;
  }
}
