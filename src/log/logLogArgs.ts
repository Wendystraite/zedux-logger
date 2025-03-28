import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';
import { consoleGroup } from '../utils/consoleGroup.js';
import { flattenLogDetails } from './flattenLogDetails.js';
import { logLogDetail } from './logLogDetail.js';

export function logLogArgs(
  logArgs: Pick<
    ZeduxLoggerLogArgs,
    'logSummary' | 'logSummaryColors' | 'details'
  > & {
    options: Pick<
      ZeduxLoggerLogArgs['options'],
      'showColors' | 'oneLineLogs' | 'console'
    >;
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
    resultingLogSummary = [
      logSummary,
      ...logSummaryColors.map((color) => `color: ${color}`),
    ];
  } else {
    resultingLogSummary = [logSummary.replaceAll('%c', '')];
  }

  if (logSummary === '' && details.length <= 0) {
    return;
  } else if (details.length <= 0) {
    console.log(...resultingLogSummary);
  } else if (oneLineLogs) {
    console.log(...resultingLogSummary, flattenLogDetails(details));
  } else {
    consoleGroup(console, 'groupCollapsed', resultingLogSummary, () => {
      for (const detail of details) {
        logLogDetail(console, detail, options);
      }
    });
  }
}
