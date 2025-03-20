import type { LogArgs } from './LogArgs.js';

export function addToSummarySummary(args: LogArgs): void {
  const {
    addLogToSummary,
    what: { summaryWhat, getSummaryColor },
    options: {
      colors,
      showInSummary: { showSummary },
    },
  } = args;

  if (!showSummary) {
    return;
  }

  addLogToSummary(`%c${summaryWhat}`, getSummaryColor(colors));
}
