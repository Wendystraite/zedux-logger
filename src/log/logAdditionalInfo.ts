import { isTruthy } from 'remeda';

import type { AdditionalInfoOrSubLogs } from '../addToLogs/LogArgs.js';
import type { CompleteZeduxLoggerOptions } from '../types/ZeduxLoggerOptions.js';
import { consoleGroup } from '../utils/consoleGroup.js';

export function logAdditionalInfo(
  console: CompleteZeduxLoggerOptions['console'],
  info: AdditionalInfoOrSubLogs,
) {
  const logs = [
    info.emoji !== undefined ? `${info.emoji} ${info.log}` : info.log,
    ...(info.colors ?? []),
  ];
  const subLogs = info.subLogs?.filter(isTruthy);
  if (subLogs !== undefined && subLogs.length > 0) {
    consoleGroup(
      console,
      info.groupCollapsedSubLogs === true ? 'groupCollapsed' : 'group',
      logs,
      () => {
        if (info.data !== undefined) {
          console.log(info.data);
        }
        for (const subLog of subLogs) {
          logAdditionalInfo(console, subLog);
        }
      },
    );
  } else {
    console.log(...logs, info.data);
  }
}
