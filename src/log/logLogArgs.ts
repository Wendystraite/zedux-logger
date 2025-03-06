import type { LogArgs } from '../addToLogs/LogArgs.js';
import { consoleGroup } from '../utils/consoleGroup.js';
import { flattenLogDetails } from './flattenLogDetails.js';
import { logLogDetail } from './logLogDetail.js';

export function logLogArgs(
  logArgs: Pick<LogArgs, 'logSummary' | 'logSummaryColors' | 'details'> & {
    options: Pick<LogArgs['options'], 'oneLineLogs' | 'console'>;
  },
): void {
  const {
    logSummary,
    logSummaryColors,
    details,
    options: { console, oneLineLogs },
  } = logArgs;

  if (oneLineLogs) {
    console.log(logSummary, ...logSummaryColors, flattenLogDetails(details));
  } else {
    consoleGroup(
      console,
      'groupCollapsed',
      [logSummary, ...logSummaryColors],
      () => {
        for (const detail of details) {
          logLogDetail(console, detail);
        }
      },
    );
  }
}
