import type { LogArgs } from './LogArgs.js';

export function logWaitingPromises(args: LogArgs): void {
  const {
    what: { waitingForPromisesNodes },
    options,
  } = args;

  if (
    !options.showWaitingPromises ||
    waitingForPromisesNodes === undefined ||
    waitingForPromisesNodes.length <= 0
  ) {
    return;
  }

  options.console.log(
    `⌛ waiting for`,
    waitingForPromisesNodes.map((node) => [node.id, node]),
  );
}
