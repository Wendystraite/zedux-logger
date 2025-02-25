import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import type { AddToLogsSummaryArgs } from './AddToLogsSummaryArgs.js';

export function addOperationToLog(args: AddToLogsSummaryArgs): void {
  const {
    addLogToSummary,
    what: { operation },
  } = args;

  if (operation === undefined) {
    return;
  }

  addLogToSummary(`%c${operation}`, ZEDUX_LOGGER_COLORS.operation);
}
