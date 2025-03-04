import type { LogArgs } from '../addToLogs/LogArgs.js';
import { consoleGroup } from '../utils/consoleGroup.js';
import { logLogDetail } from './logLogDetail.js';

export function logLogArgs(
  logArgs: Pick<LogArgs, 'logSummary' | 'logSummaryColors' | 'details'> & {
    options: Pick<LogArgs['options'], 'console'>;
  },
): void {
  const {
    options: { console },
    logSummary,
    logSummaryColors,
    details,
  } = logArgs;
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
