import type { LogArgs } from './LogArgs.js';
import { createAddToSummaryAtomName } from './createAddToSummaryAtomName.js';

export function addToSummaryAtomName(args: LogArgs): void {
  const { what } = args;
  createAddToSummaryAtomName({ atomName: what.atomName })(args);
}
