import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import type { LogArgs } from './LogArgs.js';

export function addToDetailsNewState(args: LogArgs): void {
  const {
    addLogToDetails,
    what: { hasNewState = false, newState },
    options: {
      showInDetails: { showNewState },
    },
  } = args;

  if (!showNewState || !hasNewState) {
    return;
  }

  addLogToDetails({
    emoji: '➡️',
    log: '%cnew state',
    colors: [ZEDUX_LOGGER_COLORS.groupNewState],
    data: newState,
  });
}
