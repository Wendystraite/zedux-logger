import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import type { LogArgs } from './LogArgs.js';

export function addToSummaryOperation(args: LogArgs): void {
  const {
    addLogToSummary,
    what: { operation },
  } = args;

  if (operation === undefined) {
    return;
  }

  addLogToSummary(`%c${operation}`, ZEDUX_LOGGER_COLORS.operation);
}
