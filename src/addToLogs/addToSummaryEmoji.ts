import type { LogArgs } from './LogArgs.js';

export function addToSummaryEmoji(args: LogArgs): void {
  const {
    addLogToSummary,
    what: {
      summary: [, summaryEmoji],
    },
    options: { showSummaryEmoji },
  } = args;

  if (!showSummaryEmoji) {
    return;
  }

  addLogToSummary(`[${summaryEmoji}]`);
}
