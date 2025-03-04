import type { LogArgs } from './LogArgs.js';
import { createAddToSummaryAtomName } from './createAddToSummaryAtomName.js';

export function addToSummaryAtomName(args: LogArgs): void {
  const {
    what: { atomName },
    options: {
      showInSummary: { showAtomName },
    },
  } = args;

  createAddToSummaryAtomName({ show: showAtomName, atomName })(args);
}
