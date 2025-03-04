import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import type { LogArgs } from './LogArgs.js';

export function addToAdditionalInfosNewState(args: LogArgs): void {
  const {
    addLogToAdditionalInfos,
    what: { hasNewState = false, newState },
    options,
  } = args;

  if (!options.showNewState || !hasNewState) {
    return;
  }

  addLogToAdditionalInfos({
    emoji: '➡️',
    log: '%cnew state',
    colors: [ZEDUX_LOGGER_COLORS.groupNewState],
    data: newState,
  });
}
