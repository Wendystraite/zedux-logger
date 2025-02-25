import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import type { LogArgs } from './LogArgs.js';

export function logNewState(args: LogArgs): void {
  const {
    what: { hasNewState = false, newState },
    options,
  } = args;

  if (!options.showNewState || !hasNewState) {
    return;
  }

  options.console.log(
    '➡️ %cnew state',
    ZEDUX_LOGGER_COLORS.groupNewState,
    newState,
  );
}
