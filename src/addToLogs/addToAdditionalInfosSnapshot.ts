import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import type { LogArgs } from './LogArgs.js';

export function addToAdditionalInfosSnapshot(args: LogArgs): void {
  const { options, oldSnapshot, newSnapshot, addLogToAdditionalInfos } = args;

  if (
    !options.showSnapshot ||
    (oldSnapshot === undefined && newSnapshot === undefined)
  ) {
    return;
  }

  addLogToAdditionalInfos({
    emoji: '📸',
    log: 'snapshot',
    groupCollapsedSubLogs: options.groupCollapseSnapshot,
    subLogs: [
      oldSnapshot !== undefined && {
        log: '%cold snapshot',
        colors: [ZEDUX_LOGGER_COLORS.groupOldSnapshot],
        data: oldSnapshot,
      },
      newSnapshot !== undefined && {
        log: '%cnew snapshot',
        colors: [ZEDUX_LOGGER_COLORS.groupNewSnapshot],
        data: newSnapshot,
      },
    ],
  });
}
