import type { LogArgs } from '../addToLogs/LogArgs.js';
import { consoleGroup } from '../utils/consoleGroup.js';
import { flattenLogDetails } from './flattenLogDetails.js';
import { logLogDetail } from './logLogDetail.js';

export function logLogArgs(
  logArgs: Pick<LogArgs, 'logSummary' | 'logSummaryColors' | 'details'> & {
    options: Pick<LogArgs['options'], 'showColors' | 'oneLineLogs' | 'console'>;
  },
): void {
  const {
    logSummary,
    logSummaryColors,
    details,
    options,
    options: { showColors, console, oneLineLogs },
  } = logArgs;

  let resultingLogSummary: string[];
  if (showColors) {
    resultingLogSummary = [logSummary, ...logSummaryColors];
  } else {
    resultingLogSummary = [logSummary.replaceAll('%c', '')];
  }

  if (oneLineLogs) {
    console.log(...resultingLogSummary, flattenLogDetails(details));
  } else {
    consoleGroup(console, 'groupCollapsed', resultingLogSummary, () => {
      for (const detail of details) {
        logLogDetail(console, detail, options);
      }
    });
  }
}
