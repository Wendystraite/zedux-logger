import { isTruthy } from 'remeda';

import type { CompleteZeduxLoggerLocalOptions } from '../types/ZeduxLoggerLocalOptions.js';
import type {
  ZeduxLoggerLogArgs,
  ZeduxLoggerLogDetail,
} from '../types/ZeduxLoggerLogArgs.js';
import { consoleGroup } from '../utils/consoleGroup.js';

export function logLogDetail(
  console: CompleteZeduxLoggerLocalOptions['console'],
  logDetail: ZeduxLoggerLogDetail,
  options: Pick<ZeduxLoggerLogArgs['options'], 'showColors'>,
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
        if ('data' in logDetail) {
          console.log(logDetail.data);
        }
        for (const subLogDetail of subLogDetails) {
          logLogDetail(console, subLogDetail, options);
        }
      },
    );
  } else if ('data' in logDetail) {
    console.log(...logs, logDetail.data);
  } else {
    console.log(...logs);
  }
}
