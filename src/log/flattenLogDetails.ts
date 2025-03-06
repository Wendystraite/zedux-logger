import { isTruthy } from 'remeda';

import type { LogDetail } from '../addToLogs/LogArgs.js';

export function flattenLogDetails(
  logDetails: LogDetail[],
): Record<string, unknown> {
  const flattenedLogs: Record<string, unknown> = {};
  flattenLogDetailsInternal({ flattenedLogs, logDetails });
  return flattenedLogs;
}

function flattenLogDetailsInternal({
  flattenedLogs,
  logDetails,
  parentLog = '',
}: {
  flattenedLogs: Record<string, unknown>;
  logDetails: Array<LogDetail | false | undefined>;
  parentLog?: string;
}): void {
  for (const logDetail of logDetails) {
    if (isTruthy(logDetail)) {
      let log = '';
      if (parentLog.length > 0) {
        log += `${parentLog}.`;
      }
      if (logDetail.emoji !== undefined) {
        log += `${logDetail.emoji} `;
      }
      log += logDetail.log.replaceAll('%c', '').replaceAll(' ', '-');
      if ('data' in logDetail) {
        flattenedLogs[log] = logDetail.data;
      }
      if (logDetail.subLogs !== undefined) {
        flattenLogDetailsInternal({
          flattenedLogs,
          logDetails: logDetail.subLogs,
          parentLog: log,
        });
      }
    }
  }
}
