import type { LogArgs } from './LogArgs.js';
import { createAddToSummaryAtomName } from './createAddToSummaryAtomName.js';

export function addToSummaryObserverAtomName(args: LogArgs): void {
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
