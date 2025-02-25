import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import type { LogArgs } from './LogArgs.js';

export function logOldState(args: LogArgs): void {
  const {
    what: { hasOldState = false, oldState },
    options,
  } = args;

  if (!options.showOldState || !hasOldState) {
    return;
  }

  options.console.log(
    '⬅️ %cold state',
    ZEDUX_LOGGER_COLORS.groupOldState,
    oldState,
  );
}
