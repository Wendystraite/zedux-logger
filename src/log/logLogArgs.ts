import type { LogArgs } from '../addToLogs/LogArgs.js';
import { consoleGroup } from '../utils/consoleGroup.js';
import { logLogDetail } from './logLogDetail.js';

export function logLogArgs(logArgs: LogArgs): void {
  const { options, logSummary, logSummaryColors, details } = logArgs;
  consoleGroup(
    options.console,
    'groupCollapsed',
    [logSummary, ...logSummaryColors],
    () => {
      for (const detail of details) {
        logLogDetail(options.console, detail);
      }
    },
  );
}
