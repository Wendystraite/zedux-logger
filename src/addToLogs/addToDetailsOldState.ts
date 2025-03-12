import type { LogArgs } from './LogArgs.js';

export function addToDetailsOldState(args: LogArgs): void {
  const {
    addLogToDetails,
    what: { hasOldState = false, oldState },
    options: {
      showInDetails: { showOldState },
      colors,
    },
  } = args;

  if (!showOldState || !hasOldState) {
    return;
  }

  addLogToDetails({
    emoji: '⬅️',
    log: '%cold state',
    colors: [colors.groupOldState],
    data: oldState,
  });
}
