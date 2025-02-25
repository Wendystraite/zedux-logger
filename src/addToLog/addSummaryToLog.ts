import type { AddToLogsSummaryArgs } from './AddToLogsSummaryArgs.js';

export function addSummaryToLog(args: AddToLogsSummaryArgs): void {
  const {
    addLogToSummary,
    what: {
      summary: [summary, , summaryColor],
    },
  } = args;

  addLogToSummary(`%c${summary}`, summaryColor);
}
