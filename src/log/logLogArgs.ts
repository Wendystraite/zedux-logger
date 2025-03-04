import type { LogArgs } from '../addToLogs/LogArgs.js';
import { logAdditionalInfo } from './logAdditionalInfo.js';
import { consoleGroup } from '../utils/consoleGroup.js';

export function logLogArgs(logArgs: LogArgs): void {
  const { options, logSummary, logSummaryColors, additionalInfos } = logArgs;
  consoleGroup(
    options.console,
    'groupCollapsed',
    [logSummary, ...logSummaryColors],
    () => {
      for (const additionalInfo of additionalInfos) {
        logAdditionalInfo(options.console, additionalInfo);
      }
    },
  );
}
