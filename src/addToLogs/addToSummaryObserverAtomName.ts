import type { LogArgs } from './LogArgs.js';
import { createAddToSummaryAtomName } from './createAddToSummaryAtomName.js';

export function addToSummaryObserverAtomName(args: LogArgs): void {
  const { options, what } = args;
  createAddToSummaryAtomName({
    show: options.showObserver,
    atomName: what.observerAtomName,
  })(args);
}
