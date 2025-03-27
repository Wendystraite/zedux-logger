import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function addToSummaryOperation(args: ZeduxLoggerLogArgs): void {
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
