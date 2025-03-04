import type { LogArgs } from './LogArgs.js';

export function addToSummarySummary(args: LogArgs): void {
  const {
    addLogToSummary,
    what: {
      summary: [summary, , summaryColor],
    },
    options: {
      showInSummary: { showSummary },
    },
  } = args;

  if (!showSummary) {
    return;
  }

  addLogToSummary(`%c${summary}`, summaryColor);
}
