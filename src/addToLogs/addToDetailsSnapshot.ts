import type { LogArgs } from './LogArgs.js';

export function addToDetailsSnapshot(args: LogArgs): void {
  const {
    options: {
      showInDetails: { showSnapshot },
      colors,
    },
    snapshot,
    addLogToDetails,
  } = args;

  if (!showSnapshot || snapshot === undefined) {
    return;
  }

  addLogToDetails({
    emoji: '📸',
    log: '%csnapshot',
    colors: [colors.groupSnapshot],
    data: snapshot,
  });
}
