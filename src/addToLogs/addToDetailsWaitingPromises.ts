import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function addToDetailsWaitingPromises(args: ZeduxLoggerLogArgs): void {
  const {
    addLogToDetails,
    waitingForPromisesNodes,
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
