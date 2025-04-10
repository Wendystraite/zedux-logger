import type { ZeduxNode } from '@zedux/atoms';

import type { ZeduxLoggerEcosystemStorage } from '../types/ZeduxLoggerEcosystemStorage.js';
import { type ParsedNodeId, parseNodeId } from './parseNodeId.js';

export function getParsedNodeIdFromStorageOrParse(
  node: ZeduxNode,
  storage: ZeduxLoggerEcosystemStorage,
): ParsedNodeId {
  if (storage.parsedNodeIdsMapping.has(node)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return storage.parsedNodeIdsMapping.get(node)!;
  } else {
    const parsed = parseNodeId(node.id);
    storage.parsedNodeIdsMapping.set(node, parsed);
    return parsed;
  }
}
