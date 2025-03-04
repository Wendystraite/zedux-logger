import type { LogArgs } from './LogArgs.js';

export function addToSummaryEmoji(args: LogArgs): void {
  const {
    addLogToSummary,
    what: {
      summary: [, summaryEmoji],
    },
    options: {
      showInSummary: { showEmoji },
    },
  } = args;

  if (!showEmoji) {
    return;
  }

  addLogToSummary(`[${summaryEmoji}]`);
}
