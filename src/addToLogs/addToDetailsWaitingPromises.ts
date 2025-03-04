import type { LogArgs } from './LogArgs.js';

export function addToDetailsWaitingPromises(args: LogArgs): void {
  const {
    addLogToDetails,
    what: { waitingForPromisesNodes },
    options: {
      showInDetails: { showWaitingPromises },
    },
  } = args;

  if (
    !showWaitingPromises ||
    waitingForPromisesNodes === undefined ||
    waitingForPromisesNodes.length <= 0
  ) {
    return;
  }

  addLogToDetails({
    emoji: '⌛',
    log: 'waiting for',
    data: waitingForPromisesNodes.map((node) => [node.id, node]),
  });
}
