import { ZEDUX_LOGGER_COLORS } from '../colors.js';
import type { LogArgs } from './LogArgs.js';

export function addToDetailsSnapshot(args: LogArgs): void {
  const {
    options: {
      showInDetails: { showSnapshot },
      snapshotOptions: { groupCollapseSnapshot },
    },
    oldSnapshot,
    newSnapshot,
    addLogToDetails,
  } = args;

  if (
    !showSnapshot ||
    (oldSnapshot === undefined && newSnapshot === undefined)
  ) {
    return;
  }

  addLogToDetails({
    emoji: '📸',
    log: 'snapshot',
    groupCollapsedSubLogs: groupCollapseSnapshot,
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
