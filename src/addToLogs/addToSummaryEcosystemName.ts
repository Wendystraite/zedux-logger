import type { ZeduxLoggerLogArgs } from '../types/ZeduxLoggerLogArgs.js';

export function addToSummaryEcosystemName(args: ZeduxLoggerLogArgs): void {
  const {
    addLogToSummary,
    what: { ecosystemName },
    options: {
      showInSummary: { showEcosystemName },
      colors,
    },
  } = args;

  if (!showEcosystemName || ecosystemName === undefined) {
    return;
  }

  addLogToSummary(`%c${ecosystemName}`, colors.ecosystemName);
}
