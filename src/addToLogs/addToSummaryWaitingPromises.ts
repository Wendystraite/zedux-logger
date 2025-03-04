import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import type { LogArgs } from './LogArgs.js';

export function addToSummaryWaitingPromises(args: LogArgs): void {
  const {
    addLogToSummary,
    what: { waitingForPromisesNodes },
    options: {
      showInSummary: { showWaitingPromises },
    },
  } = args;

  if (
    !showWaitingPromises ||
    waitingForPromisesNodes === undefined ||
    waitingForPromisesNodes.length <= 0
  ) {
    return;
  }

  addLogToSummary(
    `%c(waiting ${waitingForPromisesNodes.length} promise${waitingForPromisesNodes.length > 1 ? 's' : ''})`,
    ZEDUX_LOGGER_COLORS.nodeWaitingAnotherNodePromise,
  );
}
