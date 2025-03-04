import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import type { LogArgs } from './LogArgs.js';

export function addToDetailsOldState(args: LogArgs): void {
  const {
    addLogToDetails,
    what: { hasOldState = false, oldState },
    options: {
      showInDetails: { showOldState },
    },
  } = args;

  if (!showOldState || !hasOldState) {
    return;
  }

  addLogToDetails({
    emoji: '⬅️',
    log: '%cold state',
    colors: [ZEDUX_LOGGER_COLORS.groupOldState],
    data: oldState,
  });
}
