import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import type { AddToLogsSummaryArgs } from './AddToLogsSummaryArgs.js';

export function addEcosystemNameToLog(args: AddToLogsSummaryArgs): void {
  const {
    addLogToSummary,
    what: { ecosystemName },
    options: { showEcosystemName },
  } = args;

  if (!showEcosystemName) {
    return;
  }

  addLogToSummary(`%c${ecosystemName}`, ZEDUX_LOGGER_COLORS.ecosystemName);
}
