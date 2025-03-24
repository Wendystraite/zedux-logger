import { isTruthy } from 'remeda';

import type { LogArgs, LogDetail } from '../addToLogs/LogArgs.js';
import type { CompleteZeduxLoggerLocalOptions } from '../types/ZeduxLoggerLocalOptions.js';
import { consoleGroup } from '../utils/consoleGroup.js';

export function logLogDetail(
  console: CompleteZeduxLoggerLocalOptions['console'],
  logDetail: LogDetail,
  options: Pick<LogArgs['options'], 'showColors'>,
) {
  const { showColors } = options;

  let logs: string[];
  if (showColors) {
    logs = [
      logDetail.emoji !== undefined
        ? `${logDetail.emoji} ${logDetail.log}`
        : logDetail.log,
      ...(logDetail.colors?.map((color) => `color: ${color}`) ?? []),
    ];
  } else {
    logs = [
      logDetail.emoji !== undefined
        ? `${logDetail.emoji} ${logDetail.log.replaceAll('%c', '')}`
        : logDetail.log.replaceAll('%c', ''),
    ];
  }
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
          logLogDetail(console, subLogDetail, options);
        }
      },
    );
  } else {
    console.log(...logs, logDetail.data);
  }
}
