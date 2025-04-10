import { getParsedNodeIdFromStorageOrParse } from '../parseAtomId/getParsedNodeIdFromStorageOrParse.js';
import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';
import { addToSummaryAnyNodeId } from './addToSummaryAnyNodeId.js';

export function addToSummaryObserverAtomName(args: ZeduxLoggerLogArgs): void {
  const {
    options: {
      showInSummary: { showObserverName },
    },
    what: { observer },
    storage,
  } = args;

  if (!showObserverName || observer === undefined) {
    return;
  }

  addToSummaryAnyNodeId({
    nodeId: observer.id,
    nodeIdParsed: getParsedNodeIdFromStorageOrParse(observer, storage),
    logArgs: args,
  });
}
