import type { LogArgs } from './LogArgs.js';

export function addToSummaryEcosystemName(args: LogArgs): void {
  const {
    addLogToSummary,
    what: { ecosystemName },
    options: {
      showInSummary: { showEcosystemName },
      colors,
    },
  } = args;

  if (!showEcosystemName) {
    return;
  }

  addLogToSummary(`%c${ecosystemName}`, colors.ecosystemName);
}
