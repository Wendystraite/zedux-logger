import type { AddToLogsSummaryArgs } from './AddToLogsSummaryArgs.js';

export function addSummaryEmojiToLog(args: AddToLogsSummaryArgs): void {
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
