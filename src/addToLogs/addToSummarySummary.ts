import type { LogArgs } from './LogArgs.js';

export function addToSummarySummary(args: LogArgs): void {
  const {
    addLogToSummary,
    what: {
      summary: [summary, , summaryColor],
    },
  } = args;

  addLogToSummary(`%c${summary}`, summaryColor);
}
