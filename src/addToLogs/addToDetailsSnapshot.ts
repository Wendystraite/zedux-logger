import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function addToDetailsSnapshot(args: ZeduxLoggerLogArgs): void {
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
