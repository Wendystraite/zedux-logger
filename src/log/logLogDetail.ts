import { isTruthy } from 'remeda';

import type { LogDetail } from '../addToLogs/LogArgs.js';
import type { CompleteZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';
import { consoleGroup } from '../utils/consoleGroup.js';

export function logLogDetail(
  console: CompleteZeduxLoggerOptions['console'],
  logDetail: LogDetail,
) {
  const logs = [
    logDetail.emoji !== undefined
      ? `${logDetail.emoji} ${logDetail.log}`
      : logDetail.log,
    ...(logDetail.colors ?? []),
  ];
  const subLogDetails = logDetail.subLogs?.filter(isTruthy);
  if (subLogDetails !== undefined && subLogDetails.length > 0) {
    consoleGroup(
      console,
      logDetail.groupCollapsedSubLogs === true ? 'groupCollapsed' : 'group',
      logs,
      () => {
        if (logDetail.data !== undefined) {
          console.log(logDetail.data);
        }
        for (const subLogDetail of subLogDetails) {
          logLogDetail(console, subLogDetail);
        }
      },
    );
  } else {
    console.log(...logs, logDetail.data);
  }
}
