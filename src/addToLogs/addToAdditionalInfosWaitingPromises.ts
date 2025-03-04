import type { LogArgs } from './LogArgs.js';

export function addToAdditionalInfosWaitingPromises(args: LogArgs): void {
  const {
    addLogToAdditionalInfos,
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

  addLogToAdditionalInfos({
    emoji: '⌛',
    log: 'waiting for',
    data: waitingForPromisesNodes.map((node) => [node.id, node]),
  });
}
