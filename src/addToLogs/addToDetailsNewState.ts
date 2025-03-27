import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function addToDetailsNewState(args: ZeduxLoggerLogArgs): void {
  const {
    addLogToDetails,
    what: { hasNewState = false, newState },
    options: {
      showInDetails: { showNewState },
      colors,
    },
  } = args;

  if (!showNewState || !hasNewState) {
    return;
  }

  addLogToDetails({
    emoji: '➡️',
    log: '%cnew state',
    colors: [colors.groupNewState],
    data: newState,
  });
}
