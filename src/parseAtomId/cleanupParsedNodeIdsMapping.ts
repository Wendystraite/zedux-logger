import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function cleanupParsedNodeIdsMapping(logArgs: ZeduxLoggerLogArgs) {
  const {
    storage,
    what: { eventMap, node },
  } = logArgs;
  if (eventMap.cycle && eventMap.cycle.newStatus === 'Destroyed') {
    if (node) {
      storage.parsedNodeIdsMapping.delete(node);
      storage.parsedNodeGroupNamesMapping.delete(node);
    }
  }
}
