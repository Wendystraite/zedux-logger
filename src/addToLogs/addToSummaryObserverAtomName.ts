import type { LogArgs } from './LogArgs.js';
import { createAddToSummaryAtomName } from './createAddToSummaryAtomName.js';

export function addToSummaryObserverAtomName(args: LogArgs): void {
  const {
    options: {
      showInSummary: { showObserverName },
    },
    what: { observerAtomName },
  } = args;

  createAddToSummaryAtomName({
    show: showObserverName,
    atomName: observerAtomName,
  })(args);
}
