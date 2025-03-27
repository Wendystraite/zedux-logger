import { isTruthy } from 'remeda';

import type { ZeduxLoggerLogDetail } from '../types/ZeduxLoggerLogArgs.js';

export function flattenLogDetails(
  logDetails: ZeduxLoggerLogDetail[],
): Record<string, unknown> {
  const flattenedLogs: Record<string, unknown> = {};
  flattenLogDetailsInternal({ flattenedLogs, logDetails });
  return flattenedLogs;
}

function flattenLogDetailsInternal(args: {
  flattenedLogs: Record<string, unknown>;
  logDetails: Array<ZeduxLoggerLogDetail | false | undefined>;
  parentLog?: string;
}): void {
  const { flattenedLogs, logDetails, parentLog = '' } = args;
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
