import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';
import { createAddToSummaryAtomName } from './createAddToSummaryAtomName.js';

export function addToSummaryAtomName(args: ZeduxLoggerLogArgs): void {
  const {
    what: { nodeId, nodeIdParsed },
    options: {
      showInSummary: { showAtomName },
    },
  } = args;

  createAddToSummaryAtomName({
    show: showAtomName,
    nodeId,
    nodeIdParsed,
  })(args);
}
