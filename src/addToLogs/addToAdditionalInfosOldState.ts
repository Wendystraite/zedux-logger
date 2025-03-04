import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import type { LogArgs } from './LogArgs.js';

export function addToAdditionalInfosOldState(args: LogArgs): void {
  const {
    addLogToAdditionalInfos,
    what: { hasOldState = false, oldState },
    options: {
      showInDetails: { showOldState },
    },
  } = args;

  if (!showOldState || !hasOldState) {
    return;
  }

  addLogToAdditionalInfos({
    emoji: '⬅️',
    log: '%cold state',
    colors: [ZEDUX_LOGGER_COLORS.groupOldState],
    data: oldState,
  });
}
