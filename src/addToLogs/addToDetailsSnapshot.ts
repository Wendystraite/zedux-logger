import type { LogArgs } from './LogArgs.js';

export function addToDetailsSnapshot(args: LogArgs): void {
  const {
    options: {
      showInDetails: { showSnapshot },
      snapshotOptions: { groupCollapseSnapshot },
      colors,
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
        colors: [colors.groupOldSnapshot],
        data: oldSnapshot,
      },
      newSnapshot !== undefined && {
        log: '%cnew snapshot',
        colors: [colors.groupNewSnapshot],
        data: newSnapshot,
      },
    ],
  });
}
