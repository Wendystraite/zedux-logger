import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function addToDetailsOldState(args: ZeduxLoggerLogArgs): void {
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
