import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function addToSummarySummary(args: ZeduxLoggerLogArgs): void {
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
