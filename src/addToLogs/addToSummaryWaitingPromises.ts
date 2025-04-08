import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function addToSummaryWaitingPromises(args: ZeduxLoggerLogArgs): void {
  const {
    addLogToSummary,
    waitingForPromisesNodes,
    options: {
      showInSummary: { showWaitingPromises },
      colors,
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
    `%c(waiting %c${waitingForPromisesNodes.length} promise${waitingForPromisesNodes.length > 1 ? 's' : ''}%c)`,
    colors.default,
    colors.waitingForPromisesNodes,
    colors.default,
  );
}
