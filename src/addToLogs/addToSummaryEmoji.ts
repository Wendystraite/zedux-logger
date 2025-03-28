import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function addToSummaryEmoji(args: ZeduxLoggerLogArgs): void {
  const {
    addLogToSummary,
    what: { summaryEmoji },
    options: {
      showInSummary: { showEmoji },
      colors,
    },
  } = args;

  if (!showEmoji) {
    return;
  }

  addLogToSummary(`%c[${summaryEmoji}]`, colors.default);
}
