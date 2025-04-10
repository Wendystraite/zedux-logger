import { getParsedNodeIdFromStorageOrParse } from '../parseAtomId/getParsedNodeIdFromStorageOrParse.js';
import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';
import { addToSummaryAnyNodeId } from './addToSummaryAnyNodeId.js';

export function addToSummaryAtomName(args: ZeduxLoggerLogArgs): void {
  const {
    options: {
      showInSummary: { showAtomName },
    },
    what: { node },
    storage,
  } = args;

  if (!showAtomName || node === undefined) {
    return;
  }

  addToSummaryAnyNodeId({
    nodeId: node.id,
    nodeIdParsed: getParsedNodeIdFromStorageOrParse(node, storage),
    logArgs: args,
  });
}
