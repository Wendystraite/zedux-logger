import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import type { AddToLogsSummaryArgs } from './AddToLogsSummaryArgs.js';

export function addWaitingForPromisesNodesToLog(
  args: AddToLogsSummaryArgs,
): void {
  const {
    addLogToSummary,
    what: { waitingForPromisesNodes },
    options: { showWaitingPromises },
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
