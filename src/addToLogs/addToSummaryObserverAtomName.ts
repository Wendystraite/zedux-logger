import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';
import { createAddToSummaryAtomName } from './createAddToSummaryAtomName.js';

export function addToSummaryObserverAtomName(args: ZeduxLoggerLogArgs): void {
  const {
    options: {
      showInSummary: { showObserverName },
    },
    what: { observerId, observerIdParsed },
  } = args;

  createAddToSummaryAtomName({
    show: showObserverName,
    nodeId: observerId,
    nodeIdParsed: observerIdParsed,
  })(args);
}
