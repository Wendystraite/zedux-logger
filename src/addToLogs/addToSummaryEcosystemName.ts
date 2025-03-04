import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import type { LogArgs } from './LogArgs.js';

export function addToSummaryEcosystemName(args: LogArgs): void {
  const {
    addLogToSummary,
    what: { ecosystemName },
    options: {
      showInSummary: { showEcosystemName },
    },
  } = args;

  if (!showEcosystemName) {
    return;
  }

  addLogToSummary(`%c${ecosystemName}`, ZEDUX_LOGGER_COLORS.ecosystemName);
}
