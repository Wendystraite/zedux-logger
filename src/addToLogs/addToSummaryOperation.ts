import type { LogArgs } from './LogArgs.js';

export function addToSummaryOperation(args: LogArgs): void {
  const {
    addLogToSummary,
    what: { operation },
    options: {
      showInSummary: { showOperation },
      colors,
    },
  } = args;

  if (!showOperation || operation === undefined) {
    return;
  }

  addLogToSummary(`%c${operation}`, colors.operation);
}
