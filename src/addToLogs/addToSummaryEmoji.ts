import type { LogArgs } from './LogArgs.js';

export function addToSummaryEmoji(args: LogArgs): void {
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
